import ExcelFile from "../models/ExcelFile.js";
import { parseExcelFile } from "../utils/parseExcel.js";
import path from "path";

export const uploadExcel = async (req, res) => {
  try {
    console.log("file received:");
    const filePath = req.file.path;
    const jsonData = await parseExcelFile(filePath);


    const newFile = await ExcelFile.create({
      filename: req.file.originalname,
      data: jsonData,
    });

    res.status(201).json({ success: true, file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserUploads = async (req, res) => {
  try {
    const files = await ExcelFile.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
