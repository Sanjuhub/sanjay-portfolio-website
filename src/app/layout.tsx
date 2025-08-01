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

export const metadata: Metadata = {
  title: 'Sanjay Kumar - Backend Developer',
  description: 'Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS. Building scalable systems with 6+ years of experience.',
  keywords: 'backend developer, nodejs, nestjs, postgresql, aws, fullstack developer',
  authors: [{ name: 'Sanjay Kumar' }],
  openGraph: {
    title: 'Sanjay Kumar - Backend Developer',
    description: 'Senior Backend Developer specializing in Node.js, NestJS, PostgreSQL, and AWS',
    type: 'website',
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
      </body>
    </html>
  )
}
