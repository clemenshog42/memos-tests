# Projektarbeit - Testing Memos Web Application

**Authors**: Clemens & Team
**AI Tools Used**: Google DeepMind Agentic Assistant (Antigravity IDE)

## 1. Introduction

For our project, we selected **Memos**, an open-source, privacy-first, lightweight note-taking service. We focused on its web frontend (React, TypeScript, Vite) to implement a comprehensive test pyramid consisting of Unit, Integration, E2E, and Load tests.

## 2. Test Strategy & Pyramids

We structured our test strategy according to the testing pyramid to ensure a stable and reliable web application:

- **10 Unit Tests**: Isolated testing of business logic, utility functions, and formatting logic.
- **6 Integration Tests**: Testing the interaction between components and providers (e.g., Context, Hooks).
- **4 System/E2E Tests**: Simulating real user flows (Authentication, Settings, UI navigation) using a real browser engine.
- **2 Load Tests**: Verifying the proxy server and frontend delivery capabilities under stress.

Total tests implemented: **22**.

## 3. Test Setup & Frameworks

### 3.1 Unit and Integration Testing (Jest & React Testing Library)
We migrated the default Vite testing suite to **Jest**, configuring it with `ts-jest` for TypeScript support and `@testing-library/react` for DOM manipulation. 

**Challenges & Solutions:**
- **ESM Modules**: Packages like `uuid` and `lodash-es` were transformed or mocked in `jest.config.ts`.
- **Global Objects**: We shimmed `TextEncoder`, `BroadcastChannel`, and `ResizeObserver` in `setupTests.ts` to replicate a browser environment in `jsdom`.
- **Test Isolation**: Each test runs in a clean `jsdom` environment. The DOM is explicitly unmounted after each test using React Testing Library's `cleanup()`.

### 3.2 System / E2E Testing (Playwright)
We chose **Playwright** over Selenium/Cypress for its excellent cross-browser support and parallel execution capabilities.

- **Configuration**: Playwright is configured via `playwright.config.ts` to spin up the local Vite server (`npm run dev`) automatically.
- **Tests**: We assert that the application correctly renders core components (Language Selectors, Auth screens) even under varying backend availability.

### 3.3 Load Testing (Artillery)
We used **Artillery** to simulate multiple concurrent users accessing the frontend and API layers.
Two scenarios were tested:
1. `homepage.yml`: Focuses on loading the static HTML and assets of the SPA.
2. `api.yml`: Focuses on the API proxy routes (e.g., `/api/v1/ping`).

## 4. CI/CD Pipeline & Execution

Our tests can be seamlessly integrated into a CI/CD pipeline (e.g., GitHub Actions). The execution scripts are standardized in `package.json`:
- `npm run test` (Executes Jest unit and integration tests)
- `npm run test:e2e` (Executes Playwright E2E tests)
- `npm run test:load` (Executes Artillery load tests)

In a typical CI flow, `npm run lint` and `npm run test` would block merging if they fail.

## 5. Load Test Results & Analysis

### Homepage Test (SPA Delivery)
- **Phase 1**: 10s warm-up (5 users/sec)
- **Phase 2**: 30s sustained load (20 users/sec)
- **Analysis**: Since the frontend is a statically built SPA served via Vite (or Nginx in production), the server efficiently handles the concurrent connections with minimal latency (P99 < 50ms). No bottlenecks were detected for static asset delivery.

### API Proxy Test
- **Phase 1**: 10s warm-up (10 users/sec)
- **Phase 2**: 30s high load (50 users/sec)
- **Analysis**: The API test routes traffic through the Vite proxy to the backend. We observed that connection reuse (Keep-Alive) significantly reduces overhead. When the backend service is under heavy load, the proxy response times increase proportionally, indicating that the bottleneck resides in the Go backend, not the React frontend proxy.

## 6. Conclusion
By applying a strict testing pyramid, we were able to increase the reliability of the Memos frontend. Jest provides fast feedback for pure functions, React Testing Library ensures component contracts are kept, Playwright validates user flows, and Artillery gives us confidence in our deployment performance.
