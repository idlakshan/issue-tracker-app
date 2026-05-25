import { Edit2, Trash2 } from "lucide-react";
import { AVATAR_COLORS } from "../../constants";

export interface TableUser {
  id: string;
  name: string;
  initials: string;
}

export interface TableIssue {
  id: string;
  title: string;
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assignees: TableUser[];
}

interface IssueTableProps {
  data: TableIssue[];
  showColumns?: {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    priority?: boolean;
    status?: boolean;
    assignees?: boolean;
    actions?: boolean;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function IssueTable({
  data,
  showColumns = {},
  onEdit,
  onDelete,
}: IssueTableProps) {
  const columns = {
    id: showColumns.id ?? true,
    title: showColumns.title ?? true,
    description: showColumns.description ?? true,
    priority: showColumns.priority ?? true,
    status: showColumns.status ?? true,
    assignees: showColumns.assignees ?? true,
    actions: showColumns.actions ?? false,
  };

  const statusStyles = {
    Open: { text: "text-blue-600", bg: "bg-blue-500" },
    "In Progress": { text: "text-amber-600", bg: "bg-amber-500" },
    Resolved: { text: "text-emerald-600", bg: "bg-emerald-500" },
    Closed: { text: "text-gray-500", bg: "bg-gray-500" },
  };

  const priorityStyles = {
    Critical: "bg-red-50 text-red-600 border-red-100",
    High: "bg-orange-50 text-orange-600 border-orange-100",
    Medium: "bg-yellow-50 text-yellow-600 border-yellow-100",
    Low: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium">
            {(columns.id || columns.title) && (
              <th className="py-3 px-2">Issue</th>
            )}
            {columns.description && <th className="py-3 px-2">Description</th>}
            {columns.priority && <th className="py-3 px-2">Priority</th>}
            {columns.status && <th className="py-3 px-2">Status</th>}
            {columns.assignees && (
              <th className="py-3 px-2 text-center">Assignees</th>
            )}
            {columns.actions && (
              <th className="py-3 px-2 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-gray-400 text-xs"
              >
                No issues found.
              </td>
            </tr>
          ) : (
            data.map((issue) => (
              <tr
                key={issue.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                {(columns.id || columns.title) && (
                  <td className="py-3.5 px-2">
                    <div className="flex flex-col">
                      {columns.id && (
                        <span className="text-[12px] text-gray-400 font-mono">
                          {issue.id}
                        </span>
                      )}
                      {columns.title && (
                        <span className="font-medium text-(--color-text) truncate max-w-72">
                          {issue.title}
                        </span>
                      )}
                    </div>
                  </td>
                )}

                {columns.description && (
                  <td
                    className="py-3.5 px-2 text-gray-500 max-w-48 truncate"
                    title={issue.description}
                  >
                    {issue.description}
                  </td>
                )}

                {columns.priority && (
                  <td className="py-3.5 px-2">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-full border ${priorityStyles[issue.priority]}`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                )}

                {columns.status && (
                  <td className="py-3.5 px-2">
                    <span
                      className={`text-xs font-medium flex items-center gap-1.5 ${statusStyles[issue.status].text}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusStyles[issue.status].bg}`}
                      />
                      {issue.status}
                    </span>
                  </td>
                )}

                {columns.assignees && (
                  <td className="py-3.5 px-2">
                    <div className="flex items-center justify-center -space-x-2">
                      {issue.assignees.length > 0 ? (
                        <>
                          {issue.assignees.slice(0, 3).map((user, idx) => {
                            const color =
                              AVATAR_COLORS[idx % AVATAR_COLORS.length];
                            return (
                              <div
                                key={user.id}
                                title={user.name}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-(--color-surface) ${color.bg} ${color.text}`}
                              >
                                {user.initials}
                              </div>
                            );
                          })}
                          {issue.assignees.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[9px] font-bold ring-2 ring-(--color-surface)">
                              +{issue.assignees.length - 3}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                )}

                {columns.actions && (
                  <td className="py-3.5 px-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(issue.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-blue-600 transition cursor-pointer"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(issue.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
