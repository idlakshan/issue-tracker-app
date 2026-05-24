import { useGetUsersQuery } from "../../store/api/authApi";

interface AvatarStackProps {
  maxVisible?: number;
}

const AVATAR_COLORS = [
  { bg: "bg-blue-600", text: "text-white" },
  { bg: "bg-purple-600", text: "text-white" },
  { bg: "bg-red-500", text: "text-white" },
  { bg: "bg-green-600", text: "text-white" },
  { bg: "bg-orange-500", text: "text-white" },
];

export default function AvatarStack({ maxVisible = 5 }: AvatarStackProps) {
  const { data: users, isLoading } = useGetUsersQuery();

  if (isLoading) return <div className="text-sm text-gray-400">Loading team...</div>;

  // Optional chaining (?.) සහ නියමිත logic එක
  const visibleUsers = users?.slice(0, maxVisible) || [];
  const extraCount = (users?.length || 0) > maxVisible ? (users?.length || 0) - maxVisible : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-400">Team</span>
      <div className="flex items-center -space-x-1.5 overflow-hidden">
        {visibleUsers.map((user, index) => {
          const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
          return (
            <div
              key={user._id}
              title={`${user.firstName} ${user.lastName}`}
              className={`w-7 h-7 rounded-full ${color.bg} ${color.text} flex items-center justify-center text-[10px] font-bold ring-2 ring-(--color-surface) shrink-0 transition-transform hover:scale-110 hover:z-10 cursor-pointer`}
            >
              {user.initials}
            </div>
          );
        })}

        {extraCount > 0 && (
          <div
            title={`${extraCount} more members`}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-bold ring-2 ring-(--color-surface) shrink-0"
          >
            +{extraCount}
          </div>
        )}
      </div>
    </div>
  );
}