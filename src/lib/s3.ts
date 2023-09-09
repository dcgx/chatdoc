import AWS from 'aws-sdk'

export async function uploadToS3(file: File) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_SECRET_KEY,
        })

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            },
            region: 'us-east-1',
        })

        const fileKey = `uploads/${Date.now().toString()}_${file.name.replace(' ', '_')}`

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: fileKey,
            Body: file,
        }

        const upload = s3.putObject(params).on('httpUploadProgress', (progress) => {
            console.log('uploading to s3...', parseInt((progress.loaded * 100) / progress.total + '').toString() + '%')
        }).promise()

        await upload.then((data) => {
            console.log('upload to s3 success', data)

        })

        return Promise.resolve({
            fileKey,
            fileName: file.name
        })
    } catch (error) { }
}


export function getS3Url(fileKey: string) {
     return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${fileKey}`
}