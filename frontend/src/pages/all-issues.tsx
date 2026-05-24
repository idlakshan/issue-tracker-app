
export default function AllIssues() {
  // Dummy Issues List
  const issues = [
    { id: "ISS-001", title: "Login Session Bug in Safari", priority: "Critical", status: "Open", date: "2026-05-24" },
    { id: "ISS-002", title: "Docker Compose MySQL Connection Timeout", priority: "High", status: "In Progress", date: "2026-05-23" },
    { id: "ISS-003", title: "Navbar Responsive UI Breaking on Mobile", priority: "Low", status: "Resolved", date: "2026-05-20" },
  ];

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-md font-semibold">Issue Registry</h3>
        <button className="bg-primary text-primary-text text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          + New Issue
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-hover border-b border-border text-sm font-medium text-secondary-text">
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-border">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-mono font-medium text-primary">{issue.id}</td>
                <td className="p-4 font-medium">{issue.title}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    issue.priority === "Critical" ? "bg-priority-critical/10 text-priority-critical-text" :
                    issue.priority === "High" ? "bg-priority-high/10 text-priority-high-text" : "bg-gray-500/10 text-gray-400"
                  }`}>
                    {issue.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-secondary-text font-medium text-xs border border-border px-2 py-1 rounded-md bg-surface">
                    {issue.status}
                  </span>
                </td>
                <td className="p-4 text-secondary-text">{issue.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}