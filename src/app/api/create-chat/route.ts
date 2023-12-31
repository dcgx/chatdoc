import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { loadS3IntoPinecone } from '@/lib/pinecone'
import { getS3Url } from '@/lib/s3'
import { auth } from '@clerk/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(
    req: Request,
    res: Response
) {
    const { userId } = await auth()
    console.log(userId, 'userId')
    if (!userId) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const { fileKey, fileName } = body
    console.log(fileKey, fileName)
    await loadS3IntoPinecone(fileKey)
    const chatId = await db.insert(chats).values({
        fileKey,
        pdfName: fileName,
        pdfUrl: getS3Url(fileKey),
        userId,

    }).returning({
        insertedId: chats.id,
    })
    return NextResponse.json({
        chatId: chatId[0].insertedId
    }, { status: 200 })
}