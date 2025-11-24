# Natural Language to UML Generator 

> Transform natural language into professional UML diagrams using AI

A powerful web application that automatically generates comprehensive UML diagrams (Class, Sequence, Activity, Use Case) from natural language descriptions using GPT-4 and PlantUML.

##  Features

-  **AI-Powered**: Uses GPT-4 or Google Gemini to understand natural language and generate UML
-  **Multiple Diagram Types**: Class, Sequence, Activity, Use Case, and more
-  **Version Control**: Regenerate and manage multiple versions of diagrams
-  **Persistent Storage**: Save all projects and diagrams to PostgreSQL
-  **Export Options**: Download diagrams as SVG or PlantUML source code
-  **Modern UI**: Responsive React interface with TailwindCSS
-  **Fast Setup**: Docker-based deployment for easy installation
-  **Cost Effective**: Free tier available with Google Gemini

##  Quick Start

**Want to get started immediately?** → See [QUICKSTART.md](QUICKSTART.md)

1. Install dependencies
2. Add OpenAI API key
3. Start Docker services
4. Run the app
5. Generate diagrams!

##  Screenshots

### Home Page - Enter Your System Description
```
┌──────────────────────────────────────────────────┐
│  Natural Language to UML Generator               │
│                                                  │
│  Project Title: [Online Shopping System____]    │
│                                                  │
│  System Description:                             │
│  ┌────────────────────────────────────────────┐ │
│  │ Design an online shopping system where    │ │
│  │ customers can browse products, add to     │ │
│  │ cart, and checkout...                     │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Select Diagram Types:                           │
│  ☑ Class Diagram    ☑ Sequence Diagram          │
│  ☑ Activity Diagram ☐ Use Case Diagram          │
│                                                  │
│  [Generate UML Diagrams]                         │
└──────────────────────────────────────────────────┘
```

### Project Detail - View Generated Diagrams
```
┌──────────────────────────────────────────────────┐
│  Online Shopping System          [DONE]  ← Back  │
│  Created: Jan 15, 2024                           │
│                                                  │
│  Generated Diagrams (3)                          │
│                                                  │
│  ┌─────────────────┐  ┌─────────────────┐      │
│  │ Class Diagram   │  │ Sequence Diagram│      │
│  │ [Diagram Image] │  │ [Diagram Image] │      │
│  │ [Regenerate]    │  │ [Regenerate]    │      │
│  │ [Download SVG]  │  │ [Download SVG]  │      │
│  │ [Download DSL]  │  │ [Download DSL]  │      │
│  └─────────────────┘  └─────────────────┘      │
└──────────────────────────────────────────────────┘
```

## Tech Stack

### Backend
- **Language**: TypeScript
- **Framework**: Node.js + Express
- **LLM**: OpenAI API (configurable)
- **Diagram Engine**: PlantUML Server + Mermaid
- **Database**: PostgreSQL
- **ORM**: Prisma

### Frontend
- **Framework**: React + TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **State Management**: React Query

## Project Structure

```
diagra/
├── backend/          # Node.js Express API
├── frontend/         # React application
├── docker/           # Docker configurations
└── README.md
```

##  Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                   React + TypeScript                         │
│              TailwindCSS + React Query                       │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTP/REST API
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express Backend                            │
│                  Node.js + TypeScript                        │
│  ┌──────────────┬────────────────┬──────────────────────┐   │
│  │ Controllers  │   Services     │   Middleware         │   │
│  │  - Project   │  - LLM Service │   - Error Handler    │   │
│  │  - Diagram   │  - Diagram Svc │   - Auth (optional)  │   │
│  └──────────────┴────────────────┴──────────────────────┘   │
└────────┬───────────────┬────────────────┬───────────────────┘
         │               │                │
         ▼               ▼                ▼
