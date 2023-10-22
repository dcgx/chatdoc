import './globals.css' // TODO: Eliminar
import '../css/style.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'

import 'aos/dist/aos.css'
import Header from '@/components/ui/header'

const inter = Inter({ subsets: ['latin'] })

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
            {/* <header>
              <nav className="bg-slate-100 shadow">
                <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                  <a
                    href="/"
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <img src="/documentos.png" width={30} alt="" />
                    <h1 className="text-2xl font-bold mx-2">chat.doc</h1>
                  </a>
                </div>
              </nav>
            </header> */}
            <Header />
            {children}
          </body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  )
}
