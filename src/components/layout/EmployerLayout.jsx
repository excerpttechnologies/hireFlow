import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, LayoutDashboard, Building2, Users, Plus, FileText, UserCheck, MessageSquare,
  BarChart2, Settings, ChevronDown, Bell, Sun, Moon, Menu, X, CreditCard, Mail,
  Calendar, List, Star, Archive, Send, TrendingUp, Zap, LogOut, ChevronRight
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import clsx from 'clsx'

const SIDEBAR_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/employer/dashboard' },
      { icon: TrendingUp, label: 'Analytics', href: '/employer/analytics' },
    ]
  },
  {
    title: 'Jobs',
    items: [
      { icon: Plus, label: 'Post New Job', href: '/employer/post-job', highlight: true },
      { icon: List, label: 'All Jobs', href: '/employer/jobs' },
      { icon: Archive, label: 'Draft Jobs', href: '/employer/jobs?status=draft' },
      { icon: FileText, label: 'Closed Jobs', href: '/employer/jobs?status=closed' },
    ]
  },
  {
    title: 'Candidates',
    items: [
      { icon: Users, label: 'All Applicants', href: '/employer/applicants' },
      { icon: Star, label: 'Shortlisted', href: '/employer/applicants?status=shortlisted' },
      { icon: UserCheck, label: 'Interviews', href: '/employer/interviews' },
      { icon: Send, label: 'Offer Letters', href: '/employer/offers' },
    ]
  },
  {
    title: 'AI Tools',
    items: [
      { icon: Zap, label: 'AI Screening', href: '/employer/ai-tools', badge: 'NEW' },
    ]
  },
  {
    title: 'Communicate',
    items: [
      { icon: MessageSquare, label: 'Messages', href: '/employer/messages' },
      { icon: Mail, label: 'Email Campaigns', href: '/employer/campaigns' },
      { icon: Calendar, label: 'Calendar', href: '/employer/calendar' },
    ]
  },
  {
    title: 'Account',
    items: [
      { icon: Building2, label: 'Company Profile', href: '/employer/profile' },
      { icon: Users, label: 'Team Members', href: '/employer/team' },
      { icon: CreditCard, label: 'Billing', href: '/employer/billing' },
      { icon: Settings, label: 'Settings', href: '/employer/settings' },
    ]
  },
]

export default function EmployerLayout({ children }) {
  const { dark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const Sidebar = ({ mobile = false }) => (
    <div className={clsx(
      'h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300',
      !mobile && (collapsed ? 'w-16' : 'w-60')
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-3.5 h-3.5 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Hire<span className="text-gradient">Flow</span>
          </span>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRight className={clsx('w-3.5 h-3.5 text-gray-400 transition-transform', collapsed && 'rotate-180')} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin space-y-4">
        {SIDEBAR_SECTIONS.map(section => (
          <div key={section.title}>
            {(!collapsed || mobile) && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">{section.title}</p>
            )}
            {section.items.map(item => {
              const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} to={item.href} onClick={() => mobile && setMobileOpen(false)}
                  className={clsx('sidebar-link', active && 'active', item.highlight && 'bg-gradient-to-r from-brand-600 to-brand-500 !text-white hover:!bg-brand-700 shadow-md')}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {(!collapsed || mobile) && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && <span className="ml-auto badge bg-brand-100 text-brand-700 text-[10px]">{item.badge}</span>}
                    </>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      {(!collapsed || mobile) && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <img src="https://i.pravatar.cc/32?img=15" alt="User" className="w-8 h-8 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">Rahul Sharma</p>
              <p className="text-xs text-gray-400 truncate">Infosys HR</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-0 h-full w-60 z-50 lg:hidden">
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-3 px-4 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex-1" />
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {dark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-1 cursor-pointer" onClick={() => navigate('/employer/profile')}>
            <img src="https://i.pravatar.cc/32?img=15" alt="User" className="w-7 h-7 rounded-full" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Infosys HR</span>
          </div>
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 max-w-[1400px] mx-auto">
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
