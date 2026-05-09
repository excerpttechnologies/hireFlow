import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageSquare, Clock, CheckCircle, AlertTriangle, Eye, Reply } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { SUPPORT_TICKETS } from '../../data'
import { Button, Badge, StatusBadge, SearchBar, Tabs, Pagination, PageHeader, Modal } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const PRIORITY_COLORS = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-gray-100 text-gray-600',
}

const SAMPLE_TICKETS = [
  ...SUPPORT_TICKETS,
  { id: 'TKT006', user: 'Kavya Nair', email: 'kavya@email.com', subject: 'Job application not showing up', status: 'open', priority: 'medium', created: '2025-02-06', category: 'Jobs' },
  { id: 'TKT007', user: 'Google HR', email: 'hr@google.com', subject: 'Bulk upload candidates feature request', status: 'in-progress', priority: 'low', created: '2025-02-06', category: 'Feature' },
  { id: 'TKT008', user: 'Rohan Gupta', email: 'rohan@email.com', subject: 'Resume not parsing correctly', status: 'open', priority: 'high', created: '2025-02-07', category: 'Technical' },
]

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState(SAMPLE_TICKETS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [replyText, setReplyText] = useState('')

  const STATUS_TABS = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Resolved', value: 'resolved' },
  ]

  const filtered = tickets.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.user.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const updateTicket = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    toast.success(`Ticket ${status}!`)
  }

  const handleReply = () => {
    if (!replyText.trim()) return
    toast.success('Reply sent to user!')
    setReplyText('')
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Support Tickets"
        subtitle={`${tickets.filter(t => t.status === 'open').length} open tickets`}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Open', count: tickets.filter(t => t.status === 'open').length, color: 'bg-red-50 text-red-700' },
          { label: 'In Progress', count: tickets.filter(t => t.status === 'in-progress').length, color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Resolved', count: tickets.filter(t => t.status === 'resolved').length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Avg Response', count: '3.2h', color: 'bg-brand-50 text-brand-700' },
        ].map(stat => (
          <div key={stat.label} className={clsx('rounded-xl p-4 flex justify-between items-center', stat.color)}>
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-xl font-display font-black">{stat.count}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Tabs tabs={STATUS_TABS} active={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} />
        <div className="flex-1" />
        <SearchBar value={search} onChange={setSearch} placeholder="Search tickets..." className="w-full sm:w-64" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['Ticket ID', 'User', 'Subject', 'Category', 'Priority', 'Status', 'Created', 'Actions'].map(col => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((ticket, i) => (
                <motion.tr key={ticket.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">{ticket.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900 dark:text-white text-xs">{ticket.user}</p>
                    <p className="text-xs text-gray-400">{ticket.email}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-[200px] truncate text-xs">{ticket.subject}</td>
                  <td className="py-3 px-4">
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs">{ticket.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={clsx('badge text-xs capitalize', PRIORITY_COLORS[ticket.priority])}>{ticket.priority}</span>
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={ticket.status} /></td>
                  <td className="py-3 px-4 text-gray-400 text-xs whitespace-nowrap">{ticket.created}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedTicket(ticket)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'resolved' && (
                        <button onClick={() => updateTicket(ticket.id, 'resolved')}
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors" title="Resolve">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {ticket.status === 'open' && (
                        <button onClick={() => updateTicket(ticket.id, 'in-progress')}
                          className="p-1.5 rounded-lg hover:bg-yellow-50 text-gray-400 hover:text-yellow-600 transition-colors" title="Mark In Progress">
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tickets found</p>
          </div>
        )}
      </div>
      <Pagination page={page} total={filtered.length} perPage={10} onChange={setPage} />

      <Modal open={!!selectedTicket} onClose={() => setSelectedTicket(null)} title="Ticket Details" size="md">
        {selectedTicket && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-gray-400 mb-1">{selectedTicket.id}</p>
                <h3 className="font-display font-bold text-gray-900 dark:text-white">{selectedTicket.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedTicket.user} · {selectedTicket.email}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <StatusBadge status={selectedTicket.status} />
                <span className={clsx('badge text-xs capitalize', PRIORITY_COLORS[selectedTicket.priority])}>{selectedTicket.priority} priority</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white mb-2">Issue Description:</p>
              <p>The user is experiencing an issue with: {selectedTicket.subject.toLowerCase()}. This was reported on {selectedTicket.created} and has been categorized under {selectedTicket.category}.</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Reply to User</p>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={4}
                placeholder="Type your reply..." className="input resize-none text-sm" />
            </div>

            <div className="flex gap-2">
              <Button variant="primary" icon={Reply} onClick={handleReply} className="flex-1 justify-center">Send Reply</Button>
              {selectedTicket.status !== 'resolved' && (
                <Button variant="success" icon={CheckCircle} onClick={() => { updateTicket(selectedTicket.id, 'resolved'); setSelectedTicket(null) }}>
                  Resolve
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}
