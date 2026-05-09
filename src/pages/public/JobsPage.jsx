import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Filter, SlidersHorizontal, Bookmark, BookmarkCheck, Zap, ChevronDown, X } from 'lucide-react'
import PublicNavbar from '../../components/layout/PublicNavbar'
import Footer from '../../components/layout/Footer'
import { JOBS, COMPANIES, CATEGORIES, SKILLS } from '../../data'
import { Badge, CompanyLogo, MatchMeter, Pagination, SkeletonCard, Button } from '../../components/ui'
import clsx from 'clsx'

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [workMode, setWorkMode] = useState('')
  const [type, setType] = useState('')
  const [salaryMin, setSalaryMin] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [experience, setExperience] = useState('')
  const [savedJobs, setSavedJobs] = useState(new Set([2, 5, 8]))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')

  const filtered = useMemo(() => {
    return JOBS.filter(j => {
      if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false
      if (workMode && j.workMode !== workMode) return false
      if (type && j.type !== type) return false
      if (salaryMin > 0 && j.salaryMin < salaryMin) return false
      if (experience && j.experience !== experience) return false
      return true
    })
  }, [search, location, workMode, type, salaryMin, experience])

  const toggleSave = (id) => {
    setSavedJobs(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const perPage = 9
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PublicNavbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-black text-white mb-2">Find Your Next Job</h1>
          <p className="text-brand-200 mb-6">{JOBS.length.toLocaleString()}+ opportunities waiting for you</p>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Job title, skills..." className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300" />
            </div>
            <div className="hidden sm:block w-px bg-gray-200" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <input value={location} onChange={e => setLocation(e.target.value)}
                placeholder="Location..." className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300" />
            </div>
            <Button variant="primary" className="rounded-xl">Search</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button onClick={() => { setWorkMode(''); setType(''); setSalaryMin(0); setExperience('') }}
                  className="text-xs text-brand-600 hover:text-brand-700">Reset all</button>
              </div>

              {/* Work Mode */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Work Mode</label>
                {['Remote', 'Hybrid', 'Office'].map(m => (
                  <label key={m} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="mode" checked={workMode === m} onChange={() => setWorkMode(workMode === m ? '' : m)} className="accent-brand-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{m}</span>
                  </label>
                ))}
              </div>

              {/* Job Type */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Job Type</label>
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => (
                  <label key={t} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" checked={type === t} onChange={() => setType(type === t ? '' : t)} className="accent-brand-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t}</span>
                  </label>
                ))}
              </div>

              {/* Salary */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  Min Salary: ₹{salaryMin} LPA
                </label>
                <input type="range" min={0} max={50} value={salaryMin} onChange={e => setSalaryMin(+e.target.value)}
                  className="w-full" />
              </div>

              {/* Experience */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Experience</label>
                {['0-1 years', '1-3 years', '3-6 years', '6+ years'].map(e => (
                  <label key={e} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="exp" checked={experience === e} onChange={() => setExperience(experience === e ? '' : e)} className="accent-brand-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{e}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs */}
          <div className="flex-1 min-w-0">
            {/* Sort + Count bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> jobs found
                {search && <span className="text-brand-600"> for "{search}"</span>}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setFilterOpen(true)} className="lg:hidden btn-secondary text-sm py-2 px-3 flex items-center gap-1.5 rounded-xl">
                  <Filter className="w-3.5 h-3.5" /> Filters
                </button>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input text-sm py-2 w-auto">
                  <option value="relevance">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                  <option value="match">Best Match</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.map((job, i) => {
                const company = COMPANIES.find(c => c.id === job.companyId)
                const saved = savedJobs.has(job.id)
                return (
                  <motion.div key={job.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card p-5 hover:shadow-card-hover transition-all duration-200 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CompanyLogo name={company?.name} color={company?.color} size="md" />
                        <div className="min-w-0">
                          <Link to={`/jobs/${job.id}`} className="font-semibold text-gray-900 dark:text-white text-sm hover:text-brand-600 line-clamp-1">
                            {job.title}
                          </Link>
                          <p className="text-xs text-gray-500">{job.company}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleSave(job.id)} className="flex-shrink-0 p-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                        {saved ? <BookmarkCheck className="w-4 h-4 text-brand-600" /> : <Bookmark className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="tag text-xs"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className={clsx('tag text-xs', job.workMode === 'Remote' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400')}>{job.workMode}</span>
                      {job.urgent && <span className="tag text-xs bg-red-100 text-red-600">🔥 Urgent</span>}
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="font-bold text-emerald-600 text-sm">₹{job.salaryMin}–{job.salaryMax} LPA</span>
                      <span>{job.experience}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4 flex-1">
                      {job.skills.slice(0, 3).map(s => <span key={s} className="tag text-xs">{s}</span>)}
                      {job.skills.length > 3 && <span className="tag text-xs">+{job.skills.length - 3}</span>}
                    </div>

                    {/* Match + Apply */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1.5">
                        <MatchMeter value={job.match} />
                        <span className="text-xs text-gray-400">{job.applicants} applicants</span>
                      </div>
                      <Link to={`/jobs/${job.id}`} className="btn-primary text-xs py-1.5 px-3 rounded-lg flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Apply
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <div className="card p-12 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-semibold text-gray-900 dark:text-white mb-2">No jobs found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}

            <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
