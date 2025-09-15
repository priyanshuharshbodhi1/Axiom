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
For each feature (like the **workflow builder node**, **price-feed monitor**, or **trade trigger logic**), we wrote a **spec in Kiro** describing:

- Purpose  
- Inputs & outputs  
- Error cases  
- UI interactions  

This ensured clarity across the whole team.

### ⚡ Then Vibe Coding
We would then prompt Kiro conversationally, like:

> "Build a React Flow node that listens to CoinGecko and triggers a 1-inch swap if price jumps X%."

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

- 🧪 **Pre-merge hook** – ran unit & integration tests for frontend and backend on each pull request  
- 🗃️ **Schema sync hook** – auto-generated Prisma migrations, applied them to the dev DB, and ensured schema consistency  
- 🚀 **Preview deployment hook** – deployed feature branches to Vercel preview environments for visual testing  
- 🧹 **Build & lint hook** – checked formatting, type safety, and unused imports before merging

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
- Protocols/data sources to use (like CoinGecko, 1inch, etc.)  
- Acceptance criteria and mockups/flow diagrams

Kiro used these specs to generate **scaffolded modules** with:

- Folder structure  
- API routes  
- Type definitions  
- Frontend component stubs  

— all conforming to our architecture.

### ⚡ Benefits of Spec-Driven Development
- ✅ Reduced miscommunication — frontend & backend had aligned expectations  
- ✅ Reduced refactoring — generated code had correct types, models, validations from the start  
- ✅ Faster iteration — boilerplate was auto-generated, so we could focus on core logic  
- ✅ Easier collaboration — specs lived in Kiro, so anyone could pick up a feature without prior context

---

📌 **Summary**  
Kiro became like an **AI teammate** — handling the scaffolding, setup, and checks — so we could focus on solving hard problems and building Axiom.ai faster.
