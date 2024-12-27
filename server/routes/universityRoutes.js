import express from "express";
import {
  getUniversities,
  addUniversity,
  deleteUniversity,
} from "../controllers/universityController.js";

const router = express.Router();

router.get("/", getUniversities);
router.post("/", addUniversity);
router.delete("/:id", deleteUniversity);

export default router;
