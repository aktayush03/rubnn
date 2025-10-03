import express from "express";
import Course from "../models/Course.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware for auth
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ msg: "No token provided" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

// Add Course
router.post("/", auth, async (req, res) => {
  try {
    const { title, platform, description, category } = req.body;
    const course = new Course({ title, platform, description, category });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("reviews.user", "username");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Review
router.post("/:id/review", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    course.reviews.push({ user: req.user.id, rating, comment });
    course.avgRating = course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length;
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;