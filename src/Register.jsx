import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Sprout } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("https://theartoffarming.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="h-screen flex bg-[#F4F5F0]">


      <div className="hidden md:block w-1/2 relative overflow-hidden mt-15px">
        <div className="absolute inset-0 bg-[#1A2F1C]/20 z-10 mix-blend-multiply"></div>


        <img
          src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=2982&auto=format&fit=crop"
          alt="Vintage Botanical Roots"
          className="w-full h-full object-cover"
        />


        <div className="absolute bottom-12 left-12 z-20 text-[#F4F5F0]">
          <p className="font-serif text-3xl italic leading-snug max-w-md">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
          <p className="font-mono text-xs mt-4 tracking-[0.2em] opacity-80 uppercase">
            Chinese Proverb
          </p>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24 relative py-12">


        <div className="md:hidden absolute top-0 left-0 w-full h-2 bg-[#1A2F1C]"></div>

        <div className="w-full max-w-md space-y-5">



          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#4A6741] mb-4 mt-15px">
              <Sprout size={28} />
            </div>
            <h1 className="font-serif text-5xl text-[#1A2F1C]">Join us.</h1>
            <p className="font-sans text-gray-500">
              Start your journey into the botanical world.
            </p>
          </div>


          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-[#1A2F1C] px-4 py-3 rounded-lg text-sm font-sans flex items-center justify-center">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-[#C77D63] px-4 py-3 rounded-lg text-sm font-sans flex items-center justify-center">
                {error}
              </div>
            )}

            <div className="group relative">
              <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-0 text-gray-400 w-5 h-5 group-focus-within:text-[#C77D63] transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border-b border-[#1A2F1C]/20 py-3 pl-8 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#C77D63] transition-colors font-sans"
                />
              </div>
            </div>

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

            <div className="group relative">
              <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-0 text-gray-400 w-5 h-5 group-focus-within:text-[#C77D63] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full bg-transparent border-b border-[#1A2F1C]/20 py-3 pl-8 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#C77D63] transition-colors font-sans"
                />
              </div>
            </div>


            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" className="accent-[#1A2F1C] w-4 h-4 cursor-pointer" />
              <p className="text-xs text-gray-500 font-sans">
                I agree to the <a href="#" className="underline hover:text-[#C77D63]">Terms of Service</a> and <a href="#" className="underline hover:text-[#C77D63]">Privacy Policy</a>.
              </p>
            </div>


            <button type="submit" className="w-full group bg-[#1A2F1C] text-[#F4F5F0] py-4 rounded-full font-sans tracking-widest text-xs font-bold hover:bg-[#C77D63] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 mt-4">
              CREATE ACCOUNT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>


          <div className="text-center">
            <p className="font-sans text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#1A2F1C] hover:text-[#C77D63] transition-colors border-b border-[#1A2F1C]/20 hover:border-[#C77D63]">
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;