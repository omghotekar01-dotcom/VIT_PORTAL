'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars, PerspectiveCamera } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.cos(time / 2)
  })

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 100]} scale={2.4}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>

      <mesh ref={meshRef} position={[5, 2, -5]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
      </mesh>

      <mesh position={[-6, -3, -2]}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="#ec4899" wireframe />
      </mesh>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
    </group>
  )
}

export const Hero3D = () => {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <AnimatedBackground />
        <fog attach="fog" args={['#050505', 10, 25]} />
      </Canvas>
    </div>
  )
}
