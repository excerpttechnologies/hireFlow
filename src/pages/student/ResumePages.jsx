import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle, AlertCircle, TrendingUp, Download, RefreshCw, Sparkles, FileText, Target, Award, Eye } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Button, Card, Progress, Badge, PageHeader, Modal } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const SCORE_BREAKDOWN = [
  { label: 'Keywords & ATS Compatibility', score: 82, max: 100, tip: 'Add more job-specific keywords like "CI/CD", "microservices"' },
  { label: 'Format & Readability', score: 90, max: 100, tip: 'Great formatting! Consider using consistent bullet points.' },
  { label: 'Work Experience Impact', score: 75, max: 100, tip: 'Add quantifiable achievements (e.g. "Improved performance by 40%")' },
  { label: 'Skills Section', score: 88, max: 100, tip: 'Good skill coverage. Add cloud skills for better match.' },
  { label: 'Education Details', score: 95, max: 100, tip: 'Perfect education section!' },
  { label: 'Summary / Objective', score: 70, max: 100, tip: 'Make your summary more impactful with specific metrics.' },
]

const RESUME_TEMPLATES = [
  { id: 'modern', name: 'Modern Pro', preview: '📄', color: 'from-brand-500 to-brand-600', popular: true },
  { id: 'minimal', name: 'Minimal Clean', preview: '📋', color: 'from-gray-500 to-gray-700', popular: false },
  { id: 'bold', name: 'Bold Creative', preview: '🎨', color: 'from-purple-500 to-purple-700', popular: false },
  { id: 'executive', name: 'Executive', preview: '💼', color: 'from-slate-600 to-slate-800', popular: false },
]

