import React, { useEffect, useState } from 'react';
import { Activity, Radio, Package, Truck, FileText } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface WebSocketEvent {
  id: string;
  type: 'shipment:status' | 'vehicle:location' | 'invoice:generated';
  timestamp: string;
  data: Record<string, any>;
}

const EVENT_TYPES = [
  { type: 'shipment:status' as const, label: 'Shipment Status Update', icon: Package, color: 'blue' },
  { type: 'vehicle:location' as const, label: 'Vehicle Location Update', icon: Truck, color: 'green' },
  { type: 'invoice:generated' as const, label: 'Invoice Generated', icon: FileText, color: 'purple' },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

const WebSocketUpdates: React.FC = () => {
  const [events, setEvents] = useState<WebSocketEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(true);
    setEvents(generateMockEvents(5));
    const interval = setInterval(() => {
      setEvents((prev) => [generateMockEvents(1)[0], ...prev].slice(0, 12));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <header>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">Realtime stack</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">WebSocket Updates</h1>
        <p className="text-sm text-gray-600 mt-1">
          Visualize how ShipZen pushes telemetry to browsers in milliseconds. This page uses rotating mock events so you
          can demo the experience even without servers.
        </p>
      </header>

      <section
        className={`p-4 rounded-lg border-2 ${
          isConnected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Radio className={isConnected ? 'text-green-600' : 'text-red-600'} size={24} />
          <div>
            <div className="font-semibold text-gray-900">
              {isConnected ? 'Connected to socket' : 'Disconnected'}
            </div>
            <div className="text-sm text-gray-600">
              {isConnected ? 'Streaming demo updates every 4 seconds' : 'WebSocket connection lost'}
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {EVENT_TYPES.map((eventType) => {
          const colors = colorMap[eventType.color];
          return (
            <article key={eventType.type} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`${colors.bg} ${colors.text} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <eventType.icon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{eventType.label}</h3>
              <p className="text-sm text-gray-600">
                Pushes whenever {eventType.type.replace(':', ' ')} events fire inside the control tower.
              </p>
            </article>
          );
        })}
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Architecture walk-through</h2>
        <div className="space-y-4">
          <ArchitectureStep
            number="01"
            title="Socket broker"
            description="A multi-region Socket.IO cluster keeps thousands of vehicles and planners in sync."
          />
          <ArchitectureStep
            number="02"
            title="Domain emitters"
            description="Shipment, fleet, and billing services publish domain events to Kafka, which the broker fans out."
          />
          <ArchitectureStep
            number="03"
            title="React subscriber"
            description="The Live Operations UI listens to channels, updates Zustand stores, and re-renders instantly."
          />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent events (rolling feed)</h2>
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity size={48} className="mx-auto text-gray-300 mb-4" />
            Waiting for first event…
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity size={16} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {event.type.replace(':', ' · ')}
                    </p>
                    <p className="text-xs text-gray-600">{renderEventDescription(event)}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    </div>
  );
};

const ArchitectureStep: React.FC<{ number: string; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="flex items-start space-x-4">
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-blue-600 font-bold text-sm">{number}</span>
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const generateMockEvents = (count: number): WebSocketEvent[] => {
  const templates = [
    {
      type: 'shipment:status',
      data: () => ({
        shipmentId: 'SHP-' + Math.floor(Math.random() * 90000 + 10000),
        status: ['PICKED', 'IN_TRANSIT', 'DELIVERED'][Math.floor(Math.random() * 3)],
        hub: ['Pune', 'Jaipur', 'Delhi', 'Hyderabad'][Math.floor(Math.random() * 4)],
      }),
    },
    {
      type: 'vehicle:location',
      data: () => ({
        vehicleId: 'VH-' + Math.floor(Math.random() * 500),
        lat: 11 + Math.random() * 12,
        lng: 72 + Math.random() * 8,
        speed: (40 + Math.random() * 30).toFixed(1),
      }),
    },
    {
      type: 'invoice:generated',
      data: () => ({
        invoiceId: 'INV-' + Math.floor(Math.random() * 9000 + 1000),
        amount: `₹${(45000 + Math.random() * 55000).toLocaleString()}`,
        customer: ['Bluestone Retail', 'FreshMart', 'Arvind Textiles'][Math.floor(Math.random() * 3)],
      }),
    },
  ] as const;

  return Array.from({ length: count }).map((_, idx) => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
      id: `${Date.now()}-${idx}`,
      type: template.type,
      timestamp: new Date().toISOString(),
      data: template.data(),
    };
  });
};

const renderEventDescription = (event: WebSocketEvent) => {
  if (event.type === 'shipment:status') {
    return `#${event.data.shipmentId} moved to ${event.data.status} · ${event.data.hub}`;
  }
  if (event.type === 'vehicle:location') {
    return `Vehicle ${event.data.vehicleId} @ ${event.data.lat.toFixed(2)}, ${event.data.lng.toFixed(2)} · ${event.data.speed} km/h`;
  }
  return `Invoice ${event.data.invoiceId} generated for ${event.data.customer} (${event.data.amount})`;
};

export default WebSocketUpdates;
