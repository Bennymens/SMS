"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

  return (
    <div className="relative pb-2">
      {groups.map((group, groupIdx) => (
        <React.Fragment key={group.label}>
          {groupIdx > 0 && (
            <div className="flex items-center pl-5 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
              <div className="w-[1.5px] h-3.5 bg-sidebar-border/70 rounded-full" />
            </div>
          )}
          <SidebarGroup className="relative p-2">
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon
                  const active =
                    item.href === "/admin" ||
                    item.href === "/portal/teacher" ||
                    item.href === "/portal/finance" ||
                    item.href === "/"
                      ? pathname === item.href
                      : pathname === item.href || pathname.startsWith(item.href + "/")

                  return (
                    <React.Fragment key={item.label}>
                      <SidebarMenuItem className="relative">
                        <SidebarMenuButton
                          isActive={active}
                          tooltip={item.label}
                          render={<Link href={item.href} />}
                        >
                          <Icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge ? (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                      {itemIdx < group.items.length - 1 && (
                        <div className="flex items-center pl-5 py-0.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
                          <div className="w-[1.5px] h-2.5 bg-sidebar-border/60 rounded-full" />
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </React.Fragment>
      ))}
    </div>
  )
}

// ── generic sidebar ───────────────────────────────────────────────────────────
function RoleSidebar({ role }: { role: Role }) {
  const cfg = roleConfig[role]
  return (
    <Sidebar collapsible="icon">
      {/* Header — logo + school name, exactly h-12 to align with navbar header line */}
      <SidebarHeader className="h-12 flex-row items-center gap-2 border-b border-sidebar-border px-3 py-0">
        <SidebarMenu className="w-full">
          <SidebarMenuItem>
            <SidebarMenuButton size="default" className="h-9 w-full" render={<Link href="/" />}>
              <div className="flex aspect-square h-7 w-7 items-center justify-center rounded-md bg-violet-600 text-white shrink-0">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0 leading-none">
                <span className="font-semibold text-sm leading-tight">EduManage</span>
                <span className="text-[10px] text-muted-foreground leading-tight">SMS v2</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

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
