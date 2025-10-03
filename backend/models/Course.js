import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);