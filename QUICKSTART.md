# 🚀 Quick Start Guide

Get your UML Generator running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Docker Desktop installed and running
- ✅ **Google API key (FREE!)** or OpenAI API key
  - **Recommended**: Google Gemini (free tier: 1,500 requests/day)
  - Get it here: https://aistudio.google.com/app/apikey
  - Alternative: OpenAI ($5 trial credit)

## Step-by-Step Setup

### 1️⃣ Navigate to Project
```powershell
cd c:\Users\aades\OneDrive\Desktop\diagra
```

### 2️⃣ Install Backend Dependencies
```powershell
cd backend
npm install
```

### 3️⃣ Configure Backend Environment
```powershell
# Copy environment template
Copy-Item .env.example .env

# Open .env file and add your API key
notepad .env
```

**Option A: Google Gemini (Recommended - FREE!)**
```env
LLM_PROVIDER="google"
GOOGLE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXX"
```
Get your free key at: https://aistudio.google.com/app/apikey

**Option B: OpenAI**
```env
LLM_PROVIDER="openai"
OPENAI_API_KEY="sk-your-actual-api-key-here"
```

Save and close the file.

### 4️⃣ Install Frontend Dependencies
```powershell
cd ..\frontend
npm install
Copy-Item .env.example .env
```

### 5️⃣ Start Docker Services
```powershell
cd ..
docker-compose up -d
```

Wait 10 seconds for services to start, then verify:
```powershell
docker ps
```

You should see:
- `uml-generator-db` (PostgreSQL)
- `uml-generator-plantuml` (PlantUML Server)

### 6️⃣ Setup Database
```powershell
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### 7️⃣ Start Backend Server
```powershell
# In current terminal
npm run dev
```

Keep this terminal running. You should see:
```
✅ Database connected
🚀 Server running on port 3000
📝 Environment: development
🎨 PlantUML Server: http://localhost:8080
```

### 8️⃣ Start Frontend (New Terminal)
Open a **new PowerShell terminal**:
```powershell
cd c:\Users\aades\OneDrive\Desktop\diagra\frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 9️⃣ Open Your Browser
Navigate to: **http://localhost:5173**

## 🎉 You're Ready!

### Test It Out

1. **Enter a Project Title:**
   ```
   Online Shopping System
   ```

2. **Enter System Description:**
   ```
   Design an online shopping system where customers can browse products, 
   add items to cart, checkout, and pay via credit card. Include user 
   authentication, product catalog, and order management.
   ```

3. **Select Diagram Types:**
   - ✅ Class Diagram
   - ✅ Sequence Diagram
   - ✅ Activity Diagram

4. **Click "Generate UML Diagrams"**

5. **Wait 10-30 seconds** for AI to generate diagrams

6. **View Your Diagrams!** 🎨

## Common Issues & Fixes

### ❌ "Cannot find module 'express'"
**Fix:** Run `npm install` in backend folder

### ❌ "Database connection failed"
**Fix:** 
```powershell
docker-compose restart postgres
cd backend
npm run prisma:migrate
```

### ❌ "OpenAI API Error"
**Fix:** Check your API key in `backend\.env`

### ❌ "Google Gemini API Error"
**Fix:** 
1. Verify `GOOGLE_API_KEY` in `backend\.env`
2. Get a free key at https://aistudio.google.com/app/apikey
3. Set `LLM_PROVIDER="google"`

### ❌ "LLM API Error"
**Fix:** Check which provider you're using:
- For Google: See [GOOGLE_GEMINI_SETUP.md](GOOGLE_GEMINI_SETUP.md)
- For OpenAI: Verify API key has credits

### ❌ "PlantUML server not responding"
**Fix:**
```powershell
docker-compose restart plantuml
# Wait 10 seconds
Invoke-WebRequest http://localhost:8080
```

### ❌ Port 3000 or 5173 already in use
**Fix:**
```powershell
# Find process using port
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

## Verify Everything Works

### Check Backend Health
```powershell
Invoke-WebRequest http://localhost:3000/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-15T..."}
```

### Check PlantUML Server
```powershell
Invoke-WebRequest http://localhost:8080
```

Should return HTML page.

### Check Database
```powershell
cd backend
npm run prisma:studio
```

Opens Prisma Studio at http://localhost:5555

## What's Next?

- ✅ **Using Google Gemini (FREE)?** Read [GOOGLE_GEMINI_SETUP.md](GOOGLE_GEMINI_SETUP.md)
- ✅ Try different system prompts
- ✅ Regenerate diagrams for better results
- ✅ Download SVG and PlantUML source
- ✅ View your project history
- ✅ Read **SETUP.md** for detailed documentation
- ✅ Check **API.md** for API reference

## Stop Everything

When you're done:

```powershell
# Stop frontend and backend (Ctrl+C in terminals)

# Stop Docker services
docker-compose down
```

## Daily Restart

Next time you want to use it:

```powershell
# Start Docker
docker-compose up -d

# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Open browser
start http://localhost:5173
```

## Get Help

- 📖 Read **SETUP.md** for detailed setup
- 📖 Check **COMMANDS.md** for all commands
- 📖 See **API.md** for API documentation
- 📖 Review **PROJECT_SUMMARY.md** for overview

---

**Happy Diagramming! 🎨✨**
