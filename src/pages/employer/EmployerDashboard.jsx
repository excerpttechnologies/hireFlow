import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Briefcase, Eye, TrendingUp, Plus, Star, Clock, ChevronRight, Zap, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { ANALYTICS_DATA, APPLICATIONS, JOBS, STUDENTS } from '../../data'
import { StatCard, Badge, StatusBadge, Avatar, Button, CompanyLogo } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const PIPELINE = [
  { stage: 'Applied', count: 342, color: 'bg-blue-500', pct: 100 },
  { stage: 'Screened', count: 186, color: 'bg-purple-500', pct: 54 },
  { stage: 'Interview', count: 87, color: 'bg-yellow-500', pct: 25 },
  { stage: 'Offer', count: 23, color: 'bg-orange-500', pct: 7 },
  { stage: 'Hired', count: 12, color: 'bg-emerald-500', pct: 4 },
]

export default function EmployerDashboard() {
  const recentApps = APPLICATIONS.slice(0, 8)
  const activeJobs = JOBS.slice(0, 5)

  return (
    <EmployerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">Welcome back, Infosys! 👋</h1>
            <p className="text-gray-500 text-sm mt-1">You have <span className="text-brand-600 font-semibold">47 new applications</span> to review today.</p>
          </div>
          <Link to="/employer/post-job" className="btn-primary flex items-center gap-2 py-2.5 px-5 rounded-xl text-sm">
            <Plus className="w-4 h-4" /> Post New Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Applicants', value: '1,247', change: '+47 today', icon: Users, color: 'brand', trend: 'up' },
            { title: 'Active Jobs', value: '18', change: '+2 this week', icon: Briefcase, color: 'blue', trend: 'up' },
            { title: 'Job Views', value: '8,432', change: '+12% this week', icon: Eye, color: 'purple', trend: 'up' },
            { title: 'Hired This Month', value: '12', change: '+5 vs last month', icon: CheckCircle, color: 'green', trend: 'up' },
          ].map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Applications Trend */}
          <div className="xl:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Application Trends</h2>
              <Badge variant="brand">Last 7 months</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ANALYTICS_DATA.applicationTrend}>
                <defs>
                  <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="applications" stroke="#6366f1" fill="url(#appGrad)" strokeWidth={2} name="Applications" />
                <Area type="monotone" dataKey="hires" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="4 4" name="Hires" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hiring Pipeline */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Hiring Pipeline</h2>
            <div className="space-y-3">
              {PIPELINE.map((stage, i) => (
                <div key={stage.stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{stage.stage}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{stage.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className={clsx('h-full rounded-full', stage.color)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500">Overall conversion rate: <span className="font-bold text-emerald-600">3.5%</span></p>
            </div>
          </div>
        </div>

        {/* Active Jobs + Recent Applicants */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Active Jobs */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Active Jobs</h2>
              <Link to="/employer/jobs" className="text-brand-600 text-xs font-semibold hover:text-brand-700 flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {activeJobs.map((job, i) => (
                <div key={job.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-600 transition-colors">{job.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{job.location} · {job.workMode}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{job.applicants}</p>
                    <p className="text-xs text-gray-400">applicants</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/employer/applicants`} className="btn-primary py-1 px-2.5 text-xs rounded-lg">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Recent Applicants</h2>
              <Link to="/employer/applicants" className="text-brand-600 text-xs font-semibold hover:text-brand-700 flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentApps.slice(0, 6).map((app, i) => (
                <div key={app.id} className="flex items-center gap-3">
                  <Avatar src={app.avatar} name={app.studentName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.studentName}</p>
                    <p className="text-xs text-gray-500 truncate">{app.jobTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={app.status} />
                    <div className="flex gap-1">
                      <button onClick={() => toast.success('Shortlisted!')} className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-emerald-500 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => toast.error('Rejected')} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Highlights */}
        <div className="card p-5 bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border-brand-100 dark:border-brand-700/30">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-brand-600" />
            <h2 className="font-display font-bold text-gray-900 dark:text-white">AI Insights</h2>
            <Badge variant="brand">Today</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🎯', title: '8 High-Match Candidates', desc: 'AI identified 8 candidates with 90%+ match for your ML Engineer role.', action: 'Review Now' },
              { icon: '⚡', title: 'Auto-Shortlisted 23', desc: 'AI auto-shortlisted 23 candidates based on your hiring criteria.', action: 'View List' },
              { icon: '📊', title: 'Salary Insights', desc: 'Market rate for Frontend Dev in Bengaluru is ₹25-35 LPA. Your offer is competitive.', action: 'View Report' },
            ].map(insight => (
              <div key={insight.title} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="text-2xl mb-2">{insight.icon}</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</p>
                <p className="text-xs text-gray-500 mb-3">{insight.desc}</p>
                <button className="text-xs text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1">
                  {insight.action} <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployerLayout>
  )
}
