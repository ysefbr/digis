# ⚡ Google AI Pro (18 Months Plan) — Sales Portal & Admin System

A high-converting, single-product eCommerce platform built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and **PostgreSQL (Railway)** designed specifically to sell **Google One: Google AI Pro 18-Month Activation Links** with **5TB Cloud Storage**.

---

## 🚀 Features

- **Google AI Pro Presentation**:
  - Gemini Advanced (4x Higher Usage Limits)
  - 5TB Google One Cloud Storage
  - Autonomous Deep Research & Agentic AI
  - Google Workspace (Docs, Gmail, Sheets, Slides) & Google Vids Integration
  - 1,000 Google Flow Creative Studio Credits
  - Enhanced NotebookLM Pro (5x Audio Overviews)
  - 2,000,000 Token Context Window & Python Sandbox
- **Frictionless Direct Checkout**:
  - No customer account or login required.
  - 3-field instant order form (Name, Email, WhatsApp Phone).
  - Automatic order tracking code generation (e.g. `GEM-849201`).
  - 1-click WhatsApp order confirmation & payment dispatch.
- **Customer Order Tracking & Vault**:
  - Real-time order lookup by Order Code, Phone, or Email.
  - Instant reveal of the official 18-month Google activation link once fulfilled.
- **Secure Management Portal (`/digismeda`)**:
  - Protected by private URL and access password session.
  - Revenue & order analytics (Total Revenue in TND, Total Orders, Pending Deliveries, Delivered Activations).
  - Order management table with status filter, search, and CSV export.
  - Interactive **Fulfill Order** modal to paste the Google activation link.
  - 1-click WhatsApp customer dispatch with pre-filled fulfillment message.
  - Real-time store settings editor (pricing, stock, WhatsApp support number, announcement banner, password change).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1 (App Router)
- **UI & State**: React 19, Lucide React, Tailwind CSS
- **Database**: PostgreSQL (`pg` connection pool with SSL)
- **Authentication**: JWT session tokens via `jose`
- **Deployment Ready**: Vercel, Railway, Docker, Node.js standalone

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ysefbr/digis.git
cd digis
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file:
```env
DATABASE_URL="postgresql://postgres:password@host:port/database"
ADMIN_SECRET_KEY="your_super_secret_jwt_key"
ADMIN_DEFAULT_PASSWORD="your_admin_password"
DEFAULT_PRICE_TND="80"
DEFAULT_ORIGINAL_PRICE_TND="1120"
DEFAULT_WHATSAPP_NUMBER="+21656000000"
NEXT_PUBLIC_DEFAULT_WHATSAPP="+21656000000"
NEXT_PUBLIC_CURRENCY="TND"
```

### 3. Initialize Database Schema
```bash
npm run init-db
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the sales page.
Open [http://localhost:3000/digismeda](http://localhost:3000/digismeda) to access the management portal.

---

## 🛡️ Management Portal

- **URL**: `/digismeda`
- **Access**: Enter your configured password. No admin links exist on the public website.
