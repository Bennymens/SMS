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
  LogOut,
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

const studentNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/portal/student", icon: LayoutDashboard },
      { label: "Announcements", href: "/portal/student/announcements", icon: Bell, badge: 1 },
    ],
  },
  {
    label: "Academics",
    items: [
      { label: "My Classes", href: "/portal/student/classes", icon: School },
      { label: "Timetable", href: "/portal/student/timetable", icon: Calendar },
      { label: "Assignments", href: "/portal/student/assignments", icon: BookMarked },
      { label: "Grades & Results", href: "/portal/student/grades", icon: Trophy },
      { label: "Attendance", href: "/portal/student/attendance", icon: UserCheck },
    ],
  },
  {
    label: "My Account",
    items: [
      { label: "Profile", href: "/portal/student/profile", icon: Users },
      { label: "Fees & Billing", href: "/portal/student/fees", icon: CreditCard },
    ],
  },
]

const parentNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/portal/parent", icon: LayoutDashboard },
      { label: "Announcements", href: "/portal/parent/announcements", icon: Bell },
    ],
  },
  {
    label: "My Child",
    items: [
      { label: "Academic Progress", href: "/portal/parent/progress", icon: BarChart3 },
      { label: "Attendance", href: "/portal/parent/attendance", icon: UserCheck },
      { label: "Assignments", href: "/portal/parent/assignments", icon: BookMarked },
      { label: "Results", href: "/portal/parent/results", icon: Trophy },
    ],
  },
  {
    label: "Finance & Account",
    items: [
      { label: "Fee Statements", href: "/portal/parent/fees", icon: CreditCard },
      { label: "Settings", href: "/portal/parent/settings", icon: Settings },
    ],
  },
]

// ── role metadata ─────────────────────────────────────────────────────────────
type Role = "admin" | "teacher" | "student" | "parent"

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
  student: {
    label: "Alex Smith",
    color: "bg-emerald-600",
    initials: "AS",
    nav: studentNav,
    settingsHref: "/portal/student/profile",
  },
  parent: {
    label: "Mrs. Smith",
    color: "bg-amber-600",
    initials: "MS",
    nav: parentNav,
    settingsHref: "/portal/parent/settings",
  },
}

// ── shared nav renderer ───────────────────────────────────────────────────────
function NavGroups({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname()
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

      <SidebarSeparator />

      {/* Footer — user avatar & logout */}
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
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              render={<Link href="/login" />}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

// ── exported sidebars per role ────────────────────────────────────────────────
export function AppSidebar() {
  const pathname = usePathname()
  let role: Role = "admin"
  if (pathname.startsWith("/portal/student")) {
    role = "student"
  } else if (pathname.startsWith("/portal/teacher")) {
    role = "teacher"
  } else if (pathname.startsWith("/portal/parent")) {
    role = "parent"
  }
  return <RoleSidebar role={role} />
}

export function TeacherSidebar() {
  return <RoleSidebar role="teacher" />
}

export function StudentSidebar() {
  return <RoleSidebar role="student" />
}

export function ParentSidebar() {
  return <RoleSidebar role="parent" />
}
