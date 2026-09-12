# CAPTCHA HELL™ 🔐

> **“You are human. We just don't believe you.”**

A full-stack, production-quality web application built for a “Useless Project” hackathon.

CAPTCHA HELL™ poses as the legitimate **National Academic Examination Portal (NAEP)**. Candidates fill out their personal, academic, examination, and document details across a 5-step registration process.

At the final stage, candidates are requested to complete **Human Verification**. Even if every single CAPTCHA challenge is solved correctly, the verification **NEVER** finishes. The application creates an inescapable, escalating infinite CAPTCHA verification loop.

---

## 🌟 Key Features

1. **Fictional Academic Exam Portal (NAEP)**: Professional UI/UX built with Tailwind CSS, React, and Lucide icons.
2. **Infinite CAPTCHA Engine**: Server-side generated & validated CAPTCHAs with hidden correct answers.
   - **Image Selection**: Traffic lights, buses, cats, chairs.
   - **Number Verification**: Randomized 5-digit security challenge.
   - **Math Verification**: Dynamic arithmetic equations.
   - **Multiple Choice**: Humorous knowledge checks.
   - **Ridiculous Challenges**: Wi-Fi objects, suspicious items, judging eyes, main-character energy.
3. **Progressive Escalation**:
   - **Suspicious Progress Bar**: Advances from 10% → 43% → 87% where it permanently stays stuck.
   - **Funny Escalating System Messages**: Changes dynamically based on completed CAPTCHAs.
   - **Random System Event Modals**: "Suspiciously Fast", "Suspiciously Human", "Trust Issue".
   - **Locked Application Submission**: Submission status remains locked forever.
   - **NAEP Fake Support Assistant**: Clickable chatbot with funny unhelpful answers.
   - **Give-Up Feature**: Abandonment modal with "STAY AND SUFFER" vs "GIVE UP".
   - **100 CAPTCHA Easter Egg**: Celebrates 100 CAPTCHA completions before revealing session expiration prank.
4. **Live Admin Analytics Dashboard (`/admin`)**:
   - Live MongoDB telemetry tracking real applicant data.
   - Recharts visual charts for CAPTCHA type distribution & performance metrics.
   - Key stats: **0 Submitted Applications**, **0 Humans Verified**, Purpose of System: **UNKNOWN**.
5. **Hackathon Demo Mode & Demo Reset**:
   - Top banner for judges with rapid message escalation.
   - Demo reset button to clear verification state for new judge testing without wiping global analytics.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, React Router v6, Lucide React, Recharts, Canvas-Confetti, Axios.
- **Backend**: Node.js, Express.js, Mongoose, CORS, Dotenv.
- **Database**: MongoDB (Atlas compatible `MONGODB_URI` + automatic built-in `mongodb-memory-server` fallback for zero-configuration local runs).

---

## 📐 Architecture & Flow

```text
React Frontend (Vite)
       │
       ▼ (Axios REST API)
Express.js Backend Controller
       │
       ├─► Server-Side CAPTCHA Engine (Service)
       │
       ▼ (Mongoose Schema)
MongoDB / In-Memory Mongo Database
```

---

## 🗄️ Database Schemas

### 1. `Applicant` Collection
```js
{
  applicationId: "NAEP-10291",
  fullName: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  collegeName: "National Institute of Technology",
  course: "B.Tech Computer Science",
  examination: "National Graduate Entrance Exam 2026",
  applicationStatus: "VERIFICATION_IN_PROGRESS",
  verificationStatus: "IN_PROGRESS",
  captchaCount: 27,
  failedCaptchaCount: 3,
  isAbandoned: false
}
```

### 2. `CaptchaAttempt` Collection
```js
{
  applicationId: "NAEP-10291",
  captchaType: "image",
  challenge: "Select all images containing buses",
  correct: true,
  selectedAnswer: ["tile_0_img_bus_1", "tile_4_img_bus_2"],
  attemptNumber: 28
}
```

---

## 🌐 API Endpoints

### Application Registration APIs
- `POST /api/applications` - Register new examination application.
- `GET /api/applications/:id` - Fetch candidate application details.
- `PUT /api/applications/:id` - Update application details.
- `GET /api/applications/:id/status` - Get status sidebar status.

### CAPTCHA Engine APIs
- `POST /api/captcha/generate` - Generate random challenge (strips correct answer).
- `POST /api/captcha/verify` - Validate user answer on server side & log attempt.
- `GET /api/captcha/stats/:applicationId` - Fetch candidate challenge history.

### Analytics & Demo APIs
- `GET /api/analytics/dashboard` - Get aggregated MongoDB telemetry & Recharts data.
- `POST /api/demo/reset` - Reset verification counter for demo judges.
- `POST /api/demo/abandon` - Log application abandonment when user gives up.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root or `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/captcha-hell
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
> **Note**: If no MongoDB connection string is supplied, the backend will automatically spin up an **In-Memory MongoDB server**, making it 100% runnable out of the box with zero external configuration!

### 3. Start Application
From the root directory:
```bash
npm run dev
```

Or run frontend and backend separately:
```bash
# Terminal 1: Start Express Backend
npm run server

# Terminal 2: Start React Vite Frontend
npm run client
```

- **Frontend Portal**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
- **Backend Health Check**: http://localhost:5000/api/health

---

## 🎯 Hackathon Demonstration Guide

1. Open http://localhost:5173 (The NAEP Official Portal).
2. Click **Start Registration** and complete the 5 registration steps.
3. Click **Proceed to Human Verification**.
4. Solve CAPTCHA #1, #2, #3. Notice the completion counter incrementing.
5. Notice the progress bar getting stuck at **87%**.
6. Observe escalating funny system messages.
7. Click the **Give Up** button to trigger the abandonment modal.
8. Open http://localhost:5173/admin to show live MongoDB statistics (0 Submitted Applications, 0 Verified Humans).

---

## 📜 License
MIT © 2026 CAPTCHA HELL™ Hackathon Team.
