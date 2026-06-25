---
marp: true
theme: default
paginate: true
header: "Memos Web App - Testing Project"
footer: "Software Testing - Projektarbeit"
---

# Testing "Memos" Web Application
**Projektarbeit**
Clemens & Team

---

## 🎯 Project Overview

**Memos**: A privacy-first, lightweight note-taking service.
**Goal**: Implement a complete test pyramid for the React/TypeScript frontend.

### Requirements Fulfilled:
- 10 Unit Tests
- 6 Integration Tests
- 4 System/E2E Tests
- 2 Load Tests
**(Total: 22 Tests)**

---

## 🏗️ Test Pyramid Strategy

1. **Unit Tests (Jest)**
   - Testing business logic, formatters, utilities.
   - Fast, isolated, mocking dependencies.
2. **Integration Tests (React Testing Library)**
   - Testing UI components (`SearchBar`, `ThemeSelect`).
   - Mocking Context providers & stores.
3. **E2E Tests (Playwright)**
   - Simulating full browser behavior.
4. **Load Tests (Artillery)**
   - Simulating traffic spikes on the web server.

---

## 🛠️ Frameworks & Setup

- **Jest + jsdom**: Chosen for robust mocking and snapshot capabilities. Migrated from Vitest.
  - *Challenge*: ESM modules (`uuid`) and Protobuf setup.
  - *Solution*: `transformIgnorePatterns` and global shims (`TextEncoder`).
- **Playwright**: Modern E2E framework.
  - Automatically spins up `Vite` dev server.
- **Artillery**: YAML-based load testing.
  - Easy to integrate into NPM scripts.

---

## 📊 Load Test Analysis

### 1. Static Delivery (`homepage.yml`)
- **Profile**: 20 users/sec for 30s.
- **Result**: Extremely fast (P99 < 50ms). Statically served files scale perfectly.

### 2. API Proxy (`api.yml`)
- **Profile**: 50 users/sec for 30s.
- **Result**: Showed that the Vite proxy efficiently passes connections, but latency is strictly bound by the backend Go server's database queries.

---

## 🔄 CI/CD & Test Execution

All tests are integrated via NPM:
- `npm run test` 
- `npm run test:e2e`
- `npm run test:load`

**Test Isolation**: Tests are strictly isolated. Jest clears the DOM and resets mocks after every single test run to prevent flakiness.

---

## 💡 Key Takeaways

- **Mocking is critical** for stable frontend tests (especially translations and contexts).
- **Playwright** simplifies E2E by managing the application lifecycle (starting/stopping servers).
- A **solid testing pyramid** drastically reduces debugging time for complex React applications!

---

# Thank You!
**Questions?**
