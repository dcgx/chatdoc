import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatPDF',
  description: 'ChatPDF is a web app that allows learn your PDF files.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <header>
              <nav className="bg-slate-100 shadow">
                <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                  {/* <div className="flex items-center justify-between border-2 border-slate-900 py-3 px-4 rounded-r-full border-r-8 shadow-2xl">
                    <h1 className="text-4xl font-extralight mr-2">chat.doc</h1>
                    <img src="/documentos.png" width={70} alt="" />
                  </div> */}
                  <div className="flex items-center justify-between≤">
                    <img src="/documentos.png" width={30} alt="" />
                    <h1 className="text-2xl font-bold mx-2">chat.doc</h1>
                  </div>
                </div>
              </nav>
            </header>
            {children}
          </body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  )
}
