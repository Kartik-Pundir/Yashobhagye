'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // 1. Scene
    const scene = new THREE.Scene()

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 90
    camera.position.y = 35
    camera.lookAt(0, 0, 0)

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 4. Particles Geometry
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Color definitions
    const colorPrimary = new THREE.Color('#1A3C2E') // deep forest green
    const colorSecondary = new THREE.Color('#C4862A') // warm amber

    for (let i = 0; i < particleCount; i++) {
      // Grid positioning
      const x = (i % 40) * 4.5 - 90
      const z = Math.floor(i / 40) * 4.5 - 56
      const y = 0

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Interpolate colors to blend them beautifully
      const mixRatio = Math.random()
      const mixedColor = new THREE.Color().lerpColors(colorPrimary, colorSecondary, mixRatio)
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // 5. Create a radial gradient texture for smooth, circular particles
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 16)
    }
    const texture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: texture,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // 6. Animation Clock
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute

      for (let i = 0; i < particleCount; i++) {
        const x = positionAttribute.getX(i)
        const z = positionAttribute.getZ(i)

        // Multi-frequency wave calculation creating ripple-like patterns
        const y = Math.sin(x * 0.04 + elapsedTime * 0.8) * 3.5 + 
                  Math.cos(z * 0.05 + elapsedTime * 0.6) * 3.5
        positionAttribute.setY(i, y)
      }

      positionAttribute.needsUpdate = true

      // Slow orbital rotate
      points.rotation.y = elapsedTime * 0.015

      renderer.render(scene, camera)
    }

    animate()

    // 7. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#F9F6F0]"
    />
  )
}
