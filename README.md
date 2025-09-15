# Axiom

Axiom is a powerful workflow automation platform that enables users to create, manage, and execute automated workflows with scheduled triggers. Built with Next.js and integrated with various external APIs and services, Axiom provides a comprehensive solution for automating repetitive tasks and processes.

## Features

- **Visual Workflow Builder**: Create workflows using an intuitive drag-and-drop interface
- **Scheduled Execution**: Set up cron-based scheduling for automated workflow execution
- **External Integrations**: Connect with various APIs and services through GOAT SDK plugins
- **User Management**: Secure authentication and user management with Clerk
- **Analytics & Monitoring**: Track workflow performance and usage statistics
- **Billing Integration**: Stripe integration for credit-based usage and billing
- **Multi-wallet Support**: EVM and NEAR blockchain wallet integrations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **Workflow Engine**: Custom execution engine with GOAT SDK
- **Blockchain**: Viem, NEAR API
- **Analytics**: Custom analytics system

## Built with Kiro

Axiom.ai was developed using [Kiro](https://kiro.dev/), an AI-powered IDE that accelerates development through spec-driven development, intelligent automation, and context-aware code generation.

### How Kiro Enhanced Our Development

- **Spec-Driven Development**: All major features were built from detailed specifications in [`.kiro/specs/`](.kiro/specs/), enabling rapid prototyping and consistent implementation
- **AI-Powered Automation**: Automated testing, code review, and deployment processes through [`.kiro/hooks/`](.kiro/hooks/) 
- **Context-Aware Generation**: Kiro's understanding of our tech stack and architecture through [`.kiro/steering/`](.kiro/steering/) files ensured consistent code patterns
- **Rapid Iteration**: Reduced boilerplate generation time by 70% and enabled focus on core DeFi automation features

### Kiro Documentation

- **[Complete Kiro Usage Documentation](How_Kiro_Was_Used_to_Build_the_Project.md)**: Detailed explanation of how Kiro was used throughout development
- **[Kiro Development Context](.kiro/README.md)**: Overview of all steering files, specifications, and automation hooks

## Getting Started

### Prerequisites

- Node.js 18+ and yarn
- PostgreSQL database
- Environment variables (see `.env.example`)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd defai-office
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/axiom"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   
   # API Security
   API_SECRET="your_secure_api_secret"
   CRON_SECRET="your_secure_cron_secret"
   
   # Stripe
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # External API Keys (optional, for specific plugins)
   OPENAI_API_KEY="your_openai_key"
   GROQ_API_KEY="your_groq_key"
   GOOGLE_API_KEY="your_google_key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database (optional)
   yarn prisma db seed
   ```

5. **Run the development server**
   ```bash
   yarn dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Production Deployment

1. **Build the application**
   ```bash
   yarn build
   ```

2. **Start the production server**
   ```bash
   yarn start
   ```
   
## Project Structure

```
├── actions/           # Server actions for data fetching and mutations
├── app/              # Next.js app directory (routes and API)
├── components/       # Reusable UI components and providers
├── lib/              # Utility functions and configurations
├── prisma/           # Database schema and migrations
├── public/           # Static assets
├── schema/           # Zod validation schemas
└── types/            # TypeScript type definitions
```

## Development Guidelines

- **Component Structure**: Keep components modular and reusable
- **API Routes**: Use proper error handling and validation
- **Database**: Use Prisma for all database operations
- **Authentication**: Protect routes using Clerk middleware
- **Styling**: Use Tailwind CSS with Radix UI components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper tests
4. Submit a pull request

## License

This project is private and proprietary.
