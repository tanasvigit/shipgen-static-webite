import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, Package, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Warehouses3PLsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    'Zone-Rack-Bin hierarchy for precise inventory location',
    'GRN (Goods Receipt Note) processing and put-away',
    'SKU-level inventory tracking with real-time stock levels',
    'Pick, pack, and dispatch workflows',
    'Multi-warehouse and multi-tenant support',
    'Audit-ready logging for compliance'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white text-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl mb-12">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1586528116493-a029325540fa?w=1200&q=80"
              alt="Modern warehouse with inventory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/90 text-white text-sm font-semibold mb-4">
                <Warehouse size={16} className="mr-2" />
                Built For
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Warehouses & 3PLs</h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-2xl">
                Bin-level warehouse management with complete visibility into inventory, inward/outward flows, and operations.
              </p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why ShipGen for Warehouses & 3PLs</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ShipGen WMS delivers enterprise-grade warehouse management for 3PLs and fulfillment centers.
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
                { icon: Warehouse, title: 'Bin-Level WMS', desc: 'Zone-Rack-Bin hierarchy' },
                { icon: Package, title: 'GRN & Put-Away', desc: 'Goods receipt and storage' },
                { icon: Layers, title: 'Inventory Operations', desc: 'Pick, pack, dispatch' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-purple-600" />
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Upgrade Your Warehouse?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join warehouses and 3PLs using ShipGen for accurate inventory, faster operations, and better compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/demo/warehouse" className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold">
              View WMS Demo <ArrowRight size={18} className="ml-2" />
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

export default Warehouses3PLsPage;
