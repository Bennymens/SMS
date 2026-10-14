"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ── role tab types ────────────────────────────────────────────────────────────
type Role = "admin" | "finance" | "teacher"

const roles: { id: Role; label: string }[] = [
  { id: "admin",   label: "Admin" },
  { id: "finance", label: "Finance" },
  { id: "teacher", label: "Teacher" },
]

// demo credentials keyed by role
const demoCredentials: Record<Role, { id: string; password: string; path: string }> = {
  admin:   { id: "admin@school.edu",   password: "admin123",   path: "/admin" },
  finance: { id: "finance@school.edu", password: "finance123", path: "/portal/finance" },
  teacher: { id: "TCH-2024-042",       password: "teacher123", path: "/portal/teacher" },
}

// field labels per role
const fieldLabels: Record<Role, { id: string; placeholder: string }> = {
  admin:   { id: "Email Address", placeholder: "admin@school.edu" },
  finance: { id: "Email Address", placeholder: "finance@school.edu" },
  teacher: { id: "Teacher ID",    placeholder: "e.g. TCH-2024-042" },
}

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole]                 = React.useState<Role>("admin")
  const [identifier, setIdentifier]     = React.useState("")
  const [password, setPassword]         = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading]       = React.useState(false)
  const [error, setError]               = React.useState("")

  // prefetch dashboard destinations immediately so navigation is instant
  React.useEffect(() => {
    router.prefetch("/admin")
    router.prefetch("/portal/finance")
    router.prefetch("/portal/teacher")
  }, [router])

  // reset fields when switching role
  const switchRole = (r: Role) => {
    setRole(r)
    setIdentifier("")
    setPassword("")
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const demo = demoCredentials[role]
    if (identifier === demo.id && password === demo.password) {
      router.push(demo.path)
    } else {
      setIsLoading(false)
      setError(`Invalid ${fieldLabels[role].id.toLowerCase()} or password.`)
    }
  }

  const field = fieldLabels[role]
  const demo  = demoCredentials[role]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] px-4">
      <div className="relative z-10 w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <p className="text-sm text-zinc-500">EduManage · School Management System</p>
        </div>

        <Card className="border-[#27272a] bg-[#18181b]">
          <CardHeader>
            <CardTitle className="text-white text-lg font-semibold">
              Login to your account
            </CardTitle>
            <CardDescription className="text-[#71717a] text-sm">
              Enter your credentials below to continue
            </CardDescription>
            <CardAction>
              <Link
                href="/register"
                className="text-sm text-white hover:underline underline-offset-4 transition-colors"
              >
                Sign Up
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            {/* Role selector tabs */}
            <div className="mb-5 flex gap-1 rounded-lg border border-[#27272a] bg-[#09090b] p-1">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  id={`role-tab-${r.id}`}
                  onClick={() => switchRole(r.id)}
                  className={cn(
                    "flex-1 rounded-md py-1.5 text-sm font-medium transition-all",
                    role === r.id
                      ? "bg-[#27272a] text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} id="login-form" className="flex flex-col gap-4">
              {/* Dynamic ID field */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="identifier" className="text-white text-sm font-medium">
                  {field.id}
                </Label>
                <Input
                  id="identifier"
                  type={role === "teacher" ? "text" : "email"}
                  placeholder={field.placeholder}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  autoComplete="username"
                  className="h-10 border-[#3f3f46] bg-[#27272a] text-white placeholder:text-[#52525b] focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    id="forgot-password-link"
                    className="text-sm text-white hover:underline underline-offset-4 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-10 pr-10 border-[#3f3f46] bg-[#27272a] text-white focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30"
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && <p className="text-sm text-red-400">{error}</p>}

              {/* Demo hint */}
              <p className="text-xs text-zinc-600">
                Demo — ID: <span className="text-zinc-400 font-mono">{demo.id}</span> · pw:{" "}
                <span className="text-zinc-400 font-mono">{demo.password}</span>
              </p>

              {/* Login */}
              <Button
                id="login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-white text-black font-semibold hover:bg-white/90 rounded-lg transition-all"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in…</>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Google */}
              <Button
                id="google-login-btn"
                type="button"
                className="w-full h-10 border border-[#3f3f46] bg-[#27272a] text-white hover:bg-[#3f3f46] font-semibold rounded-lg transition-all"
              >
                <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Login with Google
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} EduManage · All rights reserved
        </p>
      </div>
    </div>
  )
}
