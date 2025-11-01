import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Auth Header:");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ message: "Access denied. No token provided.", success: false });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    // ✅ Fix: support both userId or id
    const id = decoded.userId || decoded.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid token.", success: false });
  }
};