┌────────────────┐ ┌────────────┐ ┌──────────────────┐
│   PostgreSQL   │ │  OpenAI    │ │ PlantUML Server  │
│   (Prisma)     │ │  GPT-4     │ │  (Diagram Gen)   │
└────────────────┘ └────────────┘ └──────────────────┘
```

##  Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)
- **LLM API Key** - Choose one:
  - **Google Gemini (Recommended - FREE!)** - [Get key](https://aistudio.google.com/app/apikey)
  - **OpenAI (Alternative)** - [Get key](https://platform.openai.com/api-keys)
    - $5 trial credit
    - Requires credit card after trial

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/uml_generator"
OPENAI_API_KEY="your-openai-api-key"
PLANTUML_SERVER_URL="http://localhost:8080"
PORT=3000
JWT_SECRET="your-secret-key"
NODE_ENV="development"
```

#### Frontend (.env)
```env
VITE_API_URL="http://localhost:3000"
```

### Installation

1. **Clone and navigate to project**
```bash
cd c:\Users\aades\OneDrive\Desktop\diagra
```

2. **Setup Backend**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Setup PlantUML Server (Docker)**
```bash
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
```

## API Endpoints

### Projects
- `POST /api/projects` - Create new project from prompt
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details

### Diagrams
- `POST /api/projects/:projectId/diagrams/:diagramId/regenerate` - Regenerate diagram
- `GET /api/diagrams/:diagramId/image` - Get diagram image
- `GET /api/diagrams/:diagramId/source` - Get diagram DSL source

### Authentication (Optional)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## Features

-  Natural language to UML conversion
-  Multiple diagram types (Class, Sequence, Activity, Use Case)
-  Diagram versioning
-  Download SVG/PNG
-  Download DSL source
-  Regenerate individual diagrams
-  Project history

##  Usage Examples

### Example 1: E-commerce Platform
```
Title: Online Shopping System

Prompt: Design an online shopping system where customers can browse 
products by category, search for items, add products to a shopping cart, 
manage cart items (update quantity, remove), checkout, and pay via credit 
card or UPI. Include user authentication (register/login), product catalog 
management, inventory tracking, order processing, payment gateway integration, 
and order history.

Diagram Types: Class, Sequence, Activity, Use Case
```

### Example 2: Library Management
```
Title: Library Management System

Prompt: Design a library management system with book catalog, member 
registration, book borrowing and returning, fine calculation for late 
returns, book search and filtering by title/author/ISBN, member account 
management, renewal of borrowed books, reservation of books, and librarian 
administrative functions (add/remove books, manage members).

Diagram Types: Class, Sequence, Use Case
```

### Example 3: Banking Application
```
Title: Online Banking System

Prompt: Design an online banking application where customers can view 
account balances, transfer money between accounts, pay bills, view 
transaction history, manage beneficiaries, apply for loans, and contact 
customer support. Include multi-factor authentication, transaction 
authorization, fraud detection, and account statements.

Diagram Types: Class, Sequence, Activity, Use Case
```



##  Key Features Explained

### AI-Powered Diagram Generation
- Leverages GPT-4 to understand natural language descriptions
- Automatically identifies entities, relationships, and workflows
- Generates semantically correct UML syntax
- Produces professional-quality diagrams

### Multiple Diagram Types
- **Class Diagrams**: Show system entities, attributes, methods, and relationships
- **Sequence Diagrams**: Display interactions between objects over time
- **Activity Diagrams**: Illustrate workflows, business processes, and decision points
- **Use Case Diagrams**: Map out actors and their interactions with the system
- **State Diagrams**: (Coming soon) Model state machines and transitions
- **Component Diagrams**: (Coming soon) Visualize system architecture

### Version Management
- Generate initial diagram from prompt
- Regenerate any diagram to improve quality
- Each regeneration creates a new version
- Switch between versions
- View version history
- Compare different versions

### Export & Download
- Download diagrams as high-quality SVG images
- Export PlantUML source code for manual editing
- Share diagram URLs
- Print-ready format

##  Technology Stack Details

### Backend Stack
| Technology | Purpose | Why? |
|------------|---------|------|
| Node.js + TypeScript | Runtime & Language | Type safety, modern JavaScript |
| Express.js | Web Framework | Fast, minimalist, battle-tested |
| Prisma | ORM | Type-safe database access |
| PostgreSQL | Database | Reliable, powerful relational DB |
| OpenAI GPT-4 | LLM | State-of-the-art language understanding |
| PlantUML | Diagram Rendering | Industry-standard UML syntax |
| JWT | Authentication | Secure, stateless auth |

