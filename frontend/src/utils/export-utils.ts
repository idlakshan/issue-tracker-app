import * as XLSX from 'xlsx';
import type { Issue } from '../types/issue';

export const exportIssuesToExcel = (issues: Issue[], fileName: string = "Issues_Report.xlsx") => {
  if (!issues || issues.length === 0) return;
  console.log("Exporting issues to Excel:", issues);
  const exportData = issues.map((issue) => ({
    Title: issue.title,
    Description: issue.description,
    Status: issue.status,
    Priority: issue.priority,
    Assignees: issue.assignees
      .map((u) => `${u.firstName} ${u.lastName}`)
      .join(", "),
    CreatedAt: new Date(issue.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Issues");

  XLSX.writeFile(workbook, fileName);
};