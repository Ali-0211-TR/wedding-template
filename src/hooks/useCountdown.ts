import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: string
  hours: string
  minutes: string
  seconds: string
  completed: boolean
}

function calculateCountdown(targetDate: string): CountdownParts {
  const difference = new Date(targetDate).getTime() - Date.now()

  if (difference <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      completed: true,
    }
  }

  const totalSeconds = Math.floor(difference / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    completed: false,
  }
}

export function useCountdown(targetDate: string) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    calculateCountdown(targetDate),
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(targetDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  return countdown
}
