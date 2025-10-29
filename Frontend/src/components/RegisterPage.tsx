import { Mail, Lock, User, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import axios from "axios";
import Swal from "sweetalert2";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onLogin?: () => void; // ✅ made optional
}

export function RegisterPage({ onNavigate, onLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops 😅",
      text: "Passwords don't match!",
      confirmButtonColor: "#d63384",
      background: "#ffe6f0",
    });
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/auth/register", {
      name,
      email,
      password,
    });

    if (response.status === 201 || response.status === 200) {
      await Swal.fire({
        icon: "success",
        title: "💖 Bloomly says!",
        html: `
          <h3 style="color:#d63384;">Welcome aboard, ${name || "beautiful soul"}! ✨</h3>
          <p style="color:#5a189a;">Your account has been created successfully.<br>Let’s begin your wellness journey 🌸</p>
        `,
        confirmButtonText: "Let's Bloom 🌼",
        confirmButtonColor: "#d63384",
        background: "#ffe6f0",
      });

      // Navigate to login page after popup
      onNavigate("login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration Failed 😢",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d63384",
        background: "#ffe6f0",
      });
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    Swal.fire({
      icon: "error",
      title: "Server Error 😥",
      text: error.response?.data?.message || "Something went wrong. Check your backend connection.",
      confirmButtonColor: "#d63384",
      background: "#ffe6f0",
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655943508401-5f1e2cce820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2MTQxMDI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Yoga and meditation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-purple-500/20" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="mb-2 text-white">Begin Your Wellness Journey</h3>
                <p className="text-pink-50">
                  Join a community of empowered women taking charge of their health.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Bloomly - PCOS Detector
                </span>
              </div>
              <h2 className="mb-2">Create Account</h2>
              <p className="text-gray-600">
                Start your journey to better health today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 mt-1"
                  required
                />
                <span className="ml-2 text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => onNavigate("login")}
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
