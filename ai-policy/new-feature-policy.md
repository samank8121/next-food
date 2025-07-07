# 🛠 AI New Feature Implementation Policy Template

## 🔧 Feature Implementation Steps

### 1. 🗂️ Drizzle Table Creation
- Add a new table in the project’s Drizzle schema.
- Define relationships and constraints explicitly.
- Wait for confirmation before proceeding.

### 2. 📑 Zod Schema Setup
- Create a schema file: `lib/zod/schema/{feature-name}.ts`.
- Implement separate Zod schemas for:
  - `Create{Feature}`
  - `Update{Feature}`
- Include descriptive error messages.
- Await approval post-schema setup.

### 3. 🧭 Action File Creation
- File path: `lib/actions/{feature-name}.ts`.
- Generate CRUD operations.
- Include type-safe input validation using Zod.
- If the file exists, append new logic while maintaining function purity and documentation.
- Pause and request approval.

### 4. 🧾 Page Creation
- Folder path: `app/{feature-name}/`.
- Generate relevant pages (e.g., list, create, edit).
- Integrate with existing routing logic.
- Use server components where appropriate and include loading/suspense states.
- Await user review.

### 5. 🎨 Component Creation
- Folder path: `components/{feature-name}/`.
- Generate reusable UI components (e.g., forms, cards).
- Style using ShadCN standards and Tailwind.
- Each component should be documented with props and usage.
- Wait for review.

### 6. 🎨 Documentation
- create/update a story base on implemented feature in documentation folder
---

## 🛑 Disclaimer
AI must **not** auto-proceed or assume completion. Each phase must be reviewed and approved manually.

---

> 💬 Ready for your next approval prompt?
