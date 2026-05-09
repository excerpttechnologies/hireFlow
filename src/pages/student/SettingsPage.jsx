import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Bell, Lock, Eye, Globe, Smartphone, Trash2, Shield, ToggleLeft, ToggleRight,
  Moon, Sun, Mail, MessageSquare, Briefcase, CheckCircle, Save
} from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Button, Input, Select, PageHeader, Badge, Modal } from '../../components/ui'
import { useTheme } from '../../context/ThemeContext'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Eye },
  { id: 'danger', label: 'Danger Zone', icon: Trash2 },
]

function Toggle({ enabled, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => onChange(!enabled)}
        className={clsx('relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0', enabled ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700')}>
        <span className={clsx('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200', enabled ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { dark, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('profile')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [notifs, setNotifs] = useState({
    jobAlerts: true, appUpdates: true, messages: true,
    weeklyDigest: true, profileViews: false, newJobs: true,
    interviewReminders: true, promotions: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true, resumeVisible: false,
    showEmail: false, showPhone: false, allowMessages: true,
  })

  const [profile, setProfile] = useState({
    name: 'Arjun Sharma', email: 'arjun.sharma@gmail.com', phone: '+91 9876543210',
    location: 'Bengaluru', headline: 'Senior Frontend Developer', website: 'arjunsharma.dev',
  })

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    setSaving(false)
    toast.success('Settings saved successfully!')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Profile Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              <Input label="Email Address" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              <Input label="Phone Number" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              <Input label="Location" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
              <Input label="Headline" value={profile.headline} onChange={e => setProfile({ ...profile, headline: e.target.value })} />
              <Input label="Website" value={profile.website} onChange={e => setProfile({ ...profile, website: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Preferred Job Types</label>
              <div className="flex flex-wrap gap-2">
                {['Full-time', 'Remote', 'Hybrid', 'Contract', 'Internship'].map(t => (
                  <button key={t} className="px-3 py-1.5 text-xs font-medium rounded-xl border-2 border-brand-200 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:border-brand-700/30 dark:text-brand-400 hover:border-brand-400 transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Open to Work Status</label>
              <Select label="" options={['Actively looking', 'Open to opportunities', 'Not looking', 'Employed but open']} />
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Notification Preferences</h2>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-brand-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Email Notifications</h3>
              </div>
              <Toggle enabled={notifs.jobAlerts} onChange={v => setNotifs({ ...notifs, jobAlerts: v })} label="New Job Alerts" desc="Get notified when new jobs match your preferences" />
              <Toggle enabled={notifs.appUpdates} onChange={v => setNotifs({ ...notifs, appUpdates: v })} label="Application Updates" desc="Status changes on your applications" />
              <Toggle enabled={notifs.messages} onChange={v => setNotifs({ ...notifs, messages: v })} label="New Messages" desc="When recruiters send you messages" />
              <Toggle enabled={notifs.weeklyDigest} onChange={v => setNotifs({ ...notifs, weeklyDigest: v })} label="Weekly Digest" desc="Summary of your job search activity" />
              <Toggle enabled={notifs.promotions} onChange={v => setNotifs({ ...notifs, promotions: v })} label="Promotional Emails" desc="Special offers and platform updates" />
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-4 h-4 text-brand-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Push Notifications</h3>
              </div>
              <Toggle enabled={notifs.profileViews} onChange={v => setNotifs({ ...notifs, profileViews: v })} label="Profile Views" desc="When employers view your profile" />
              <Toggle enabled={notifs.newJobs} onChange={v => setNotifs({ ...notifs, newJobs: v })} label="Matching Jobs" desc="Real-time alerts for high-match jobs" />
              <Toggle enabled={notifs.interviewReminders} onChange={v => setNotifs({ ...notifs, interviewReminders: v })} label="Interview Reminders" desc="15-min reminder before scheduled interviews" />
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Privacy Settings</h2>
            <div className="card p-5">
              <Toggle enabled={privacy.profileVisible} onChange={v => setPrivacy({ ...privacy, profileVisible: v })} label="Public Profile" desc="Allow employers to find your profile in search" />
              <Toggle enabled={privacy.resumeVisible} onChange={v => setPrivacy({ ...privacy, resumeVisible: v })} label="Resume Visible" desc="Let employers download your resume" />
              <Toggle enabled={privacy.showEmail} onChange={v => setPrivacy({ ...privacy, showEmail: v })} label="Show Email Address" desc="Display email on your public profile" />
              <Toggle enabled={privacy.showPhone} onChange={v => setPrivacy({ ...privacy, showPhone: v })} label="Show Phone Number" desc="Display phone on your public profile" />
              <Toggle enabled={privacy.allowMessages} onChange={v => setPrivacy({ ...privacy, allowMessages: v })} label="Allow Messages" desc="Let recruiters message you directly" />
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Blocked Companies</h3>
              <p className="text-xs text-gray-500 mb-3">Jobs from blocked companies won't appear in your search</p>
              <div className="flex flex-wrap gap-2">
                {['SpamCorp Inc', 'FakeJob Ltd'].map(c => (
                  <span key={c} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium border border-red-200 dark:border-red-700/30">
                    {c}
                    <button className="hover:text-red-900 transition-colors">×</button>
                  </span>
                ))}
                <button className="px-2.5 py-1.5 text-xs font-medium text-brand-600 border-2 border-dashed border-brand-200 rounded-lg hover:bg-brand-50 transition-colors">
                  + Block Company
                </button>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Security</h2>
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Change Password</h3>
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="Min 8 characters" />
              <Input label="Confirm New Password" type="password" placeholder="Re-enter password" />
              <Button variant="primary" size="sm" onClick={() => toast.success('Password changed!')}>Update Password</Button>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">2FA via SMS</p>
                  <p className="text-xs text-gray-400">+91 98765 ****10</p>
                </div>
                <Badge variant="green">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Authenticator App</p>
                  <p className="text-xs text-gray-400">Google Authenticator</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => toast.success('Setup guide sent!')}>Setup</Button>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Active Sessions</h3>
              {[
                { device: 'Chrome · macOS', location: 'Bengaluru, India', time: 'Current session', current: true },
                { device: 'iPhone · iOS 17', location: 'Bengaluru, India', time: '2 days ago', current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                    <p className="text-xs text-gray-400">{session.location} · {session.time}</p>
                  </div>
                  {session.current ? <Badge variant="green">Active</Badge> : (
                    <button onClick={() => toast.success('Session revoked')} className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Appearance</h2>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Light Mode', icon: Sun, value: false },
                  { label: 'Dark Mode', icon: Moon, value: true },
                ].map(opt => (
                  <button key={opt.label} onClick={toggleTheme}
                    className={clsx('p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all',
                      dark === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300')}>
                    <opt.icon className={clsx('w-6 h-6', dark === opt.value ? 'text-brand-600' : 'text-gray-400')} />
                    <span className={clsx('text-sm font-medium', dark === opt.value ? 'text-brand-600' : 'text-gray-600 dark:text-gray-400')}>{opt.label}</span>
                    {dark === opt.value && <CheckCircle className="w-4 h-4 text-brand-500" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Language & Region</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Language" options={['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Marathi']} />
                <Select label="Time Zone" options={['IST (UTC+5:30)', 'UTC', 'EST (UTC-5)', 'PST (UTC-8)']} />
              </div>
            </div>
          </div>
        )

      case 'danger':
        return (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Danger Zone</h2>
            <div className="card p-5 border-2 border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Export My Data</h3>
              <p className="text-sm text-gray-500 mb-4">Download all your data including profile, applications, messages, and resume in JSON format.</p>
              <Button variant="outline" size="sm" onClick={() => toast.success('Data export started — you\'ll receive an email within 24 hours.')}>
                Request Data Export
              </Button>
            </div>
            <div className="card p-5 border-2 border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Deactivate Account</h3>
              <p className="text-sm text-gray-500 mb-4">Temporarily hide your profile and pause all job alerts. You can reactivate anytime.</p>
              <Button variant="outline" size="sm" onClick={() => toast.success('Account deactivated. You can reactivate anytime.')}>
                Deactivate Account
              </Button>
            </div>
            <div className="card p-5 border-2 border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeleteOpen(true)}>
                Delete My Account
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <PageHeader title="Settings" subtitle="Manage your account preferences" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-2 sticky top-20">
              {SECTIONS.map(section => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    activeSection === section.id
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                    section.id === 'danger' && activeSection !== 'danger' && 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10')}>
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className="card p-6">
              {renderSection()}
              {activeSection !== 'danger' && (
                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                  <Button variant="primary" icon={Save} onClick={handleSave} loading={saving}>Save Changes</Button>
                  <Button variant="outline" onClick={() => toast.success('Changes discarded')}>Discard</Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Account" size="sm">
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700/30">
            <p className="text-sm text-red-700 dark:text-red-400 font-medium">⚠️ This action is permanent and cannot be undone.</p>
            <p className="text-xs text-red-600 dark:text-red-500 mt-1">All your data, applications, and messages will be deleted.</p>
          </div>
          <Input label='Type "DELETE" to confirm' placeholder="DELETE" />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 justify-center" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1 justify-center" icon={Trash2}
              onClick={() => { toast.error('Account deleted'); setDeleteOpen(false) }}>
              Delete Forever
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
