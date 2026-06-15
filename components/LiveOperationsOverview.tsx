import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation, Activity, Route, BarChart3, CheckCircle2,
  ArrowRight, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const LiveOperationsOverview: React.FC = () => {
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
              setTimeout(() => setRevealedSections((prev) => new Set(prev).add(id)), 50);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => sectionRefs.current.forEach((el) => { if (el) observer.unobserve(el); });
  }, []);

  const sections = [
    {
      id: 'vehicle-tracking',
      num: '01',
      title: 'Real-Time Vehicle Tracking',
      description: 'Track every vehicle in your fleet with GPS-enabled location updates. Monitor speed, heading, and status in real time on an interactive map.',
      features: ['Live GPS coordinates for all vehicles', 'Speed and heading data', 'Auto-refresh every few seconds', 'Filter by status (In Use, Available)'],
      link: '/live-operations/vehicle-tracking',
      linkText: 'View Vehicle Tracking',
      icon: Navigation,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'shipment-status',
      num: '02',
      title: 'Live Shipment Status',
      description: 'Follow shipments from pickup to delivery with a timeline of status changes and GPS coordinates at each event. Proof-of-delivery with location capture.',
      features: ['Status timeline with timestamps', 'GPS coordinates at each update', 'Last known location', 'Driver and vehicle association'],
      link: '/live-operations/shipment-status',
      linkText: 'View Shipment Status',
      icon: Activity,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'websocket-updates',
      num: '03',
      title: 'WebSocket Updates',
      description: 'Instant real-time notifications powered by WebSocket technology. No page refresh needed—see vehicle and shipment updates as they happen.',
      features: ['Instant push notifications', 'Vehicle location updates', 'Shipment status changes', 'Connection status indicator'],
      link: '/live-operations/websocket-updates',
      linkText: 'View WebSocket Updates',
      icon: Route,
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'operational-dashboard',
      num: '04',
      title: 'Operational Dashboard',
      description: 'Live metrics and KPIs for your logistics operations. Monitor active shipments, vehicle utilization, and delivery performance at a glance.',
      features: ['Active shipments count', 'Vehicle utilization metrics', 'Delivery performance KPIs', 'Real-time alerts'],
      link: '/live-operations/dashboard',
      linkText: 'View Operational Dashboard',
      icon: BarChart3,
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-emerald-50/30 to-white text-gray-900">
      <Navbar />

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div
          ref={(el) => { if (el) { sectionRefs.current.set('header', el); el.setAttribute('data-section-id', 'header'); } }}
          className={`relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50 rounded-md border border-emerald-100/50 p-3 md:p-4 transition-all duration-500 hover:border-emerald-200/80 hover:shadow-xl ${revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Real-Time Operations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Live Operations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Monitor your entire logistics network in real time
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              GPS-enabled vehicle tracking, live shipment status, WebSocket updates, and operational dashboards—all in one place.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                ref={(el) => { if (el) { sectionRefs.current.set(section.id, el); el.setAttribute('data-section-id', section.id); } }}
                className={`bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition flex flex-col lg:flex-row items-center gap-8 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} ${revealedSections.has(section.id) ? 'animate-fade-in-up' : 'opacity-0'}`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-3`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold text-gray-300">{section.num}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {section.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2">
                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={section.link}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 btn-ripple font-medium group"
                  >
                    <span>{section.linkText}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to See It Live?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Access the full Live Operations dashboard and monitor your fleet and shipments in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/live-operations"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold"
            >
              Open Live Operations <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 font-semibold"
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

export default LiveOperationsOverview;
