import { Router } from "express";
import multer from "./../multer/index.js";

let multerRoute = Router();

multerRoute.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

export default multerRoute;