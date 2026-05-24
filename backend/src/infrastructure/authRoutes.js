import { Router } from "express";
import { register, login, refresh, getAllUsers } from "../application/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh); 
router.get("/users", getAllUsers); 

export default router;