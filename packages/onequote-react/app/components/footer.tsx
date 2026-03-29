import { useLocation } from 'react-router'

export default function Footer() {
  const currentPath = useLocation().pathname

  return (
    <div className="footer">
      <p className="text-end py-10px text-[0.9rem]">
        <span className="copyright-text">&copy; 2026 Notos Leung.</span>
        {'  '}
        {currentPath === '/' && (
          <span>
            Inspired by
            {' '}
            <a href="https://hitokoto.cn/" target="_blank" rel="noopener noreferrer">一言</a>
            .
          </span>
        )}
      </p>
    </div>
  )
}
