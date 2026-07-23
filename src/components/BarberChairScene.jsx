import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Barber Chair built from primitives
function BarberChair({ scrollY }) {
  const groupRef = useRef()
  const baseRef = useRef()

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Gentle sway from mouse
    groupRef.current.rotation.y = pointer.x * 0.15 + Math.sin(t * 0.3) * 0.05
    groupRef.current.rotation.x = pointer.y * 0.05
    // Scroll depth effect
    groupRef.current.position.z = -scrollY * 0.002
    if (baseRef.current) {
      baseRef.current.rotation.y = t * 0.1
    }
  })

  const brassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B8843D',
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.5,
  }), [])

  const leatherMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0D0A08',
    metalness: 0.0,
    roughness: 0.85,
  }), [])

  const darkMetalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1410',
    metalness: 0.7,
    roughness: 0.3,
  }), [])

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base disc — brushed brass */}
      <mesh ref={baseRef} position={[0, -1.8, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.12, 64]} />
        <primitive object={brassMat} attach="material" />
      </mesh>

      {/* Central pole */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 2, 16]} />
        <primitive object={brassMat} attach="material" />
      </mesh>

      {/* Seat */}
      <mesh position={[0, 0.3, 0.1]}>
        <boxGeometry args={[1.1, 0.15, 1.0]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>
      {/* Seat cushion rounding */}
      <mesh position={[0, 0.38, 0.1]}>
        <boxGeometry args={[1.0, 0.08, 0.9]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>

      {/* Back rest */}
      <mesh position={[0, 1.1, -0.35]}>
        <boxGeometry args={[1.0, 1.4, 0.14]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>

      {/* Head rest */}
      <mesh position={[0, 1.92, -0.3]}>
        <boxGeometry args={[0.7, 0.3, 0.2]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.65, 0.65, 0.1]}>
        <boxGeometry args={[0.1, 0.5, 0.85]} />
        <primitive object={darkMetalMat} attach="material" />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.65, 0.65, 0.1]}>
        <boxGeometry args={[0.1, 0.5, 0.85]} />
        <primitive object={darkMetalMat} attach="material" />
      </mesh>

      {/* Arm rest pads */}
      <mesh position={[-0.65, 0.92, 0.1]}>
        <boxGeometry args={[0.14, 0.06, 0.7]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>
      <mesh position={[0.65, 0.92, 0.1]}>
        <boxGeometry args={[0.14, 0.06, 0.7]} />
        <primitive object={leatherMat} attach="material" />
      </mesh>

      {/* Footrest */}
      <mesh position={[0, -0.5, 0.75]}>
        <boxGeometry args={[0.9, 0.06, 0.25]} />
        <primitive object={brassMat} attach="material" />
      </mesh>

      {/* Brass rings decoration on back */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 1.05, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.09, 0.018, 8, 32]} />
          <primitive object={brassMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// Floating Tools
function FloatingScissors() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.1 + Math.PI / 4
    ref.current.position.y = Math.sin(t * 0.7) * 0.08
  })

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C0A060',
    metalness: 0.95,
    roughness: 0.05,
    envMapIntensity: 2,
  }), [])

  return (
    <group ref={ref} position={[1.6, 0.8, 0.4]}>
      {/* Blade 1 */}
      <mesh rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.65, 0.015]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Blade 2 */}
      <mesh rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.04, 0.65, 0.015]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Handle ring */}
      {[-0.28, 0.28].map((y, i) => (
        <mesh key={i} position={[0, y * 0.9, 0]}>
          <torusGeometry args={[0.09, 0.025, 12, 32]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function FloatingClipper() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.z = Math.sin(t * 0.4 + 1) * 0.08
    ref.current.position.y = Math.sin(t * 0.6 + 2) * 0.06
  })

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1A1510',
    metalness: 0.5,
    roughness: 0.4,
  }), [])

  const detailMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B8843D',
    metalness: 0.9,
    roughness: 0.15,
  }), [])

  return (
    <group ref={ref} position={[-1.7, 0.5, 0.5]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.22, 0.75, 0.12]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>
      {/* Blade head */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.28, 0.12, 0.06]} />
        <primitive object={detailMat} attach="material" />
      </mesh>
      {/* Grip lines */}
      {[-0.15, 0, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0.065]}>
          <boxGeometry args={[0.2, 0.015, 0.005]} />
          <primitive object={detailMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function FloatingComb() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.z = Math.sin(t * 0.35 + 3) * 0.12
    ref.current.position.y = Math.sin(t * 0.55 + 1) * 0.1
  })

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C8A870',
    metalness: 0.7,
    roughness: 0.3,
  }), [])

  return (
    <group ref={ref} position={[0.8, 1.5, 0.6]}>
      {/* Spine */}
      <mesh>
        <boxGeometry args={[0.85, 0.1, 0.025]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Teeth */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[-0.38 + i * 0.05, -0.12, 0]}>
          <boxGeometry args={[0.02, 0.16, 0.02]} />
          <primitive object={mat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// Atmospheric Brass Rings
function BrassRing({ radius, position, rotationSpeed = 0.3 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.getElapsedTime() * rotationSpeed
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed * 0.7
  })

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#B8843D',
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 2,
    transparent: true,
    opacity: 0.6,
  }), [])

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.012, 8, 128]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// Barber Pole
function BarberPole() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.8
  })

  return (
    <group ref={ref} position={[2.2, -0.3, -0.5]}>
      {/* Pole body */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 12]} />
        <meshStandardMaterial color="#F5F0E8" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Spiral stripes */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <mesh key={i} position={[0, -0.3 + offset * 1.2, 0]} rotation={[0, offset * Math.PI * 2, 0]}>
          <torusGeometry args={[0.045, 0.012, 8, 24, Math.PI * 0.7]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#B8843D' : '#661F2B'}
            metalness={0.4}
            roughness={0.4}
          />
        </mesh>
      ))}
      {/* Cap */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#B8843D" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}

// Particles
function AtmosphericParticles() {
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  return (
    <Sparkles
      count={count}
      position={[0, 0, 0]}
      scale={[5, 5, 3]}
      size={0.4}
      speed={0.15}
      opacity={0.25}
      color="#EFD9B1"
    />
  )
}

// Scene Lighting
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#2A201A" />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#EFD9B1" castShadow />
      <directionalLight position={[-3, 2, -1]} intensity={0.4} color="#182330" />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#B8843D" distance={8} decay={2} />
      <pointLight position={[-2, -1, 1]} intensity={0.5} color="#661F2B" distance={5} decay={2} />
      <spotLight
        position={[0, 5, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={2}
        color="#EFD9B1"
        castShadow
      />
    </>
  )
}

// Inner scene
function SceneContent({ scrollY }) {
  return (
    <>
      <SceneLighting />
      <Environment preset="studio" />
      <AtmosphericParticles />

      <BrassRing radius={1.8} position={[0, 0, -0.5]} rotationSpeed={0.15} />
      <BrassRing radius={2.5} position={[0.2, -0.1, -1]} rotationSpeed={0.08} />
      <BrassRing radius={1.2} position={[-0.3, 0.5, 0]} rotationSpeed={0.22} />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <BarberChair scrollY={scrollY} />
      </Float>

      <FloatingScissors />
      <FloatingClipper />
      <FloatingComb />
      <BarberPole />
    </>
  )
}

// Static fallback
function StaticFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(42,32,26,0.6) 0%, transparent 70%)',
      }}
    >
      <div className="text-center opacity-60">
        {/* SVG barber scissors icon */}
        <svg viewBox="0 0 120 120" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="55" stroke="#B8843D" strokeWidth="0.5" strokeDasharray="3 6" />
          <circle cx="60" cy="60" r="40" stroke="#B8843D" strokeWidth="0.3" opacity="0.5" />
          <text x="60" y="68" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="28" fill="#B8843D" fontWeight="300">
            LB
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
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <SceneContent scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  )
}
