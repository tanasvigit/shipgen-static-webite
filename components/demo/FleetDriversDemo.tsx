import React, { useEffect, useRef, useState } from 'react';
import { Truck, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const mockFleet = [
  { plate: 'MH-01-AB-1234', capacity: '18 MT', status: 'ACTIVE' },
  { plate: 'MH-01-CD-5678', capacity: '9 MT', status: 'IN TRANSIT' }
];

const FleetDriversDemo: React.FC = () => {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <Truck size={14} className="mr-2" />
              Fleet &amp; Driver Management
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Keep every vehicle and driver on the same map
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Maintain a single source of truth for fleet capacity, compliance, and utilization.
              Assign drivers to shipments and monitor on-road execution.
            </p>
          </div>
          <div 
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Typical flow</h2>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Register vehicles with capacity and attributes.</li>
              <li>2. Onboard drivers with license and contact details.</li>
              <li>3. Assign vehicle + driver to shipments.</li>
              <li>4. Monitor utilization, availability, and status.</li>
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
            What you get in the Fleet module
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Fleet registry',
                desc: 'Maintain plate numbers, capacity, type, and assignment history.'
              },
              {
                title: 'Driver records',
                desc: 'Track licenses, contact numbers, and their active/inactive status.'
              },
              {
                title: 'Availability view',
                desc: 'See which vehicles and drivers are free, on trip, or under maintenance.'
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
                <p className="text-sm font-semibold text-slate-900 mb-1 transition-colors duration-300 hover:text-emerald-600">
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
            <h2 className="text-sm font-semibold text-slate-900">Sample fleet snapshot</h2>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Static mock data
            </span>
          </div>
          <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-500 ${
            revealedSections.has('sample') ? 'animate-scale-in-fade' : 'opacity-0'
          }`}>
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">Vehicle</th>
                  <th className="px-4 py-2">Capacity</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockFleet.map((v, idx) => (
                  <tr 
                    key={v.plate} 
                    className={`border-t border-slate-100 transition-all duration-300 hover:bg-emerald-50 ${
                      revealedSections.has('sample') ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-slate-900">{v.plate}</td>
                    <td className="px-4 py-2 text-xs text-slate-700">{v.capacity}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 transition-all duration-300 hover:scale-105">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('cta', el);
              el.setAttribute('data-section-id', 'cta');
            }
          }}
          className={`bg-emerald-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">Inspect your live fleet &amp; drivers</p>
            <p className="text-xs text-emerald-100 max-w-md">
              Once signed in, you&apos;ll see your own vehicles, drivers, and active assignments.
            </p>
          </div>
          <button
            onClick={handleCTA}
            className="inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-emerald-50 transition-all duration-300 hover:scale-105 btn-ripple group"
          >
            View Live / Try Demo
            <User size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FleetDriversDemo;
