import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { getExperienceLabel } from '@/lib/experience'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const experienceLabel = getExperienceLabel()

export const metadata: Metadata = {
  title: 'Sanjay Kumar - Backend Developer',
  description: `Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS. Building scalable systems with ${experienceLabel} years of experience.`,
  keywords: 'backend developer, nodejs, nestjs, postgresql, aws, fullstack developer',
  authors: [{ name: 'Sanjay Kumar' }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Sanjay Kumar - Backend Developer',
    description: 'Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS',
    type: 'website',
    url: siteUrl,
    siteName: 'Sanjay Kumar Portfolio',
    images: [{ url: '/opengraph-image' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Kumar - Backend Developer',
    description: 'Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS',
    images: ['/twitter-image'],
    creator: '@findmesektor'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  },
  creator: 'Sanjay Kumar',
  publisher: 'Sanjay Kumar',
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon', sizes: '180x180' }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-900 text-white`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sanjay Kumar',
              url: siteUrl,
              image: `${siteUrl}/profile.jpg`,
              jobTitle: 'Senior Backend Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance'
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN'
              },
              sameAs: [
                'https://github.com/Sanjuhub',
                'https://www.linkedin.com/in/findmesektor/',
                'mailto:sanjay14321@gmail.com'
              ],
              knowsAbout: [
                'Node.js',
                'NestJS',
                'PostgreSQL',
                'AWS',
                'System Design',
                'GraphQL',
                'Microservices'
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Sanjay Kumar Portfolio',
                url: siteUrl,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${siteUrl}/?q={search_term_string}`,
                  'query-input': 'required name=search_term_string'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Sanjay Kumar',
                url: siteUrl,
                logo: `${siteUrl}/icon.png`,
                sameAs: [
                  'https://github.com/Sanjuhub',
                  'https://www.linkedin.com/in/findmesektor/'
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  )
}
