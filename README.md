# COS30043-Interface-Design-and-Development
A full-stack, responsive botanical e-commerce platform featuring a custom 2D slot-based bouquet builder, real-time analytics, and role-based access control (RBAC). Developed as part of the COS30043 Interface Design and Development unit.

# ✿ FloraLab (The Flower Laboratory)

**COS30043 Interface Design and Development - Final Project**

## 🚀 Evaluation Guide & Local Setup

### Live Deployment (Render)

The FloraLab platform is hosted live on **Render**.

> ⚠️ **Note:** Due to the free tier, the server may experience a **30–50 second cold start delay** upon initial load.

Website URL: https://cos30043-interface-design-and-ftqj.onrender.com/

If the live URL is inaccessible, you can quickly run the project locally using the steps below.

---

### 🔑 Environment Variables (.env)

**IMPORTANT:** The required `.env` file containing the secure Supabase database keys is **included in the Canvas ZIP file submission**. Please ensure the `.env` file remains in its designated folder before starting the application to guarantee successful database connections.

---

### 💻 Local Installation (Fallback for Render Deployment)

#### 1. Start the Backend Server

Open your terminal and navigate to the backend folder:

```bash
cd interface_design_assignment/backend

```

Install dependencies:

```bash
npm install

```

Run the server:

```bash
node server.js

```

*(The backend server runs on `http://localhost:3001`)*

#### 2. Start the Frontend Application

Open a new terminal tab and navigate to the frontend folder:

```bash
cd interface_design_assignment/florist_website

```

Install dependencies:

```bash
npm install

```

Run the development server:

```bash
npm run dev

```

#### 3. Access the Website

Open your browser and navigate to:
**`http://localhost:5173`**

---

## 👥 Test Accounts & Credentials

To fully evaluate the system's role-based access control (RBAC), community interaction, and dashboard features, please use the following pre-configured test accounts.

| Test User / Role | Email | Password | Testing Purpose |
| --- | --- | --- | --- |
| **Admin** | `admin@floralab.com` | `flora123456` | Full access to admin suite (Reviews, Products, Orders, Users control deck) |
| **Mei Lin** (Customer) | `mei@test.com` | `flora123` | Premium customer – shopping cart flow, Customizer layout, verified reviews |
| **Bob Troublemaker** (Spammer) | `bob@test.com` | `flora123` | Malicious persona – system boundaries, spam posts, malicious review reports |
| **Sophie Reeves** (Customer) | `sophie@test.com` | `flora123` | Auxiliary test customer (has previous purchase record) |
| **James Taylor** (Customer) | `james@test.com` | `flora123` | Auxiliary test customer (has previous purchase record) |
| **Carlos Mateo** (Customer) | `carlos@test.com` | `flora123` | Auxiliary test customer (has previous purchase record) |
| **Anna Wong** (Customer) | `anna@test.com` | `flora123` | Auxiliary test customer (has previous purchase record) |
| **Jane Doe** (Staff) | `jane123@gmail.com` | `flora123` | Pre-configured staff-level access role |