import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Star, CheckCircle, XCircle, Clock, MessageSquare, Calendar, Eye, MoreVertical, Zap, SlidersHorizontal } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { APPLICATIONS, STUDENTS } from '../../data'
import { Button, Badge, StatusBadge, SearchBar, Tabs, Pagination, Avatar, Modal, PageHeader, Select } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const KANBAN_COLUMNS = [
  { id: 'applied', label: 'Applied', color: 'border-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'border-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/10' },
  { id: 'interview', label: 'Interview', color: 'border-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
  { id: 'offer', label: 'Offer', color: 'border-green-400', bg: 'bg-green-50 dark:bg-green-900/10' },
  { id: 'rejected', label: 'Rejected', color: 'border-red-400', bg: 'bg-red-50 dark:bg-red-900/10' },
]

export default function ApplicantsPage() {
  const [viewMode, setViewMode] = useState('table')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedApp, setSelectedApp] = useState(null)
  const [apps, setApps] = useState(APPLICATIONS.slice(0, 50))
  const perPage = 10

  const filtered = apps.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false
    if (search && !a.studentName.toLowerCase().includes(search.toLowerCase()) && !a.jobTitle.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const updateStatus = (id, status) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    toast.success(`Status updated to ${status}`)
  }

  const ActionButtons = ({ app }) => (
    <div className="flex items-center gap-1">
      <button onClick={() => updateStatus(app.id, 'shortlisted')} title="Shortlist"
        className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors">
        <CheckCircle className="w-4 h-4" />
      </button>
      <button onClick={() => updateStatus(app.id, 'rejected')} title="Reject"
        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
        <XCircle className="w-4 h-4" />
      </button>
      <button onClick={() => updateStatus(app.id, 'hold')} title="Hold"
        className="p-1.5 rounded-lg hover:bg-yellow-50 text-gray-400 hover:text-yellow-600 transition-colors">
        <Clock className="w-4 h-4" />
      </button>
      <button title="Schedule Interview"
        className="p-1.5 rounded-lg hover:bg-brand-50 text-gray-400 hover:text-brand-600 transition-colors">
        <Calendar className="w-4 h-4" />
      </button>
      <button onClick={() => setSelectedApp(app)} title="View Profile"
        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 transition-colors">
        <Eye className="w-4 h-4" />
      </button>
      <button title="Message"
        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 transition-colors">
        <MessageSquare className="w-4 h-4" />
      </button>
    </div>
  )

  return (
    <EmployerLayout>
      <PageHeader
        title="Applicants"
        subtitle={`${apps.length} total applications`}
        actions={
          <div className="flex gap-2 items-center">
            <Button variant="outline" icon={Zap} size="sm" onClick={() => toast.success('AI shortlisting in progress...')}>
              AI Shortlist
            </Button>
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting...')}>Export</Button>
          </div>
        }
      />

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or job..." className="w-full sm:w-72" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input py-2 w-auto text-sm">
          <option value="all">All Status</option>
          {KANBAN_COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <div className="flex-1" />
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {['table', 'kanban'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={clsx('px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all',
                viewMode === mode ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm' : 'text-gray-500')}>
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Applied For</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">AI Score</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice((page - 1) * perPage, page * perPage).map((app, i) => (
                    <motion.tr key={app.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={app.avatar} name={app.studentName} size="sm" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{app.studentName}</p>
                            <p className="text-xs text-gray-400">{app.experience} experience</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs max-w-[160px] truncate">{app.jobTitle}</td>
                      <td className="py-3 px-4 text-gray-400 text-xs hidden md:table-cell whitespace-nowrap">{app.appliedDate}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${app.score}%` }} />
                          </div>
                          <span className="text-xs font-bold text-brand-600">{app.score}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4"><StatusBadge status={app.status} /></td>
                      <td className="py-3 px-4"><ActionButtons app={app} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-gray-400">
                <p className="text-4xl mb-2">🔍</p>
                <p className="font-medium">No applicants found</p>
              </div>
            )}
          </div>
          <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
        </>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map(col => {
            const colApps = filtered.filter(a => a.status === col.id)
            return (
              <div key={col.id} className={clsx('flex-shrink-0 w-64 rounded-2xl border-t-4 p-3 space-y-2', col.color, col.bg)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{col.label}</h3>
                  <span className="badge bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">{colApps.length}</span>
                </div>
                {colApps.slice(0, 5).map(app => (
                  <motion.div key={app.id} whileHover={{ scale: 1.01 }}
                    className="card p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedApp(app)}>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar src={app.avatar} name={app.studentName} size="xs" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{app.studentName}</p>
                        <p className="text-xs text-gray-400 truncate">{app.jobTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{app.appliedDate}</span>
                      <span className="text-xs font-bold text-brand-600">{app.score}%</span>
                    </div>
                  </motion.div>
                ))}
                {colApps.length > 5 && <p className="text-xs text-center text-gray-400 py-2">+{colApps.length - 5} more</p>}
              </div>
            )
          })}
        </div>
      )}

      {/* Candidate Detail Modal */}
      <Modal open={!!selectedApp} onClose={() => setSelectedApp(null)} title="Candidate Profile" size="lg">
        {selectedApp && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar src={selectedApp.avatar} name={selectedApp.studentName} size="lg" />
              <div className="flex-1">
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg">{selectedApp.studentName}</h3>
                <p className="text-brand-600 font-medium">{selectedApp.jobTitle}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedApp.experience} experience</p>
                <div className="flex gap-2 mt-2">
                  <StatusBadge status={selectedApp.status} />
                  <span className="badge bg-brand-100 text-brand-700">AI Score: {selectedApp.score}%</span>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400">
                Applied: {selectedApp.appliedDate}
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {(selectedApp.skills || ['React.js', 'JavaScript', 'TypeScript']).map(s => (
                  <span key={s} className="px-2.5 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-lg text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              {[
                { label: 'Shortlist', icon: CheckCircle, color: 'btn-primary', status: 'shortlisted' },
                { label: 'Schedule', icon: Calendar, color: 'btn-secondary', status: null },
                { label: 'Message', icon: MessageSquare, color: 'btn-secondary', status: null },
                { label: 'Reject', icon: XCircle, color: 'bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-red-100 transition-colors', status: 'rejected' },
              ].map(action => (
                <button key={action.label}
                  className={clsx('flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl transition-all', action.color)}
                  onClick={() => { action.status && updateStatus(selectedApp.id, action.status); setSelectedApp(null) }}>
                  <action.icon className="w-4 h-4" /> {action.label}
                </button>
              ))}
            </div>

            {/* Notes */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Internal Notes</p>
              <textarea rows={3} className="input resize-none text-sm" placeholder="Add notes about this candidate..." />
            </div>
          </div>
        )}
      </Modal>
    </EmployerLayout>
  )
}
