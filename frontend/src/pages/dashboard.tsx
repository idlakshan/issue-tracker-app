import { CircleDot, PlayCircle, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "../components/ui/stat-card";

export default function Dashboard() {
  const stats = {
    total: 20,
    open: 5,
    inProgress: 7,
    resolved: 5,
    closed: 3,
  };

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
    </div>
  );
}
