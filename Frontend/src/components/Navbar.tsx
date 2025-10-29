import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({ currentPage, onNavigate, isLoggedIn, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Detection", value: "detection" },
    { label: "Diet", value: "diet" },
    { label: "Tracking", value: "tracking" },
    { label: "Wellness", value: "wellness" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="Bloomly Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Bloomly - PCOS Detector
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.value
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-pink-50 hover:text-pink-500 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-pink-50 hover:text-pink-500 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.value
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-pink-100 space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout();
                    onNavigate("home");
                  }}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-pink-50 hover:text-pink-500 transition-all"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate("login");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-pink-50 hover:text-pink-500 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("register");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
