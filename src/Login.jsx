import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, Sprout } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="h-screen flex bg-[#F4F5F0]">


      <div className="hidden md:block w-1/2 relative overflow-hidden">

        <div className="absolute inset-0 bg-[#1A2F1C]/20 z-10 mix-blend-multiply"></div>


        <img
          src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop"
          alt="Vintage Botanical Illustration"
          className="w-full h-full object-cover animate-slow-zoom"

        />


        <div className="absolute bottom-12 left-12 z-20 text-[#F4F5F0]">
          <p className="font-serif text-3xl italic leading-snug max-w-md">
            "To plant a garden is to believe in tomorrow."
          </p>
          <p className="font-mono text-xs mt-4 tracking-[0.2em] opacity-80 uppercase">
            Audrey Hepburn
          </p>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24 relative ">


        {/* <div className="md:hidden absolute top-0 left-0 w-full h-2 bg-[#1A2F1C]"></div> */}

        <div className="w-full max-w-md space-y-12 ">


          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#4A6741] mb-4 ">
              <Sprout size={28} />
            </div>
            <h1 className="font-serif text-5xl text-[#1A2F1C]">Welcome back.</h1>
            <p className="font-sans text-gray-500">
              Return to your digital garden.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-[#C77D63] px-4 py-3 rounded-lg text-sm font-sans flex items-center justify-center">
                {error}
              </div>
            )}

            {/* Email Input - Underlined Style */}
            <div className="group relative">
              <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-0 text-gray-400 w-5 h-5 group-focus-within:text-[#C77D63] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gardener@example.com"
                  className="w-full bg-transparent border-b border-[#1A2F1C]/20 py-3 pl-8 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#C77D63] transition-colors font-sans"
                />
              </div>
            </div>

            {/* Password Input - Underlined Style */}
            <div className="group relative">
              <div className="flex justify-between items-center mb-2">
                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest">
                  Password
                </label>
                <a href="#" className="text-xs font-sans text-gray-400 hover:text-[#C77D63] transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-0 text-gray-400 w-5 h-5 group-focus-within:text-[#C77D63] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#1A2F1C]/20 py-3 pl-8 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#C77D63] transition-colors font-sans"
                />
              </div>
            </div>


            <button type="submit" className="w-full group bg-[#1A2F1C] text-[#F4F5F0] py-4 rounded-full font-sans tracking-widest text-xs font-bold hover:bg-[#C77D63] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 mt-8">
              SIGN IN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          {/* Footer Links */}
          <div className="text-center pt-2">
            <p className="font-sans text-sm text-gray-500">
              Don't have a plot yet?{" "}
              <Link to="/register" className="font-bold text-[#1A2F1C] hover:text-[#C77D63] transition-colors border-b border-[#1A2F1C]/20 hover:border-[#C77D63]">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;