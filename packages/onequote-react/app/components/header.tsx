import { NavLink } from 'react-router'
import { useDarkMode } from '~/hooks/useDarkMode'

export default function Header() {
  const { toggleDark } = useDarkMode()
  return (
    <div className="header">
      <NavLink to="/" className="logo" />
      <nav className="menu">
        <NavLink className="font-bold" to="/">
          首页
        </NavLink>
        <NavLink className="font-bold" to="/about">
          关于
        </NavLink>
        <a className="cursor-pointer" onClick={event => toggleDark(event)}>
          {/* <span className="hidden dark:inline">开灯</span>
          <span className="inline dark:hidden">熄灯</span> */}
          <div className="i-ri-sun-line dark:i-ri-moon-line" />
        </a>
      </nav>
    </div>
  )
}
