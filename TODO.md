## Split Projects TODO

### Marketing App (Pre-login)
1. `cd .. && npm create vite@latest shipzen-marketing -- --template react-ts`
2. Copy marketing files:
   - Pages: `Landing`, `Features`, `HowItWorks`, `LiveOperationsOverview`, `WhyChooseUs`, `Contact`
   - Demos: `components/demo/*`
   - Built-for: `components/builtFor/*`
   - Shared UI: marketing `Navbar`, default `Footer`, CTA sections, hero headers, icons
3. Move assets: `logo_logistic.png`, `customer-service.png`, favicon
4. Bring Tailwind/CSS config, Formspree URL
5. Implement routes (BrowserRouter) for public pages
6. Update package deps, run `npm install`, `npm run dev`, `npm run build`
7. Deploy (Netlify/Vercel), configure contact form endpoint

### Dashboard App (Post-login)
1. `npm create vite@latest shipzen-dashboard -- --template react-ts`
2. Copy dashboard code:
   - `App.tsx` ProtectedLayout, `Sidebar`, `Header`, dashboard `Footer`
   - Modules: Dashboard, Logistics, Orders, Shipments, Fleet, Warehouse, Billing, Reports, LiveOps, MasterData, Analytics, AIAssistant
   - Role utilities and navigation constants
   - UI components used inside dashboard
3. Move `services/*`, `types`, `constants`
4. Ensure login/role guard flow works (fake login or hook to backend)
5. Configure env vars (API base URL, localStorage keys)
6. Test with `npm run dev` / `npm run build`
7. Deploy to secure hosting (e.g., `app.shipzen.com`)
