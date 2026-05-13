import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Briefcase,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button, Input } from "../../components/ui";
import toast from "react-hot-toast";

function AuthLayout({ children, title, subtitle, image }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-brand-950 to-gray-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/joblogo.png"
              alt="TodayJobs Logo"
              className="w-14 h-14 object-contain"
            />

            <span className="font-display font-bold text-2xl text-white">
              TodayJobs
            </span>
          </Link>
        </div>
        <div className="relative text-center">
          <div className="text-8xl mb-8">{image || "🚀"}</div>
          <h2 className="text-3xl font-display font-black text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
        <div className="relative flex items-center gap-4 flex-wrap">
          {["500K+ Job Seekers", "30K+ Companies", "85K+ Placements"].map(
            (stat) => (
              <div
                key={stat}
                className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm font-medium">{stat}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { type = "student" } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Logged in successfully!");
    if (type === "employer") navigate("/employer/dashboard");
    else navigate("/student/dashboard");
  };

  const isEmployer = type === "employer";

  return (
    <AuthLayout
      title={isEmployer ? "Hire Top Talent" : "Your Dream Job Awaits"}
      subtitle={
        isEmployer
          ? "Post jobs and hire the best candidates with AI assistance"
          : "Join 5 lakh+ professionals on India's smartest job portal"
      }
      image={isEmployer ? "🏢" : "💼"}
    >
      <div>
        <div className="mb-8">
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">
            {isEmployer ? "Employer Login" : "Welcome back!"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Don't have an account?{" "}
            <Link
              to={`/register/${type}`}
              className="text-brand-600 font-semibold hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Google", "LinkedIn"].map((provider) => (
            <button
              key={provider}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span>{provider === "Google" ? "🌐" : "💼"}</span> {provider}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-950 px-3 text-xs text-gray-400">
              or continue with email
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={Mail}
          />
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-brand-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-10 pr-10"
              />
              <button
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPwd ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={handleLogin}
            loading={loading}
            className="w-full justify-center py-3"
          >
            Login to TodayJobs
          </Button>
        </div>

        {!isEmployer && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Are you an employer?{" "}
            <Link
              to="/login/employer"
              className="text-brand-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const { type = "student" } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    role: "",
  });
  const isEmployer = type === "employer";

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Account created successfully!");
    navigate(`/onboarding/${type}`);
  };

  return (
    <AuthLayout
      title={isEmployer ? "Start Hiring Today" : "Launch Your Career"}
      subtitle="Create your account in 2 minutes"
      image={isEmployer ? "🏢" : "🎓"}
    >
      <div>
        <div className="mb-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white">
              {isEmployer ? "Employer Registration" : "Create Account"}
            </h1>
            <span className="text-xs text-gray-400">Step {step}/2</span>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1 mt-3">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {step === 1 ? (
            <>
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Arjun Sharma"
                icon={User}
              />
              <Input
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                icon={Mail}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                icon={Phone}
              />
              {isEmployer && (
                <Input
                  label="Company Name"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder="e.g. Infosys"
                  icon={Building2}
                />
              )}
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Min 8 characters"
                    className="input pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="input pl-10"
                  />
                </div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="accent-brand-600 mt-0.5" />
                <span className="text-xs text-gray-500">
                  I agree to the{" "}
                  <Link to="/terms" className="text-brand-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-brand-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </>
          )}

          <Button
            variant="primary"
            onClick={handleNext}
            loading={loading}
            className="w-full justify-center py-3"
          >
            {step === 1 ? "Continue" : "Create Account"}
          </Button>

          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back
            </button>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={`/login/${type}`}
              className="text-brand-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="We'll send you a reset link"
      image="🔐"
    >
      <div>
        <Link
          to="/login/student"
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Check your email
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link
              to="/login/student"
              className="btn-primary block text-center py-3 rounded-xl"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email and we'll send you a reset link.
            </p>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={Mail}
              />
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={loading}
                className="w-full justify-center py-3"
              >
                Send Reset Link
              </Button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (i, val) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleVerify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Email verified!");
    navigate("/student/dashboard");
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="Enter the OTP sent to your email"
      image="🔑"
    >
      <div>
        <h1 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
          OTP Verification
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          We sent a 6-digit code to <strong>ar****@gmail.com</strong>
        </p>
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((val, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 text-center text-lg font-bold border-2 rounded-xl focus:border-brand-500 outline-none transition-colors dark:bg-gray-800 dark:text-white"
            />
          ))}
        </div>
        <Button
          variant="primary"
          onClick={handleVerify}
          loading={loading}
          className="w-full justify-center py-3 mb-4"
        >
          Verify OTP
        </Button>
        <p className="text-center text-sm text-gray-500">
          Didn't receive it?{" "}
          <button className="text-brand-600 font-semibold hover:underline">
            Resend OTP
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Admin login successful!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="card p-8 bg-gray-900 border-gray-800">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-brand-500 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-display font-black text-white text-center mb-1">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Restricted access — authorized personnel only
          </p>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                defaultValue="admin@TodayJobs.in"
                className="input pl-10 bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                defaultValue="••••••••"
                className="input pl-10 bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleLogin}
              loading={loading}
              className="w-full justify-center py-3"
            >
              Sign In to Admin
            </Button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">
            <Link to="/" className="hover:text-gray-400 transition-colors">
              ← Back to TodayJobs
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
