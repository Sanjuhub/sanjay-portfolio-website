import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
          borderRadius: 6,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 40%)',
            borderRadius: 6,
          }}
        />
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -0.5,
          }}
        >
          SK
        </div>
      </div>
    ),
    size
  )
} 