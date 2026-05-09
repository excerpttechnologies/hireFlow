import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

// Public Pages
import LandingPage from './pages/public/LandingPage'
import JobsPage from './pages/public/JobsPage'
import JobDetailsPage from './pages/public/JobDetailsPage'
import {
  AboutPage, ContactPage, BlogListPage, BlogDetailPage,
  HelpCenterPage, PrivacyPage, TermsPage, NotFoundPage, CareersPage
} from './pages/public/OtherPages'

// Auth Pages
import {
  LoginPage, RegisterPage, ForgotPasswordPage, OTPPage, AdminLoginPage
} from './pages/auth/AuthPages'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import ApplicationsPage from './pages/student/ApplicationsPage'
import { ResumeScorePage, AIResumeBuilderPage } from './pages/student/ResumePages'
import AICareerCoach from './pages/student/AICareerCoach'
import MessagesPage from './pages/student/MessagesPage'
import SettingsPage from './pages/student/SettingsPage'
import JobAlertsPage from './pages/student/JobAlertsPage'

// Employer Pages
import EmployerDashboard from './pages/employer/EmployerDashboard'
import PostJobPage from './pages/employer/PostJobPage'
import AllJobsPage from './pages/employer/AllJobsPage'
import ApplicantsPage from './pages/employer/ApplicantsPage'
import AIToolsPage from './pages/employer/AIToolsPage'
import EmployerAnalyticsPage from './pages/employer/EmployerAnalyticsPage'
import BillingPage from './pages/employer/BillingPage'

// Student extra pages
import InterviewsPage from './pages/student/InterviewsPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import { AdminCompaniesPage, AdminStudentsPage, AdminJobsPage } from './pages/admin/AdminManagementPages'
import AdminRevenuePage from './pages/admin/AdminRevenuePage'
import AdminTicketsPage from './pages/admin/AdminTicketsPage'
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage'
import CompanyProfilePage from './pages/employer/CompanyProfilePage'
import EmployerMessagesPage from './pages/employer/EmployerMessagesPage'

// Placeholder component for pages not yet built
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '12px', fontSize: '14px', fontWeight: 500 },
            }}
          />
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/internships" element={<PlaceholderPage title="Internships" />} />
            <Route path="/companies" element={<PlaceholderPage title="Companies" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />

            {/* Auth */}
            <Route path="/login/:type" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/:type" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/onboarding/:type" element={<PlaceholderPage title="Welcome Onboarding" />} />

            {/* Student */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/edit-profile" element={<PlaceholderPage title="Edit Profile" />} />
            <Route path="/student/jobs" element={<JobsPage />} />
            <Route path="/student/applications" element={<ApplicationsPage />} />
            <Route path="/student/internships" element={<PlaceholderPage title="Internships" />} />
            <Route path="/student/interviews" element={<InterviewsPage />} />
            <Route path="/student/alerts" element={<JobAlertsPage />} />
            <Route path="/student/messages" element={<MessagesPage />} />
            <Route path="/student/saved-jobs" element={<PlaceholderPage title="Saved Jobs" />} />
            <Route path="/student/resume" element={<PlaceholderPage title="Resume" />} />
            <Route path="/student/resume-score" element={<ResumeScorePage />} />
            <Route path="/student/ai-resume" element={<AIResumeBuilderPage />} />
            <Route path="/student/ai-coach" element={<AICareerCoach />} />
            <Route path="/student/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/student/settings" element={<SettingsPage />} />
            <Route path="/student/certificates" element={<PlaceholderPage title="Certificates" />} />
            <Route path="/student/skill-tests" element={<PlaceholderPage title="Skill Tests" />} />
            <Route path="/student/courses" element={<PlaceholderPage title="Course Recommendations" />} />
            <Route path="/student/calendar" element={<PlaceholderPage title="Calendar" />} />

            {/* Employer */}
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/post-job" element={<PostJobPage />} />
            <Route path="/employer/jobs" element={<AllJobsPage />} />
            <Route path="/employer/applicants" element={<ApplicantsPage />} />
            <Route path="/employer/ai-tools" element={<AIToolsPage />} />
            <Route path="/employer/profile" element={<CompanyProfilePage />} />
            <Route path="/employer/team" element={<PlaceholderPage title="Team Members" />} />
            <Route path="/employer/interviews" element={<PlaceholderPage title="Interviews" />} />
            <Route path="/employer/offers" element={<PlaceholderPage title="Offer Letters" />} />
            <Route path="/employer/messages" element={<EmployerMessagesPage />} />
            <Route path="/employer/campaigns" element={<PlaceholderPage title="Email Campaigns" />} />
            <Route path="/employer/calendar" element={<PlaceholderPage title="Calendar" />} />
            <Route path="/employer/analytics" element={<EmployerAnalyticsPage />} />
            <Route path="/employer/billing" element={<BillingPage />} />
            <Route path="/employer/settings" element={<PlaceholderPage title="Settings" />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/companies" element={<AdminCompaniesPage />} />
            <Route path="/admin/students" element={<AdminStudentsPage />} />
            <Route path="/admin/jobs" element={<AdminJobsPage />} />
            <Route path="/admin/analytics" element={<PlaceholderPage title="Global Analytics" />} />
            <Route path="/admin/revenue" element={<AdminRevenuePage />} />
            <Route path="/admin/tickets" element={<AdminTicketsPage />} />
            <Route path="/admin/blog" element={<PlaceholderPage title="Blog CMS" />} />
            <Route path="/admin/categories" element={<PlaceholderPage title="Categories" />} />
            <Route path="/admin/locations" element={<PlaceholderPage title="Locations" />} />
            <Route path="/admin/subscriptions" element={<PlaceholderPage title="Subscriptions" />} />
            <Route path="/admin/banners" element={<PlaceholderPage title="Banners" />} />
            <Route path="/admin/testimonials" element={<PlaceholderPage title="Testimonials" />} />
            <Route path="/admin/email-templates" element={<PlaceholderPage title="Email Templates" />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="/admin/fraud" element={<PlaceholderPage title="AI Fraud Detection" />} />
            <Route path="/admin/roles" element={<PlaceholderPage title="Roles & Permissions" />} />
            <Route path="/admin/settings" element={<PlaceholderPage title="System Settings" />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