export function ResumeScorePage() {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(true)
  const overallScore = 83

  const handleScan = async () => {
    setScanned(false)
    setScanning(true)
    await new Promise(r => setTimeout(r, 2500))
    setScanning(false)
    setScanned(true)
    toast.success('Resume analyzed!')
  }

  const color = overallScore >= 80 ? 'emerald' : overallScore >= 60 ? 'yellow' : 'red'
  const colorMap = { emerald: 'text-emerald-600', yellow: 'text-yellow-600', red: 'text-red-500' }
  const bgMap = { emerald: 'from-emerald-500 to-emerald-600', yellow: 'from-yellow-400 to-orange-500', red: 'from-red-500 to-red-600' }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="AI Resume Score"
          subtitle="Get instant feedback to make your resume ATS-ready"
          actions={
            <Button variant="primary" icon={RefreshCw} onClick={handleScan} loading={scanning}>
              Re-analyze
            </Button>
          }
        />

        {/* Upload Zone */}
        {!scanned && !scanning && (
          <div className="card p-12 text-center mb-6">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">Upload Your Resume</h3>
            <p className="text-sm text-gray-500 mb-6">Supports PDF, DOCX, DOC formats</p>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-10 cursor-pointer hover:border-brand-400 transition-colors mb-4">
              <p className="text-sm text-gray-500">Drag & drop or <span className="text-brand-600 font-medium">browse file</span></p>
            </div>
            <Button variant="primary" onClick={handleScan} icon={Zap}>Analyze Resume</Button>
          </div>
        )}

        {scanning && (
          <div className="card p-12 text-center mb-6">
            <div className="text-5xl mb-4 animate-bounce">🤖</div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">Analyzing your resume...</h3>
            <p className="text-sm text-gray-500 mb-6">Our AI is checking ATS compatibility, keywords, and impact</p>
            <div className="space-y-3 max-w-sm mx-auto">
              {['Parsing resume content...', 'Checking ATS compatibility...', 'Analyzing keywords...', 'Scoring impact statements...'].map((msg, i) => (
                <motion.div key={msg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 border-2 border-brand-500 rounded-full animate-spin" />
                  {msg}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {scanned && (
          <div className="space-y-5">
            {/* Score Card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Score Circle */}
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={clsx('text-4xl font-display font-black', colorMap[color])}>{overallScore}</span>
                    <span className="text-xs text-gray-400">/ 100</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                    <h2 className="text-xl font-display font-black text-gray-900 dark:text-white">Strong Resume</h2>
                    <Badge variant="green">Good Score</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Your resume is ATS-compatible and stands out. A few improvements can push you to 90+.</p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <Button variant="primary" icon={Download} size="sm" onClick={() => toast.success('Downloading report...')}>Download Report</Button>
                    <Button variant="secondary" icon={Eye} size="sm">Preview</Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                  {[
                    { label: 'ATS Score', value: '82%', icon: '🎯' },
                    { label: 'Keywords', value: '24/30', icon: '🔑' },
                    { label: 'Impact', value: 'Good', icon: '⚡' },
                    { label: 'Readability', value: 'High', icon: '📖' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <p className="text-lg mb-0.5">{stat.icon}</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-5">Score Breakdown</h2>
              <div className="space-y-5">
                {SCORE_BREAKDOWN.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                      <span className={clsx('text-sm font-bold', item.score >= 80 ? 'text-emerald-600' : item.score >= 60 ? 'text-yellow-600' : 'text-red-500')}>
                        {item.score}/100
                      </span>
                    </div>
                    <Progress value={item.score} color={item.score >= 80 ? 'green' : item.score >= 60 ? 'orange' : 'red'} />
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      {item.score >= 80 ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-yellow-500" />}
                      {item.tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-4">Missing Keywords</h2>
              <p className="text-sm text-gray-500 mb-4">Add these keywords to improve your ATS match rate:</p>
              <div className="flex flex-wrap gap-2">
                {['CI/CD', 'Microservices', 'Kubernetes', 'REST APIs', 'Agile', 'System Design', 'Redis', 'PostgreSQL'].map(kw => (
                  <span key={kw} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700/30 rounded-lg text-xs font-medium cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => toast.success(`"${kw}" added to suggestions`)}>
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AIResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
    toast.success('Resume generated! 🎉')
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="AI Resume Builder"
          subtitle="Generate a professional, ATS-ready resume in minutes"
          breadcrumb="Student → AI Resume Builder"
        />

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Choose Template', 'Add Details', 'AI Generate'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                i + 1 < step ? 'bg-emerald-500 text-white' : i + 1 === step ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400')}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className={clsx('text-sm font-medium hidden sm:block', i + 1 === step ? 'text-brand-600' : 'text-gray-400')}>{s}</span>
              {i < 2 && <div className={clsx('flex-1 h-0.5', i + 1 < step ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700')} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-5">Choose a Template</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {RESUME_TEMPLATES.map(tpl => (
                <div key={tpl.id} onClick={() => setSelectedTemplate(tpl.id)}
                  className={clsx('card p-4 cursor-pointer hover:shadow-card-hover transition-all relative', selectedTemplate === tpl.id && 'border-2 border-brand-500 ring-4 ring-brand-500/10')}>
                  {tpl.popular && <span className="absolute top-2 right-2 badge bg-brand-100 text-brand-700 text-[10px]">Popular</span>}
                  <div className={clsx('h-28 rounded-xl mb-3 bg-gradient-to-br flex items-center justify-center text-4xl', tpl.color)}>
                    {tpl.preview}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">{tpl.name}</p>
                  {selectedTemplate === tpl.id && <CheckCircle className="absolute bottom-3 right-3 w-5 h-5 text-brand-500" />}
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={() => setStep(2)} icon={Zap}>Use This Template</Button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Full Name', defaultValue: 'Arjun Sharma' },
                    { label: 'Email', defaultValue: 'arjun@email.com' },
                    { label: 'Phone', defaultValue: '+91 9876543210' },
                    { label: 'Location', defaultValue: 'Bengaluru, India' },
                    { label: 'LinkedIn', defaultValue: 'linkedin.com/in/arjun-sharma' },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="text-xs font-medium text-gray-500 block mb-1">{field.label}</label>
                      <input className="input text-sm" defaultValue={field.defaultValue} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">AI Summary</h3>
                <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <p className="text-xs text-brand-700 dark:text-brand-400">AI will auto-generate your professional summary</p>
                </div>
                <textarea rows={4} className="input resize-none text-sm" placeholder="Or write your own summary..." />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                <Button variant="primary" onClick={handleGenerate} loading={generating} icon={Sparkles}>
                  {generating ? 'Generating...' : 'Generate Resume'}
                </Button>
              </div>
            </div>

            {/* Preview Skeleton */}
            <div className="card p-5 hidden lg:block">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="bg-white border rounded-xl p-6 shadow-inner space-y-4 min-h-96">
                <div className="text-center border-b pb-4">
                  <div className="text-lg font-bold text-gray-900">Arjun Sharma</div>
                  <div className="text-xs text-gray-500">Senior Frontend Developer · Bengaluru</div>
                  <div className="text-xs text-brand-600 mt-1">arjun@email.com · +91 9876543210</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Summary</div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-100 rounded-full w-full" />
                    <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                    <div className="h-2 bg-gray-100 rounded-full w-3/5" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Experience</div>
                  <div className="space-y-2">
                    {[1, 2].map(i => <div key={i} className="space-y-1">
                      <div className="h-2.5 bg-brand-100 rounded w-2/3" />
                      <div className="h-2 bg-gray-100 rounded w-1/3" />
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-3">Your Resume is Ready!</h2>
            <p className="text-gray-500 mb-8">AI-generated, ATS-optimized, and professionally formatted.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" icon={Download} onClick={() => toast.success('Downloading PDF...')}>Download PDF</Button>
              <Button variant="secondary" icon={Eye}>Preview</Button>
              <Button variant="outline" onClick={() => setStep(2)}>Edit Resume</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
