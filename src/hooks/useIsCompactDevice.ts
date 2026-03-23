import { useEffect, useState } from 'react'

/**
 * Detects compact/low-end device.
 * Only considers very small screens (< 360px), NOT typical phones.
 * This ensures animations run on normal smartphones.
 */
export function useIsCompactDevice() {
  const [compactDevice, setCompactDevice] = useState(false)

  useEffect(() => {
    const update = () => {
      // Only truly tiny screens or very low CPU
      const tinyScreen = window.innerWidth < 360
      const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2
      setCompactDevice(tinyScreen || lowCpu)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return compactDevice
}
