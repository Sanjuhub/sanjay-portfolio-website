'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mermaid?: any
  }
}

const scriptUrl = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js'

const MermaidDiagram = ({ code }: { code: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadMermaid = async () => {
      if (typeof window === 'undefined') return

      try {
        if (!window.mermaid) {
          const script = document.createElement('script')
          script.src = scriptUrl
          script.async = true
          script.onload = () => {
            if (!isMounted) return
            window.mermaid.initialize({ startOnLoad: false, theme: 'dark' })
            setReady(true)
          }
          document.body.appendChild(script)
        } else {
          window.mermaid.initialize({ startOnLoad: false, theme: 'dark' })
          setReady(true)
        }
      } catch {
        setReady(false)
      }
    }

    loadMermaid()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!ready || !containerRef.current || !window.mermaid) return

    const node = containerRef.current
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
    window.mermaid.render(id, code, (svgCode: string) => {
      if (node) {
        node.innerHTML = svgCode
      }
    })
  }, [ready, code])

  return (
    <div className="min-h-[220px] px-4 py-4" ref={containerRef} aria-label="Architecture diagram">
      {!ready && (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-400">
          Loading diagram…
        </div>
      )}
    </div>
  )
}

export default MermaidDiagram
