'use client'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
