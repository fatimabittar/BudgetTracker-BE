import express from "express";
import {
    registerUser,
    getAllUsers,
    loginUser,
    getMe,
    deleteUser
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

//add the user
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/", getAllUsers);
router.delete("/:userId", deleteUser);

export default router;
