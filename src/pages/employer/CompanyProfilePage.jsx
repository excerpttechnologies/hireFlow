import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, MapPin, Globe, Users, Star, Briefcase, Plus, Camera, Check } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { JOBS } from '../../data'
import { Button, Tag, Badge, PageHeader, Modal, Input, Textarea, Select } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const COMPANY = {
  name: 'Infosys Limited',
  tagline: 'Navigate your next',
  industry: 'IT Services & Consulting',
  size: '300,000+ employees',
  founded: 1981,
  location: 'Bengaluru, Karnataka, India',
  website: 'infosys.com',
  linkedin: 'linkedin.com/company/infosys',
  rating: 4.1,
  reviews: 18420,
  description: 'Infosys is a global leader in next-generation digital services and consulting. We enable clients in more than 50 countries to navigate their digital transformation. With over four decades of experience in managing the systems and workings of global enterprises, we expertly steer our clients through their digital journey.',
  culture: ['Work-Life Balance', 'Learning & Development', 'Diversity & Inclusion', 'Innovation Culture', 'Global Exposure'],
  benefits: ['Health Insurance', 'PF & Gratuity', 'Annual Bonus', 'ESOPs', 'Flexible Work Hours', 'Learning Budget', 'International Travel', 'Gym Membership'],
  offices: ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi', 'New York', 'London'],
  coverGradient: 'from-blue-700 via-blue-600 to-cyan-600',
}

export default function CompanyProfilePage() {
  const [editOpen, setEditOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const companyJobs = JOBS.slice(0, 6)

  const TABS = ['overview', 'jobs', 'culture', 'reviews']

  return (
    <EmployerLayout>
      {/* Cover */}
      <div className={clsx('relative h-44 rounded-2xl bg-gradient-to-r mb-0 overflow-hidden', COMPANY.coverGradient)}>
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <button className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-xl backdrop-blur-sm transition-colors">
          <Camera className="w-3.5 h-3.5" /> Change Cover
        </button>
      </div>

      {/* Profile Header */}
      <div className="card p-6 -mt-8 mx-2 relative mb-5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="relative -mt-14">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-3xl font-bold text-blue-600">
              I
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          <div className="flex-1 sm:pb-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-display font-black text-gray-900 dark:text-white">{COMPANY.name}</h1>
                  <Badge variant="blue">Verified ✓</Badge>
                </div>
                <p className="text-gray-500 text-sm italic mt-0.5">"{COMPANY.tagline}"</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{COMPANY.location}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{COMPANY.website}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{COMPANY.size}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{COMPANY.rating} ({COMPANY.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
              <Button variant="secondary" icon={Edit2} size="sm" onClick={() => setEditOpen(true)}>Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-5 w-fit overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={clsx('px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all whitespace-nowrap',
              activeTab === tab ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300')}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-5">
            <div className="card p-5">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-3">About {COMPANY.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{COMPANY.description}</p>
            </div>
            <div className="card p-5">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-3">Benefits & Perks</h2>
              <div className="flex flex-wrap gap-2">
                {COMPANY.benefits.map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-medium">
                    <Check className="w-3 h-3" /> {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-3">Office Locations</h2>
              <div className="flex flex-wrap gap-2">
                {COMPANY.offices.map(o => <Tag key={o}><MapPin className="w-3 h-3" />{o}</Tag>)}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Industry', value: COMPANY.industry },
                  { label: 'Company Size', value: COMPANY.size },
                  { label: 'Founded', value: COMPANY.founded },
                  { label: 'Open Positions', value: `${companyJobs.length} active` },
                  { label: 'Total Applications', value: '1,247' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Company Culture</h3>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY.culture.map(c => <Tag key={c}>{c}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyJobs.map(job => (
            <div key={job.id} className="card p-4 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.location} · {job.workMode} · {job.type}</p>
                </div>
                <Badge variant={job.status === 'active' ? 'green' : 'default'}>{job.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span className="text-emerald-600 font-semibold">₹{job.salaryMin}–{job.salaryMax} LPA</span>
                <span>{job.applicants} applicants</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'culture' && (
        <div className="card p-6">
          <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Life at {COMPANY.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['🏢 Modern Offices', '🌍 Global Team', '📚 Learning Culture', '⚖️ Work-Life Balance', '🎉 Team Events', '💡 Innovation Labs'].map(item => (
              <div key={item} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                <p className="text-2xl mb-2">{item.split(' ')[0]}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.slice(3)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {[
            { rating: 4, title: 'Great learning environment', body: 'Excellent opportunities to learn new technologies. Good work-life balance for a large company.', role: 'Software Engineer', date: 'Jan 2025' },
            { rating: 5, title: 'Best place to start career', body: 'Amazing training programs and mentors. Global exposure from day one.', role: 'Systems Engineer', date: 'Feb 2025' },
            { rating: 3, title: 'Good but can be better', body: 'Nice culture and team. Salary hikes could be more competitive.', role: 'Senior Developer', date: 'Dec 2024' },
          ].map((review, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.title}</p>
                  <p className="text-xs text-gray-400">{review.role} · {review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={clsx('w-3.5 h-3.5', j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300')} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{review.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Company Profile" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Company Name" defaultValue={COMPANY.name} />
            <Input label="Tagline" defaultValue={COMPANY.tagline} />
            <Input label="Website" defaultValue={COMPANY.website} />
            <Input label="LinkedIn" defaultValue={COMPANY.linkedin} />
            <Select label="Industry" defaultValue={COMPANY.industry}
              options={['IT Services', 'E-Commerce', 'Fintech', 'EdTech', 'Healthtech', 'SaaS', 'Manufacturing']} />
            <Select label="Company Size"
              options={['1-50', '51-200', '201-500', '500-1000', '1000-5000', '5000-10000', '10000+']} />
          </div>
          <Textarea label="About Company" defaultValue={COMPANY.description} className="h-24" />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { toast.success('Profile updated!'); setEditOpen(false) }}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </EmployerLayout>
  )
}
