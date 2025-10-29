import { Heart, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-300 via-pink-400 to-purple-400 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 fill-white" />
              <span className="text-white">Bloomly - PCOS Detector</span>
            </div>
            <p className="text-pink-50">
              Empowering women's health with personalized PCOS detection and wellness support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-pink-50">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://x.com" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:vaishnaviub0815@gmail.com" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/vaishnaviub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full hover:bg-gray-400/50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.6.4-1 .7-1.2-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.6.1 2.9.8.9 1.2 2 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-pink-50">
          <p>&copy; {new Date().getFullYear()} Bloomly - PCOS Detector. All rights reserved. Made with 💜 for women's health.</p>
        </div>
      </div>
    </footer>
  );
}
