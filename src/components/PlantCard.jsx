import React from "react";
import { ArrowUpRight } from "lucide-react";

const PlantCard = ({ plant }) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1">
      
      <div className="relative h-[350px] overflow-hidden bg-[#F4F5F0]">
        <img
          src={plant.image_url || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=3000&auto=format&fit=crop"} // Fallback image
          alt={plant.common_name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
     
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F1C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

   
      <div className="p-6 relative">
        
     
        <p className="font-mono text-xs italic text-gray-500 mb-2 group-hover:text-[#4A6741] transition-colors">
          {plant.scientific_name || "Botanical Unknown"}
        </p>


        <h3 className="font-serif text-2xl font-bold text-[#1A2F1C] mb-1 leading-tight">
          {plant.common_name}
        </h3>

     
        <div className="absolute top-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 delay-100">
           <div className="bg-[#C77D63] p-2 rounded-full text-white">
              <ArrowUpRight size={20} />
           </div>
        </div>
        
        <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500 ease-out mt-1">
             <span className="text-xs font-bold tracking-widest text-white/90 uppercase border-b border-[#C77D63] pb-1">
                View Specimen
             </span>
             
        </div>
      </div>
    </div>
  );
};

export default PlantCard;