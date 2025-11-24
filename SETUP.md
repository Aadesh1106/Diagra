# UML Generator - Setup Guide

## Quick Start

### 1. Install Dependencies

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd frontend
npm install
```

### 2. Setup Environment Variables

**Backend** - Copy `.env.example` to `.env`:
```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend\.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Frontend** - Copy `.env.example` to `.env`:
```powershell
cd frontend
Copy-Item .env.example .env
```

### 3. Start Services

**Option A: Using Docker (Recommended)**

Start PostgreSQL and PlantUML server:
```powershell
docker-compose up -d
```

**Option B: Manual Setup**

1. Install PostgreSQL 14+ and create database:
```sql
CREATE DATABASE uml_generator;
```

2. Run PlantUML server separately:
```powershell
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
```

### 4. Setup Database

Update your `backend\.env` with the correct database URL:
```env
DATABASE_URL="postgresql://uml_user:uml_password@localhost:5432/uml_generator"
```

Run Prisma migrations:
```powershell
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
Backend will run on http://localhost:3000

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### 6. Open Application

Navigate to http://localhost:5173 in your browser

## Testing the Application

1. Enter a project title (e.g., "Online Shopping System")
2. Describe your system in the prompt textarea
3. Select diagram types (Class, Sequence, Activity, Use Case)
4. Click "Generate UML Diagrams"
5. View and download generated diagrams

## Example Prompt

```
Design an online shopping system where customers can:
- Browse products by category
- Search for products
- Add products to shopping cart
- Manage cart (update quantities, remove items)
- Checkout and place orders
- Pay via credit card or UPI
- Track order status
- View order history

Include:
- User authentication and registration
- Product catalog management
- Inventory management
- Order processing
- Payment gateway integration
```

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running: `docker ps` or check Windows services
- Verify DATABASE_URL in `.env`
- Ensure OpenAI API key is valid

### Frontend won't connect to backend
- Verify backend is running on port 3000
- Check VITE_API_URL in `frontend\.env`
- Check browser console for CORS errors

### PlantUML diagrams not rendering
- Verify PlantUML server is running: http://localhost:8080
- Check PLANTUML_SERVER_URL in `backend\.env`
- View backend logs for rendering errors

### Database connection errors
- Ensure PostgreSQL is running
- Verify database credentials
- Run: `npm run prisma:studio` to test connection

## Production Deployment

### Build Frontend
```powershell
cd frontend
npm run build
```

### Build Backend
```powershell
cd backend
npm run build
```

### Run Production
```powershell
cd backend
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use secure JWT_SECRET
- Configure proper CORS origins
- Use managed PostgreSQL service
- Consider using a CDN for static assets

## Database Management

### View Database (Prisma Studio)
```powershell
cd backend
npm run prisma:studio
```

### Create New Migration
```powershell
cd backend
npx prisma migrate dev --name your_migration_name
```

### Reset Database
```powershell
cd backend
npx prisma migrate reset
```

## API Documentation

### Create Project
```
POST /api/projects
{
  "title": "Project Name",
  "prompt": "System description...",
  "diagramTypes": ["CLASS", "SEQUENCE", "ACTIVITY", "USE_CASE"]
}
```

### Get Project
```
GET /api/projects/:id
```

### List Projects
```
GET /api/projects
```

### Regenerate Diagram
```
POST /api/diagrams/projects/:projectId/diagrams/:diagramId/regenerate
```

### Download Diagram Image
```
GET /api/diagrams/:diagramId/image
```

### Download Diagram Source
```
GET /api/diagrams/:diagramId/source
```

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   React     │─────▶│   Express   │─────▶│  PostgreSQL  │
│  Frontend   │      │   Backend   │      │   Database   │
└─────────────┘      └─────────────┘      └──────────────┘
                            │
                            ├─────▶ OpenAI API
                            │
                            └─────▶ PlantUML Server
```

## Tech Stack Summary

- **Frontend**: React, TypeScript, TailwindCSS, React Query, Vite
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **LLM**: OpenAI GPT-4
- **Diagrams**: PlantUML, Mermaid
- **Auth**: JWT (optional)

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in terminal
3. Check browser developer console
4. Verify all services are running
5. Ensure environment variables are set correctly
