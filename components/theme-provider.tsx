'use client'

import * as React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: 'class' | `data-${string}`
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

interface ThemeContextValue {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'light',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState(defaultTheme)

  const applyTheme = React.useCallback((nextTheme: string) => {
    const root = document.documentElement
    const previousTransition = root.style.getPropertyValue('transition')

    if (disableTransitionOnChange) {
      root.style.setProperty('transition', 'none')
    }

    if (attribute === 'class') {
      root.classList.remove('light', 'dark')
      root.classList.add(nextTheme)
    } else {
      root.setAttribute(attribute, nextTheme)
    }

    if (disableTransitionOnChange) {
      window.requestAnimationFrame(() => {
        if (previousTransition) {
          root.style.setProperty('transition', previousTransition)
        } else {
          root.style.removeProperty('transition')
        }
      })
    }
  }, [attribute, disableTransitionOnChange])

  const setTheme = React.useCallback((nextTheme: string) => {
    setThemeState(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
    applyTheme(nextTheme)
  }, [applyTheme])

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') || defaultTheme
    setThemeState(storedTheme)
    applyTheme(storedTheme)
  }, [applyTheme, defaultTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
