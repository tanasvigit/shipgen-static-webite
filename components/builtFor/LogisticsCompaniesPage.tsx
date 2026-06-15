import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LogisticsCompaniesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    'End-to-end shipment tracking from pickup to delivery',
    'Multi-carrier management and route optimization',
    'Real-time GPS visibility for customers and operations',
    'Automated proof-of-delivery and status updates',
    'Integrated billing and GST-compliant invoicing',
    'Scalable multi-tenant architecture for growth'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl mb-12">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
              alt="Logistics companies managing shipments"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/90 text-white text-sm font-semibold mb-4">
                <Truck size={16} className="mr-2" />
                Built For
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Logistics Companies</h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                Streamline your operations with end-to-end shipment management, real-time tracking, and automated workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why ShipGen for Logistics Companies</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ShipGen empowers logistics providers to manage orders, shipments, and deliveries with full visibility.
              From first-mile pickup to last-mile delivery, track every movement in real time.
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
                { icon: Package, title: 'Order & Shipment Management', desc: 'Create, assign, and track shipments' },
                { icon: MapPin, title: 'Live GPS Tracking', desc: 'Real-time vehicle and delivery status' },
                { icon: Truck, title: 'Fleet Management', desc: 'Manage vehicles and driver assignments' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-blue-600" />
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

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Logistics?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join leading logistics companies using ShipGen to streamline operations and improve customer satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/demo/orders-shipments" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold">
              View Demo <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LogisticsCompaniesPage;
