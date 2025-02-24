import  multer from 'multer';
import  path from 'path';

// Fayllarni saqlash konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Yuklangan fayllar shu papkaga saqlanadi
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Fayl nomini o'zgartirish
    }
});

// Multer o'rnatish
const upload = multer({ storage: storage });

// Fayl yuklashni qaytarish
const uploadFile = () => upload.single('file');

export default {uploadFile} ;