import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, ArrowUpRight, Sprout } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A2F1C] text-[#F4F5F0] pt-24 pb-12 px-6 md:px-20 border-t border-[#4A6741]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        
        {/* BRAND COLUMN (Spans 5 columns) */}
        <div className="md:col-span-5 space-y-8">
          <div className="flex items-center gap-2 text-[#4A6741]">
             <Sprout size={32} />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#F4F5F0]">
            The Art of <br />
            <span className="italic text-[#4A6741]">Farming.</span>
          </h2>
          <p className="font-sans text-[#F4F5F0]/60 max-w-sm leading-relaxed font-light">
            Explore nature's wonders and the ancient wisdom of propagation. 
            A digital sanctuary for those who wish to foster growth and life.
          </p>
          
          {/* The Sanskrit Motto - A nice cultural touch */}
          <div className="pt-6 border-t border-[#F4F5F0]/10 mt-6 w-fit">
             <p className="font-serif text-[#C77D63] italic text-lg">|| वनस्पतयः जीवनस्य प्रतीकाः सन्ति ||</p>
             <p className="font-mono text-[10px] tracking-[0.2em] text-[#F4F5F0]/40 mt-2 uppercase">
                Plants are symbols of life
             </p>
          </div>
        </div>

        {/* NAVIGATION COLUMN (Spans 3 columns) */}
        <div className="md:col-span-3 md:col-start-7">
           <h3 className="font-mono text-xs text-[#C77D63] uppercase tracking-widest mb-8">
             Directory
           </h3>
           <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Catalog', path: '/plants' },
                { name: 'About Journal', path: '/about' },
                { name: 'Login', path: '/login' }
              ].map((link) => (
                  <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="group flex items-center gap-2 text-[#F4F5F0]/70 hover:text-white transition-colors duration-300 font-sans"
                      >
                         <span className="group-hover:translate-x-1 transition-transform duration-300">
                           {link.name}
                         </span>
                         <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C77D63]" />
                      </Link>
                  </li>
              ))}
           </ul>
        </div>

        {/* CONNECT COLUMN (Spans 3 columns) */}
        <div className="md:col-span-3">
           <h3 className="font-mono text-xs text-[#C77D63] uppercase tracking-widest mb-8">
             Connect
           </h3>
           <ul className="space-y-6">
             <li>
               <a href="mailto:info@artoffarming.com" className="group flex items-center gap-4 text-[#F4F5F0]/70 hover:text-white transition-colors">
                 <div className="p-2 border border-[#F4F5F0]/20 rounded-full group-hover:border-[#C77D63] transition-colors">
                    <Mail className="w-4 h-4" />
                 </div>
                 <span className="text-sm">info@artoffarming.com</span>
               </a>
             </li>
             <li>
               <a href="https://instagram.com" className="group flex items-center gap-4 text-[#F4F5F0]/70 hover:text-white transition-colors">
                 <div className="p-2 border border-[#F4F5F0]/20 rounded-full group-hover:border-[#C77D63] transition-colors">
                    <Instagram className="w-4 h-4" />
                 </div>
                 <span className="text-sm">@artoffarming</span>
               </a>
             </li>
           </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#F4F5F0]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] text-[#F4F5F0]/30 uppercase tracking-wider">
          © {currentYear} Lazy Farms All rights reserved.
        </p>
        <div className="flex gap-8">
            <a href="#" className="font-mono text-[10px] text-[#F4F5F0]/30 uppercase tracking-wider hover:text-[#C77D63] transition-colors">Privacy Policy</a>
            <a href="#" className="font-mono text-[10px] text-[#F4F5F0]/30 uppercase tracking-wider hover:text-[#C77D63] transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;