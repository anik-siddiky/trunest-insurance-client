# 🛡️ Life Insurance Management Platform

A full-featured MERN Stack web application for modern digital insurance services with **role-based dashboards**, **secure policy management**, **Stripe integration**, and **interactive user experiences**.

## 🔗 Live Site
[👉 Visit Live Website](https://trunestinsurance.web.app)


## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, React Hook Form, SweetAlert2, TanStack Query, React Helmet Async
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Authentication**: Firebase (Email/Password + Google Auth)
- **Payment Integration**: Stripe
- **PDF Generation**: React-PDF

---

## ✨ Key Features

- 🔐 **JWT-Based Authentication & Role-Based Routing**
- 🧑‍💼 **Admin, Agent & Customer Dashboards**
- 📄 **Dynamic Policies**: Filter by category, keyword search (case-insensitive), pagination
- 📈 **Quote Generator**: Calculates estimated premiums based on age, coverage, duration
- 📝 **Application System** with assignable agents and real-time status updates
- ✅ **Approval & Rejection Modals** with feedback storage for customers
- 👩‍💻 **Agent-Customer Assignment** with per-user dashboard logic
- 💳 **Stripe Integration**: Secure payment flow with dynamic amount
- 🧾 **Transaction History** with payment status & earning graph (Admin)
- 🗞️ **Blog/Article System**: Create, edit, delete blogs (Admin & Agent), count visits
- ✍️ **Customer Reviews** with rating & feedback modal saved to DB
- 📥 **PDF Download of Approved Policies** (React-PDF)
- 📢 **Newsletter Subscription Form** with DB storage
- 🧾 **Policy Claim System** with file upload, conditional claim button, and SweetAlert
- 🧑‍🔧 **Profile Management** with editable photo, name, and last login info
- 📱 **Fully Responsive** design for mobile, tablet, and desktop

---

## 📁 Project Structure


---

## 🖥️ Dashboard Features (Role Based)

### 👤 Customer Dashboard
- My Policies (Status: pending, approved, rejected)
- Review system (⭐ Star + comment modal)
- Payment Status (Due/Paid logic)
- Stripe Payment Page
- Claim Policy Request (PDF/image upload + conditional button)
- Profile Management

### 🧑 Agent Dashboard
- View Assigned Customers
- Update application status (Pending → Approved → Policy Purchase Count++)
- Manage Own Blogs
- Policy Claim Approval with SweetAlert confirmation

### 🧑‍💼 Admin Dashboard
- Manage All Users (Promote/demote roles)
- Manage Applications (Assign agents, reject with feedback)
- Manage Policies (Add, edit, delete via modal)
- Manage All Blogs (Edit/Delete)
- Manage Transactions (View Stripe payments, earnings graph)
- Filter by user/date/policy (optional)

---

## 🏠 Home Page Sections

- Hero Slider with CTA "Get a Free Quote" (3+ slides)
- Popular Policies (top 6 purchased)
- Customer Reviews (carousel)
- Latest Blog Articles (latest 4)
- Newsletter Subscription Form
- Meet Our Agents (3 featured with name, photo, skills)

---

## 🔍 Public Pages

- **All Policies**: Dynamic filtering, pagination, keyword search
- **Policy Details Page**: Full description + "Get Quote" CTA
- **Quote Estimator**: Age, gender, smoker status, coverage → calculates premium
- **Blog Page**: Cards with visit count, modal detail view, and total blog view
- **Register/Login**: Email/Password + Google Auth with password validation
- **Navbar**: Conditional nav items based on role/login

---

## 🛡️ Security & Validation

- JWT Token stored securely in localStorage
- Middleware: `verifyJWT`, `verifyAdmin`, `verifyAgent`
- Role-protected routes with 401/403 handling
- Password strength validation
- All GET requests secured via TanStack Query
- Dynamic page titles using `React Helmet Async`

---

## ⚙️ Environment Variables

