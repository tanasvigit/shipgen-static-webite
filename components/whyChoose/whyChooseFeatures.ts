export interface WhyChooseFeature {
  slug: string;
  title: string;
  description: string;
  gradient: string;
  details: string[];
  relatedDemo?: string;
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    slug: 'multi-tenant',
    title: 'Multi-Tenant SaaS Architecture',
    description: 'Complete tenant isolation with company-scoped data and role-based access control. Each company operates in its own secure environment with no data leakage between tenants.',
    gradient: 'from-indigo-500 to-indigo-600',
    details: [
      'Complete data isolation per company',
      'Scalable multi-tenant infrastructure',
      'Role-based access control (7 role types)',
      'Secure API endpoints with tenant validation',
      'Independent billing and subscriptions',
    ],
  },
  {
    slug: 'warehouse-inventory',
    title: 'Bin-Level Warehouse Inventory',
    description: 'Zone-rack-bin hierarchy with SKU-level tracking, inward/outward flows, and GRN management. Track inventory down to the exact bin location for maximum accuracy.',
    gradient: 'from-purple-500 to-purple-600',
    details: [
      'Zone → Rack → Bin hierarchy',
      'SKU-level inventory tracking',
      'GRN (Goods Receipt Note) processing',
      'Put-away and pick operations',
      'Inventory movements and transfers',
      'Real-time stock levels',
    ],
    relatedDemo: '/demo/warehouse',
  },
  {
    slug: 'gps-tracking',
    title: 'Real-Time GPS Tracking',
    description: 'Live vehicle location updates and shipment status timeline powered by WebSocket technology. Monitor your entire fleet in real-time with instant status updates.',
    gradient: 'from-emerald-500 to-emerald-600',
    details: [
      'Real-time GPS vehicle tracking',
      'Live shipment status updates',
      'WebSocket instant notifications',
      'Operational dashboards',
      'Route history and analytics',
      'Geofencing capabilities',
    ],
    relatedDemo: '/demo/gps-tracking',
  },
  {
    slug: 'gst-billing',
    title: 'GST-Ready Billing',
    description: 'Automated invoice generation, GST calculation (18%), payment tracking, and financial reporting. Complete billing solution compliant with Indian tax regulations.',
    gradient: 'from-amber-500 to-amber-600',
    details: [
      'Auto-generate invoices from shipments',
      'GST calculation (18%)',
      'Multiple payment modes (Cash, Bank, UPI, Card)',
      'Payment tracking and reconciliation',
      'Financial reports and analytics',
      'Outstanding invoice management',
    ],
    relatedDemo: '/demo/billing',
  },
  {
    slug: 'role-based-access',
    title: 'Role-Based Access Control',
    description: 'Seven role types (Admin, Operations, Warehouse, Finance, Driver, Customer) with granular permissions. Control who can access and modify what data.',
    gradient: 'from-blue-500 to-blue-600',
    details: [
      'Company Admin - Full platform control',
      'Operations Manager - Shipment management',
      'Warehouse Manager - Inventory operations',
      'Finance Team - Billing and payments',
      'Driver - Shipment updates and tracking',
      'Customer - Shipment tracking only',
      'Granular permission system',
    ],
  },
  {
    slug: 'audit-ready',
    title: 'Audit-Ready System',
    description: 'Complete audit logging for all data mutations, status changes, and financial transactions. Every action is logged with user, timestamp, and details for compliance.',
    gradient: 'from-teal-500 to-teal-600',
    details: [
      'Complete audit trail for all operations',
      'User action logging',
      'Data change history',
      'Financial transaction logs',
      'Compliance-ready reporting',
      'Immutable audit records',
    ],
  },
];
