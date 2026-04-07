console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  TrendingUp,
  Leaf,
  Loader2,
  AlertCircle,
  Sprout,
  Plus,
} from "lucide-react";
import NotificationCard from "./components/NotificationCard";
import GardenCard from "./components/GardenCard";
import PlantsNeedingCare from "./components/PlantsNeedingCare";
import AddGardenModal from "./components/AddGardenModal";
import StatCard from "./components/StatCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dismissedNotifications, setDismissedNotifications] = useState([]);
  const [showAddGardenModal, setShowAddGardenModal] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok)
        throw new Error(`Failed to fetch dashboard data (${response.status})`);

      const result = await response.json();
      setDashboardData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  const handleDismissNotification = (notificationId) => {
    setDismissedNotifications([...dismissedNotifications, notificationId]);
  };

  const handleGardenClick = (garden) => {
    navigate(`/garden/${garden.id}`);
  };

  const visibleNotifications =
    dashboardData?.notifications?.filter(
      (n) => !dismissedNotifications.includes(n.id),
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#1A2F1C]" size={40} />
          <p className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
            Gathering Botanical Data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="inline-flex bg-white p-4 rounded-full border border-[#1A2F1C]/5 mb-6 shadow-sm">
            <AlertCircle className="text-[#C77D63]" size={32} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A2F1C] mb-4">
            System Disconnect
          </h2>
          <p className="text-[#1A2F1C]/60 mb-8 font-sans leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1A2F1C] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors shadow-lg"
          >
            Re-establish Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F0] pt-28 pb-20 px-6 md:px-12 lg:px-20 selection:bg-[#C77D63] selection:text-white font-sans text-[#1A2F1C]">
      <div className="max-w-7xl mx-auto">
        {/* --- WELCOME HEADER --- */}
        <div className="mb-12">
          <h1 className="font-serif text-5xl md:text-7xl text-[#1A2F1C] mb-4 leading-[0.9]">
            Welcome back, <br className="hidden md:block" />
            <span className="italic text-[#4A6741]">
              {dashboardData?.user?.name || "Gardener"}
            </span>
            .
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest text-[#1A2F1C]/50 border-b border-[#1A2F1C]/10 pb-6 inline-block">
            Your Digital Conservatory Overview
          </p>
        </div>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <StatCard
            icon={Leaf}
            label="Total Flora"
            value={dashboardData?.stats?.totalPlants || 0}
            color="#4A6741"
          />
          <StatCard
            icon={TrendingUp}
            label="Habitats"
            value={dashboardData?.stats?.totalGardens || 0}
            color="#C77D63"
          />
          <StatCard
            icon={Bell}
            label="Require Care"
            value={dashboardData?.stats?.plantsNeedingCare || 0}
            color="#A05252"
          />
          <StatCard
            icon={Sprout}
            label="Thriving"
            value={dashboardData?.stats?.healthyPlants || 0}
            color="#4A8B9F"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-8 space-y-16">
            {/* Gardens Section */}
            <section>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#1A2F1C] mb-2">
                    Habitats
                  </h2>
                  <p className="text-[#1A2F1C]/60 text-sm">
                    Organized zones for your collection.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddGardenModal(true)}
                  className="hidden md:flex items-center gap-2 bg-[#1A2F1C] text-white px-5 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#C77D63] transition-colors shadow-lg"
                >
                  <Plus size={14} /> Establish Zone
                </button>
              </div>

              {dashboardData?.gardens?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData.gardens.map((garden) => (
                    <GardenCard
                      key={garden.id}
                      garden={garden}
                      onClick={handleGardenClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#1A2F1C]/5 shadow-sm">
                  <div className="inline-flex bg-[#F4F5F0] p-4 rounded-full mb-4">
                    <Leaf className="text-[#1A2F1C]/30" size={32} />
                  </div>
                  <p className="font-serif text-2xl text-[#1A2F1C] mb-2">
                    No Habitats Created
                  </p>
                  <p className="text-[#1A2F1C]/50 text-sm mb-6 max-w-xs mx-auto">
                    Group your plants by location or care requirements.
                  </p>
                  <button
                    onClick={() => setShowAddGardenModal(true)}
                    className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                  >
                    Create Habitat
                  </button>
                </div>
              )}

              {/* Mobile Add Button */}
              <button
                onClick={() => setShowAddGardenModal(true)}
                className="mt-6 w-full md:hidden flex items-center justify-center gap-2 bg-[#1A2F1C] text-white px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg"
              >
                <Plus size={16} /> Establish Zone
              </button>
            </section>

            {/* Plants Needing Care */}
            {dashboardData?.plants && dashboardData?.notifications && (
              <section>
                <PlantsNeedingCare
                  plants={dashboardData.plants}
                  notifications={dashboardData.notifications}
                />
              </section>
            )}
          </div>

          {/* --- RIGHT COLUMN (Sidebar/Alerts) --- */}
          <div className="lg:col-span-4">
            {visibleNotifications.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#1A2F1C]/5 shadow-sm sticky top-28">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A2F1C]/5">
                  <h2 className="font-serif text-2xl text-[#1A2F1C]">
                    Active Alerts
                  </h2>
                  <span className="bg-[#C77D63] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {visibleNotifications.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {visibleNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onDismiss={handleDismissNotification}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddGardenModal
        isOpen={showAddGardenModal}
        onClose={() => setShowAddGardenModal(false)}
        onGardenCreated={() => fetchDashboardData()}
      />
    </div>
  );
};

export default Dashboard;
