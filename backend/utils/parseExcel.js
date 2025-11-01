import XLSX from "xlsx";
import fs from "fs";

export const parseExcelFile = async (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  fs.unlinkSync(filePath); // remove uploaded file after parsing
  return sheetData;
};
