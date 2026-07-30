import { S3Client} from '@aws-sdk/client-s3';
import { config } from './env.ts'


export const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `${ACCESS_KEY_ID}`,
        secretAccessKey: `${SECRET_ACCESS_KEY}`,
    }
})
