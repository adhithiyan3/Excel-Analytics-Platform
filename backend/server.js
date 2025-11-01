import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { isAuthenticated } from "./middleware/auth.js"; // Import authentication middleware

import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import excelFile from "./models/ExcelFile.js";

config({ path: ".env" });

const app = express();

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
// Authentication routes (login, register) do not need isAuthenticated middleware
app.use("/api/auth", authRoutes);
app.use("/api/upload", isAuthenticated, uploadRoutes); // Protect upload routes with authentication

// DELETE file route
app.delete("/api/upload/:id", isAuthenticated, async (req, res) => { // Protect delete route
  try {
    const file = await excelFile.findByIdAndDelete(req.params.id); // Use the correct model
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "This is home route working" });
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "excel_analytics_backend",
  })
  .then(() => console.log("MongoDb Connected...!"))
  .catch((err) => console.log(err));
 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
