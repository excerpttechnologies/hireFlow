import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ChevronRight, Search, ChevronDown, ArrowLeft } from 'lucide-react'
import PublicNavbar from '../../components/layout/PublicNavbar'
import Footer from '../../components/layout/Footer'
import { BLOG_POSTS, FAQS } from '../../data'
import { Button, Input, Textarea, Badge } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

// ============ ABOUT ============
export function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Badge variant="brand" className="mb-4">Our Story</Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-6">
            We're Building the Future<br />of <span className="text-gradient">Hiring in India</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mb-12 leading-relaxed">
            TodayJobs was founded in 2022 by a team of IIT and IIM alumni who experienced firsthand how broken the hiring process was — both as candidates and as hiring managers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Job Seekers', value: '5L+' },
              { label: 'Companies', value: '1,500+' },
              { label: 'Placements', value: '85K+' },
              { label: 'Team Size', value: '120+' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-display font-black text-brand-600">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="card p-8 mb-10 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border-brand-100 dark:border-brand-700/30">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              To make the hiring process fair, fast, and intelligent — helping every qualified person find meaningful work and every company find their perfect team, using the power of AI.
            </p>
          </div>

          {/* Team */}
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">Leadership Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { name: 'Rahul Mehta', role: 'CEO & Co-founder', college: 'IIT Bombay', img: 'https://i.pravatar.cc/80?img=11' },
              { name: 'Priya Sharma', role: 'CTO & Co-founder', college: 'IIT Delhi', img: 'https://i.pravatar.cc/80?img=5' },
              { name: 'Arjun Kapoor', role: 'CPO', college: 'IIM Ahmedabad', img: 'https://i.pravatar.cc/80?img=8' },
            ].map(member => (
              <div key={member.name} className="card p-5 text-center">
                <img src={member.img} alt={member.name} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3" />
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</p>
                <p className="text-xs text-brand-600">{member.role}</p>
                <p className="text-xs text-gray-400 mt-0.5">{member.college}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

// ============ CONTACT ============
export function ContactPage() {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    toast.success('Message sent! We\'ll reply within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white mb-3">Get in Touch</h1>
          <p className="text-gray-500">We're here to help. Reach out to us anytime.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email Us', value: 'hello@TodayJobs.in', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', value: '+91 1800-123-4567', sub: 'Mon–Sat 9AM to 6PM IST' },
              { icon: MapPin, title: 'Office', value: '12th Floor, Brigade Towers, Bengaluru', sub: 'Visit us for enterprise enquiries' },
            ].map(item => (
              <div key={item.title} className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                  <p className="text-brand-600 font-medium text-sm">{item.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Send a Message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" placeholder="Arjun Sharma" />
                <Input label="Email" type="email" placeholder="you@email.com" />
              </div>
              <Input label="Subject" placeholder="How can we help?" />
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Category</label>
                <select className="input text-sm">
                  {['General Inquiry', 'Technical Support', 'Billing', 'Partnership', 'Press / Media', 'Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <Textarea label="Message" placeholder="Tell us more..." className="h-28" />
              <Button variant="primary" onClick={handleSubmit} loading={loading} icon={Send} className="w-full justify-center py-3">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ BLOG ============
export function BlogListPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const categories = ['all', ...new Set(BLOG_POSTS.map(p => p.category))]

  const filtered = BLOG_POSTS.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <Badge variant="brand" className="mb-3">Our Blog</Badge>
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white">Career Insights & Tips</h1>
          <p className="text-gray-500 mt-3">Expert advice for job seekers and hiring managers</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={clsx('px-3 py-2 text-sm font-medium rounded-xl transition-colors capitalize',
                  category === cat ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}>
              <Link to={`/blog/${post.id}`} className="card block hover:shadow-card-hover transition-all overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex items-center justify-center text-5xl">
                  {post.image}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="brand">{post.category}</Badge>
                    <span className="text-xs text-gray-400">{post.readTime} read</span>
                  </div>
                  <h2 className="font-display font-bold text-gray-900 dark:text-white mb-2 hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {post.author[0]}
                      </div>
                      <span className="text-xs text-gray-500">{post.author}</span>
                    </div>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ BLOG DETAIL ============
export function BlogDetailPage() {
  const post = BLOG_POSTS[0]
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <Badge variant="brand" className="mb-3">{post.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-sm text-white font-bold">{post.author[0]}</div>
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p><p className="text-xs text-gray-400">{post.date}</p></div>
          </div>
          <span className="text-sm text-gray-400 ml-auto">{post.readTime} read · {post.views.toLocaleString()} views</span>
        </div>
        <div className="h-64 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center text-8xl mb-8">
          {post.image}
        </div>
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-4">
          {[post.excerpt,
            'The world of technology is evolving at an unprecedented pace. Keeping up with the latest trends and skills is crucial for staying competitive in the job market.',
            'In this comprehensive guide, we\'ll explore the essential skills that every developer should master in 2025. From cloud computing to AI integration, these competencies will help you stand out in a crowded job market.',
            'Let\'s start with the most fundamental shift — the rise of AI-assisted development. Tools like GitHub Copilot and ChatGPT are changing how code is written, but understanding AI prompting and working alongside AI tools is now a critical skill.'
          ].map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ HELP CENTER ============
export function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const HELP_CATEGORIES = [
    { icon: '👤', title: 'Account & Profile', desc: 'Manage your account settings' },
    { icon: '💼', title: 'Job Applications', desc: 'Track and manage applications' },
    { icon: '💳', title: 'Billing & Plans', desc: 'Subscription and payment help' },
    { icon: '🤖', title: 'AI Features', desc: 'Resume scoring and career coach' },
    { icon: '🔔', title: 'Notifications', desc: 'Alerts and preferences' },
    { icon: '🏢', title: 'For Employers', desc: 'Posting jobs and hiring' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 py-16 mb-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-black text-white mb-4">How can we help?</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..." className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-700 text-sm bg-white shadow-xl outline-none" />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {HELP_CATEGORIES.map(cat => (
            <button key={cat.title} className="card p-5 text-left hover:shadow-card-hover transition-all hover:border-brand-200 group">
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-brand-600 transition-colors">{cat.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{cat.desc}</p>
            </button>
          ))}
        </div>
        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                <ChevronDown className={clsx('w-4 h-4 text-gray-400 flex-shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
              </button>
              {openFaq === i && <div className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ PRIVACY POLICY ============
export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: February 1, 2025</p>
        <div className="space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, apply for jobs, or contact us for support. This includes: name, email address, phone number, resume, work experience, educational background, skills, preferences, and any other information you choose to provide.' },
            { title: '2. How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services. This includes matching you with job opportunities, sending you relevant job alerts, improving our AI recommendation engine, and communicating with you about your account.' },
            { title: '3. Information Sharing', content: 'We do not sell your personal information. We share your information only with employers when you apply to their jobs, service providers who assist our operations, and when required by law.' },
            { title: '4. Data Security', content: 'We implement industry-standard security measures including end-to-end encryption, regular security audits, and strict access controls to protect your personal information.' },
            { title: '5. Your Rights', content: 'You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications and request a copy of your data.' },
          ].map(section => (
            <div key={section.title}>
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ TERMS ============
export function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: February 1, 2025</p>
        <div className="space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using TodayJobs, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access the service.' },
            { title: '2. User Accounts', content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must be at least 18 years old to use this service.' },
            { title: '3. Acceptable Use', content: 'You agree not to use the service to post false, misleading, or fraudulent job listings. You agree not to harass, discriminate, or otherwise harm other users. You agree not to attempt to access systems or data you are not authorized to access.' },
            { title: '4. Intellectual Property', content: 'TodayJobs and its original content, features and functionality are and will remain the exclusive property of TodayJobs Technologies Pvt. Ltd. Our trademarks and trade dress may not be used without prior written permission.' },
            { title: '5. Termination', content: 'We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.' },
          ].map(section => (
            <div key={section.title}>
              <h2 className="font-display font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ============ 404 ============
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <PublicNavbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-8xl mb-6">🔭</div>
          <h1 className="text-8xl font-display font-black text-gray-200 dark:text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-primary px-6 py-3 rounded-xl">Go Home</Link>
            <Link to="/jobs" className="btn-secondary px-6 py-3 rounded-xl">Browse Jobs</Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

// ============ CAREERS ============
export function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PublicNavbar />
      <div className="bg-gradient-to-br from-brand-600 to-purple-700 py-20 text-center mb-12">
        <h1 className="text-4xl font-display font-black text-white mb-3">Join the TodayJobs Team</h1>
        <p className="text-brand-200 text-lg">Help us revolutionize hiring for India</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-4">
          {[
            { title: 'Senior React Developer', dept: 'Engineering', location: 'Bengaluru (Hybrid)', type: 'Full-time' },
            { title: 'AI/ML Engineer', dept: 'AI Research', location: 'Remote', type: 'Full-time' },
            { title: 'Product Designer', dept: 'Design', location: 'Bengaluru', type: 'Full-time' },
            { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Bengaluru', type: 'Full-time' },
          ].map((job, i) => (
            <div key={i} className="card p-5 flex items-center justify-between gap-4 hover:shadow-card-hover transition-shadow">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{job.title}</p>
                <p className="text-sm text-gray-500">{job.dept} · {job.location} · {job.type}</p>
              </div>
              <Button variant="secondary" size="sm">Apply Now</Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
