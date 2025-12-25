import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router"; // Updated import
import "./App.css";
// import Landing from "./Pages/LandingPage/Landing";
import RewardsPage from "./Pages/RewardPage/RewardsPage";
import LoginPage from "./Pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RewardsPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}