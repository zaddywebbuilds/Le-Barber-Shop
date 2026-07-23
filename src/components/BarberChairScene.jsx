import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Each ring receives a spinRef — rotation is driven by a single useFrame in SceneContent
function GlobeRing({ radius = 1.8, thickness = 0.013, tiltX = 0, tiltZ = 0, opacity = 0.75, color = '#B8843D', spinRef }) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.95,
    roughness: 0.07,
    envMapIntensity: 1.2,
    transparent: true,
    opacity,
  }), [color, opacity])

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={spinRef}>
        <mesh>
          <torusGeometry args={[radius, thickness, 8, 64]} />
          <primitive object={mat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

function AtmosphericParticles() {
  return (
    <Sparkles
      count={40}
      scale={[5, 5, 3]}
      size={0.5}
      speed={0.08}
      opacity={0.22}
      color="#EFD9B1"
    />
  )
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#1A1410" />
      <directionalLight position={[3, 4, 3]} intensity={1.8} color="#EFD9B1" />
      <directionalLight position={[-4, 2, -1]} intensity={0.4} color="#182535" />
      <pointLight position={[0, 2, 2]} intensity={2.5} color="#B8843D" distance={9} decay={2} />
      <pointLight position={[-2, -2, 1]} intensity={0.6} color="#8B3A45" distance={6} decay={2} />
    </>
  )
}

const SPIN_SPEEDS = [0.16, 0.11, 0.21, -0.25, 0.06]

function SceneContent() {
  const r0 = useRef(), r1 = useRef(), r2 = useRef(), r3 = useRef(), r4 = useRef()
  const refs = [r0, r1, r2, r3, r4]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    refs.forEach((ref, i) => {
      if (ref.current) ref.current.rotation.y = t * SPIN_SPEEDS[i]
    })
  })

  return (
    <>
      <SceneLighting />
      <AtmosphericParticles />
      <GlobeRing spinRef={r0} radius={1.85} thickness={0.016} tiltX={0}           tiltZ={0}            opacity={0.88} />
      <GlobeRing spinRef={r1} radius={1.85} thickness={0.013} tiltX={Math.PI / 2}  tiltZ={0}            opacity={0.75} />
      <GlobeRing spinRef={r2} radius={1.80} thickness={0.011} tiltX={Math.PI / 4}  tiltZ={Math.PI / 6}  opacity={0.62} />
      <GlobeRing spinRef={r3} radius={1.72} thickness={0.010} tiltX={Math.PI / 3}  tiltZ={-Math.PI / 4} opacity={0.48} />
      <GlobeRing spinRef={r4} radius={2.28} thickness={0.007} tiltX={0.25}         tiltZ={0.12}         opacity={0.20} color="#C8A870" />
    </>
  )
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="opacity-50">
        <svg viewBox="0 0 140 140" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="70" r="64" stroke="#B8843D" strokeWidth="0.6" strokeDasharray="4 7" />
          <circle cx="70" cy="70" r="48" stroke="#B8843D" strokeWidth="0.4" opacity="0.5" />
          <circle cx="70" cy="70" r="32" stroke="#B8843D" strokeWidth="0.3" opacity="0.3" />
          <text x="70" y="78" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#B8843D" fontWeight="300">
            LE BARBER
          </text>
        </svg>
      </div>
    </div>
  )
}

export default function BarberChairScene({ scrollY = 0, use3D = true }) {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !window.IntersectionObserver) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (!use3D) return <StaticFallback />

  return (
    <div ref={containerRef} className="webgl-container absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'demand'}
        gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
