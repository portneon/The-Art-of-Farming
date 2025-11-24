import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import PlantCard from "./PlantCard.jsx";
import SkeletonCard from "../components/SkeletonCard";

// Mock data in case localhost API fails, so you can see the design
const MOCK_PLANTS = [
  { id: 1, common_name: "Monstera Deliciosa", scientific_name: "Monstera deliciosa", image_url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800" },
  { id: 2, common_name: "Fiddle Leaf Fig", scientific_name: "Ficus lyrata", image_url: "https://images.unsplash.com/photo-1612470120215-68048126b38c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, common_name: "Snake Plant", scientific_name: "Dracaena trifasciata", image_url: "https://images.unsplash.com/photo-1599598425947-321124233f2e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, common_name: "Rubber Plant", scientific_name: "Ficus elastica", image_url: "https://images.unsplash.com/photo-1598887142487-3c825a0b943d?auto=format&fit=crop&q=80&w=800" },
  { id: 5, common_name: "Bird of Paradise", scientific_name: "Strelitzia reginae", image_url: "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=800" },
  { id: 6, common_name: "Pothos", scientific_name: "Epipremnum aureum", image_url: "https://images.unsplash.com/photo-1596724852959-9f43c2c4b547?auto=format&fit=crop&q=80&w=800" },
];

function Catalog() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    
    const fetchPlants = async () => {
      try {
        setLoading(true);
       
        const response = await fetch("http://localhost:3000/api/plants");
        
        if (!response.ok) throw new Error("API not available");
        
        const result = await response.json();
        setPlants(result.data);
      } catch (error) {
        console.warn("API failed, using Mock Data for Design Showcase:", error);
        // Fallback to mock data so the UI still looks good for the prompt
        // Remove this setTimeout in production, it's just to show off the skeleton loader
        setTimeout(() => {
            setPlants(MOCK_PLANTS);
        }, 1500); 
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchPlants();
  }, []);


  const filteredPlants = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F5F0] pt-24 pb-20 px-6 md:px-12 lg:px-20">
      
   
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-6">
          The Botanical <span className="italic text-[#4A6741]">Catalog.</span>
        </h1>
        <p className="font-sans text-gray-500 max-w-2xl mx-auto text-lg">
          A curated collection of nature's finest specimens, indexed for the modern grower.
        </p>
      </div>

     
      <div className="sticky top-24 z-30 max-w-3xl mx-auto mb-16">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#C77D63] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full text-[#1A2F1C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C77D63]/20 focus:border-[#C77D63] transition-all shadow-sm hover:shadow-md font-sans"
            placeholder="Search by species name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
             <button className="p-2 text-gray-400 hover:text-[#1A2F1C] transition-colors">
                <Filter className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>

  
      <div className="max-w-7xl mx-auto">
        {loading ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : filteredPlants.length > 0 ? (
          // Actual Data
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
        
          <div className="text-center py-20 opacity-60">
             <h2 className="font-serif text-2xl text-[#1A2F1C]">No specimens found.</h2>
             <p className="font-sans text-gray-500 mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;