'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  ShieldCheck,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Check,
  ArrowRight,
  DollarSign,
  Sparkles,
  RotateCcw,
  Headphones,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Footer } from '@/components/footer';

type ActiveTab = 'admin' | 'finance' | 'academics';
type PlanType = 'starter' | 'growth' | 'enterprise';

export default function LandingPage() {
  const [campusTab, setCampusTab] = useState<'single' | 'multi'>('single');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('growth');
  const [activeTab, setActiveTab] = useState<ActiveTab>('admin');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePrev = () => {
    setActiveTab((prev) => {
      if (prev === 'admin') return 'academics';
      if (prev === 'finance') return 'admin';
      return 'finance';
    });
  };

  const handleNext = () => {
    setActiveTab((prev) => {
      if (prev === 'admin') return 'finance';
      if (prev === 'finance') return 'academics';
      return 'admin';
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'admin') return 'finance';
        if (prev === 'finance') return 'academics';
        return 'admin';
      });
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const roleCards = [
    {
      id: 'admin' as ActiveTab,
      label: 'Admin',
      subdomain: 'admin.edumanage.cloud',
      pillText: 'Official School Command Centre — Admin Portal',
      href: '/admin',
      img: '/img/Screenshot (916).png',
      icon: ShieldCheck,
      heading: 'Run the whole school from one command centre.',
      sub: 'From enrollment numbers and staff rosters to exam calendars and campus health scores — the Admin portal gives school owners total institutional visibility.',
      link: 'Explore Admin Portal',
      keyFeatures: [
        { label: 'Institutional Health Score', desc: 'Real-time 94/100 readiness & campus compliance index' },
        { label: 'Admissions Pipeline Funnel', desc: 'Track applicant stages from inquiry to enrolled pupil' },
        { label: 'Terms & Examination Calendars', desc: 'Centralized term milestones and examination scheduling' },
        { label: 'Staff Rosters & RBAC Roles', desc: 'Granular role-based permissions for bursars & teachers' },
      ],
    },
    {
      id: 'finance' as ActiveTab,
      label: 'Finance',
      subdomain: 'bursar.edumanage.cloud',
      pillText: 'Instant MoMo & Bank Fee Collection — Bursar Portal',
      href: '/portal/finance',
      img: '/img/Screenshot (914).png',
      icon: DollarSign,
      heading: 'Collect fees faster and track every cedi.',
      sub: 'Accept Mobile Money, debit cards, and bank transfers. Automated SMS reminders chase overdue fees so the bursar spends less time chasing and more time reporting.',
      link: 'Explore Finance Portal',
      keyFeatures: [
        { label: 'Instant MoMo Gateway', desc: 'Automated direct fee reconciliation for MTN & Telecel MoMo' },
        { label: 'Automated Overdue Fee SMS', desc: 'Smart reminder chasers that boost term collection rates' },
        { label: 'Real-Time Bursary Ledger', desc: 'Instant receipt generation & downloadable audit statements' },
        { label: 'Department Budget Burn-Rate', desc: 'Expense tracking and quarterly threshold overrun alerts' },
      ],
    },
    {
      id: 'academics' as ActiveTab,
      label: 'Academics',
      subdomain: 'academics.edumanage.cloud',
      pillText: 'Digital Gradebook & Terminal Reports — Academics',
      href: '/login',
      img: '/img/Screenshot (915).png',
      icon: BookOpen,
      heading: 'Digital marking, attendance, and terminal reports.',
      sub: 'Teachers record attendance with one tap, enter CA scores, and the system automatically calculates GPA, class position, and prints formatted report cards.',
      link: 'Explore Teacher Portal',
      keyFeatures: [
        { label: '1-Tap Daily Attendance', desc: 'Rapid classroom attendance registers with parent SMS notifications' },
        { label: 'Continuous Assessment (CA)', desc: 'Standardized 30/70 marking scheme and class test records' },
        { label: 'Auto GPA & Class Ranking', desc: 'Error-free class positions and cumulative terminal averages' },
        { label: 'Print-Ready Report Cards', desc: 'Official WAEC/BECE format terminal cards with headteacher remarks' },
      ],
    },
  ];

  const activeIdx = roleCards.findIndex((c) => c.id === activeTab);
  const currentCard = roleCards[activeIdx >= 0 ? activeIdx : 0];
  const CurrentIcon = currentCard.icon;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a2e] selection:bg-violet-200">

      {/* ── NAVBAR (unchanged per user instruction) ─────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo pushed far left */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-auto">
            <div className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight leading-none text-[#1a1a2e]">EduManage</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">School OS</span>
            </div>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-medium text-gray-700">
                    Platform Modules
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 w-[380px] bg-white border rounded-xl shadow-xl">
                    <div className="grid gap-2">
                      {[
                        { icon: DollarSign, title: 'Finance & Bursary', desc: 'Fee collection, MoMo gateway, budget tracking' },
                        { icon: ShieldCheck, title: 'Admin & Governance', desc: 'Enrollment, staff, admissions pipeline' },
                        { icon: BookOpen, title: 'Teacher Academics', desc: 'Attendance, gradebook, report cards' },
                      ].map(({ icon: Icon, title, desc }) => (
                        <NavigationMenuLink key={title} href="#modules" className="p-2.5 rounded-lg hover:bg-gray-50 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{title}</p>
                            <p className="text-[11px] text-gray-500">{desc}</p>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs font-medium text-gray-700">
                    Subscriptions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 w-[320px] bg-white border rounded-xl shadow-xl">
                    <div className="space-y-2">
                      <NavigationMenuLink href="#pricing" className="p-2.5 rounded-lg hover:bg-gray-50 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                          <CreditCard className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">Monthly Rolling Plans</p>
                          <p className="text-[11px] text-gray-500">Setup + support + hosting included</p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/payout" className="p-2.5 rounded-lg hover:bg-gray-50 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900">School Onboarding</p>
                          <p className="text-[11px] text-gray-500">24-hour setup with data import</p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#faq" className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    FAQ
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Sign In / Sign Up */}
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs font-medium text-gray-700">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="text-xs font-semibold gap-1.5 bg-violet-600 hover:bg-violet-700 text-white shadow-sm">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO — deep violet gradient like Hostinger ───────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b0d8f] via-[#5c1adb] to-[#7c3aed] text-white pt-20 pb-20 sm:pt-28 sm:pb-28">
        {/* subtle grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Your school, online.<br />Managed easy.
          </h1>
          <p className="text-base sm:text-xl text-violet-200 max-w-xl mx-auto">
            An all-in-one platform for school fees, academic records, and administration—built for basic schools in Africa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-sm font-semibold bg-white text-violet-700 hover:bg-violet-50 shadow-lg border-0">
                Get started
              </Button>
            </Link>
          </div>
          <p className="text-xs text-violet-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* ── MODULE SHOWCASE — 3-Card Stack & Auto-rotation like Hostinger ── */}
      <section id="modules" className="py-20 sm:py-24 bg-white max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Tools for every school role
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            Get more control over how your school runs, without taking on technical complexity.
          </p>
        </div>

        {/* Tab Switcher & Manual Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Module"
            className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1 bg-[#f4f5f6] rounded-full p-1 border border-gray-200">
            {roleCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveTab(card.id)}
                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === card.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {activeTab === card.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#673de6] shrink-0" />
                )}
                {card.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Module"
            className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Showcase matching Hostinger screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center pt-4">
          {/* Left Column: 3 Layered Stacked Cards (7 cols) */}
          <div className="lg:col-span-7 relative w-full">
            <div className="relative w-full max-w-xl mx-auto h-[340px] sm:h-[420px] md:h-[460px] pt-12 sm:pt-16 select-none">
              {roleCards.map((card, idx) => {
                const diff = (idx - activeIdx + 3) % 3;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveTab(card.id)}
                    className={`absolute inset-x-0 bottom-0 rounded-2xl overflow-hidden border border-gray-200/90 bg-[#0d0f1d] transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                      diff === 0
                        ? 'z-30 translate-y-0 scale-100 opacity-100 shadow-2xl ring-1 ring-gray-900/10'
                        : diff === 1
                        ? 'z-20 -translate-y-5 sm:-translate-y-7 scale-[0.94] opacity-75 shadow-xl'
                        : 'z-10 -translate-y-10 sm:-translate-y-14 scale-[0.88] opacity-50 shadow-lg'
                    }`}
                    style={{
                      height: 'calc(100% - 44px)',
                    }}
                  >
                    {/* Browser Window Bar */}
                    <div className="h-7 bg-[#171a2b] border-b border-white/10 px-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/40 text-[10px] text-gray-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {card.subdomain}
                      </div>
                      <span className="w-4" />
                    </div>

                    {/* Full Image Container - object-contain ensures entire screenshot is visible */}
                    <div className="relative w-full h-[calc(100%-28px)] bg-[#0d0f1d]">
                      <Image
                        src={card.img}
                        alt={card.label}
                        fill
                        priority
                        className="object-contain object-top select-none pointer-events-none"
                        sizes="(max-width: 768px) 100vw, 650px"
                      />
                    </div>

                    {/* Floating Bottom Action Capsule on active card */}
                    {diff === 0 && (
                      <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-2 sm:p-2.5 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-2 pl-2 overflow-hidden">
                          <span className="w-2 h-2 rounded-full bg-[#673de6] shrink-0 animate-ping" />
                          <span className="text-xs font-bold text-gray-900 truncate">
                            {card.pillText}
                          </span>
                        </div>
                        <Link href={card.href} onClick={(e) => e.stopPropagation()}>
                          <div className="h-8 w-8 rounded-xl bg-[#673de6] hover:bg-[#582fd3] text-white flex items-center justify-center shadow-md shrink-0 transition-transform hover:scale-110">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Copy (5 cols) */}
          <div className="lg:col-span-5 space-y-5 lg:pl-4">
            <div className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-lg">
              <CurrentIcon className="w-5 h-5" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {currentCard.heading}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
              {currentCard.sub}
            </p>

            <div className="pt-1">
              <Link
                href={currentCard.href}
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#673de6] transition-colors group"
              >
                <span>{currentCard.link}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* Dynamic Key Features for Selected Module */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#673de6]" />
                Key {currentCard.label} Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentCard.keyFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="p-3 rounded-xl border border-gray-100 bg-gray-50/80 hover:bg-white hover:border-gray-200 hover:shadow-xs transition-all flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <Check className="w-3.5 h-3.5 text-[#673de6] shrink-0" />
                      <span className="truncate">{f.label}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug pl-5">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SUMMARY OF KEY FEATURES OF EACH MODULE ── */}
        <div className="pt-10 border-t border-gray-100 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f0effe] text-[#673de6] border border-purple-200">
              <Sparkles className="w-3.5 h-3.5" />
              At A Glance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Summary of Key Features by Module
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Three purpose-built portals engineered for Ghanaian basic, preparatory, and secondary schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Admin Module */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    Governance & Ops
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Admin Command Centre</h4>
                  <p className="text-xs text-gray-500 mt-1">For Proprietors, Headteachers & Registrars</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Total operational control over enrollment, staff permissions, examination calendars, and campus health.
                </p>

                <div className="pt-3 border-t border-gray-100 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Capabilities:</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Campus Health Score:</strong> 94/100 readiness index & compliance tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Admissions Funnel:</strong> Online inquiry to enrolled pupil workflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Staff Rosters & RBAC:</strong> Role permissions for teachers and bursars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Term & Exam Milestones:</strong> Centralized academic year master scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  Explore Admin Module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Finance Module */}
            <div className="rounded-2xl border-2 border-[#673de6]/30 bg-gradient-to-b from-purple-50/30 to-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#673de6] text-white flex items-center justify-center shadow-md">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#673de6] bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Revenue & Ledger
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Finance & Bursary Portal</h4>
                  <p className="text-xs text-gray-500 mt-1">For School Bursars, Accountants & Owners</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Automated Mobile Money fee collection, instant reconciliation, receipting, and overdue SMS chasers.
                </p>

                <div className="pt-3 border-t border-purple-100 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Capabilities:</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#673de6] shrink-0 mt-0.5" />
                      <span><strong>Direct MoMo Gateway:</strong> Instant reconciliation for MTN & Telecel MoMo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#673de6] shrink-0 mt-0.5" />
                      <span><strong>Automated Overdue SMS:</strong> Scheduled fee payment reminders with balances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#673de6] shrink-0 mt-0.5" />
                      <span><strong>Bursary Ledger & Receipts:</strong> Numbered audit receipts and exportable statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#673de6] shrink-0 mt-0.5" />
                      <span><strong>Department Budgeting:</strong> Threshold overrun alerts and expense categorization</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/portal/finance"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-[#673de6] hover:bg-[#582fd3] shadow-sm transition-colors"
                >
                  Explore Finance Module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Academics Module */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Classroom & Grading
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Academics & Teacher Portal</h4>
                  <p className="text-xs text-gray-500 mt-1">For Teachers, Subject Heads & Exam Officers</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  1-tap mobile attendance, continuous assessment scoring, auto GPA ranking, and printable report cards.
                </p>

                <div className="pt-3 border-t border-gray-100 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Capabilities:</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>1-Tap Daily Attendance:</strong> Roll-call registers with instant parent SMS alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Continuous Assessment:</strong> Standardized 30/70 CA marking scheme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Auto GPA & Positions:</strong> Automated class ranking and cumulative aggregates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>WAEC/BECE Report Cards:</strong> Print-ready terminal sheets with head remarks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  Explore Teacher Module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING & PACKAGES (Matching Hostinger Screenshots — Adapted for School Management System) ─── */}
      <section id="pricing" className="py-20 bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Choose the plan that<br className="hidden sm:inline" /> matches what your school needs
            </h2>

            {/* Toggle: Single school | Multi-campus */}
            <div className="flex items-center justify-center pt-2">
              <div className="inline-flex items-center p-1 bg-[#f4f5f6] rounded-full border border-gray-200">
                <button
                  type="button"
                  onClick={() => setCampusTab('single')}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                    campusTab === 'single'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Single school
                </button>
                <button
                  type="button"
                  onClick={() => setCampusTab('multi')}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                    campusTab === 'multi'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Multi-campus
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Get everything you need to enroll students, collect tuition fees, and publish report cards, with the technical side handled for you.
            </p>

            {/* Monochrome / Colorless Icon Benefits Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-700 pt-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-700" />
                <span>For nursery, primary, and JHS schools</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gray-700" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-gray-700" />
                <span>24/7 dedicated school support</span>
              </div>
            </div>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. Starter School */}
            <div className={`rounded-3xl bg-white border p-8 flex flex-col justify-between transition-all ${
              selectedPlan === 'starter' ? 'border-[#6c5ce7] shadow-lg ring-1 ring-[#6c5ce7]' : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">Starter School</h3>
                  <span className="text-xs font-semibold text-[#6c5ce7] bg-[#f0effe] px-2.5 py-0.5 rounded-full">
                    75% off
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-2 min-h-[34px] leading-relaxed">
                  Run daily school routines smoothly. Great for single campuses and basic schools.
                </p>

                <div className="mt-4">
                  <span className="text-xs text-gray-400 line-through font-normal block">GH₵1,400</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">GH₵350</span>
                    <span className="text-xs text-gray-500 font-normal">/mo</span>
                  </div>
                </div>

                <Link href="/payout?plan=starter" onClick={() => setSelectedPlan('starter')} className="block mt-4">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#6c5ce7] border border-[#6c5ce7] bg-white hover:bg-[#f8f7ff] transition-colors"
                  >
                    Choose plan
                  </button>
                </Link>

                <div className="mt-3 text-[11px] text-gray-500 space-y-0.5">
                  <p>Get 12 months for GH₵4,200 (regular price GH₵16,800)</p>
                  <p>Renews at GH₵590/mo.</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Up to 350 students</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom school subdomain & portal</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>20 GB student records storage</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free weekly automated backups</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="border-b border-dotted border-gray-400">Mobile Money fee collection</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-400">
                    <span className="w-4 text-center text-sm font-bold shrink-0">—</span>
                    <span>Multi-campus sync</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-400">
                    <span className="w-4 text-center text-sm font-bold shrink-0">—</span>
                    <span>AI terminal report cards</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-400">
                    <span className="w-4 text-center text-sm font-bold shrink-0">—</span>
                    <span>Priority 24/7 bursar support</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-900 mb-2.5">Included modules:</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>5 terminal report templates <span className="text-gray-400 italic font-normal">(one-time setup)</span></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>Attendance & gradebook register</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>Bursar fee ledger & receipt generator</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-400">
                        <span className="w-4 text-center text-sm font-bold shrink-0">—</span>
                        <span>SMS notification gateway</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Growth Academy (Dark Card) */}
            <div className={`rounded-3xl bg-[#131127] text-white p-8 flex flex-col justify-between shadow-2xl relative ring-1 ${
              selectedPlan === 'growth' ? 'ring-[#8c52ff]' : 'ring-white/10'
            }`}>
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-[#8c52ff]" />
                    <h3 className="text-xl font-bold text-white">Growth Academy</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#cbb8ff] bg-[#2d2256] px-2.5 py-0.5 rounded-full">
                    Special offer • 79% off
                  </span>
                </div>

                <p className="text-xs text-gray-300 mt-2 min-h-[34px] leading-relaxed">
                  Unlimited student enrollments and teacher accounts, plus AI tools and priority support for maximum flexibility.
                </p>

                <div className="mt-4">
                  <span className="text-xs text-gray-400 line-through font-normal block">GH₵2,200</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">GH₵590</span>
                    <span className="text-xs text-gray-400 font-normal">/mo</span>
                  </div>
                </div>

                <Link href="/payout?plan=growth" onClick={() => setSelectedPlan('growth')} className="block mt-4">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#673de6] hover:bg-[#582fd3] transition-colors shadow-sm"
                  >
                    Choose plan
                  </button>
                </Link>

                <div className="mt-3 text-[11px] text-gray-400 space-y-0.5">
                  <p>Get 12 months for GH₵7,080 (regular price GH₵26,400)</p>
                  <p>Renews at GH₵950/mo.</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-xs text-gray-200">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>Up to 1,500 students</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>Custom domain & branded school portal</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>50 GB NVMe records storage</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>Daily backups + easy data restore</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>Automated SMS parent alerts</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span className="border-b border-dotted border-gray-400">Full Bursary Suite (MoMo & Bank)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span className="border-b border-dotted border-gray-400">AI terminal report card generator</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                    <span>Priority 24/7 bursar & admin support</span>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-bold text-white mb-2.5">Included modules:</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-gray-300 shrink-0" />
                        <span>15 terminal report templates <span className="text-gray-400 italic font-normal">(one-time setup)</span></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-gray-300 shrink-0" />
                        <span>Attendance & gradebook register</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-gray-300 shrink-0" />
                        <span>Bursar fee ledger & receipt generator</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-[#8c52ff] shrink-0" />
                        <span>SMS notification gateway</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Enterprise Network */}
            <div className={`rounded-3xl bg-white border p-8 flex flex-col justify-between transition-all ${
              selectedPlan === 'enterprise' ? 'border-[#6c5ce7] shadow-lg ring-1 ring-[#6c5ce7]' : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">Enterprise Network</h3>
                  <span className="text-xs font-semibold text-[#6c5ce7] bg-[#f0effe] px-2.5 py-0.5 rounded-full">
                    71% off
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-2 min-h-[34px] leading-relaxed">
                  Dedicated infrastructure for multi-campus chains, districts, or large school groups.
                </p>

                <div className="mt-4">
                  <span className="text-xs text-gray-400 line-through font-normal block">GH₵3,500</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">GH₵1,190</span>
                    <span className="text-xs text-gray-500 font-normal">/mo</span>
                  </div>
                </div>

                <Link href="/payout?plan=enterprise" onClick={() => setSelectedPlan('enterprise')} className="block mt-4">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#6c5ce7] border border-[#6c5ce7] bg-white hover:bg-[#f8f7ff] transition-colors"
                  >
                    Choose plan
                  </button>
                </Link>

                <div className="mt-3 text-[11px] text-gray-500 space-y-0.5">
                  <p>Get 12 months for GH₵14,280 (regular price GH₵42,000)</p>
                  <p>Renews at GH₵1,790/mo.</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited students & campuses</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom domain & full white-label portal</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100 GB NVMe dedicated storage</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Daily and on-demand snapshot backups</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bulk SMS & WhatsApp parent alerts</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="border-b border-dotted border-gray-400">Multi-branch fee ledger & audit trail</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="border-b border-dotted border-gray-400">AI exam generator & student analytics</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority 24/7 dedicated account manager</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-900 mb-2.5">Included modules:</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>Unlimited custom report templates <span className="text-gray-400 italic font-normal">(bespoke)</span></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>Attendance & gradebook register</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-gray-700 shrink-0" />
                        <span>Bursar fee ledger & receipt generator</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>SMS notification gateway</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (Matching Hostinger platform FAQs screenshot) ─────────────── */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-tight mb-12">
          EduManage platform FAQs
        </h2>
        <div className="border-t border-gray-200">
          {[
            {
              q: 'What is EduManage?',
              a: 'EduManage is an all-in-one cloud platform designed specifically for basic, primary, and secondary schools to manage admissions, daily attendance, fee collection, continuous assessment, and terminal report cards from a single command centre.',
            },
            {
              q: 'Who is EduManage for?',
              a: 'EduManage is built for school proprietors, headteachers, administrators, bursars, and classroom teachers who need a straightforward, secure way to run their schools without needing in-house IT staff or complex servers.',
            },
            {
              q: 'Is EduManage only a fee collection system?',
              a: 'No. While fee collection and automated bursary reconciliation are major features, EduManage also handles the full academic lifecycle: student demographics, attendance registers, continuous assessment grading, auto-calculated GPAs, report card generation, and timetable management.',
            },
            {
              q: 'Do I need to know how to code to use EduManage\'s services?',
              a: 'Not at all. EduManage was built with zero technical complexity. The interface is intuitive, allowing teachers to record attendance in one click, bursars to log payments effortlessly, and administrators to generate term reports with no coding needed.',
            },
            {
              q: 'How do I actually set up our school on EduManage?',
              a: 'Getting started takes under 24 hours. Once you submit your school\'s registration, our dedicated onboarding team configures your secure tenant portal, assists with bulk importing your student rosters, and provides staff walk-throughs.',
            },
            {
              q: 'What can our school do with EduManage after we launch?',
              a: 'After launch, you can track daily classroom attendance, collect tuition via Mobile Money and debit cards, automate parent reminder SMS notices, compute terminal report cards with auto-calculated GPAs, and access real-time financial dashboards.',
            },
            {
              q: 'How does EduManage help me get and keep students?',
              a: 'EduManage equips your school with professional digital communication, automated SMS attendance alerts, timely digital report cards, and transparent online fee statements that instill trust with parents and streamline admissions.',
            },
            {
              q: 'Can EduManage handle more if our school grows?',
              a: 'Yes. EduManage is built on high-performance cloud architecture designed to effortlessly scale from a small primary school with 100 pupils to multi-campus institutions with thousands of students.',
            },
            {
              q: 'How much does the EduManage platform cost?',
              a: 'Plans start at GH₵350/mo for Starter School, GH₵590/mo for Growth Academy, and GH₵1,190/mo for multi-campus Enterprise networks. Every subscription includes cloud hosting, daily backups, support, and continuous software updates with no hidden fees.',
            },
            {
              q: 'Is our school and student data secure with EduManage?',
              a: 'Yes. All student records, academic marks, and financial ledgers are encrypted at rest (AES-256) and in transit (TLS 1.3), hosted on secure servers with automated daily backups and 99.9% uptime SLA.',
            },
            {
              q: 'How does EduManage protect student data privacy when using AI?',
              a: 'EduManage strictly adheres to child data privacy guidelines. Pupil personal identifying information is never shared or used to train third-party public models. AI tools (such as report card comment assistance) operate in strict, private tenant isolation.',
            },
          ].map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 hover:text-gray-600 transition-colors cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-normal text-gray-900 group-hover:text-gray-600 transition-colors">
                    {item.q}
                  </span>
                  <Plus
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-800 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
