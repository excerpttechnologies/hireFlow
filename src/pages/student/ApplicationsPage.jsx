import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, ChevronRight, MessageSquare, Calendar, Eye, Trash2, Star } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { APPLICATIONS, COMPANIES } from '../../data'
import { StatusBadge, Tabs, SearchBar, Button, CompanyLogo, Pagination, EmptyState, PageHeader } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Applied', value: 'applied' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Interview', value: 'interview' },
  { label: 'Offer', value: 'offer' },
  { label: 'Rejected', value: 'rejected' },
]

export default function ApplicationsPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = APPLICATIONS.filter(a => {
    if (tab !== 'all' && a.status !== tab) return false
    if (search && !a.jobTitle.toLowerCase().includes(search.toLowerCase()) && !a.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const STAGES = ['Applied', 'Screening', 'Interview Round 1', 'Interview Round 2', 'Offer']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="My Applications"
          subtitle={`Tracking ${APPLICATIONS.length} applications`}
          actions={
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting applications...')}>
              Export CSV
            </Button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {STATUS_TABS.slice(1).map(s => {
            const count = APPLICATIONS.filter(a => a.status === s.value).length
            const colors = {
              applied: 'bg-blue-50 text-blue-700', shortlisted: 'bg-purple-50 text-purple-700',
              interview: 'bg-yellow-50 text-yellow-800', offer: 'bg-green-50 text-green-700',
              rejected: 'bg-red-50 text-red-700',
            }
            return (
              <div key={s.value} className={clsx('rounded-xl p-3 text-center', colors[s.value])}>
                <p className="text-2xl font-display font-black">{count}</p>
                <p className="text-xs font-medium">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Tabs tabs={STATUS_TABS} active={tab} onChange={v => { setTab(v); setPage(1) }} />
          <div className="flex-1" />
          <SearchBar value={search} onChange={setSearch} placeholder="Search by role or company..." className="w-full sm:w-64" />
        </div>

        {/* List */}
        <div className="space-y-3">
          {paginated.length === 0 ? (
            <EmptyState icon="📋" title="No applications found" description="Your applications will appear here" />
          ) : paginated.map((app, i) => {
            const stageIdx = STAGES.findIndex(s => s === app.stage)
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card p-4 hover:shadow-card-hover transition-all">
                <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                  {/* Company */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <CompanyLogo name={app.company} color={COMPANIES.find(c => c.name === app.company)?.color || '#6366f1'} size="md" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{app.jobTitle}</p>
                      <p className="text-xs text-gray-500">{app.company}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="hidden md:flex items-center gap-1 flex-1">
                    {STAGES.map((stage, si) => (
                      <div key={si} className="flex items-center gap-1 flex-1">
                        <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                          si < stageIdx ? 'bg-emerald-500 text-white' :
                          si === stageIdx ? 'bg-brand-500 text-white ring-4 ring-brand-100' :
                          'bg-gray-200 dark:bg-gray-700 text-gray-400')}>
                          {si < stageIdx ? '✓' : si + 1}
                        </div>
                        {si < STAGES.length - 1 && (
                          <div className={clsx('flex-1 h-0.5', si < stageIdx ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700')} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Status + Date */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={app.status} />
                    <span className="text-xs text-gray-400 hidden sm:block">{app.appliedDate}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-brand-600" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-brand-600" title="Message">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-red-500" title="Withdraw"
                      onClick={() => toast.success('Application withdrawn')}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stage label for mobile */}
                <div className="md:hidden mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Stage:</span>
                  <span className="text-xs font-semibold text-brand-600">{app.stage}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </div>
    </div>
  )
}
