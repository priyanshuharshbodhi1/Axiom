# API Standards & Conventions

## REST API Design Principles

### URL Structure
- Use **kebab-case** for URL paths (`/api/workflow-templates`, not `/api/workflowTemplates`)
- Use **plural nouns** for resource collections (`/api/workflows`)
- Use **resource IDs** for specific items (`/api/workflows/{id}`)
- Avoid deep nesting beyond 2 levels (`/api/workflows/{id}/executions`)

### HTTP Methods
- **GET**: Retrieve data (idempotent, cacheable)
- **POST**: Create new resources or non-idempotent operations
- **PUT**: Update entire resource (idempotent)
- **PATCH**: Partial resource updates
- **DELETE**: Remove resources (idempotent)

### Response Format
All API responses follow this consistent structure:
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    pagination?: PaginationMeta
    timestamp: string
    requestId: string
  }
}
```

### Status Codes
- **200 OK**: Successful GET, PUT, PATCH requests
- **201 Created**: Successful POST requests that create resources
- **204 No Content**: Successful DELETE requests
- **400 Bad Request**: Client error with validation details
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Valid authentication but insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation errors with field details
- **500 Internal Server Error**: Server errors with minimal exposure

## Input Validation Standards

### Zod Schema Pattern
```typescript
const createWorkflowSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  nodes: z.array(workflowNodeSchema),
  settings: z.object({
    autoExecute: z.boolean().default(false),
    maxRetries: z.number().min(0).max(10).default(3)
  })
})

type CreateWorkflowRequest = z.infer<typeof createWorkflowSchema>
```

### Error Response Format
```typescript
interface ValidationError {
  success: false
  error: {
    code: 'VALIDATION_ERROR'
    message: 'Request validation failed'
    details: {
      field: string
      message: string
    }[]
  }
}
```

## Authentication & Authorization

### JWT Token Structure
```typescript
interface JwtPayload {
  userId: string
  email: string
  role: 'user' | 'premium' | 'admin'
  permissions: string[]
  exp: number
  iat: number
}
```

### Authorization Headers
- **Bearer Token**: `Authorization: Bearer <jwt_token>`
- **API Key**: `X-API-Key: <api_key>` (for webhook endpoints)

### Permission Levels
- **user**: Basic workflow creation and execution
- **premium**: Advanced features, higher rate limits
- **admin**: System administration and user management

## Rate Limiting

### Rate Limit Headers
```typescript
'X-RateLimit-Limit': '1000'      // Requests per window
'X-RateLimit-Remaining': '999'    // Remaining requests
'X-RateLimit-Reset': '1640995200' // Reset timestamp
'X-RateLimit-Window': '3600'      // Window size in seconds
```

### Rate Limit Tiers
- **Free Tier**: 100 requests/hour
- **Premium**: 1000 requests/hour  
- **Admin**: 10000 requests/hour

## Error Handling Patterns

### Client Error Response (4xx)
```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_WORKFLOW_NODE",
    "message": "Workflow node configuration is invalid",
    "details": {
      "nodeId": "price-feed-1", 
      "issues": ["Missing required parameter: symbol"]
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Server Error Response (5xx)  
```typescript
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred",
    "details": null
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z", 
    "requestId": "req_abc123"
  }
}
```

## Pagination Standards

### Request Parameters
- `page`: Page number (1-based indexing)
- `limit`: Items per page (default: 20, max: 100)
- `sort`: Sort field with optional direction (`name:asc`, `created_at:desc`)

### Response Metadata
```typescript
interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
```

## API Documentation Standards

### OpenAPI/Swagger Integration
- Generate documentation from TypeScript interfaces
- Include request/response examples for all endpoints
- Document authentication requirements and error codes
- Provide interactive API testing interface

### Endpoint Documentation Template
```typescript
/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Create a new workflow
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkflowRequest'
 *     responses:
 *       201:
 *         description: Workflow created successfully
 */
```

## Performance Standards

### Response Time Targets
- **GET requests**: < 200ms for cached data, < 1s for database queries
- **POST/PUT requests**: < 2s for simple operations, < 10s for complex workflows  
- **DELETE requests**: < 1s for soft deletes, < 5s for cascade operations

### Caching Strategy
- **Static data**: Cache headers with 1-hour TTL
- **User-specific data**: Private cache with 5-minute TTL
- **Real-time data**: No cache or 30-second TTL maximum
