import React from "react";
import { MapPin, Leaf } from "lucide-react";

const GardenCard = ({ garden, onClick }) => {
    // Array of gradient backgrounds for visual variety
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];

    // Use garden id to consistently pick a gradient
    const gradientIndex = garden.id ? garden.id.charCodeAt(0) % gradients.length : 0;
    const backgroundGradient = gradients[gradientIndex];

    return (
        <div
            onClick={() => onClick && onClick(garden)}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
            {/* Gradient Background */}
            <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ background: backgroundGradient }}
            />

            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            {/* Content */}
            <div className="relative p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="font-serif text-2xl font-bold mb-1 text-white drop-shadow-md">
                            {garden.name}
                        </h3>
                        {garden.description && (
                            <p className="text-sm text-white/90 line-clamp-2 font-sans">
                                {garden.description}
                            </p>
                        )}
                    </div>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <Leaf size={20} className="text-white" />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-white/80" />
                        <span className="text-xs font-mono uppercase tracking-wider text-white/90">
                            Location
                        </span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white drop-shadow-md">
                            {garden.plantCount || 0}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                            Plants
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
        </div>
    );
};

export default GardenCard;
