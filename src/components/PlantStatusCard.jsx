import React from "react";
import { Droplets, Heart, AlertCircle, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const PlantStatusCard = ({ plant }) => {
  const getHealthColor = () => {
    switch (plant.healthStatus) {
      case "Good":
        return "bg-[#4A6741]/10 text-[#4A6741] border-[#4A6741]/20";
      case "NeedsAttention":
        return "bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/20";
      case "Critical":
        return "bg-[#C77D63]/10 text-[#C77D63] border-[#C77D63]/20";
      default:
        return "bg-[#1A2F1C]/5 text-[#1A2F1C]/60 border-[#1A2F1C]/10";
    }
  };

  const getHealthIcon = () => {
    switch (plant.healthStatus) {
      case "Good":
        return <Heart size={12} className="fill-current" />;
      case "NeedsAttention":
      case "Critical":
        return <AlertCircle size={12} />;
      default:
        return <Heart size={12} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const diffDays = Math.floor(
      Math.abs(new Date() - date) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  return (
    <Link
      to={`/my-plant/${plant.id}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#1A2F1C]/5 hover:border-[#C77D63]/30"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F4F5F0]">
        {plant.species?.imageUrl ? (
          <img
            src={plant.species.imageUrl}
            alt={plant.nickname || plant.species.commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1A2F1C]/5">
            <Leaf className="text-[#1A2F1C]/20" size={48} strokeWidth={1} />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${getHealthColor()}`}
          >
            {getHealthIcon()}
            <span className="hidden sm:inline">
              {plant.healthStatus || "Good"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4 flex-1">
          <h3 className="font-serif text-xl font-bold text-[#1A2F1C] mb-1 line-clamp-1">
            {plant.nickname || plant.species?.commonName || "Specimen"}
          </h3>
          <p className="text-[10px] font-mono text-[#1A2F1C]/40 uppercase tracking-widest line-clamp-1">
            {plant.species?.scientificName || "Unknown species"}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#1A2F1C]/5">
          <div className="p-2 bg-[#F4F5F0] rounded-lg">
            <Droplets size={16} className="text-[#4A9EFF]" />
          </div>
          <div>
            <p className="text-[10px] text-[#1A2F1C]/40 uppercase tracking-widest font-mono mb-0.5">
              Last Watered
            </p>
            <p className="text-sm text-[#1A2F1C] font-medium">
              {formatDate(plant.lastWatered)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantStatusCard;
