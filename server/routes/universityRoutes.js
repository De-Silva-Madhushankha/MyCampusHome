import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.js";
import University from "../models/universityModel.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.get("/", async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const universities = await University.find(filter);
    res.json(universities);
    console.log(universities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch universities", error });
  }
});


router.post("/", async (req, res) => {
  try {

    const newUniversity = new University({
      name: req.body.name,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
    });
    await newUniversity.save();

    res.status(201).json(newUniversity);
  } catch (error) {
    res.status(500).json({ message: "Failed to add university", error });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete university", error });
  }
});

export default router;
