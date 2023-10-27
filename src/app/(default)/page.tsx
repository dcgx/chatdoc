export const metadata: Metadata = {
  title: 'ChatPDF',
  description: 'ChatPDF is a web app that allows learn your PDF files.',
}

import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/FileUpload'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'

import { LogIn } from 'lucide-react'
import Hero from '@/components/landing/Hero'
import { Metadata } from 'next'
import Features from '@/components/landing/Features'
import FeaturesBlocks from '@/components/landing/FeaturesBlocks'
import Testimonials from '@/components/landing/Testimonials'
import Newsletter from '@/components/landing/Newsletter'

export default async function Home() {
  const { userId } = await auth()
  const isAuthenticated = !!userId

  return (
    <main>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
