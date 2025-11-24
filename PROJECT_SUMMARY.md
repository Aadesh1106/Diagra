# Natural Language to UML Generator - Project Complete! 🎉

## What Has Been Built

A complete full-stack web application that automatically generates professional UML diagrams from natural language descriptions using AI (GPT-4) and PlantUML.

### ✅ Completed Features

#### Backend (Node.js + TypeScript + Express)
- ✅ RESTful API with Express
- ✅ PostgreSQL database with Prisma ORM
- ✅ OpenAI GPT-4 integration for diagram generation
- ✅ PlantUML server integration for diagram rendering
- ✅ Project management (create, read, list, delete)
- ✅ Diagram regeneration with versioning
- ✅ Error handling and validation
- ✅ CORS and security middleware
- ✅ File upload/storage system
- ✅ JWT authentication (optional)

#### Frontend (React + TypeScript + Vite)
- ✅ Modern React SPA with TypeScript
- ✅ TailwindCSS for styling
- ✅ React Query for data fetching
- ✅ React Router for navigation
- ✅ Three main pages:
  - ✅ Home/Prompt page - Create new projects
  - ✅ Project Detail page - View generated diagrams
  - ✅ History page - Browse past projects
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Download diagrams (SVG and DSL source)
- ✅ Regenerate individual diagrams

#### Infrastructure
- ✅ Docker Compose for services
- ✅ PostgreSQL container
- ✅ PlantUML server container
- ✅ Complete documentation

## Project Structure

```
diagra/
├── README.md                    # Main documentation
├── SETUP.md                     # Setup instructions
├── COMMANDS.md                  # Command reference
├── API.md                       # API documentation
├── docker-compose.yml           # Docker services
├── .gitignore                   # Git ignore rules
│
├── backend/                     # Node.js backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   └── src/
│       ├── index.ts             # Entry point
│       ├── app.ts               # Express app
│       ├── config/
│       │   └── env.ts           # Environment config
│       ├── db/
│       │   └── prismaClient.ts
│       ├── middlewares/
│       │   ├── errorHandler.ts
│       │   └── authMiddleware.ts
│       ├── services/
│       │   ├── llmService.ts              # OpenAI integration
│       │   ├── diagramService.ts          # PlantUML rendering
│       │   ├── projectService.ts          # Project orchestration
│       │   └── diagramManagementService.ts
│       ├── controllers/
│       │   ├── projectController.ts
│       │   └── diagramController.ts
│       └── routes/
│           ├── projectRoutes.ts
│           └── diagramRoutes.ts
│
└── frontend/                    # React frontend
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── .env.example
    ├── index.html
    └── src/
        ├── main.tsx             # Entry point
        ├── App.tsx              # Main app component
        ├── index.css            # Global styles
        ├── vite-env.d.ts        # Type definitions
        ├── api/
        │   ├── client.ts        # Axios client
        │   ├── projectApi.ts    # Project API calls
        │   └── diagramApi.ts    # Diagram API calls
        ├── hooks/
        │   ├── useProject.ts    # Project hooks
        │   └── useDiagram.ts    # Diagram hooks
        ├── components/
        │   ├── Navbar.tsx
        │   ├── DiagramCard.tsx
        │   └── DiagramTypeSelector.tsx
        └── pages/
            ├── PromptPage.tsx
            ├── ProjectDetailPage.tsx
            └── HistoryPage.tsx
```

## Technologies Used

### Backend
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 14
- **ORM**: Prisma
- **LLM**: OpenAI GPT-4 Turbo
- **Diagram Engine**: PlantUML Server
- **Authentication**: JWT (optional)
- **Validation**: express-validator

### Frontend
- **Library**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios

### DevOps
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL (containerized)
- **Services**: PlantUML Server (containerized)

## How to Use

### 1. Initial Setup (One-time)

