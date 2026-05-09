import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Check, Download, AlertCircle, ChevronRight, Zap } from 'lucide-react'
import EmployerLayout from '../../components/layout/EmployerLayout'
import { EMPLOYER_PLANS } from '../../data'
import { Button, Badge, PageHeader, Modal } from '../../components/ui'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const BILLING_HISTORY = [
  { id: 'INV-2025-012', date: 'Feb 1, 2025', amount: 7999, plan: 'Growth Plan', status: 'paid' },
  { id: 'INV-2025-011', date: 'Jan 1, 2025', amount: 7999, plan: 'Growth Plan', status: 'paid' },
  { id: 'INV-2024-010', date: 'Dec 1, 2024', amount: 7999, plan: 'Growth Plan', status: 'paid' },
  { id: 'INV-2024-009', date: 'Nov 1, 2024', amount: 2999, plan: 'Starter Plan', status: 'paid' },
  { id: 'INV-2024-008', date: 'Oct 1, 2024', amount: 2999, plan: 'Starter Plan', status: 'paid' },
]

export default function BillingPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const currentPlan = EMPLOYER_PLANS[1]

  return (
    <EmployerLayout>
      <PageHeader title="Billing & Subscription" subtitle="Manage your plan and payment details" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Current Plan */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Growth Plan</h2>
                <Badge variant="green">Active</Badge>
              </div>
              <p className="text-gray-500 text-sm">Your plan renews on March 1, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-display font-black text-gray-900 dark:text-white">₹7,999</p>
              <p className="text-sm text-gray-400">/month</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Active Jobs', used: 8, total: 15 },
              { label: 'Applications', used: 312, total: 500 },
              { label: 'AI Shortlists', used: 23, total: 50 },
              { label: 'Team Members', used: 3, total: 5 },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-2">{item.label}</p>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-1">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(item.used / item.total) * 100}%` }} />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.used}/{item.total}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" icon={Zap} onClick={() => setUpgradeOpen(true)}>Upgrade to Enterprise</Button>
            <Button variant="outline" onClick={() => toast.success('Cancellation email sent')}>Cancel Plan</Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h3>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 text-white mb-4">
            <div className="flex justify-between items-start mb-8">
              <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-80" />
              <span className="text-xs text-gray-300">VISA</span>
            </div>
            <p className="font-mono text-sm tracking-widest mb-2">•••• •••• •••• 4242</p>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Rahul Sharma</span><span>12/27</span>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-center" icon={CreditCard}
            onClick={() => toast.success('Update payment method')}>
            Update Card
          </Button>
          <p className="text-xs text-center text-gray-400 mt-3">🔒 Secured by Razorpay</p>
        </div>
      </div>

      {/* Billing History */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-gray-900 dark:text-white">Billing History</h2>
          <Button variant="outline" icon={Download} size="sm" onClick={() => toast.success('Downloading invoices...')}>Download All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {['Invoice', 'Date', 'Plan', 'Amount', 'Status', 'Action'].map(col => (
                  <th key={col} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BILLING_HISTORY.map((inv, i) => (
                <tr key={inv.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-gray-600 dark:text-gray-400">{inv.id}</td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-400 text-xs">{inv.date}</td>
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300 text-xs">{inv.plan}</td>
                  <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">₹{inv.amount.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="badge bg-emerald-100 text-emerald-700">Paid</span>
                  </td>
                  <td className="py-3 px-3">
                    <button onClick={() => toast.success(`Downloading ${inv.id}`)}
                      className="text-brand-600 hover:text-brand-700 text-xs font-medium flex items-center gap-1">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Modal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} title="Choose Your Plan" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EMPLOYER_PLANS.map(plan => (
            <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
              className={clsx('card p-5 cursor-pointer transition-all', selectedPlan === plan.id && 'border-2 border-brand-500 ring-4 ring-brand-500/10')}>
              <h3 className="font-display font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-black text-gray-900 dark:text-white">₹{plan.price.toLocaleString()}</span>
                <span className="text-xs text-gray-400">/{plan.billing}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              {selectedPlan === plan.id && <Check className="w-5 h-5 text-brand-500 mx-auto" />}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <Button variant="outline" onClick={() => setUpgradeOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { toast.success('Plan upgraded!'); setUpgradeOpen(false) }}>
            Upgrade Now
          </Button>
        </div>
      </Modal>
    </EmployerLayout>
  )
}
