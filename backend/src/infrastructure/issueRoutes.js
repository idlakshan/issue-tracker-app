import express from "express";
import { createIssue, getIssues, getIssueStats } from "../application/issueController.js";
import { auth } from "../config/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/", auth, getIssues);
router.get("/stats", auth, getIssueStats);

export default router;