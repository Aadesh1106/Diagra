# API Reference - Natural Language to UML Generator

Base URL: `http://localhost:3000`

## Authentication

Authentication is optional for the MVP. When implemented, include JWT token in headers:
```
Authorization: Bearer <token>
```

---

## Projects

### Create Project

Generate UML diagrams from a natural language prompt.

**Endpoint:** `POST /api/projects`

**Request Body:**
```json
{
  "title": "Online Shopping System",
  "prompt": "Design an online shopping system where customers can browse products, add items to cart, checkout, and pay via credit card or UPI. Include user authentication, product catalog, order management, and payment processing.",
  "diagramTypes": ["CLASS", "SEQUENCE", "ACTIVITY", "USE_CASE"]
}
```

**Fields:**
- `title` (string, required): Project title
- `prompt` (string, required): Natural language system description
- `diagramTypes` (array, required): Array of diagram types to generate
  - Valid values: `"CLASS"`, `"SEQUENCE"`, `"ACTIVITY"`, `"USE_CASE"`, `"STATE"`, `"COMPONENT"`

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "projectId": "uuid-here",
    "status": "DONE",
    "diagrams": [
      {
        "id": "diagram-uuid-1",
        "type": "CLASS",
        "title": "Class Diagram - Online Shopping",
        "currentVersionId": "version-uuid-1"
      },
      {
        "id": "diagram-uuid-2",
        "type": "SEQUENCE",
        "title": "Sequence Diagram - Checkout Process",
        "currentVersionId": "version-uuid-2"
      }
    ]
  }
}
```

**Status Values:**
- `PENDING`: Diagrams are being generated
- `DONE`: All diagrams generated successfully
- `ERROR`: Generation failed

---

### Get Project by ID

Retrieve complete project details including all diagrams.

**Endpoint:** `GET /api/projects/:id`

**Parameters:**
- `id` (path parameter): Project UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "project-uuid",
    "title": "Online Shopping System",
    "prompt": "Design an online shopping system...",
    "status": "DONE",
    "errorMessage": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:31:00Z",
    "diagrams": [
      {
        "id": "diagram-uuid",
        "type": "CLASS",
        "title": "Class Diagram - Online Shopping",
        "currentVersion": {
          "id": "version-uuid",
          "versionNumber": 1,
          "dsl": "@startuml\nclass Customer {...}\n@enduml",
          "imageUrl": "/uploads/diagrams/image.svg"
        }
      }
    ]
  }
}
```

---

### List All Projects

Get all projects (filtered by user if authenticated).

**Endpoint:** `GET /api/projects`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "project-uuid-1",
      "title": "Online Shopping System",
      "prompt": "Design an online shopping system...",
      "status": "DONE",
      "createdAt": "2024-01-15T10:30:00Z",
      "diagrams": [...]
    },
    {
      "id": "project-uuid-2",
      "title": "Library Management",
      "prompt": "Design a library management system...",
      "status": "DONE",
      "createdAt": "2024-01-14T15:20:00Z",
      "diagrams": [...]
    }
  ]
}
```

---

### Delete Project

Delete a project and all associated diagrams.

**Endpoint:** `DELETE /api/projects/:id`

**Parameters:**
- `id` (path parameter): Project UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Diagrams

### Regenerate Diagram

Generate a new version of a specific diagram using the original prompt.

**Endpoint:** `POST /api/diagrams/projects/:projectId/diagrams/:diagramId/regenerate`

**Parameters:**
- `projectId` (path parameter): Project UUID
- `diagramId` (path parameter): Diagram UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "new-version-uuid",
    "versionNumber": 2,
    "dsl": "@startuml\n...\n@enduml",
    "imageUrl": "/uploads/diagrams/new-image.svg",
    "createdAt": "2024-01-15T11:00:00Z"
  }
}
```

---

### Get Diagram Image

Download diagram as SVG image.

**Endpoint:** `GET /api/diagrams/:diagramId/image`

**Parameters:**
- `diagramId` (path parameter): Diagram UUID

**Response:** `200 OK`
- Content-Type: `image/svg+xml`
- Body: SVG file content

---

### Get Diagram Source (DSL)

Download PlantUML/Mermaid source code.

**Endpoint:** `GET /api/diagrams/:diagramId/source`

**Parameters:**
- `diagramId` (path parameter): Diagram UUID

**Response:** `200 OK`
- Content-Type: `text/plain`
- Content-Disposition: `attachment; filename="diagram-title.puml"`
- Body: PlantUML DSL code

---

### Get Diagram Versions

List all versions of a diagram.

**Endpoint:** `GET /api/diagrams/:diagramId/versions`

**Parameters:**
- `diagramId` (path parameter): Diagram UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "version-uuid-2",
      "versionNumber": 2,
      "dsl": "@startuml\n...\n@enduml",
      "imageUrl": "/uploads/diagrams/v2.svg",
      "createdAt": "2024-01-15T11:00:00Z"
    },
    {
      "id": "version-uuid-1",
      "versionNumber": 1,
      "dsl": "@startuml\n...\n@enduml",
      "imageUrl": "/uploads/diagrams/v1.svg",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Switch Diagram Version

Change the current version of a diagram.

**Endpoint:** `PUT /api/diagrams/:diagramId/versions/:versionId`

**Parameters:**
- `diagramId` (path parameter): Diagram UUID
- `versionId` (path parameter): Version UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "version-uuid",
    "versionNumber": 1,
    "dsl": "@startuml\n...\n@enduml",
    "imageUrl": "/uploads/diagrams/image.svg",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Error Responses

All errors follow this format:

**Response:** `4xx` or `5xx`
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

**Common Error Codes:**
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication required or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Example Usage

### cURL Examples

**Create Project:**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Online Shopping System",
    "prompt": "Design an online shopping system with user authentication, product catalog, shopping cart, and payment processing.",
    "diagramTypes": ["CLASS", "SEQUENCE"]
  }'
```

**Get Project:**
```bash
curl http://localhost:3000/api/projects/{project-id}
```

**Download Diagram Image:**
```bash
curl http://localhost:3000/api/diagrams/{diagram-id}/image \
  -o diagram.svg
```

**Download Diagram Source:**
```bash
curl http://localhost:3000/api/diagrams/{diagram-id}/source \
  -o diagram.puml
```

### PowerShell Examples

**Create Project:**
```powershell
$body = @{
    title = "Online Shopping System"
    prompt = "Design an online shopping system with user authentication, product catalog, shopping cart, and payment processing."
    diagramTypes = @("CLASS", "SEQUENCE")
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/projects `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

**Get Project:**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/projects/{project-id}
```

**Download Diagram:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/diagrams/{diagram-id}/image `
  -OutFile diagram.svg
```

---

## Rate Limits

Currently no rate limits are enforced. In production, consider implementing:
- Rate limiting per IP/user
- Maximum projects per user
- Maximum diagrams per project
- Request timeout limits

---

## Webhooks (Future Feature)

Not currently implemented. Potential future feature:
- Webhook notifications when project generation completes
- Webhook for regeneration completion
- Error notifications
