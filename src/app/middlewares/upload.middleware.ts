import multerUpload from "../config/multer.config";

const MAX_FILE: number = 10;

const uploadSingleImage = multerUpload.single('image');
const uploadImages = multerUpload.array('images', MAX_FILE);

export { uploadSingleImage, uploadImages };
export default uploadImages;