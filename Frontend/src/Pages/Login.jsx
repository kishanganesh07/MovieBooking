import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BackendUrl } from "../config";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }
    try {
      setLoading(true);
      const res = await fetch(`${BackendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      
      localStorage.setItem("token", data.token || "true");
      toast.success("Welcome back! 🍿");
      if (data.user.isAdmin) {
          navigate("/admin");
      } else {
          navigate("/");
      }

    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await fetch(`${BackendUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      
      localStorage.setItem("token", data.token || "true");
      toast.success("Welcome via Google! 🍿");
      if (data.user.isAdmin) {
          navigate("/admin");
      } else {
          navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[url('https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg')] bg-cover bg-center relative">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />

        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 animate-[fadeInUp_0.5s_ease-out]">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300 uppercase tracking-wide ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white placeholder-gray-500"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300 uppercase tracking-wide ml-1">Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-white placeholder-gray-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 cursor-pointer bg-gradient-to-r from-primary to-primary-dull rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>Sign In <ArrowRight className="w-5 h-5" /></>
                    )}
                </button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            toast.error("Google Login Failed");
                        }}
                        theme="filled_black"
                        shape="pill"
                    />
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <button 
                        onClick={() => navigate("/register")}
                        className="text-primary cursor-pointer font-semibold hover:text-primary-light hover:underline transition-colors"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
};

export default Login;
