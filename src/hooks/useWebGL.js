import { useState, useEffect } from 'react'

export function useWebGL() {
  const [supported, setSupported] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)

    // Check save-data
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection?.saveData) setSaveData(true)

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(!!gl)
    } catch {
      setSupported(false)
    }
  }, [])

  // Disable 3D on low-end or data-saver devices
  const use3D = supported && !saveData && !reducedMotion

  return { supported, reducedMotion, saveData, use3D }
}
