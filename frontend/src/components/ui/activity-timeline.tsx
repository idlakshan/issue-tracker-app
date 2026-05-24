import { PlusCircle, RefreshCw, UserPlus, CheckCircle } from "lucide-react";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "create" | "status_change" | "assign" | "resolve";
}

const dummyActivities: ActivityItem[] = [
  {
    id: "act-1",
    user: "Anura Silva",
    action: "created a new issue",
    target: "ISS-104: Auth token expiration bug",
    time: "10 mins ago",
    type: "create",
  },
  {
    id: "act-2",
    user: "Janith Liyanage",
    action: "changed status to In Progress on",
    target: "ISS-101: Payment gateway timeout",
    time: "1 hour ago",
    type: "status_change",
  },
  {
    id: "act-3",
    user: "Dimuthu Lakshan",
    action: "assigned Kamal to",
    target: "ISS-101: Payment gateway timeout",
    time: "2 hours ago",
    type: "assign",
  },
  {
    id: "act-4",
    user: "Malki Perera",
    action: "resolved the issue",
    target: "ISS-102: Typo in footer text",
    time: "Yesterday",
    type: "resolve",
  },
];

export default function ActivityTimeline() {
  const activityConfig = {
    create: {
      icon: <PlusCircle size={14} />,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    status_change: {
      icon: <RefreshCw size={14} />,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    assign: {
      icon: <UserPlus size={14} />,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    resolve: {
      icon: <CheckCircle size={14} />,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  };

  return (
    <div className="rounded-xl flex-1 w-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-black/90">
          Recent Activity
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Live updates of changes across the project
        </p>
      </div>

      <div className="relative border-l border-gray-100 pl-6 ml-3 space-y-6">
        {dummyActivities.map((activity) => {
          const config = activityConfig[activity.type];

          return (
            <div key={activity.id} className="relative group">
              <div
                className={`absolute -left-8.75 top-0.5 w-6 h-6 rounded-full border flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${config.color}`}
              >
                {config.icon}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-black/90 hover:underline cursor-pointer">
                    {activity.user}
                  </span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-(--color-primary) wrap-break-word">
                    {activity.target}
                  </span>
                </p>

                <span className="text-[10px] text-gray-400 block font-medium">
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
