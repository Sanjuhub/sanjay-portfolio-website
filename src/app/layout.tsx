import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Sanjay Kumar - Backend Developer',
  description: 'Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS. Building scalable systems with 6+ years of experience.',
  keywords: 'backend developer, nodejs, nestjs, postgresql, aws, fullstack developer',
  authors: [{ name: 'Sanjay Kumar' }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
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
                'https://github.com/findmesektor',
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
      </body>
    </html>
  )
}
