# 🌊 Dayflow — Human Resource Management System (HRMS)

**Every workday, perfectly aligned.**

Dayflow is a **modern, role-based Human Resource Management System (HRMS)** designed to digitize and streamline core HR operations. Built with a scalable React architecture, Dayflow simplifies employee management, attendance tracking, leave workflows, and payroll visibility — all in one clean and intuitive platform.

> Designed & Developed by **SHUBHAMOS** 🚀

---

## ✨ Overview

Dayflow helps organizations manage their workforce efficiently by providing a **secure, centralized, and user-friendly HR platform**. It supports both **Employees** and **HR/Admin users** with role-specific dashboards and workflows, ensuring clarity, transparency, and productivity across teams.

The system focuses on:

* Reducing manual HR processes
* Improving employee experience
* Enabling HR teams to manage operations effortlessly

---

## 🚀 Key Features

### 🔐 Authentication & Security

* Secure **Sign Up / Sign In**
* Email verification
* Strong password rules
* Role-based access control (Employee / HR / Admin)

---

### 👥 Role-Based Access

#### 🧑‍💼 Employee

* View personal profile
* Track attendance (daily & weekly)
* Apply for leave and time-off
* View salary & payroll details (read-only)

#### 🛠️ Admin / HR Officer

* Manage employee records
* Approve or reject leave requests
* Monitor attendance of all employees
* View and update payroll structures
* Switch between employee profiles

---

### 📊 Dashboards

#### Employee Dashboard

* Quick access to:

  * Profile
  * Attendance
  * Leave requests
  * Logout
* Displays recent activities and alerts

#### Admin / HR Dashboard

* Employee list overview
* Attendance records
* Pending leave approvals
* Centralized management controls

---

### 🧾 Employee Profile Management

* Personal details
* Job & role information
* Salary structure
* Documents & profile picture

**Permissions**

* Employees: Edit limited fields (address, phone, profile picture)
* Admin/HR: Full edit access

---

### ⏱️ Attendance Management

* Daily & weekly attendance views
* Check-in / check-out system
* Attendance statuses:

  * Present
  * Absent
  * Half-day
  * Leave

**Access Control**

* Employees: View only their own attendance
* Admin/HR: View attendance of all employees

---

### 🏖️ Leave & Time-Off Management

#### Apply for Leave (Employee)

* Select leave type:

  * Paid
  * Sick
  * Unpaid
* Choose date range
* Add remarks
* Track request status:

  * Pending
  * Approved
  * Rejected

#### Leave Approval (Admin/HR)

* View all leave requests
* Approve or reject requests
* Add comments
* Instant updates to employee records

---

### 💰 Payroll Management

#### Employee

* View payroll details (read-only)

#### Admin / HR

* View payroll of all employees
* Update salary structures
* Maintain payroll accuracy

---

### 🔔 Notifications & Reports

* Email and system notifications
* Analytics and reports dashboard
* Attendance reports
* Salary slips & payroll summaries

---

## 🧱 Tech Stack

* **React 18**
* **Vite**
* **Redux Toolkit**
* **React Router v6**
* **Tailwind CSS**
* **React Hook Form**
* **Framer Motion**
* **D3.js & Recharts**
* **Jest & React Testing Library**
* **PostgreSQL (Backend integration ready)**

---

## 📁 Project Structure

```plaintext
dayflow/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── styles/             # Global styles & Tailwind setup
│   ├── App.jsx             # Root component
│   ├── Routes.jsx          # Route definitions
│   └── index.jsx           # Entry point
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

---

## 🛠️ Installation & Setup

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

---

## 📦 Production Build

```bash
npm run build
```

---

## 🔮 Future Enhancements

* Advanced analytics dashboard
* Automated payroll generation
* Role-based document management
* Performance tracking & appraisals
* Multi-organization support

---

## 🧠 Design & Planning

System design and flow diagrams were created using Excalidraw:
[https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)
Live Preview [shubhamos.ddns.net] (shubhamos.ddns.net)

---

## 👨‍💻 Credits

**SHUBHAMOS**
Creator • Architect • Developer

> “Building systems that make work simpler, smarter, and human.”
