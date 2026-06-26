export interface ParkingModule {
  id: string;
  badge: string;
  heading: string;
  description: string;
  flow?: string[];
  capabilities: string[];
  sampleData?: { ticket: string; status: string; floor: string }[];
}

export const PARKING_END_TO_END_FLOW = [
  'Vehicle arrives at the entry gate.',
  'Operator creates a digital ticket with category and pricing.',
  'Floor capacity is assigned and occupancy updated.',
  'Payment is collected at entry or before exit.',
  'QR ticket is printed for the windshield.',
  'Exit is processed; slot is freed and activity is audited.',
];

export const PARKING_MODULES: ParkingModule[] = [
  {
    id: 'facility-dashboard',
    badge: 'Facility Control',
    heading: 'Real-time KPIs across your parking facility',
    description:
      'Monitor vehicles inside, today’s entries and exits, revenue collected, occupancy by category, hardware health, recent tickets, and audit activity from a single admin, supervisor, or operator dashboard.',
    flow: PARKING_END_TO_END_FLOW,
    capabilities: [
      'Vehicles inside & daily traffic KPIs',
      'Revenue today & occupancy summary',
      'Hardware snapshot & recent audit',
      'Role-scoped dashboard views',
    ],
    sampleData: [
      { ticket: 'PK102399', status: 'Paid', floor: 'Floor 1' },
      { ticket: 'MH12AB1001', status: 'Unpaid', floor: 'Floor 2' },
      { ticket: 'KA03WX1013', status: 'Exited', floor: 'Basement' },
    ],
  },
  {
    id: 'ticket-lifecycle',
    badge: 'Digital Tickets',
    heading: 'Paperless entry, payment, and exit workflows',
    description:
      'Replace paper tickets with unique codes and QR payloads. Track each vehicle from Unpaid or Paid at entry through payment collection to exit — with amounts locked at creation time.',
    flow: [
      'Operator enters plate and vehicle category.',
      'Pricing rule applied; ticket code generated.',
      'Floor assigned; occupancy incremented.',
      'Payment collected if unpaid.',
      'Exit processed; slot freed.',
    ],
    capabilities: [
      'Unpaid → Paid → Exited status flow',
      'Pay-at-entry or pay-before-exit',
      'Unique sequential ticket codes',
      'QR generation & print',
    ],
  },
  {
    id: 'floor-occupancy',
    badge: 'Multi-Floor Occupancy',
    heading: 'Capacity control across floors and vehicle types',
    description:
      'Configure and monitor separate capacity buckets for 2-wheelers, 4-wheelers, and heavy vehicles on every floor. Block new tickets when capacity is full and free slots automatically on exit.',
    capabilities: [
      'Per-floor 2W / 4W / heavy buckets',
      'Live occupied vs capacity counts',
      'Admin capacity editing',
      'Supervisor & operator occupancy views',
    ],
    sampleData: [
      { ticket: 'Floor 1 · 2W', status: '62 / 80', floor: 'Occupied' },
      { ticket: 'Floor 2 · 4W', status: '40 / 55', floor: 'Occupied' },
      { ticket: 'Basement · Heavy', status: '2 / 12', floor: 'Available' },
    ],
  },
  {
    id: 'pricing-engine',
    badge: 'Pricing Rules',
    heading: 'Flexible rates by vehicle category',
    description:
      'Configure base price, per-hour, and max daily caps per category. One active rule per type; changes are audited and never affect tickets already created.',
    capabilities: [
      'Base, hourly & max daily rates',
      'Free entry support',
      'One active rule per category',
      'Price locked at ticket creation',
    ],
  },
  {
    id: 'operator-workflows',
    badge: 'Booth Operations',
    heading: 'Everything booth staff need at the gate',
    description:
      'Operators handle new tickets, payment collection, QR printing, vehicle search, exit processing, and recent transaction history — with OCR-assisted plate capture on entry.',
    flow: [
      'Create entry ticket (manual or OCR).',
      'Collect cash, UPI, or card payment.',
      'Print or display QR ticket.',
      'Search vehicle and process exit.',
    ],
    capabilities: [
      'New ticket & collect payment',
      'QR print & vehicle search',
      'Recent tickets & shift summary',
      'Operator preferences',
    ],
  },
  {
    id: 'supervisor-oversight',
    badge: 'Supervisor Monitoring',
    heading: 'Shift-level visibility without admin overhead',
    description:
      'Supervisors monitor live entry/exit streams, floor occupancy, QR scan activity, operator timelines, open alerts, and reports — without pricing or user administration.',
    capabilities: [
      'Live parking & QR monitoring',
      'Operator activity timeline',
      'Vehicle search & recent tickets',
      'Reports (view-only, no PDF export)',
    ],
  },
  {
    id: 'reports-analytics',
    badge: 'Reports & Analytics',
    heading: 'Revenue, traffic, and category insights',
    description:
      'Analyze collections by day or custom range, entry/exit volumes, and vehicle mix. Admins export Security Systems–branded PDFs; supervisors view the same reports in read-only mode.',
    capabilities: [
      'Revenue, traffic & category reports',
      'Today, week, month & custom filters',
      'Vehicle category filter',
      'Admin PDF export',
    ],
  },
  {
    id: 'hardware-monitoring',
    badge: 'Hardware & QR Monitoring',
    heading: 'Register devices and watch live scan activity',
    description:
      'Admins register QR scanners, boom barriers, thermal printers, and network controllers with online/offline status. Supervisors and admins stream QR scan events in real time.',
    capabilities: [
      'Device registry by type & location',
      'Online / offline status',
      'Live QR scan event stream',
      'Configuration & monitoring (no auto gate control)',
    ],
  },
  {
    id: 'ocr-plates',
    badge: 'OCR Plate Capture',
    heading: 'Auto-fill vehicle numbers from photos',
    description:
      'On the new-ticket screen, operators upload a plate photo (JPEG, PNG, WebP) and EasyOCR on the backend suggests the registration number — speeding up entry during peak hours.',
    capabilities: [
      'Image upload on new ticket',
      'EasyOCR backend detection',
      'Up to 10 MB per image',
      'Requires ticket create permission',
    ],
  },
  {
    id: 'admin-audit',
    badge: 'Administration & Audit',
    heading: 'Staff, security settings, and full audit trail',
    description:
      'Admins manage parking employees (admin, supervisor, operator roles), hardware and pricing configuration, system preferences, and a complete audit log of tickets, payments, users, and settings changes.',
    capabilities: [
      'Employee create, edit & disable',
      'Audit logs for all key actions',
      'System & security settings',
      'Role-based access on UI and API',
    ],
  },
  {
    id: 'shipgen-integration',
    badge: 'Shipgen / ParkFlow',
    heading: 'Embedded in Shipgen or standalone ParkFlow',
    description:
      'Run ParkFlow inside the Shipgen console at /parking/* with shared chrome and platform SSO for Shipgen admins, or deploy the standalone frontend and backend for parking-only facilities.',
    capabilities: [
      'Embedded UI at /parking/*',
      'Platform SSO → parking admin role',
      'Dedicated staff login without FleetOps',
      'Gateway API at /api/pms/*',
    ],
  },
];
