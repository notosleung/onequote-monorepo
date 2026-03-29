import type { Config } from '@react-router/dev/config'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const MDX_REGEX = /\.mdx?$/

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    const staticRoutes = ['/']
    // 自动扫描你的文章目录
    const pagessDir = path.resolve(process.cwd(), 'app/pages')
    const dynamicPagesRoutes = fs.existsSync(pagessDir)
      ? fs.readdirSync(pagessDir)
          .filter(f => MDX_REGEX.test(f))
          .map(f => `/${f.replace(MDX_REGEX, '')}`)
      : []

    return [...staticRoutes, ...dynamicPagesRoutes]
  },
} satisfies Config
