import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="flex-shrink-0 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="animate-fade-in-up md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo_logistic.png" alt="ShipGen" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The intelligence layer for modern fleets. Turn fleet data into decisions, action, and ROI —
              without replacing your existing GPS, ELD, or TMS stack.
            </p>
          </div>
          <div className="animate-fade-in-up animation-delay-100">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Features</Link></li>
              <li><Link to="/demo/orders-shipments" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Orders & Shipments</Link></li>
              <li><Link to="/demo/fleet-drivers" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Fleet & Drivers</Link></li>
              <li><Link to="/demo/gps-tracking" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Live GPS Tracking</Link></li>
              <li><Link to="/demo/reports" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Reports & Analytics</Link></li>
              <li><Link to="/live-ops" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Live Operations</Link></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-150">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Built For</h4>
            <ul className="space-y-2">
              <li><Link to="/built-for/logistics-companies" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Logistics Companies</Link></li>
              <li><Link to="/built-for/transporters-fleet" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Transporters & Fleet</Link></li>
              <li><Link to="/built-for/enterprises" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Enterprises</Link></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">How It Works</Link></li>
              <li><Link to="/why-choose" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Why Choose Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 animate-fade-in-up animation-delay-400">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} ShipGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
