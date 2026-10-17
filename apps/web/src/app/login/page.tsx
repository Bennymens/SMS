"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// ── Role tab types ────────────────────────────────────────────────────────────
type Role = "admin" | "finance" | "teacher"

const roles: { id: Role; label: string }[] = [
  { id: "admin", label: "Admin" },
  { id: "finance", label: "Finance" },
  { id: "teacher", label: "Teacher" },
]

// Demo credentials keyed by role
const demoCredentials: Record<Role, { id: string; password: string; path: string }> = {
  admin: { id: "admin@school.edu", password: "admin123", path: "/admin" },
  finance: { id: "finance@school.edu", password: "finance123", path: "/portal/finance" },
  teacher: { id: "TCH-2024-042", password: "teacher123", path: "/portal/teacher" },
}

// Field labels per role
const fieldLabels: Record<Role, { id: string; placeholder: string }> = {
  admin: { id: "Email address or Mobile number", placeholder: "admin@school.edu" },
  finance: { id: "Email address or Mobile number", placeholder: "finance@school.edu" },
  teacher: { id: "Teacher ID or Email address", placeholder: "e.g. TCH-2024-042" },
}

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<Role>("admin")
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  // Prefetch dashboard destinations
  React.useEffect(() => {
    router.prefetch("/admin")
    router.prefetch("/portal/finance")
    router.prefetch("/portal/teacher")
  }, [router])

  // Switch role and clear inputs
  const switchRole = (r: Role) => {
    setRole(r)
    setIdentifier("")
    setPassword("")
    setError("")
  }

  // Quick fill helper for demo testing
  const fillDemo = (r: Role) => {
    setRole(r)
    setIdentifier(demoCredentials[r].id)
    setPassword(demoCredentials[r].password)
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const demo = demoCredentials[role]
    if (identifier.trim() === demo.id && password === demo.password) {
      router.push(demo.path)
    } else {
      setIsLoading(false)
      setError(`Invalid credentials for ${role}. Please check your credentials or click a demo autofill below.`)
    }
  }

  const field = fieldLabels[role]
  const demo = demoCredentials[role]

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-blue-100">
      {/* ── LEFT COLUMN: Brand, School Illustration, Why EduManage ────────── */}
      <div className="w-full lg:w-[46%] xl:w-[44%] bg-[#f8f9fb] border-r border-gray-100 p-6 sm:p-10 lg:p-14 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-[#FA672D] flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none text-[#0f2c59]">
                Edu<span className="text-[#FA672D]">Manage</span>
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                School OS
              </span>
            </div>
          </Link>

          {/* School Campus Line-Art Vector Illustration */}
          <div className="my-8 sm:my-10 flex items-center justify-center">
            <svg
              viewBox="0 0 540 380"
              className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft clouds in background */}
              <path
                d="M60 140 C50 140 40 130 45 120 C50 110 65 110 70 115 C75 105 95 105 105 115 C115 110 130 115 130 125 C135 130 130 140 120 140 Z"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="#f1f5f9"
              />
              <path
                d="M400 110 C390 110 380 100 385 90 C390 80 405 80 410 85 C415 75 435 75 445 85 C455 80 470 85 470 95 C475 100 470 110 460 110 Z"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="#f1f5f9"
              />

              {/* Ground base lines */}
              <line x1="20" y1="320" x2="520" y2="320" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="40" y1="328" x2="500" y2="328" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

              {/* Background Trees */}
              {/* Left Tree */}
              <path
                d="M90 320 L90 280 M90 280 C70 280 65 240 85 230 C75 210 105 200 115 215 C125 205 145 220 140 240 C155 250 145 280 120 280 Z"
                fill="#dcfce7"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M100 240 Q105 250 115 245" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />

              {/* Right Tree */}
              <path
                d="M450 320 L450 270 M450 270 C430 270 425 235 445 225 C435 205 465 195 475 210 C485 200 505 215 500 235 C515 245 505 270 480 270 Z"
                fill="#dcfce7"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Main School Building Structure */}
              {/* Foundation / Steps */}
              <rect x="150" y="305" width="240" height="15" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
              <rect x="170" y="295" width="200" height="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

              {/* Building Body */}
              <rect x="170" y="160" width="200" height="135" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />

              {/* Roof Cornice */}
              <rect x="160" y="145" width="220" height="15" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />

              {/* Classic Pediment / Central Gable */}
              <polygon points="270,95 200,145 340,145" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />

              {/* Clock Tower / Bell on Roof */}
              <rect x="250" y="55" width="40" height="40" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
              {/* Clock face */}
              <circle cx="270" cy="75" r="12" fill="#ffffff" stroke="#334155" strokeWidth="2" />
              <line x1="270" y1="75" x2="270" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="270" y1="75" x2="276" y2="75" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

              {/* Tower Roof & Flag */}
              <polygon points="270,30 245,55 295,55" fill="#3b82f6" stroke="#334155" strokeWidth="2" />
              <line x1="270" y1="30" x2="270" y2="10" stroke="#334155" strokeWidth="2" />
              <polygon points="270,12 295,19 270,26" fill="#FA672D" stroke="#334155" strokeWidth="1.5" />

              {/* Pediment Circular Window / Crest */}
              <circle cx="270" cy="125" r="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
              <line x1="260" y1="125" x2="280" y2="125" stroke="#334155" strokeWidth="1.5" />
              <line x1="270" y1="115" x2="270" y2="135" stroke="#334155" strokeWidth="1.5" />

              {/* Striped Canopy / Awning over Main Entrance */}
              <path
                d="M230 230 L310 230 L318 250 L222 250 Z"
                fill="#ffffff"
                stroke="#334155"
                strokeWidth="2.5"
              />
              <path d="M230 230 L234 250" stroke="#334155" strokeWidth="2" />
              <path d="M250 230 L255 250" stroke="#334155" strokeWidth="2" />
              <path d="M270 230 L270 250" stroke="#334155" strokeWidth="2" />
              <path d="M290 230 L285 250" stroke="#334155" strokeWidth="2" />
              <path d="M310 230 L306 250" stroke="#334155" strokeWidth="2" />
              {/* Awning color accents */}
              <polygon points="234,250 255,250 250,230 230,230" fill="#3b82f6" opacity="0.85" />
              <polygon points="270,250 285,250 290,230 270,230" fill="#3b82f6" opacity="0.85" />
              <polygon points="306,250 318,250 310,230 310,230" fill="#3b82f6" opacity="0.85" />

              {/* School Double Door Entrance */}
              <rect x="245" y="250" width="50" height="45" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
              <line x1="270" y1="250" x2="270" y2="295" stroke="#334155" strokeWidth="2" />
              {/* Door Glass panes */}
              <rect x="250" y="255" width="16" height="25" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
              <rect x="274" y="255" width="16" height="25" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
              {/* Door handles */}
              <circle cx="266" cy="275" r="1.5" fill="#334155" />
              <circle cx="274" cy="275" r="1.5" fill="#334155" />

              {/* Classroom Windows Left Side */}
              <rect x="185" y="175" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <line x1="201" y1="175" x2="201" y2="217" stroke="#334155" strokeWidth="1.5" />
              <line x1="185" y1="195" x2="217" y2="195" stroke="#334155" strokeWidth="1.5" />

              <rect x="185" y="240" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <line x1="201" y1="240" x2="201" y2="282" stroke="#334155" strokeWidth="1.5" />
              <line x1="185" y1="260" x2="217" y2="260" stroke="#334155" strokeWidth="1.5" />

              {/* Classroom Windows Right Side */}
              <rect x="323" y="175" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <line x1="339" y1="175" x2="339" y2="217" stroke="#334155" strokeWidth="1.5" />
              <line x1="323" y1="195" x2="355" y2="195" stroke="#334155" strokeWidth="1.5" />

              <rect x="323" y="240" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <line x1="339" y1="240" x2="339" y2="282" stroke="#334155" strokeWidth="1.5" />
              <line x1="323" y1="260" x2="355" y2="260" stroke="#334155" strokeWidth="1.5" />

              {/* Classic Street Lamp Post on Left */}
              <line x1="120" y1="320" x2="120" y2="210" stroke="#334155" strokeWidth="3" />
              <polygon points="110,210 130,210 125,190 115,190" fill="#fef08a" stroke="#334155" strokeWidth="2" />
              <polygon points="108,190 132,190 120,180" fill="#334155" />

              {/* Classic Street Lamp Post on Right */}
              <line x1="410" y1="320" x2="410" y2="210" stroke="#334155" strokeWidth="3" />
              <polygon points="400,210 420,210 415,190 405,190" fill="#fef08a" stroke="#334155" strokeWidth="2" />
              <polygon points="398,190 422,190 410,180" fill="#334155" />

              {/* Delivery / School Shuttle Van on Left */}
              <g transform="translate(45, 260)">
                {/* Wheels */}
                <circle cx="20" cy="55" r="9" fill="#334155" />
                <circle cx="20" cy="55" r="4" fill="#ffffff" />
                <circle cx="65" cy="55" r="9" fill="#334155" />
                <circle cx="65" cy="55" r="4" fill="#ffffff" />
                {/* Vehicle Body */}
                <path
                  d="M5 45 L5 25 C5 22 8 20 12 20 L55 20 L75 35 L75 45 Z"
                  fill="#fbbf24"
                  stroke="#334155"
                  strokeWidth="2"
                />
                {/* Windows */}
                <polygon points="52,23 70,36 52,36" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
                <rect x="25" y="23" width="22" height="13" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
                {/* School emblem */}
                <circle cx="15" cy="35" r="5" fill="#ffffff" stroke="#334155" strokeWidth="1" />
              </g>

              {/* Campus Notice Board Stand on Right */}
              <g transform="translate(420, 265)">
                <line x1="12" y1="40" x2="12" y2="55" stroke="#334155" strokeWidth="2" />
                <line x1="28" y1="40" x2="28" y2="55" stroke="#334155" strokeWidth="2" />
                <rect x="5" y="15" width="30" height="25" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
                <line x1="9" y1="22" x2="31" y2="22" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="28" x2="25" y2="28" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="34" x2="28" y2="34" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Value Props: Why EduManage */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
              Why EduManage
            </h2>

            <ul className="space-y-3.5">
              {[
                "Collect School Fees via Instant MoMo & Bank Gateway",
                "1-Tap Daily Attendance Registers & SMS to Parents",
                "Automated WAEC Terminal Reports & Error-Free CA Grading",
                "Over 500+ Schools & 85,000+ Students Managed Nationwide",
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 leading-snug">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer copyright on left side */}
        <div className="pt-8 sm:pt-12 text-xs text-gray-400 font-medium">
          © {new Date().getFullYear()} EduManage. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT COLUMN: Header link, User Avatar, Form, Actions ─────────── */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white">
        {/* Top bar with Sign Up link matching the screenshot */}
        <div className="flex items-center justify-end gap-3 w-full">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            Don&apos;t have an account?
          </span>
          <Link href="/register">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[#1746a2] text-[#1746a2] hover:bg-blue-50 text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5" /> Sign up
            </Button>
          </Link>

        </div>

        {/* Central Login Container */}
        <div className="w-full max-w-[420px] mx-auto py-8 sm:py-12 flex flex-col items-center">
          {/* User Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1746a2] flex items-center justify-center mb-5 shadow-xs">
            <User className="w-7 h-7 stroke-[1.75]" />
          </div>

          {/* Heading and Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight text-center">
            Login to your school portal
          </h1>
          <p className="text-sm text-gray-400 font-medium text-center mt-1.5 mb-6">
            Welcome back, you&apos;ve been missed!
          </p>

          {/* Role Switcher Tabs */}
          <div className="w-full mb-5 flex p-1 bg-gray-100/80 rounded-xl border border-gray-200/70">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                id={`role-tab-${r.id}`}
                onClick={() => switchRole(r.id)}
                className={cn(
                  "flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer",
                  role === r.id
                    ? "bg-white text-[#0f2c59] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} id="login-form" className="w-full space-y-4">
            {/* Identifier input with leading User icon */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <User className="h-4 w-4" />
              </div>
              <Input
                id="identifier"
                type={role === "teacher" ? "text" : "email"}
                placeholder={field.placeholder}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="username"
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* Password input with leading Lock icon & Eye toggle */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-12 pl-10 pr-11 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
              <button
                type="button"
                id="toggle-password"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label
                htmlFor="remember-me"
                className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-gray-600 font-medium"
              >
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(val) => setRememberMe(!!val)}
                  className="rounded border-gray-300 data-[state=checked]:bg-[#1746a2] data-[state=checked]:border-[#1746a2]"
                />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                id="forgot-password-link"
                className="text-xs sm:text-sm text-[#1746a2] hover:underline font-semibold"
              >
                Forgot Password ?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Log In Button (matching deep blue button in reference) */}
            <Button
              id="login-btn"
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#1746a2] hover:bg-[#123680] text-white font-bold rounded-xl shadow-md transition-all text-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Logging in…
                </>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Quick Demo Autofill Helper */}
            <div className="pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Quick Demo Login (1-click fill):
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo("admin")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("finance")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Finance
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("teacher")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Teacher
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Empty spacer on bottom right for symmetry */}
        <div className="hidden lg:block h-6" />
      </div>
    </div>
  )
}
