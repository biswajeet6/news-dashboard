# 📰 Next.js News Dashboard

A full-stack **Next.js** dashboard with **NextAuth.js authentication**, **Google/GitHub OAuth**, **Prisma ORM**, and **Recharts-based analytics**.

## 🚀 Features
- User authentication with **NextAuth.js**
- OAuth support for **Google & GitHub**
- News API integration for fetching articles
- Analytics dashboard with **charts**
- **Dark Mode** toggle
- Database setup with **Prisma & SQLite**

---

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **`.env.local`** file in the root folder and add the following:

```ini
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

NEWS_API_KEY=your-news-api-key

DATABASE_URL="file:./dev.db"  # Using SQLite (Change for production)
```

💡 **Never expose API keys in public repositories!** 🚨

---

## ⚡ Running the App

### 4️⃣ Run the Development Server
```sh
npm run dev
```
Your Next.js app should now be running at:  
🔗 **http://localhost:3000**

### 5️⃣ Prisma Setup (If Using a Database)
```sh
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📊 API Routes
| Route                     | Description                          |
|---------------------------|--------------------------------------|
| `/api/auth/[...nextauth]` | Handles authentication (NextAuth.js) |
| `/api/news`               | Fetches news articles from API      |

---

## 🏗️ Building for Production
To generate an optimized production build:
```sh
npm run build
npm start
```


