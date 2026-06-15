import React, { useState, useEffect, useMemo } from 'react';
import { Truck, MapPin, Activity, Clock, RefreshCw, Navigation } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface VehicleTracking {
  vehicleId: string;
  plateNumber: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
  status: string;
}

const MOCK_VEHICLES: VehicleTracking[] = [
  {
    vehicleId: 'VH-001',
    plateNumber: 'MH12 AB 4521',
    latitude: 19.076,
    longitude: 72.8777,
    speed: 58,
    heading: 120,
    timestamp: new Date().toISOString(),
    status: 'IN_USE',
  },
  {
    vehicleId: 'VH-002',
    plateNumber: 'MH12 CD 9123',
    latitude: 18.5204,
    longitude: 73.8567,
    speed: 32,
    heading: 45,
    timestamp: new Date().toISOString(),
    status: 'IN_USE',
  },
  {
    vehicleId: 'VH-003',
    plateNumber: 'MH14 ZZ 2010',
    latitude: 28.7041,
    longitude: 77.1025,
    speed: 0,
    heading: 0,
    timestamp: new Date().toISOString(),
    status: 'AT_DEPOT',
  },
  {
    vehicleId: 'VH-004',
    plateNumber: 'MH01 MN 5522',
    latitude: 12.9716,
    longitude: 77.5946,
    speed: 42,
    heading: 200,
    timestamp: new Date().toISOString(),
    status: 'IN_USE',
  },
];

const RealTimeVehicleTracking: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleTracking[]>(MOCK_VEHICLES);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => simulateMovement(), 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const simulateMovement = () => {
    setVehicles((prev) =>
      prev.map((vehicle) => {
        if (vehicle.status !== 'IN_USE') {
          return vehicle;
        }
        const latDelta = (Math.random() - 0.5) * 0.02;
        const lngDelta = (Math.random() - 0.5) * 0.02;
        const speedDelta = Math.max(0, vehicle.speed + (Math.random() - 0.5) * 10);
        return {
          ...vehicle,
          latitude: Number((vehicle.latitude + latDelta).toFixed(4)),
          longitude: Number((vehicle.longitude + lngDelta).toFixed(4)),
          speed: Number(speedDelta.toFixed(1)),
          timestamp: new Date().toISOString(),
        };
      })
    );
    setLastUpdated(new Date());
    // demo: mark new timestamp
  };

  const handleRefresh = () => {
    simulateMovement();
  };

  const activeVehicles = useMemo(
    () => vehicles.filter((v) => v.status === 'IN_USE' || v.status === 'AVAILABLE'),
    [vehicles]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Real-Time Vehicle Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">
            GPS-enabled location updates with mock telemetry perfect for demos.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg border transition ${
              autoRefresh ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'
            }`}
          >
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Refresh now</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Navigation size={64} className="mx-auto text-blue-400 mb-4" />
                <p className="text-gray-600 font-medium">Live Map View</p>
                <p className="text-sm text-gray-500 mt-2">{activeVehicles.length} vehicles active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold mb-4">Active Vehicles ({activeVehicles.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activeVehicles.map((vehicle) => (
                <div key={vehicle.vehicleId} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{vehicle.plateNumber}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center space-x-1">
                      <MapPin size={12} />
                      <span>{vehicle.latitude.toFixed(4)}, {vehicle.longitude.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity size={12} />
                      <span>{vehicle.speed} km/h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{new Date(vehicle.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealTimeVehicleTracking;
