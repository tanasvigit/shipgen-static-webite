## Project Split Plan

### Marketing (Pre-login)
- Entry pages: `Landing`, `Features`, `HowItWorks`, `LiveOperationsOverview`, `WhyChooseUs`, `Contact`.
- Demo pages: all under `components/demo/*`.
- Built-for pages: all under `components/builtFor/*`.
- Shared UI: marketing `Navbar`, default `Footer`, CTA sections, hero headers, customer-service icon, Formspree integration.
- Assets/config: `logo_logistic.png`, favicon, Tailwind/CSS used by public pages, Formspree URL, marketing-only constants.

### Dashboard (Post-login, Role-based)
- Layout/auth: `App.tsx` ProtectedLayout, `Sidebar`, `Header`, `Footer` dashboard variant, `RoleGuard`, `UserRole`, `getFilteredNavigationItems`.
- Modules: `Dashboard`, `Logistics`, `Orders`, `Shipments`, `Fleet`, `Warehouse`, `Billing`, `Reports`, `LiveOperations`, `MasterData`, `Analytics`, `AIAssistant`, plus UI components they depend on.
- Services/state: `services/api.ts`, `services/mockData.ts`, `services/stateManager.ts`, other service files.
- Assets/config: dashboard icons, API env vars, auth/localStorage helpers.

### Next Steps
1. Scaffold separate Vite projects (`shipzen-marketing`, `shipzen-dashboard`).
2. Move files according to lists above.
3. Adjust dependencies, routing, env vars, and build configs for each project.
