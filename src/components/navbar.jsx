import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  
  const isAuthPage = ["/login", "/register"].includes(location.pathname);


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "CATALOG", path: "/plants" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center w-full px-4">
        <nav className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 ${
           
            isOpen 
              ? "bg-white border border-gray-100 rounded-3xl shadow-lg" 
              : isAuthPage 
                ? "bg-transparent border-none shadow-none text-transparent"
                : "bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-full"
          }`}>
          
        
          <Link to="/" className="flex-shrink-0 z-50">
            <h1 className={`text-2xl font-bold font-serif tracking-tight transition-colors ${
              
              isOpen ?"text-[#1A2F1C]" : "text-[#1A2F1C]"
              }`}>
              Art of Farming
            </h1>
          </Link>

          {/* DESKTOP NAV: Hidden on Auth Pages OR Mobile */}
          {!isAuthPage && (
            <ul className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs font-sans tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? "text-[#1A2F1C] font-bold" : "text-gray-500 hover:text-[#4A6741]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* RIGHT ACTION: Login Button (Normal) OR Menu Icon (Auth/Mobile) */}
          <div className="flex items-center gap-4">
            
            {/* Show 'Login' button only on normal pages & desktop */}
            {!isAuthPage && (
              <Link 
                to="/login" 
                className="hidden md:block px-6 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-[#C77D63] hover:bg-[#a8654e] hover:shadow-lg"
              >
                Login
              </Link>
            )}

            {/* HAMBURGER MENU: Shows on Mobile OR Auth Pages */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors z-50 ${
                /* On desktop, only show this if it's an Auth Page */
                !isAuthPage ? "md:hidden" : "block"
              } ${isOpen ? "bg-gray-100 text-[#1A2F1C]" : "text-[#1A2F1C] hover:bg-white/50"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE / MENU OVERLAY */}
      {/* This opens when the Hamburger is clicked */}
      <div className={`fixed inset-0 z-40 bg-[#F4F5F0] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
         <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="font-serif text-3xl text-[#1A2F1C] hover:text-[#C77D63] transition-colors"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {link.name}
                </NavLink>
            ))}
            {!isAuthPage && (
               <Link 
                 to="/login" 
                 className="px-8 py-3 bg-[#1A2F1C] text-[#F4F5F0] rounded-full font-sans tracking-widest text-xs mt-8"
                 onClick={() => setIsOpen(false)}
               >
                 LOGIN AREA
               </Link>
            )}
         </div>
      </div>
    </>
  );
};

export default Navbar;