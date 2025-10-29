import { Mail, Lock, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Swal from "sweetalert2"; // ✅ Import at top
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin?: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Add type for event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Personalized SweetAlert2 popup
        Swal.fire({
          title: "💖 Bloomly says!",
          text: `Welcome back, ${data.name || "Beautiful Soul"}! ✨`,
          icon: "success",
          confirmButtonText: "Let’s Bloom 🌸",
          background: "#fff0f6",
          color: "#a8006b",
          confirmButtonColor: "#d63384",
          customClass: {
            popup: "rounded-2xl shadow-xl",
            title: "text-2xl font-bold",
            confirmButton: "text-lg font-semibold",
          },
        });

        // Redirect after delay
        setTimeout(() => onLogin?.(), 1800);
      } else {
        Swal.fire({
          title: "Oops 🌧️",
          text: data.message || "Login failed. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
          background: "#fff0f6",
          color: "#a8006b",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error 😢",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        background: "#fff0f6",
        color: "#a8006b",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Bloomly - PCOS Detector
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to continue your health journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => onNavigate("register")}
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687181082775-32b5a6e69017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdlbGxuZXNzJTIwY2FsbXxlbnwxfHx8fDE3NjE0ODg5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wellness"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-purple-500/20" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="mb-2 text-white">
                  Your Health Journey Starts Here
                </h3>
                <p className="text-pink-50">
                  Take control of your health with personalized PCOS support and
                  wellness guidance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
