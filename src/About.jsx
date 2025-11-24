import React from "react";
import { Sprout, BookOpen, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F4F5F0] text-[#1A2F1C]">
      
      {/* --- HERO SECTION: The Manifesto --- */}
      <section className="relative pt-32 pb-20 px-6 md:px-20 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="font-mono text-[#C77D63] tracking-[0.2em] text-xs uppercase mb-6 block animate-fade-in">
            Our Philosophy
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8">
            Growth starts with <br />
            <span className="italic text-[#4A6741]">understanding.</span>
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The Art of Farming is a digital sanctuary designed to bridge the gap between 
            ancient botanical wisdom and modern agricultural science.
          </p>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A6741]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C77D63]/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* --- VISUAL SPLIT: The "Namaste" Moment --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        {/* Image Side */}
        <div className="relative h-[400px] md:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2600&auto=format&fit=crop" 
            alt="Hands in Soil" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-[#1A2F1C]/20 mix-blend-multiply"></div>
        </div>

        {/* Content Side */}
        <div className="bg-[#1A2F1C] text-[#F4F5F0] p-12 md:p-24 flex flex-col justify-center">
          <div className="mb-8">
            <Sprout className="text-[#C77D63] w-10 h-10 mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Namaste.</h2>
            <p className="font-sans text-[#F4F5F0]/70 text-lg leading-relaxed mb-8">
              Welcome to <strong className="text-white">Lazy Farms</strong>. We believe that to plant a garden is to believe in tomorrow. 
              Whether you are a student, a hobbyist, or a master cultivator, our platform serves as your guide through the complex beauty of nature.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 border-t border-[#F4F5F0]/10 pt-8">
            <div>
              <h3 className="font-serif text-3xl text-[#C77D63]">30k+</h3>
              <p className="font-mono text-xs uppercase tracking-widest mt-1 text-[#F4F5F0]/50">Species Indexed</p>
            </div>
            <div>
              <h3 className="font-serif text-3xl text-[#C77D63]">140+</h3>
              <p className="font-mono text-xs uppercase tracking-widest mt-1 text-[#F4F5F0]/50">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES: The Core Pillars --- */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#1A2F1C]">Why we exist.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Pillar 1 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-[#F4F5F0]/30">
              <div className="bg-[#1A2F1C] w-12 h-12 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-[#C77D63] transition-colors">
                <BookOpen size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1A2F1C]">Botanical Intelligence</h3>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                Access detailed data on growth habits, soil pH, and climate suitability. 
                We translate complex horticultural science into actionable advice.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-[#F4F5F0]/30">
              <div className="bg-[#1A2F1C] w-12 h-12 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-[#C77D63] transition-colors">
                <Globe size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1A2F1C]">Global Heritage</h3>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                From the Himalayas to the Andes, explore the native regions of your plants. 
                Understand the cultural significance behind every leaf.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-[#F4F5F0]/30">
              <div className="bg-[#1A2F1C] w-12 h-12 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-[#C77D63] transition-colors">
                <Heart size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-[#1A2F1C]">Education First</h3>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                We are a learning platform first. Our goal is to foster environmental awareness 
                and sustainable growing practices for the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE MOTTO: Cultural Anchor --- */}
      <section className="py-32 px-6 text-center bg-[#F4F5F0] relative overflow-hidden">
        {/* Center Line */}
        <div className="absolute top-0 left-1/2 w-px h-20 bg-[#1A2F1C]/10 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A2F1C] mb-6 leading-tight">
            || वनस्पतयः जीवनस्य प्रतीकाः सन्ति ||
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#C77D63]"></span>
            <p className="font-mono text-[#C77D63] text-sm tracking-[0.3em] uppercase">
              Plants are symbols of life
            </p>
            <span className="h-px w-12 bg-[#C77D63]"></span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;