import { useEffect, useState } from 'react'

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // The app remains usable when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}
