import express from "express";
import { createIssue, getIssues } from "../application/issueController.js";
import { auth } from "../config/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/", auth, getIssues);

export default router;