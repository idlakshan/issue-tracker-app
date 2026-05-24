import {
  CheckCircle,
  PlusCircle,
  RefreshCw,
  Trash2,
  UserPlus,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { useGetRecentActivitiesQuery } from "../../store/api/issueApi";

export default function ActivityTimeline() {
  const { data: activities, isLoading } = useGetRecentActivitiesQuery();

  console.log("Fetched activities:", activities);

  const latestActivities = activities ? [...activities].slice(0, 5) : [];

  const activityConfig = {
    CREATE: {
      icon: <PlusCircle size={14} />,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      label: "created",
    },
    STATUS_CHANGE: {
      icon: <RefreshCw size={14} />,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      label: "updated",
    },
    ASSIGN: {
      icon: <UserPlus size={14} />,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      label: "assigned",
    },
    RESOLVE: {
      icon: <CheckCircle size={14} />,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      label: "resolved",
    },
    DELETE: {
      icon: <Trash2 size={14} />,
      color: "text-red-600 bg-red-50 border-red-100",
      label: "deleted",
    },
  };

  if (isLoading) return <div className="text-xs text-gray-400">Loading...</div>;

  return (
    <div className="rounded-xl flex-1 w-full">
      <h3 className="text-base font-semibold text-black/90 mb-6">
        Recent Activity
      </h3>

      <div className="relative border-l border-gray-100 pl-6 ml-3 space-y-6">
        {latestActivities?.map((act) => {
          const config = activityConfig[act.type];

          return (
            <div key={act._id} className="relative group">
              <div
                className={`absolute -left-8.75 top-0.5 w-6 h-6 rounded-full border flex items-center justify-center shadow-xs ${config.color}`}
              >
                {config.icon}
              </div>

              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-black/90">
                    {act.user.firstName} {act.user.lastName}
                  </span>{" "}
                  {config.label}{" "}
                  <span className="font-medium text-(--color-primary)">
                    {act.issue?.title || "an issue"}
                  </span>
                </p>

                <span className="text-[10px] text-gray-400 block font-medium">
                  {formatDistanceToNow(new Date(act.createdAt))} ago
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
