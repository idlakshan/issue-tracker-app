import { Activity } from "../domain/models/Activity.js";


export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "firstName lastName")
      .populate("issue", "title")
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
}