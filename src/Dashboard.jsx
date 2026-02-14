console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    TrendingUp,
    Leaf,
    Loader2,
    AlertCircle
} from "lucide-react";
import NotificationCard from "./components/NotificationCard";
import GardenCard from "./components/GardenCard";
import PlantsNeedingCare from "./components/PlantsNeedingCare";
import AddGardenModal from "./components/AddGardenModal";

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
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            console.log('Fetching dashboard for userId:', userId);

            if (!userId) {
                navigate('/login');
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch dashboard data (${response.status})`);
            }

            const result = await response.json();
            console.log('Dashboard data:', result);
            setDashboardData(result.data);
        } catch (err) {
            console.error('Dashboard error:', err);
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

    const handleGardenCreated = (newGarden) => {
        console.log('Garden created, refreshing dashboard');
        fetchDashboardData(); // Refresh dashboard data
    };

    const handleGardenClick = (garden) => {
        navigate(`/garden/${garden.id}`);
    };

    const visibleNotifications = dashboardData?.notifications?.filter(
        n => !dismissedNotifications.includes(n.id)
    ) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-[#1A2F1C]" size={40} />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
                        Loading Your Garden...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="text-center max-w-md px-4">
                    <AlertCircle className="mx-auto mb-4 text-[#C77D63]" size={48} />
                    <h2 className="font-serif text-3xl text-[#1A2F1C] mb-2">Oops!</h2>
                    <p className="text-[#1A2F1C]/60 mb-2">{error}</p>
                    <p className="text-sm text-[#1A2F1C]/40 mb-4">
                        Check the browser console for more details
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F5F0] pt-24 pb-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-3">
                        Welcome back, <span className="italic text-[#4A6741]">{dashboardData?.user?.name || 'Gardener'}</span>
                    </h1>
                    <p className="font-sans text-lg text-[#1A2F1C]/60">
                        Here's what's happening in your garden today.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <StatCard
                        icon={Leaf}
                        label="Total Plants"
                        value={dashboardData?.stats?.totalPlants || 0}
                        color="#4A6741"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Gardens"
                        value={dashboardData?.stats?.totalGardens || 0}
                        color="#C77D63"
                    />
                    <StatCard
                        icon={Bell}
                        label="Need Care"
                        value={dashboardData?.stats?.plantsNeedingCare || 0}
                        color="#E74C3C"
                    />
                    <StatCard
                        icon={Leaf}
                        label="Healthy"
                        value={dashboardData?.stats?.healthyPlants || 0}
                        color="#27AE60"
                    />
                </div>

                {/* Priority Alerts */}
                {visibleNotifications.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-3xl text-[#1A2F1C]">
                                Priority Alerts
                            </h2>
                            <span className="bg-[#C77D63] text-white px-3 py-1 rounded-full text-xs font-bold">
                                {visibleNotifications.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {visibleNotifications.slice(0, 6).map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onDismiss={handleDismissNotification}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Plants Needing Care */}
                {dashboardData?.plants && dashboardData?.notifications && (
                    <PlantsNeedingCare
                        plants={dashboardData.plants}
                        notifications={dashboardData.notifications}
                    />
                )}

                {/* Gardens Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-3xl text-[#1A2F1C]">Your Gardens</h2>
                        <button
                            onClick={() => setShowAddGardenModal(true)}
                            className="flex items-center gap-2 bg-[#1A2F1C] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                        >
                            <Leaf size={16} />
                            Add Garden
                        </button>
                    </div>

                    {dashboardData?.gardens?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dashboardData.gardens.map((garden) => (
                                <GardenCard
                                    key={garden.id}
                                    garden={garden}
                                    onClick={() => handleGardenClick(garden)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white/50 rounded-xl border-2 border-dashed border-[#1A2F1C]/10">
                            <Leaf className="mx-auto mb-4 text-[#1A2F1C]/20" size={48} />
                            <p className="font-serif text-xl text-[#1A2F1C]/60 mb-4">
                                No gardens yet
                            </p>
                            <button
                                onClick={() => setShowAddGardenModal(true)}
                                className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                            >
                                Create Your First Garden
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Add Garden Modal */}
            <AddGardenModal
                isOpen={showAddGardenModal}
                onClose={() => setShowAddGardenModal(false)}
                onGardenCreated={handleGardenCreated}
            />
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#1A2F1C]/5">
        <div className="flex items-center justify-between mb-3">
            <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${color}20` }}
            >
                <Icon size={20} style={{ color }} />
            </div>
        </div>
        <div className="text-3xl font-bold text-[#1A2F1C] mb-1">
            {value}
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/50">
            {label}
        </div>
    </div>
);

export default Dashboard;
