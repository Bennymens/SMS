'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  studentAdmissionSchema,
  StudentAdmissionFormValues,
} from '@school-management/shared/types/student';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  User,
  GraduationCap,
  HeartPulse,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface StudentAdmissionFormProps {
  academicYears: Array<{ id: string; name: string }>;
  classes: Array<{ id: string; name: string }>;
  sections: Array<{ id: string; name: string; classId: string }>;
  onSubmitSuccess?: (studentId: string) => void;
}

export const StudentAdmissionForm: React.FC<StudentAdmissionFormProps> = ({
  academicYears,
  classes,
  sections,
  onSubmitSuccess,
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StudentAdmissionFormValues>({
    resolver: zodResolver(studentAdmissionSchema),
    defaultValues: {
      gender: 'MALE',
      admissionDate: new Date().toISOString().split('T')[0],
      hasExistingGuardian: false,
      newGuardian: {
        isPrimary: true,
        canPickup: true,
      },
      address: {
        country: 'United States',
      },
    },
  });

  const selectedClassId = watch('classId');
  const filteredSections = sections.filter((s) => s.classId === selectedClassId);

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Enrollment & Academic', icon: GraduationCap },
    { id: 3, title: 'Parent / Guardian', icon: Users },
    { id: 4, title: 'Address & Medical', icon: MapPin },
  ];

  const onSubmit = async (values: StudentAdmissionFormValues) => {
    setIsSubmitting(true);
    setErrorBanner(null);

    try {
      const response = await fetch('/api/v1/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to admit student');
      }

      const result = await response.json();
      if (onSubmitSuccess) {
        onSubmitSuccess(result.id);
      } else {
        router.push(`/students/${result.id}`);
      }
    } catch (err: any) {
      setErrorBanner(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step Progress Tracker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <div
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-border/60 bg-card hover:bg-muted/40'
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Step {step.id}</p>
                <p className="text-xs font-medium text-foreground">{step.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {errorBanner && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {errorBanner}
        </div>
      )}

      {/* Main Form Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>
                Enter the basic personal and student identification information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">First Name *</label>
                  <Input {...register('firstName')} placeholder="Jane" className="mt-1" />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Last Name *</label>
                  <Input {...register('lastName')} placeholder="Doe" className="mt-1" />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Email Address *</label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="jane.doe@school.edu"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Initial Password *</label>
                  <Input
                    type="password"
                    {...register('password')}
                    placeholder="Min 8 characters"
                    className="mt-1"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Date of Birth *</label>
                  <Input type="date" {...register('dateOfBirth')} className="mt-1" />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-xs text-destructive">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Gender *</label>
                  <select
                    {...register('gender')}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Blood Group</label>
                  <Input {...register('bloodGroup')} placeholder="e.g. O+, A+, B-" className="mt-1" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Nationality</label>
                  <Input {...register('nationality')} placeholder="e.g. American, Canadian" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" onClick={() => setCurrentStep(2)} className="gap-2">
                  Next: Academic Placement
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: ENROLLMENT & ACADEMIC PLACEMENT */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Academic Enrollment</CardTitle>
              <CardDescription>
                Assign class, section, academic year and registration details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Academic Year *</label>
                  <select
                    {...register('academicYearId')}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((ay) => (
                      <option key={ay.id} value={ay.id}>
                        {ay.name}
                      </option>
                    ))}
                  </select>
                  {errors.academicYearId && (
                    <p className="mt-1 text-xs text-destructive">{errors.academicYearId.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Admission Date *</label>
                  <Input type="date" {...register('admissionDate')} className="mt-1" />
                  {errors.admissionDate && (
                    <p className="mt-1 text-xs text-destructive">{errors.admissionDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Class / Grade *</label>
                  <select
                    {...register('classId')}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Class</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.classId && (
                    <p className="mt-1 text-xs text-destructive">{errors.classId.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Section *</label>
                  <select
                    {...register('sectionId')}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Section</option>
                    {filteredSections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.sectionId && (
                    <p className="mt-1 text-xs text-destructive">{errors.sectionId.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Roll Number (Optional)</label>
                  <Input {...register('rollNumber')} placeholder="e.g. 14" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="button" onClick={() => setCurrentStep(3)} className="gap-2">
                  Next: Guardian Info
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 3: PARENT / GUARDIAN */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Guardian & Family Information</CardTitle>
              <CardDescription>
                Assign primary contact for emergency notifications and portal access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Guardian First Name *</label>
                  <Input {...register('newGuardian.firstName')} placeholder="Robert" className="mt-1" />
                  {errors.newGuardian?.firstName && (
                    <p className="mt-1 text-xs text-destructive">{errors.newGuardian.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Guardian Last Name *</label>
                  <Input {...register('newGuardian.lastName')} placeholder="Doe" className="mt-1" />
                  {errors.newGuardian?.lastName && (
                    <p className="mt-1 text-xs text-destructive">{errors.newGuardian.lastName.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Guardian Email *</label>
                  <Input
                    type="email"
                    {...register('newGuardian.email')}
                    placeholder="robert.doe@example.com"
                    className="mt-1"
                  />
                  {errors.newGuardian?.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.newGuardian.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Guardian Phone Number *</label>
                  <Input
                    type="tel"
                    {...register('newGuardian.phone')}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                  {errors.newGuardian?.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors.newGuardian.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Relationship *</label>
                  <select
                    {...register('newGuardian.relationship')}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="button" onClick={() => setCurrentStep(4)} className="gap-2">
                  Next: Address & Medical
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 4: ADDRESS & MEDICAL */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Address & Health Details</CardTitle>
              <CardDescription>
                Residential address and critical medical or allergy notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Residential Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-foreground">Street Address *</label>
                    <Input {...register('address.street')} placeholder="123 Academic Way" className="mt-1" />
                    {errors.address?.street && (
                      <p className="mt-1 text-xs text-destructive">{errors.address.street.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">City *</label>
                    <Input {...register('address.city')} placeholder="Springfield" className="mt-1" />
                    {errors.address?.city && (
                      <p className="mt-1 text-xs text-destructive">{errors.address.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">State / Province *</label>
                    <Input {...register('address.state')} placeholder="Illinois" className="mt-1" />
                    {errors.address?.state && (
                      <p className="mt-1 text-xs text-destructive">{errors.address.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Country *</label>
                    <Input {...register('address.country')} placeholder="United States" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Postal / Zip Code</label>
                    <Input {...register('address.zipCode')} placeholder="62701" className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Medical & Emergency Info
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Family Doctor Name</label>
                    <Input {...register('medicalInfo.doctorName')} placeholder="Dr. Smith" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Doctor Phone Number</label>
                    <Input {...register('medicalInfo.doctorPhone')} placeholder="+1 (555) 321-4567" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-foreground">Special Medical Notes / Allergies</label>
                    <Input
                      {...register('medicalInfo.notes')}
                      placeholder="e.g. Peanut allergy, Asthma inhaler required"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(3)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Admitting Student...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Complete Admission
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};
