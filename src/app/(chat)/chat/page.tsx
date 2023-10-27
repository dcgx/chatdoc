import Chat from '@/components/Chat'
import ChatHistory from '@/components/ChatHistory'
import { FileUpload } from '@/components/FileUpload'
import PDFViewer from '@/components/PDFViewer'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    chatId: string
  }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/sign-in')
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
  console.log({ userId, _chats })
  //   if (!_chats) {
  //     return redirect('/')
  //   }
  //   if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
  //     return redirect('/')
  //   }

  //   const currentChat = _chats.find((chat) => chat.id === parseInt(chatId))
  const isPro = await checkSubscription()

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <div className="flex-[1] max-w-xs">
          <ChatHistory chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        <div className='max-h-screen p-4 oveflow-scroll flex-[5] flex items-center'>
          <FileUpload />
        </div>
        {/* <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdfUrl={currentChat?.pdfUrl || ''} />
        </div>
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <Chat chatId={parseInt(chatId)} />
        </div> */}
      </div>
    </div>
  )
}

export default ChatPage