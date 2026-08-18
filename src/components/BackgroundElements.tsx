'use client'

import { useEffect, useRef, useState } from 'react'

const PARTICLE_COUNT = 18
const MAX_CONNECTION_DISTANCE = 160

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

const createParticles = (width: number, height: number): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    radius: Math.random() * 1.8 + 1.2,
    alpha: Math.random() * 0.4 + 0.35
  }))

const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pointer: { x: number; y: number } | null
) => {
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(8, 12, 23, 0.82)'
  ctx.fillRect(0, 0, width, height)

  const gradient = ctx.createRadialGradient(
    width * 0.2,
    height * 0.25,
    0,
    width * 0.2,
    height * 0.25,
    width * 0.55
  )
  gradient.addColorStop(0, 'rgba(56, 189, 248, 0.18)')
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const gradient2 = ctx.createRadialGradient(
    width * 0.75,
    height * 0.2,
    0,
    width * 0.75,
    height * 0.2,
    width * 0.45
  )
  gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.16)')
  gradient2.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient2
  ctx.fillRect(0, 0, width, height)

  const gradient3 = ctx.createRadialGradient(
    width * 0.5,
    height * 0.75,
    0,
    width * 0.5,
    height * 0.75,
    width * 0.45
  )
  gradient3.addColorStop(0, 'rgba(16, 185, 129, 0.14)')
  gradient3.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient3
  ctx.fillRect(0, 0, width, height)

  if (pointer) {
    const mouseGlow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 220)
    mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.2)')
    mouseGlow.addColorStop(1, 'transparent')
    ctx.fillStyle = mouseGlow
    ctx.fillRect(0, 0, width, height)
  }
}

const BackgroundElements = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => setReduceMotion(mediaQuery.matches)
    handleMotionChange()
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame = 0
    let width = container.clientWidth
    let height = container.clientHeight
    const pointer = { x: width / 2, y: height / 2 }
    const particles = createParticles(width, height)

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      const scale = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.floor(width * scale)
      canvas.height = Math.floor(height * scale)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
    }

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1

        if (Math.random() < 0.002) {
          particle.vx += (Math.random() - 0.5) * 0.04
          particle.vy += (Math.random() - 0.5) * 0.04
        }
      })
    }

    const draw = () => {
      drawBackground(ctx, width, height, pointer)

      ctx.globalCompositeOperation = 'lighter'
      particles.forEach((particle) => {
        const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
        const glow = Math.max(0, 1 - distance / 360)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${particle.alpha * 0.7 + glow * 0.2})`
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)'
        ctx.fill()
      })

      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i += 1) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.hypot(dx, dy)
          if (distance < MAX_CONNECTION_DISTANCE) {
            ctx.globalAlpha = 1 - distance / MAX_CONNECTION_DISTANCE
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      if (!reduceMotion) {
        updateParticles()
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    const handleResize = () => {
      resize()
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    resize()
    draw()

    container.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      container.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [reduceMotion])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-pattern opacity-22" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.16),_transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_22%),radial-gradient(circle_at_50%_80%,_rgba(16,185,129,0.12),_transparent_24%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export default BackgroundElements
