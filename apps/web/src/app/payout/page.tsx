'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';

type PlanType = 'starter' | 'growth' | 'enterprise';
type PaymentMethod = 'momo' | 'card' | 'bank';

interface PlanDetail {
  id: PlanType;
  name: string;
  badge: string;
  monthlyPrice: number;
  regularPrice: number;
  discount: string;
  periodText: string;
  features: string[];
}

const PLANS: Record<PlanType, PlanDetail> = {
  starter: {
    id: 'starter',
    name: 'Starter School',
    badge: 'Single Campus',
    monthlyPrice: 29,
    regularPrice: 119,
    discount: '75% OFF',
    periodText: 'billed monthly ($348/yr value)',
    features: [
      'Up to 350 students',
      'Custom subdomain (school.edumanage.cloud)',
      'Attendance & continuous assessment gradebook',
      'Bursar fee ledger & receipt generator',
      'Mobile Money fee collection (MTN & Telecel)',
      'Free weekly automated backups',
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth Academy',
    badge: 'Most Popular',
    monthlyPrice: 49,
    regularPrice: 189,
    discount: '79% OFF',
    periodText: 'billed monthly ($588/yr value)',
    features: [
      'Up to 1,500 students',
      'Custom domain & branded school portal',
      'Full Bursary Suite (MoMo, Card & Bank)',
      'Automated SMS parent payment alerts',
      'AI terminal report card generator',
      'Daily backups & 24/7 dedicated support',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Network',
    badge: 'Multi-Campus',
    monthlyPrice: 99,
    regularPrice: 279,
    discount: '71% OFF',
    periodText: 'billed monthly ($1,188/yr value)',
    features: [
      'Unlimited students & campuses',
      'Custom domain & full white-label branding',
      'Multi-branch fee reconciliation & audit trail',
      'Bulk WhatsApp & SMS parent notifications',
      'AI exam generator & student analytics',
      'Dedicated account manager & SLA guarantee',
    ],
  },
};

function PayoutContent() {
  const searchParams = useSearchParams();
  const initialPlan = (searchParams.get('plan') as PlanType) || 'growth';
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(
    PLANS[initialPlan] ? initialPlan : 'growth'
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [schoolName, setSchoolName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');

  // Payment fields
  const [momoNetwork, setMomoNetwork] = useState<'mtn' | 'telecel'>('mtn');
  const [momoNumber, setMomoNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const plan = PLANS[selectedPlan];

  const handleSchoolNameChange = (val: string) => {
    setSchoolName(val);
    if (!subdomain || subdomain === schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 20);
      setSubdomain(slug);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!schoolName.trim()) errs.schoolName = 'Official school name is required';
    if (!adminName.trim()) errs.adminName = 'Administrator full name is required';
    if (!adminEmail.trim() || !adminEmail.includes('@')) {
      errs.adminEmail = 'A valid work email is required for portal credentials';
    }
    if (!adminPhone.trim() || adminPhone.length < 8) {
      errs.adminPhone = 'Valid WhatsApp or phone number is required';
    }

    if (paymentMethod === 'momo') {
      if (!momoNumber.trim() || momoNumber.length < 9) {
        errs.momoNumber = 'Please enter your 10-digit Mobile Money number';
      }
    } else if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!cardExpiry.trim()) {
        errs.cardExpiry = 'MM/YY required';
      }
      if (!cardCvc.trim() || cardCvc.length < 3) {
        errs.cardCvc = 'CVC required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-2xl border shadow-xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Subscription Activated
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Welcome to EduManage, {schoolName}!
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
              Your dedicated tenant portal is provisioning on{' '}
              <span className="font-semibold text-gray-900 font-mono">
                {subdomain || 'school'}.edumanage.cloud
              </span>
              . Initial setup instructions and invoice confirmation have been dispatched to{' '}
              <span className="font-semibold text-gray-900">{adminEmail}</span>.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-gray-50 rounded-xl p-5 border text-left text-xs space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Plan Selected:</span>
              <span className="font-semibold text-gray-900">{plan.name} (${plan.monthlyPrice}/mo)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Administrator:</span>
              <span className="font-semibold text-gray-900">{adminName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Contact / WhatsApp:</span>
              <span className="font-semibold text-gray-900">{adminPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Confirmed (30-Day Guarantee)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-11 px-7 text-xs font-semibold bg-[#673de6] hover:bg-[#582fd3] text-white">
                Go to School Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-11 px-5 text-xs text-gray-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Top Header */}
      <header className="border-b bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-gray-900 font-bold hover:opacity-90 transition-opacity">
            <div className="h-9 w-9 rounded-xl bg-[#673de6] flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-gray-900">EduManage</span>
              <span className="hidden sm:inline-block ml-1 text-xs font-semibold text-[#673de6] bg-purple-50 px-2 py-0.5 rounded-full">
                Portal Checkout
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encrypted</span>
            </div>
            <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Plans
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Complete your school setup
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Provide your institution details to configure your dedicated portal and database instance.
              </p>
            </div>

            {/* Plan Switcher Pills */}
            <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">Selected Tier:</span>
                <span className="text-gray-400">Switch plan anytime</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['starter', 'growth', 'enterprise'] as PlanType[]).map((pKey) => {
                  const p = PLANS[pKey];
                  const isActive = selectedPlan === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setSelectedPlan(pKey)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#673de6] bg-purple-50/50 ring-1 ring-[#673de6]'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 truncate">{p.name.replace(' School', '').replace(' Academy', '').replace(' Network', '')}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#673de6]" />}
                      </div>
                      <div className="mt-1">
                        <span className="text-base font-extrabold text-gray-900">${p.monthlyPrice}</span>
                        <span className="text-[10px] text-gray-500">/mo</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Institution Info FieldSet */}
              <FieldSet>
                <FieldLegend variant="legend" className="text-base font-bold text-gray-900">
                  1. Institution Details
                </FieldLegend>
                <FieldDescription>
                  This information will appear on official student report cards, receipts, and portal branding.
                </FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="schoolName">Official School Name *</FieldLabel>
                    <Input
                      id="schoolName"
                      placeholder="e.g. Oakridge Basic & Junior High Academy"
                      value={schoolName}
                      onChange={(e) => handleSchoolNameChange(e.target.value)}
                      className={errors.schoolName ? 'border-red-400 ring-red-100' : ''}
                    />
                    {errors.schoolName && <FieldError errors={[{ message: errors.schoolName }]} />}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="subdomain">Preferred Portal Subdomain</FieldLabel>
                    <div className="flex items-center rounded-md border border-input bg-transparent shadow-sm focus-within:ring-1 focus-within:ring-ring">
                      <input
                        id="subdomain"
                        type="text"
                        placeholder="oakridge"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                        className="flex-1 px-3 py-2 text-xs bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                      />
                      <span className="pr-3 text-xs text-gray-400 select-none">.edumanage.cloud</span>
                    </div>
                    <FieldDescription>
                      Your teachers, bursars, and parents will access your system via this address.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              {/* Admin Contact FieldSet */}
              <FieldSet>
                <FieldLegend variant="legend" className="text-base font-bold text-gray-900">
                  2. Primary Administrator / Bursar
                </FieldLegend>
                <FieldDescription>
                  Credentials, administrative PINs, and automated reconciliation reports will be sent here.
                </FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="adminName">Administrator Full Name *</FieldLabel>
                    <Input
                      id="adminName"
                      placeholder="e.g. Dr. Kwesi Mensah"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className={errors.adminName ? 'border-red-400 ring-red-100' : ''}
                    />
                    {errors.adminName && <FieldError errors={[{ message: errors.adminName }]} />}
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="adminEmail">School Email Address *</FieldLabel>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@school.edu.gh"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className={errors.adminEmail ? 'border-red-400 ring-red-100' : ''}
                      />
                      {errors.adminEmail && <FieldError errors={[{ message: errors.adminEmail }]} />}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="adminPhone">Phone / WhatsApp Number *</FieldLabel>
                      <Input
                        id="adminPhone"
                        placeholder="+233 24 123 4567"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        className={errors.adminPhone ? 'border-red-400 ring-red-100' : ''}
                      />
                      {errors.adminPhone && <FieldError errors={[{ message: errors.adminPhone }]} />}
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              {/* Payment Method FieldSet */}
              <FieldSet>
                <FieldLegend variant="legend" className="text-base font-bold text-gray-900">
                  3. Payment Channel
                </FieldLegend>
                <FieldDescription>
                  Select your school's preferred billing method. All channels backed by a 30-day refund policy.
                </FieldDescription>

                {/* Channel Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'momo' as const, label: 'Mobile Money', sub: 'MTN & Telecel MoMo', icon: Smartphone, tag: 'Instant' },
                    { id: 'card' as const, label: 'Debit / Card', sub: 'Visa & Mastercard', icon: CreditCard, tag: 'Secure' },
                    { id: 'bank' as const, label: 'Bank Wire', sub: 'Ecobank, Stanbic', icon: Building2, tag: 'ACH' },
                  ].map(({ id, label, sub, icon: Icon, tag }) => {
                    const isSelected = paymentMethod === id;
                    return (
                      <div
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                          isSelected
                            ? 'border-[#673de6] bg-purple-50/50 ring-1 ring-[#673de6]'
                            : 'hover:bg-gray-50 border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#673de6]' : 'text-gray-600'}`} />
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{tag}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{label}</p>
                          <p className="text-[10px] text-gray-500">{sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Channel Specific Inputs */}
                <div className="pt-3">
                  {paymentMethod === 'momo' && (
                    <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
                      <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-800">
                          <input
                            type="radio"
                            name="momoNet"
                            checked={momoNetwork === 'mtn'}
                            onChange={() => setMomoNetwork('mtn')}
                            className="accent-[#673de6]"
                          />
                          MTN Mobile Money
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-800">
                          <input
                            type="radio"
                            name="momoNet"
                            checked={momoNetwork === 'telecel'}
                            onChange={() => setMomoNetwork('telecel')}
                            className="accent-[#673de6]"
                          />
                          Telecel Cash
                        </label>
                      </div>

                      <Field>
                        <FieldLabel htmlFor="momoNumber">MoMo Phone Number *</FieldLabel>
                        <Input
                          id="momoNumber"
                          placeholder="e.g. 024 123 4567"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          className={errors.momoNumber ? 'border-red-400 ring-red-100 bg-white' : 'bg-white'}
                        />
                        <FieldDescription>An authorization prompt will be pushed to this mobile number.</FieldDescription>
                        {errors.momoNumber && <FieldError errors={[{ message: errors.momoNumber }]} />}
                      </Field>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
                      <Field>
                        <FieldLabel htmlFor="cardNumber">Card Number *</FieldLabel>
                        <Input
                          id="cardNumber"
                          placeholder="4123 4567 8910 1112"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className={errors.cardNumber ? 'border-red-400 ring-red-100 bg-white' : 'bg-white'}
                        />
                        {errors.cardNumber && <FieldError errors={[{ message: errors.cardNumber }]} />}
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field>
                          <FieldLabel htmlFor="cardExpiry">Expiration (MM/YY) *</FieldLabel>
                          <Input
                            id="cardExpiry"
                            placeholder="08/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className={errors.cardExpiry ? 'border-red-400 ring-red-100 bg-white' : 'bg-white'}
                          />
                          {errors.cardExpiry && <FieldError errors={[{ message: errors.cardExpiry }]} />}
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="cardCvc">CVC / CVV *</FieldLabel>
                          <Input
                            id="cardCvc"
                            placeholder="123"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className={errors.cardCvc ? 'border-red-400 ring-red-100 bg-white' : 'bg-white'}
                          />
                          {errors.cardCvc && <FieldError errors={[{ message: errors.cardCvc }]} />}
                        </Field>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="bg-gray-50 p-4 rounded-xl border space-y-2 text-xs text-gray-600 leading-relaxed">
                      <p className="font-semibold text-gray-900">Bank Transfer & Standing Order Instructions:</p>
                      <p>
                        An invoice and bank wire remittance slip will be dispatched to <span className="font-semibold">{adminEmail || 'your email'}</span>. Your tenant portal instance will be provisioned immediately for 14-day trial clearance.
                      </p>
                      <div className="bg-white p-3 rounded-lg border text-[11px] font-mono text-gray-700">
                        Bank: Ecobank Ghana PLC<br />
                        Account Name: EduManage Technologies Ltd<br />
                        Account No: 1441002938102
                      </div>
                    </div>
                  )}
                </div>
              </FieldSet>

              {/* Submit CTA */}
              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full h-12 text-sm font-semibold bg-[#673de6] hover:bg-[#582fd3] text-white shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Provisioning School Portal...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Confirm Subscription (${plan.monthlyPrice}/mo) & Launch Portal
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  30-day money-back guarantee · Cancel anytime with zero cancellation fee
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Order Summary</h2>
                  <p className="text-xs text-gray-500">Dedicated School Cloud Tenant</p>
                </div>
                <Badge variant="outline" className="border-purple-200 text-[#673de6] bg-purple-50 text-[10px] font-bold uppercase">
                  {plan.discount}
                </Badge>
              </div>

              {/* Selected Plan Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.periodText}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block font-normal">${plan.regularPrice}/mo</span>
                    <span className="text-2xl font-extrabold text-gray-900">${plan.monthlyPrice}</span>
                    <span className="text-xs text-gray-500 font-normal">/mo</span>
                  </div>
                </div>

                <div className="border-t border-b py-3 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Cloud Tenant Hosting & Backups</span>
                    <span className="text-emerald-600 font-semibold">Included ($0)</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>24-Hour Assisted Data Migration</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Bursar & Teacher Training Walkthrough</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Total Due Today</p>
                    <p className="text-[11px] text-gray-400">Next renewal at ${plan.monthlyPrice}/mo</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#673de6]">${plan.monthlyPrice}</span>
                    <span className="text-xs text-gray-500 font-medium"> USD</span>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="bg-gray-50 rounded-xl p-4 border space-y-2.5">
                <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#673de6]" />
                  What’s included in {plan.name}:
                </p>
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 pt-2 text-xs text-gray-500">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">100% Risk-Free Guarantee:</strong> If EduManage does not streamline your school operations within 30 days, we issue a full refund.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#673de6] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Built for Ghanaian & African Schools:</strong> Native support for Mobile Money fee collection, WASSCE/BECE grading standards, and terminal report templates.
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#673de6] shadow-sm shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-900">Need help subscribing or paying by bank wire?</p>
                <p className="text-gray-600 mt-0.5">Chat with our Accra onboarding team on WhatsApp: <span className="font-semibold text-gray-900">+233 24 123 4567</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PayoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-[#673de6]" />
        </div>
      }
    >
      <PayoutContent />
    </Suspense>
  );
}
