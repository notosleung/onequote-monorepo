import { NavLink, useLocation } from 'react-router'

export default function Back() {
  const currentPath = useLocation().pathname

  return (
    <NavLink to={currentPath.split('/').slice(0, -1).join('/') || '/'} className="text-[1rem] text-black opacity-50 hover:text-black hover:opacity-75 dark:text-white dark:hover:text-white">
      cd ..
    </NavLink>
  )
}
