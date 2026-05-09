import { Outlet } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ReportsProvider } from "../contexts/ReportsContext";

export function RootLayout() {
  return (
    <AuthProvider>
      <ReportsProvider>
        <Outlet />
      </ReportsProvider>
    </AuthProvider>
  );
}
