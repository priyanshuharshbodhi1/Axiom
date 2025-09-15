# 🧠 How We Used Kiro to Build Axiom.ai

## ⚡ How was Kiro used in your project?
We used **Kiro** as the primary environment to build **Axiom.ai**.  
It became our **central workspace** for everything related to the project — from specs to live coding to deployment.

Kiro was especially helpful as the project started growing in complexity.  
**Other AI coding tools like Cursor and Windsurf began giving inconsistent results**, while Kiro continued to understand the full context of our codebase and specs — which made it far more reliable for building large, interconnected systems.

---

## 💡 For building and vibe coding from scratch
**How did you structure your conversations with Kiro to build your project?**  
**What was the most impressive code generation Kiro helped you with?**

### 📝 Spec First
For each feature (like the **React Flow workflow builder**, **GOAT SDK integrations**, or **multi-chain DeFi automation**), we wrote a **spec in Kiro** describing:

- Purpose  
- Inputs & outputs  
- Error cases  
- UI interactions  

This ensured clarity across the whole team.

### ⚡ Then Vibe Coding
We would then prompt Kiro conversationally, like:

> "Build a React Flow node system that integrates GOAT SDK plugins for CoinGecko price monitoring and 1inch DEX aggregation with AI-powered decision making."

Kiro would generate the first version, and then we would **iteratively refine** — UI layout → logic → edge cases.

### 💥 Most Impressive Generation
The most impressive part was when Kiro generated:

- A **fully connected React Flow node system**  
- Including **edges, state sync, and event handling**  
- With **drag/drop, validation, and UI feedback** built in

It also generated **backend endpoints** for multiple data sources + **mock integration tests** almost instantly — which saved days of manual work.

---

## ⚙️ For agent hooks
**What specific workflows did you automate with Kiro hooks?**  
**How did these hooks improve your development process?**

We used **Kiro agent hooks** to automate critical parts of our workflow:

- 🧪 **Auto-test on save hook** – automatically ran unit tests for React components and validated TypeScript errors when files were modified
- 🗃️ **Prisma migration sync hook** – auto-generated database migrations, validated schema changes, and ensured data integrity  
- 🚀 **Build validation hook** – comprehensive pre-merge checks including Next.js build validation, ESLint, and API endpoint testing
- 🧹 **Component testing hook** – generated unit tests for new React components using Jest and React Testing Library

**Impact:**  
These hooks meant **fewer broken builds**, **less manual effort**, and **more confidence when merging**.  
They helped us **move faster** and focus on features instead of housekeeping.

---

## 📋 For spec-to-code
**How did you structure your spec for Kiro to implement?**  
**How did the spec-driven approach improve your development process?**

### 🧩 Structure of Specs
Each spec included:

- User story / feature goal  
- Inputs & outputs  
- Edge cases  
- Data models  
- UI components & interactions  
- Error handling  
- GOAT SDK plugin integrations (CoinGecko, 1inch, DexScreener, Birdeye, Polymarket)
- Blockchain protocols (EVM networks, NEAR Protocol)  
- Acceptance criteria and mockups/flow diagrams

Kiro used these specs to generate **scaffolded modules** with:

- Next.js 14 App Router structure
- tRPC API routes with Zod validation
- TypeScript interfaces for GOAT SDK plugins
- React Flow node components with proper typing
- Prisma schema definitions
- Stripe billing integration stubs

— all conforming to our Next.js + TypeScript + Prisma architecture.

### 📋 Key Specifications Created
Our `.kiro/specs/` directory contains the core specifications that guided development:

- **[Workflow Builder Spec](/.kiro/specs/workflow-builder-spec.md)**: Complete visual drag-and-drop interface using React Flow
- **[React Flow Nodes](/.kiro/specs/react-flow-nodes.md)**: Node-based system for DeFi workflow automation 
- **[GOAT SDK Integration](/.kiro/specs/goat-sdk-integration.md)**: AI-powered DeFi automation with comprehensive plugin architecture
- **[External API Integration](/.kiro/specs/external-api-integration.md)**: CoinGecko, 1inch, and multi-source data connectivity

These specs enabled Kiro to understand our complex requirements and generate production-ready code that matched our exact architectural needs.

### ⚡ Benefits of Spec-Driven Development
- ✅ Reduced miscommunication — frontend & backend had aligned expectations  
- ✅ Reduced refactoring — generated code had correct types, models, validations from the start  
- ✅ Faster iteration — boilerplate was auto-generated, so we could focus on core logic  
- ✅ Easier collaboration — specs lived in Kiro, so anyone could pick up a feature without prior context

---

### 🎯 Development Timeline with Kiro

Our Kiro integration evolved organically throughout the project:

- **Aug 28**: Established foundational [steering files](/.kiro/steering/) defining our product vision, tech stack, and architecture
- **Aug 29 - Sep 2**: Created detailed specifications for workflow builder and React Flow node system
- **Sep 5**: Implemented automation hooks for testing, migration sync, and build validation
- **Sep 8**: Added external API integration specs for CoinGecko and 1inch
- **Sep 10**: Developed GOAT SDK integration specification for AI-powered automation
- **Sep 12**: Documented complete Kiro development context and methodology

This timeline shows how Kiro wasn't an afterthought — it was integral to our development process from day one.

---

📌 **Summary**  
Kiro became like an **AI teammate** — handling the scaffolding, setup, and checks — so we could focus on solving hard problems and building Axiom.ai faster. The combination of spec-driven development, intelligent automation hooks, and context-aware code generation enabled us to build a sophisticated DeFi automation platform with unprecedented speed and quality.
