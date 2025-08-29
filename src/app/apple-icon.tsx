import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #0b1020 100%)',
          borderRadius: 36,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 25% 25%, rgba(79,70,229,0.35), transparent 40%), radial-gradient(circle at 75% 35%, rgba(6,182,212,0.35), transparent 40%)',
            borderRadius: 36,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -1,
          }}
        >
          SK
        </div>
      </div>
    ),
    size
  )
} 