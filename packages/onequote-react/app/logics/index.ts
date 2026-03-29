import dayjs from 'dayjs'

export function formatDate(d: string | Date, onlyDate = true) {
  const date = dayjs(d)
  if (onlyDate || date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}

export const NEWLINE_REGEX = /\n/g

export function stringToBoolean(str: string | null) {
  if (typeof str === 'string' && str.toLowerCase() === 'true') {
    return true
  }
  return false
}

export function getTheme(str: string | null | undefined) {
  if (typeof str === 'string') {
    return str.toLowerCase()
  }
  else {
    return 'auto'
  }
}

export function isDarkMode(theme?: string | null) {
  if (theme) {
    return getTheme(theme) === 'dark'
      || (getTheme(theme) === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
  else {
    return false
  }
}

export const isBrowser: boolean = typeof window !== 'undefined'
