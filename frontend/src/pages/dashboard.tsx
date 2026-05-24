import { CircleDot, PlayCircle, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "../components/ui/stat-card";
import IssueTable, { type TableIssue } from "../components/ui/issue-table";
import Button from "../components/ui/button";
import { Link } from "react-router-dom";
import ActivityTimeline from "../components/ui/activity-timeline";
import { useGetIssuesQuery } from "../store/api/issueApi";

export default function Dashboard() {
  const stats = {
    total: 20,
    open: 5,
    inProgress: 7,
    resolved: 5,
    closed: 3,
  };

  const { data } = useGetIssuesQuery({
    page: 1,
    limit: 4,
    priority: "Critical", 
  });

  const criticalIssues: TableIssue[] = 
    data?.issues
      .filter((issue) => issue.priority === "Critical") 
      .map((issue) => ({
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
      })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Open Issues"
          value={stats.open}
          total={stats.total}
          icon={<CircleDot size={20} />}
          colorClass="text-blue-600"
          progressColor="bg-blue-600"
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
          total={stats.total}
          icon={<PlayCircle size={20} />}
          colorClass="text-amber-500"
          progressColor="bg-amber-500"
        />

        <StatCard
          title="Resolved"
          value={stats.resolved}
          total={stats.total}
          icon={<CheckCircle2 size={20} />}
          colorClass="text-emerald-600"
          progressColor="bg-emerald-600"
        />

        <StatCard
          title="Closed Issues"
          value={stats.closed}
          total={stats.total}
          icon={<XCircle size={20} />}
          colorClass="text-gray-500"
          progressColor="bg-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-(--color-surface) border border-secondary-text/10 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-semibold text-(--color-text)">
                  Top Critical Issues
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  High priority bugs that need immediate attention
                </p>
              </div>

              <Link to="/issues">
                <Button
                  variant="secondary"
                  className="text-xs font-medium text-(--color-primary) bg-(--color-primary)/5 px-3 py-1.5 rounded-lg transition"
                >
                  View All
                </Button>
              </Link>
            </div>

            <IssueTable data={criticalIssues} />
          </div>
        </div>

        <div className="bg-(--color-surface) border border-secondary-text/10 rounded-xl p-5 shadow-xs flex flex-col justify-center items-center text-gray-400 text-sm border-dashed min-h-62.5">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
