import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "./pages/Home";
import { Leaderboard } from "./pages/Leaderboard";
import { Government } from "./pages/Government";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/home",
        element: <ProtectedRoute role="user"><Home /></ProtectedRoute>,
      },
      {
        path: "/leaderboard",
        element: <ProtectedRoute role="user"><Leaderboard /></ProtectedRoute>,
      },
      {
        path: "/government",
        element: <ProtectedRoute role="government"><Government /></ProtectedRoute>,
      },
    ],
  },
]);
