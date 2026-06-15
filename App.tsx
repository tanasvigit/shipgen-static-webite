
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import Landing from './components/Landing';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import LiveOperationsOverview from './components/LiveOperationsOverview';
import OrdersShipmentsDemo from './components/demo/OrdersShipmentsDemo';
import WarehouseDemo from './components/demo/WarehouseDemo';
import FleetDriversDemo from './components/demo/FleetDriversDemo';
import GpsTrackingDemo from './components/demo/GpsTrackingDemo';
import BillingDemo from './components/demo/BillingDemo';
import ReportsDemo from './components/demo/ReportsDemo';
import MultiTenantDemo from './components/demo/MultiTenantDemo';
import RoleBasedAccessDemo from './components/demo/RoleBasedAccessDemo';
import AuditReadyDemo from './components/demo/AuditReadyDemo';
import LogisticsCompaniesPage from './components/builtFor/LogisticsCompaniesPage';
import Warehouses3PLsPage from './components/builtFor/Warehouses3PLsPage';
import TransportersFleetPage from './components/builtFor/TransportersFleetPage';
import EnterprisesPage from './components/builtFor/EnterprisesPage';
import RealTimeVehicleTracking from './components/LiveOperations/RealTimeVehicleTracking';
import LiveShipmentStatus from './components/LiveOperations/LiveShipmentStatus';
import WebSocketUpdates from './components/LiveOperations/WebSocketUpdates';
import OperationalDashboard from './components/LiveOperations/OperationalDashboard';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 space-y-4 px-4 text-center">
    <Package size={64} className="opacity-20" />
    <div>
      <h2 className="text-xl font-bold">Page Under Construction</h2>
      <p className="text-sm">This section is coming soon. Please explore our available modules.</p>
    </div>
    <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
      Back to Home
    </Link>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300"
        title="Contact us"
      >
        <img src="/customer-service.png" alt="Contact" className="w-7 h-7 object-contain" />
      </Link>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/live-ops" element={<LiveOperationsOverview />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/why-choose" element={<WhyChooseUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Demo experiences */}
        <Route path="/demo/orders-shipments" element={<OrdersShipmentsDemo />} />
        <Route path="/demo/warehouse" element={<WarehouseDemo />} />
        <Route path="/demo/fleet-drivers" element={<FleetDriversDemo />} />
        <Route path="/demo/gps-tracking" element={<GpsTrackingDemo />} />
        <Route path="/demo/billing" element={<BillingDemo />} />
        <Route path="/demo/reports" element={<ReportsDemo />} />
        <Route path="/demo/multi-tenant" element={<MultiTenantDemo />} />
        <Route path="/demo/role-based-access" element={<RoleBasedAccessDemo />} />
        <Route path="/demo/audit-ready" element={<AuditReadyDemo />} />

        {/* Industry pages */}
        <Route path="/built-for/logistics-companies" element={<LogisticsCompaniesPage />} />
        <Route path="/built-for/warehouses-3pls" element={<Warehouses3PLsPage />} />
        <Route path="/built-for/transporters-fleet" element={<TransportersFleetPage />} />
        <Route path="/built-for/enterprises" element={<EnterprisesPage />} />

        {/* Live operations deep-dive pages */}
        <Route path="/live-operations/vehicle-tracking" element={<RealTimeVehicleTracking />} />
        <Route path="/live-operations/shipment-status" element={<LiveShipmentStatus />} />
        <Route path="/live-operations/websocket-updates" element={<WebSocketUpdates />} />
        <Route path="/live-operations/dashboard" element={<OperationalDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
