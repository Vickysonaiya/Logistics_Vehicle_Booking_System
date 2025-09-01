import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
