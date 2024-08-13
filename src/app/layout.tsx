import NextAuthProvider from '@/providers/NextAuth'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'INTELTS',
  description: 'Websites for practicing IELTS and Behavioral Interview',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
