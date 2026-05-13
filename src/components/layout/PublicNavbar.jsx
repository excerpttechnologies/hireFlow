import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Bell,
  ChevronDown,
  Briefcase,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Internships", href: "/internships" },
  { label: "Companies", href: "/companies" },
  { label: "Blog", href: "/blog" },
];

export default function PublicNavbar() {
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 glass border-b border-gray-200/60 dark:border-gray-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/joblogo.png"
              alt="TodayJobs Logo"
              className="w-16 h-16 object-contain"
            />

            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Today<span className="text-gradient">Jobs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {dark ? (
                <Sun className="w-4 h-4 text-gray-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  Login <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                    >
                      <Link
                        to="/login/student"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Job Seeker
                          </p>
                          <p className="text-xs text-gray-400">
                            Find your dream job
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/login/employer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-accent-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Employer
                          </p>
                          <p className="text-xs text-gray-400">
                            Hire top talent
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/admin/login"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-800"
                      >
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Admin
                          </p>
                          <p className="text-xs text-gray-400">
                            Manage platform
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                to="/register/student"
                className="btn-primary text-sm py-2 px-4 rounded-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                <Link
                  to="/login/student"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 btn-secondary text-sm text-center py-2 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register/student"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 btn-primary text-sm text-center py-2 rounded-xl"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
