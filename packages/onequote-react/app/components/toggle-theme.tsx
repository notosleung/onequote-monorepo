import { useDarkMode } from '~/hooks/useDarkMode'

export default function ToggleTheme({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const { toggleDark } = useDarkMode()
  return (
    <div title="ToggleTheme" onClick={event => toggleDark(event)} {...props}>
      {children}
    </div>
  )
}
