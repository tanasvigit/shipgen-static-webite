import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Clock, CheckCircle2, Truck, User, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface Shipment {
  id: string;
  orderId: string;
  status: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  vehicle: { plateNumber: string } | null;
  driver: { name: string } | null;
  pickupTime: string | null;
  deliveryTime: string | null;
  trackingEvents: Array<{
    id: string;
    status: string;
    timestamp: string;
    latitude: number | null;
    longitude: number | null;
    description: string;
  }>;
}

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-90341',
    orderId: 'ORD-2024-001',
    status: 'IN_TRANSIT',
    customerName: 'FreshMart Pvt. Ltd.',
    pickupAddress: 'Bhiwandi DC · Mumbai',
    deliveryAddress: 'Koramangala DC · Bengaluru',
    vehicle: { plateNumber: 'MH12 AB 4521' },
    driver: { name: 'Ramesh Pawar' },
    pickupTime: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    deliveryTime: null,
    trackingEvents: [
      {
        id: 'EVT-1',
        status: 'PICKED',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        latitude: 19.2183,
        longitude: 72.9781,
        description: 'Shipment picked up from Bhiwandi DC',
      },
      {
        id: 'EVT-2',
        status: 'IN_TRANSIT',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        latitude: 16.705,
        longitude: 74.2433,
        description: 'Reached Kolhapur hub for refuelling',
      },
      {
        id: 'EVT-3',
        status: 'IN_TRANSIT',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        latitude: 13.0827,
        longitude: 80.2707,
        description: 'Crossed Chennai outer ring road',
      },
    ],
  },
  {
    id: 'SHP-90342',
    orderId: 'ORD-2024-014',
    status: 'DELIVERED',
    customerName: 'Arvind Textiles',
    pickupAddress: 'Ahmedabad Central Warehouse',
    deliveryAddress: 'Okhla Industrial Estate · Delhi',
    vehicle: { plateNumber: 'GJ18 PL 7345' },
    driver: { name: 'Shankar S.' },
    pickupTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    deliveryTime: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    trackingEvents: [
      {
        id: 'EVT-4',
        status: 'PICKED',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
        latitude: 23.0225,
        longitude: 72.5714,
        description: 'Loaded at Ahmedabad warehouse',
      },
      {
        id: 'EVT-5',
        status: 'IN_TRANSIT',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        latitude: 25.4358,
        longitude: 81.8463,
        description: 'Reached Kanpur hub',
      },
      {
        id: 'EVT-6',
        status: 'DELIVERED',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        latitude: 28.5355,
        longitude: 77.391,
        description: 'Delivered at Okhla IE',
      },
    ],
  },
  {
    id: 'SHP-90370',
    orderId: 'ORD-2024-025',
    status: 'CREATED',
    customerName: 'BlueOcean Pharma',
    pickupAddress: 'Taloja Pharma Park · Navi Mumbai',
    deliveryAddress: 'Whitefield Cold Storage · Bengaluru',
    vehicle: null,
    driver: null,
    pickupTime: null,
    deliveryTime: null,
    trackingEvents: [],
  },
];

const LiveShipmentStatus: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShipments(MOCK_SHIPMENTS);
      setSelectedShipment(MOCK_SHIPMENTS[0]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    const classes: Record<string, string> = {
      CREATED: 'bg-yellow-100 text-yellow-700',
      ASSIGNED: 'bg-purple-100 text-purple-700',
      PICKED: 'bg-indigo-100 text-indigo-700',
      IN_TRANSIT: 'bg-orange-100 text-orange-700',
      DELIVERED: 'bg-green-100 text-green-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 animate-pulse">
        Loading live shipment data…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Shipment Status</h1>
          <p className="text-sm text-gray-600 mt-1">
            Timeline with GPS coordinates for every milestone — powered by mock telemetry for demos.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300"
        >
          Back to Home <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[420px]">
            {selectedShipment ? (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Shipment</p>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedShipment.id} · {selectedShipment.customerName}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedShipment.pickupAddress} → {selectedShipment.deliveryAddress}
                    </p>
                  </div>
                  <div className="flex flex-col text-sm text-gray-600">
                    <span>
                      <Clock className="inline-block w-4 h-4 mr-1 text-emerald-500" />
                      {selectedShipment.pickupTime
                        ? `Picked · ${new Date(selectedShipment.pickupTime).toLocaleString()}`
                        : 'Pickup pending'}
                    </span>
                    <span>
                      <CheckCircle2 className="inline-block w-4 h-4 mr-1 text-blue-500" />
                      {selectedShipment.deliveryTime
                        ? `Delivered · ${new Date(selectedShipment.deliveryTime).toLocaleString()}`
                        : 'ETA +14 hrs'}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Driver</p>
                    <div className="flex items-center space-x-2 text-gray-800 font-semibold">
                      <User size={16} />
                      <span>{selectedShipment.driver?.name || 'Assigning soon'}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Vehicle</p>
                    <div className="flex items-center space-x-2 text-gray-800 font-semibold">
                      <Truck size={16} />
                      <span>{selectedShipment.vehicle?.plateNumber || 'Awaiting allocation'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Status Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                    {selectedShipment.trackingEvents.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        No tracking events yet — this shipment is still being planned.
                      </div>
                    ) : (
                      selectedShipment.trackingEvents.map((event, idx) => (
                        <div key={event.id} className="relative pl-12 pb-6">
                          <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                {event.status.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{event.description}</p>
                            {event.latitude && event.longitude && (
                              <div className="flex items-center space-x-1 text-xs text-gray-600 mt-2">
                                <MapPin size={12} />
                                <span>
                                  {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                Select a shipment to view timeline details.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold mb-4">All Shipments ({shipments.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {shipments.map((shipment) => (
              <div
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment)}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedShipment?.id === shipment.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600">{shipment.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">{shipment.customerName}</p>
                {shipment.vehicle && (
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Truck size={12} />
                    <span>{shipment.vehicle.plateNumber}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveShipmentStatus;
