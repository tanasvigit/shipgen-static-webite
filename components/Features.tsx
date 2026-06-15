import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package, Warehouse, Truck, Navigation, FileText, BarChart3,
  ArrowRight, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Features: React.FC = () => {
  const location = useLocation();
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) {
              setTimeout(() => {
                setRevealedSections((prev) => new Set(prev).add(id));
              }, 50);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Scroll to section when navigating with state
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo?.startsWith('feature-')) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.state]);

  const capabilities = [
    { title: 'Order & Shipment Management', desc: 'Create, assign, and track shipments from pickup to delivery with real-time status updates.', icon: Package, gradient: 'from-blue-500 to-blue-600', to: '/demo/orders-shipments' },
    { title: 'Warehouse Management (WMS)', desc: 'Bin-level inventory tracking, zone-rack-bin hierarchy, inward/outward flows, and GRN management.', icon: Warehouse, gradient: 'from-purple-500 to-purple-600', to: '/demo/warehouse' },
    { title: 'Fleet & Driver Management', desc: 'Manage vehicles, assign drivers, track capacity, and monitor fleet status across operations.', icon: Truck, gradient: 'from-indigo-500 to-indigo-600', to: '/demo/fleet-drivers' },
    { title: 'Live GPS Tracking', desc: 'Real-time vehicle location updates, shipment status timeline, and operational visibility via WebSocket.', icon: Navigation, gradient: 'from-emerald-500 to-emerald-600', to: '/demo/gps-tracking' },
    { title: 'Billing & Invoicing', desc: 'Generate invoices from shipments, record payments, GST calculation, and financial reporting.', icon: FileText, gradient: 'from-amber-500 to-amber-600', to: '/demo/billing' },
    { title: 'Reports & Analytics', desc: 'Revenue reports, outstanding invoices, operational KPIs, and audit-ready logging.', icon: BarChart3, gradient: 'from-teal-500 to-teal-600', to: '/demo/reports' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900">
      <Navbar />

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div
          ref={(el) => { if (el) { sectionRefs.current.set('header', el); el.setAttribute('data-section-id', 'header'); } }}
          className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 rounded-md border border-blue-100/50 p-3 md:p-4 transition-all duration-500 hover:border-blue-200/80 hover:shadow-xl ${revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />
              <span>Platform Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Platform Features</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Everything you need to run logistics operations at scale
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From order management to billing, fleet tracking to warehouse operations — explore our complete suite of capabilities.
            </p>
          </div>
        </div>

        {/* 1. Platform Capabilities */}
        <section
          id="feature-capabilities"
          ref={(el) => { if (el) { sectionRefs.current.set('capabilities', el); el.setAttribute('data-section-id', 'capabilities'); } }}
          className={`${revealedSections.has('capabilities') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">Platform Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">Core modules to power your logistics operations</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.to}
                  className={`block bg-white border border-gray-200 rounded-xl p-6 transition-all duration-500 android-ripple group hover-lift cursor-pointer ${revealedSections.has('capabilities') ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'}`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section
          ref={(el) => { if (el) { sectionRefs.current.set('cta', el); el.setAttribute('data-section-id', 'cta'); } }}
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white ${revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Experience the power of enterprise-grade logistics management. Create your first order and see the platform in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/demo/orders-shipments" className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold">
              Explore Demos
            </Link>
            <Link to="/dashboard" className="px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 hover:scale-105 font-semibold">
              Go to Dashboard
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
