import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { AUDIT_LOGS } from '../../data'
import { Button, SearchBar, Pagination, PageHeader, Tabs } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const EXTENDED_LOGS = [
  ...AUDIT_LOGS,
  { id: 6, action: 'Student Suspended', user: 'moderator@hireflow.com', target: 'spam_user@gmail.com', time: '2025-02-01 14:00:00', ip: '192.168.1.2', status: 'success' },
  { id: 7, action: 'Job Removed', user: 'moderator@hireflow.com', target: 'Job #9876 - Fake Posting', time: '2025-02-01 14:30:00', ip: '192.168.1.2', status: 'success' },
  { id: 8, action: 'Password Reset', user: 'system@hireflow.com', target: 'user@email.com', time: '2025-02-01 15:00:00', ip: '103.45.67.89', status: 'success' },
  { id: 9, action: 'SQL Injection Attempt', user: 'unknown', target: 'Login API', time: '2025-02-01 15:30:00', ip: '45.33.32.157', status: 'failed' },
  { id: 10, action: 'Coupon Created', user: 'admin@hireflow.com', target: 'LAUNCH50', time: '2025-02-01 16:00:00', ip: '192.168.1.1', status: 'success' },
  { id: 11, action: 'Email Template Updated', user: 'admin@hireflow.com', target: 'Welcome Email', time: '2025-02-01 16:30:00', ip: '192.168.1.1', status: 'success' },
  { id: 12, action: 'Brute Force Blocked', user: 'unknown', target: 'Admin Panel', time: '2025-02-01 17:00:00', ip: '88.12.34.56', status: 'failed' },
]

const ACTION_ICONS = {
  success: CheckCircle,
  failed: XCircle,
  warning: AlertTriangle,
}

const ACTION_COLORS = {
  success: 'text-emerald-500',
  failed: 'text-red-500',
}

const ACTION_BG = {
  success: 'bg-emerald-50 dark:bg-emerald-900/10',
  failed: 'bg-red-50 dark:bg-red-900/10',
}

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const FILTER_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Success', value: 'success' },
    { label: 'Failed', value: 'failed' },
  ]

  const filtered = EXTENDED_LOGS.filter(log => {
    if (filter !== 'all' && log.status !== filter) return false
    if (search && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.user.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <AdminLayout>
      <PageHeader
        title="Audit Logs"
        subtitle="Complete activity trail for security and compliance"
        actions={
          <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting audit logs...')}>Export CSV</Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Events', value: EXTENDED_LOGS.length, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
          { label: 'Successful', value: EXTENDED_LOGS.filter(l => l.status === 'success').length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Failed', value: EXTENDED_LOGS.filter(l => l.status === 'failed').length, color: 'bg-red-50 text-red-700' },
          { label: 'Unique IPs', value: new Set(EXTENDED_LOGS.map(l => l.ip)).size, color: 'bg-brand-50 text-brand-700' },
        ].map(stat => (
          <div key={stat.label} className={clsx('rounded-xl p-4 flex justify-between items-center', stat.color)}>
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-2xl font-display font-black">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={FILTER_TABS} active={filter} onChange={v => { setFilter(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search logs..." className="w-full sm:w-64" />
      </div>

      <div className="card p-5">
        <div className="space-y-2">
          {filtered.slice((page - 1) * 10, page * 10).map((log, i) => {
            const Icon = ACTION_ICONS[log.status] || Info
            return (
              <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className={clsx('flex items-start gap-3 p-3 rounded-xl transition-colors', ACTION_BG[log.status] || 'bg-gray-50 dark:bg-gray-800/50')}>
                <Icon className={clsx('w-4 h-4 mt-0.5 flex-shrink-0', ACTION_COLORS[log.status] || 'text-gray-400')} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{log.action}</span>
                    <span className={clsx('badge text-xs', log.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600')}>{log.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-0.5 text-xs text-gray-500">
                    <span>By: <span className="font-medium text-gray-700 dark:text-gray-300">{log.user}</span></span>
                    <span>Target: <span className="font-medium text-gray-700 dark:text-gray-300">{log.target}</span></span>
                    <span>IP: <span className="font-mono text-gray-700 dark:text-gray-300">{log.ip}</span></span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{log.time}</span>
              </motion.div>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Shield className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No logs found</p>
          </div>
        )}
      </div>
      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
    </AdminLayout>
  )
}
