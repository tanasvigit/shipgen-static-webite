import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: 'default' | 'dashboard';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  if (variant === 'dashboard') {
    return (
      <footer className="flex-shrink-0 mt-auto border-t border-gray-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ShipZen. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</Link>
              <Link to="/live-ops" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Live Operations</Link>
              <Link to="/how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How It Works</Link>
              <Link to="/why-choose" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Why Choose Us</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="flex-shrink-0 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="animate-fade-in-up md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo_logistic.png" alt="ShipZen" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Enterprise logistics, warehouse, and fleet management platform.
              End-to-end visibility from order to delivery. GST-ready billing and real-time GPS tracking.
            </p>
          </div>
          <div className="animate-fade-in-up animation-delay-100">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Features</Link></li>
              <li><Link to="/live-ops" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Live Operations</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">How It Works</Link></li>
              <li><Link to="/why-choose" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Why Choose Us</Link></li>
              <li><Link to="/demo/reports" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Reports</Link></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-150">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Built For</h4>
            <ul className="space-y-2">
              <li><Link to="/built-for/logistics-companies" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Logistics Companies</Link></li>
              <li><Link to="/built-for/warehouses-3pls" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Warehouses & 3PLs</Link></li>
              <li><Link to="/built-for/transporters-fleet" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Transporters & Fleet</Link></li>
              <li><Link to="/built-for/enterprises" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Enterprises</Link></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between animate-fade-in-up animation-delay-400">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShipZen. All rights reserved.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 sm:mt-0 px-4 py-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:scale-105"
          >
            Dashboard →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
