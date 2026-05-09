import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Plus, Trash2, Edit2, ToggleRight, ToggleLeft, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Button, Badge, PageHeader, Modal, Input, Select } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const SAMPLE_ALERTS = [
  {
    id: 1, name: 'React Developer Jobs', keywords: 'React.js, Frontend', location: 'Bengaluru',
    frequency: 'Daily', salary: '20+ LPA', type: 'Full-time', active: true,
    matched: 12, lastSent: '2 hours ago'
  },
  {
    id: 2, name: 'Remote ML Engineer', keywords: 'Machine Learning, Python', location: 'Remote',
    frequency: 'Instant', salary: '25+ LPA', type: 'Full-time', active: true,
    matched: 5, lastSent: '1 day ago'
  },
  {
    id: 3, name: 'Product Manager Roles', keywords: 'Product Manager, Product Lead', location: 'Bengaluru, Hyderabad',
    frequency: 'Weekly', salary: 'Any', type: 'Full-time', active: false,
    matched: 28, lastSent: '3 days ago'
  },
]

export default function JobAlertsPage() {
  const [alerts, setAlerts] = useState(SAMPLE_ALERTS)
  const [createOpen, setCreateOpen] = useState(false)
  const [editAlert, setEditAlert] = useState(null)
  const [form, setForm] = useState({ name: '', keywords: '', location: '', frequency: 'Daily', salary: 'Any', type: 'Full-time' })

  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
    toast.success('Alert updated')
  }

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
    toast.success('Alert deleted')
  }

  const handleSave = () => {
    if (!form.name || !form.keywords) { toast.error('Fill required fields'); return }
    if (editAlert) {
      setAlerts(prev => prev.map(a => a.id === editAlert.id ? { ...a, ...form } : a))
      toast.success('Alert updated!')
    } else {
      setAlerts(prev => [...prev, { id: Date.now(), ...form, active: true, matched: 0, lastSent: 'Never' }])
      toast.success('Alert created!')
    }
    setCreateOpen(false)
    setEditAlert(null)
    setForm({ name: '', keywords: '', location: '', frequency: 'Daily', salary: 'Any', type: 'Full-time' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="Job Alerts"
          subtitle={`${alerts.filter(a => a.active).length} active alerts`}
          actions={
            <Button variant="primary" icon={Plus} onClick={() => { setEditAlert(null); setForm({ name: '', keywords: '', location: '', frequency: 'Daily', salary: 'Any', type: 'Full-time' }); setCreateOpen(true) }}>
              Create Alert
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Active Alerts', value: alerts.filter(a => a.active).length, color: 'text-brand-600 bg-brand-50' },
            { label: 'Total Matches', value: alerts.reduce((s, a) => s + a.matched, 0), color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Paused', value: alerts.filter(a => !a.active).length, color: 'text-gray-600 bg-gray-100' },
          ].map(stat => (
            <div key={stat.label} className={clsx('rounded-2xl p-4 text-center', stat.color)}>
              <p className="text-2xl font-display font-black">{stat.value}</p>
              <p className="text-xs font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Alerts list */}
        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={clsx('card p-5 transition-all', !alert.active && 'opacity-60')}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', alert.active ? 'bg-brand-100 dark:bg-brand-900/30' : 'bg-gray-100 dark:bg-gray-800')}>
                    <Bell className={clsx('w-5 h-5', alert.active ? 'text-brand-600' : 'text-gray-400')} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{alert.name}</h3>
                      <Badge variant={alert.active ? 'green' : 'default'}>{alert.active ? 'Active' : 'Paused'}</Badge>
                    </div>
                    <p className="text-xs text-brand-600 font-medium">{alert.keywords}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location || 'Any location'}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.frequency}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{alert.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{alert.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-display font-black text-gray-900 dark:text-white">{alert.matched}</p>
                    <p className="text-xs text-gray-400">matches</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleAlert(alert.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      {alert.active ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5 text-gray-400" />}
                    </button>
                    <button onClick={() => { setEditAlert(alert); setForm({ name: alert.name, keywords: alert.keywords, location: alert.location, frequency: alert.frequency, salary: alert.salary, type: alert.type }); setCreateOpen(true) }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-brand-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteAlert(alert.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                <span>Last sent: {alert.lastSent}</span>
                <button className="text-brand-600 font-medium hover:text-brand-700">View matches →</button>
              </div>
            </motion.div>
          ))}

          {alerts.length === 0 && (
            <div className="card p-16 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-500">No job alerts yet</p>
              <p className="text-sm text-gray-400 mb-4">Create alerts to get notified about new matching jobs</p>
              <Button variant="primary" icon={Plus} onClick={() => setCreateOpen(true)}>Create Your First Alert</Button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title={editAlert ? 'Edit Alert' : 'Create Job Alert'} size="md">
        <div className="space-y-4">
          <Input label="Alert Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Remote React Jobs" />
          <Input label="Keywords *" value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} placeholder="e.g. React.js, Frontend Developer" />
          <Input label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Bengaluru, Remote" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Frequency" value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })}
              options={['Instant', 'Daily', 'Weekly']} />
            <Select label="Job Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              options={['Full-time', 'Part-time', 'Contract', 'Internship', 'Any']} />
          </div>
          <Select label="Minimum Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}
            options={['Any', '5+ LPA', '10+ LPA', '15+ LPA', '20+ LPA', '30+ LPA', '50+ LPA']} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)} className="flex-1 justify-center">Cancel</Button>
            <Button variant="primary" onClick={handleSave} className="flex-1 justify-center" icon={Bell}>
              {editAlert ? 'Update Alert' : 'Create Alert'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
