import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import PlantStatusCard from "./PlantStatusCard";

const PlantsNeedingCare = ({ plants, notifications }) => {
  const plantsNeedingCare = plants.filter((plant) => {
    return notifications.some(
      (n) =>
        n.plantId === plant.id &&
        (n.priority === "urgent" || n.priority === "warning"),
    );
  });

  const sortedPlants = plantsNeedingCare.sort((a, b) => {
    const aNotification = notifications.find((n) => n.plantId === a.id);
    const bNotification = notifications.find((n) => n.plantId === b.id);
    const priorityOrder = { urgent: 0, warning: 1 };
    return (
      priorityOrder[aNotification?.priority] -
      priorityOrder[bNotification?.priority]
    );
  });

  const topPlants = sortedPlants.slice(0, 6);

  if (topPlants.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A2F1C] mb-2">
            Triage Center
          </h2>
          <p className="text-[#1A2F1C]/60 font-sans text-sm">
            Specimens requiring immediate botanical intervention.
          </p>
        </div>
        {sortedPlants.length > 6 && (
          <span className="bg-[#1A2F1C]/5 border border-[#1A2F1C]/10 text-[#1A2F1C] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            +{sortedPlants.length - 6} More
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPlants.map((plant) => {
          const plantNotifications = notifications.filter(
            (n) => n.plantId === plant.id,
          );
          const isUrgent = plantNotifications.some(
            (n) => n.priority === "urgent",
          );

          return (
            <div key={plant.id} className="relative group">
              {isUrgent && (
                <div className="absolute -top-3 -right-3 z-10 bg-[#C77D63] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#C77D63]/20 flex items-center gap-1.5 animate-pulse">
                  <AlertCircle size={12} /> Action Required
                </div>
              )}

              <PlantStatusCard plant={plant} />

              {/* Notifications pinned to bottom of the card visually */}
              <div className="absolute bottom-4 right-4 left-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {plantNotifications.slice(0, 2).map((notification, idx) => (
                  <div
                    key={idx}
                    className="text-xs font-sans px-3 py-2 rounded-xl flex items-center gap-2 bg-white/95 backdrop-blur-md shadow-lg border border-[#1A2F1C]/10 text-[#1A2F1C]"
                  >
                    <span className="flex-1 line-clamp-1 font-medium">
                      {notification.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {sortedPlants.length > 6 && (
        <div className="text-center mt-10">
          <button className="text-[#4A6741] hover:text-[#C77D63] font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 mx-auto group transition-colors">
            View All {sortedPlants.length} Specimens
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantsNeedingCare;