### Frontend Stack
| Technology | Purpose | Why? |
|------------|---------|------|
| React 18 | UI Library | Component-based, reactive |
| TypeScript | Language | Type safety, better DX |
| Vite | Build Tool | Lightning-fast HMR |
| TailwindCSS | Styling | Utility-first, responsive |
| React Query | Data Fetching | Caching, optimistic updates |
| React Router | Navigation | Client-side routing |
| Axios | HTTP Client | Promise-based API calls |

##  Security Considerations

-  Environment variables for sensitive data
-  CORS configuration for API protection
-  Input validation and sanitization
-  SQL injection protection via Prisma
-  JWT authentication (optional)
-  Error handling without exposing internals
-  Rate limiting (recommended for production)
-  API key rotation (recommended)

##  Database Schema

```sql
-- Users (optional for guest usage)
users
  - id (UUID, PK)
  - email (unique)
  - passwordHash
  - createdAt, updatedAt

-- Projects
projects
  - id (UUID, PK)
  - userId (FK → users.id, nullable)
  - title
  - prompt (text)
  - status (PENDING | DONE | ERROR)
  - errorMessage (nullable)
  - createdAt, updatedAt

-- Diagrams
diagrams
  - id (UUID, PK)
  - projectId (FK → projects.id)
  - type (CLASS | SEQUENCE | ACTIVITY | USE_CASE | STATE | COMPONENT)
  - title
  - currentVersionId (FK → diagram_versions.id)
  - createdAt, updatedAt

-- Diagram Versions
diagram_versions
  - id (UUID, PK)
  - diagramId (FK → diagrams.id)
  - versionNumber (int)
  - dsl (text) -- PlantUML code
  - imageUrl (nullable)
  - createdAt
```

##  Development Workflow

### Initial Setup
```powershell
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Configure environment
# Add OPENAI_API_KEY to backend/.env

# 3. Start services
docker-compose up -d

# 4. Setup database
cd backend
npm run prisma:migrate
```

### Daily Development
```powershell
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: View logs
docker-compose logs -f
```

### Testing
```powershell
# Test backend health
Invoke-WebRequest http://localhost:3000/health

# Test PlantUML
Invoke-WebRequest http://localhost:8080

# View database
cd backend && npm run prisma:studio
```

##  Troubleshooting Guide

### Issue: "Cannot connect to database"
**Solution:**
```powershell
docker-compose restart postgres
cd backend
npm run prisma:migrate
```

### Issue: "OpenAI API rate limit exceeded"
**Solution:**
- Check your OpenAI account usage
- Wait a few minutes and retry
- Consider upgrading your OpenAI plan

### Issue: "PlantUML diagrams not rendering"
**Solution:**
```powershell
# Restart PlantUML server
docker-compose restart plantuml

# Verify it's running
Invoke-WebRequest http://localhost:8080

# Check backend logs
cd backend
npm run dev
```

### Issue: "Port already in use"
**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

##  Deployment Guide

### Environment Setup
1. Set up managed PostgreSQL (AWS RDS, Azure Database, etc.)
2. Deploy PlantUML server or use public instance
3. Configure production environment variables
4. Set up SSL/TLS certificates

### Build Process
```powershell
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Deployment Options
- **Backend**: Node.js hosting (Heroku, Railway, Render, AWS Elastic Beanstalk)
- **Frontend**: Static hosting (Vercel, Netlify, GitHub Pages, S3 + CloudFront)
- **Database**: Managed PostgreSQL (AWS RDS, Supabase, Neon, Railway)
- **Docker**: Container orchestration (Docker Swarm, Kubernetes, ECS)

##  Performance Optimization

### Backend Optimization
-  Database connection pooling (Prisma)
-  Lazy loading of diagrams
-  Redis caching for frequent requests
-  CDN for diagram images
-  Load balancing for scaling

### Frontend Optimization
-  Code splitting with Vite
-  React Query caching
-  Lazy loading of routes
-  Image optimization
-  Service Worker for PWA

##  Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

**Built with ❤️ using TypeScript, React, and AI**
