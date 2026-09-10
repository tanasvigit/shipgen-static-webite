import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Navigation, Users, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const TransportersFleetPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    'Real-time GPS tracking for the entire fleet',
    'Driver assignment and shipment scheduling',
    'Utilization, downtime, and cost intelligence',
    'Live shipment status with location context',
    'Know active vs idle capacity at a glance',
    'Executive dashboards for fleet ROI'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-indigo-50/30 to-white text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl mb-12">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80"
              alt="Fleet of transport vehicles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/90 text-white text-sm font-semibold mb-4">
                <Truck size={16} className="mr-2" />
                Built For
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Transporters & Fleet Operators</h1>
              <p className="text-lg md:text-xl text-indigo-100 max-w-2xl">
                Ideal for operationally complex fleets (~30–200 vehicles). Turn fragmented fleet data into decisions and ROI.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why ShipGen for Transporters & Fleet Operators</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ShipGen gives fleet operators complete control over vehicles and drivers—plus intelligence on utilization,
              downtime, and cost. Keep GPS and TMS; add the management layer that recommends what to do next.
            </p>
            <ul className="space-y-3">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Capabilities</h3>
            <div className="space-y-4">
              {[
                { icon: Truck, title: 'Fleet & Vehicle Management', desc: 'Manage vehicles and capacity' },
                { icon: Users, title: 'Driver Management', desc: 'Assign drivers and track performance' },
                { icon: Navigation, title: 'Live GPS Tracking', desc: 'Location with business context' },
                { icon: BarChart3, title: 'Reports & Analytics', desc: 'Utilization, downtime, and ROI' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Optimize Your Fleet?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Know what is happening. Know why. Know what to do next.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/demo/fleet-drivers" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold">
              View Fleet Demo <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/demo/gps-tracking" className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 font-semibold">
              View GPS Tracking
            </Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 font-semibold">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransportersFleetPage;
