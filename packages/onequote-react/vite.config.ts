import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactMdxLayout } from './app/plugins/vite/vite-plugin-react-mdx-layout'

// 获取 __dirname (ESM 模式下)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  plugins: [
    UnoCSS({ configFile: '../../uno.config.ts' }),
    reactMdxLayout('app/components/md-wrapper.tsx'),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm,
      ],
      rehypePlugins: [
        [rehypeExternalLinks, {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        }],
        rehypeSlug, // 必须在 autolink 之前！
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: { className: ['header-anchor'] }, // 直接给 <a> 添加 class
            content: {
              type: 'text',
              value: '#',
            },
          },
        ],
      ],
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
