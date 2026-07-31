import multer from "multer";

const MAX_FILE_SIZE: number = 10 * 1024 * 1024; // 10 mb
const ACCEPTED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    if(ACCEPTED_MIMES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("only images are allowed"));
}

const multerUpload = multer({
    storage,
    limits: { 
        fileSize: MAX_FILE_SIZE, 
    },
    fileFilter
})

export default multerUpload;

