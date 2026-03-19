import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "../views/Home";
import About from "../views/About";
import Knowledge from "../views/Knowledge";
import Support from "../views/Support";
import RoadMap from "../views/RoadMap";
import AdminLogin from "../views/AdminLogin";
import AdminDashboard from "../views/AdminDashboard";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FishManagement from "@/components/FishManagement";
import AdminSupportMessages from "@/components/AdminSupportMessages";
import RoadmapManagement from "@/components/RoadmapManagement";
import ProtectedRoute from "../components/ProtectedRoute";

const App: React.FC = () => {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (

    <div className="min-h-screen flex flex-col font-sans">

      {!isAdminPage && <Header />}

      <main className="flex-grow">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/knowledge" element={<Knowledge />} />

          <Route path="/roadmap" element={<RoadMap />} />

          <Route path="/about" element={<About />} />

          <Route path="/support" element={<Support />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
          
            <Route path="/admin/dashboard" element={<AdminDashboard />}>

            <Route index element={<Navigate to="fish" replace />} />

            <Route path="fish" element={<FishManagement />} />

            <Route path="support" element={<AdminSupportMessages />} />

            <Route path="roadmap" element={<RoadmapManagement />} />
          
            </Route>

          </Route>

        </Routes>

      </main>

      {!isAdminPage && <Footer />}

    </div>
  );
};

export default App;
