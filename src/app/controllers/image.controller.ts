import { Request, Response } from "express";
import { ImageService } from "../services/image.service";

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const files = Array.isArray(req.files) ? req.files : req.file ? [req.file] : [];

        if (!files.length) {
            return res.status(400).json({
                success: false,
                message: "No image files provided.",
            });
        }

        const destination = typeof req.body?.destination === "string" && req.body.destination.trim()
            ? req.body.destination.trim()
            : "images";

        const uploadedImages = await ImageService.uploadImages(files, destination);

        return res.status(201).json({
            success: true,
            message: "Image(s) uploaded successfully.",
            data: uploadedImages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload image(s).",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};