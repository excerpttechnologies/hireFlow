import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Building2, Users, Briefcase, BarChart2, Settings, Bell, Sun, Moon, Menu,
  FileText, CreditCard, MessageSquare, Shield, Tag, MapPin, Zap, Mail, Ticket, Activity,
  LogOut, ChevronRight, TrendingUp, AlertTriangle, Globe, Star
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import clsx from 'clsx'

const ADMIN_MENU = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
      { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
      { icon: TrendingUp, label: 'Revenue', href: '/admin/revenue' },
    ]
  },
  {
    title: 'Companies',
    items: [
      { icon: Building2, label: 'All Companies', href: '/admin/companies' },
      { icon: AlertTriangle, label: 'Pending Approvals', href: '/admin/companies?status=pending', badge: '8' },
      { icon: Shield, label: 'Blocked', href: '/admin/companies?status=blocked' },
    ]
  },
  {
    title: 'Users',
    items: [
      { icon: Users, label: 'All Students', href: '/admin/students' },
      { icon: AlertTriangle, label: 'Suspended', href: '/admin/students?status=suspended' },
    ]
  },
  {
    title: 'Jobs',
    items: [
      { icon: Briefcase, label: 'All Jobs', href: '/admin/jobs' },
      { icon: AlertTriangle, label: 'Moderation', href: '/admin/jobs?status=pending', badge: '12' },
      { icon: AlertTriangle, label: 'Reported', href: '/admin/jobs?status=reported' },
    ]
  },
  {
    title: 'Content',
    items: [
      { icon: FileText, label: 'Blog CMS', href: '/admin/blog' },
      { icon: Star, label: 'Testimonials', href: '/admin/testimonials' },
      { icon: Globe, label: 'Banners', href: '/admin/banners' },
    ]
  },
  {
    title: 'Platform',
    items: [
      { icon: Tag, label: 'Categories', href: '/admin/categories' },
      { icon: MapPin, label: 'Locations', href: '/admin/locations' },
      { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
      { icon: Ticket, label: 'Support Tickets', href: '/admin/tickets', badge: '3' },
      { icon: Mail, label: 'Email Templates', href: '/admin/email-templates' },
      { icon: Activity, label: 'Audit Logs', href: '/admin/audit-logs' },
      { icon: Zap, label: 'AI Fraud Detection', href: '/admin/fraud' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: Shield, label: 'Roles & Permissions', href: '/admin/roles' },
      { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ]
  },
]

export default function AdminLayout({ children }) {
  const { dark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const Sidebar = ({ mobile = false }) => (
    <div className={clsx(
      'h-full flex flex-col bg-gray-950 transition-all duration-300',
      !mobile && (collapsed ? 'w-16' : 'w-60')
    )}>
      <div className="flex items-center gap-2 px-4 h-14 border-b border-gray-800 flex-shrink-0">
        <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-brand-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-3.5 h-3.5 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <span className="font-display font-bold text-base text-white">Admin<span className="text-brand-400">Panel</span></span>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1 rounded hover:bg-gray-800">
            <ChevronRight className={clsx('w-3.5 h-3.5 text-gray-500 transition-transform', collapsed && 'rotate-180')} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin space-y-3">
        {ADMIN_MENU.map(section => (
          <div key={section.title}>
            {(!collapsed || mobile) && (
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 mb-1">{section.title}</p>
            )}
            {section.items.map(item => {
              const active = location.pathname === item.href
              return (
                <Link key={item.href} to={item.href} onClick={() => mobile && setMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                    active ? 'bg-brand-600 text-white' : 'text-gray-500 hover:bg-gray-800 hover:text-gray-200'
                  )}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {(!collapsed || mobile) && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none">{item.badge}</span>}
                    </>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {(!collapsed || mobile) && (
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-800 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-brand-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Super Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@TodayJobs.in</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <div className="hidden lg:block flex-shrink-0"><Sidebar /></div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-0 h-full w-60 z-50 lg:hidden"><Sidebar mobile /></motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <header className="h-14 border-b border-gray-800/30 bg-white dark:bg-gray-900 flex items-center gap-3 px-4 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">TodayJobs Admin</span>
          <div className="flex-1" />
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            {dark ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </header>

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
