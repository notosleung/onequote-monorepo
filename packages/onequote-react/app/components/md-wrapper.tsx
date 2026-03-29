import type { ReactNode } from 'react'
import mediumZoom from 'medium-zoom'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { formatDate } from '~/logics'
import Back from './back'

interface MdxFrontmatter {
  title: string
  date?: string
  description?: string
  [key: string]: any
}

interface MdxWrapperProps {
  children: ReactNode
  frontmatter: MdxFrontmatter
}

// set meta for the wrapper itself, it will be merged with the meta from mdx file
export function meta({ frontmatter }: { frontmatter: MdxFrontmatter }) {
  return [
    { title: frontmatter.title },
  ]
}

export default function MarkdownWrapper({ children, frontmatter }: MdxWrapperProps) {
  const currentPath = useLocation().pathname

  useEffect(() => {
    const zoom = mediumZoom('.prose img', {
      background: 'rgba(0, 0, 0, 0.75)',
      margin: 24,
      scrollOffset: 0,
    })
    return () => {
      zoom.detach()
    }
  }, [])

  return (
    <div className="prose">
      {frontmatter.title && (
        <h1 id={frontmatter.title} className="mb-0">
          {frontmatter.title}
        </h1>
      )}
      {frontmatter.date || frontmatter.description
        ? (
            <div className="opacity-50 !-mt-6">
              {frontmatter.description && <span>{frontmatter.description}</span>}
              {frontmatter.date && <span>{`-${formatDate(frontmatter.date, false)}`}</span>}
            </div>
          )
        : null}
      <article className="post relative">
        {/* MDX content will be rendered here */}
        {children}
      </article>
      <span className="font-mono op50">&gt; </span>
      {currentPath !== '/' && <Back />}
    </div>
  )
}
