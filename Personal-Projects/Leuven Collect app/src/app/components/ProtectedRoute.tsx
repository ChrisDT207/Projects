import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role: "user" | "government";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if wrong role
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
