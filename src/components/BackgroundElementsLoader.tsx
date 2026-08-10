'use client'

import dynamic from 'next/dynamic'

const BackgroundElements = dynamic(
  () => import('./BackgroundElements').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" />
  }
)

export function BackgroundElementsLoader() {
  return <BackgroundElements />
}
