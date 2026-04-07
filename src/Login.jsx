import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, Sprout, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateInputs = () => {
    if (!email || !password) {
      return "Email and password are required.";
    }
    if (!email.includes("@")) {
      return "Enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Validation
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "Login failed. Please check your credentials.",
        );
      }

      // 🔹 Store auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userId", data.userId);

      // 🔹 Navigate
      navigate(data.redirect || "/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#F4F5F0]">
      {/* Left Image Section */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1A2F1C]/20 z-10 mix-blend-multiply"></div>

        <img
          src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop"
          alt="Vintage Botanical"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-12 left-12 z-20 text-[#F4F5F0]">
          <p className="font-serif text-3xl italic max-w-md">
            "To plant a garden is to believe in tomorrow."
          </p>
          <p className="font-mono text-xs mt-4 uppercase tracking-widest opacity-80">
            Audrey Hepburn
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24">
        <div className="w-full max-w-md space-y-10">
          {/* Header */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#4A6741] mb-4">
              <Sprout size={28} />
            </div>
            <h1 className="font-serif text-5xl text-[#1A2F1C]">
              Welcome back.
            </h1>
            <p className="text-gray-500">Return to your digital garden.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-[#C77D63] px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#4A6741] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gardener@example.com"
                  className="w-full border-b border-gray-300 py-3 pl-8 focus:outline-none focus:border-[#C77D63]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-[#4A6741]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-400 hover:text-[#C77D63]"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-3 text-gray-400 w-5 h-5" />
                <input
                  type={flag ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b border-gray-300 py-3 pl-8 focus:outline-none focus:border-[#C77D63]"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition"
                  type="button"
                  onClick={() => setFlag(!flag)}
                >
                  <div>{flag ? <EyeOff /> : <Eye />}</div>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A2F1C] text-white py-4 rounded-full text-xs font-bold tracking-widest hover:bg-[#C77D63] transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don't have a plot yet?{" "}
            <Link
              to="/register"
              className="font-bold text-[#1A2F1C] hover:text-[#C77D63]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
