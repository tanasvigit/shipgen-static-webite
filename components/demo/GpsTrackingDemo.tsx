import React, { useEffect, useRef, useState } from 'react';
import { Navigation, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const mockTrack = [
  { vehicle: 'MH-01-AB-1234', city: 'Mumbai', eta: '25 mins' },
  { vehicle: 'MH-01-CD-5678', city: 'Pune', eta: '1 hr 10 mins' }
];

const GpsTrackingDemo: React.FC = () => {
  const handleCTA = useDemoCTA();
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section 
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('overview', el);
              el.setAttribute('data-section-id', 'overview');
            }
          }}
          className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start"
        >
          <div className={revealedSections.has('overview') ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <Navigation size={14} className="mr-2" />
              Live GPS Tracking
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Real-time visibility of every vehicle and shipment
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Monitor your fleet on a live map, see last-known locations, and anticipate delays
              before they impact customers.
            </p>
          </div>
          <div 
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Example signal flow
            </h2>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. IoT device sends GPS ping to backend API.</li>
              <li>2. Backend stores telemetry and emits WebSocket event.</li>
              <li>3. Browser listens via Socket.IO and updates the live map.</li>
              <li>4. Dashboard shows ETA, delays, and route deviations.</li>
            </ol>
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('features', el);
              el.setAttribute('data-section-id', 'features');
            }
          }}
        >
          <h2 className={`text-lg font-semibold text-slate-900 mb-4 transition-all duration-500 ${
            revealedSections.has('features') ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            What this module offers
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Live map view',
                desc: 'Plot vehicles and shipments with last-known GPS points and timestamps.'
              },
              {
                title: 'Telematics stream',
                desc: 'Ingest speed, fuel level, and sensor data for operations control.'
              },
              {
                title: 'Alerts &amp; ETA',
                desc: 'Detect long stops, route deviations, and provide customer ETAs.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200 rounded-xl p-4 hover-lift transition-all duration-500 ${
                  revealedSections.has('features')
                    ? 'scroll-reveal-scale revealed'
                    : 'scroll-reveal-scale'
                }`}
                style={{ 
                  transitionDelay: `${idx * 120}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <p className="text-sm font-semibold text-slate-900 mb-1 transition-colors duration-300 hover:text-cyan-600">
                  {feature.title}
                </p>
                <p className="text-xs text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('sample', el);
              el.setAttribute('data-section-id', 'sample');
            }
          }}
        >
          <div className={`flex items-center justify-between mb-3 transition-all duration-500 ${
            revealedSections.has('sample') ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h2 className="text-sm font-semibold text-slate-900">Sample tracking feed</h2>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Mock entries only
            </span>
          </div>
          <div className={`bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 transition-all duration-500 ${
            revealedSections.has('sample') ? 'animate-scale-in-fade' : 'opacity-0'
          }`}>
            {mockTrack.map((t, idx) => (
              <div 
                key={t.vehicle} 
                className={`flex items-center justify-between px-4 py-3 transition-all duration-300 hover:bg-cyan-50 ${
                  revealedSections.has('sample') ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 transition-all duration-300 hover:scale-110">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-900">{t.vehicle}</p>
                    <p className="text-xs text-slate-600">Last seen near {t.city}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-700">ETA: {t.eta}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('cta', el);
              el.setAttribute('data-section-id', 'cta');
            }
          }}
          className={`bg-cyan-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">Open the real live-operations workspace</p>
            <p className="text-xs text-cyan-100 max-w-md">
              In the live app you&apos;ll see WebSocket-driven updates for your own tenant&apos;s
              vehicles and shipments.
            </p>
          </div>
          <button
            onClick={handleCTA}
            className="inline-flex items-center justify-center rounded-xl bg-white text-cyan-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-cyan-50 transition-all duration-300 hover:scale-105 btn-ripple group"
          >
            View Live / Try Demo
            <Navigation size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GpsTrackingDemo;
