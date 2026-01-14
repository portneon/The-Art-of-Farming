import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Sprout,
    AlertTriangle,
    Droplets,
    Sun,
    Settings,
    LogOut
} from "lucide-react";

import EmergencyRoom from "./components/dashboard/EmergencyRoom";
import MyJungle from "./components/dashboard/MyJungle";
import WaterSchedule from "./components/dashboard/WaterSchedule";

const USER_STATS = {
    total_plants: 42,
    healthy: 38,
    needs_attention: 4,
    water_due: 12
};

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        // Navigate to login
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-[#F4F5F0] font-sans text-[#1A2F1C]">

            {/* --- SIDEBAR NAVIGATION --- */}
            <aside className="w-20 lg:w-64 bg-[#1A2F1C] text-[#F4F5F0] flex flex-col fixed h-full z-20 transition-all duration-300 shadow-2xl shadow-[#1A2F1C]/20">
                <div className="p-6 flex items-center gap-3">
                    <Sprout className="text-[#C77D63]" size={28} />
                    <span className="font-serif text-xl font-bold hidden lg:block tracking-tight text-white">Lazy Farms</span>
                </div>

                <nav className="flex-1 mt-8 px-4 space-y-2">
                    <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                    <NavItem icon={Sprout} label="My Jungle" active={activeTab === "plants"} onClick={() => setActiveTab("plants")} />
                    <NavItem icon={Droplets} label="Watering Schedule" active={activeTab === "water"} onClick={() => setActiveTab("water")} />
                    <NavItem icon={AlertTriangle} label="Emergency Room" active={activeTab === "emergency"} onClick={() => setActiveTab("emergency")} />
                </nav>

                <div className="p-4 border-t border-[#F4F5F0]/10 space-y-2">
                    <NavItem icon={Settings} label="Settings" />
                    <NavItem icon={LogOut} label="Log Out" onClick={handleLogout} />
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-12 overflow-y-auto">

                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-[#1A2F1C]">
                            {activeTab === "overview" && "Dashboard"}
                            {activeTab === "plants" && "My Collection"}
                            {activeTab === "water" && "Watering Plan"}
                            {activeTab === "emergency" && "Emergency"}
                        </h1>
                        <p className="font-mono text-xs text-[#1A2F1C]/50 uppercase tracking-widest mt-2">Welcome back, Gardener.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#1A2F1C]/5 shadow-sm">
                            <Sun size={16} className="text-[#C77D63]" />
                            <span className="text-sm font-medium text-[#1A2F1C]/80">24°C Sunny</span>
                        </div>
                        <img src="https://ui-avatars.com/api/?name=Gardener&background=1A2F1C&color=fff" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                    </div>
                </header>

                {/* --- DYNAMIC CONTENT BASED ON TAB --- */}

                {activeTab === "overview" && (
                    <div className="animate-fade-in-up space-y-12">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard label="Total Plants" value={USER_STATS.total_plants} icon={Sprout} />
                            <StatCard label="Water Due" value={USER_STATS.water_due} icon={Droplets} highlight />
                            <StatCard label="Healthy" value={USER_STATS.healthy} icon={Sun} />
                            <StatCard label="Needs Attention" value={USER_STATS.needs_attention} icon={AlertTriangle} alert />
                        </div>

                        {/* For Overview, we can show a glimpse of everything or just the main widgets */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Getting specific content could go here, for now keeping it clean */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#1A2F1C]/5 flex items-center justify-center min-h-[300px]">
                                <p className="font-serif text-2xl text-gray-300 italic">Garden Growth Chart Coming Soon</p>
                            </div>

                            {/* Mini Warning List or similar could go here */}
                        </div>
                    </div>
                )}

                {activeTab === "plants" && <MyJungle />}

                {activeTab === "water" && <WaterSchedule />}

                {activeTab === "emergency" && <EmergencyRoom />}

            </main>
        </div>
    );
}


function NavItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${active
                ? "bg-[#F4F5F0] text-[#1A2F1C] font-bold shadow-lg shadow-black/5"
                : "text-[#F4F5F0]/60 hover:bg-[#F4F5F0]/10 hover:text-white"
                }`}
        >
            <Icon size={20} className={active ? "text-[#4A6741]" : ""} />
            <span className="hidden lg:block text-sm tracking-wide">{label}</span>
        </button>
    );
}

function StatCard({ label, value, icon: Icon, highlight, alert }) {
    return (
        <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${highlight ? 'bg-[#1A2F1C] text-[#F4F5F0] border-[#1A2F1C] shadow-xl shadow-[#1A2F1C]/30' :
            alert ? 'bg-white border-[#C77D63]/30 shadow-lg shadow-[#C77D63]/10' : 'bg-white border-[#1A2F1C]/5 shadow-sm hover:shadow-md'
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${highlight ? 'bg-[#4A6741]/20' : 'bg-[#F4F5F0]'}`}>
                    <Icon size={20} className={highlight ? 'text-[#4A6741]' : alert ? 'text-[#C77D63]' : 'text-[#1A2F1C]'} />
                </div>
                {alert && <span className="w-2 h-2 rounded-full bg-[#C77D63] animate-pulse"></span>}
            </div>
            <h3 className="text-3xl font-serif font-bold mb-1">{value}</h3>
            <p className={`text-xs font-mono uppercase tracking-widest ${highlight ? 'text-[#F4F5F0]/60' : 'text-[#1A2F1C]/40'}`}>
                {label}
            </p>
        </div>
    );
}