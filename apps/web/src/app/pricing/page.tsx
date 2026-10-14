'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Check, X, GraduationCap, Zap, Building2, Globe2, ArrowRight,
  Shield, Headphones, BarChart3, Users, CreditCard, BookOpen,
  Clock, Star, TrendingUp, Server, Lock, RefreshCw, Award,
  ChevronDown, ChevronUp,
} from 'lucide-react';

// ── Plan data ─────────────────────────────────────────────────────────────────
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    badge: null,
    tagline: 'Perfect for small schools getting started',
    monthlyPrice: 450,
    annualPrice: 350,
    color: 'border-border',
    headerBg: 'bg-muted/40',
    btnClass: 'border-foreground text-foreground hover:bg-foreground hover:text-background',
    btnVariant: 'outline' as const,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    Icon: GraduationCap,
    limits: {
      students: 'Up to 300 students',
      staff: 'Up to 15 staff accounts',
      schools: '1 school',
      storage: '5 GB storage',
    },
    features: [
      { label: 'Admin Portal (full)', included: true },
      { label: 'Finance / Fee Management', included: true },
      { label: 'Teacher Academic Portal', included: true },
      { label: 'Student Enrollment & Records', included: true },
      { label: 'Timetable Management', included: true },
      { label: 'Examinations & Gradebook', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Fee Collection & Invoicing', included: true },
      { label: 'Basic Financial Reports', included: true },
      { label: 'Email Announcements', included: true },
      { label: 'Multi-School / Branch Support', included: false },
      { label: 'Advanced Analytics & Charts', included: false },
      { label: 'Custom Branding & Domain', included: false },
      { label: 'API Access & Integrations', included: false },
      { label: 'Priority Support (4h SLA)', included: false },
      { label: 'Dedicated Account Manager', included: false },
    ],
    support: 'Email support · 48h response',
    cta: 'Start Free Trial',
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'Most Popular',
    tagline: 'For growing schools that need more power',
    monthlyPrice: 750,
    annualPrice: 590,
    color: 'border-violet-500 ring-2 ring-violet-500/30',
    headerBg: 'bg-gradient-to-br from-violet-600 to-blue-600',
    btnClass: 'bg-violet-600 hover:bg-violet-700 text-white',
    btnVariant: 'default' as const,
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    Icon: Zap,
    limits: {
      students: 'Up to 1,000 students',
      staff: 'Up to 50 staff accounts',
      schools: '1 school',
      storage: '25 GB storage',
    },
    features: [
      { label: 'Admin Portal (full)', included: true },
      { label: 'Finance / Fee Management', included: true },
      { label: 'Teacher Academic Portal', included: true },
      { label: 'Student Enrollment & Records', included: true },
      { label: 'Timetable Management', included: true },
      { label: 'Examinations & Gradebook', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Fee Collection & Invoicing', included: true },
      { label: 'Advanced Financial Reports', included: true },
      { label: 'SMS & Email Announcements', included: true },
      { label: 'Multi-School / Branch Support', included: false },
      { label: 'Advanced Analytics & Charts', included: true },
      { label: 'Custom Branding & Domain', included: true },
      { label: 'API Access & Integrations', included: false },
      { label: 'Priority Support (4h SLA)', included: true },
      { label: 'Dedicated Account Manager', included: false },
    ],
    support: 'Priority email & chat · 4h SLA',
    cta: 'Get Started',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Multi-School',
    tagline: 'For school groups, districts & large institutions',
    monthlyPrice: 1500,
    annualPrice: 1190,
    color: 'border-border',
    headerBg: 'bg-muted/40',
    btnClass: 'border-foreground text-foreground hover:bg-foreground hover:text-background',
    btnVariant: 'outline' as const,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    Icon: Building2,
    limits: {
      students: 'Unlimited students',
      staff: 'Unlimited staff accounts',
      schools: 'Up to 20 schools',
      storage: '200 GB storage',
    },
    features: [
      { label: 'Admin Portal (full)', included: true },
      { label: 'Finance / Fee Management', included: true },
      { label: 'Teacher Academic Portal', included: true },
      { label: 'Student Enrollment & Records', included: true },
      { label: 'Timetable Management', included: true },
      { label: 'Examinations & Gradebook', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Fee Collection & Invoicing', included: true },
      { label: 'Advanced Financial Reports', included: true },
      { label: 'SMS & Email Announcements', included: true },
      { label: 'Multi-School / Branch Support', included: true },
      { label: 'Advanced Analytics & Charts', included: true },
      { label: 'Custom Branding & Domain', included: true },
      { label: 'API Access & Integrations', included: true },
      { label: 'Priority Support (4h SLA)', included: true },
      { label: 'Dedicated Account Manager', included: true },
    ],
    support: 'Dedicated account manager · 1h SLA',
    cta: 'Contact Sales',
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — all plans include a 14-day free trial, no credit card required. You can upgrade or cancel at any time.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time from your admin settings. Prorated billing is applied automatically.',
  },
  {
    q: 'Is my school data safe?',
    a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are compliant with GDPR and local data protection regulations. Daily automated backups are included.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept major credit/debit cards, Mobile Money (MTN, Telecel, AirtelTigo), bank transfers, and cheques for annual plans.',
  },
  {
    q: 'What happens if we exceed our student limit?',
    a: 'We notify you when you reach 90% of your limit and guide you to upgrade. We never cut off access without 30 days notice.',
  },
  {
    q: 'Can multiple schools share one subscription?',
    a: 'The Enterprise plan supports up to 20 schools under one account. For larger networks, contact us for a custom quote.',
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-foreground">EduManage</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs">Log in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="text-xs bg-violet-600 hover:bg-violet-700 text-white">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-16 space-y-24">

        {/* ── HERO ─────────────────────────────────────────────────────────────── */}
        <div className="text-center space-y-5">
          <Badge className="bg-violet-500/10 text-violet-700 border border-violet-200 font-semibold">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            One subscription.
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Everything your school needs.
            </span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            EduManage is a multi-school SaaS platform. Your monthly subscription covers setup,
            hosting, support, and all future updates — no hidden fees, no contracts.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${annual ? 'bg-violet-600' : 'bg-muted-foreground/30'}`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {annual && (
              <Badge className="bg-emerald-500/10 text-emerald-700 border border-emerald-200 text-xs">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* ── PRICING CARDS ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const PlanIcon = plan.Icon;
            const isPopular = plan.id === 'growth';

            return (
              <Card key={plan.id} className={`relative overflow-hidden ${plan.color} flex flex-col`}>
                {/* Popular banner */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-400 text-amber-900 font-bold text-[11px]">
                      ⭐ {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Card header — coloured for Growth */}
                <div className={`${plan.headerBg} p-6 ${isPopular ? 'text-white' : ''}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${plan.iconBg} mb-4`}>
                    <PlanIcon className={`h-6 w-6 ${plan.iconColor}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-foreground'}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-xs mt-1 ${isPopular ? 'text-white/75' : 'text-muted-foreground'}`}>
                    {plan.tagline}
                  </p>

                  <div className="flex items-end gap-1.5 mt-5">
                    <span className={`text-4xl font-extrabold tracking-tight ${isPopular ? 'text-white' : 'text-foreground'}`}>
                      GH₵{price}
                    </span>
                    <div className="mb-1">
                      <p className={`text-xs font-medium ${isPopular ? 'text-white/75' : 'text-muted-foreground'}`}>
                        / mo {annual && <span className="text-[10px]">billed annually</span>}
                      </p>
                      {annual && (
                        <p className={`text-[10px] line-through ${isPopular ? 'text-white/50' : 'text-muted-foreground/60'}`}>
                          GH₵{plan.monthlyPrice}/mo
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 space-y-5">
                  {/* Limits */}
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(plan.limits).map((l) => (
                      <div key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-1.5">
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                        {l}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Features list */}
                  <div className="space-y-2.5">
                    {plan.features.map((f) => (
                      <div key={f.label} className="flex items-center gap-2.5 text-xs">
                        {f.included
                          ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          : <X className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />}
                        <span className={f.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 flex-col gap-3">
                  <Button className={`w-full font-semibold gap-2 ${plan.btnClass}`} variant={plan.btnVariant}>
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    {plan.support}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* ── CUSTOM ENTERPRISE BANNER ────────────────────────────────────────── */}
        <Card className="border-dashed border-2 border-violet-300 bg-gradient-to-r from-violet-500/5 to-blue-500/5">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shrink-0">
                  <Globe2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Need more than 20 schools?</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    We offer custom contracts for government districts, NGOs, and large school networks.
                    Volume discounts, data residency options, and white-label branding available.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                  <Headphones className="h-4 w-4" />
                  Talk to Sales
                </Button>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── TRUST / BENEFITS ROW ────────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Why schools choose EduManage</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Everything included in your subscription — no surprises.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: RefreshCw,  label: 'Free Updates',       desc: 'All feature releases included' },
              { icon: Server,     label: 'Cloud Hosted',        desc: '99.9% uptime SLA guaranteed' },
              { icon: Shield,     label: 'Data Security',       desc: 'AES-256 + TLS 1.3 encryption' },
              { icon: Headphones, label: 'Local Support',       desc: 'Ghanaian customer success team' },
              { icon: TrendingUp, label: 'Grows with You',      desc: 'Upgrade plans at any time' },
              { icon: Lock,       label: 'No Lock-in',          desc: 'Export your data anytime' },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.label} className="hover:ring-2 hover:ring-violet-400/30 transition-all text-center">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                      <Icon className="h-5 w-5 text-violet-600" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">{b.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ── MODULE OVERVIEW ─────────────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">What&apos;s included in every plan</h2>
            <p className="text-sm text-muted-foreground mt-2">Three dedicated portals. One unified platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Building2, color: 'bg-violet-600', title: 'Admin Portal',
                desc: 'Full school operations control — student records, teacher management, announcements, system settings, and a real-time command centre.',
                features: ['Student & Staff records', 'Class & Subject allocation', 'Timetable builder', 'Exam scheduling', 'Announcement broadcasts', 'Analytics dashboard'],
              },
              {
                icon: CreditCard, color: 'bg-emerald-600', title: 'Finance Portal',
                desc: 'Complete fee management for finance officers — invoicing, payment tracking, outstanding follow-up, reports, and budget oversight.',
                features: ['Fee invoicing & collection', 'Outstanding ledger', 'Receipt generation', 'Scholarship & waiver tracking', 'Monthly/term reports', 'Multi-payment method support'],
              },
              {
                icon: BookOpen, color: 'bg-blue-600', title: 'Teacher Portal',
                desc: 'Academic tools for teachers — class gradebook, attendance roll-call, assignment management, timetable, and assessment uploads.',
                features: ['Continuous assessment gradebook', 'Daily attendance roll-call', 'Assignment management', 'Class timetable view', 'Broadcast notices to class', 'Exam result uploads'],
              },
            ].map((portal) => {
              const Icon = portal.icon;
              return (
                <Card key={portal.title} className="flex flex-col">
                  <CardHeader>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${portal.color} text-white mb-2`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-base">{portal.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">{portal.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {portal.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Trusted by schools across Ghana</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                quote: 'EduManage cut our fee collection paperwork by 80%. Our finance officer now has real-time visibility into every account.',
                name: 'Mrs. Akosua Mensah',
                role: 'Headmistress, Adenta Senior High School',
                initials: 'AM',
                stars: 5,
              },
              {
                quote: 'The teacher gradebook module is fantastic. Entering marks, computing grades and downloading reports takes minutes, not hours.',
                name: 'Mr. Kweku Asante',
                role: 'Head of Academics, Wesley Grammar School',
                initials: 'KA',
                stars: 5,
              },
              {
                quote: 'We manage 6 schools under one account. The Enterprise plan is excellent value and the support team is very responsive.',
                name: 'Mr. Nii Kotei',
                role: 'Director, Kotei Education Group',
                initials: 'NK',
                stars: 5,
              },
            ].map((t, i) => (
              <Card key={i} className="flex flex-col">
                <CardContent className="p-6 flex-1">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </CardContent>
                <CardFooter className="gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/10 text-violet-700 font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t pt-3 bg-muted/20">
                    {faq.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-blue-700 p-10 text-center text-white space-y-5">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold">Ready to transform your school?</h2>
          <p className="text-white/75 text-sm max-w-lg mx-auto">
            Join hundreds of schools already using EduManage. Start your 14-day free trial today —
            no credit card required, cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-white/90 font-bold gap-2">
                <Zap className="h-4 w-4" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 gap-2">
                <Headphones className="h-4 w-4" />
                Book a Demo
              </Button>
            </Link>
          </div>
          <p className="text-white/50 text-xs">14-day free trial · No credit card · Cancel anytime</p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pb-4">
          <p>© {new Date().getFullYear()} EduManage · All rights reserved</p>
          <p className="mt-1">
            <Link href="/login" className="hover:text-foreground underline underline-offset-2 mr-3">Log in</Link>
            <Link href="/pricing" className="hover:text-foreground underline underline-offset-2 mr-3">Pricing</Link>
            <Link href="#contact" className="hover:text-foreground underline underline-offset-2">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
