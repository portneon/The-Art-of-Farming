import React from "react";
import { Droplets, Heart, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PlantStatusCard = ({ plant }) => {
    const getHealthColor = () => {
        switch (plant.healthStatus) {
            case 'Good':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'NeedsAttention':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Critical':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getHealthIcon = () => {
        switch (plant.healthStatus) {
            case 'Good':
                return <Heart size={14} className="fill-current" />;
            case 'NeedsAttention':
            case 'Critical':
                return <AlertCircle size={14} />;
            default:
                return <Heart size={14} />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <Link
            to={`/my-plant/${plant.id}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#1A2F1C]/5 hover:border-[#C77D63]/30 transform hover:-translate-y-1"
        >
            {/* Plant Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F5F0]">
                {plant.species?.imageUrl ? (
                    <img
                        src={plant.species.imageUrl}
                        alt={plant.nickname || plant.species.commonName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4A6741] to-[#1A2F1C]">
                        <span className="text-white/50 font-serif text-4xl">🌿</span>
                    </div>
                )}

                {/* Health Status Badge */}
                <div className="absolute top-3 right-3">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getHealthColor()}`}>
                        {getHealthIcon()}
                        <span className="hidden sm:inline">{plant.healthStatus || 'Good'}</span>
                    </div>
                </div>
            </div>

            {/* Plant Info */}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-serif text-lg font-bold text-[#1A2F1C] mb-1 line-clamp-1">
                        {plant.nickname || plant.species?.commonName || 'Unnamed Plant'}
                    </h3>
                    <p className="text-xs text-[#1A2F1C]/50 italic line-clamp-1">
                        {plant.species?.scientificName || 'Unknown species'}
                    </p>
                    {plant.garden && (
                        <p className="text-xs text-[#4A6741] font-mono mt-1">
                            📍 {plant.garden.name}
                        </p>
                    )}
                </div>

                {/* Last Watered */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#1A2F1C]/5">
                    <Droplets size={14} className="text-[#4A9EFF]" />
                    <div className="flex-1">
                        <p className="text-[10px] text-[#1A2F1C]/40 uppercase tracking-wider font-mono">
                            Last Watered
                        </p>
                        <p className="text-xs text-[#1A2F1C] font-medium">
                            {formatDate(plant.lastWatered)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PlantStatusCard;
