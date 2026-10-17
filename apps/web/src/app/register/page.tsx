"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()

  // Form states
  const [schoolName, setSchoolName] = React.useState("")
  const [adminName, setAdminName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [schoolType, setSchoolType] = React.useState("Basic & JHS")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [agreeTerms, setAgreeTerms] = React.useState(true)

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service to create your account.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName,
          adminName,
          email,
          phone,
          schoolType,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create school account.")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(data.redirectUrl || "/admin")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-blue-100">
      {/* ── LEFT COLUMN: Brand, School Illustration, Value Props ──────────── */}
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

              <line x1="20" y1="320" x2="520" y2="320" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="40" y1="328" x2="500" y2="328" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

              <path
                d="M90 320 L90 280 M90 280 C70 280 65 240 85 230 C75 210 105 200 115 215 C125 205 145 220 140 240 C155 250 145 280 120 280 Z"
                fill="#dcfce7"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M450 320 L450 270 M450 270 C430 270 425 235 445 225 C435 205 465 195 475 210 C485 200 505 215 500 235 C515 245 505 270 480 270 Z"
                fill="#dcfce7"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              <rect x="150" y="305" width="240" height="15" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
              <rect x="170" y="295" width="200" height="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
              <rect x="170" y="160" width="200" height="135" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
              <rect x="160" y="145" width="220" height="15" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />

              <polygon points="270,95 200,145 340,145" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
              <rect x="250" y="55" width="40" height="40" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
              <circle cx="270" cy="75" r="12" fill="#ffffff" stroke="#334155" strokeWidth="2" />
              <line x1="270" y1="75" x2="270" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="270" y1="75" x2="276" y2="75" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

              <polygon points="270,30 245,55 295,55" fill="#3b82f6" stroke="#334155" strokeWidth="2" />
              <line x1="270" y1="30" x2="270" y2="10" stroke="#334155" strokeWidth="2" />
              <polygon points="270,12 295,19 270,26" fill="#FA672D" stroke="#334155" strokeWidth="1.5" />

              <circle cx="270" cy="125" r="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
              <path
                d="M230 230 L310 230 L318 250 L222 250 Z"
                fill="#ffffff"
                stroke="#334155"
                strokeWidth="2.5"
              />
              <polygon points="234,250 255,250 250,230 230,230" fill="#3b82f6" opacity="0.85" />
              <polygon points="270,250 285,250 290,230 270,230" fill="#3b82f6" opacity="0.85" />
              <polygon points="306,250 318,250 310,230 310,230" fill="#3b82f6" opacity="0.85" />

              <rect x="245" y="250" width="50" height="45" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
              <line x1="270" y1="250" x2="270" y2="295" stroke="#334155" strokeWidth="2" />

              <rect x="185" y="175" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <rect x="185" y="240" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <rect x="323" y="175" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />
              <rect x="323" y="240" width="32" height="42" fill="#e0f2fe" stroke="#334155" strokeWidth="2" />

              <line x1="120" y1="320" x2="120" y2="210" stroke="#334155" strokeWidth="3" />
              <polygon points="110,210 130,210 125,190 115,190" fill="#fef08a" stroke="#334155" strokeWidth="2" />

              <line x1="410" y1="320" x2="410" y2="210" stroke="#334155" strokeWidth="3" />
              <polygon points="400,210 420,210 415,190 405,190" fill="#fef08a" stroke="#334155" strokeWidth="2" />

              <g transform="translate(45, 260)">
                <circle cx="20" cy="55" r="9" fill="#334155" />
                <circle cx="65" cy="55" r="9" fill="#334155" />
                <path d="M5 45 L5 25 C5 22 8 20 12 20 L55 20 L75 35 L75 45 Z" fill="#fbbf24" stroke="#334155" strokeWidth="2" />
                <polygon points="52,23 70,36 52,36" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
                <rect x="25" y="23" width="22" height="13" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Value Props: Register benefits */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight">
              Start Your 14-Day Free Pilot
            </h2>

            <ul className="space-y-3.5">
              {[
                "Setup your complete school command centre in 2 minutes",
                "Full access to MoMo Fee Gateway, Attendance & Gradebook",
                "Granular role permissions for Admins, Bursars & Teachers",
                "Dedicated WhatsApp onboarding & historical student data import",
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

        {/* Footer copyright */}
        <div className="pt-8 sm:pt-12 text-xs text-gray-400 font-medium">
          © {new Date().getFullYear()} EduManage. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT COLUMN: Header link, Form, Actions ───────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        {/* Top bar with Log In link */}
        <div className="flex items-center justify-end gap-3 w-full">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            Already have an account?
          </span>
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[#1746a2] text-[#1746a2] hover:bg-blue-50 text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5" /> Log In
            </Button>
          </Link>
        </div>

        {/* Central Register Container */}
        <div className="w-full max-w-[460px] mx-auto py-6 sm:py-8 flex flex-col items-center">
          {/* Building Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1746a2] flex items-center justify-center mb-4 shadow-xs">
            <Building2 className="w-7 h-7 stroke-[1.75]" />
          </div>

          {/* Heading and Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2c59] tracking-tight text-center">
            Register your school
          </h1>
          <p className="text-sm text-gray-400 font-medium text-center mt-1.5 mb-6">
            Get your school online in minutes. No credit card required.
          </p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-3.5">
            {/* School Name */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Building2 className="h-4 w-4" />
              </div>
              <Input
                id="school-name"
                type="text"
                placeholder="Official School Name (e.g. St. Augustine Prep)"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* Administrator Name */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <User className="h-4 w-4" />
              </div>
              <Input
                id="admin-name"
                type="text"
                placeholder="Administrator Full Name (e.g. Headteacher / Proprietor)"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Official Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Phone className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number (for SMS & MoMo Reconciliation)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* School Type Selector */}
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              {[
                { id: "Basic & JHS", label: "Basic / JHS" },
                { id: "SHS / High School", label: "SHS / Academy" },
                { id: "Multi-Campus", label: "Multi-Campus" },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSchoolType(type.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    schoolType === type.id
                      ? "border-[#1746a2] bg-blue-50 text-[#1746a2] font-bold shadow-xs"
                      : "border-gray-200 bg-[#fbfbfb] text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 pl-10 pr-11 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 pl-10 pr-4 rounded-xl border-gray-200 bg-[#fbfbfb] text-sm text-gray-900 placeholder:text-gray-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1746a2]/20 focus-visible:border-[#1746a2] transition-all"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="agree-terms"
                checked={agreeTerms}
                onCheckedChange={(val) => setAgreeTerms(!!val)}
                className="mt-0.5 rounded border-gray-300 data-[state=checked]:bg-[#1746a2] data-[state=checked]:border-[#1746a2]"
              />
              <label
                htmlFor="agree-terms"
                className="text-xs text-gray-500 leading-snug cursor-pointer select-none"
              >
                I agree to the{" "}
                <Link href="#" className="text-[#1746a2] hover:underline font-semibold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#1746a2] hover:underline font-semibold">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-700 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                School registered successfully! Redirecting to command centre…
              </div>
            )}

            {/* Primary Submit Button */}
            <Button
              id="register-btn"
              type="submit"
              disabled={isLoading || success}
              className="w-full h-12 bg-[#1746a2] hover:bg-[#123680] text-white font-bold rounded-xl shadow-md transition-all text-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating School Portal…
                </>
              ) : success ? (
                "School Account Ready!"
              ) : (
                "Create School Account"
              )}
            </Button>

            <p className="text-[11px] text-gray-400 text-center pt-2">
              🔒 SSL 256-bit encrypted • 14-day full feature trial • Cancel anytime
            </p>
          </form>
        </div>

        {/* Empty bottom spacer */}
        <div className="hidden lg:block h-6" />
      </div>
    </div>
  )
}
