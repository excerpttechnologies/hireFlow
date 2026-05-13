import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RefreshCw, Mic, Paperclip, ThumbsUp, ThumbsDown, Copy } from 'lucide-react'
import StudentNavbar from '../../components/layout/StudentNavbar'
import { Button, PageHeader } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const SUGGESTED_PROMPTS = [
  'How do I transition from frontend to full-stack?',
  'Review my resume for a Google SDE role',
  'What skills should I learn in 2025?',
  'Help me prepare for system design interviews',
  'How to negotiate a higher salary?',
  'Write a cold email to a recruiter at Flipkart',
]

const INITIAL_MESSAGES = [
  {
    id: 1, role: 'assistant',
    content: `👋 Hi Arjun! I'm your AI Career Coach powered by TodayJobs AI.\n\nI can help you with:\n• **Resume** feedback and optimization\n• **Interview** preparation and mock questions\n• **Career path** guidance and skill recommendations\n• **Salary** negotiation strategies\n• **Job search** tips and outreach templates\n\nWhat would you like to work on today?`,
    timestamp: new Date().toLocaleTimeString(),
  }
]

const AI_RESPONSES = {
  default: `Based on your profile and goals, here's my advice:\n\n1. **Skill Enhancement**: Focus on strengthening your system design knowledge. Companies like Google, Flipkart, and CRED heavily test this.\n\n2. **Portfolio Projects**: Add 2-3 high-impact projects that demonstrate real-world problem solving.\n\n3. **Networking**: Connect with 5 senior engineers in your target companies on LinkedIn weekly.\n\nWould you like me to dive deeper into any of these areas?`,
  transition: `**Frontend to Full-Stack Transition Roadmap:**\n\n**Month 1-2:** Master Node.js + Express\n• Build REST APIs from scratch\n• Learn authentication (JWT, OAuth)\n\n**Month 3:** Database Skills\n• SQL (PostgreSQL) for structured data\n• MongoDB for flexible schemas\n\n**Month 4-5:** Deploy & Scale\n• AWS basics (EC2, S3, RDS)\n• Docker containers\n• Basic CI/CD with GitHub Actions\n\n**Recommended Projects:**\n1. Build a full-stack job portal (meta!)\n2. Create an e-commerce backend\n3. Real-time chat with WebSockets\n\nYou're already 40% there with React skills! 🚀`,
  resume: `**Resume Review for Google SDE Role:**\n\n✅ **Strengths:**\n• Strong React.js experience at Razorpay\n• Google internship is a huge differentiator\n• Good CGPA from VIT\n\n⚠️ **Areas to Improve:**\n• Add more **quantifiable achievements** (e.g., "Reduced load time by 40%")\n• Include **system design** experience\n• Add **DSA contest rankings** if applicable\n\n🎯 **Keywords to Add:**\n• Distributed systems, Scalability, Performance optimization\n\n**ATS Score Estimate:** 78/100 (Can reach 90+ with these changes)`,
  salary: `**Salary Negotiation for Senior Dev Roles:**\n\n**Research first:** Your target range based on your experience:\n• Tier 1 Startups: ₹25-40 LPA\n• FAANG India: ₹40-60 LPA\n\n**Script for negotiation:**\n> "Based on my research and my experience at Razorpay, I was expecting something in the range of ₹X-Y. Is there flexibility here?"\n\n**Key tips:**\n1. Never give a number first\n2. Get the full offer in writing\n3. Negotiate base, ESOPs, and joining bonus separately\n4. Use competing offers as leverage\n\nWant me to roleplay a negotiation scenario? 💪`,
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.includes('transition') || lower.includes('full-stack')) return AI_RESPONSES.transition
  if (lower.includes('resume') || lower.includes('review')) return AI_RESPONSES.resume
  if (lower.includes('salary') || lower.includes('negotiat')) return AI_RESPONSES.salary
  return AI_RESPONSES.default
}

export default function AICareerCoach() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text = input) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), role: 'user', content: text, timestamp: new Date().toLocaleTimeString() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    const aiMsg = { id: Date.now() + 1, role: 'assistant', content: getAIResponse(text), timestamp: new Date().toLocaleTimeString() }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-gray-900 dark:text-white mt-2">{line.replace(/\*\*/g, '')}</p>
      }
      if (line.startsWith('• ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        return <p key={i} className="ml-3 text-sm">{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
      }
      if (line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('🎯')) {
        return <p key={i} className="font-semibold mt-2 text-sm">{line}</p>
      }
      if (line.startsWith('> ')) {
        return <blockquote key={i} className="border-l-4 border-brand-400 pl-3 italic text-sm text-gray-600 dark:text-gray-400 my-2">{line.slice(2)}</blockquote>
      }
      return <p key={i} className="text-sm leading-relaxed">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StudentNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <PageHeader
          title="AI Career Coach"
          subtitle="Your personal AI advisor for career growth"
          actions={
            <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => { setMessages(INITIAL_MESSAGES); toast.success('Conversation reset') }}>
              New Chat
            </Button>
          }
        />

        {/* Suggestions */}
        <div className="flex gap-2 flex-wrap mb-5">
          {SUGGESTED_PROMPTS.map(prompt => (
            <button key={prompt} onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:border-brand-400 hover:text-brand-600 transition-colors">
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat */}
        <div className="card flex flex-col" style={{ height: '60vh' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={clsx('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
                {/* Avatar */}
                <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm',
                  msg.role === 'assistant' ? 'bg-gradient-to-br from-brand-500 to-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300')}>
                  {msg.role === 'assistant' ? '🤖' : '👤'}
                </div>

                {/* Bubble */}
                <div className={clsx('max-w-[80%] rounded-2xl px-4 py-3 space-y-1',
                  msg.role === 'assistant' ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300' : 'bg-brand-600 text-white')}>
                  {renderContent(msg.content)}
                  <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-gray-100/50">
                    <span className="text-xs opacity-50">{msg.timestamp}</span>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Copied!') }} className="opacity-50 hover:opacity-100 transition-opacity">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="opacity-50 hover:opacity-100 transition-opacity text-emerald-500"><ThumbsUp className="w-3.5 h-3.5" /></button>
                        <button className="opacity-50 hover:opacity-100 transition-opacity text-red-500"><ThumbsDown className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-sm">🤖</div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 dark:border-gray-800 p-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 focus-within:border-brand-400 transition-colors">
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }}}
                  placeholder="Ask me anything about your career..."
                  rows={1} className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 resize-none max-h-24 placeholder-gray-400"
                />
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-400">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-400">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                className="w-11 h-11 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-colors flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">AI Career Coach · Powered by TodayJobs AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}
