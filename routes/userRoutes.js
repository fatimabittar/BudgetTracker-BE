import express from "express";
import {
    registerUser,
    loginUser,
    getMe,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

//add the user
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;