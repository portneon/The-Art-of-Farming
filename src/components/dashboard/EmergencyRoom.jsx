
import React from "react";
import { AlertTriangle, Activity, Stethoscope } from "lucide-react";

const URGENT_ALERTS = [
    { id: 101, name: "Rosemary Bush", issue: "Fungal Infection", risk: "High", location: "Balcony" },
    { id: 102, name: "Calathea", issue: "Severe Dehydration", risk: "Medium", location: "Living Room" },
    { id: 103, name: "Orchid", issue: "Root Rot Suspected", risk: "Critical", location: "Bathroom" }
];

const EmergencyRoom = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="font-serif text-2xl text-[#1A2F1C] flex items-center gap-2">
                        <AlertTriangle className="text-[#C77D63]" size={24} />
                        Emergency Room
                    </h2>
                    <p className="text-sm text-[#1A2F1C]/60 mt-1 font-sans">
                        Active triage cases requiring immediate intervention.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {URGENT_ALERTS.map(alert => (
                    <div key={alert.id} className="bg-white border-l-4 border-[#C77D63] p-6 rounded-r-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center group gap-4">
                        <div className="flex items-start gap-4 w-full">
                            <div className="bg-[#FFE5D9] p-3 rounded-full text-[#C77D63]">
                                <Activity size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg text-[#1A2F1C]">{alert.issue}</h3>
                                    <span className="px-2 py-0.5 bg-[#C77D63] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {alert.risk} Risk
                                    </span>
                                </div>
                                <p className="text-sm text-[#1A2F1C]/60">Patient: <span className="font-medium text-[#1A2F1C]">{alert.name}</span> • {alert.location}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto justify-end">
                            <button className="flex-1 md:flex-none bg-[#1A2F1C]/5 text-[#1A2F1C]/60 px-6 py-3 rounded-lg text-xs font-bold hover:bg-[#1A2F1C]/10 transition-colors uppercase tracking-widest">
                                Dismiss
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#C77D63] text-white px-6 py-3 rounded-lg text-xs font-bold hover:bg-[#a8654e] transition-colors shadow-lg shadow-[#C77D63]/20 uppercase tracking-widest">
                                <Stethoscope size={14} /> Diagnose
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyRoom;