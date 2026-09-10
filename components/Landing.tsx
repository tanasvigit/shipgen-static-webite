import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  Package, Truck, Navigation, BarChart3, CheckCircle2, Building2, Activity, Zap,
  MapPin, ArrowRight, TrendingUp, Route, ChevronLeft, ChevronRight, Lightbulb,
  Bell, Target, Layers, Gauge
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    badge: 'Fleet Intelligence',
    title: 'The intelligence layer for modern fleets',
    description: 'Turn fleet data into decisions, action and ROI. Keep your GPS, ELD, and TMS—ShipGen sits above them.',
    icon: <Lightbulb className="w-24 h-24" />,
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50'
  },
  {
    id: 2,
    badge: 'GPS + Business Context',
    title: 'Live tracking that drives decisions',
    description: 'Location alone is not enough. ShipGen adds shipment, driver, and cost context so ops teams know what to do next.',
    icon: <Navigation className="w-24 h-24" />,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50'
  },
  {
    id: 3,
    badge: 'Measure → Identify → Act',
    title: 'From fleet data to measurable ROI',
    description: 'Utilization, downtime, and cost signals become insights, alerts, and actions—built for fleets of ~30–200 vehicles.',
    icon: <TrendingUp className="w-24 h-24" />,
    gradient: 'from-indigo-500 to-blue-600',
    bgGradient: 'from-indigo-50 to-blue-50'
  }
];

