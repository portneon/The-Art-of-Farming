import React from "react";
import { Link } from "react-router-dom";
import { Plus, Sun, Droplets, Wind, MoreVertical } from "lucide-react";

const MY_PLANTS = [
    { id: 1, name: "Monstera Deliciosa", location: "Living Room", status: "Healthy", water_in: "3 days", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Fiddle Leaf Fig", location: "Bedroom", status: "Needs Water", water_in: "Today", img: "https://images.unsplash.com/photo-1612470120215-68048126b38c?auto=format&fit=crop&q=80&w=200" },
    { id: 3, name: "Snake Plant", location: "Balcony", status: "Healthy", water_in: "12 days", img: "https://images.unsplash.com/photo-1599598425947-321124233f2e?auto=format&fit=crop&q=80&w=200" },
    { id: 4, name: "Aloe Vera", location: "Kitchen", status: "Healthy", water_in: "7 days", img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=200" },
];

const MyJungle = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl text-[#1A2F1C]">My Jungle</h2>
                <button className="flex items-center gap-2 bg-[#1A2F1C] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest hover:bg-[#4A6741] transition-colors shadow-lg shadow-[#1A2F1C]/20">
                    <Plus size={16} /> ADD PLANT
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#1A2F1C]/5 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1A2F1C]/5 bg-[#F9FAF8] text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/40">
                    <div className="col-span-5 md:col-span-4">Plant Name</div>
                    <div className="col-span-3 hidden md:block">Location</div>
                    <div className="col-span-4 md:col-span-3">Status</div>
                    <div className="col-span-3 md:col-span-2 text-right">Action</div>
                </div>

                {/* Table Rows */}
                {MY_PLANTS.map(plant => (
                    <div key={plant.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-[#1A2F1C]/5 hover:bg-[#F4F5F0]/50 transition-colors group">

                        {/* Name & Avatar */}
                        <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                            <img src={plant.img} alt={plant.name} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                            <div>
                                <h4 className="font-bold text-[#1A2F1C] text-sm">{plant.name}</h4>
                                <span className="text-xs text-[#1A2F1C]/40 font-mono">{plant.location} (Mobile)</span>
                            </div>
                        </div>

                        {/* Location (Desktop) */}
                        <div className="col-span-3 hidden md:block text-sm text-[#1A2F1C]/60">
                            {plant.location}
                        </div>

                        {/* Status Badge */}
                        <div className="col-span-4 md:col-span-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${plant.status === 'Healthy'
                                ? 'bg-[#E0F5D7]/50 text-[#4A6741] border-[#4A6741]/10'
                                : 'bg-[#FFE5D9]/50 text-[#C77D63] border-[#C77D63]/10'
                                }`}>
                                {plant.status === 'Healthy' ? <Sun size={12} /> : <Droplets size={12} />}
                                {plant.status}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-3 md:col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-[#1A2F1C]/5 rounded-full text-[#1A2F1C]/40 hover:text-[#1A2F1C] transition-colors"><Wind size={16} /></button>
                            <Link to={`/plants/${plant.id}`} className="p-2 hover:bg-[#1A2F1C]/5 rounded-full text-[#1A2F1C]/40 hover:text-[#1A2F1C] transition-colors"><MoreVertical size={16} /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyJungle;