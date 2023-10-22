'use client'

import React from 'react'
import axios from 'axios'

import { UploadCloudIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {
  height?: number
}

export const FileUpload = ({ height = 250 }: Props) => {
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
      const response = await axios.post('/api/chat/create', {
        fileKey,
        fileName,
      })
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
    <div className="p-2 py-4 rounded-xl w-full mx-auto">
      <div
        {...getRootProps({
          className:
            'p-2 bg-white grid place-content-center cursor-pointer border-2 border-gray-100 border rounded-xl shadow w-full',
        })}
        style={{ height: `${height}px`,  }}
      >
        <input {...getInputProps()} />
        {isUploading || isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <UploadCloudIcon className="w-12 h-12 mx-auto text-gray-400" />
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xl font-semibold my-4 text-white rounded">
              Subir documentos
            </button>
            <p className="text-center text-gray-400">
              Se admiten PDF, escaneos, doc, docx, xls, xlsx, ppt, pptx, epub
            </p>
          </>
        )}
      </div>
    </div>
  )
}
