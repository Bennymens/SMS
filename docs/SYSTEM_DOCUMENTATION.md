# EduManage Cloud School Management System (SMS)
## Comprehensive System Documentation & User Manual
*A complete guide for School Proprietors, Administrators, Teachers, Bursars, IT Directors, and Software Engineers.*

---

# Table of Contents

- [PART I: Non-Technical Guide & Executive Handbook](#part-i-non-technical-guide--executive-handbook)
  - [1. Executive Summary: What is EduManage?](#1-executive-summary-what-is-edumanage)
  - [2. How EduManage Transforms Everyday School Life](#2-how-edumanage-transforms-everyday-school-life)
    - [2.1 The School Proprietor's Morning Dashboard](#21-the-school-proprietors-morning-dashboard)
    - [2.2 The Bursar's Cashless Fee Collection](#22-the-bursars-cashless-fee-collection)
    - [2.3 The Teacher's Classroom & Report Card Day](#23-the-teachers-classroom--report-card-day)
    - [2.4 The Parent & Guardian Experience](#24-the-parent--guardian-experience)
  - [3. Deep-Dive: Key Features of Each Core Module](#3-deep-dive-key-features-of-each-core-module)
    - [Module A: Admin & Governance Command Centre](#module-a-admin--governance-command-centre)
    - [Module B: Finance & Bursary Management](#module-b-finance--bursary-management)
    - [Module C: Teacher Academics & Digital Gradebook](#module-c-teacher-academics--digital-gradebook)
    - [Module D: Student Information & Parent Portal](#module-d-student-information--parent-portal)
  - [4. Pricing & Subscription Plans (in Ghana Cedis — GH₵)](#4-pricing--subscription-plans-in-ghana-cedis--gh)
  - [5. Frequently Asked Questions (Non-Technical)](#5-frequently-asked-questions-non-technical)
- [PART II: Technical Reference & Architecture Manual](#part-ii-technical-reference--architecture-manual)
  - [6. High-Level Architecture & Monorepo Topology](#6-high-level-architecture--monorepo-topology)
  - [7. Database Schema & Relational Data Models](#7-database-schema--relational-data-models)
  - [8. Security, Authentication & Multi-Tenancy](#8-security-authentication--multi-tenancy)
  - [9. Role-Based Access Control (RBAC) Matrix](#9-role-based-access-control-rbac-matrix)
  - [10. Mobile Money (MoMo) & Payment Webhook Flow](#10-mobile-money-momo--payment-webhook-flow)
  - [11. Grading Algorithm & Report Card Computation Engine](#11-grading-algorithm--report-card-computation-engine)
  - [12. Core REST API Endpoints Specification](#12-core-rest-api-endpoints-specification)
  - [13. Environment Configuration & Deployment Protocols](#13-environment-configuration--deployment-protocols)
  - [14. Disaster Recovery & Backup SLA](#14-disaster-recovery--backup-sla)

---

# PART I: Non-Technical Guide & Executive Handbook

---

## 1. Executive Summary: What is EduManage?

**EduManage** is a modern, unified cloud school management platform designed specifically for nursery, primary, basic, junior high (JHS), senior high (SHS), and multi-campus private and public school groups in Ghana and West Africa.

### The Pain Points It Solves
1. **Manual Paperwork Chaos**: Thousands of paper files, student cards, report cards, and receipts get lost, water-damaged, or torn.
2. **Slow Fee Collection & Leaks**: Cash payments at the bursary desk lead to bookkeeping discrepancies, long queues, and uncollected term arrears.
3. **End-of-Term Teacher Fatigue**: Teachers spend 2 to 3 weeks hand-calculating test scores, exam marks, GPAs, and class ranks, resulting in unavoidable human math errors.
4. **Poor Parent Communication**: Physical letter circulars get crumpled in schoolbags; parents often don't know their child skipped school or has outstanding arrears until end of term.

### The Solution
EduManage consolidates school operations into **three role-specific, intuitive web portals**:
- 🛡️ **Admin Portal**: For owners and headteachers to supervise students, staff, admission funnels, and compliance.
- 💳 **Finance Portal**: For bursars to receive Mobile Money (MTN MoMo, Telecel Cash) and bank transfers with instant automated reconciliation and receipts.
- 📚 **Teacher Portal**: For teachers to mark roll-call in 10 seconds and generate official WAEC/BECE terminal report cards with automatic GPA math.

---

## 2. How EduManage Transforms Everyday School Life

### 2.1 The School Proprietor's Morning Dashboard
When the school owner or headmistress opens their tablet at 8:00 AM:
- **Instant Health Score (e.g. 94/100)**: Immediately highlights campus readiness, safety compliance, and teacher-pupil ratios.
- **Attendance at a Glance**: Displays live percentages—how many pupils are present across all classes and which teachers have arrived.
- **Cashflow Realities**: Shows exact tuition collected this week in Ghana Cedis (`GH₵`), total outstanding arrears, and upcoming payroll obligations.

### 2.2 The Bursar's Cashless Fee Collection
Instead of handling loose cash, handwritten receipts, and physical bank deposit slips:
- A parent selects their child on their phone, types their Mobile Money number, and receives an **instant MoMo prompt** on their phone to approve the transaction.
- The money lands directly in the school's merchant account; the system reconciles the pupil's balance in zero seconds.
- An official numbered PDF receipt with institutional watermark and QR verification code is generated automatically.
- For parents who fall behind, the bursar clicks **"Dispatch Reminder SMS"**: parents receive an SMS with their child's name, precise balance (e.g., `GH₵450.00`), and a direct link to pay.

### 2.3 The Teacher's Classroom & Report Card Day
- **Morning Roll-Call**: The teacher logs in on their phone, taps through the roster (*Present*, *Absent*, *Late*), and submits. If a pupil is absent, an automatic SMS alert is instantly triggered to the guardian's phone.
- **Continuous Assessment (CA 30/70)**: Throughout the term, teachers log marks for class tests, homework, and mid-term projects (30%). After final exams (70%), the system computes totals, assigns letter grades, calculates class positions (e.g., *1st of 38 pupils*), and fills in report card sheets automatically.
- **Batch Report Card Generation**: The headteacher reviews remarks and clicks **"Generate All Report Cards"** to produce print-ready, official WAEC/BECE-formatted report cards in minutes.

### 2.4 The Parent & Guardian Experience
- Parents can log in from anywhere to check their child's daily attendance records, homework assignments, and term marks.
- Parents can download official terminal report cards without traveling to campus.
- Transparent statements show historical fee payments, eliminating disputes over whether a term fee was paid.

---

## 3. Deep-Dive: Key Features of Each Core Module

### Module A: Admin & Governance Command Centre
*Audience: School Proprietors, Headteachers, Board Members, Administrative Registrars.*

| Feature | Non-Technical Description | Real-World Value |
| :--- | :--- | :--- |
| **Institutional Health Score** | A 0–100 index calculating school performance, teacher-pupil ratio, curriculum milestones, and safety compliance. | Lets proprietors spot problems (e.g. high absenteeism or understaffing) before they hurt school reputation. |
| **Admissions Pipeline Funnel** | Tracks applicants from initial online inquiry, form submission, and entrance exam, through to offer letters and enrollment. | Replaces paper folders with an organized dashboard that boosts new student enrollment conversions. |
| **Staff Rosters & RBAC** | Manages teachers, bursars, and administrators with clear permission controls (who can edit marks, who can view money). | Protects sensitive student records and financial balances from unauthorized viewing or edits. |
| **Academic Terms & Exams Calendar** | Central calendar for Ghanaian 3-term academic calendars, mid-term breaks, examination timetables, and PTA speech days. | Ensures all staff, parents, and students stay aligned on crucial deadlines and term dates. |
| **Student Information System (SIS)** | Central repository for student bio-data, parent contacts, emergency medical flags, and historic academic performance. | Eliminates lost student files and gives administrators immediate access to vital records during emergencies. |
| **Campus Notice Broadcasts** | School-wide announcement banner and SMS dispatch engine for urgent notices, holidays, or emergency closures. | Replaces paper circulars that pupils lose on their way home with direct communication to parents' phones. |

---

### Module B: Finance & Bursary Management
*Audience: School Bursars, Finance Officers, Accountants, School Proprietors.*

| Feature | Non-Technical Description | Real-World Value |
| :--- | :--- | :--- |
| **Instant MoMo Gateway** | Direct integration with MTN Mobile Money and Telecel Cash for automated, contactless fee payments. | No need for parents to queue at banks or bursaries; payments reconcile in seconds with zero cash theft risk. |
| **Automated Overdue SMS** | Scheduled SMS messages sent to parents with outstanding balances, showing student name and amount due. | Proven to increase term-time fee collection rates by up to 80% without stressful confrontation. |
| **Double-Entry Bursary Ledger** | Automated digital bookkeeping that records every cedi collected, expense incurred, and bank transfer completed. | Provides complete financial transparency, eliminating cash discrepancies and streamlining annual tax/audit filing. |
| **Official Numbered Receipts** | Digital receipts generated with sequential numbers, payment breakdown, and verifiable QR codes. | Eliminates dispute claims ("I paid last week!") by providing parents with verifiable proof of payment. |
| **Flexible Fee Structures** | Set up different fee bundles for Day vs. Boarding, class grades, PTA dues, ICT levies, and sibling discounts. | Accommodates complex fee scenarios easily (e.g. 10% off for 2nd and 3rd siblings; scholarships for staff children). |
| **Department Budget Burn-Rate** | Allocates budgets for Sciences, Sports, Facilities, and Boarding Kitchens, warning when spending reaches 85%. | Prevents departmental overspending and keeps operating expenses within planned revenue limits. |

---

### Module C: Teacher Academics & Digital Gradebook
*Audience: Subject Teachers, Class Masters/Mistresses, Academic Deans, Exam Officers.*

| Feature | Non-Technical Description | Real-World Value |
| :--- | :--- | :--- |
| **1-Tap Daily Attendance** | Mobile-friendly roll-call screen where teachers can mark an entire class in less than 30 seconds. | Saves 15 minutes every morning and immediately alerts parents if their child is absent or truant. |
| **Continuous Assessment (30/70)** | Standardized Ghanaian marking system: 30% Continuous Assessment (tests/projects) + 70% Terminal Examination. | Complies directly with Ministry of Education & GES guidelines; custom splits (e.g., 40/60) are also supported. |
| **Auto GPA & Class Ranking** | The system automatically calculates total marks, percentage scores, letter grades, and 1st, 2nd, 3rd class positions. | Completely removes human math errors and saves teachers hundreds of hours of manual arithmetic. |
| **Print-Ready Terminal Report Cards** | Generates beautiful, official PDF report cards with school crest, subject scores, teacher remarks, and signature lines. | Publication-quality reports ready for print or parent download on speech day or term closure. |
| **Timetable & Subject Schedules** | Visual weekly master schedule showing classroom periods, teacher allocations, and lab assignments. | Eliminates timetable clashes where two classes are scheduled for the same room or teacher simultaneously. |
| **Digital Assignments** | Teachers can post homework questions with file attachments and track student submission statuses. | Keeps students academically engaged and provides parents with visibility into nightly homework tasks. |

---

### Module D: Student Information & Parent Portal
*Audience: Students, Parents, Guardians.*

| Feature | Non-Technical Description | Real-World Value |
| :--- | :--- | :--- |
| **Parent Mobile Dashboard** | Secure web portal accessible from any phone or PC where parents view all their enrolled children. | Bridges the gap between home and school, strengthening parent trust and engagement. |
| **Live Attendance History** | Calendar view showing which days a pupil was Present, Late, Absent, or Excused. | Prevents truancy and gives parents peace of mind about their children's whereabouts during school hours. |
| **Direct Fee Settlement** | Parents view their exact balance and pay instantly using their Mobile Money wallet. | Convenient 24/7 payment access without taking time off work to visit the school bursary. |
| **Digital Report Card Downloads** | Instant access to historical and current terminal report cards with print and PDF download capabilities. | Preserves permanent records of academic achievements that cannot be lost or damaged. |

---

## 4. Pricing & Subscription Plans (in Ghana Cedis — GH₵)

All plans include cloud hosting, SSL security certificates, automated daily backups, 99.9% uptime SLA, and free software updates.

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│     Starter School      │     Growth Academy      │   Enterprise Network    │
│      (Single Campus)    │      (Most Popular)     │     (Multi-Campus)      │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│    GH₵350 / month       │    GH₵590 / month       │   GH₵1,190 / month      │
│  (Regular: GH₵1,400)    │  (Regular: GH₵2,200)    │   (Regular: GH₵3,500)   │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ • Up to 350 pupils      │ • Up to 1,500 pupils    │ • Unlimited pupils      │
│ • Custom subdomain      │ • Custom branded domain │ • Multi-campus sync     │
│ • Attendance & Grades   │ • Full Bursary & MoMo   │ • Multi-branch ledger   │
│ • Weekly cloud backups  │ • Automated SMS Chasers │ • Dedicated manager     │
│ • Standard support      │ • AI Terminal Reports   │ • Priority 24/7 SLA     │
│ • Renews at GH₵590/mo   │ • Renews at GH₵950/mo   │ • Renews at GH₵1,790/mo │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

- **Commitment Discount**: Pay for 12 months upfront and save an additional percentage (Starter: `GH₵4,200/yr`, Growth: `GH₵7,080/yr`, Enterprise: `GH₵14,280/yr`).
- **30-Day Guarantee**: Every subscription comes with an unconditional 30-day money-back guarantee.
- **Onboarding Included**: 24-hour tenant provisioning, free historical student data migration from Excel, and remote staff walk-throughs.

---

## 5. Frequently Asked Questions (Non-Technical)

#### Do teachers or bursars need computer science skills to use EduManage?
No. The interface was intentionally designed to resemble popular smartphone applications. If a teacher knows how to send a WhatsApp message, they can mark attendance and enter student test marks within 5 minutes of training.

#### Can we use EduManage on smartphones and tablets?
Yes. The entire platform is 100% responsive and functions smoothly on smartphones, tablets, laptops, and desktop computers without installing heavy software.

#### What happens if our school internet drops?
You can keep working on your phone using mobile cellular data (MTN, Telecel, AT). EduManage uses lightweight, optimized web packages that consume minimal mobile data.

#### How do parents receive their report cards?
Parents can log into their private parent portal to download report cards as PDF files. Schools can also batch-print physical hardcopy report cards for traditional speech and prize-giving ceremonies.

#### Can EduManage handle sibling discounts and scholarships?
Yes. Bursars can configure automated fee rules such as a 10% discount on the 2nd child, 15% on the 3rd child, or 100% tuition scholarships for staff children.

---

# PART II: Technical Reference & Architecture Manual

---

## 6. High-Level Architecture & Monorepo Topology

EduManage is organized as an enterprise-grade monorepo managed via **Turborepo** and **pnpm workspaces**:

```
sms-monorepo/
├── apps/
│   ├── web/                     # Next.js 14 App Router Frontend
│   │   ├── src/app/
│   │   │   ├── page.tsx         # Landing page with 3D rotating module showcase
│   │   │   ├── payout/page.tsx  # Multi-tier checkout & tenant onboarding
│   │   │   ├── pricing/page.tsx # Subscription breakdown in Ghana Cedis
│   │   │   ├── login/page.tsx   # Multi-role authentication portal
│   │   │   └── (dashboard)/     # Authenticated application suite
│   │   │       ├── admin/       # Governance, SIS, compliance score
│   │   │       └── portal/
│   │   │           ├── finance/ # Bursary ledger, MoMo reconcile, budgeting
│   │   │           └── teacher/ # Roll-call register, CA 30/70, report cards
│   │   └── src/components/ui/   # Radix + Tailwind component library
│   └── api/                     # NestJS Modular Backend API
│       └── src/
│           ├── auth/            # JWT issuance, refresh tokens, passport guards
│           ├── schools/         # Tenant isolation & provisioning
│           ├── students/        # Bio-data, enrollments, documents
│           ├── attendance/      # Daily & period attendance tracking
│           ├── fees/            # Fee structures, MoMo webhooks, payments
│           └── reports/         # Dynamic PDF generation engine
└── packages/
    ├── database/                # Prisma ORM & PostgreSQL Migrations
    │   └── prisma/schema.prisma # 25+ relational models & domain enums
    └── shared/                  # Common TypeScript interfaces, DTOs & constants
```

---

## 7. Database Schema & Relational Data Models

The data layer uses **PostgreSQL** configured through Prisma ORM (`packages/database/prisma/schema.prisma`).

### Core Entity Relationships

```
  ┌──────────────┐       1:N       ┌──────────────┐
  │    School    ├────────────────►│     User     │
  └──────┬───────┘                 └──────┬───────┘
         │ 1:N                            │ 1:1
         ▼                                ▼
  ┌──────────────┐       1:N       ┌──────────────┐
  │ AcademicYear ├────────────────►│Student/Teach.│
  └──────┬───────┘                 └──────┬───────┘
         │ 1:N                            │ 1:N
         ▼                                ▼
  ┌──────────────┐       1:N       ┌──────────────┐
  │     Term     ├────────────────►│ Attend./Fee  │
  └──────────────┘                 └──────────────┘
```

### Essential Models Specification

1. **`School`**: Represents an isolated tenant entity with dedicated subdomain slug, logo, timezone, currency (`GHS`), and JSON configuration settings.
2. **`User`**: Core identity table storing `email`, `passwordHash` (bcrypt), `role` enum, active status, and audit timestamps.
3. **`Student` & `StudentEnrollment`**: Stores student bio-data, unique `admissionNo`, class section mapping, guardian relations, and medical records.
4. **`AttendanceRecord` & `PeriodAttendance`**: Unique composite constraint on `[studentId, date, sectionId]` ensuring zero duplicate roll-calls.
5. **`Examination`, `ClassSubject`, `Grade`**: Represents term tests, CA assessments, and final exams with composite index on `[studentId, examinationId, classSubjectId]`.
6. **`FeeStructure`, `FeeRecord`, `Payment`**: Tracks receivables, term discounts, payment method (`CASH`, `BANK_TRANSFER`, `CARD`, `ONLINE`), sequential `receiptNo`, and gateway transaction references.
7. **`ReportCard`**: Stores pre-computed aggregate marks, overall percentage, class rank integer, JSON attendance snapshots, and remarks.

---

## 8. Security, Authentication & Multi-Tenancy

### Multi-Tenant Data Isolation Strategy
- Multi-tenancy is enforced via **Logical Row-Level Isolation**.
- Every relational query automatically appends a parameterized `schoolId` filter derived from the verified JWT payload:
  ```typescript
  // Enforced tenant scoping example
  const students = await prisma.student.findMany({
    where: {
      schoolId: req.user.schoolId,
      status: StudentStatus.ACTIVE,
    },
  });
  ```
- Cross-tenant data leakage is cryptographically prevented because client tokens only sign the tenant ID to which the user has been granted access.

### Cryptographic Security Standards
1. **Password Hashing**: Uses `bcrypt` with cost factor 12 (salt rounds).
2. **Authentication Tokens**:
   - Access Token: Short-lived HMAC SHA-256 JWT (15-minute lifespan).
   - Refresh Token: High-entropy cryptographically random string (64 bytes) stored with expiration and revocation status in the `refresh_tokens` database table.
3. **Data Encryption**:
   - In Transit: TLS 1.3 encryption with strict HSTS headers.
   - At Rest: AES-256 transparent database storage encryption.

---

## 9. Role-Based Access Control (RBAC) Matrix

| Resource / Action | SUPER_ADMIN | SCHOOL_ADMIN | PRINCIPAL | ACCOUNTANT | TEACHER | PARENT | STUDENT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Manage Tenant Settings** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Create / Dismiss Staff** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Financial Ledger** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Record MoMo / Cash Fee** | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Mark Class Attendance** | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Enter Subject CA / Marks** | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Approve Terminal Reports** | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Child Marks & Fees** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **View Own Grades / Schedule**| ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 10. Mobile Money (MoMo) & Payment Webhook Flow

```
[Parent / Bursar]
       │
       ▼  1. POST /api/fees/collect (Amount, MoMo Number, StudentID)
[NestJS API]
       │
       ▼  2. Initiate USSD push prompt
[Telecom Gateway (MTN / Telecel)]
       │
       ▼  3. Parent enters MoMo PIN on mobile phone
[Mobile Device]
       │
       ▼  4. Transaction approved
[Telecom Gateway]
       │
       ▼  5. Signed Webhook (POST /api/webhooks/momo)
[NestJS API]
       │
       ├─► Verify HMAC SHA-256 Webhook Signature
       ├─► Atomic DB Transaction:
       │     • Update FeeRecord status: UNPAID -> PAID
       │     • Insert Payment record with sequential receiptNo
       └─► Trigger Background Jobs:
             • Send Payment Confirmation SMS to parent
             • Invalidate cached fee ledgers
```

### Idempotency & Webhook Security
- Webhook endpoints verify the telecom cryptographic signature using the shared secret key.
- Every payment transaction includes an `idempotencyKey` ensuring that network retry packets cannot result in double-crediting pupil accounts.

---

## 11. Grading Algorithm & Report Card Computation Engine

### Continuous Assessment (CA 30/70) Mathematical Model

For any subject $S$ assigned to a student:

$$\text{Final Subject Score} = \left(\frac{\text{CA Marks Obtained}}{\text{Max CA Marks}} \times 30\right) + \left(\frac{\text{Exam Marks Obtained}}{\text{Max Exam Marks}} \times 70\right)$$

### Standardized Ghanaian Basic & Secondary Grade Mapping

```
Score Range (%)    Letter Grade    Grade Point    WAEC Descriptor
─────────────────────────────────────────────────────────────────
80% – 100%              A1             1          Excellent
70% – 79.9%             B2             2          Very Good
65% – 69.9%             B3             3          Good
60% – 64.9%             C4             4          Credit
55% – 59.9%             C5             5          Credit
50% – 54.9%             C6             6          Pass
45% – 49.9%             D7             7          Pass
40% – 44.9%             E8             8          Weak Pass
0%  – 39.9%             F9             9          Fail
```

### Class Ranking Tie-Breaker Algorithm
1. Cumulative percentage score across all mandatory subjects.
2. If total percentages are identical, the system compares core subject averages (Mathematics, English Language, Integrated Science, Social Studies).
3. If still equal, pupils share the same rank (e.g. *Tied 3rd*), and the next pupil receives the subsequent ordinal index.

---

## 12. Core REST API Endpoints Specification

### Authentication
- `POST /api/auth/login`: Authenticate with email/password, returns JWT pair.
- `POST /api/auth/refresh`: Exchanges refresh token for new access token.
- `GET /api/auth/me`: Returns profile of current authenticated user.

### Students & Admissions
- `GET /api/students`: Lists enrolled pupils with pagination and search.
- `POST /api/students`: Creates new student bio-data profile.
- `POST /api/students/import`: Bulk CSV roster ingest with schema validation.

### Attendance
- `GET /api/attendance?sectionId=:id&date=:date`: Returns daily roll-call sheet.
- `POST /api/attendance/bulk`: Atomically saves class attendance for all students and dispatches absence SMS notifications.

### Fees & Accounting
- `GET /api/fees/students/:id`: Returns pupil ledger balance and fee records.
- `POST /api/fees/collect`: Initiates MoMo or cash payment transaction.
- `POST /api/webhooks/momo`: Webhook receiver for telecom gateway confirmations.

### Academics & Terminal Reports
- `GET /api/grades/section/:id/subject/:id`: Returns mark entry sheet for teacher.
- `POST /api/grades/save`: Saves CA test scores and exam marks.
- `POST /api/reports/generate-class/:sectionId`: Compiles batch PDF terminal report cards.

---

## 13. Environment Configuration & Deployment Protocols

### Key Environment Variables (`.env`)
```bash
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/edumanage?schema=public"

# Cryptographic Secrets
JWT_SECRET="super-secret-high-entropy-jwt-key"
JWT_EXPIRATION="15m"
REFRESH_TOKEN_SECRET="super-secret-refresh-key"

# Telecom & MoMo Gateways
MOMO_API_KEY="momo_prod_key_xxxxxxxx"
MOMO_SECRET_KEY="momo_secret_xxxxxxxx"
MOMO_CALLBACK_URL="https://api.edumanage.cloud/api/webhooks/momo"

# SMS Gateway
SMS_GATEWAY_API_KEY="sms_prod_key_xxxxxxxx"
SMS_SENDER_ID="EduManage"

# Storage & Backups
S3_BUCKET_NAME="edumanage-documents"
S3_REGION="af-south-1"
```

### Production Build & Launch Commands
```bash
# 1. Install dependencies across monorepo
pnpm install

# 2. Generate Prisma Client bindings
pnpm --filter database exec prisma generate

# 3. Apply schema migrations
pnpm --filter database exec prisma migrate deploy

# 4. Compile Next.js web application
pnpm --filter web build

# 5. Start production instances
pnpm --filter web start
```

---

## 14. Disaster Recovery & Backup SLA

1. **RPO (Recovery Point Objective)**: Under 1 hour. Automated database transaction logs are archived continuously.
2. **RTO (Recovery Time Objective)**: Under 30 minutes. Automated container orchestrators spin up replacement tenant pods upon hardware failure.
3. **Daily Snapshots**: Automated encrypted snapshots taken every midnight UTC and copied to geo-redundant storage.
4. **Data Portability**: Full data export (pupil records, attendance tables, fee ledgers) available in standardized CSV format at any time from the Admin Settings portal.
