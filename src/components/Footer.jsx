// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">
              Pushpagiri Technology
            </h2>
            <p className="text-sm mt-1">
              Design, Develop, and Innovate Solutions.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="hover:text-white transition">
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/coding" className="hover:text-white transition">
                    Coding
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Support</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/contact" className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Pushpagiri Technology. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
