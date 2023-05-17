import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  updateNotification,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
const router = express.Router();

// GET /api/notifications/:notificationId
router.get("/:notificationId", getNotificationsByUser);

// POST /api/notifications
router.post("/", createNotification);

// PUT /api/notifications/:notificationId
router.put("/:notificationId", updateNotification);

// DELETE /api/notifications/:notificationId
router.delete("/:notificationId", deleteNotification);

// PUT /api/notifications/:notificationId/read
router.put("/:notificationId/read", markNotificationAsRead);

export default router;
