import express from "express";
import {
  createApplication,
  getUserApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router();

// Add application
router.post("/", verifyToken, createApplication);

// Get all applications of current user
router.get("/", verifyToken, getUserApplications);

// Update application status
router.patch("/:id", verifyToken, updateApplicationStatus);

// Delete application
router.delete("/:id", verifyToken, deleteApplication);

export default router;
