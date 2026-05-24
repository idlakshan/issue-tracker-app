# Issue Tracker - Frontend (UI)

A professional, enterprise-grade issue tracking system designed for efficient task management and team collaboration. Built with a modern React ecosystem and deployed using robust DevOps practices.



## 🚀 Tech Stack
* **Core:** React (Vite), Node.js (Express)
* **Database:** MongoDB (Mongoose)
* **State & Data:** Redux Toolkit & RTK Query
* **Validation:** Zod Schema
* **UI/UX:** Tailwind CSS, Lucide React
* **Utilities:** `date-fns`, `concurrently`

---
## 🛠️ Feature

* **Smart Dashboard & Analytics:**
    * **Real-time Issue Analytics:** Visual representation of issue distribution across statuses (`Open`, `In Progress`, `Resolved`, `Closed`) with real-time counters.
    * **Team Performance Overview:** Monitor team member contributions and the volume of issues assigned to each developer.
* **Intelligent Issue Management (Full CRUD):**
    * **Dynamic Operations:** Create, update, and delete issues with instant UI synchronization via RTK Query’s tag invalidation system.
    * **State-Driven Updates:** All changes (Status, Priority, Assignees) reflect immediately across the dashboard and stats without page refreshes.
* **Real-time Activity Timeline:**
    * A live-tracking feed that logs all system actions: `CREATE`, `STATUS_CHANGE`, `ASSIGN`, `RESOLVE`, and `DELETE`.
    * Human-readable timestamps provided by `date-fns` for better UX.
* **Advanced Search & Filtering:**
    * **Multi-Criteria Filtering:** Filter issues seamlessly by Status, Priority, and Assignee.
    * **Optimized Search:** Debounced search functionality to provide a smooth, lag-free user experience.
* **Secure Authentication:**
    * Enterprise-grade security with JWT access and refresh token rotation logic to ensure seamless sessions.
* **Excel Export Capability:**
    * Export the entire issue database into Excel format for offline reporting.


---
## 📦 Major Dependencies
* **@reduxjs/toolkit / react-redux** - Core state management.
* **RTK Query** - Advanced data fetching and API caching with custom interceptors for **Automatic Token Refresh**.
* **react-router-dom** - Client-side routing.
* **zod** - Schema-based form validation.
* **react-toastify** - Modern notification system.
* **sweetalert2** - Interactive popup dialogs for confirmations.
* **lucide-react** - Scalable vector icons.

---
## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/idlakshan/issue-tracker-app.git
   cd issue-tracker-app
   ```
2. **Install dependencies:**
   ```bash
   # Install root dependencies
    npm install

    # Install frontend dependencies
    cd frontend && npm install && cd ..

    # Install backend dependencies
    cd backend && npm install && cd ..
   ```
3. **Environment Setup:**
   ```bash
   VITE_BASE_URL=http://localhost:3000/api
   ```   
4. **Launch Application::**
   ```bash
   npm run dev
   ```   