import React from "react";
import { Sprout, Droplets, Bug, Sun, AlertCircle, Info, X } from "lucide-react";

const NotificationCard = ({ notification, onDismiss }) => {
  const getTheme = () => {
    if (notification.priority === "urgent")
      return {
        color: "#C77D63",
        bg: "bg-[#FFE5D9]/50",
        border: "border-[#C77D63]/30",
      };
    if (notification.priority === "warning")
      return {
        color: "#D4A373",
        bg: "bg-[#F4F5F0]",
        border: "border-[#D4A373]/30",
      };
    return { color: "#4A6741", bg: "bg-white", border: "border-[#1A2F1C]/5" };
  };

  const getIcon = () => {
    switch (notification.type) {
      case "water":
        return Droplets;
      case "fertilize":
        return Sprout;
      case "pest":
        return Bug;
      case "health":
        return AlertCircle;
      case "environment":
        return Sun;
      default:
        return Info;
    }
  };

  const theme = getTheme();
  const Icon = getIcon();

  return (
    <div
      className={`relative p-5 rounded-2xl border transition-all duration-300 hover:shadow-md group ${theme.bg} ${theme.border}`}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-xl flex-shrink-0 bg-white shadow-sm border border-[#1A2F1C]/5"
          style={{ color: theme.color }}
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <p className="text-sm text-[#1A2F1C] font-medium leading-relaxed">
            {notification.message}
          </p>
          {notification.gardenName && (
            <p className="text-[10px] text-[#1A2F1C]/50 mt-2 font-mono uppercase tracking-widest">
              Garden: {notification.gardenName}
            </p>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-[#1A2F1C]/30 hover:text-[#C77D63] transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
