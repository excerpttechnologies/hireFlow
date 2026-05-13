import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Briefcase, Eye, Download, Calendar } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart } from 'recharts'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { ANALYTICS_DATA } from '../../data'
import { StatCard, Badge, Button, PageHeader, Tabs } from '../../components/ui'
import toast from 'react-hot-toast'

const PIE_COLORS = ['#6366f1', '#f97316', '#10b981', '#ef4444', '#8b5cf6']

const sourceData = [
  { name: 'TodayJobs Search', value: 45 },
  { name: 'Job Alerts', value: 28 },
  { name: 'Company Page', value: 15 },
  { name: 'Referral', value: 8 },
  { name: 'Other', value: 4 },
]

const timeToHireData = [
  { stage: 'Apply → Screen', days: 2.1 },
  { stage: 'Screen → Interview', days: 5.4 },
  { stage: 'Interview → Offer', days: 8.2 },
  { stage: 'Offer → Join', days: 28.5 },
]

export default function EmployerAnalyticsPage() {
  const [period, setPeriod] = useState('7m')

  return (
    <EmployerLayout>
      <PageHeader
        title="Analytics"
        subtitle="Deep insights into your hiring performance"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting report...')}>Export PDF</Button>
            <Tabs tabs={[{ label: '7M', value: '7m' }, { label: '3M', value: '3m' }, { label: '1M', value: '1m' }]} active={period} onChange={setPeriod} />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Views', value: '48,230', change: '+22%', icon: Eye, color: 'brand', trend: 'up' },
          { title: 'Applications', value: '1,247', change: '+18%', icon: Users, color: 'blue', trend: 'up' },
          { title: 'Shortlisted', value: '186', change: '+8%', icon: Briefcase, color: 'orange', trend: 'up' },
          { title: 'Hired', value: '12', change: '+5%', icon: TrendingUp, color: 'green', trend: 'up' },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        {/* Application Trend */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_DATA.applicationTrend}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" fill="url(#aGrad)" strokeWidth={2} name="Applications" />
              <Area type="monotone" dataKey="hires" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Hires" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source of Applications */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Application Sources</h2>
          <div className="flex items-center gap-6">
            <PieChart width={160} height={160}>
              <Pie data={sourceData} cx={80} cy={80} innerRadius={50} outerRadius={75} dataKey="value">
                {sourceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-2">
              {sourceData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Time to Hire */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Average Time to Hire</h2>
          <div className="space-y-4">
            {timeToHireData.map((item, i) => (
              <div key={item.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.stage}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{item.days} days</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(item.days / 35) * 100}%` }}
                    transition={{ delay: i * 0.15, duration: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500">Total avg. time to hire: <span className="font-bold text-gray-900 dark:text-white">44.2 days</span></p>
            <p className="text-xs text-emerald-600 mt-1">↓ 6 days faster than industry average</p>
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Top Performing Jobs</h2>
          <div className="space-y-3">
            {[
              { title: 'Senior Frontend Developer', apps: 342, views: 2840, conv: '12%' },
              { title: 'Machine Learning Engineer', apps: 218, views: 1920, conv: '11.3%' },
              { title: 'Product Manager', apps: 456, views: 3200, conv: '14.2%' },
              { title: 'DevOps Engineer', apps: 312, views: 2100, conv: '14.9%' },
              { title: 'UI/UX Designer', apps: 287, views: 1870, conv: '15.3%' },
            ].map((job, i) => (
              <div key={job.title} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-7 h-7 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center text-xs font-bold text-brand-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.views} views · {job.apps} apps</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{job.conv}</p>
                  <p className="text-xs text-gray-400">conv rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployerLayout>
  )
}
