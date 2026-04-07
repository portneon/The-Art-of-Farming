import React from "react";
import { MapPin, Leaf } from "lucide-react";

const GardenCard = ({ garden, onClick }) => {
  const gradients = [
    "linear-gradient(135deg, #1A2F1C 0%, #2A402D 100%)",
    "linear-gradient(135deg, #2A402D 0%, #4A6741 100%)",
    "linear-gradient(135deg, #1A2F1C 0%, #3D352A 100%)",
  ];

  const gradientIndex = garden.id
    ? String(garden.id).charCodeAt(0) % gradients.length
    : 0;
  const backgroundGradient = gradients[gradientIndex];

  return (
    <div
      onClick={() => onClick && onClick(garden)}
      className="group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#1A2F1C]/5 aspect-[4/3] flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ background: backgroundGradient }}
      />

      {/* Subtle organic noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBuc3VtdG9ycz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />

      <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/80 group-hover:text-[#C77D63] transition-colors z-10">
        <Leaf size={18} strokeWidth={1.5} />
      </div>

      <div className="relative p-6 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
        <h3 className="font-serif text-3xl font-bold mb-1 text-white">
          {garden.name}
        </h3>
        {garden.description && (
          <p className="text-sm text-white/80 line-clamp-1 font-sans mb-4">
            {garden.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-white/60" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
              Location
            </span>
          </div>
          <div className="text-right flex items-baseline gap-1">
            <span className="text-2xl font-serif text-white">
              {garden.plantCount || 0}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
              Plants
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenCard;
