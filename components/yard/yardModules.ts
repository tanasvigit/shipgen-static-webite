export interface YardModule {
  id: string;
  badge: string;
  heading: string;
  description: string;
  flow?: string[];
  capabilities: string[];
  sampleData?: { vehicle: string; status: string; zone: string }[];
}

export const YARD_END_TO_END_FLOW = [
  'Vehicles arrive at the gate.',
  'Queue and staging activities are monitored.',
  'Dock and resource allocation are tracked.',
  'Loading progress and exceptions are managed.',
  'Exit readiness is verified before departure.',
];

export const YARD_MODULES: YardModule[] = [
  {
    id: 'control-tower',
    badge: 'Yard Intelligence Center',
    heading: 'Real-time visibility across the entire yard',
    description:
      'Monitor vehicle movement, queue congestion, dock utilization, loading activity, detention exposure, and operational exceptions from a single control center.',
    flow: YARD_END_TO_END_FLOW,
    capabilities: ['Live Yard Visibility', 'Operational Alerts', 'Exception Management'],
    sampleData: [
      { vehicle: 'MH12AB1001', status: 'Waiting', zone: 'Waiting Area' },
      { vehicle: 'KA03WX1013', status: 'Loading', zone: 'Dock DK-009' },
      { vehicle: 'DL09YZ1014', status: 'Exit Holding', zone: 'Exit Zone' },
    ],
  },
  {
    id: 'appointment-management',
    badge: 'Appointment Scheduling',
    heading: 'Plan arrivals before vehicles reach the gate',
    description:
      'Manage appointment bookings, time slots, cargo types, carriers, and customer schedules to reduce congestion and improve yard efficiency.',
    flow: [
      'Customer books slot.',
      'Appointment is approved.',
      'Vehicle reports at gate.',
      'Yard workflow begins.',
    ],
    capabilities: ['Slot Scheduling', 'Carrier Coordination', 'Appointment Tracking'],
  },
  {
    id: 'gate-management',
    badge: 'Gate Operations',
    heading: 'Control every vehicle entering and leaving the facility',
    description:
      'Validate appointments, perform gate checks, approve entries, verify exits, and maintain a complete gate transaction history.',
    flow: [
      'Vehicle arrives.',
      'Entry verification performed.',
      'Vehicle enters yard.',
      'Exit verification completed.',
      'Gate out approved.',
    ],
    capabilities: ['Entry Verification', 'Exit Verification', 'Gate Audit Trail'],
  },
  {
    id: 'virtual-queue',
    badge: 'Queue Orchestration',
    heading: 'Move vehicles efficiently from waiting to loading',
    description:
      'Manage waiting vehicles, staging areas, and queue priorities while reducing congestion and improving turnaround time.',
    capabilities: ['Queue Management', 'Staging Control', 'Priority Handling'],
  },
  {
    id: 'dock-management',
    badge: 'Dock Operations',
    heading: 'Optimize dock allocation and utilization',
    description:
      'Assign vehicles to docks, monitor occupancy, manage turnaround times, and maximize dock throughput.',
    flow: [
      'Vehicle called from queue.',
      'Dock assigned.',
      'Resources allocated.',
      'Loading begins.',
    ],
    capabilities: ['Dock Assignment', 'Occupancy Monitoring', 'Dock Performance'],
  },
  {
    id: 'loading-operations',
    badge: 'Loading & Unloading',
    heading: 'Track every loading activity in real time',
    description:
      'Monitor loading progress, labor assignments, equipment usage, exceptions, and completion status across all active docks.',
    capabilities: ['Progress Tracking', 'Labor Coordination', 'Exception Handling'],
  },
  {
    id: 'yard-map',
    badge: 'Visual Yard Control',
    heading: 'See every vehicle and zone in one operational map',
    description:
      'Track occupancy, vehicle locations, dock status, staging areas, and yard utilization through an interactive visual map.',
    capabilities: ['Zone Monitoring', 'Vehicle Tracking', 'Occupancy Analytics'],
  },
  {
    id: 'vehicle-operations',
    badge: 'Vehicle Visibility',
    heading: 'Monitor every vehicle throughout its yard journey',
    description:
      'Track vehicle status, location, appointments, dock assignments, loading progress, and historical movement.',
    capabilities: ['Journey Tracking', 'Status Monitoring', 'Operational History'],
  },
  {
    id: 'detention-management',
    badge: 'Cost & Delay Control',
    heading: 'Reduce detention costs and operational delays',
    description:
      'Identify delayed vehicles, monitor detention exposure, track disputes, and improve turnaround performance.',
    capabilities: ['Detention Tracking', 'Cost Visibility', 'Delay Analysis'],
  },
  {
    id: 'executive-kpis',
    badge: 'Performance Analytics',
    heading: 'Measure yard efficiency with executive-level insights',
    description:
      'Track throughput, turnaround times, SLA compliance, resource utilization, and operational performance across the facility.',
    capabilities: ['KPI Scorecards', 'Trend Analysis', 'Operational Performance'],
  },
];
