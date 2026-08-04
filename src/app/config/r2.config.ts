import { HeadBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { config } from './env.config';

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `${config.r2.accessKeyId}`,
        secretAccessKey: `${config.r2.secretAccessKey}`,
    }
});

export const initializeR2 = async () => {
    await s3Client.send(new HeadBucketCommand({ Bucket: config.r2.bucketName }));
    return s3Client;
};

export default s3Client;