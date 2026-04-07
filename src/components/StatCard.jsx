import React from "react";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#1A2F1C]/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-2xl bg-[#F4F5F0]">
        <Icon size={20} style={{ color: color || "#4A6741" }} />
      </div>
    </div>
    <div className="text-4xl font-serif font-bold text-[#1A2F1C] mb-1">
      {value}
    </div>
    <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A2F1C]/50">
      {label}
    </div>
  </div>
);

export default StatCard;
