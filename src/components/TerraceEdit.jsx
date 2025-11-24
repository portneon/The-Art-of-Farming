import React from "react";
import { Heart, Sun, Droplets } from "lucide-react";

const plants = [
  {
    id: "01",
    name: "Holy Basil (Tulsi)",
    sub: "Ocimum tenuiflorum",
    tag: "The Elixir of Life",
    desc: "Revered in Ayurveda for boosting immunity and stress relief. A sacred adaptogen that purifies the air and thrives in sunny spots.",
    icon: <Heart size={18} />,
    // Using a basil-family image
    image: "https://images.unsplash.com/photo-1708868746670-8ac750b607ab?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "02",
    name: "Aloe Vera",
    sub: "Kumari",
    tag: "The Skin Healer",
    desc: "A succulent powerhouse. Its gel is a natural remedy for burns and hydration. Requires minimal water and protects from UV radiation.",
    icon: <Droplets size={18} />,
    // Using a succulent/aloe style image
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "03",
    name: "Hibiscus",
    sub: "Japa Pushpa",
    tag: "The Hair Tonic",
    desc: "Rich in antioxidants. Its flowers are used in tea for heart health and oils for hair growth. Adds vibrant energy to any balcony.",
    icon: <Sun size={18} />,
    // Vibrant flower image
    image: "https://images.unsplash.com/photo-1622397178204-cd98013590a1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const TerraceEdit = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#1A2F1C] text-[#F4F5F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-[#C77D63] tracking-widest text-xs uppercase mb-2 block">
              Ayurvedic Essentials
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              The Wellness <br />
              <span className="italic text-[#4A6741] opacity-80">Terrace Edit.</span>
            </h2>
          </div>
          <p className="font-sans text-[#F4F5F0]/60 max-w-md text-sm leading-relaxed">
            Cultivate health at home with these high-impact medicinal plants 
            that have been central to Indian wellness for centuries.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <div key={plant.id} className="group relative">
              

              <div className="relative h-[400px] w-full overflow-hidden rounded-t-full rounded-b-2xl mb-6 isolation-auto bg-[#1A2F1C]">
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                 
                 <img 
                   src={plant.image} 
                   alt={plant.name} 
                   className="w-full h-full object-cover "
                 />
                 
                 {/* Floating Badge */}
                 <div className="absolute top-6 right-6 z-20 bg-[#F4F5F0]/90 backdrop-blur text-[#1A2F1C] p-3 rounded-full shadow-lg">
                    {plant.icon}
                 </div>
              </div>

              {/* Content Area */}
              <div className="border-t border-[#F4F5F0]/20 pt-6 transition-all duration-500 group-hover:border-[#C77D63]">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-serif text-2xl">{plant.name}</h3>
                        <p className="font-mono text-xs text-[#F4F5F0]/50 italic">{plant.sub}</p>
                    </div>
                    <span className="font-serif text-3xl text-[#F4F5F0]/10 group-hover:text-[#C77D63] transition-colors">
                        {plant.id}
                    </span>
                </div>
                
                <div className="inline-block px-3 py-1 border border-[#F4F5F0]/30 rounded-full text-[10px] tracking-widest uppercase mb-4 text-[#C77D63]">
                    {plant.tag}
                </div>

                <p className="font-sans text-sm text-[#F4F5F0]/60 leading-relaxed">
                    {plant.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TerraceEdit;