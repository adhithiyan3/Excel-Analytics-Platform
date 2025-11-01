import express from "express";
import multer from "multer";
import { uploadExcel, getUserUploads } from "../controllers/excelController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyToken, upload.single("file"), uploadExcel);
router.get("/uploads", verifyToken, getUserUploads);

export default router;
