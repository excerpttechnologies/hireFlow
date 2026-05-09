# 🚀 HireFlow — AI-Powered Job Portal

A **production-quality**, full-featured job portal built with React.js + Vite + Tailwind CSS.

## ✨ What's Included

### 🌐 Public Website
- Landing Page with animated hero, job search, stats counter, categories, featured jobs, testimonials, pricing, FAQ, CTA
- About, Contact, Blog (list + detail), Help Center, Privacy, Terms, Careers, 404

### 🔐 Authentication
- Student / Employer Login & Register (multi-step)
- Admin Login, Forgot Password, OTP Verification

### 👨‍🎓 Student Panel (Top Navbar)
- **Dashboard** — Stats, activity charts, recommended jobs, application tracker
- **Profile** — Full profile with photo, headline, skills, experience, education, projects, certifications
- **Jobs** — Advanced search with 8+ filters, job cards with match %, save, easy apply
- **Job Details** — Full job page with apply modal, company info, similar jobs
- **Applications** — Pipeline tracker with kanban stages, status filter, CSV export
- **AI Resume Score** — ATS analysis with breakdown, missing keywords, report download
- **AI Resume Builder** — 4-template picker, multi-step form, AI generation
- **AI Career Coach** — Real-time chat with suggested prompts, markdown responses
- **Messages** — Full chat UI with recruiter threads
- **Interviews** — List view + Calendar view with join meeting links
- Settings, Notifications, Alerts, Saved Jobs, Certificates, Skill Tests

### 🏢 Employer Panel (Sidebar + Topbar)
- **Dashboard** — Stats, application trend, hiring pipeline, recent applicants, AI insights
- **Post Job** — 4-step wizard: Basic Info → Job Details → Location → Description
- **All Jobs** — Table with status filters, search, toggle active/closed, duplicate, delete
- **Applicants** — Table + Kanban board views, AI scoring bar, shortlist/reject/hold actions, candidate detail modal
- **AI Tools** — AI Resume Matching, Candidate Scoring, Auto Shortlisting, Screening Questions, Interview Generator
- **Analytics** — Application trends, source breakdown, time-to-hire, top performing jobs
- **Billing** — Current plan usage, payment method, invoice history, upgrade modal
- Calendar, Messages, Email Campaigns, Company Profile, Team Members

### 🛡️ Admin Panel (Dark Sidebar)
- **Dashboard** — Platform stats, user growth charts, revenue breakdown, pending approvals, support tickets, activity feed
- **Companies** — Table with approve/block actions, company detail modal
- **Students** — Table with suspend/activate actions
- **Jobs** — Moderation table with approve/remove actions
- **Revenue** — MRR/ARR metrics, revenue chart, plan breakdown, top customers
- Categories, Locations, Blog CMS, Banners, Testimonials, Email Templates, Audit Logs, AI Fraud Detection, Roles

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| Tailwind CSS 3 | Styling |
| React Router DOM 6 | Routing |
| Framer Motion 11 | Animations |
| Recharts 2 | Charts |
| Lucide React | Icons |
| React Hot Toast | Notifications |

## 📦 Installation & Setup

```bash
# 1. Navigate to project
cd jobportal

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

## 🚀 Quick Navigation Guide

| URL | Description |
|-----|-------------|
| `/` | Landing Page |
| `/jobs` | Jobs Listing |
| `/jobs/1` | Job Details |
| `/login/student` | Student Login |
| `/login/employer` | Employer Login |
| `/register/student` | Student Register |
| `/register/employer` | Employer Register |
| `/admin/login` | Admin Login |
| `/student/dashboard` | Student Dashboard |
| `/student/profile` | Student Profile |
| `/student/applications` | Application Tracker |
| `/student/resume-score` | AI Resume Score |
| `/student/ai-resume` | AI Resume Builder |
| `/student/ai-coach` | AI Career Coach |
| `/student/messages` | Messages |
| `/student/interviews` | Interviews + Calendar |
| `/employer/dashboard` | Employer Dashboard |
| `/employer/post-job` | Post New Job |
| `/employer/jobs` | All Jobs |
| `/employer/applicants` | Applicants (Table + Kanban) |
| `/employer/ai-tools` | AI Hiring Suite |
| `/employer/analytics` | Analytics |
| `/employer/billing` | Billing |
| `/admin/dashboard` | Admin Dashboard |
| `/admin/companies` | Manage Companies |
| `/admin/students` | Manage Students |
| `/admin/jobs` | Job Moderation |
| `/admin/revenue` | Revenue Dashboard |
| `/about` | About Us |
| `/contact` | Contact |
| `/blog` | Blog |
| `/help` | Help Center |

## 🎨 Design Features

- ✅ Dark / Light mode toggle
- ✅ Glassmorphism + soft shadows
- ✅ Gradient buttons with hover glow
- ✅ Framer Motion page transitions
- ✅ Skeleton loaders
- ✅ Toast notifications
- ✅ Confirmation modals
- ✅ Drawer / Slide-over panels
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Premium fonts (Plus Jakarta Sans + Syne)
- ✅ Recharts data visualizations
- ✅ Kanban board with drag-ready cards
- ✅ Multi-step forms with progress
- ✅ Real-time search filtering on dummy data

## 📁 Folder Structure

```
src/
├── components/
│   ├── ui/          # Reusable: Button, Modal, Card, Table, etc.
│   └── layout/      # Navbars, Sidebars, Footers
├── context/         # ThemeContext, AuthContext
├── data/            # All dummy data (jobs, companies, students, etc.)
├── pages/
│   ├── public/      # Landing, Jobs, About, Blog, etc.
│   ├── auth/        # Login, Register, OTP, etc.
│   ├── student/     # All student panel pages
│   ├── employer/    # All employer panel pages
│   └── admin/       # All admin panel pages
└── App.jsx          # All routes registered
```

## 🔧 Extending the Project

To add a backend:
1. Replace `src/data/index.js` imports with API calls
2. Add axios/react-query for data fetching
3. Replace toast success messages with real API responses
4. Add JWT token handling in AuthContext

---

Built with ❤️ — HireFlow 2025
