'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  const columns = [
    {
      title: 'SCHOOL PORTALS',
      links: [
        { label: 'Admin Command Centre', href: '/admin' },
        { label: 'Finance & Bursar Portal', href: '/portal/finance' },
        { label: 'Teacher & Academics Portal', href: '/#modules' },
        { label: 'Student Records & Profiles', href: '/admin' },
        { label: 'Parent SMS & Notice Portal', href: '/#modules' },
        { label: 'Multi-Campus Cloud Sync', href: '/#pricing' },
        { label: 'Online Admissions Funnel', href: '/admin' },
        { label: 'Digital Attendance Register', href: '/#modules' },
        { label: 'Timetable & Scheduling', href: '/#modules' },
        { label: 'Terminal Report Card Generator', href: '/#modules' },
        { label: 'Health & Clinic Records', href: '/admin' },
        { label: 'School Subdomain Hosting', href: '/payout?plan=growth' },
        { label: 'Biometric Attendance Sync', href: '/payout?plan=enterprise' },
        { label: 'Automated Daily Cloud Backups', href: '/#pricing' },
      ],
    },
    {
      title: 'CAMPUS ACCESS',
      links: [
        { label: 'School custom domain setup', href: '/payout?plan=growth' },
        { label: 'Custom branded subdomain', href: '/payout?plan=starter' },
        { label: 'Free SSL security certificate', href: '/#pricing' },
        { label: 'Parent Mobile Web Portal', href: '/#modules' },
        { label: 'Student ID card barcode sync', href: '/#modules' },
        { label: 'Role-based staff permissions', href: '/admin' },
        { label: 'Automated SMS alert gateway', href: '/payout?plan=growth' },
        { label: 'WhatsApp notice integration', href: '/payout?plan=enterprise' },
        { label: 'Dedicated database tenant', href: '/#pricing' },
        { label: 'Single Sign-On (SSO) login', href: '/login' },
      ],
    },
    {
      title: 'ACADEMIC TOOLS',
      links: [
        { label: 'AI terminal report remarks', href: '/#modules' },
        { label: 'GPA & class rank calculator', href: '/#modules' },
        { label: 'WAEC / BECE grading standard', href: '/#modules' },
        { label: 'Bursar receipt & invoice maker', href: '/portal/finance' },
        { label: 'Mobile Money payment gateway', href: '/payout' },
        { label: 'Automated fee reminder SMS', href: '/portal/finance' },
        { label: 'Continuous assessment register', href: '/#modules' },
        { label: 'Exam timetable generator', href: '/#modules' },
        { label: 'Student admission pipeline', href: '/admin' },
        { label: 'Bulk roster CSV/Excel importer', href: '/payout' },
        { label: 'Overdue fee aging analytics', href: '/portal/finance' },
        { label: 'EduManage REST API', href: '/admin' },
      ],
    },
    {
      title: 'INFORMATION',
      links: [
        { label: 'Pricing & Packages', href: '/#pricing' },
        { label: 'School Proprietor Reviews', href: '/#faq' },
        { label: 'Proprietor referral program', href: '/#pricing' },
        { label: 'Educational partnerships', href: '/#pricing' },
        { label: 'Accreditation compliance', href: '/#faq' },
        { label: 'Platform release roadmap', href: '/#faq' },
        { label: 'Live system status (99.9% SLA)', href: '/#faq' },
        { label: 'Student data privacy policy', href: '/#faq' },
        { label: 'Trust & security center', href: '/#faq' },
        { label: 'School OS sitemap', href: '/#pricing' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'About EduManage', href: '/#modules' },
        { label: 'Our education mission', href: '/#modules' },
        { label: 'School success stories', href: '/#faq' },
        { label: 'Careers & hiring', href: '/#faq' },
        { label: 'EdTech blog & guides', href: '/#faq' },
        { label: 'African basic school grant', href: '/#pricing' },
        { label: 'West African Education Initiative', href: '/#faq' },
        { label: 'Proprietor code of ethics', href: '/#faq' },
        { label: 'Contact school leadership', href: '/#faq' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'Administrator tutorials', href: '/#faq' },
        { label: 'Bursar fee collection guides', href: '/portal/finance' },
        { label: 'EduManage Teacher Academy', href: '/#faq' },
        { label: '24/7 dedicated school support', href: '/payout' },
        { label: 'Accra WhatsApp onboarding desk', href: '/payout' },
        { label: 'Assisted 24h data migration', href: '/payout' },
        { label: 'Book staff walkthrough session', href: '/payout' },
        { label: 'Report a technical issue', href: '/#faq' },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-700 pt-16 pb-12 sm:pt-20 sm:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 6-Column Navigation Grid matching Hostinger layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3.5">
              <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-600 hover:text-gray-900 transition-colors block py-0.5 leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand, Payments, Socials, Policies Row */}
        <div className="pt-8 border-t border-gray-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6">
          {/* Left: Brand Logo & Payment Badges */}
          <div className="space-y-3.5">
            {/* EduManage Wordmark + Logo */}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#673de6] flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <span className="text-xl font-black tracking-wider text-gray-900 font-sans uppercase">
                EDUMANAGE
              </span>
              <span className="text-[11px] font-bold text-[#673de6] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                School OS
              </span>
            </div>

            {/* Payment Method Badges (MoMo, Visa, Mastercard, AMEX, Bank Wire) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* MoMo Badge (MTN & Telecel) */}
              <div className="h-6 px-2.5 rounded bg-[#ffcc00] border border-[#e6b800] flex items-center justify-center shadow-xs">
                <span className="text-[10px] font-black tracking-tight text-black">
                  MTN MoMo
                </span>
              </div>

              {/* Telecel Cash */}
              <div className="h-6 px-2.5 rounded bg-[#e60000] flex items-center justify-center shadow-xs">
                <span className="text-[10px] font-black tracking-tight text-white">
                  Telecel Cash
                </span>
              </div>

              {/* VISA */}
              <div className="h-6 px-2.5 rounded bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                <span className="text-[11px] font-black italic tracking-wider text-[#1a1f71]">
                  VISA
                </span>
              </div>

              {/* Mastercard */}
              <div className="h-6 px-2.5 rounded bg-white border border-gray-200 flex items-center justify-center gap-0.5 shadow-xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] opacity-90" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] -ml-2 opacity-90" />
              </div>

              {/* AMEX */}
              <div className="h-6 px-2.5 rounded bg-[#006fcf] flex items-center justify-center shadow-xs">
                <span className="text-[9px] font-black tracking-tight text-white uppercase">
                  AMEX
                </span>
              </div>

              {/* Bank Wire */}
              <div className="h-6 px-2 rounded bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                <span className="text-[9px] font-bold text-gray-800 uppercase tracking-tight">
                  Bank Wire
                </span>
              </div>

              {/* and more */}
              <Link href="/payout" className="text-xs text-[#673de6] hover:underline font-medium ml-1">
                and more
              </Link>
            </div>
          </div>

          {/* Right: Social Media Icons + Policy Links */}
          <div className="flex flex-col lg:items-end gap-3.5">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#673de6] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#673de6] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#673de6] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              {/* X (Twitter) */}
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#673de6] transition-colors"
                aria-label="X"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#673de6] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* WhatsApp */}
              <Link
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.54 1.34 5.09L2 22l5.16-1.35a10.02 10.02 0 0 0 4.88 1.27h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.53 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.04 8.04 0 0 1-1.23-4.27c0-4.48 3.65-8.13 8.13-8.13 2.17 0 4.21.85 5.75 2.38a8.08 8.08 0 0 1 2.38 5.75c0 4.49-3.65 8.14-8.13 8.14zm4.46-6.09c-.24-.12-1.45-.71-1.67-.8-.23-.08-.39-.12-.56.12-.17.24-.65.8-.8 1-.15.19-.3.21-.55.09-.24-.12-1.03-.38-1.96-1.21-.73-.65-1.22-1.46-1.36-1.7-.14-.24-.02-.37.11-.49.11-.11.24-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.23-.16-.47-.28z" />
                </svg>
              </Link>
            </div>

            {/* Legal / Policy Links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
              <Link href="/#faq" className="hover:text-gray-900 transition-colors">
                School privacy policy
              </Link>
              <Link href="/#faq" className="hover:text-gray-900 transition-colors">
                Data protection & FERPA
              </Link>
              <Link href="/#faq" className="hover:text-gray-900 transition-colors">
                Refund policy (30-day guarantee)
              </Link>
              <Link href="/#faq" className="hover:text-gray-900 transition-colors">
                Terms of service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Line: Copyright & VAT notice */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="text-center md:text-left">
            © 2026 EduManage Technologies – Empowering basic, primary, and secondary schools with cloud administration.
          </p>
          <p className="shrink-0 text-gray-400">
            Prices are listed without VAT
          </p>
        </div>
      </div>
    </footer>
  );
}
