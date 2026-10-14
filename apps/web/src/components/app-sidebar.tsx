"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Bell,
  Settings,
  CreditCard,
  FileText,
  Clock,
  UserCheck,
  School,
  BookMarked,
  Trophy,
  DollarSign,
  AlertCircle,
  PieChart,
  Building2,
  Tag,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ── shared nav types ─────────────────────────────────────────────────────────
type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

type NavGroup = {
  label: string
  items: NavItem[]
}

// ── nav configs per role ──────────────────────────────────────────────────────
const adminNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Announcements", href: "/admin/announcements", icon: Bell, badge: 3 },
    ],
  },
  {
    label: "People",
    items: [
      { label: "Students", href: "/students", icon: Users },
      { label: "Teachers & Staff", href: "/admin/teachers", icon: UserCheck },
    ],
  },
  {
    label: "Academics",
    items: [
      { label: "Classes & Sections", href: "/admin/classes", icon: School },
      { label: "Subjects", href: "/admin/subjects", icon: BookOpen },
      { label: "Timetable", href: "/admin/timetable", icon: Clock },
      { label: "Examinations", href: "/admin/exams", icon: ClipboardList },
    ],
  },
  {
    label: "Finance & Admin",
    items: [
      { label: "Fee Management", href: "/admin/fees", icon: CreditCard },
      { label: "Reports", href: "/admin/reports", icon: FileText },
      { label: "Subscription & Billing", href: "/pricing", icon: Tag },
      { label: "System Settings", href: "/settings", icon: Settings },
    ],
  },
]

const teacherNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/portal/teacher", icon: LayoutDashboard },
      { label: "Analytics", href: "/portal/teacher/analytics", icon: BarChart3 },
      { label: "Announcements", href: "/portal/teacher/announcements", icon: Bell, badge: 2 },
    ],
  },
  {
    label: "My Classes",
    items: [
      { label: "Classes & Students", href: "/portal/teacher/classes", icon: School },
      { label: "Timetable", href: "/portal/teacher/timetable", icon: Clock },
      { label: "Attendance", href: "/portal/teacher/attendance", icon: UserCheck },
    ],
  },
  {
    label: "Academics",
    items: [
      { label: "Assignments", href: "/portal/teacher/assignments", icon: BookMarked },
      { label: "Gradebook", href: "/portal/teacher/grades", icon: ClipboardList },
      { label: "Examinations", href: "/portal/teacher/exams", icon: FileText },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings & Profile", href: "/portal/teacher/settings", icon: Settings },
    ],
  },
]

const financeNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/portal/finance", icon: LayoutDashboard },
      { label: "Financial Analytics", href: "/portal/finance/analytics", icon: PieChart },
    ],
  },
  {
    label: "Fee Management",
    items: [
      { label: "Fee Collection", href: "/portal/finance/fees", icon: CreditCard },
      { label: "Outstanding Payments", href: "/portal/finance/outstanding", icon: AlertCircle },
      { label: "Scholarships & Waivers", href: "/portal/finance/scholarships", icon: Trophy },
    ],
  },
  {
    label: "Reporting",
    items: [
      { label: "Financial Reports", href: "/portal/finance/reports", icon: FileText },
      { label: "Budget & Expenditure", href: "/portal/finance/budget", icon: DollarSign },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/portal/finance/settings", icon: Settings },
    ],
  },
]

// ── role metadata ─────────────────────────────────────────────────────────────
type Role = "admin" | "teacher" | "finance"

const roleConfig: Record<
  Role,
  { label: string; color: string; initials: string; nav: NavGroup[]; settingsHref: string }
> = {
  admin: {
    label: "School Admin",
    color: "bg-violet-600",
    initials: "SA",
    nav: adminNav,
    settingsHref: "/settings",
  },
  teacher: {
    label: "Mr. Johnson",
    color: "bg-blue-600",
    initials: "MJ",
    nav: teacherNav,
    settingsHref: "/portal/teacher/settings",
  },
  finance: {
    label: "Finance Officer",
    color: "bg-emerald-600",
    initials: "FO",
    nav: financeNav,
    settingsHref: "/portal/finance/settings",
  },
}

// ── shared nav renderer ───────────────────────────────────────────────────────
function NavGroups({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    // Warm up and prefetch all tab routes so tab switching is instantaneous
    for (const group of groups) {
      for (const item of group.items) {
        if (item.href && item.href !== "#") {
          router.prefetch(item.href)
        }
      }
    }
  }, [groups, router])

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.label}
                      onMouseEnter={() => router.prefetch(item.href)}
                      render={<Link href={item.href} prefetch={true} />}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

// ── generic sidebar ───────────────────────────────────────────────────────────
function RoleSidebar({ role }: { role: Role }) {
  const cfg = roleConfig[role]
  return (
    <Sidebar collapsible="icon">
      {/* Header — logo + school name */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-sm">EduManage</span>
                <span className="text-xs text-muted-foreground">SMS v2</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Nav */}
      <SidebarContent>
        <NavGroups groups={cfg.nav} />
      </SidebarContent>

      {/* Footer — only for admin/teacher (finance uses navbar logout only) */}
      {role !== "finance" && (
        <>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" render={<Link href={cfg.settingsHref} prefetch={true} />}>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback
                      className={`rounded-lg text-white text-xs font-semibold ${cfg.color}`}
                    >
                      {cfg.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold text-sm truncate">{cfg.label}</span>
                    <span className="text-xs text-muted-foreground capitalize">{role}</span>
                  </div>
                  <Settings className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </>
      )}

      <SidebarRail />
    </Sidebar>
  )
}

// ── exported sidebar (auto-detects role from path) ────────────────────────────
export function AppSidebar() {
  const pathname = usePathname()
  let role: Role = "admin"
  if (pathname.startsWith("/portal/teacher")) {
    role = "teacher"
  } else if (pathname.startsWith("/portal/finance")) {
    role = "finance"
  }
  return <RoleSidebar role={role} />
}

export function TeacherSidebar() {
  return <RoleSidebar role="teacher" />
}

export function FinanceSidebar() {
  return <RoleSidebar role="finance" />
}
