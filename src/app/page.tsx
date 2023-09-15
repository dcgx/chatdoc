import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'

import { LogIn } from 'lucide-react'
import { FileUpload } from '@/components/FileUpload'

export default async function Home() {
  const { userId } = await auth()
  const isAuthenticated = !!userId

  return (
    <main>
      <div className="w-screen min-h-screen bg-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-6xl p-4 text-center font-bold from-slate-900 to-slate-700   bg-gradient-to-r bg-clip-text text-transparent">
                Chat with your documents
              </h1>
              <UserButton afterSignOutUrl="/" />
            </div>

            <p className="max-w-xl text-lg text-slate-600 mt-2">
              ChatDOC is a ChatGPT-based file-reading assistant that can quickly
              extract, locate, and summarize information from PDF documents
            </p>

            <div className="flex my-5">
              {isAuthenticated ? (
                <Button>Got to Chats</Button>
              ) : (
                <Link href={'/signin'}>
                  <Button>
                    Login to get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="my-5">{/* <img /> */}</div>

            {/* <div className="w-full mt-4">
              {isAuthenticated ? (
                <FileUpload />
              ) : (
                <Link href={'/signin'}>
                  <Button>
                    Login to get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  )
}
