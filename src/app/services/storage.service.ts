import { PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config/env.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/r2.config";



export class StorageService {

    static async generatePresignedUrl(key: string, contentType: string): Promise<string>  {
        const command = new PutObjectCommand({
            Bucket: config.r2.bucketName,
            Key: key,
            ContentType: contentType,
            CacheControl: 'public, max-age=31536000, immutable',
        })    

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 })
        return presignedUrl;
    }

    
}