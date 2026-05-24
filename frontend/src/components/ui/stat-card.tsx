import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  colorClass: string;
  progressColor: string;
}

export default function StatCard({
  title,
  value,
  total,
  icon,
  colorClass,
  progressColor,
}: StatCardProps) {
  const percentage =
    total > 0 ? Math.min(Math.round((value / total) * 100), 100) : 0;

  return (
    <div className="bg-(--color-surface) border border-secondary-text/10 rounded-xl p-5 flex flex-col justify-between shadow-xs">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h2 className="text-3xl font-semibold text-(--color-text) mt-1">
            {value}
          </h2>
        </div>
        <div className={`p-2.5 bg-gray-50 rounded-lg ${colorClass}`}>
          {icon}
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{percentage}% of total issues</span>
          <span className="font-medium text-gray-500">
            {value}/{total}
          </span>
        </div>

        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
