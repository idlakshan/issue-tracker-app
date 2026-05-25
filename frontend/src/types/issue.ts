export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Status = "Open" | "In Progress" | "Resolved" | "Closed";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
}

export interface Issue {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignees: User[];
}

export interface TableUser {
  id: string;
  name: string;
  initials: string;
}

export interface TableIssue {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  assignees: TableUser[];
}