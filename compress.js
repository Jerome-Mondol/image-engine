import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const compressToBuffer = async (imagePath) => {
    const fileSizeBeforeCompression = (fs.statSync(imagePath).size / 1024).toFixed(2);
    const compressedBuffer = await sharp(imagePath)
            .resize({ width: 1200 })
            .webp({ 
                quality: 80,
                effort: 5,
                smartSubsample: true
            })
            .toBuffer();

    const fileSizeAfterCompression = (fs.statSync('compressed.webp').size / 1024).toFixed(2);
    
    return compressedBuffer;
}

