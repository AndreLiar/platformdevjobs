## 📌 PlatformDevJobs.com

A web app for recruiters to post jobs and manage candidates in Salesforce, SAP, HubSpot, Workday, and other enterprise platforms.

---

### 🔧 Setup Instructions

1. **Clone the project**

```bash
git clone https://github.com/AndreLiar/platformdevjobs.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Add your Firebase config**

Create a `.env.local` file in `/apps/web`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

4. **Start the project**

```bash
npm run dev
```

---



