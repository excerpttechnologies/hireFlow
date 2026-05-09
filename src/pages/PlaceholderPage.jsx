import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PlaceholderPage({ title = 'Coming Soon' }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-brand-500" />
        </div>
        <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          This page is fully designed and functional in the complete build.
          The route is registered and ready — content loads here in the full version.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 btn-secondary px-5 py-2.5 rounded-xl text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
