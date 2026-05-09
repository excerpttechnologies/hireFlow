import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, CheckCircle, XCircle, Eye, Shield, Building2, Star, AlertTriangle, Download, Plus } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { COMPANIES, STUDENTS, JOBS } from '../../data'
import { Button, Badge, StatusBadge, SearchBar, Tabs, Pagination, Avatar, CompanyLogo, ConfirmDialog, PageHeader, Modal } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

// ============ COMPANIES PAGE ============
export function AdminCompaniesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [companies, setCompanies] = useState(COMPANIES.map((c, i) => ({
    ...c,
    status: i % 6 === 0 ? 'pending' : i % 9 === 0 ? 'blocked' : 'approved',
    jobs: c.jobs, totalApps: Math.floor(Math.random() * 500 + 50)
  })))
  const [selectedCompany, setSelectedCompany] = useState(null)

  const STATUS_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Approved', value: 'approved' },
    { label: 'Pending', value: 'pending' },
    { label: 'Blocked', value: 'blocked' },
  ]

  const filtered = companies.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const updateCompanyStatus = (id, status) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    toast.success(`Company ${status}!`)
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Companies"
        subtitle={`${companies.length} total companies on platform`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Exporting...')}>Export</Button>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Approved', count: companies.filter(c => c.status === 'approved').length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Pending', count: companies.filter(c => c.status === 'pending').length, color: 'bg-amber-50 text-amber-700' },
          { label: 'Blocked', count: companies.filter(c => c.status === 'blocked').length, color: 'bg-red-50 text-red-700' },
        ].map(s => (
          <div key={s.label} className={clsx('rounded-xl p-4 flex justify-between items-center', s.color)}>
            <span className="text-sm font-medium">{s.label}</span>
            <span className="text-2xl font-display font-black">{s.count}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={STATUS_TABS} active={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search company..." className="w-full sm:w-64" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Company', 'Industry', 'Location', 'Jobs', 'Rating', 'Status', 'Actions'].map(col => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((company, i) => (
                <motion.tr key={company.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo name={company.name} color={company.color} size="sm" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{company.name}</p>
                        <p className="text-xs text-gray-400">{company.size} employees</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{company.industry}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{company.location}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{company.jobs}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{company.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={company.status} /></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedCompany(company)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {company.status !== 'approved' && (
                        <button onClick={() => updateCompanyStatus(company.id, 'approved')} className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {company.status !== 'blocked' && (
                        <button onClick={() => updateCompanyStatus(company.id, 'blocked')} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <Shield className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />

      <Modal open={!!selectedCompany} onClose={() => setSelectedCompany(null)} title="Company Details" size="md">
        {selectedCompany && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <CompanyLogo name={selectedCompany.name} color={selectedCompany.color} size="xl" />
              <div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">{selectedCompany.name}</h3>
                <p className="text-gray-500 text-sm">{selectedCompany.industry}</p>
                <StatusBadge status={selectedCompany.status} />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCompany.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Location', value: selectedCompany.location },
                { label: 'Founded', value: selectedCompany.founded },
                { label: 'Size', value: selectedCompany.size },
                { label: 'Active Jobs', value: selectedCompany.jobs },
                { label: 'Total Applications', value: selectedCompany.totalApps },
                { label: 'Rating', value: `⭐ ${selectedCompany.rating}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="success" icon={CheckCircle} className="flex-1 justify-center" onClick={() => { updateCompanyStatus(selectedCompany.id, 'approved'); setSelectedCompany(null) }}>Approve</Button>
              <Button variant="danger" icon={Shield} className="flex-1 justify-center" onClick={() => { updateCompanyStatus(selectedCompany.id, 'blocked'); setSelectedCompany(null) }}>Block</Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

// ============ STUDENTS PAGE ============
export function AdminStudentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState(STUDENTS)

  const STATUS_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
  ]

  const filtered = students.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const toggleStatus = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s))
    toast.success('Student status updated')
  }

  return (
    <AdminLayout>
      <PageHeader title="Students" subtitle={`${students.length} registered students`}
        actions={<Button variant="outline" icon={Download} size="sm">Export</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={STATUS_TABS} active={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search student..." className="w-full sm:w-64" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Student', 'College', 'Skills', 'Location', 'Applications', 'Status', 'Actions'].map(col => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((student, i) => (
                <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={student.avatar} name={student.name} size="sm" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 dark:text-gray-400 max-w-[120px] truncate">{student.college}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {student.skills.slice(0, 2).map(s => <span key={s} className="tag text-xs">{s}</span>)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">{student.location}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{student.applications}</td>
                  <td className="py-3 px-4"><StatusBadge status={student.status} /></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleStatus(student.id)}
                        className={clsx('p-1.5 rounded-lg transition-colors', student.status === 'active'
                          ? 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                          : 'hover:bg-emerald-50 text-gray-400 hover:text-emerald-600')}>
                        {student.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
    </AdminLayout>
  )
}

// ============ JOBS MODERATION PAGE ============
export function AdminJobsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [jobs, setJobs] = useState(JOBS.map((j, i) => ({ ...j, adminStatus: i % 4 === 0 ? 'pending' : i % 8 === 0 ? 'reported' : 'approved' })))

  const STATUS_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Approved', value: 'approved' },
    { label: 'Pending', value: 'pending' },
    { label: 'Reported', value: 'reported' },
  ]

  const filtered = jobs.filter(j => {
    if (statusFilter !== 'all' && j.adminStatus !== statusFilter) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const updateJobStatus = (id, status) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, adminStatus: status } : j))
    toast.success(`Job ${status}!`)
  }

  return (
    <AdminLayout>
      <PageHeader title="Job Moderation" subtitle={`${jobs.length} total jobs · ${jobs.filter(j => j.adminStatus === 'pending').length} pending review`}
        actions={<Button variant="outline" icon={Download} size="sm">Export</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={STATUS_TABS} active={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search job..." className="w-full sm:w-64" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Job', 'Company', 'Location', 'Salary', 'Applicants', 'Status', 'Actions'].map(col => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((job, i) => (
                <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className={clsx('border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 transition-colors', job.adminStatus === 'reported' && 'bg-red-50/30 dark:bg-red-900/5')}>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{job.title}</p>
                    <p className="text-xs text-gray-400">{job.type} · {job.workMode}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">{job.company}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{job.location}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold text-sm">₹{job.salaryMin}–{job.salaryMax}L</td>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{job.applicants}</td>
                  <td className="py-3 px-4">
                    <span className={clsx('badge', job.adminStatus === 'approved' ? 'bg-emerald-100 text-emerald-700' : job.adminStatus === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600')}>
                      {job.adminStatus.charAt(0).toUpperCase() + job.adminStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {job.adminStatus !== 'approved' && (
                        <button onClick={() => updateJobStatus(job.id, 'approved')} className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => updateJobStatus(job.id, 'removed')} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />
    </AdminLayout>
  )
}
