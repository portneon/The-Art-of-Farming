import React from "react";
import { Droplets, Calendar, CheckCircle, Clock } from "lucide-react";

const WATER_TASKS = [
    { id: 1, name: "Fiddle Leaf Fig", time: "Today", overdue: true, amount: "500ml", location: "Bedroom" },
    { id: 2, name: "Peace Lily", time: "Tomorrow", overdue: false, amount: "200ml", location: "Living Room" },
    { id: 3, name: "Spider Plant", time: "in 2 days", overdue: false, amount: "Mist Only", location: "Kitchen" },
    { id: 4, name: "Succulent Tray", time: "in 5 days", overdue: false, amount: "Soak", location: "Balcony" },
];

const WaterSchedule = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A2F1C] flex items-center gap-2">
                        <Droplets className="text-[#4A6741]" size={24} />
                        Hydration Schedule
                    </h2>
                    <p className="text-sm text-[#1A2F1C]/60 mt-1 font-sans">
                        Upcoming watering tasks based on soil moisture analysis.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#1A2F1C]/5 text-xs font-bold text-[#1A2F1C]/60 uppercase tracking-widest">
                    <Calendar size={14} />
                    Next 7 Days
                </div>
            </div>

            <div className="space-y-4">
                {WATER_TASKS.map((task) => (
                    <div key={task.id} className={`group bg-white p-5 rounded-2xl border transition-all hover:shadow-md flex items-center justify-between ${task.overdue ? "border-[#C77D63]/50 bg-[#FFE5D9]/10" : "border-[#1A2F1C]/5"
                        }`}>

                        <div className="flex items-center gap-6">
                            {/* Visual Indicator */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${task.overdue ? "bg-[#C77D63]/10 text-[#C77D63]" : "bg-[#4A6741]/10 text-[#4A6741]"
                                }`}>
                                <Droplets size={20} />
                            </div>

                            <div>
                                <h3 className="font-bold text-[#1A2F1C] text-lg">{task.name}</h3>
                                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#1A2F1C]/50 mt-1">
                                    <span>{task.location}</span>
                                    <span>•</span>
                                    <span>{task.amount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className={`text-right ${task.overdue ? "text-[#C77D63]" : "text-[#1A2F1C]/60"}`}>
                                <p className="font-bold text-sm flex items-center justify-end gap-1">
                                    {task.overdue && <Clock size={12} />}
                                    {task.time}
                                </p>
                                {task.overdue && <span className="text-[10px] font-bold uppercase tracking-widest">Overdue</span>}
                            </div>

                            <button className="bg-[#F4F5F0] hover:bg-[#4A6741] hover:text-white text-[#1A2F1C]/40 p-3 rounded-full transition-colors">
                                <CheckCircle size={20} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default WaterSchedule;