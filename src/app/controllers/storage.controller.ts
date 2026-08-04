import { Request, Response } from "express";
import { FileFormat } from "../interfaces/storage.interface";
import { StorageService } from "../services/storage.service";

export const assignPresignedUrl = async (req: Request, res: Response) => {
    try {
    const { files } = req.body;
    
    if(!files.length) {
        return res.status(400).json({ error: "No Files uploaded" });
    }


    const presignedUrls = files.map(async (file: FileFormat) => {
        const extensionArr = file.name.split('.').pop();
        const key = `/images/${Date.now()}.${extensionArr}`

        const url = await StorageService.generatePresignedUrl(key, file.contentType);


        return {
            originalName: file.name,
            key,
            url,
        };

    }) 

    const result = await Promise.all(presignedUrls)
    
    return res.status(200).json({
        files: result
    });

    } catch(err) {
        res.status(500).json({ error: "failed to generate upload urls" })
    }
}