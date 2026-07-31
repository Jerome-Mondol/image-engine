import { Router } from "express";
import { uploadImage } from "../controllers/image.controller";
import { uploadImages } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", (_req, res) => {
	return res.status(200).json({
		success: true,
		message: "Image routes are ready.",
	});
});

router.post("/upload", uploadImages, uploadImage);

export default router;