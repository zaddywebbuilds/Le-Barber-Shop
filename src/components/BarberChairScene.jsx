import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// One ring: a fixed tilt outer group + a spinning inner group
// Creates the gyroscope/armillary sphere effect
function GlobeRing({ radius = 1.8, thickness = 0.013, tiltX = 0, tiltZ = 0, spinSpeed = 0.18, opacity = 0.75, color = '#B8843D' }) {
  const spinRef = useRef()

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.95,
    roughness: 0.07,
    envMapIntensity: 2.5,
    transparent: true,
    opacity,
  }), [color, opacity])

  useFrame(({ clock }) => {
    if (!spinRef.current) return
    spinRef.current.rotation.y = clock.getElapsedTime() * spinSpeed
  })

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={spinRef}>
        <mesh>
          <torusGeometry args={[radius, thickness, 12, 128]} />
          <primitive object={mat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

function AtmosphericParticles() {
  return (
    <Sparkles
      count={55}
      scale={[5, 5, 3]}
      size={0.55}
      speed={0.1}
      opacity={0.28}
      color="#EFD9B1"
    />
  )
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1A1410" />
      <directionalLight position={[3, 4, 3]} intensity={1.8} color="#EFD9B1" />
      <directionalLight position={[-4, 2, -1]} intensity={0.4} color="#182535" />
      <pointLight position={[0, 2, 2]} intensity={2.5} color="#B8843D" distance={9} decay={2} />
      <pointLight position={[-2, -2, 1]} intensity={0.6} color="#8B3A45" distance={6} decay={2} />
    </>
  )
}

function SceneContent() {
  return (
    <>
      <SceneLighting />
      <Environment preset="studio" />
      <AtmosphericParticles />

      {/* Armillary sphere — 5 rings at varied tilts, all spinning independently */}
      {/* Equatorial */}
      <GlobeRing radius={1.85} thickness={0.016} tiltX={0}           tiltZ={0}            spinSpeed={0.16}  opacity={0.88} />
      {/* Polar meridian */}
      <GlobeRing radius={1.85} thickness={0.013} tiltX={Math.PI / 2}  tiltZ={0}            spinSpeed={0.11}  opacity={0.75} />
      {/* Oblique 45° */}
      <GlobeRing radius={1.80} thickness={0.011} tiltX={Math.PI / 4}  tiltZ={Math.PI / 6}  spinSpeed={0.21}  opacity={0.62} />
      {/* Reverse oblique — spins backwards for depth */}
      <GlobeRing radius={1.72} thickness={0.010} tiltX={Math.PI / 3}  tiltZ={-Math.PI / 4} spinSpeed={-0.25} opacity={0.48} />
      {/* Outer halo — slow, nearly transparent */}
      <GlobeRing radius={2.28} thickness={0.007} tiltX={0.25}         tiltZ={0.12}         spinSpeed={0.06}  opacity={0.20} color="#C8A870" />
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
  if (!use3D) return <StaticFallback />

  return (
    <div className="webgl-container absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
