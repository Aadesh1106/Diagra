# Development Scripts Reference

## Backend Commands

### Development
```powershell
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
```

### Database
```powershell
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
```

### Database Migrations
```powershell
# Create a new migration
npx prisma migrate dev --name add_user_table

# Apply migrations in production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status
```

## Frontend Commands

### Development
```powershell
cd frontend
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Docker Commands

### Start Services
```powershell
docker-compose up -d                  # Start all services in background
docker-compose up plantuml            # Start only PlantUML server
docker-compose up postgres            # Start only PostgreSQL
```

### Stop Services
```powershell
docker-compose down                   # Stop all services
docker-compose down -v                # Stop and remove volumes (deletes data)
```

### View Logs
```powershell
docker-compose logs -f                # Follow all logs
docker-compose logs -f plantuml       # Follow PlantUML logs
docker-compose logs -f postgres       # Follow PostgreSQL logs
```

### Service Management
```powershell
docker-compose ps                     # List running containers
docker-compose restart plantuml       # Restart PlantUML service
docker-compose restart postgres       # Restart PostgreSQL service
```

## Useful Database Commands

### Connect to PostgreSQL (Docker)
```powershell
docker exec -it uml-generator-db psql -U uml_user -d uml_generator
```

### Backup Database
```powershell
docker exec -t uml-generator-db pg_dump -U uml_user uml_generator > backup.sql
```

### Restore Database
```powershell
docker exec -i uml-generator-db psql -U uml_user -d uml_generator < backup.sql
```

## Testing

### Test Backend API
```powershell
# Health check
Invoke-WebRequest http://localhost:3000/health

# Create project (requires auth)
$body = @{
    title = "Test Project"
    prompt = "Design a simple user management system"
    diagramTypes = @("CLASS", "SEQUENCE")
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/api/projects -Method POST -Body $body -ContentType "application/json"
```

### Test PlantUML Server
```powershell
# Check if PlantUML is running
Invoke-WebRequest http://localhost:8080
```

## Complete Setup from Scratch

```powershell
# 1. Clone/navigate to project
cd c:\Users\aades\OneDrive\Desktop\diagra

# 2. Install backend dependencies
cd backend
npm install
Copy-Item .env.example .env
# Edit .env and add your OPENAI_API_KEY

# 3. Install frontend dependencies
cd ..\frontend
npm install
Copy-Item .env.example .env

# 4. Start Docker services
cd ..
docker-compose up -d

# 5. Setup database
cd backend
npm run prisma:generate
npm run prisma:migrate

# 6. Start backend (new terminal)
npm run dev

# 7. Start frontend (new terminal)
cd ..\frontend
npm run dev

# 8. Open browser
# Navigate to http://localhost:5173
```

## Cleanup

### Remove all data and start fresh
```powershell
# Stop all services
docker-compose down -v

# Remove node_modules
Remove-Item -Recurse -Force backend\node_modules
Remove-Item -Recurse -Force frontend\node_modules

# Remove build artifacts
Remove-Item -Recurse -Force backend\dist
Remove-Item -Recurse -Force frontend\dist

# Reinstall
cd backend ; npm install
cd ..\frontend ; npm install
```

## Environment Variables Quick Reference

### Backend (.env)
```env
DATABASE_URL=postgresql://uml_user:uml_password@localhost:5432/uml_generator
OPENAI_API_KEY=sk-your-key-here
PLANTUML_SERVER_URL=http://localhost:8080
PORT=3000
JWT_SECRET=change-this-secret
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```
