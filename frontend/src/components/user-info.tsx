import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface UserInfoProps {
  onLogout?: () => void;
}

export default function UserInfo({ onLogout }: UserInfoProps) {

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-9 h-9 rounded-full bg-(--color-primary) text-(--color-surface) flex items-center justify-center text-sm font-semibold shrink-0">
         {user.initials}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-(--color-text) truncate">
           {user.name}
          </p>
          <p className="text-xs text-secondary-text truncate">
           {user.email}
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
