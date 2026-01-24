import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import PlantCard from "./components/PlantCard.jsx";
import SkeletonCard from "./components/SkeletonCard";



function Catalog() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchPlants = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://theartoffarming.onrender.com/plants");

        if (!response.ok) throw new Error("API not available");

        const result = await response.json();
        setPlants(result.data);
      } catch (error) {
        console.warn("error while fetching plant data ", error);


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
    <div className=" min-h-screen bg-[#F4F5F0] pt-24 pb-20 px-6 md:px-12 lg:px-20">


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