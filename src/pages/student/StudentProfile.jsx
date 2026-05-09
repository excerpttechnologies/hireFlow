import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit2, MapPin, Mail, Phone, Globe, Linkedin, Github, Plus, Award, Briefcase, GraduationCap, Code, Star, Download, Eye, CheckCircle } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Badge, Progress, Button, Tag, Card, Modal } from '../../components/ui'
import clsx from 'clsx'

const PROFILE = {
  name: 'Arjun Sharma', headline: 'Senior Frontend Developer | React.js Expert | Open to Remote',
  location: 'Bengaluru, India', email: 'arjun.sharma@gmail.com', phone: '+91 9876543210',
  website: 'arjunsharma.dev', linkedin: 'linkedin.com/in/arjun-sharma', github: 'github.com/arjun-dev',
  avatar: 'https://i.pravatar.cc/120?img=11', coverBg: 'from-brand-600 to-purple-600',
  about: 'Passionate frontend developer with 4+ years of experience building scalable web applications. Proficient in React.js, TypeScript, and modern frontend architectures. Love open source and developer communities.',
  completionScore: 88,
  skills: ['React.js', 'TypeScript', 'Node.js', 'JavaScript', 'Tailwind CSS', 'GraphQL', 'AWS', 'Docker', 'Git', 'MongoDB'],
  education: [
    { degree: 'B.Tech Computer Science', institution: 'VIT University', year: '2019–2023', gpa: '8.7/10', location: 'Vellore' },
    { degree: 'Class 12 (CBSE)', institution: 'Delhi Public School', year: '2019', gpa: '94.2%', location: 'New Delhi' },
  ],
  experience: [
    { title: 'Frontend Developer', company: 'Razorpay', duration: 'Jan 2023 – Present', location: 'Bengaluru (Hybrid)', description: 'Led frontend development for payment dashboard serving 5M+ businesses. Improved performance by 40%.', skills: ['React.js', 'TypeScript', 'Redux'] },
    { title: 'SDE Intern', company: 'Google', duration: 'May 2022 – Jul 2022', location: 'Hyderabad (Remote)', description: 'Worked on Google Workspace UI components. Shipped features used by 1B+ users.', skills: ['Angular', 'RxJS', 'Material'] },
  ],
  projects: [
    { name: 'DevBoard', description: 'A developer dashboard for tracking GitHub activity, PR reviews, and code metrics.', link: 'github.com/arjun-dev/devboard', stars: 234, tech: ['React', 'GitHub API', 'D3.js'] },
    { name: 'AI Code Reviewer', description: 'AI-powered code review tool that integrates with PRs.', link: 'codereviewer.dev', stars: 156, tech: ['GPT-4', 'Node.js', 'GitHub Actions'] },
  ],
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2023', id: 'AWS-12345' },
    { name: 'React Advanced Patterns', issuer: 'Udemy', year: '2022', id: 'UD-98765' },
  ],
  languages: [{ name: 'English', level: 'Fluent' }, { name: 'Hindi', level: 'Native' }, { name: 'Tamil', level: 'Basic' }],
}

export default function StudentProfile() {
  const [editOpen, setEditOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('about')

  const TABS = ['about', 'experience', 'education', 'projects', 'skills', 'certifications']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Cover + Avatar */}
        <div className="card overflow-hidden mb-5">
          <div className={`h-36 bg-gradient-to-r ${PROFILE.coverBg} relative`}>
            <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-4">
              <div className="relative">
                <img src={PROFILE.avatar} alt={PROFILE.name} className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 object-cover" />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 sm:pb-2">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-display font-black text-gray-900 dark:text-white">{PROFILE.name}</h1>
                      <CheckCircle className="w-5 h-5 text-brand-600" title="Verified" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{PROFILE.headline}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{PROFILE.location}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{PROFILE.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/student/edit-profile" className="btn-secondary text-xs py-2 px-3 rounded-xl flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                    </Link>
                    <button className="text-xs py-2 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-3 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-brand-700 dark:text-brand-400 font-medium">Profile Completion</span>
                  <span className="font-bold text-brand-700 dark:text-brand-400">{PROFILE.completionScore}%</span>
                </div>
                <Progress value={PROFILE.completionScore} />
              </div>
              <div className="text-xs text-brand-600 font-medium whitespace-nowrap">
                Add experience to reach 100%
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { icon: Globe, label: PROFILE.website },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-600 transition-colors px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left - Quick Info */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-lg text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Languages</h3>
              <div className="space-y-2">
                {PROFILE.languages.map(l => (
                  <div key={l.name} className="flex justify-between text-xs">
                    <span className="text-gray-700 dark:text-gray-300">{l.name}</span>
                    <Badge variant="default">{l.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Certifications</h3>
              <div className="space-y-3">
                {PROFILE.certifications.map(cert => (
                  <div key={cert.name} className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                      <p className="text-xs text-gray-400">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            {/* About */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-bold text-gray-900 dark:text-white">About</h2>
                <button className="text-gray-400 hover:text-brand-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{PROFILE.about}</p>
            </div>

            {/* Experience */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-gray-900 dark:text-white">Experience</h2>
                <button className="text-brand-600 hover:text-brand-700 text-xs font-semibold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-5">
                {PROFILE.experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{exp.title}</p>
                          <p className="text-xs text-brand-600 font-medium">{exp.company}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{exp.duration} · {exp.location}</p>
                        </div>
                        <button className="text-gray-400 hover:text-brand-600"><Edit2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.skills.map(s => <Tag key={s}>{s}</Tag>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-gray-900 dark:text-white">Education</h2>
                <button className="text-brand-600 hover:text-brand-700 text-xs font-semibold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-4">
                {PROFILE.education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{edu.degree}</p>
                      <p className="text-xs text-brand-600 font-medium">{edu.institution}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{edu.year} · {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-gray-900 dark:text-white">Projects</h2>
                <button className="text-brand-600 hover:text-brand-700 text-xs font-semibold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-4">
                {PROFILE.projects.map((proj, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-brand-600" />
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{proj.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {proj.stars}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.tech.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
