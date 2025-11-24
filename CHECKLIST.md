# ✅ Installation Checklist

Use this checklist to ensure everything is set up correctly.

## Pre-Installation

- [ ] Windows 10/11 or macOS or Linux
- [ ] PowerShell or Bash terminal
- [ ] Internet connection
- [ ] Administrator/sudo access

## Install Required Software

### 1. Node.js
- [ ] Download from https://nodejs.org/
- [ ] Install Node.js 18.x or higher
- [ ] Verify installation:
  ```powershell
  node --version    # Should show v18.x or higher
  npm --version     # Should show 9.x or higher
  ```

### 2. Docker Desktop
- [ ] Download from https://www.docker.com/products/docker-desktop
- [ ] Install Docker Desktop
- [ ] Start Docker Desktop
- [ ] Verify installation:
  ```powershell
  docker --version
  docker-compose --version
  ```

### 3. OpenAI API Key
- [ ] Sign up at https://platform.openai.com/
- [ ] Navigate to API Keys
- [ ] Create new secret key
- [ ] Copy and save the key (starts with `sk-`)
- [ ] **Important**: Save this key securely - you'll need it!

## Project Setup

### 1. Navigate to Project
- [ ] Open PowerShell/Terminal
- [ ] Navigate to project directory:
  ```powershell
  cd c:\Users\aades\OneDrive\Desktop\diagra
  ```

### 2. Backend Setup
- [ ] Navigate to backend:
  ```powershell
  cd backend
  ```
- [ ] Install dependencies:
  ```powershell
  npm install
  ```
- [ ] Copy environment file:
  ```powershell
  Copy-Item .env.example .env
  ```
- [ ] Edit `.env` file:
  ```powershell
  notepad .env
  ```
- [ ] Add your OpenAI API key:
  ```
  OPENAI_API_KEY=sk-your-actual-key-here
  ```
- [ ] Save and close the file

### 3. Frontend Setup
- [ ] Navigate to frontend:
  ```powershell
  cd ..\frontend
  ```
- [ ] Install dependencies:
  ```powershell
  npm install
  ```
- [ ] Copy environment file:
  ```powershell
  Copy-Item .env.example .env
  ```

### 4. Start Docker Services
- [ ] Navigate to root directory:
  ```powershell
  cd ..
  ```
- [ ] Start Docker containers:
  ```powershell
  docker-compose up -d
  ```
- [ ] Wait 10 seconds for services to start
- [ ] Verify containers are running:
  ```powershell
  docker ps
  ```
- [ ] You should see:
  - `uml-generator-db` (status: Up)
  - `uml-generator-plantuml` (status: Up)

### 5. Database Setup
- [ ] Navigate to backend:
  ```powershell
  cd backend
  ```
- [ ] Generate Prisma Client:
  ```powershell
  npm run prisma:generate
  ```
- [ ] Run database migrations:
  ```powershell
  npm run prisma:migrate
  ```
- [ ] Verify success - should see "Migration complete"

## Verification

### 1. Test Backend
- [ ] In backend directory, start dev server:
  ```powershell
  npm run dev
  ```
- [ ] You should see:
  ```
  ✅ Database connected
  🚀 Server running on port 3000
  📝 Environment: development
  🎨 PlantUML Server: http://localhost:8080
  ```
- [ ] Keep this terminal open!

### 2. Test Frontend (New Terminal)
- [ ] Open a NEW PowerShell terminal
- [ ] Navigate to frontend:
  ```powershell
  cd c:\Users\aades\OneDrive\Desktop\diagra\frontend
  ```
- [ ] Start dev server:
  ```powershell
  npm run dev
  ```
- [ ] You should see:
  ```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
  ```
- [ ] Keep this terminal open too!

### 3. Test Application
- [ ] Open web browser
- [ ] Navigate to: http://localhost:5173
- [ ] You should see the "Natural Language to UML Generator" page
- [ ] Try creating a test project:
  - Title: "Test System"
  - Prompt: "Design a simple user management system with login and registration"
  - Select: Class Diagram
  - Click "Generate UML Diagrams"
- [ ] Wait 10-30 seconds
- [ ] You should see the generated diagram

### 4. Test Individual Services
- [ ] Test backend health:
  ```powershell
  Invoke-WebRequest http://localhost:3000/health
  ```
  Should return: `{"status":"ok",...}`

- [ ] Test PlantUML server:
  ```powershell
  Invoke-WebRequest http://localhost:8080
  ```
  Should return HTML page

- [ ] Test database (optional):
  ```powershell
  cd backend
  npm run prisma:studio
  ```
  Should open database viewer at http://localhost:5555

## Common Issues

### ❌ "npm install" fails
- [ ] Check internet connection
- [ ] Delete `node_modules` folder and try again
- [ ] Update npm: `npm install -g npm@latest`

### ❌ Docker containers won't start
- [ ] Ensure Docker Desktop is running
- [ ] Check if ports 5432 and 8080 are available:
  ```powershell
  netstat -ano | findstr :5432
  netstat -ano | findstr :8080
  ```
- [ ] If ports are in use, stop other services or change ports in `docker-compose.yml`

### ❌ "Cannot connect to database"
- [ ] Check if PostgreSQL container is running:
  ```powershell
  docker ps
  ```
- [ ] Restart PostgreSQL:
  ```powershell
  docker-compose restart postgres
  ```
- [ ] Re-run migrations:
  ```powershell
  cd backend
  npm run prisma:migrate
  ```

### ❌ "OpenAI API Error"
- [ ] Verify API key is correct in `backend\.env`
- [ ] Check OpenAI API key is active at https://platform.openai.com/account/api-keys
- [ ] Ensure you have API credits available
- [ ] Check for typos in the API key

### ❌ Diagrams not generating
- [ ] Check backend terminal for errors
- [ ] Verify PlantUML server is accessible:
  ```powershell
  Invoke-WebRequest http://localhost:8080
  ```
- [ ] Check OpenAI API quota
- [ ] Look at browser console (F12) for errors

### ❌ Port conflicts
- [ ] Backend (port 3000):
  ```powershell
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```
- [ ] Frontend (port 5173):
  ```powershell
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

## Post-Installation

- [ ] Bookmark http://localhost:5173 for easy access
- [ ] Save your OpenAI API key securely
- [ ] Read [QUICKSTART.md](QUICKSTART.md) for usage guide
- [ ] Check out [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for features
- [ ] Explore example prompts in the app

## Daily Usage

When you want to use the app again:

1. [ ] Start Docker Desktop
2. [ ] Start Docker services:
   ```powershell
   cd c:\Users\aades\OneDrive\Desktop\diagra
   docker-compose up -d
   ```
3. [ ] Start backend (Terminal 1):
   ```powershell
   cd backend
   npm run dev
   ```
4. [ ] Start frontend (Terminal 2):
   ```powershell
   cd frontend
   npm run dev
   ```
5. [ ] Open http://localhost:5173

## Shutdown

To stop everything:

1. [ ] Stop frontend: Press `Ctrl+C` in frontend terminal
2. [ ] Stop backend: Press `Ctrl+C` in backend terminal
3. [ ] Stop Docker services:
   ```powershell
   docker-compose down
   ```

---

## ✅ Setup Complete!

If all items are checked, you're ready to generate UML diagrams! 🎉

Need help? Check:
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [COMMANDS.md](COMMANDS.md) - Command reference
- [API.md](API.md) - API documentation

**Happy Diagramming! 🎨**
