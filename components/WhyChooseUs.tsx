import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package, Truck, MapPin, BarChart3, Award, Layers, Lightbulb
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
      id: 'feature-orders',
      title: 'Connected Order & Shipment Management',
      to: '/demo/orders-shipments',
      description: 'Dispatch, loads, and routes stay connected to fleet reality—so shipment work isn’t trapped in a silo from vehicles and drivers.',
      icon: Package,
      gradient: 'from-blue-500 to-blue-600',
      details: [
        'Loads, dispatch, and delivery tracking',
        'Pickup and drop locations',
        'Status from create to delivered',
        'Tied to vehicles and drivers',
        'Operational visibility end to end'
      ]
    },
    {
      id: 'feature-fleet',
      title: 'Fleet Decision Intelligence',
      to: '/demo/fleet-drivers',
      description: 'Move beyond tracking lists. Utilization, downtime reasons, recurring repairs, and cost per vehicle—so managers know what to do next.',
      icon: Truck,
      gradient: 'from-indigo-500 to-indigo-600',
      details: [
        'Vehicle and driver management',
        'Utilization intelligence (active vs idle)',
        'Downtime reasons and lost availability',
        'Maintenance and repair patterns',
        'Cost per vehicle and asset economics'
      ]
    },
    {
      id: 'feature-gps',
      title: 'GPS with Business Context',
      to: '/demo/gps-tracking',
      description: 'Keep tracking vehicles. ShipGen adds the intelligence layer on top of GPS—from “where is the vehicle?” to “what does it mean to the business?”',
      icon: MapPin,
      gradient: 'from-emerald-500 to-emerald-600',
      details: [
        'Live GPS and telematics',
        'Shipment location timeline',
        'Instant status notifications',
        'Fleet map and filters',
        'Business meaning on every pin'
      ]
    },
    {
      id: 'feature-reports',
      title: 'Insights, Alerts & Actions',
      to: '/demo/reports',
      description: 'Executive fleet dashboards that answer what owners care about: utilization, downtime, maintenance spend, vehicles needing attention, and savings opportunities.',
      icon: BarChart3,
      gradient: 'from-amber-500 to-amber-600',
      details: [
        'Automated centralized reporting',
        'Measure → Identify → Act → Improve',
        'Vehicles requiring attention',
        'Potential savings opportunities',
        'Decision intelligence—not just charts'
      ]
    },
    {
      id: 'feature-layer',
      title: 'Keep Your Systems. Add Intelligence.',
      to: '/features',
      description: 'ShipGen is designed to sit above your existing stack. Keep GPS. Keep ELD. Keep TMS. Add the management intelligence layer.',
      icon: Layers,
      gradient: 'from-teal-500 to-teal-600',
      details: [
        'Normalize → Analyze → Detect → Recommend',
        'Insights: what matters now',
        'Alerts: what needs attention',
        'Actions: what to do next',
        'Built for fleets of ~30–200 vehicles'
      ]
    },
    {
      id: 'feature-roi',
      title: 'Built for Fleet ROI',
      to: '/contact',
      description: 'Focus management attention on measurable fleet economics: less downtime, less maintenance waste, higher utilization, less admin time.',
      icon: Lightbulb,
      gradient: 'from-rose-500 to-rose-600',
      details: [
        '↓ Downtime — more productive vehicles',
        '↓ Maintenance waste — recurring repair visibility',
        '↑ Utilization — underused assets surfaced',
        '↓ Admin time — less manual reporting',
        'Know what, why, and what to do next'
      ]
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
        className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50 rounded-md border border-indigo-100/50 p-3 md:p-4 transition-all duration-500 hover:border-indigo-200/80 hover:shadow-xl ${
          revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
            <Award size={14} className="text-indigo-600" />
            <span>Fleet Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose ShipGen
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            The intelligence layer for modern fleets
          </p>

          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your fleet already generates the data. ShipGen turns that data into intelligence—for logistics companies, transporters, and enterprises.
          </p>
        </div>
      </div>

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
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Add Fleet Intelligence?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Keep GPS. Keep ELD. Keep TMS. Add ShipGen—and turn fleet data into decisions, action, and ROI.
        </p>
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
          <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 btn-ripple font-semibold">
            Schedule Demo
          </Link>
          <Link to="/features" className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 transition-all duration-300 hover:scale-105 font-semibold">
            Explore Features
          </Link>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhyChooseUs;
