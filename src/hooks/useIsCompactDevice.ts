import { useEffect, useState } from 'react'

export function useIsCompactDevice() {
  const [compactDevice, setCompactDevice] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')

    const update = () => {
      const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4
      setCompactDevice(mediaQuery.matches || lowCpu)
    }

    update()
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return compactDevice
}
