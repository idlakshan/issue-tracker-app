import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import IssueTable, { type TableIssue } from "../components/ui/issue-table";
import { Dropdown } from "../components/ui/dropdown";
import { useGetIssuesQuery } from "../store/api/issueApi";
import type { Issue } from "../types/issue";
import Input from "../components/ui/text-input";
import Pagination from "../components/ui/pagination";
import { useGetUsersQuery } from "../store/api/authApi";

const statusOptions = [
  { value: "ALL", label: "All Statuses" },
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
];

const priorityOptions = [
  { value: "ALL", label: "All Priorities" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

export default function AllIssues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: users } = useGetUsersQuery();

  const { data, isLoading, isFetching, error } = useGetIssuesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter,
    priority: priorityFilter,
    assignee: assigneeFilter === "ALL" ? undefined : [assigneeFilter],
    search: debouncedSearch,
  });

  const mapToTableIssue = (issue: Issue): TableIssue => ({
    id: issue._id,
    title: issue.title,
    description: issue.description || "----",
    priority: issue.priority,
    status: issue.status,
    assignees: issue.assignees.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      initials: user.initials,
    })),
  });

  const issuesList: TableIssue[] = data?.issues.map(mapToTableIssue) || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            icon={<Search size={16} />}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-36">
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value)
              }
            />
          </div>
          <div className="w-36">
            <Dropdown
              options={priorityOptions}
              value={priorityFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPriorityFilter(e.target.value)
              }
            />
          </div>
          <div className="w-48">
            <Dropdown
              options={[
                { value: "ALL", label: "All Assignees" },
                ...(users?.map((u) => ({
                  value: u._id,
                  label: `${u.firstName} ${u.lastName}`,
                })) || []),
              ]}
              value={assigneeFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAssigneeFilter(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-(--color-surface) rounded-xl border border-secondary-text/10 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading || isFetching ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              Error loading issues
            </div>
          ) : (
            <IssueTable data={issuesList} />
          )}
        </div>

        <div className="p-4 border-t border-secondary-text/10 flex justify-between items-center">
          <span className="text-xs text-secondary-text">
            Showing page {currentPage} of {totalPages}
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
