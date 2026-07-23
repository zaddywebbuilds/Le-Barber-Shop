import { useState, useEffect } from 'react'

export function useWebGL() {
  const [supported, setSupported] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [saveData, setSaveData] = useState(false)
  const [lowEnd, setLowEnd] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    const handleMotion = (e) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotion)

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (conn?.saveData) setSaveData(true)

    // Disable 3D on low-RAM (< 2 GB) or low-core-count (≤ 2) devices
    const mem = navigator.deviceMemory
    const cores = navigator.hardwareConcurrency
    if ((mem !== undefined && mem < 2) || (cores !== undefined && cores <= 2)) {
      setLowEnd(true)
    }

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(!!gl)
    } catch {
      setSupported(false)
    }

    return () => motionQuery.removeEventListener('change', handleMotion)
  }, [])

  const use3D = supported === true && !saveData && !reducedMotion && !lowEnd

  return { supported, reducedMotion, saveData, use3D }
}
