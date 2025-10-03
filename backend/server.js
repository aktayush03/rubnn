import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB Connected ✅");
  app.listen(process.env.PORT || 5000, () => console.log("Server running 🚀"));
})
.catch(err => console.log(err));