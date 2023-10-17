import { HandlesFile } from '../presentation/protocols/handlesFile'

import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_AWS_REGION
})


const s3 = new AWS.S3({
    apiVersion: process.env.S3_AWS_API_VERSION, //'2006-03-01',
    region: process.env.S3_AWS_REGION
})

export class AwsFiles implements HandlesFile {
    async upload(fileName, file, bucket): Promise<any> {
        try {
            const params = {
                Bucket: bucket,
                Key: fileName,
                Body: file
            }
            // console.log(params, "aaa");

            const data = await s3.upload(params).promise()

            return data.Key
        } catch (error) {
            throw new Error(error)
        }
    }

    async list(bucket): Promise<any> {
        try {
            const params = {
                Bucket: bucket
                // Prefix: decodeURIComponent(filter)
            }

            const result = await s3.listObjectsV2(params).promise()

            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getFiles(nameFile: string, bucket: string): Promise<any> {
        try {
            const params = {
                Bucket: bucket,
                Key: nameFile
            }

            const result = await s3.getObject(params).promise()

            return result
        } catch (error) {
            throw Error(error)
        }
    }

    async delete(fileName, bucket): Promise<void> {
        try {
            const params = {
                Bucket: bucket,
                Key: fileName
            }

            const data = await s3.deleteObject(params).promise()

            console.log(data);

        } catch (error) {
            throw new Error(error)
        }
    }
}
