import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Users, Star, Archive } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { STUDENTS } from '../../data'
import { Avatar, Badge, PageHeader } from '../../components/ui'
import clsx from 'clsx'

const CONVERSATIONS = STUDENTS.slice(0, 8).map((s, i) => ({
  id: s.id,
  name: s.name,
  avatar: s.avatar,
  lastMessage: [
    'Thank you for reaching out! I\'m very interested.',
    'Could you share more details about the role?',
    'I\'m available for an interview next week.',
    'I\'ve reviewed the JD and it looks great!',
    'When can we schedule a technical call?',
  ][i % 5],
  time: ['Just now', '5m ago', '1h ago', '3h ago', '1d ago', 'Mon', 'Sun', 'Sat'][i],
  unread: [2, 0, 1, 0, 0, 0, 0, 0][i],
  job: ['Senior Frontend Developer', 'ML Engineer', 'Product Manager', 'UI/UX Designer', 'Backend Engineer'][i % 5],
  starred: i % 3 === 0,
}))

const CHAT_MSGS = [
  { id: 1, from: 'them', text: 'Hi! I saw your job posting for Senior Frontend Developer and I\'m really interested.', time: '10:00 AM' },
  { id: 2, from: 'them', text: 'I have 4 years of React experience and have worked at Razorpay. Would love to discuss!', time: '10:01 AM' },
  { id: 3, from: 'me', text: 'Hi Arjun! Thanks for reaching out. Your profile looks impressive.', time: '10:30 AM' },
  { id: 4, from: 'me', text: 'Would you be available for a technical interview this Thursday at 10 AM?', time: '10:31 AM' },
  { id: 5, from: 'them', text: 'Thursday at 10 AM works perfectly for me! Should I prepare anything specific?', time: '11:00 AM' },
  { id: 6, from: 'me', text: 'Please prepare for React/TypeScript questions and a small system design problem. We\'ll send you the calendar invite shortly.', time: '11:15 AM' },
]

export default function EmployerMessagesPage() {
  const [activeConv, setActiveConv] = useState(0)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(CHAT_MSGS)
  const [search, setSearch] = useState('')

  const sendMessage = () => {
    if (!message.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: 'Thanks for the update! Looking forward to the interview.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 1500)
  }

  const filtered = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const active = CONVERSATIONS[activeConv]

  return (
    <EmployerLayout>
      <PageHeader title="Messages" subtitle={`${CONVERSATIONS.reduce((s, c) => s + c.unread, 0)} unread messages`} />
      <div className="card overflow-hidden" style={{ height: '70vh' }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 border-r border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="p-3 border-b border-gray-100 dark:border-gray-800 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates..." className="input pl-9 text-sm py-2" />
              </div>
              <div className="flex gap-1">
                {['All', 'Unread', 'Starred'].map(f => (
                  <button key={f} className="flex-1 py-1 text-xs font-medium rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{f}</button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {filtered.map((conv, i) => (
                <div key={conv.id} onClick={() => setActiveConv(i)}
                  className={clsx('flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800/50',
                    activeConv === i && 'bg-brand-50 dark:bg-brand-900/20')}>
                  <div className="relative flex-shrink-0">
                    <Avatar src={conv.avatar} name={conv.name} size="sm" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{conv.name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-brand-600 truncate mt-0.5">{conv.job}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {conv.unread > 0 && <span className="w-4 h-4 bg-brand-600 rounded-full flex items-center justify-center text-xs text-white font-bold">{conv.unread}</span>}
                    {conv.starred && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={active?.avatar} name={active?.name} size="sm" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{active?.name}</p>
                  <p className="text-xs text-brand-600">{active?.job}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[Phone, Video, Users, Archive, MoreVertical].map((Icon, i) => (
                  <button key={i} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className={clsx('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                  {msg.from !== 'me' && <Avatar src={active?.avatar} name={active?.name} size="xs" className="mr-2 self-end flex-shrink-0" />}
                  <div className={clsx('max-w-sm px-4 py-2.5 rounded-2xl text-sm',
                    msg.from === 'me' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 rounded-bl-sm')}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={clsx('text-xs mt-1', msg.from === 'me' ? 'text-brand-200' : 'text-gray-400')}>{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 focus-within:border-brand-400 transition-colors">
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                    rows={1} placeholder="Type a message..." className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 resize-none max-h-20" />
                  <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"><Paperclip className="w-4 h-4" /></button>
                </div>
                <button onClick={sendMessage} disabled={!message.trim()}
                  className="w-11 h-11 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployerLayout>
  )
}
