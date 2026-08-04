import { Router } from "express";
import { uploadImage } from "../controllers/image.controller";
import { uploadImages } from "../middlewares/upload.middleware";
import { assignPresignedUrl } from "../controllers/storage.controller";

const router = Router();

router.get("/", (_req, res) => {
	return res.status(200).json({
		success: true,
		message: "Storage route ready",
	});
});

router.post("/presigned-url", assignPresignedUrl);

export default router;