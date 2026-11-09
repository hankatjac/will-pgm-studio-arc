import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";

import { Outlet, Navigate } from "react-router-dom";

import { DarkModeContext } from "../context/darkModeContext";
import { AuthContext } from "../context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
