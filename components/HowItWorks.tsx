import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package, Truck, Navigation, BarChart3, ArrowRight,
  CheckCircle2, Sparkles
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
      description: 'Define pickup and delivery, dispatch loads, and keep shipment workflows connected to the rest of your fleet picture—not trapped in a silo.',
      icon: <Package className="w-8 h-8" />,
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Create orders with customer details',
        'Define pickup and delivery locations',
        'Dispatch loads and assign routes',
        'Generate shipments from orders',
        'Track order status in real time'
      ],
      link: '/demo/orders-shipments',
      linkText: 'View Orders & Shipments Demo'
    },
    {
      number: '02',
      title: 'Manage Fleet & Drivers',
      description: 'Run fleet operations and assets in one place—vehicles, drivers, utilization, downtime, and cost intelligence—not just static vehicle lists.',
      icon: <Truck className="w-8 h-8" />,
      gradient: 'from-indigo-500 to-indigo-600',
      features: [
        'Vehicle and driver assignment',
        'Utilization and capacity views',
        'Downtime and maintenance signals',
        'Cost per vehicle and trends',
        'Active vs idle fleet visibility'
      ],
      link: '/demo/fleet-drivers',
      linkText: 'View Fleet & Drivers Demo'
    },
    {
      number: '03',
      title: 'Track Vehicles Live',
      description: 'Monitor real-time GPS locations and telematics—then ask what each vehicle means to the business, not just where it is on a map.',
      icon: <Navigation className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-emerald-600',
      features: [
        'Real-time GPS vehicle tracking',
        'Live shipment status updates',
        'Instant fleet event notifications',
        'Operational dashboards',
        'Business context on every location'
      ],
      link: '/demo/gps-tracking',
      linkText: 'View Live Tracking Demo'
    },
    {
      number: '04',
      title: 'Act on Insights & Reports',
      description: 'Measure → Identify → Act → Improve. An executive fleet view of utilization, downtime, maintenance, and savings opportunities—automated instead of manual pulls.',
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: 'from-amber-500 to-amber-600',
      features: [
        'Executive fleet dashboard',
        'Utilization and downtime KPIs',
        'Vehicles requiring attention',
        'Insights, alerts, and recommended actions',
        'Centralized automated reporting'
      ],
      link: '/demo/reports',
      linkText: 'View Reports & Analytics Demo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900">
      <Navbar />

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <Sparkles size={14} className="text-blue-600" />
            <span>Fleet Workflow</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            From dispatch to decisions — Data → Intelligence → Action
          </p>

          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Four steps that connect orders, fleet, GPS, and analytics into one Fleet Management System.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className={`bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition ${
              idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } flex flex-col lg:flex-row items-center gap-8`}
          >
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-3`}>
                {step.icon}
              </div>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold text-gray-300 transition-all duration-300">{step.number}</span>
              </div>
            </div>

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

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Turn fleet data into decisions, action, and ROI with ShipGen Fleet Intelligence.
        </p>
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
          <Link
            to="/demo/fleet-drivers"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold border border-transparent hover:border-blue-200"
          >
            Explore Fleet Demo
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 hover:scale-105 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
