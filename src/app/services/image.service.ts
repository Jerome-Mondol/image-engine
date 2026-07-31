import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import s3Client from "../config/r2.config";
import { config } from "../config/env.config";

interface ImageBuffer {
    buffer: Buffer,
    mimeType: string,
}

export class ImageService {
    private static async processImage(file: Express.Multer.File) {
        const compressedBuffer = await sharp(file.buffer)
                    .resize({ width: 1200 })
                    .webp({ 
                        quality: 80,
                        effort: 5,
                        smartSubsample: true
                    })
                    .toBuffer();
        return {
            buffer: compressedBuffer,
            mimeType: 'image/webp'
        }
    }
    
    private static generateKey(destination: string) {
        const key: string = `${destination}/${Date.now()}.webp`
        return key;
    }

    private static async uploadToR2(file: ImageBuffer, destination: string) {

        const key = this.generateKey(destination);

        const uploadSchema = new PutObjectCommand({
            Bucket: config.r2.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimeType,
        })

        await s3Client.send(uploadSchema);

        return {
            key,
            url: `${config.r2.publicImages}/${key}`
        }
    }

    private static async uploadImage(file: Express.Multer.File, destination: string) {
        const { buffer, mimeType } = await this.processImage(file);

        const uploadedImage = await this.uploadToR2({buffer, mimeType}, destination);

        return uploadedImage;
    }
    
    static async uploadImages(files: Express.Multer.File[], destination: string) {
        return Promise.all(
            files.map(file => this.uploadImage(file, destination))
        )
    }
}