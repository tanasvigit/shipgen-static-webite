import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, Warehouse, Navigation, FileText, ArrowRight,
  CheckCircle2, Layers, Truck, MapPin, DollarSign, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HowItWorks: React.FC = () => {
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
    if (scrollTo?.startsWith('step-')) {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.state]);

  const steps = [
    {
      number: '01',
      title: 'Create Orders & Shipments',
      description: 'Define pickup and delivery addresses, assign to warehouses, and create shipment records. Orders can be created manually or imported, and shipments are automatically generated from orders.',
      icon: <Package className="w-8 h-8" />,
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Create orders with customer details',
        'Define pickup and delivery locations',
        'Assign orders to warehouses',
        'Generate shipments automatically',
        'Track order status in real-time'
      ],
      link: '/demo/orders-shipments',
      linkText: 'View Orders & Shipments Demo'
    },
    {
      number: '02',
      title: 'Manage Inventory & Warehouses',
      description: 'Track bin-level inventory, process GRN (Goods Receipt Note), manage put-away, pick, and dispatch operations. Complete zone-rack-bin hierarchy for precise inventory location tracking.',
      icon: <Warehouse className="w-8 h-8" />,
      gradient: 'from-purple-500 to-purple-600',
      features: [
        'Zone-Rack-Bin hierarchy',
        'Bin-level inventory tracking',
        'GRN processing',
        'Put-away and pick operations',
        'Inventory movements and transfers'
      ],
      link: '/demo/warehouse',
      linkText: 'View WMS Demo'
    },
    {
      number: '03',
      title: 'Track Vehicles & Shipments Live',
      description: 'Monitor real-time GPS locations, shipment status updates, and operational dashboards. WebSocket-powered live updates ensure you always have the latest information.',
      icon: <Navigation className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-emerald-600',
      features: [
        'Real-time GPS vehicle tracking',
        'Live shipment status updates',
        'WebSocket instant notifications',
        'Operational dashboards',
        'Route optimization'
      ],
      link: '/demo/gps-tracking',
      linkText: 'View Live Tracking Demo'
    },
    {
      number: '04',
      title: 'Generate Invoices & Reports',
      description: 'Auto-generate invoices from shipments, record payments, and access comprehensive financial reports. GST-ready billing with automated calculations.',
      icon: <FileText className="w-8 h-8" />,
      gradient: 'from-amber-500 to-amber-600',
      features: [
        'Auto-generate invoices from shipments',
        'GST calculation (18%)',
        'Payment recording and tracking',
        'Revenue and outstanding reports',
        'Financial analytics'
      ],
      link: '/demo/billing',
      linkText: 'View Billing & Invoicing Demo'
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
        className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 rounded-md border border-blue-100/50 p-3 md:p-4 transition-all duration-500 hover:border-blue-200/80 hover:shadow-xl ${
          revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <Sparkles size={14} className="text-blue-600" />
            <span>Platform Workflow</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            A streamlined workflow from order creation to invoice generation
          </p>
          
          {/* Supporting description */}
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the complete logistics lifecycle in four simple steps. From capturing customer orders to generating invoices, every process is optimized for efficiency and transparency.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className={`bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition ${
              idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } flex flex-col lg:flex-row items-center gap-8`}
          >
            {/* Icon & Number */}
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-3`}>
                {step.icon}
              </div>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold text-gray-300 transition-all duration-300">{step.number}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 id={`step-${step.number}`} className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
              
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {step.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-2">
                    <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to={step.link}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 btn-ripple font-medium group border border-transparent hover:border-blue-500"
              >
                <span>{step.linkText}</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Start managing your logistics operations efficiently with ShipGen. Create your first order and experience the complete workflow.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/demo/orders-shipments"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold border border-transparent hover:border-blue-200"
          >
            Explore Orders Demo
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 hover:scale-105 font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
