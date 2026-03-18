import { useCallback, useEffect, useRef, useState } from 'react'

interface AudioNodes {
  oscillators: OscillatorNode[]
  lfo: OscillatorNode | null
  master: GainNode | null
  lfoGain: GainNode | null
}

export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<AudioNodes>({
    oscillators: [],
    lfo: null,
    master: null,
    lfoGain: null,
  })

  const stop = useCallback(async () => {
    const nodes = nodesRef.current

    nodes.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop()
      } catch {
        // ignored
      }
    })

    if (nodes.lfo) {
      try {
        nodes.lfo.stop()
      } catch {
        // ignored
      }
    }

    nodesRef.current = {
      oscillators: [],
      lfo: null,
      master: null,
      lfoGain: null,
    }

    if (contextRef.current) {
      await contextRef.current.close()
      contextRef.current = null
    }

    setIsPlaying(false)
  }, [])

  const start = useCallback(async () => {
    if (contextRef.current) {
      return
    }

    const AudioContextClass = window.AudioContext
    if (!AudioContextClass) {
      return
    }

    const context = new AudioContextClass()
    contextRef.current = context

    if (context.state === 'suspended') {
      await context.resume()
    }

    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1450
    filter.Q.value = 0.4

    const master = context.createGain()
    master.gain.value = 0.016

    const lfo = context.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.09

    const lfoGain = context.createGain()
    lfoGain.gain.value = 0.008

    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)

    const chord = [220, 277.18, 329.63]
    const oscillators = chord.map((frequency, index) => {
      const oscillator = context.createOscillator()
      oscillator.type = index === 1 ? 'triangle' : 'sine'
      oscillator.frequency.value = frequency
      oscillator.detune.value = index * 4

      const gain = context.createGain()
      gain.gain.value = 0.004 / (index + 1)
      oscillator.connect(gain)
      gain.connect(filter)
      oscillator.start()

      return oscillator
    })

    filter.connect(master)
    master.connect(context.destination)
    lfo.start()

    nodesRef.current = {
      oscillators,
      lfo,
      master,
      lfoGain,
    }

    setIsPlaying(true)
  }, [])

  const toggle = useCallback(async () => {
    if (isPlaying) {
      await stop()
      return
    }

    await start()
  }, [isPlaying, start, stop])

  useEffect(() => {
    return () => {
      void stop()
    }
  }, [stop])

  return { isPlaying, toggle }
}
