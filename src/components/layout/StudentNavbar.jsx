import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Bell, MessageSquare, Sun, Moon, ChevronDown, Search, User, Settings, LogOut, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { NOTIFICATIONS } from '../../data'
import clsx from 'clsx'

const NAV_LINKS = [
  { label: 'Home', href: '/student/dashboard' },
  { label: 'Jobs', href: '/student/jobs' },
  { label: 'Internships', href: '/student/internships' },
  { label: 'Applications', href: '/student/applications' },
  { label: 'Interviews', href: '/student/interviews' },
  { label: 'Alerts', href: '/student/alerts' },
  { label: 'Messages', href: '/student/messages' },
]

export default function StudentNavbar() {
  const { dark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const unread = NOTIFICATIONS.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-40 glass border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link to="/student/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
              Hire<span className="text-gradient">Flow</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href}
                className={clsx('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  location.pathname === link.href
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800')}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {dark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-1 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
                      <span className="badge bg-brand-100 text-brand-700">{unread} new</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {NOTIFICATIONS.map(n => (
                        <div key={n.id} className={clsx('px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-50 dark:border-gray-800/50', !n.read && 'bg-brand-50/40 dark:bg-brand-900/10')}>
                          <span className="text-lg">{n.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={clsx('text-xs text-gray-700 dark:text-gray-300 line-clamp-2', !n.read && 'font-semibold')}>{n.message}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-brand-500 rounded-full mt-1 flex-shrink-0" />}
                        </div>
                      ))}
                    </div>
                    <Link to="/student/notifications" onClick={() => setNotifOpen(false)}
                      className="block p-3 text-center text-xs text-brand-600 font-medium hover:bg-gray-50 transition-colors">
                      View all notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/student/messages" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
            </Link>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <img src="https://i.pravatar.cc/32?img=11" alt="Profile" className="w-7 h-7 rounded-full" />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">Arjun</span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Arjun Sharma</p>
                      <p className="text-xs text-gray-400">arjun@email.com</p>
                    </div>
                    {[
                      { icon: User, label: 'My Profile', href: '/student/profile' },
                      { icon: Settings, label: 'Settings', href: '/student/settings' },
                    ].map(item => (
                      <Link key={item.href} to={item.href} onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <item.icon className="w-4 h-4" /> {item.label}
                      </Link>
                    ))}
                    <button onClick={() => navigate('/')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border-t border-gray-100 dark:border-gray-800">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-2 grid grid-cols-2 gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}
                  className={clsx('px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.href ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:bg-gray-100')}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
