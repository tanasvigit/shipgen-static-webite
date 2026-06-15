import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, Warehouse, MapPin, DollarSign, Lock, Database,
  Layers, Navigation, FileText, Users, Settings, Award, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const WhyChooseUs: React.FC = () => {
  const location = useLocation();
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  // Scroll: to section when navigating with state, or to top when opening page from main nav
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo?.startsWith('feature-')) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.state]);

  const features = [
    {
      id: 'feature-multi-tenant',
      title: 'Multi-Tenant SaaS Architecture',
      to: '/demo/multi-tenant',
      description: 'Complete tenant isolation with company-scoped data and role-based access control. Each company operates in its own secure environment with no data leakage between tenants.',
      icon: ShieldCheck,
      gradient: 'from-indigo-500 to-indigo-600',
      details: [
        'Complete data isolation per company',
        'Scalable multi-tenant infrastructure',
        'Role-based access control (7 role types)',
        'Secure API endpoints with tenant validation',
        'Independent billing and subscriptions'
      ]
    },
    {
      id: 'feature-bin-warehouse',
      title: 'Bin-Level Warehouse Inventory',
      to: '/demo/warehouse',
      description: 'Zone-rack-bin hierarchy with SKU-level tracking, inward/outward flows, and GRN management. Track inventory down to the exact bin location for maximum accuracy.',
      icon: Warehouse,
      gradient: 'from-purple-500 to-purple-600',
      details: [
        'Zone → Rack → Bin hierarchy',
        'SKU-level inventory tracking',
        'GRN (Goods Receipt Note) processing',
        'Put-away and pick operations',
        'Inventory movements and transfers',
        'Real-time stock levels'
      ]
    },
    {
      id: 'feature-gps-tracking',
      title: 'Real-Time GPS Tracking',
      to: '/demo/gps-tracking',
      description: 'Live vehicle location updates and shipment status timeline powered by WebSocket technology. Monitor your entire fleet in real-time with instant status updates.',
      icon: MapPin,
      gradient: 'from-emerald-500 to-emerald-600',
      details: [
        'Real-time GPS vehicle tracking',
        'Live shipment status updates',
        'WebSocket instant notifications',
        'Operational dashboards',
        'Route history and analytics',
        'Geofencing capabilities'
      ]
    },
    {
      id: 'feature-gst-billing',
      title: 'GST-Ready Billing',
      to: '/demo/billing',
      description: 'Automated invoice generation, GST calculation (18%), payment tracking, and financial reporting. Complete billing solution compliant with Indian tax regulations.',
      icon: DollarSign,
      gradient: 'from-amber-500 to-amber-600',
      details: [
        'Auto-generate invoices from shipments',
        'GST calculation (18%)',
        'Multiple payment modes (Cash, Bank, UPI, Card)',
        'Payment tracking and reconciliation',
        'Financial reports and analytics',
        'Outstanding invoice management'
      ]
    },
    {
      id: 'feature-rbac',
      title: 'Role-Based Access Control',
      to: '/demo/role-based-access',
      description: 'Seven role types (Admin, Operations, Warehouse, Finance, Driver, Customer) with granular permissions. Control who can access and modify what data.',
      icon: Lock,
      gradient: 'from-blue-500 to-blue-600',
      details: [
        'Company Admin - Full platform control',
        'Operations Manager - Shipment management',
        'Warehouse Manager - Inventory operations',
        'Finance Team - Billing and payments',
        'Driver - Shipment updates and tracking',
        'Customer - Shipment tracking only',
        'Granular permission system'
      ]
    },
    {
      id: 'feature-audit-ready',
      title: 'Audit-Ready System',
      to: '/demo/audit-ready',
      description: 'Complete audit logging for all data mutations, status changes, and financial transactions. Every action is logged with user, timestamp, and details for compliance.',
      icon: Database,
      gradient: 'from-teal-500 to-teal-600',
      details: [
        'Complete audit trail for all operations',
        'User action logging',
        'Data change history',
        'Financial transaction logs',
        'Compliance-ready reporting',
        'Immutable audit records'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900">
      <Navbar />

      {/* Main Content */}
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Professional Header Section */}
      <div 
        ref={(el) => {
          if (el) {
            sectionRefs.current.set('header', el);
            el.setAttribute('data-section-id', 'header');
          }
        }}
        className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50 rounded-md border border-indigo-100/50 p-3 md:p-4 transition-all duration-500 hover:border-indigo-200/80 hover:shadow-xl ${
          revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
            <Award size={14} className="text-indigo-600" />
            <span>Enterprise Excellence</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose ShipGen
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            Built for enterprise logistics operations with production-grade architecture
          </p>
          
          {/* Supporting description */}
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the competitive advantages that make ShipGen the preferred choice for logistics companies, warehouses, and fleet operators worldwide.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6`}>
                <feature.icon size={28} />
              </div>
              <div className="flex-1">
                <h2 id={feature.id} className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{feature.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Modern Technology Stack</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• React with TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Material Design</li>
              <li>• Real-time WebSocket</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• Node.js with Express</li>
              <li>• PostgreSQL Database</li>
              <li>• Prisma ORM</li>
              <li>• Socket.IO</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Security</h3>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• JWT Authentication</li>
              <li>• Role-Based Access Control</li>
              <li>• Tenant Isolation</li>
              <li>• Audit Logging</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div 
        ref={(el) => {
          if (el) {
            sectionRefs.current.set('cta', el);
            el.setAttribute('data-section-id', 'cta');
          }
        }}
        className={`text-center bg-white rounded-xl border border-gray-200 p-8 transition-all duration-500 hover:border-indigo-300 hover:shadow-xl ${
          revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Transform Your Operations?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Experience the power of enterprise-grade logistics management. Start your free trial today.
        </p>
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 btn-ripple font-semibold border border-transparent hover:border-blue-500">
            Start Free Trial
          </Link>
          <Link to="/contact" className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 transition-all duration-300 hover:scale-105 font-semibold">
            Schedule Demo
          </Link>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhyChooseUs;
