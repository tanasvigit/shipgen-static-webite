## Dashboard Cleanup Plan (logistics-ui)

### Files/Directories to remove (dashboard-only)
- `components/AIAssistant.tsx`
- `components/Analytics.tsx`
- `components/Billing.tsx`
- `components/CreateShipmentModal.tsx`
- `components/Dashboard.tsx`
- `components/Fleet.tsx`
- `components/LiveOperations.tsx`
- `components/Logistics.tsx`
- `components/MasterData.tsx`
- `components/OrderShipmentManagement.tsx`
- `components/Warehouse.tsx`
- `components/WarehouseManagement.tsx`
- `components/LiveGPSTracking.tsx`
- `components/RoleGuard.tsx`
- Directories: `components/Billing/`, `components/Dashboard/`, `components/Fleet/`, `components/Orders/`, `components/Reports/`, `components/Shipments/`, `components/Warehouse/`
- `services/` folder (api, mockData, stateManager)
- Dashboard-only utils (`utils/roleAccess.ts`)
- Dashboard auth config (`config/auth.config.ts`)
- `types.ts` (dashboard-only types and enums)
- `constants.tsx` (dashboard nav definitions)

### App.tsx adjustments
- Remove sidebar/header/protected layout code
- Remove `RoleGuard`, `UserRole`, dashboard state
- Delete all protected routes (`/dashboard`, `/logistics/*`, `/fleet`, `/warehouse`, `/billing`, `/analytics`, `/master-data`, `/ai-assistant`, `/features/...`, `/app/...`)
- Remove `/login` redirect logic
- Keep only marketing routes (Landing, Features, HowItWorks, LiveOps Overview, WhyChooseUs, Contact, demo pages, built-for pages)

### Post-cleanup
- Remove unused imports (lucide icons, hooks, services, etc.)
- Update dependencies (remove dashboard deps like `@google/genai`, `socket.io-client`, `recharts` if unused)
- Ensure `npm run build` completes for marketing-only app
