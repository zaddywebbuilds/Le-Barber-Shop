import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})`, width: '100%' }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de la lecture"
    />
  )
}
