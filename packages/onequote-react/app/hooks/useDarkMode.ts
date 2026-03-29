import { useEffect, useRef } from 'react'
import { getTheme, isBrowser, isDarkMode } from '~/logics'

export function useDarkMode() {
  const isDarkRef = useRef(false)

  useEffect(() => {
    const theme = getTheme(localStorage.getItem('onequote-theme'))
    const isInitialDark = isDarkMode(theme)
    if (isDarkRef.current !== isInitialDark) {
      setDark(isInitialDark)
    }
  }, [])

  function setDark(value: boolean) {
    if (value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('onequote-theme', 'dark')
    }
    else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('onequote-theme', 'auto')
    }
    if (isDarkRef.current !== value) {
      isDarkRef.current = value
    }
  }

  function nextTick() {
    setTimeout(() => {})
  }

  /**
   * Credit to [@hooray](https://github.com/hooray)
   * @see https://github.com/vuejs/vitepress/pull/2347
   */
  function toggleDark(event: React.MouseEvent) {
    if (isBrowser) {
      // @ts-expect-error experimental API
      const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isAppearanceTransition) {
        setDark(!isDarkRef.current)
        return
      }

      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      const transition = document.startViewTransition(async () => {
        setDark(!isDarkRef.current)
        await nextTick()
      })
      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          document.documentElement.animate(
            {
              clipPath: isDarkRef.current
                ? clipPath.toReversed()
                : clipPath,
            },
            {
              duration: 400,
              easing: 'ease-out',
              fill: 'forwards',
              pseudoElement: isDarkRef.current
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            },
          )
        })
    }
    else {
      setDark(!isDarkRef.current)
    }
  }
  return { toggleDark }
}
