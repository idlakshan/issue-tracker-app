import express from "express";
import { createIssue, deleteIssue, getIssues, getIssueStats, updateIssue } from "../application/issueController.js";
import { auth } from "../config/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/", auth, getIssues);
router.get("/stats", auth, getIssueStats);
router.put("/:id", auth, updateIssue);
router.delete("/:id", auth, deleteIssue);

export default router;