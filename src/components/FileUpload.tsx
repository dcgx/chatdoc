'use client'

import React from 'react'
import axios from 'axios'

import { Inbox } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const FileUpload = () => {
  const router = useRouter()
  const [isUploading, setIsUploading] = React.useState(false)
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string
      fileName: string
    }) => {
      const response = await axios.post('/api/create-chat', {
        fileKey,
        fileName,
      })
      console.log(response, 'response')
      return response.data
    },
  })
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles)
      const file = acceptedFiles[0]

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File is too large. Please upload a file less than 10 MB.')
        return
      }
      try {
        setIsUploading(true)
        const data = await uploadToS3(file)

        if (!data?.fileKey || !data?.fileName) {
          toast.error('Something went wrong. Please try again.')
          return
        }

        mutate(data, {
          onSuccess: ({ chatId }) => {
            toast.success('Chat created successfully!')
            router.push(`/chat/${chatId}`)
          },
          onError: (error) => {
            console.log(error)
            toast.error('Something went wrong. Please try again.')
          },
        })
      } catch (err) {
        console.log(err)
      } finally {
        setIsUploading(false)
      }
    },
  })

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className: 'p-2 border-2 border-gray-300 border-dashed rounded-xl',
        })}
      >
        <input {...getInputProps()} />
        {isUploading || isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <Inbox className="w-12 h-12 mx-auto text-gray-400" />
            <p className="text-center text-gray-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  )
}
