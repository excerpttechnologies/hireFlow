import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Edit2, Eye, Trash2, Copy, ToggleLeft, ToggleRight, MoreVertical, Download } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { JOBS, COMPANIES } from '../../data'
import { Button, Badge, StatusBadge, Tabs, SearchBar, Pagination, ConfirmDialog, PageHeader, CompanyLogo } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const STATUS_TABS = [
  { label: 'All Jobs', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Closed', value: 'closed' },
]

export default function AllJobsPage() {
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState(null)
  const [jobs, setJobs] = useState(JOBS.map((j, i) => ({ ...j, status: i % 5 === 0 ? 'draft' : i % 7 === 0 ? 'closed' : 'active' })))
  const [openMenu, setOpenMenu] = useState(null)

  const filtered = jobs.filter(j => {
    if (tab !== 'all' && j.status !== tab) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const paginated = filtered.slice((page - 1) * 10, page * 10)

  const toggleStatus = (id) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: j.status === 'active' ? 'closed' : 'active' } : j))
    toast.success('Job status updated')
  }

  const duplicateJob = (job) => {
    const dup = { ...job, id: Date.now(), title: job.title + ' (Copy)', status: 'draft', applicants: 0 }
    setJobs(prev => [dup, ...prev])
    toast.success('Job duplicated as draft')
  }

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id))
    toast.success('Job deleted')
  }

  return (
    <EmployerLayout>
      <PageHeader
        title="All Jobs"
        subtitle={`${jobs.length} total jobs across all statuses`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting...')}>Export</Button>
            <Link to="/employer/post-job" className="btn-primary text-sm py-2 px-4 rounded-xl flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Post Job
            </Link>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active', count: jobs.filter(j => j.status === 'active').length, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Draft', count: jobs.filter(j => j.status === 'draft').length, color: 'text-yellow-700 bg-yellow-50' },
          { label: 'Closed', count: jobs.filter(j => j.status === 'closed').length, color: 'text-red-600 bg-red-50' },
          { label: 'Total Apps', count: jobs.reduce((acc, j) => acc + j.applicants, 0), color: 'text-brand-600 bg-brand-50' },
        ].map(stat => (
          <div key={stat.label} className={clsx('rounded-xl px-4 py-3 flex items-center justify-between', stat.color)}>
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-xl font-display font-black">{stat.count.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={STATUS_TABS} active={tab} onChange={v => { setTab(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search job title..." className="w-full sm:w-64" />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Job Title', 'Department', 'Location', 'Applicants', 'Posted', 'Status', 'Actions'].map(col => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((job, i) => (
                <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">{job.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{job.type} · {job.workMode}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{job.department || 'Engineering'}</td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{job.location}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 dark:text-white">{job.applicants}</span>
                      <Link to="/employer/applicants" className="text-xs text-brand-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">view</Link>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap text-xs">{job.postedDays}d ago</td>
                  <td className="py-3.5 px-4"><StatusBadge status={job.status} /></td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <Link to={`/jobs/${job.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => duplicateJob(job)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-600 transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleStatus(job.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-emerald-600 transition-colors" title="Toggle Status">
                        {job.status === 'active' ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setDeleteId(job.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <p className="text-3xl mb-2">📋</p>
            <p className="font-medium">No jobs found</p>
          </div>
        )}
      </div>

      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteJob(deleteId)}
        title="Delete Job" description="Are you sure you want to delete this job? All applications will also be removed. This cannot be undone."
        confirmLabel="Delete Job" variant="danger" />
    </EmployerLayout>
  )
}
