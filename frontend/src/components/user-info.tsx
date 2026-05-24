import { LogOut } from "lucide-react";

interface UserInfoProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    initials: string;
  };
  onLogout?: () => void;
}

export default function UserInfo({ user, onLogout }: UserInfoProps) {
  const currentUser = user || {
    firstName: "Dimuthu",
    lastName: "Lakshan",
    email: "dimuthu@gmail.com",
    initials: "DL",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-9 h-9 rounded-full bg-(--color-primary) text-(--color-surface) flex items-center justify-center text-sm font-semibold shrink-0">
          {currentUser.initials}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-(--color-text) truncate">
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </p>
          <p className="text-xs text-secondary-text truncate">
            {currentUser.email}
          </p>
        </div>
      </div>

      <LogOut
        size={18}
        className="text-secondary-text cursor-pointer hover:text-red-500 transition-colors shrink-0"
        onClick={onLogout || (() => console.log("Logout clicked"))}
      />
    </div>
  );
}
