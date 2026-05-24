import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function ProtectedLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const storedToken = localStorage.getItem("accessToken");

  if (!token && !storedToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}