```powershell
# Navigate to project
cd c:\Users\aades\OneDrive\Desktop\diagra

# Install backend dependencies
cd backend
npm install

# Setup backend environment
Copy-Item .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Install frontend dependencies
cd ..\frontend
npm install
Copy-Item .env.example .env

# Start Docker services (PostgreSQL + PlantUML)
cd ..
docker-compose up -d

# Setup database
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### 2. Daily Development

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

**Open Browser:**
Navigate to http://localhost:5173

### 3. Using the Application

1. **Home Page** - Enter:
   - Project title (e.g., "Online Shopping System")
   - System description (detailed prompt)
   - Select diagram types (Class, Sequence, Activity, Use Case)
   - Click "Generate UML Diagrams"

2. **Project Detail Page** - View:
   - All generated diagrams
   - Download SVG images
   - Download PlantUML source code
   - Regenerate individual diagrams
   - View project details

3. **History Page** - Browse:
   - All previous projects
   - Click to view details

## Key Features

### 🤖 AI-Powered Generation
- Uses GPT-4 to understand natural language
- Generates comprehensive UML diagrams
- Supports multiple diagram types simultaneously

### 📊 Multiple Diagram Types
- **Class Diagrams**: Entities, attributes, relationships
- **Sequence Diagrams**: Interactions and message flows
- **Activity Diagrams**: Workflows and processes
- **Use Case Diagrams**: Actors and use cases
- **State Diagrams**: State machines (future)
- **Component Diagrams**: System architecture (future)

### 🔄 Version Control
- Each diagram can have multiple versions
- Regenerate diagrams to improve quality
- Switch between versions
- View version history

### 💾 Persistent Storage
- All projects saved to PostgreSQL
- Diagrams stored as files
- Complete version history
- User-friendly project management

### 📥 Export Options
- Download diagrams as SVG
- Download PlantUML source code
- View diagrams in browser
- Share diagram URLs

## Example Prompts

### E-commerce System
```
Design an online shopping system where customers can browse products by category, 
search for items, add products to a shopping cart, manage cart items, checkout, 
and pay via credit card or UPI. Include user authentication, product catalog 
management, inventory tracking, order processing, and payment gateway integration.
```

### Library Management
```
Design a library management system with book catalog, member registration, 
book borrowing and returning, fine calculation for late returns, book search 
and filtering, member account management, and librarian administrative functions.
```

### Bus Booking System
```
Design an online bus ticket booking system where users can search for buses 
by route and date, view available seats, select seats, book tickets, make 
payments, receive booking confirmation, and view booking history.
```

## API Endpoints

### Projects
- `POST /api/projects` - Create project and generate diagrams
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `DELETE /api/projects/:id` - Delete project

### Diagrams
- `POST /api/diagrams/projects/:projectId/diagrams/:diagramId/regenerate` - Regenerate
- `GET /api/diagrams/:diagramId/image` - Download image
- `GET /api/diagrams/:diagramId/source` - Download source
- `GET /api/diagrams/:diagramId/versions` - List versions
- `PUT /api/diagrams/:diagramId/versions/:versionId` - Switch version

## Database Schema

### Tables
1. **users** - User accounts (optional)
2. **projects** - UML generation projects
3. **diagrams** - Individual diagrams
4. **diagram_versions** - Diagram version history

### Relationships
- User → Projects (one-to-many)
- Project → Diagrams (one-to-many)
- Diagram → DiagramVersions (one-to-many)
- Diagram → CurrentVersion (one-to-one)

## Configuration Files

### Backend Environment (.env)
```env
DATABASE_URL=postgresql://uml_user:uml_password@localhost:5432/uml_generator
OPENAI_API_KEY=sk-your-key-here
PLANTUML_SERVER_URL=http://localhost:8080
PORT=3000
JWT_SECRET=your-secret
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:3000
```

## Troubleshooting

### Backend Issues
- ✅ Check PostgreSQL is running: `docker ps`
- ✅ Verify OpenAI API key is set
- ✅ Check backend logs for errors
- ✅ Ensure port 3000 is available

### Frontend Issues
- ✅ Check backend is running
- ✅ Verify VITE_API_URL is correct
- ✅ Check browser console for errors
- ✅ Ensure port 5173 is available

### Diagram Rendering Issues
- ✅ Check PlantUML server: http://localhost:8080
- ✅ Verify PLANTUML_SERVER_URL is correct
- ✅ Check diagram DSL syntax is valid

### Database Issues
- ✅ Run `npm run prisma:studio` to inspect data
- ✅ Check DATABASE_URL is correct
- ✅ Verify PostgreSQL container is healthy

## Next Steps / Future Enhancements

### Phase 2 Features
- [ ] User authentication and authorization
- [ ] Diagram editing in browser
- [ ] Collaborative diagram editing
- [ ] Export to PNG/PDF
- [ ] Mermaid diagram support
- [ ] State and Component diagrams
- [ ] Diagram templates
- [ ] Custom styling options

### Phase 3 Features
- [ ] AI-powered diagram suggestions
- [ ] Diagram comparison tool
- [ ] Integration with GitHub/GitLab
- [ ] API for third-party integrations
- [ ] Batch diagram generation
- [ ] Team collaboration features
- [ ] Advanced search and filtering
- [ ] Diagram analytics

## Documentation Files

1. **README.md** - Overview and introduction
2. **SETUP.md** - Detailed setup guide
3. **COMMANDS.md** - CLI commands reference
4. **API.md** - Complete API documentation
5. **PROJECT_SUMMARY.md** - This file!

## Development Tips

### Adding New Diagram Types
1. Add to `DiagramType` enum in Prisma schema
2. Update frontend `DiagramTypeSelector` component
3. Adjust LLM prompt in `llmService.ts`

### Modifying LLM Behavior
- Edit system prompt in `backend/src/services/llmService.ts`
- Adjust temperature and model parameters
- Add examples to improve generation quality

### Customizing UI
- Edit TailwindCSS config: `frontend/tailwind.config.js`
- Modify components in `frontend/src/components/`
- Update global styles in `frontend/src/index.css`

## Resources

- [PlantUML Documentation](https://plantuml.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Success Metrics

✅ **Project Setup**: Complete  
✅ **Backend Implementation**: Complete  
✅ **Frontend Implementation**: Complete  
✅ **Database Schema**: Complete  
✅ **API Documentation**: Complete  
✅ **Docker Configuration**: Complete  
✅ **Documentation**: Complete  

## Ready to Deploy!

Your complete Natural Language to UML Generator is ready to use! 

Start the application:
```powershell
# Terminal 1
cd backend ; npm run dev

# Terminal 2
cd frontend ; npm run dev
```

Then open http://localhost:5173 and start generating UML diagrams from natural language! 🚀
