import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/components/providers/AppProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InstaGrow - Viral Instagram Growth Tool',
  description: 'Grow your Instagram following with AI-powered content, viral sharing, and ethical engagement pods',
  keywords: 'Instagram growth, social media marketing, AI content, viral marketing, engagement pods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}