import type { RouteConfig } from '@react-router/dev/routes'
import { index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/app.tsx', [
    index('pages/one-quote.tsx'),
    route('about', 'pages/about.mdx'),
    route('*', 'pages/404.mdx'),
  ]),
] satisfies RouteConfig
