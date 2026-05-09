import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MapPin, CheckCircle, ChevronLeft, ChevronRight, Plus, ExternalLink } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Button, Badge, PageHeader, Modal, CompanyLogo } from '../../components/ui'
import { COMPANIES } from '../../data'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const INTERVIEWS = [
  {
    id: 1, company: 'Google', companyId: 1, role: 'Senior Frontend Developer',
    date: '2025-02-05', time: '10:00 AM', duration: '60 min', type: 'Video',
    round: 'Technical Round 1', interviewer: 'Priya M.', status: 'upcoming',
    link: 'https://meet.google.com/abc-xyz', notes: 'Prepare DSA + System Design'
  },
  {
    id: 2, company: 'Microsoft', companyId: 2, role: 'ML Engineer',
    date: '2025-02-07', time: '3:00 PM', duration: '45 min', type: 'Video',
    round: 'HR Round', interviewer: 'Rohit S.', status: 'upcoming',
    link: 'https://teams.microsoft.com/abc', notes: 'Discuss salary expectations'
  },
  {
    id: 3, company: 'Razorpay', companyId: 7, role: 'UI/UX Designer',
    date: '2025-01-28', time: '11:00 AM', duration: '60 min', type: 'In-person',
    round: 'Design Review', interviewer: 'Sneha K.', status: 'completed',
    link: '', notes: 'Went well! Awaiting feedback'
  },
  {
    id: 4, company: 'CRED', companyId: 8, role: 'Backend Engineer',
    date: '2025-01-20', time: '2:00 PM', duration: '90 min', type: 'Video',
    round: 'System Design', interviewer: 'Amit T.', status: 'completed',
    link: '', notes: 'Complex system design question on URL shortener'
  },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1))
  const [selectedDay, setSelectedDay] = useState(5)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const interviewDays = [5, 7, 15, 22]

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const selectedInterviews = INTERVIEWS.filter(i => {
    const d = new Date(i.date)
    return d.getDate() === selectedDay && d.getMonth() === month
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Calendar Grid */}
      <div className="lg:col-span-2 card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
          ))}
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1
            const hasInterview = interviewDays.includes(day)
            const isSelected = day === selectedDay
            const isToday = day === 1

            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={clsx('aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all relative',
                  isSelected ? 'bg-brand-600 text-white shadow-md' :
                  isToday ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 font-bold' :
                  'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300')}>
                {day}
                {hasInterview && !isSelected && (
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full absolute bottom-1.5" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {MONTHS[month]} {selectedDay} — Schedule
        </h3>
        {selectedInterviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm text-gray-500">No interviews scheduled</p>
            <Button variant="secondary" size="sm" className="mt-3" icon={Plus}>Add Event</Button>
          </div>
        ) : selectedInterviews.map(interview => {
          const company = COMPANIES.find(c => c.id === interview.companyId)
          return (
            <div key={interview.id} className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl border border-brand-100 dark:border-brand-700/30 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <CompanyLogo name={company?.name} color={company?.color} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{interview.company}</p>
                  <p className="text-xs text-brand-600">{interview.round}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{interview.time} · {interview.duration}</div>
                <div className="flex items-center gap-1.5"><Video className="w-3 h-3" />{interview.type}</div>
              </div>
              {interview.link && (
                <a href={interview.link} target="_blank" rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 text-xs text-brand-600 font-medium hover:underline">
                  <ExternalLink className="w-3 h-3" /> Join Meeting
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function InterviewsPage() {
  const [tab, setTab] = useState('list')
  const [selectedInterview, setSelectedInterview] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="Interviews"
          subtitle={`${INTERVIEWS.filter(i => i.status === 'upcoming').length} upcoming interviews`}
          actions={
            <div className="flex gap-2">
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                {['list', 'calendar'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={clsx('px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all',
                      tab === t ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm' : 'text-gray-500')}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          }
        />

        {tab === 'list' ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Upcoming</h3>
            {INTERVIEWS.filter(i => i.status === 'upcoming').map((interview, i) => {
              const company = COMPANIES.find(c => c.id === interview.companyId)
              return (
                <motion.div key={interview.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="card p-5 hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
                    <CompanyLogo name={company?.name} color={company?.color} size="lg" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-display font-bold text-gray-900 dark:text-white">{interview.role}</h3>
                          <p className="text-brand-600 font-medium text-sm">{interview.company} — {interview.round}</p>
                        </div>
                        <Badge variant="blue">{interview.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-500" />{interview.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-500" />{interview.time} ({interview.duration})</span>
                        {interview.type === 'In-person' && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-500" />Office</span>}
                      </div>
                      {interview.notes && (
                        <p className="mt-2 text-xs text-gray-400 italic">📝 {interview.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {interview.link && (
                        <a href={interview.link} target="_blank" rel="noopener noreferrer"
                          className="btn-primary text-xs py-2 px-3 rounded-xl flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5" /> Join
                        </a>
                      )}
                      <button onClick={() => setSelectedInterview(interview)}
                        className="btn-secondary text-xs py-2 px-3 rounded-xl">Details</button>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm mt-6">Completed</h3>
            {INTERVIEWS.filter(i => i.status === 'completed').map((interview, i) => {
              const company = COMPANIES.find(c => c.id === interview.companyId)
              return (
                <div key={interview.id} className="card p-5 opacity-70">
                  <div className="flex items-center gap-4">
                    <CompanyLogo name={company?.name} color={company?.color} size="md" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{interview.role}</p>
                      <p className="text-xs text-gray-500">{interview.company} · {interview.round} · {interview.date}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <CalendarView />
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selectedInterview} onClose={() => setSelectedInterview(null)} title="Interview Details" size="md">
        {selectedInterview && (
          <div className="space-y-4">
            <div className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <CompanyLogo name={COMPANIES.find(c => c.id === selectedInterview.companyId)?.name} color={COMPANIES.find(c => c.id === selectedInterview.companyId)?.color} size="md" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedInterview.company}</p>
                  <p className="text-sm text-brand-600">{selectedInterview.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Round', value: selectedInterview.round },
                  { label: 'Type', value: selectedInterview.type },
                  { label: 'Date', value: selectedInterview.date },
                  { label: 'Time', value: selectedInterview.time },
                  { label: 'Duration', value: selectedInterview.duration },
                  { label: 'Interviewer', value: selectedInterview.interviewer },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            {selectedInterview.notes && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">{selectedInterview.notes}</p>
              </div>
            )}
            {selectedInterview.link && (
              <a href={selectedInterview.link} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 py-3 rounded-xl text-sm">
                <Video className="w-4 h-4" /> Join Meeting
              </a>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
