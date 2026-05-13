import { Link } from "react-router-dom";
import {
  Briefcase,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const FOOTER_LINKS = {
  "For Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Internships", href: "/internships" },
    { label: "Remote Jobs", href: "/jobs?mode=remote" },
    { label: "Government Jobs", href: "/jobs?type=govt" },
    { label: "Walk-in Jobs", href: "/jobs?type=walkin" },
    { label: "Career Coach", href: "/student/ai-coach" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/employer/post-job" },
    { label: "Search Resumes", href: "/employer/candidates" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "AI Hiring Suite", href: "/employer/ai-tools" },
    { label: "Success Stories", href: "/blog" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/images/joblogo.png"
                alt="TodayJobs Logo"
                className="w-16 h-18 object-contain"
              />

              <span className="font-display font-bold text-xl text-white">
                TodayJobs
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-xs">
              India's most intelligent hiring platform. Connecting talent with
              opportunities using the power of AI.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-3.5 h-3.5" /> hello@TodayJobs.in
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="w-3.5 h-3.5" /> +91 1800-123-4567
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5" /> Bengaluru, India
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-gray-200 mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-gray-600">
            © 2026 TodayJobs Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-green-900/40 text-green-400 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />{" "}
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
