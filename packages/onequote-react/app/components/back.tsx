import { NavLink, useLocation } from 'react-router'

export default function Back() {
  const currentPath = useLocation().pathname

  return (
    <NavLink to={currentPath.split('/').slice(0, -1).join('/') || '/'} className="font-mono op50 hover:op75">
      cd ..
    </NavLink>
  )
}
