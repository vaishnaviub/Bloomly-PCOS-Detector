import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { DetectionPage } from "./components/DetectionPage";
import { DietPage } from "./components/DietPage";
import { WellnessPage } from "./components/WellnessPage";
import { TrackingPage } from "./components/TrackingPage";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { isAuthenticated, login, logout } = useAuth();

  // ✅ Auto-restore login session if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      login(); // restores user session
    }
  }, [isAuthenticated, login]);

  // ✅ Smooth scroll and route navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Protected pages (require login)
  const protectedPages = ["detection", "diet", "wellness", "tracking"];

  // ✅ Decide which page to render
  const renderPage = () => {
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      return (
        <LoginPage
          onNavigate={handleNavigate}
          onLogin={() => {
            login();
            handleNavigate("home");
          }}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "login":
        return (
          <LoginPage
            onNavigate={handleNavigate}
            onLogin={() => {
              login();
              handleNavigate("home");
            }}
          />
        );
      case "register":
        return <RegisterPage onNavigate={handleNavigate} />;
      case "detection":
        return <DetectionPage />;
      case "diet":
        return <DietPage />;
      case "wellness":
        return <WellnessPage />;
      case "tracking":
        return <TrackingPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isAuthenticated}
        onLogout={() => {
          logout();
          handleNavigate("home");
        }}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}
