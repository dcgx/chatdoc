import AWS from "aws-sdk"
import fs from "fs"

export async function downloadFromS3(fileKey: string) {
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

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: fileKey,
        }
        const obj = await s3.getObject(params).promise();
        const tmpFileName = `/tmp/pdf-${Date.now()}.pdf`;
        console.log(tmpFileName, 'tmpFileName')
        fs.writeFileSync(tmpFileName, obj.Body as Buffer)
        return tmpFileName
    } catch (error) { }

}
