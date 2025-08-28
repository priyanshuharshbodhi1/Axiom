# Technology Stack - Axiom.ai

## Frontend Framework
- **Next.js 14** with App Router for server-side rendering and routing
- **TypeScript** for type safety and developer experience  
- **Tailwind CSS** for utility-first styling and design consistency
- **Radix UI + shadcn/ui** for accessible component primitives
- **React Flow** for the visual workflow builder interface

## UI Components & Design
- **shadcn/ui** component library for consistent design system
- **Lucide React** for iconography
- **Framer Motion** for smooth animations and transitions
- **React Hook Form** with Zod validation for form handling

## Backend & Database
- **Node.js** runtime for server-side execution
- **PostgreSQL with Prisma ORM** for database schema and type-safe queries
- **Clerk** for authentication and user management
- **Stripe** for subscription billing and payment processing

## AI & Automation Engine
- **OpenAI + Google AI SDK** for intelligent workflow automation
- **GOAT SDK** plugins for blockchain and DeFi integrations:
  - CoinGecko, CoinMarketCap for market data
  - DexScreener, Birdeye for DEX analytics  
  - 1inch, 0x Protocol for trade execution
  - Polymarket for prediction market data

## Blockchain Integration
- **EVM Support via Viem** for Ethereum-compatible chains
- **NEAR Protocol** native integration
- **Native wallet support** (MetaMask, WalletConnect, NEAR Wallet)
- **Multi-chain architecture** supporting cross-chain workflows

## Development Tools
- **ESLint** and **Prettier** for code quality and formatting
- **Husky** for git hooks and pre-commit validation
- **Jest** and **React Testing Library** for unit and integration testing
- **Playwright** for end-to-end testing

## Deployment & DevOps
- **Vercel** for frontend deployment with automatic previews
- **Railway** or **PlanetScale** for database hosting
- **GitHub Actions** for CI/CD pipeline
- **Sentry** for error tracking and performance monitoring

## State Management
- **Zustand** for client-side state management
- **React Query** for server state and caching
- **React Context** for theme and global UI state

## Code Organization Patterns
- **Colocation**: Keep related components, hooks, and utilities together
- **Barrel exports**: Use index files for clean imports
- **Feature-based folders**: Organize by business features rather than file types
- **Type-first development**: Define TypeScript interfaces before implementation

## Performance Considerations
- **Edge functions** for API routes requiring low latency
- **Image optimization** with Next.js Image component
- **Code splitting** at route and component levels
- **Bundle analysis** to monitor build sizes

## Security Standards
- **Environment variable validation** with Zod schemas
- **API rate limiting** to prevent abuse
- **Input sanitization** for all user inputs
- **CORS configuration** for secure cross-origin requests
