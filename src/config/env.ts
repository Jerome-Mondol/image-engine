import dotenv from 'dotenv'
dotenv.config();

// output configs interface
interface AppConfig {
    port: number;
    r2: {
        accountId: string;
        accessKeyId: string;
        secretAccessKey: string;
        bucketName: string;
    };
}



// required env set
const requiredEnv = [
    'PORT',
    'ACCOUNT_ID',
    'ACCESS_KEY_ID',
    'SECRET_ACCESS_KEY',
    'IMAGE_BUCKET_NAME',
]

// required env check
for(const env of requiredEnv) {
    if(!process.env[env]) {
        throw new Error(`Missing required env variable: ${env}`);
    }
}

export const config: AppConfig = {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    r2: {
        accountId: process.env.ACCOUNT_ID!,
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
        bucketName: process.env.IMAGE_BUCKET_NAME!
    },
}


