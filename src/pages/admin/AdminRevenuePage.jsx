import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, CreditCard, ArrowUpRight, Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import AdminLayout from '../../components/layout/AdminLayout'
import { ANALYTICS_DATA } from '../../data'
import { StatCard, Badge, Button, PageHeader, Tabs } from '../../components/ui'
import toast from 'react-hot-toast'

const PIE_COLORS = ['#6366f1', '#f97316', '#10b981', '#8b5cf6']

const TOP_CUSTOMERS = [
  { name: 'Infosys', plan: 'Enterprise', mrr: 19999, jobs: 45, status: 'active' },
  { name: 'TCS', plan: 'Enterprise', mrr: 19999, jobs: 60, status: 'active' },
  { name: 'Google India', plan: 'Enterprise', mrr: 19999, jobs: 24, status: 'active' },
  { name: 'Amazon', plan: 'Growth', mrr: 7999, jobs: 32, status: 'active' },
  { name: 'Flipkart', plan: 'Growth', mrr: 7999, jobs: 15, status: 'active' },
  { name: 'Swiggy', plan: 'Growth', mrr: 7999, jobs: 12, status: 'active' },
  { name: 'CRED', plan: 'Starter', mrr: 2999, jobs: 6, status: 'active' },
  { name: 'Meesho', plan: 'Growth', mrr: 7999, jobs: 11, status: 'active' },
]

const planRevenue = [
  { name: 'Enterprise', value: 45, revenue: 959952 },
  { name: 'Growth', value: 35, revenue: 359955 },
  { name: 'Starter', value: 15, revenue: 89970 },
  { name: 'Student Pro', value: 5, revenue: 44975 },
]

export default function AdminRevenuePage() {
  const [period, setPeriod] = useState('7m')

  const totalMRR = 215000
  const totalARR = totalMRR * 12

  return (
    <AdminLayout>
      <PageHeader
        title="Revenue Dashboard"
        subtitle="Financial metrics and subscription analytics"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting financial report...')}>Export</Button>
            <Tabs tabs={[{ label: '7M', value: '7m' }, { label: '3M', value: '3m' }, { label: '1M', value: '1m' }]} active={period} onChange={setPeriod} />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'MRR', value: '₹21.5L', change: '+12.4%', icon: DollarSign, color: 'green', trend: 'up' },
          { title: 'ARR', value: '₹2.58Cr', change: '+18%', icon: TrendingUp, color: 'brand', trend: 'up' },
          { title: 'Paying Customers', value: '387', change: '+42 MoM', icon: Users, color: 'blue', trend: 'up' },
          { title: 'ARPU', value: '₹5,556', change: '+8%', icon: CreditCard, color: 'orange', trend: 'up' },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart + Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-gray-900 dark:text-white">Monthly Revenue</h2>
            <div className="text-right">
              <p className="text-xl font-display font-black text-gray-900 dark:text-white">₹21,50,000</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end">
                <ArrowUpRight className="w-3 h-3" /> +12.4% vs Feb 2024
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ANALYTICS_DATA.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Revenue by Plan</h2>
          <div className="flex justify-center mb-4">
            <PieChart width={160} height={160}>
              <Pie data={planRevenue} cx={80} cy={80} innerRadius={50} outerRadius={75} dataKey="value">
                {planRevenue.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2">
            {planRevenue.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 dark:text-white">₹{(item.revenue / 1000).toFixed(0)}K</span>
                  <span className="text-gray-400 ml-1">({item.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Churn Rate', value: '2.1%', sub: '-0.3% MoM', good: true },
          { label: 'LTV', value: '₹1.8L', sub: '+15% MoM', good: true },
          { label: 'CAC', value: '₹4,200', sub: '-8% MoM', good: true },
          { label: 'LTV/CAC', value: '42.8x', sub: '+3.2x MoM', good: true },
        ].map(metric => (
          <div key={metric.label} className="card p-4 text-center">
            <p className="text-2xl font-display font-black text-gray-900 dark:text-white">{metric.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{metric.label}</p>
            <p className={`text-xs font-semibold mt-1 ${metric.good ? 'text-emerald-600' : 'text-red-500'}`}>{metric.sub}</p>
          </div>
        ))}
      </div>

      {/* Top Customers */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-gray-900 dark:text-white">Top Customers by MRR</h2>
          <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting customer list...')}>Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {['Company', 'Plan', 'MRR', 'Active Jobs', 'Status'].map(col => (
                  <th key={col} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_CUSTOMERS.map((customer, i) => (
                <motion.tr key={customer.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{customer.name}</td>
                  <td className="py-3 px-3">
                    <span className={`badge ${customer.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' : customer.plan === 'Growth' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-700'}`}>
                      {customer.plan}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-600">₹{customer.mrr.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{customer.jobs}</td>
                  <td className="py-3 px-3"><span className="badge bg-emerald-100 text-emerald-700">Active</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
