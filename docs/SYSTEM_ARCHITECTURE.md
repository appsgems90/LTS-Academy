# LTS Academy – System Architecture

## Overview

LTS Academy is a mobile-first PWA for managing:

- Student profiles
- Attendance and class hours
- Skill progress tracking
- Target management
- Payments
- Messaging

Frontend: Next.js PWA  
Backend: AWS Serverless  

---

## High-Level Architecture

Frontend (Next.js PWA)
    ↓
API Gateway
    ↓
Lambda Functions
    ↓
DynamoDB
    ↓
S3 (images/documents)

Optional AI:
Amazon Bedrock (Claude)

---

## Core Modules

### 1. Authentication Module
- Parent login
- Admin login
- Role-based access

---

### 2. Family & Student Module

Family:
- familyId
- parentName
- phone
- email

Student:
- studentId
- familyId
- name
- age
- level
- medicalNotes

---

### 3. Attendance & Hours Tracking

Session:
- sessionId
- batchName
- date
- durationHours

Attendance:
- studentId
- sessionId
- present

Total Hours Completed:
Sum of session duration where student present = true

---

### 4. Skill & Progress Tracking

Skill:
- skillId
- level
- name
- description

Student Progress:
- studentId
- skillId
- status (not started / in progress / completed)
- completedDate
- coachNotes

Progress Percentage:
Completed skills / total skills per level

---

### 5. Target Management

Target:
- targetId
- studentId
- description
- dueDate
- status
- coachComments

---

### 6. Payments Module

Invoice:
- invoiceId
- studentId
- month
- amount
- dueDate
- status (unpaid/paid)

Payment:
- paymentId
- invoiceId
- amount
- paymentDate
- transactionReference
- status

Payment Flow:
Parent clicks Pay →
Stripe checkout →
Stripe webhook →
Backend updates invoice status →
Payment recorded

---

### 7. Messaging Module

Phase 1:
Announcement-only messaging

Phase 2:
Group chat (real-time)

Message:
- messageId
- senderRole
- content
- timestamp

---

## Data Relationships

Family
  ↓
Student
  ↓
Enrollment
  ↓
Attendance
  ↓
Progress
  ↓
Invoice
  ↓
Payment

studentId is the core linking key.

---

## Future Enhancements

- Auto monthly invoice generation
- Recurring subscription billing
- Push notifications
- AI assistant (Bedrock)
- Attendance-based billing
- Admin analytics dashboard