const Landing: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id');
            if (id) {
              setTimeout(() => {
                setRevealedElements((prev) => new Set(prev).add(id));
              }, 50);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => {
      sectionRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
    };
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const setRevealRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
      el.setAttribute('data-reveal-id', id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900 logistics-pattern">
      <Navbar />

      {/* Hero carousel */}
      <section ref={heroRef} className="relative min-h-[400px] lg:min-h-[450px] overflow-hidden flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-opacity duration-800 ease-out ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float animation-delay-500" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`carousel-slide ${currentSlide === idx ? 'active' : currentSlide > idx ? 'prev' : ''}`}
            >
              <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-2/3 text-center lg:text-left">
                  <p className="text-sm font-semibold text-blue-600 mb-3 animate-fade-in-up animation-delay-200">
                    Keep your systems. Add intelligence.
                  </p>
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
                      Request Demo <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <Link
                      to="/live-ops"
                      className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-all duration-300 hover:scale-105 btn-ripple"
                    >
                      See Live Ops
                    </Link>
                  </div>
                </div>
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

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 hover:shadow-xl z-20" aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 hover:shadow-xl z-20" aria-label="Next slide">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-blue-600 w-8 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Built for */}
      <section
        ref={setRevealRef('built-for')}
        className={`bg-gradient-to-b from-white to-gray-50 border-y border-gray-100 py-12 transition-all duration-700 ${
          revealedElements.has('built-for') ? 'scroll-reveal revealed' : 'scroll-reveal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Built For</h2>
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Fleets of ~30–200 vehicles across trucking, field service, construction, and delivery
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Truck size={32} />, label: 'Logistics Companies', color: 'from-blue-500 to-blue-600', to: '/built-for/logistics-companies' },
              { icon: <Route size={32} />, label: 'Transporters & Fleet', color: 'from-indigo-500 to-indigo-600', to: '/built-for/transporters-fleet' },
              { icon: <Building2 size={32} />, label: 'Enterprises', color: 'from-teal-500 to-teal-600', to: '/built-for/enterprises' }
            ].map((item, idx) => (
              <Link key={idx} to={item.to} className="flex flex-col items-center text-center group cursor-pointer" style={{ transitionDelay: `${idx * 100}ms` }}>
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

      {/* Four capabilities */}
      <section
        id="features"
        ref={setRevealRef('capabilities')}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${revealedElements.has('capabilities') ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}
      >
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Fleet Intelligence Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Data exists. Intelligence is missing. ShipGen closes the gap: Data → Intelligence → Action.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Order & Shipment Management', desc: 'Create, assign, and track shipments with connected dispatch so every load has context for the fleet.', icon: <Package size={24} />, gradient: 'from-blue-500 to-blue-600', delay: 0, to: '/demo/orders-shipments' },
            { title: 'Fleet & Driver Management', desc: 'Vehicles, drivers, capacity, and readiness in one place—so utilization and downtime stay visible.', icon: <Truck size={24} />, gradient: 'from-indigo-500 to-indigo-600', delay: 100, to: '/demo/fleet-drivers' },
            { title: 'Live GPS Tracking', desc: 'Real-time location with business context: what is moving, what is delayed, and who should act.', icon: <Navigation size={24} />, gradient: 'from-emerald-500 to-emerald-600', delay: 200, to: '/demo/gps-tracking' },
            { title: 'Reports & Analytics', desc: 'Executive dashboards for utilization, cost, and performance—insights that turn into alerts and actions.', icon: <BarChart3 size={24} />, gradient: 'from-teal-500 to-teal-600', delay: 300, to: '/demo/reports' }
          ].map((feature, idx) => (
            <Link
              key={idx}
              to={feature.to}
              className={`block bg-white border border-gray-200 rounded-xl p-6 transition-all duration-500 android-ripple group hover-lift cursor-pointer ${
                revealedElements.has('capabilities') ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'
              }`}
              style={{ transitionDelay: `${feature.delay}ms`, willChange: 'transform, opacity' }}
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
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        ref={setRevealRef('how-it-works')}
        className={`bg-gradient-to-b from-gray-50 to-white border-y border-gray-100 py-20 ${revealedElements.has('how-it-works') ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Measure → Identify → Act → Improve across your fleet operations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Connect Fleet Data', desc: 'Pull signals from GPS, ELD, and TMS. Keep your systems—ShipGen adds the intelligence layer.', icon: <Layers size={20} />, gradient: 'from-blue-500 to-blue-600', direction: 'left' },
              { step: '02', title: 'Measure & Identify', desc: 'Surface utilization gaps, idle time, delays, and cost drivers with clear operational KPIs.', icon: <Gauge size={20} />, gradient: 'from-indigo-500 to-indigo-600', direction: 'right' },
              { step: '03', title: 'Alert & Act', desc: 'Turn insights into alerts and recommended actions so dispatch and ops respond in time.', icon: <Bell size={20} />, gradient: 'from-emerald-500 to-emerald-600', direction: 'left' },
              { step: '04', title: 'Improve Continuously', desc: 'Track ROI on the executive dashboard and refine routes, assignments, and fleet mix over time.', icon: <Target size={20} />, gradient: 'from-teal-500 to-teal-600', direction: 'right' }
            ].map((item, idx) => (
              <Link
                key={idx}
                to="/how-it-works"
                state={{ scrollTo: `step-${item.step}` }}
                className={`relative block ${
                  revealedElements.has('how-it-works')
                    ? item.direction === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 150}ms`, willChange: 'transform, opacity' }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-500 ease-out android-ripple hover-lift cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md transition-all duration-500 ease-out hover:scale-110 hover:rotate-6 animate-pulse-glow`}>
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

      {/* Live ops teaser */}
      <section
        id="live-ops"
        ref={setRevealRef('live-ops')}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${revealedElements.has('live-ops') ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}
      >
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-2xl p-8 lg:p-12 shadow-xl hover-lift relative overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 opacity-10">
            <Route className="absolute top-10 left-10 w-24 h-24 text-emerald-400 animate-float" />
            <Activity className="absolute bottom-10 right-10 w-32 h-32 text-teal-400 animate-float animation-delay-500" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className={revealedElements.has('live-ops') ? 'animate-slide-in-left' : 'opacity-0'} style={{ willChange: 'transform, opacity' }}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-300">
                <Activity size={14} className="text-emerald-600 animate-pulse" />
                <span>Insights · Alerts · Actions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Live Fleet Operations</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                See vehicles, shipments, and exceptions in one live view—GPS with the business context your ops team needs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time vehicle and driver status',
                  'Shipment context on every map pin',
                  'Exception alerts when delays risk SLA',
                  'Live metrics for utilization and idle time'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 animate-fade-in-up" style={{ animationDelay: `${idx * 120}ms`, animationFillMode: 'both' }}>
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
                View Live Operations <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div
              className={`bg-white rounded-xl border-2 border-emerald-200 p-6 shadow-2xl hover-lift transition-all duration-500 ease-out ${
                revealedElements.has('live-ops') ? 'animate-slide-in-right' : 'opacity-0'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mb-4 border border-emerald-200 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
                <div className="text-center relative z-10">
                  <Navigation size={48} className="text-emerald-600 mx-auto mb-2 animate-float" />
                  <p className="text-sm font-semibold text-gray-700">Live Fleet Map</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'GPS', label: 'Tracking' },
                  { value: 'Live', label: 'Alerts' },
                  { value: 'ROI', label: 'Focused' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200 hover-lift transition-all duration-300">
                    <p className="text-2xl font-bold text-emerald-700 counter-animate">{stat.value}</p>
                    <p className="text-xs text-emerald-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ShipGen */}
      <section
        id="why-choose"
        ref={setRevealRef('why-choose')}
        className={`bg-white border-y border-gray-100 py-20 ${revealedElements.has('why-choose') ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why ShipGen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The intelligence layer that turns fleet data into decisions, action, and ROI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Intelligence Layer, Not Another System', desc: 'Keep GPS, ELD, and TMS. ShipGen sits above them and connects data into Insights, Alerts, and Actions.', icon: <Layers size={20} />, gradient: 'from-indigo-500 to-indigo-600', bg: 'from-indigo-50 to-indigo-100', to: '/demo/reports' },
              { title: 'Utilization, Downtime & Cost', desc: 'See where assets sit idle, where costs climb, and where capacity is underused—then act on it.', icon: <Gauge size={20} />, gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-100', to: '/demo/fleet-drivers' },
              { title: 'Executive Dashboard', desc: 'One view for leaders: performance trends, exception risk, and ROI signals across the fleet.', icon: <MapPin size={20} />, gradient: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-50 to-emerald-100', to: '/demo/reports' }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className={`block flex items-start space-x-4 p-6 bg-gradient-to-br ${item.bg} border border-gray-200 rounded-xl hover-lift transition-all duration-500 ease-out cursor-pointer ${
                  revealedElements.has('why-choose') ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'
                }`}
                style={{ transitionDelay: `${idx * 120}ms`, willChange: 'transform, opacity' }}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 transition-all duration-500 ease-out hover:scale-110 hover:rotate-6 animate-package-bounce`}
                  style={{ animationDelay: `${idx * 200}ms` }}
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

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 py-16 relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to add intelligence to your fleet?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Turn fleet data into decisions, action, and ROI. Request a personalized demo of ShipGen Fleet Intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 btn-ripple animate-gradient"
            >
              Request Demo <ArrowRight size={18} className="ml-2" />
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

      <Footer />
    </div>
  );
};

export default Landing;
