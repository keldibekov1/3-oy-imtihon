import {Router} from 'express'
import uploadService from '../services/uploadService.js';

let MulterRoute = Router();
// Fayl yuklash uchun route
MulterRoute.post('/upload', uploadService.uploadFile(), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

export default  MulterRoute;
