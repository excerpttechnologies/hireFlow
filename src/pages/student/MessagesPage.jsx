import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { MESSAGES } from '../../data'
import clsx from 'clsx'

const CHAT_MESSAGES = [
  { id: 1, from: 'them', text: "Hi Arjun! I came across your profile and I'm really impressed with your work at Razorpay.", time: '10:15 AM', read: true },
  { id: 2, from: 'them', text: "We have an opening for a Senior Frontend Engineer at Google that I think you'd be a great fit for.", time: '10:16 AM', read: true },
  { id: 3, from: 'me', text: "Hi Priya! Thank you so much, that sounds really exciting!", time: '10:30 AM', read: true },
  { id: 4, from: 'me', text: "I'd love to learn more about the role. Could you share more details about the team and the tech stack?", time: '10:31 AM', read: true },
  { id: 5, from: 'them', text: "Of course! The team works on Google Workspace (Docs, Sheets, Slides). The tech stack is Angular + TypeScript on the frontend.", time: '10:45 AM', read: true },
  { id: 6, from: 'them', text: "The role is hybrid — 3 days in office (Hyderabad) and 2 days remote. CTC range is ₹45-55 LPA + ESOPs.", time: '10:46 AM', read: true },
  { id: 7, from: 'me', text: "That sounds amazing! I have experience with Angular from my Google internship too. When can we schedule a call?", time: '11:00 AM', read: false },
]

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(0)
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES)
  const [search, setSearch] = useState('')

  const sendMessage = () => {
    if (!message.trim()) return
    setChatMessages(prev => [...prev, { id: Date.now(), from: 'me', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false }])
    setMessage('')
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: "Thanks for your interest! I'll check my calendar and get back to you with available slots.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false }])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-5">Messages</h1>
        <div className="card overflow-hidden" style={{ height: '70vh' }}>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0 border-r border-gray-100 dark:border-gray-800 flex flex-col">
              <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search messages..." className="input pl-9 text-sm py-2" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {MESSAGES.filter(m => m.from.toLowerCase().includes(search.toLowerCase())).map((chat, i) => (
                  <div key={chat.id} onClick={() => setActiveChat(i)}
                    className={clsx('flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800/50',
                      activeChat === i && 'bg-brand-50 dark:bg-brand-900/20')}>
                    <div className="relative flex-shrink-0">
                      <img src={chat.avatar} alt={chat.from} className="w-10 h-10 rounded-full object-cover" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{chat.from}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{chat.message}</p>
                      <p className="text-xs text-brand-600 font-medium mt-0.5">{chat.company}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={MESSAGES[activeChat]?.avatar} alt="" className="w-9 h-9 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{MESSAGES[activeChat]?.from}</p>
                    <p className="text-xs text-emerald-600">Online · {MESSAGES[activeChat]?.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[Phone, Video, MoreVertical].map((Icon, i) => (
                    <button key={i} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {chatMessages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className={clsx('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                    {msg.from !== 'me' && (
                      <img src={MESSAGES[activeChat]?.avatar} alt="" className="w-7 h-7 rounded-full mr-2 flex-shrink-0 self-end" />
                    )}
                    <div className={clsx('max-w-sm px-4 py-2.5 rounded-2xl text-sm', msg.from === 'me'
                      ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 rounded-bl-sm')}>
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
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }}}
                      rows={1} placeholder="Type a message..." className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 resize-none max-h-24" />
                    <div className="flex gap-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><Smile className="w-4 h-4" /></button>
                    </div>
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
      </div>
    </div>
  )
}
