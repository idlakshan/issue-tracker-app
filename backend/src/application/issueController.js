import {Activity} from "../domain/models/Activity.js";
import { Issue } from "../domain/models/Issue.js";


export const createIssue = async (req, res) => {
  try {
    const { title, description, priority, status, assignees } = req.body;
    const userId = req.user.id;

    let finalAssignees = assignees || [];
    
    if (!finalAssignees.includes(userId)) {
      finalAssignees.push(userId);
    }

    const newIssue = await Issue.create({
      title,
      description, 
      priority,
      status,
      assignees: finalAssignees,
      createdBy: userId,
    });


    await Activity.create({
      user: userId,
      type: "CREATE",
      issue: newIssue._id,
      metaData: `Created issue: ${title}`,
    });

    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ message: "Error creating issue", error: error.message });
  }
}


export const getIssues = async (req, res) => {
  try {
    const { page = 1, limit = 6, status, priority, assignee, search } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

  
    const filter = {};
    if (status && status !== "ALL") filter.status = status;
    if (priority && priority !== "ALL") filter.priority = priority;
    
    if (assignee) {
      filter.assignees = { $in: Array.isArray(assignee) ? assignee : [assignee] };
    }
    
    if (search) {
      filter.title = { $regex: search, $options: "i" }; 
    }


    const issues = await Issue.find(filter)
      .populate("assignees", "name initials")
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalItems = await Issue.countDocuments(filter);

    res.status(200).json({
      issues,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching issues", error: error.message });
  }
};