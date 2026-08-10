import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pages = [
    '/',
    '/#about',
    '/#skills',
    '/#architecture',
    '/#experience',
    '/#projects',
    '/#contact'
  ]

  return pages.map((p) => ({
    url: `${siteUrl.replace(/\/$/, '')}${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : 0.8,
  }))
} 