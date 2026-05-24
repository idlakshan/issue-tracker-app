import express from "express";
import { auth } from "../config/authMiddleware.js";
import { getRecentActivities } from "../application/activityController.js";


const router = express.Router();

router.get("/", auth, getRecentActivities);

export default router;