import { compressToBuffer } from "./compress.js"
import { uploadImageToR2 } from "./s3-operations.js";

const uploadImage = async (filename, destinationFilename) => {
    const compressedBuffer = await compressToBuffer(filename);
    const uploadImage = await uploadImageToR2(compressedBuffer, destinationFilename);
}

const imageDestination = `uploads/compressed-${Date.now()}.webp`;
uploadImage('input.jpg', imageDestination);