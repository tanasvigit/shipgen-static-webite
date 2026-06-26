
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  Box,
  Package,
  Warehouse,
  Truck,
  Navigation,
  FileText,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Users,
  Settings,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Building2,
  Activity,
  Zap,
  Lock,
  Database,
  Globe,
  TrendingUp,
  Route,
  ChevronLeft,
  ChevronRight,
  LandPlot,
  CircleParking
} from 'lucide-react';

// Hero slides data
const heroSlides = [
  {
    id: 1,
    badge: 'Unified Logistics Control',
    title: 'Complete Logistics, Warehouse & Fleet Management',
    description: 'Manage orders, shipments, bin-level inventory, fleet operations, live GPS tracking, and billing—all in one integrated platform.',
    icon: <Package className="w-24 h-24" />,
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50'
  },
  {
    id: 2,
    badge: 'Real-Time Operations',
    title: 'Live GPS Tracking & Operational Visibility',
    description: 'Monitor your entire logistics network in real-time with GPS-enabled vehicles, live shipment status updates, and WebSocket-powered dashboards.',
    icon: <Navigation className="w-24 h-24" />,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50'
  },
  {
    id: 3,
    badge: 'Enterprise WMS',
    title: 'Bin-Level Warehouse Management System',
    description: 'Track inventory at zone-rack-bin level, process GRN, manage put-away, pick, and dispatch operations with complete audit trails.',
    icon: <Warehouse className="w-24 h-24" />,
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 to-indigo-50'
  }
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Auto-rotate carousel (6-8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered animations using Intersection Observer with smoother triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id');
            if (id) {
              // Add a small delay for smoother reveal
              setTimeout(() => {
                setRevealedElements((prev) => new Set(prev).add(id));
              }, 50);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px' // Trigger slightly earlier for smoother feel
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900 logistics-pattern">
      <Navbar />

      {/* 1. Hero Carousel Section */}
      <section ref={heroRef} className="relative min-h-[400px] lg:min-h-[450px] overflow-hidden flex items-center">
        {/* Background gradient layers with parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-opacity duration-800 ease-out ${currentSlide === idx ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float animation-delay-500"></div>
        </div>

        {/* Carousel slides */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`carousel-slide ${currentSlide === idx ? 'active' : currentSlide > idx ? 'prev' : ''}`}
            >
              <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Text / CTA column */}
                <div className="w-full lg:w-2/3 text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5 animate-fade-in-up animation-delay-300">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-7 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-400">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-500">
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-ripple hover-glow animate-gradient"
                    >
                      Request Demo
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-all duration-300 hover:scale-105 btn-ripple"
                    >
                      Home
                    </Link>
                  </div>
                </div>

                {/* Icon / badge column */}
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-700 text-sm font-semibold mb-4 border border-blue-200 animate-fade-in-up animation-delay-100">
                    <Zap size={16} className="text-blue-600 animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white shadow-2xl animate-float animate-fade-in-up animation-delay-200`}>
                    {slide.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 hover:shadow-xl z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 hover:shadow-xl z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel indicators - positioned at bottom center of the section */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx
                ? 'bg-blue-600 w-8 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Built For / Trusted By Section */}
      <section
        ref={(el) => {
          if (el) sectionRefs.current.set('built-for', el);
          el?.setAttribute('data-reveal-id', 'built-for');
        }}
        className={`bg-gradient-to-b from-white to-gray-50 border-y border-gray-100 py-12 transition-all duration-700 ${revealedElements.has('built-for') ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Built For</h2>
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8">Trusted by leading logistics companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={32} />, label: 'Logistics Companies', color: 'from-blue-500 to-blue-600', to: '/built-for/logistics-companies' },
              { icon: <Warehouse size={32} />, label: 'Warehouses & 3PLs', color: 'from-purple-500 to-purple-600', to: '/built-for/warehouses-3pls' },
              { icon: <Building2 size={32} />, label: 'Transporters & Fleet Operators', color: 'from-indigo-500 to-indigo-600', to: '/built-for/transporters-fleet' },
              { icon: <Globe size={32} />, label: 'Enterprises', color: 'from-teal-500 to-teal-600', to: '/built-for/enterprises' }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="flex flex-col items-center text-center group cursor-pointer"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl hover-lift hover-glow animate-float`}
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Platform Capabilities */}
      <section
        id="features"
        ref={(el) => {
          if (el) sectionRefs.current.set('capabilities', el);
          el?.setAttribute('data-reveal-id', 'capabilities');
        }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${revealedElements.has('capabilities') ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-out`}
      >
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Platform Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to run logistics operations at scale
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Order & Shipment Management',
              desc: 'Create, assign, and track shipments from pickup to delivery with real-time status updates.',
              icon: <Package size={24} />,
              gradient: 'from-blue-500 to-blue-600',
              delay: 0,
              to: '/demo/orders-shipments'
            },
            {
              title: 'Warehouse Management (WMS)',
              desc: 'Bin-level inventory tracking, zone-rack-bin hierarchy, inward/outward flows, and GRN management.',
              icon: <Warehouse size={24} />,
              gradient: 'from-purple-500 to-purple-600',
              delay: 100,
              to: '/demo/warehouse'
            },
            {
              title: 'Fleet & Driver Management',
              desc: 'Manage vehicles, assign drivers, track capacity, and monitor fleet status across operations.',
              icon: <Truck size={24} />,
              gradient: 'from-indigo-500 to-indigo-600',
              delay: 200,
              to: '/demo/fleet-drivers'
            },
            {
              title: 'Live GPS Tracking',
              desc: 'Real-time vehicle location updates, shipment status timeline, and operational visibility via WebSocket.',
              icon: <Navigation size={24} />,
              gradient: 'from-emerald-500 to-emerald-600',
              delay: 300,
              to: '/demo/gps-tracking'
            },
            {
              title: 'Billing & Invoicing',
              desc: 'Generate invoices from shipments, record payments, GST calculation, and financial reporting.',
              icon: <FileText size={24} />,
              gradient: 'from-amber-500 to-amber-600',
              delay: 400,
              to: '/demo/billing'
            },
            {
              title: 'Reports & Analytics',
              desc: 'Revenue reports, outstanding invoices, operational KPIs, and audit-ready logging.',
              icon: <BarChart3 size={24} />,
              gradient: 'from-teal-500 to-teal-600',
              delay: 500,
              to: '/demo/reports'
            },
            {
              title: 'Yard Management System',
              desc: 'Gate-to-exit yard control with appointments, queues, dock allocation, loading visibility, and detention management.',
              icon: <LandPlot size={24} />,
              gradient: 'from-orange-500 to-amber-600',
              delay: 600,
              to: '/demo/yard-management'
            },
            {
              title: 'Parking Management System',
              desc: 'Multi-floor parking with digital tickets, QR codes, occupancy tracking, payments, supervisor monitoring, and revenue reports.',
              icon: <CircleParking size={24} />,
              gradient: 'from-sky-500 to-indigo-600',
              delay: 700,
              to: '/demo/parking-management'
            }
          ].map((feature, idx) => (
            <Link
              key={idx}
              to={feature.to}
              className={`block bg-white border border-gray-200 rounded-xl p-6 transition-all duration-500 android-ripple group hover-lift cursor-pointer ${revealedElements.has('capabilities')
                ? 'scroll-reveal-scale revealed'
                : 'scroll-reveal-scale'
                }`}
              style={{
                transitionDelay: `${feature.delay}ms`,
                willChange: 'transform, opacity'
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl animate-package-bounce`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/features"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
          >
            View all features <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </section>

      {/* 4. How the Platform Works */}
      <section
        id="how-it-works"
        ref={(el) => {
          if (el) sectionRefs.current.set('how-it-works', el);
          el?.setAttribute('data-reveal-id', 'how-it-works');
        }}
        className={`bg-gradient-to-b from-gray-50 to-white border-y border-gray-100 py-20 ${revealedElements.has('how-it-works') ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined workflow from order creation to invoice generation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Create Orders & Shipments',
                desc: 'Define pickup and delivery addresses, assign to warehouses, and create shipment records.',
                icon: <Package size={20} />,
                gradient: 'from-blue-500 to-blue-600',
                direction: 'left'
              },
              {
                step: '02',
                title: 'Manage Inventory & Warehouses',
                desc: 'Track bin-level inventory, process GRN, manage put-away, pick, and dispatch operations.',
                icon: <Warehouse size={20} />,
                gradient: 'from-purple-500 to-purple-600',
                direction: 'right'
              },
              {
                step: '03',
                title: 'Track Vehicles & Shipments Live',
                desc: 'Monitor real-time GPS locations, shipment status updates, and operational dashboards.',
                icon: <Navigation size={20} />,
                gradient: 'from-emerald-500 to-emerald-600',
                direction: 'left'
              },
              {
                step: '04',
                title: 'Generate Invoices & Reports',
                desc: 'Auto-generate invoices from shipments, record payments, and access financial reports.',
                icon: <FileText size={20} />,
                gradient: 'from-amber-500 to-amber-600',
                direction: 'right'
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                to="/how-it-works"
                state={{ scrollTo: `step-${item.step}` }}
                className={`relative block ${revealedElements.has('how-it-works')
                  ? item.direction === 'left'
                    ? 'animate-slide-in-left'
                    : 'animate-slide-in-right'
                  : 'opacity-0'
                  }`}
                style={{
                  animationDelay: `${idx * 150}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-500 ease-out android-ripple hover-lift cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md transition-all duration-500 ease-out hover:scale-110 hover:rotate-6 animate-pulse-glow`}
                      style={{ willChange: 'transform' }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-300">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                      <ArrowRight size={16} className="text-gray-500 animate-pulse" />
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live Operations Visibility (Highlight Section) */}
      <section
        id="live-ops"
        ref={(el) => {
          if (el) sectionRefs.current.set('live-ops', el);
          el?.setAttribute('data-reveal-id', 'live-ops');
        }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${revealedElements.has('live-ops') ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-out`}
      >
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-2xl p-8 lg:p-12 shadow-xl hover-lift relative overflow-hidden transition-all duration-300">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <Route className="absolute top-10 left-10 w-24 h-24 text-emerald-400 animate-float" />
            <Activity className="absolute bottom-10 right-10 w-32 h-32 text-teal-400 animate-float animation-delay-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div
              className={revealedElements.has('live-ops') ? 'animate-slide-in-left' : 'opacity-0'}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-300 transition-all duration-500 hover:scale-105">
                <Activity size={14} className="text-emerald-600 animate-pulse" />
                <span>Real-Time Operations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 transition-all duration-500">
                Live Operations Visibility
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed transition-all duration-500">
                Monitor your entire logistics network in real-time. GPS-enabled vehicles, live shipment status updates, and operational dashboards powered by WebSocket technology.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time vehicle location tracking',
                  'Live shipment status timeline with GPS coordinates',
                  'WebSocket-based instant updates',
                  'Operational dashboard with live metrics'
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 animate-fade-in-up transition-all duration-500"
                    style={{
                      animationDelay: `${idx * 120}ms`,
                      animationFillMode: 'both',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse-glow">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/live-ops"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-ripple animate-gradient"
              >
                View Live Operations
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div
              className={`bg-white rounded-xl border-2 border-emerald-200 p-6 shadow-2xl hover-lift transition-all duration-500 ease-out ${revealedElements.has('live-ops') ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mb-4 border border-emerald-200 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer"></div>
                <div className="text-center relative z-10">
                  <Navigation size={48} className="text-emerald-600 mx-auto mb-2 animate-float" />
                  <p className="text-sm font-semibold text-gray-700">Live Map View</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '24/7', label: 'Tracking', color: 'emerald' },
                  { value: 'GPS', label: 'Enabled', color: 'teal' },
                  { value: 'Real-time', label: 'Updates', color: 'cyan' }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`text-center p-3 bg-${stat.color}-50 rounded-lg border border-${stat.color}-200 hover-lift transition-all duration-300`}
                  >
                    <p className={`text-2xl font-bold text-${stat.color}-700 counter-animate`}>{stat.value}</p>
                    <p className={`text-xs text-${stat.color}-600 font-medium`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Platform */}
      <section
        id="why-choose"
        ref={(el) => {
          if (el) sectionRefs.current.set('why-choose', el);
          el?.setAttribute('data-reveal-id', 'why-choose');
        }}
        className={`bg-white border-y border-gray-100 py-20 ${revealedElements.has('why-choose') ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Choose ShipGen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for enterprise logistics operations with production-grade architecture
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Multi-Tenant SaaS Architecture',
                desc: 'Complete tenant isolation with company-scoped data and role-based access control.',
                icon: <ShieldCheck size={20} />,
                gradient: 'from-indigo-500 to-indigo-600',
                bg: 'from-indigo-50 to-indigo-100',
                to: '/demo/multi-tenant'
              },
              {
                title: 'Bin-Level Warehouse Inventory',
                desc: 'Zone-rack-bin hierarchy with SKU-level tracking, inward/outward flows, and GRN management.',
                icon: <Warehouse size={20} />,
                gradient: 'from-purple-500 to-purple-600',
                bg: 'from-purple-50 to-purple-100',
                to: '/demo/warehouse'
              },
              {
                title: 'Real-Time GPS Tracking',
                desc: 'Live vehicle location updates and shipment status timeline powered by WebSocket technology.',
                icon: <MapPin size={20} />,
                gradient: 'from-emerald-500 to-emerald-600',
                bg: 'from-emerald-50 to-emerald-100',
                to: '/demo/gps-tracking'
              },
              {
                title: 'GST-Ready Billing',
                desc: 'Automated invoice generation, GST calculation, payment tracking, and financial reporting.',
                icon: <DollarSign size={20} />,
                gradient: 'from-amber-500 to-amber-600',
                bg: 'from-amber-50 to-amber-100',
                to: '/demo/billing'
              },
              {
                title: 'Role-Based Access Control',
                desc: 'Seven role types (Admin, Operations, Warehouse, Finance, Driver, Customer) with granular permissions.',
                icon: <Lock size={20} />,
                gradient: 'from-blue-500 to-blue-600',
                bg: 'from-blue-50 to-blue-100',
                to: '/demo/role-based-access'
              },
              {
                title: 'Audit-Ready System',
                desc: 'Complete audit logging for all data mutations, status changes, and financial transactions.',
                icon: <Database size={20} />,
                gradient: 'from-teal-500 to-teal-600',
                bg: 'from-teal-50 to-teal-100',
                to: '/demo/audit-ready'
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className={`block flex items-start space-x-4 p-6 bg-gradient-to-br ${item.bg} border border-gray-200 rounded-xl hover-lift transition-all duration-500 ease-out cursor-pointer ${revealedElements.has('why-choose')
                  ? 'scroll-reveal-scale revealed'
                  : 'scroll-reveal-scale'
                  }`}
                style={{
                  transitionDelay: `${idx * 120}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 transition-all duration-500 ease-out hover:scale-110 hover:rotate-6 animate-package-bounce`}
                  style={{
                    animationDelay: `${idx * 200}ms`,
                    willChange: 'transform'
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Roles We Support */}
      <section
        ref={(el) => {
          if (el) sectionRefs.current.set('roles', el);
          el?.setAttribute('data-reveal-id', 'roles');
        }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${revealedElements.has('roles') ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-out`}
      >
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Roles We Support</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored access and workflows for every team member
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Company Admin',
              desc: 'Full platform control, user management, and system configuration.',
              icon: <Settings size={20} />,
              gradient: 'from-indigo-500 to-indigo-600'
            },
            {
              title: 'Operations Manager',
              desc: 'Manage shipments, assign vehicles and drivers, monitor operations.',
              icon: <Activity size={20} />,
              gradient: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Warehouse Manager',
              desc: 'Manage inventory, process GRN, handle put-away, pick, and dispatch.',
              icon: <Warehouse size={20} />,
              gradient: 'from-purple-500 to-purple-600'
            },
            {
              title: 'Finance Team',
              desc: 'Generate invoices, record payments, access financial reports and analytics.',
              icon: <DollarSign size={20} />,
              gradient: 'from-amber-500 to-amber-600'
            },
            {
              title: 'Driver',
              desc: 'View assigned shipments, update status with GPS coordinates, track vehicle location.',
              icon: <Truck size={20} />,
              gradient: 'from-emerald-500 to-emerald-600'
            },
            {
              title: 'Customer',
              desc: 'Track shipment status, view delivery timeline, and access shipment details.',
              icon: <Users size={20} />,
              gradient: 'from-teal-500 to-teal-600'
            }
          ].map((role, idx) => (
            <Link
              key={idx}
              to="/demo/role-based-access"
              className={`block bg-white border border-gray-200 rounded-xl p-6 transition-all duration-500 ease-out android-ripple group hover-lift cursor-pointer ${revealedElements.has('roles')
                ? 'scroll-reveal-scale revealed'
                : 'scroll-reveal-scale'
                }`}
              style={{
                transitionDelay: `${idx * 120}ms`,
                willChange: 'transform, opacity'
              }}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg mb-4 transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6 animate-float`}
                style={{
                  animationDelay: `${idx * 200}ms`,
                  willChange: 'transform'
                }}
              >
                {role.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{role.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{role.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Final Call To Action */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Transform Your Logistics Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a personalized demo and see how ShipGen can streamline your logistics, warehouse, and fleet management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 btn-ripple animate-gradient"
            >
              Request Demo
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/40 hover:border-white/60 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-105 btn-ripple"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
