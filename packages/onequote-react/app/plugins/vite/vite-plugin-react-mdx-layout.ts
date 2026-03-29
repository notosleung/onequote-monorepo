import path from 'node:path'
import process from 'node:process'

export const BACKSLASH_REGEX = /\\/g

/**
 * When the parameter is a string, it is treated as the component path wrapperPath for backward compatibility.
 * When the parameter is a function, it is called to get the wrapperPath.
 * The wrapperPath will be the relative path to the project root (e.g. 'app/components/foo.tsx')
 */
export type ReactMdxWrapperPluginParam = string | ((code: string, id: string) => string)

export function reactMdxLayout(param: ReactMdxWrapperPluginParam) {
  return {
    name: 'react-mdx-layout',
    enforce: 'pre' as const, // Run before mdx plugin
    transform(code: string, id: string) {
      if (!id.endsWith('.mdx'))
        return

      // Handle path: ensure it is an absolute path and use forward slashes (for import)
      // Calculate in advance to avoid recalculation in transform
      const wrapperPath = typeof param === 'function' ? param(code, id) : param
      let normalizedWrapperPath = wrapperPath.replace(BACKSLASH_REGEX, '/')
      if (!path.isAbsolute(normalizedWrapperPath)) {
        normalizedWrapperPath = path.resolve(process.cwd(), wrapperPath).replace(BACKSLASH_REGEX, '/')
      }

      const hasFrontmatter = code.trim().startsWith('---')
      let newCode = code

      const importLine = `import Wrapper, { meta as wrapperMeta } from '${normalizedWrapperPath}'`
      const exportLine = `export default function Layout({children}) {
  const fm = typeof frontmatter !== 'undefined' ? frontmatter : {};
  return <Wrapper frontmatter={fm}>{children}</Wrapper>;
}

export const meta = (args) => {
  const fm = typeof frontmatter !== 'undefined' ? frontmatter : {};
  return wrapperMeta ? wrapperMeta({ ...args, frontmatter: fm }) : [];
};`

      if (hasFrontmatter) {
        // Find the position of the second '---'
        const secondDashIndex = code.indexOf('---', 3)
        if (secondDashIndex !== -1) {
          // Insert after the frontmatter closing
          const before = code.slice(0, secondDashIndex + 3)
          const after = code.slice(secondDashIndex + 3)
          newCode = `${before}\n\n${importLine}\n${after}\n\n${exportLine}`
        }
        else {
          // Header only without footer? Treat as no frontmatter
          newCode = `${importLine}\n\n${code}\n\n${exportLine}`
        }
      }
      else {
        // No frontmatter, insert directly at the beginning and end
        newCode = `${importLine}\n\n${code}\n\n${exportLine}`
      }

      return newCode
    },
  }
}
