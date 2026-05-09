import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Building2, Briefcase, DollarSign, TrendingUp, AlertTriangle, ChevronRight, CheckCircle, XCircle, Eye, Shield } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import AdminLayout from '../../components/layout/AdminLayout'
import { ANALYTICS_DATA, COMPANIES, STUDENTS, SUPPORT_TICKETS } from '../../data'
import { StatCard, Badge, StatusBadge, Button, Avatar, CompanyLogo } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const PIE_COLORS = ['#6366f1', '#f97316', '#10b981', '#ef4444', '#8b5cf6']

const PENDING_COMPANIES = COMPANIES.slice(0, 4).map(c => ({ ...c, status: 'pending', submittedDate: '2025-02-01' }))

export default function AdminDashboard() {
  const [companies, setCompanies] = useState(PENDING_COMPANIES)

  const approveCompany = (id) => {
    setCompanies(prev => prev.filter(c => c.id !== id))
    toast.success('Company approved!')
  }
  const rejectCompany = (id) => {
    setCompanies(prev => prev.filter(c => c.id !== id))
    toast.error('Company rejected')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview — Thursday, Feb 01, 2025</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-400">
            <strong>8 companies</strong> pending approval · <strong>12 jobs</strong> awaiting moderation · <strong>3 fraud alerts</strong> detected
          </p>
          <Link to="/admin/companies" className="ml-auto text-xs font-semibold text-amber-700 hover:text-amber-800 whitespace-nowrap">Review Now →</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Students', value: '22,847', change: '+18% this month', icon: Users, color: 'brand', trend: 'up' },
            { title: 'Total Companies', value: '1,523', change: '+42 this month', icon: Building2, color: 'blue', trend: 'up' },
            { title: 'Active Jobs', value: '8,432', change: '+234 this week', icon: Briefcase, color: 'orange', trend: 'up' },
            { title: 'MRR', value: '₹21.5L', change: '+12.4% vs last month', icon: DollarSign, color: 'green', trend: 'up' },
          ].map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* User Growth */}
          <div className="xl:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">User Growth</h2>
              <Badge variant="brand">Last 7 months</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ANALYTICS_DATA.userGrowth}>
                <defs>
                  <linearGradient id="studentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="students" stroke="#6366f1" fill="url(#studentGrad)" strokeWidth={2} name="Students" />
                <Area type="monotone" dataKey="employers" stroke="#f97316" fill="url(#empGrad)" strokeWidth={2} name="Employers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Breakdown */}
          <div className="card p-5">
            <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Revenue by Plan</h2>
            <div className="flex justify-center mb-3">
              <PieChart width={180} height={180}>
                <Pie data={[
                  { name: 'Employer Plans', value: 68 },
                  { name: 'Pro Students', value: 18 },
                  { name: 'Premium Students', value: 9 },
                  { name: 'Featured Ads', value: 5 },
                ]} cx={90} cy={90} innerRadius={55} outerRadius={80} dataKey="value">
                  {[...Array(4)].map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Employer Plans', pct: 68, color: PIE_COLORS[0] },
                { name: 'Pro Students', pct: 18, color: PIE_COLORS[1] },
                { name: 'Premium Students', pct: 9, color: PIE_COLORS[2] },
                { name: 'Featured Ads', pct: 5, color: PIE_COLORS[3] },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900 dark:text-white">Monthly Revenue</h2>
            <div className="text-right">
              <p className="text-2xl font-display font-black text-gray-900 dark:text-white">₹21,50,000</p>
              <p className="text-xs text-emerald-600 font-medium">↑ +12.4% vs last month</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ANALYTICS_DATA.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Pending Approvals */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Pending Company Approvals</h2>
              <Link to="/admin/companies" className="text-brand-600 text-xs font-semibold">View all →</Link>
            </div>
            <div className="space-y-3">
              {companies.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">All caught up! No pending approvals.</p>
                </div>
              ) : companies.map(company => (
                <div key={company.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-700/20">
                  <CompanyLogo name={company.name} color={company.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{company.name}</p>
                    <p className="text-xs text-gray-500">{company.industry} · {company.location}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => approveCompany(company.id)}
                      className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => rejectCompany(company.id)}
                      className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Tickets */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900 dark:text-white">Support Tickets</h2>
              <Link to="/admin/tickets" className="text-brand-600 text-xs font-semibold">View all →</Link>
            </div>
            <div className="space-y-3">
              {SUPPORT_TICKETS.map(ticket => (
                <div key={ticket.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className={clsx('w-2 h-2 rounded-full flex-shrink-0',
                    ticket.priority === 'urgent' ? 'bg-red-500' : ticket.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-400')}>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ticket.subject}</p>
                    <p className="text-xs text-gray-400">{ticket.id} · {ticket.user}</p>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Platform Activity Feed</h2>
          <div className="space-y-3">
            {[
              { icon: '🏢', msg: 'Freshworks registered as a new employer', time: '2 min ago', type: 'company' },
              { icon: '💼', msg: '23 new job postings added by TCS', time: '15 min ago', type: 'job' },
              { icon: '👤', msg: '142 new student registrations today', time: '1 hour ago', type: 'user' },
              { icon: '⚠️', msg: 'Fraud detection flagged 2 suspicious job postings', time: '2 hours ago', type: 'alert' },
              { icon: '💰', msg: 'Infosys upgraded to Enterprise plan — ₹19,999/month', time: '3 hours ago', type: 'revenue' },
              { icon: '✅', msg: '8 companies approved by moderators', time: '5 hours ago', type: 'approval' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{item.msg}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
