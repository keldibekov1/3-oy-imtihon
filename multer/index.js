import multer from "multer";

// Fayllar uchun saqlash konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Yuklangan fayllar shu papkaga saqlanadi
    },
    filename: (req, file, cb) => {
        cb(null, Math.random() + '-' + file.originalname); // Fayl nomini o'zgartirish
    }
});

// Multer o'rnatish
const upload = multer({ storage: storage });

// Fayl yuklash uchun endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});
