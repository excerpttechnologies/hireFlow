import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Brain, Star, ChevronRight, CheckCircle, Play, RefreshCw, Download, Settings, TrendingUp } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { APPLICATIONS, JOBS } from '../../data'
import { Button, Badge, Avatar, PageHeader, Progress } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const AI_TOOLS = [
  { id: 'matching', icon: '🎯', title: 'AI Resume Matching', desc: 'Automatically match candidates to jobs based on skills, experience, and fit score.', status: 'active', runs: 142 },
  { id: 'scoring', icon: '⭐', title: 'AI Candidate Scoring', desc: 'Score and rank candidates using 50+ data points including education, experience, and skills.', status: 'active', runs: 89 },
  { id: 'shortlisting', icon: '⚡', title: 'Auto Shortlisting', desc: 'Automatically shortlist top candidates based on your configured criteria.', status: 'active', runs: 67 },
  { id: 'screening', icon: '🤖', title: 'AI Screening Questions', desc: 'Generate personalized screening questions for each candidate.', status: 'active', runs: 234 },
  { id: 'interview', icon: '💬', title: 'AI Interview Generator', desc: 'Create custom interview question sets based on job requirements and candidate profile.', status: 'active', runs: 45 },
  { id: 'video', icon: '🎥', title: 'AI Video Interview', desc: 'One-way video interviews analyzed by AI for communication, confidence, and fit.', status: 'beta', runs: 12 },
]

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState('matching')
  const [running, setRunning] = useState(false)
  const [ran, setRan] = useState(false)
  const [selectedJob, setSelectedJob] = useState(JOBS[0].id)

  const candidates = APPLICATIONS.slice(0, 8).map(a => ({
    ...a,
    aiScore: Math.floor(60 + Math.random() * 40),
    matchReasons: ['Skills match 90%', 'Experience aligned', 'Education fits'],
    redFlags: Math.random() > 0.7 ? ['Job gap of 6 months'] : [],
  })).sort((a, b) => b.aiScore - a.aiScore)

  const runAI = async () => {
    setRunning(true)
    setRan(false)
    await new Promise(r => setTimeout(r, 2500))
    setRunning(false)
    setRan(true)
    toast.success('AI analysis complete! 47 candidates scored.')
  }

  return (
    <EmployerLayout>
      <PageHeader
        title="AI Hiring Suite"
        subtitle="Supercharge your hiring with AI-powered tools"
        actions={<Badge variant="brand">🤖 Powered by HireFlow AI</Badge>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Tool Selector */}
        <div className="space-y-2">
          {AI_TOOLS.map(tool => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)}
              className={clsx('w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all',
                activeTool === tool.id ? 'bg-brand-50 dark:bg-brand-900/20 border-2 border-brand-200 dark:border-brand-700/30' : 'card hover:shadow-card-hover')}>
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{tool.title}</p>
                  {tool.status === 'beta' && <Badge variant="orange">Beta</Badge>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{tool.runs} runs this month</p>
              </div>
              {activeTool === tool.id && <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Tool Detail */}
        <div className="xl:col-span-2 space-y-5">
          {/* Config */}
          <div className="card p-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{AI_TOOLS.find(t => t.id === activeTool)?.icon}</span>
                  <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                    {AI_TOOLS.find(t => t.id === activeTool)?.title}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm">{AI_TOOLS.find(t => t.id === activeTool)?.desc}</p>
              </div>
              <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Select Job</label>
                <select value={selectedJob} onChange={e => setSelectedJob(+e.target.value)} className="input text-sm">
                  {JOBS.slice(0, 8).map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1.5">Min Score Threshold</label>
                <select className="input text-sm">
                  <option>60% and above</option>
                  <option>70% and above</option>
                  <option>80% and above</option>
                  <option>90% and above</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" icon={running ? RefreshCw : Play} onClick={runAI} loading={running} className="flex-1 sm:flex-none justify-center">
                {running ? 'Analyzing...' : 'Run AI Analysis'}
              </Button>
              {ran && <Button variant="outline" icon={Download} onClick={() => toast.success('Exporting results...')}>Export Results</Button>}
            </div>
          </div>

          {/* Running animation */}
          {running && (
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3 animate-bounce">🤖</div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">AI is analyzing candidates...</p>
              <div className="space-y-2 text-left max-w-sm mx-auto">
                {['Parsing resumes...', 'Calculating skill match...', 'Evaluating experience...', 'Generating scores...'].map((msg, i) => (
                  <motion.div key={msg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-3 h-3 border-2 border-brand-500 rounded-full animate-spin flex-shrink-0" />
                    {msg}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {ran && !running && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-gray-900 dark:text-white">AI Ranked Candidates</h3>
                <div className="flex items-center gap-2">
                  <span className="badge bg-emerald-100 text-emerald-700">{candidates.length} analyzed</span>
                  <Button variant="primary" size="sm" icon={CheckCircle}
                    onClick={() => toast.success('Top 5 candidates shortlisted!')}>
                    Shortlist Top 5
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {candidates.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0',
                      i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-400' : 'bg-gray-300')}>
                      {i + 1}
                    </div>
                    <Avatar src={c.avatar} name={c.studentName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.studentName}</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {c.matchReasons.map(r => (
                          <span key={r} className="text-xs text-emerald-600 flex items-center gap-0.5">
                            <CheckCircle className="w-3 h-3" /> {r}
                          </span>
                        ))}
                        {c.redFlags.map(r => (
                          <span key={r} className="text-xs text-red-500">⚠️ {r}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={clsx('text-lg font-display font-black', c.aiScore >= 80 ? 'text-emerald-600' : c.aiScore >= 70 ? 'text-yellow-600' : 'text-gray-500')}>
                        {c.aiScore}%
                      </div>
                      <p className="text-xs text-gray-400">AI Score</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => toast.success(`${c.studentName} shortlisted!`)}
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!ran && !running && (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Ready to run AI analysis</p>
              <p className="text-sm text-gray-500">Select a job and click "Run AI Analysis" to get started</p>
            </div>
          )}
        </div>
      </div>
    </EmployerLayout>
  )
}
