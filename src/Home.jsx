
import React from "react";
import { ArrowRight } from "lucide-react"; 
import TerraceEdit from "./components/TerraceEdit";


const Home = () => {
  return (
    <>
    <section className="relative min-h-screen pt-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center overflow-hidden">
      {/* Background Design Element for Mobile */}
      <div className="md:hidden absolute top-0 right-0 w-72 h-72 opacity-20 pointer-events-none">
        <img 
          src="/ChatGPT Image Apr 13, 2025, 12_58_46 PM.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto items-center">
    
        {/* Text Content */}
        <div className="space-y-6 md:space-y-8 z-10">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] text-primary">
            Cultivating <br />
            <span className="italic text-secondary">Life.</span>
          </h1>
          
          <p className="font-sans text-base sm:text-lg text-gray-600 max-w-md leading-relaxed pr-8 md:pr-0">
            Explore the botanical science and ancient wisdom behind the world's flora.
          </p>

          <button className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-primary rounded-full text-primary hover:bg-green-800 hover:text-white transition-all duration-500 ease-out">
            <span className="text-xs sm:text-sm tracking-widest font-sans ">EXPLORE THE CATALOG</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        
        <div className="hidden md:flex relative justify-center items-center">
          <div className="absolute w-[80%] h-[80%] bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          <img 
            src="/leafimage.png" 
            alt="Botanical Specimen" 
            className="w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
       
      </div>
      
    </section>
    <TerraceEdit />
    </>
  );
};

export default Home;