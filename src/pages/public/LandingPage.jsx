import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Search, MapPin, Briefcase, TrendingUp, Users, Star, ChevronRight,
  Play, CheckCircle, ArrowRight, Zap, Brain, Shield, Clock, Building2,
  Download, Apple, Smartphone, ChevronDown
} from 'lucide-react'
import PublicNavbar from '../../components/layout/PublicNavbar'
import Footer from '../../components/layout/Footer'
import { JOBS, COMPANIES, CATEGORIES, TESTIMONIALS, SUBSCRIPTION_PLANS, FAQS } from '../../data'
import { Badge, CompanyLogo } from '../../components/ui'
import { motion as m } from 'framer-motion'
import clsx from 'clsx'

function CountUp({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function LandingPage() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const navigate = useNavigate()

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-brand-950 to-gray-900 pt-20 pb-32">
        {/* BG Decoration */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-accent-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 text-brand-300 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
              <Zap className="w-3.5 h-3.5" /> Powered by Advanced AI Technology
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-white leading-tight mb-6">
              Find Your Dream Job<br />
              <span className="text-gradient bg-gradient-to-r from-brand-400 via-purple-400 to-accent-400 bg-clip-text text-transparent">10× Faster with AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              India's most intelligent hiring platform. AI-powered job matching, resume scoring, and career coaching — all in one place.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input value={keyword} onChange={e => setKeyword(e.target.value)}
                  placeholder="Job title, skills, or company..."
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent outline-none placeholder-gray-400" />
              </div>
              <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input value={location} onChange={e => setLocation(e.target.value)}
                  placeholder="Location (e.g. Bengaluru)"
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent outline-none placeholder-gray-400" />
              </div>
              <button onClick={() => navigate('/jobs')}
                className="btn-primary rounded-xl px-6 py-3 text-sm whitespace-nowrap">
                Search Jobs <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['React Developer', 'Data Science', 'Product Manager', 'UI/UX Designer'].map(tag => (
                <button key={tag} onClick={() => setKeyword(tag)}
                  className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
            {[
              { label: 'Active Jobs', value: 22000, suffix: '+' },
              { label: 'Companies', value: 1500, suffix: '+' },
              { label: 'Job Seekers', value: 500000, suffix: '+' },
              { label: 'Placements', value: 85000, suffix: '+' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-display font-black text-white">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="white" className="dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-400 font-medium mb-8">TRUSTED BY TEAMS AT</p>
          <div className="flex flex-wrap justify-center gap-6 items-center opacity-60 hover:opacity-80 transition-opacity">
            {COMPANIES.slice(0, 10).map(company => (
              <div key={company.id} className="flex items-center gap-2 px-4 py-2 grayscale hover:grayscale-0 transition-all">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: company.color }}>
                  {company.logo}
                </div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <Badge variant="brand" className="mb-3">Browse Categories</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              Explore Opportunities by Category
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Find the perfect role in your field from thousands of openings</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="cursor-pointer group">
                <Link to={`/jobs?category=${cat.name}`} className="flex flex-col items-center p-4 rounded-2xl border-2 border-transparent hover:border-brand-200 bg-gray-50 dark:bg-gray-900 hover:bg-brand-50 dark:hover:bg-gray-800 transition-all">
                  <span className="text-3xl mb-3">{cat.icon}</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</p>
                  <p className="text-xs text-brand-600 font-bold mt-1">{cat.count.toLocaleString()}+</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="green" className="mb-2">Featured Jobs</Badge>
              <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white">Hot Jobs Right Now</h2>
            </div>
            <Link to="/jobs" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {JOBS.slice(0, 6).map((job, i) => {
              const company = COMPANIES.find(c => c.id === job.companyId)
              return (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="card p-5 hover:shadow-card-hover transition-all duration-200 cursor-pointer relative overflow-hidden group">
                  {job.featured && <div className="absolute top-3 right-3 badge bg-amber-100 text-amber-700">⭐ Featured</div>}
                  {job.urgent && <div className="absolute top-3 right-3 badge bg-red-100 text-red-600">🔥 Urgent</div>}

                  <div className="flex items-start gap-3 mb-4">
                    <CompanyLogo name={company?.name} color={company?.color} size="md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-brand-600 transition-colors">{job.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{job.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tag"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="tag">{job.workMode}</span>
                    <span className="tag">{job.type}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="font-semibold text-emerald-600">₹{job.salaryMin}–{job.salaryMax} LPA</span>
                    <span>{job.experience}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/jobs/${job.id}`} className="flex-1 btn-primary text-xs py-2 text-center rounded-lg">Easy Apply</Link>
                    <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16">
            <Badge variant="purple" className="mb-3">AI-Powered</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              Hire Smarter. Get Hired Faster.
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our AI suite transforms every step of the hiring journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Job Matching', desc: 'Our AI analyzes 50+ data points to match you with jobs where you have the highest probability of success.', color: 'from-brand-500 to-brand-600' },
              { icon: Star, title: 'Resume Scorer', desc: 'Get instant ATS score, keyword analysis, and actionable suggestions to make your resume stand out.', color: 'from-purple-500 to-purple-600' },
              { icon: Zap, title: 'Auto Shortlisting', desc: 'Employers use AI to shortlist the top 10% of candidates within seconds of application.', color: 'from-accent-500 to-orange-600' },
              { icon: Shield, title: 'Verified Companies', desc: 'Every company on HireFlow is manually verified, so you never apply to fake or scam jobs.', color: 'from-emerald-500 to-emerald-600' },
              { icon: Clock, title: 'Real-time Updates', desc: 'Get instant notifications when your application status changes, interviews are scheduled, or offers arrive.', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, title: 'Career Insights', desc: 'Understand your market value, salary trends, and career growth opportunities in your field.', color: 'from-pink-500 to-rose-600' },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-6 hover:shadow-card-hover transition-shadow group">
                <div className={clsx('w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              How HireFlow Works
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Sign up and build your profile with skills, experience, and portfolio in minutes.', icon: '👤' },
              { step: '02', title: 'AI Matches You', desc: 'Our AI instantly matches your profile with thousands of relevant job openings.', icon: '🤖' },
              { step: '03', title: 'Apply with 1 Click', desc: 'Apply to multiple jobs with your saved profile using Easy Apply or upload a custom resume.', icon: '⚡' },
              { step: '04', title: 'Get Hired', desc: 'Track applications, prepare for interviews, and land your dream offer.', icon: '🎉' },
            ].map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-10 h-10 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-display font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {i < 3 && <div className="absolute top-8 right-0 hidden md:block text-gray-300">→</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <Badge variant="yellow" className="mb-3">Success Stories</Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              They Got Their Dream Jobs
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-brand-600">{t.role}</p>
                    <p className="text-xs text-emerald-600 font-bold">{t.salary}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 mt-3">Start free, upgrade when you need more power</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={clsx('card p-6 relative', plan.popular && 'border-2 border-brand-500 ring-4 ring-brand-500/10')}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge bg-brand-600 text-white px-3 py-1 text-xs">Most Popular</span>
                  </div>
                )}
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-4xl font-display font-black text-gray-900 dark:text-white">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-gray-400 text-sm">/{plan.billing}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register/student"
                  className={clsx('w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all',
                    plan.popular ? 'btn-primary' : 'btn-secondary')}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  <ChevronDown className={clsx('w-4 h-4 text-gray-400 flex-shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                    className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-brand-200 text-lg mb-8">Join 5 lakh+ professionals already using HireFlow</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/student" className="px-8 py-3.5 bg-white text-brand-700 font-bold rounded-2xl hover:bg-brand-50 transition-colors">
                Get Started Free
              </Link>
              <Link to="/employer/register" className="px-8 py-3.5 bg-white/20 text-white font-bold rounded-2xl hover:bg-white/30 transition-colors border border-white/30">
                Post a Job
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
