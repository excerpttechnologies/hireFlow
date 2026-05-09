import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Check, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

// ---- Button ----
export function Button({ children, variant = 'primary', size = 'md', loading, icon: Icon, className, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-md hover:shadow-glow',
    secondary: 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-50',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-md',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md',
  }
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} disabled={loading} {...props}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}

// ---- Badge ----
export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    brand: 'bg-brand-100 text-brand-700',
  }
  return <span className={clsx('badge', variants[variant], className)}>{children}</span>
}

// ---- Status Badge ----
export function StatusBadge({ status }) {
  const map = {
    active: { label: 'Active', v: 'green' },
    applied: { label: 'Applied', v: 'blue' },
    shortlisted: { label: 'Shortlisted', v: 'purple' },
    interview: { label: 'Interview', v: 'yellow' },
    offer: { label: 'Offer', v: 'green' },
    rejected: { label: 'Rejected', v: 'red' },
    hold: { label: 'On Hold', v: 'orange' },
    pending: { label: 'Pending', v: 'yellow' },
    approved: { label: 'Approved', v: 'green' },
    blocked: { label: 'Blocked', v: 'red' },
    draft: { label: 'Draft', v: 'default' },
    closed: { label: 'Closed', v: 'red' },
    open: { label: 'Open', v: 'blue' },
    'in-progress': { label: 'In Progress', v: 'yellow' },
    resolved: { label: 'Resolved', v: 'green' },
    suspended: { label: 'Suspended', v: 'red' },
    verified: { label: 'Verified', v: 'green' },
  }
  const { label, v } = map[status] || { label: status, v: 'default' }
  return <Badge variant={v}>{label}</Badge>
}

// ---- Card ----
export function Card({ children, className, hover = false, ...props }) {
  return (
    <div className={clsx('card', hover && 'hover:shadow-card-hover transition-shadow duration-200 cursor-pointer', className)} {...props}>
      {children}
    </div>
  )
}

// ---- Input ----
export function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
        <input className={clsx('input', Icon && 'pl-10', error && 'border-red-400 focus:border-red-400', className)} {...props} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ---- Select ----
export function Select({ label, options, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <select className={clsx('input appearance-none', className)} {...props}>
        {options.map(opt => (
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// ---- Textarea ----
export function Textarea({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <textarea className={clsx('input resize-none', className)} {...props} />
    </div>
  )
}

// ---- Modal ----
export function Modal({ open, onClose, title, children, size = 'md' }) {
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl', full: 'max-w-[95vw]' }
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className={clsx('relative w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto', sizes[size])}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ---- Drawer ----
export function Drawer({ open, onClose, title, children, side = 'right' }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className={clsx('relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col', side === 'right' ? 'ml-auto' : 'mr-auto')}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ---- Tabs ----
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
      {tabs.map(tab => (
        <button key={tab.value || tab} onClick={() => onChange(tab.value || tab)}
          className={clsx('px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            (active === (tab.value || tab)) ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900')}>
          {tab.label || tab}
        </button>
      ))}
    </div>
  )
}

// ---- Skeleton ----
export function Skeleton({ className }) {
  return <div className={clsx('skeleton', className)} />
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

// ---- Stat Card ----
export function StatCard({ title, value, change, icon: Icon, color = 'brand', trend = 'up' }) {
  const colors = {
    brand: 'from-brand-500 to-brand-600',
    green: 'from-emerald-400 to-emerald-600',
    orange: 'from-orange-400 to-orange-600',
    purple: 'from-purple-500 to-purple-700',
    red: 'from-red-400 to-red-600',
    blue: 'from-blue-400 to-blue-600',
  }
  return (
    <motion.div whileHover={{ y: -2 }} className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={clsx('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center', colors[color])}>
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1">
          <span className={clsx('text-xs font-semibold', trend === 'up' ? 'text-emerald-600' : 'text-red-500')}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}
    </motion.div>
  )
}

// ---- Empty State ----
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">{icon || '📭'}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title || 'Nothing here yet'}</h3>
      <p className="text-gray-500 text-sm max-w-xs mb-6">{description}</p>
      {action}
    </div>
  )
}

// ---- Avatar ----
export function Avatar({ src, name, size = 'md' }) {
  const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' }
  const initials = name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  if (src) return <img src={src} alt={name} className={clsx('rounded-full object-cover', sizes[size])} />
  return (
    <div className={clsx('rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold', sizes[size])}>
      {initials}
    </div>
  )
}

// ---- Progress ----
export function Progress({ value, max = 100, className, color = 'brand' }) {
  const pct = Math.round((value / max) * 100)
  const colors = { brand: 'bg-brand-500', green: 'bg-emerald-500', orange: 'bg-orange-500', red: 'bg-red-500' }
  return (
    <div className={clsx('h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden', className)}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
        className={clsx('h-full rounded-full', colors[color])} />
    </div>
  )
}

// ---- Tag ----
export function Tag({ children, onRemove }) {
  return (
    <span className="tag group gap-1">
      {children}
      {onRemove && (
        <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 ml-0.5 hidden group-hover:inline">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}

// ---- Table ----
export function Table({ columns, data, onRowClick }) {
  if (!data?.length) return <EmptyState icon="📋" title="No records found" description="No data to display" />
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            {columns.map(col => (
              <th key={col.key} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} onClick={() => onRowClick?.(row)}
              className={clsx('border-b border-gray-50 dark:border-gray-800/50 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-brand-50/40 dark:hover:bg-gray-800/50')}>
              {columns.map(col => (
                <td key={col.key} className="py-3 px-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---- Confirm Dialog ----
export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', variant = 'danger' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={() => { onConfirm(); onClose() }}>{confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  )
}

// ---- Page Header ----
export function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        {breadcrumb && <p className="text-xs text-gray-400 mb-1">{breadcrumb}</p>}
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}

// ---- Search Bar ----
export function SearchBar({ value, onChange, placeholder, className }) {
  return (
    <div className={clsx('relative', className)}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'}
        className="input pl-9 h-9" />
    </div>
  )
}

// ---- Pagination ----
export function Pagination({ page, total, perPage = 10, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">Showing {((page-1)*perPage)+1}–{Math.min(page*perPage, total)} of {total}</p>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(page - 1)} disabled={page === 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors text-sm">←</button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const p = page <= 3 ? i + 1 : page - 2 + i
          if (p < 1 || p > totalPages) return null
          return (
            <button key={p} onClick={() => onChange(p)}
              className={clsx('w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                p === page ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600')}>
              {p}
            </button>
          )
        })}
        <button onClick={() => onChange(page + 1)} disabled={page === totalPages} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors text-sm">→</button>
      </div>
    </div>
  )
}

// ---- Match Meter ----
export function MatchMeter({ value }) {
  const color = value >= 80 ? 'text-emerald-600' : value >= 60 ? 'text-yellow-600' : 'text-gray-500'
  const bg = value >= 80 ? 'bg-emerald-500' : value >= 60 ? 'bg-yellow-400' : 'bg-gray-400'
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={clsx('h-full rounded-full', bg)} style={{ width: `${value}%` }} />
      </div>
      <span className={clsx('text-xs font-bold', color)}>{value}%</span>
    </div>
  )
}

// ---- Company Logo Badge ----
export function CompanyLogo({ name, color, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-14 h-14 text-xl', xl: 'w-20 h-20 text-3xl' }
  return (
    <div className={clsx('rounded-xl flex items-center justify-center font-bold text-white shadow-sm', sizes[size])}
      style={{ backgroundColor: color }}>
      {name?.[0]}
    </div>
  )
}
