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

export default async function Home() {
  const { userId } = await auth()
  const isAuthenticated = !!userId

  return (
    <main>
      <Hero />
    </main>
  )
}
