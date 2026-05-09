import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Clock, CheckCircle, Eye, Zap, BookmarkCheck, Bell, ArrowRight, ChevronRight, Star, Target, Award } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { JOBS, COMPANIES, APPLICATIONS, NOTIFICATIONS } from '../../data'
import { StatCard, Card, Badge, CompanyLogo, MatchMeter, Progress, Button } from '../../components/ui'
import clsx from 'clsx'

const activityData = [
  { day: 'Mon', views: 12, applications: 2 },
  { day: 'Tue', views: 19, applications: 3 },
  { day: 'Wed', views: 8, applications: 1 },
  { day: 'Thu', views: 25, applications: 4 },
  { day: 'Fri', views: 18, applications: 2 },
  { day: 'Sat', views: 14, applications: 3 },
  { day: 'Sun', views: 22, applications: 5 },
]

const PIE_COLORS = ['#6366f1', '#f97316', '#10b981', '#ef4444', '#f59e0b']

const applicationStatus = [
  { name: 'Applied', value: 14 },
  { name: 'Shortlisted', value: 5 },
  { name: 'Interview', value: 3 },
  { name: 'Rejected', value: 4 },
  { name: 'Offer', value: 1 },
]

export default function StudentDashboard() {
  const myApps = APPLICATIONS.slice(0, 8)
  const recommended = JOBS.slice(0, 6)

  const stats = [
    { title: 'Total Applications', value: '27', change: '+5 this week', icon: Briefcase, color: 'brand', trend: 'up' },
    { title: 'Profile Views', value: '143', change: '+18 this week', icon: Eye, color: 'blue', trend: 'up' },
    { title: 'Saved Jobs', value: '12', change: '+3 this week', icon: BookmarkCheck, color: 'orange', trend: 'up' },
    { title: 'Interviews', value: '3', change: '+2 this week', icon: CheckCircle, color: 'green', trend: 'up' },
  ]

  const profileCompletion = 72
  const profileItems = [
    { label: 'Photo', done: true }, { label: 'Skills', done: true }, { label: 'Education', done: true },
    { label: 'Experience', done: false }, { label: 'Resume', done: true }, { label: 'Portfolio', done: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">
            Good morning, Arjun! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">You have <span className="text-brand-600 font-semibold">3 new job matches</span> and <span className="text-emerald-600 font-semibold">1 interview scheduled</span> today.</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Search Jobs', href: '/student/jobs', icon: '🔍', color: 'from-brand-500 to-brand-600' },
            { label: 'AI Resume', href: '/student/ai-resume', icon: '🤖', color: 'from-purple-500 to-purple-600' },
            { label: 'Career Coach', href: '/student/ai-coach', icon: '🎯', color: 'from-accent-500 to-orange-600' },
            { label: 'Practice Interview', href: '/student/interviews', icon: '💬', color: 'from-emerald-500 to-emerald-600' },
          ].map(action => (
            <Link key={action.label} to={action.href}
              className={clsx('bg-gradient-to-br p-4 rounded-2xl text-white font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md', action.color)}>
              <span className="text-xl">{action.icon}</span> {action.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Activity Chart */}
          <div className="xl:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Weekly Activity</h2>
              <Badge variant="brand">This Week</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="views" stroke="#6366f1" fill="url(#colorViews)" strokeWidth={2} name="Profile Views" />
                <Area type="monotone" dataKey="applications" stroke="#f97316" fill="url(#colorApps)" strokeWidth={2} name="Applications" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Application Status Pie */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Application Status</h2>
            <div className="flex justify-center mb-4">
              <PieChart width={180} height={180}>
                <Pie data={applicationStatus} cx={90} cy={90} innerRadius={55} outerRadius={80} dataKey="value">
                  {applicationStatus.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2">
              {applicationStatus.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Recommended Jobs */}
          <div className="xl:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Recommended for You</h2>
              <Link to="/student/jobs" className="text-brand-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recommended.slice(0, 5).map((job, i) => {
                const company = COMPANIES.find(c => c.id === job.companyId)
                return (
                  <motion.div key={job.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                    <CompanyLogo name={company?.name} color={company?.color} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors truncate">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company} · {job.location} · ₹{job.salaryMin}–{job.salaryMax}L</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <MatchMeter value={job.match} />
                      <Link to={`/jobs/${job.id}`} className="text-xs btn-primary py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-4">
            {/* Profile Completion */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Profile Strength</h3>
                <span className="text-brand-600 font-bold text-sm">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="mb-4" />
              <div className="space-y-2">
                {profileItems.map(item => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                    {item.done ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : (
                      <Link to="/student/edit-profile" className="text-brand-600 font-medium hover:underline">Add</Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Upcoming</h3>
              <div className="space-y-3">
                {[
                  { title: 'Google Technical Interview', time: 'Tomorrow 10:00 AM', type: 'interview' },
                  { title: 'Resume Webinar', time: 'Wed 3:00 PM', type: 'event' },
                ].map((event, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                    <div className="w-7 h-7 bg-brand-100 dark:bg-brand-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      {event.type === 'interview' ? '🎤' : '📅'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{event.title}</p>
                      <p className="text-xs text-brand-600">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Recent Alerts</h3>
              <div className="space-y-2">
                {NOTIFICATIONS.slice(0, 3).map(n => (
                  <div key={n.id} className="flex items-start gap-2 text-xs">
                    <span>{n.icon}</span>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900 dark:text-white">Recent Applications</h2>
            <Link to="/student/applications" className="text-brand-600 text-xs font-semibold">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-2 px-3 text-xs text-gray-400 font-semibold uppercase">Role</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-400 font-semibold uppercase">Company</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-400 font-semibold uppercase hidden sm:table-cell">Date</th>
                  <th className="text-left py-2 px-3 text-xs text-gray-400 font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {myApps.slice(0, 6).map((app, i) => {
                  const statusColors = {
                    applied: 'bg-blue-100 text-blue-700', shortlisted: 'bg-purple-100 text-purple-700',
                    interview: 'bg-yellow-100 text-yellow-800', offer: 'bg-green-100 text-green-700',
                    rejected: 'bg-red-100 text-red-600', hold: 'bg-orange-100 text-orange-700'
                  }
                  return (
                    <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-white text-xs">{app.jobTitle}</td>
                      <td className="py-3 px-3 text-gray-500 text-xs">{app.company}</td>
                      <td className="py-3 px-3 text-gray-400 text-xs hidden sm:table-cell">{app.appliedDate}</td>
                      <td className="py-3 px-3">
                        <span className={clsx('badge text-xs', statusColors[app.status])}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
