import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Clock, DollarSign, Users, Star, Bookmark, BookmarkCheck, Share2, CheckCircle, ChevronRight, Building2, Zap, ArrowLeft, ExternalLink } from 'lucide-react'
import PublicNavbar from '../../components/layout/PublicNavbar'
import Footer from '../../components/layout/Footer'
import { JOBS, COMPANIES } from '../../data'
import { Badge, CompanyLogo, Button, Modal, MatchMeter, Tag } from '../../components/ui'
import clsx from 'clsx'

export default function JobDetailsPage() {
  const { id } = useParams()
  const job = JOBS.find(j => j.id === +id) || JOBS[0]
  const company = COMPANIES.find(c => c.id === job.companyId)
  const [saved, setSaved] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)
  const [applied, setApplied] = useState(false)
  const related = JOBS.filter(j => j.category === job.category && j.id !== job.id).slice(0, 3)

  const handleApply = () => {
    setApplied(true)
    setApplyOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/jobs" className="hover:text-brand-600 flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" />Jobs</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 dark:text-gray-300">{job.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header Card */}
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <CompanyLogo name={company?.name} color={company?.color} size="xl" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">{job.title}</h1>
                      {job.featured && <Badge variant="yellow">⭐ Featured</Badge>}
                      {job.urgent && <Badge variant="red">🔥 Urgent</Badge>}
                    </div>
                    <Link to={`/companies/${job.companyId}`} className="text-brand-600 font-semibold hover:underline">{job.company}</Link>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={clsx('w-3.5 h-3.5', i < Math.floor(company?.rating || 4) ? 'fill-amber-400 text-amber-400' : 'text-gray-300')} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{company?.rating} ({Math.floor(Math.random()*500+200)} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSaved(!saved)} className={clsx('p-2.5 rounded-xl border transition-colors', saved ? 'bg-brand-50 border-brand-200 text-brand-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50')}>
                    {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                  <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                {[
                  { icon: MapPin, label: 'Location', value: `${job.location} (${job.workMode})` },
                  { icon: DollarSign, label: 'Salary', value: `₹${job.salaryMin}–${job.salaryMax} LPA` },
                  { icon: Briefcase, label: 'Experience', value: job.experience },
                  { icon: Users, label: 'Applicants', value: `${job.applicants}+ applied` },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Match */}
              <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-600" />
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-400">Your profile matches this job</span>
                </div>
                <MatchMeter value={job.match} />
              </div>

              <div className="flex gap-3 mt-5">
                {applied ? (
                  <div className="flex-1 py-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-700 font-semibold text-sm">
                    <CheckCircle className="w-5 h-5" /> Application Submitted!
                  </div>
                ) : (
                  <Button variant="primary" onClick={() => setApplyOpen(true)} className="flex-1 justify-center py-3 text-sm" icon={Zap}>
                    Easy Apply
                  </Button>
                )}
                <Button variant="secondary" className="py-3 text-sm">Save Job</Button>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">Job Description</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                We are looking for a highly skilled {job.title} to join our growing team at {job.company}. You will be responsible for building and maintaining high-quality applications that serve millions of users. This is a great opportunity to work with cutting-edge technology and a world-class team.
              </p>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Responsibilities</h3>
              <ul className="space-y-2 mb-5">
                {['Design and develop scalable software solutions', 'Collaborate with cross-functional teams', 'Write clean, maintainable, and well-tested code', 'Participate in code reviews and technical discussions', 'Mentor junior team members', 'Contribute to technical roadmap and architecture decisions'].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
              <ul className="space-y-2 mb-5">
                {[
                  `${job.experience} of relevant experience`,
                  'Strong problem-solving skills',
                  'Experience with ' + job.skills.join(', '),
                  'Excellent communication skills',
                  'Bachelor\'s degree in CS or related field',
                ].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map(b => <Tag key={b}>{b}</Tag>)}
              </div>
            </div>

            {/* Skills */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-lg text-sm font-medium border border-brand-100 dark:border-brand-700/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Company Card */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About {company?.name}</h3>
              <div className="flex items-center gap-3 mb-4">
                <CompanyLogo name={company?.name} color={company?.color} size="lg" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{company?.name}</p>
                  <p className="text-xs text-gray-500">{company?.industry}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{company?.description}</p>
              <div className="space-y-2">
                {[
                  { label: 'Company Size', value: company?.size },
                  { label: 'Founded', value: company?.founded },
                  { label: 'Open Positions', value: `${company?.jobs} jobs` },
                  { label: 'Rating', value: `⭐ ${company?.rating}/5` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
              <Link to={`/companies/${job.companyId}`} className="block mt-4 text-center btn-secondary text-xs py-2 rounded-xl">
                View Company <ExternalLink className="w-3 h-3 inline ml-1" />
              </Link>
            </div>

            {/* Job Summary */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Job Overview</h3>
              <div className="space-y-3">
                {[
                  { label: 'Posted', value: `${job.postedDays} day${job.postedDays > 1 ? 's' : ''} ago` },
                  { label: 'Deadline', value: job.deadline },
                  { label: 'Employment', value: job.type },
                  { label: 'Department', value: job.department },
                  { label: 'Vacancies', value: `${job.vacancies} openings` },
                  { label: 'Interview Rounds', value: `${job.interviewRounds} rounds` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400 text-xs">{label}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {related.map(j => {
                  const c = COMPANIES.find(co => co.id === j.companyId)
                  return (
                    <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <CompanyLogo name={c?.name} color={c?.color} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{j.title}</p>
                        <p className="text-xs text-gray-500">{j.company} · ₹{j.salaryMin}–{j.salaryMax}L</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title={`Apply — ${job.title}`} size="md">
        <div className="space-y-5">
          <div className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center gap-3">
            <CompanyLogo name={company?.name} color={company?.color} size="md" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{job.title}</p>
              <p className="text-xs text-gray-500">{job.company} · {job.location}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Resume</label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">Arjun_Sharma_Resume.pdf <span className="text-brand-600 font-medium ml-2">Change</span></p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Cover Letter (optional)</label>
              <textarea rows={4} placeholder="Tell the employer why you're a great fit..." className="input resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Years of Experience</label>
              <input className="input" placeholder="e.g. 3" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setApplyOpen(false)} className="flex-1 justify-center">Cancel</Button>
            <Button variant="primary" onClick={handleApply} className="flex-1 justify-center" icon={Zap}>Submit Application</Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}
