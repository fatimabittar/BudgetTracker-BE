import Notification from "../models/notification.js";

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const newNotification = new Notification({
      message,
      userId,
    });
    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// Get all notifications for a user
const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

// Update a notification
const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { title, message } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { title, message },
      { new: true }
    );

    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndRemove(notificationId);
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

export {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  updateNotification,
  deleteNotification,
};
