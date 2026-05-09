import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight, ChevronLeft, Plus, X, MapPin, Briefcase, DollarSign, Users, FileText, Zap } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { Button, Input, Select, Textarea, Tag, PageHeader } from '../../components/ui'
import { SKILLS, CATEGORIES } from '../../data'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 1, title: 'Basic Info', icon: Briefcase },
  { id: 2, title: 'Job Details', icon: FileText },
  { id: 3, title: 'Location', icon: MapPin },
  { id: 4, title: 'Description', icon: FileText },
]

const SCREENING_QUESTIONS = [
  'Do you have experience with React.js?',
  'Are you comfortable working in a hybrid setup?',
  'What is your current CTC?',
  'What is your expected CTC?',
  'Are you open to relocating?',
]

export default function PostJobPage() {
  const [step, setStep] = useState(1)
  const [skillInput, setSkillInput] = useState('')
  const [selectedSkills, setSelectedSkills] = useState(['React.js', 'TypeScript', 'Node.js'])
  const [questions, setQuestions] = useState([SCREENING_QUESTIONS[0]])
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  const [form, setForm] = useState({
    title: '', role: '', department: 'Engineering', category: 'Software Development',
    vacancies: '3', urgency: 'medium', code: 'JOB-2025-001',
    expMin: '3', expMax: '6', salMin: '20', salMax: '35',
    education: "Bachelor's", gender: 'Any', shift: 'Day', notice: '30 days',
    empType: 'Full-time', workMode: 'Hybrid', travel: 'No',
    country: 'India', state: 'Karnataka', city: 'Bengaluru', area: 'Koramangala',
    pincode: '560034', address: '',
    summary: '', responsibilities: '', benefits: '', deadline: '',
  })

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) setSelectedSkills(s => [...s, skill])
    setSkillInput('')
  }

  const handlePublish = async () => {
    setPublishing(true)
    await new Promise(r => setTimeout(r, 2000))
    setPublishing(false)
    setPublished(true)
    toast.success('Job published successfully! 🎉')
  }

  if (published) {
    return (
      <EmployerLayout>
        <div className="max-w-xl mx-auto py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
          </motion.div>
          <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-3">Job Published!</h2>
          <p className="text-gray-500 mb-8">Your job is now live and visible to thousands of candidates. You'll start receiving applications soon.</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 text-left mb-6 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Job Code</span><span className="font-semibold">JOB-2025-001</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Status</span><span className="text-emerald-600 font-semibold">Active</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Visibility</span><span className="font-semibold">Public</span></div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => setPublished(false)}>Post Another Job</Button>
            <Button variant="secondary" onClick={() => window.location.href = '/employer/jobs'}>View All Jobs</Button>
          </div>
        </div>
      </EmployerLayout>
    )
  }

  return (
    <EmployerLayout>
      <PageHeader title="Post New Job" subtitle="Create a compelling job listing to attract top talent" breadcrumb="Employer → Post Job" />

      {/* Step Indicators */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => s.id < step && setStep(s.id)}
              className={clsx('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                step === s.id ? 'bg-brand-600 text-white shadow-md' :
                s.id < step ? 'bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200' :
                'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed')}>
              {s.id < step ? <CheckCircle className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              {s.title}
            </button>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <div className="max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="card p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Basic Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Job Title *" value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Senior Frontend Developer" />
                  <Input label="Role / Designation" value={form.role} onChange={e => update('role', e.target.value)} placeholder="e.g. SDE-2" />
                  <Select label="Department" value={form.department} onChange={e => update('department', e.target.value)}
                    options={['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']} />
                  <Select label="Category" value={form.category} onChange={e => update('category', e.target.value)}
                    options={['Software Development', 'Data Science & ML', 'Design & Creative', 'Product Management', 'Sales & Marketing', 'DevOps & Cloud', 'Mobile Development']} />
                  <Input label="Number of Vacancies" type="number" value={form.vacancies} onChange={e => update('vacancies', e.target.value)} />
                  <Select label="Hiring Urgency" value={form.urgency} onChange={e => update('urgency', e.target.value)}
                    options={[{ value: 'low', label: 'Low — Within 60 days' }, { value: 'medium', label: 'Medium — Within 30 days' }, { value: 'high', label: 'High — Within 2 weeks' }, { value: 'urgent', label: '🔥 Urgent — Immediate' }]} />
                  <Input label="Job Code" value={form.code} onChange={e => update('code', e.target.value)} />
                </div>
              </div>
            )}

            {/* Step 2: Job Details */}
            {step === 2 && (
              <div className="card p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Job Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Min Experience (years)" type="number" value={form.expMin} onChange={e => update('expMin', e.target.value)} />
                  <Input label="Max Experience (years)" type="number" value={form.expMax} onChange={e => update('expMax', e.target.value)} />
                  <Input label="Min Salary (LPA)" type="number" value={form.salMin} onChange={e => update('salMin', e.target.value)} />
                  <Input label="Max Salary (LPA)" type="number" value={form.salMax} onChange={e => update('salMax', e.target.value)} />
                  <Select label="Education" value={form.education} onChange={e => update('education', e.target.value)}
                    options={["Any", "12th Pass", "Diploma", "Bachelor's", "Master's", "PhD"]} />
                  <Select label="Employment Type" value={form.empType} onChange={e => update('empType', e.target.value)}
                    options={['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']} />
                  <Select label="Work Mode" value={form.workMode} onChange={e => update('workMode', e.target.value)}
                    options={['Office', 'Remote', 'Hybrid']} />
                  <Select label="Gender Preference" value={form.gender} onChange={e => update('gender', e.target.value)}
                    options={['Any', 'Male', 'Female', 'Other']} />
                  <Select label="Shift Timing" value={form.shift} onChange={e => update('shift', e.target.value)}
                    options={['Day', 'Night', 'Rotational', 'Flexible']} />
                  <Select label="Notice Period" value={form.notice} onChange={e => update('notice', e.target.value)}
                    options={['Immediate', '15 days', '30 days', '45 days', '60 days', '90 days']} />
                </div>

                {/* Skills */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Required Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSkills.map(s => (
                      <span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-lg text-xs font-medium border border-brand-100 dark:border-brand-700/30">
                        {s}
                        <button onClick={() => setSelectedSkills(prev => prev.filter(sk => sk !== s))} className="text-brand-400 hover:text-red-500 ml-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
                      placeholder="Type a skill and press Enter..." className="input flex-1 text-sm" />
                    <Button variant="secondary" size="sm" onClick={() => addSkill(skillInput)}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {SKILLS.slice(0, 10).filter(s => !selectedSkills.includes(s)).map(s => (
                      <button key={s} onClick={() => addSkill(s)}
                        className="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="card p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Job Location</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Country" value={form.country} onChange={e => update('country', e.target.value)}
                    options={['India', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'UAE']} />
                  <Select label="State" value={form.state} onChange={e => update('state', e.target.value)}
                    options={['Karnataka', 'Maharashtra', 'Delhi', 'Telangana', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'UP']} />
                  <Select label="City" value={form.city} onChange={e => update('city', e.target.value)}
                    options={['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Noida', 'Gurugram']} />
                  <Input label="Area / Locality" value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. Koramangala" />
                  <Input label="Pincode" value={form.pincode} onChange={e => update('pincode', e.target.value)} />
                </div>
                <Textarea label="Office Address" value={form.address} onChange={e => update('address', e.target.value)}
                  placeholder="Full office address..." className="h-20" />
                {/* Map Placeholder */}
                <div className="h-48 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center border-2 border-dashed border-brand-200 dark:border-gray-600">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Google Maps integration</p>
                    <p className="text-xs text-gray-400">Koramangala, Bengaluru 560034</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Description */}
            {step === 4 && (
              <div className="card p-6 space-y-5">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Job Description</h2>

                <Textarea label="Job Summary *" value={form.summary} onChange={e => update('summary', e.target.value)}
                  placeholder="Brief overview of the role and company..." className="h-24" />

                <Textarea label="Responsibilities *" value={form.responsibilities} onChange={e => update('responsibilities', e.target.value)}
                  placeholder="• Lead development of...&#10;• Collaborate with...&#10;• Mentor junior..." className="h-32" />

                <Textarea label="Benefits & Perks" value={form.benefits} onChange={e => update('benefits', e.target.value)}
                  placeholder="• Health Insurance&#10;• ESOPs&#10;• Flexible hours..." className="h-24" />

                {/* Screening Questions */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Screening Questions</label>
                  <div className="space-y-2 mb-3">
                    {questions.map((q, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={q} onChange={e => {
                          const next = [...questions]; next[i] = e.target.value; setQuestions(next)
                        }} className="input flex-1 text-sm" placeholder="Screening question..." />
                        <button onClick={() => setQuestions(qs => qs.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setQuestions(qs => [...qs, ''])}
                    className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
                    <Plus className="w-4 h-4" /> Add Question
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Application Deadline" type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} />
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Attach JD (PDF)</label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3 text-center cursor-pointer hover:border-brand-400 transition-colors">
                      <p className="text-xs text-gray-400">Drop PDF or <span className="text-brand-600 font-medium">browse</span></p>
                    </div>
                  </div>
                </div>

                {/* Preview Summary */}
                <div className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-brand-600" />
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-400">AI Optimization</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Job title is SEO-optimized</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {selectedSkills.length} skills added for better matching</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Salary range is competitive for this market</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} icon={ChevronLeft}>
            Back
          </Button>
          <div className="flex gap-2">
            {step === STEPS.length ? (
              <>
                <Button variant="outline" onClick={() => toast.success('Saved as draft!')}>Save Draft</Button>
                <Button variant="primary" onClick={handlePublish} loading={publishing} icon={Zap}>
                  Publish Job
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}>
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </EmployerLayout>
  )
}
