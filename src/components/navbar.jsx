import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  // Detect PlantDetail page
  const isPlantDetailPage = /^\/plants\/[^/]+$/.test(location.pathname);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);


  useEffect(() => {
    setIsOpen(false);
    setUserName(localStorage.getItem("userName"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setUserName(null);
    navigate("/");
  };

  const navLinks = userName
    ? [
      { name: "DASHBOARD", path: "/dashboard" },
      { name: "CATALOG", path: "/plants" },
      { name: "ABOUT", path: "/about" },
    ]
    : [
      { name: "HOME", path: "/" },
      { name: "CATALOG", path: "/plants" },
      { name: "ABOUT", path: "/about" },
    ];

  return (
    <>
      {/* Wrapper: pointer-events-none allows clicks to pass through to the Back button below. items-center ensures vertical alignment. */}
      <div className={`fixed left-0 right-0 z-[100] flex w-full transition-all duration-300 pointer-events-none ${isOpen
        ? "top-4 justify-center px-4" /* Standard positioning when open */
        : isPlantDetailPage
          ? "top-0 justify-end px-6 py-4 items-center" /* Special alignment for PlantDetail closed */
          : "top-4 justify-center px-4" /* Standard positioning closed */
        }`}>

        <nav className={`flex items-center transition-all duration-300 pointer-events-auto ${isOpen
          ? "justify-between w-full max-w-5xl bg-white border border-gray-100 rounded-3xl shadow-lg px-6 py-3"
          : isAuthPage
            ? "justify-between w-full max-w-5xl bg-transparent border-none shadow-none text-transparent px-6 py-3"
            : isPlantDetailPage
              ? "w-auto bg-transparent ml-auto px-0 py-0" /* Minimal, transparent, no padding when closed on PlantDetail */
              : "justify-between w-full max-w-5xl bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-full px-6 py-3"
          }`}>


          {/* Logo - Hidden on PlantDetailPage (or Auth) when closed */}
          {!isPlantDetailPage && (
            <Link to="/" className="flex-shrink-0 z-50">
              <h1 className={`text-2xl font-bold font-serif tracking-tight transition-colors ${isOpen ? "text-[#1A2F1C]" : "text-[#1A2F1C]"
                }`}>
                Art of Farming
              </h1>
            </Link>
          )}

          {/* DESKTOP NAV: Hidden on Auth Pages OR Mobile OR PlantDetail */}
          {!isAuthPage && !isPlantDetailPage && (
            <ul className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs font-sans tracking-[0.2em] transition-colors duration-300 ${isActive ? "text-[#1A2F1C] font-bold" : "text-gray-500 hover:text-[#4A6741]"
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
            {/* Show 'Login' button only on normal pages & desktop */}
            {!isAuthPage && !isPlantDetailPage && (
              userName ? (
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-[#1A2F1C] font-serif italic text-sm">Hello, {userName}</span>
                  <button
                    onClick={handleLogout}
                    className="hidden md:block px-6 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-[#C77D63] hover:bg-[#a8654e] hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block px-6 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-[#C77D63] hover:bg-[#a8654e] hover:shadow-lg"
                >
                  Login
                </Link>
              )
            )}

            {/* HAMBURGER MENU: Shows on Mobile OR Auth Pages OR PlantDetail */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors z-50 ${
                /* On desktop, only show this if it's an Auth Page OR PlantDetail */
                !isAuthPage && !isPlantDetailPage ? "md:hidden" : "block"
                } ${isOpen ? "bg-gray-100 text-[#1A2F1C]" : "text-[#1A2F1C] hover:bg-white/50"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE / MENU OVERLAY */}
      {/* This opens when the Hamburger is clicked */}
      <div className={`fixed inset-0 z-[90] bg-[#F4F5F0] transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
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
            userName ? (
              <div className="flex flex-col items-center gap-4 mt-8">
                <span className="font-serif text-xl text-[#1A2F1C]">Hello, {userName}</span>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="px-8 py-3 bg-[#1A2F1C] text-[#F4F5F0] rounded-full font-sans tracking-widest text-xs"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3 bg-[#1A2F1C] text-[#F4F5F0] rounded-full font-sans tracking-widest text-xs mt-8"
                onClick={() => setIsOpen(false)}
              >
                LOGIN AREA
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;