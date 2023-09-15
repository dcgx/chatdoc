import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Chats | ChatPDF',
  description: 'ChatPDF is a web app that allows learn your PDF files.',
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <body className={inter.className}>{children}</body>
      <Toaster />
    </div>
  )
}
