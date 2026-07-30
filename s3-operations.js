import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { compressToBuffer } from './compress.js';
import { configDotenv } from 'dotenv';

configDotenv();

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const BUCKET_NAME=process.env.IMAGE_BUCKET_NAME;


if(!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error('credentials missing');
}

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
		accessKeyId: `${ACCESS_KEY_ID}`,
		secretAccessKey: `${SECRET_ACCESS_KEY}`,
	}
})


export const uploadImageToR2 = async (imgBuffer, destinationFilename) => {
    try {
        const uploadSchema = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: destinationFilename,
            Body: imgBuffer,
            ContentType: 'image/webp',
        })
        await s3.send(uploadSchema);
        console.log("Image uploaded successfully");
    } catch(err) {
        console.log(err);
    }
}