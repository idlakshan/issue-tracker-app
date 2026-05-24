import { CircleDot, PlayCircle, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "../components/ui/stat-card";
import IssueTable, { type TableIssue } from "../components/ui/issue-table";
import Button from "../components/ui/button";
import { Link } from "react-router-dom";
import ActivityTimeline from "../components/ui/activity-timeline";

export default function Dashboard() {
  const stats = {
    total: 20,
    open: 5,
    inProgress: 7,
    resolved: 5,
    closed: 3,
  };

  const allDummyIssues: TableIssue[] = [
    {
      id: "684fd91e2ab7c94a71f8b3c1",
      title: "Payment gateway timeout",
      priority: "Critical",
      status: "In Progress",
      assignees: [
        { id: "685ac12f9de734af21b91e44", name: "Anura", initials: "AS" },
        { id: "687be3c81fd49a6d12ce7721", name: "Kamal", initials: "KL" },
        { id: "689fd2ab34ce91f7812ac993", name: "Malki", initials: "MK" },
      ],
    },
    {
      id: "681ac7e43df912ab67ef902d",
      title: "Typo in footer text",
      priority: "Critical",
      status: "Closed",
      assignees: [
        { id: "687be3c81fd49a6d12ce7721", name: "Kamal", initials: "KL" },
      ],
    },
    {
      id: "68af21dc93be74f1a45ce812",
      title: "Auth token expiration bug",
      priority: "Critical",
      status: "Open",
      assignees: [
        { id: "689fd2ab34ce91f7812ac993", name: "Malki", initials: "MK" },
      ],
    },
    {
      id: "67bc91fa24de81ab56cd77e4",
      title: "Slow load time on images",
      priority: "Critical",
      status: "In Progress",
      assignees: [
        { id: "687be3c81fd49a6d12ce7721", name: "Kamal", initials: "KL" },
      ],
    },
  ];

  const criticalIssues = allDummyIssues.filter(
    (issue) => issue.priority === "Critical",
  );

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

        <div className="bg-(--color-surface) border border-secondary-text/10 rounded-xl p-5 shadow-xs flex flex-col justify-center items-center text-gray-400 text-sm border-dashed min-h-[250px]">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
