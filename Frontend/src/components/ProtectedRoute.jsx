import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // wait until auth check finishes
  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

