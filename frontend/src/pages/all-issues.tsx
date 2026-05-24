import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import IssueTable, { type TableIssue } from "../components/ui/issue-table";
import Input from "../components/ui/input";
import { Dropdown } from "../components/ui/dropdown";
import { useGetIssuesQuery } from "../store/api/issueApi";
import type { Issue } from "../types/issue";

export interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  initials: string;
}

export interface IssueResponse {
  _id: string;
  title: string;
  priority: string;
  status: string;
  assignees: UserResponse[];
}

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
      <div className="mb-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
          <Dropdown
            options={[
              { value: "ALL", label: "All Statuses" },
              { value: "Open", label: "Open" },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Dropdown
            options={[
              { value: "ALL", label: "All Priorities" },
              { value: "High", label: "High" },
            ]}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
          <Dropdown
            options={[{ value: "ALL", label: "All Assignees" }]}
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          />
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

        <div className="p-4 border-t border-secondary-text/10 flex justify-between items-center text-xs">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
