import React, { useEffect, useRef, useState } from 'react';
import {
  CircleParking,
  ArrowRight,
  LayoutDashboard,
  Ticket,
  Layers,
  IndianRupee,
  ClipboardList,
  Eye,
  BarChart3,
  Cpu,
  ScanLine,
  ShieldCheck,
  Plug,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../hooks/useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { PARKING_MODULES } from '../parking/parkingModules';

const MODULE_ICONS: Record<string, React.ElementType> = {
  'facility-dashboard': LayoutDashboard,
  'ticket-lifecycle': Ticket,
  'floor-occupancy': Layers,
  'pricing-engine': IndianRupee,
  'operator-workflows': ClipboardList,
  'supervisor-oversight': Eye,
  'reports-analytics': BarChart3,
  'hardware-monitoring': Cpu,
  'ocr-plates': ScanLine,
  'admin-audit': ShieldCheck,
  'shipgen-integration': Plug,
};

const ParkingManagementDemo: React.FC = () => {
  const handleCTA = useDemoCTA();
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
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

  const facilityDashboard = PARKING_MODULES[0];

  const scrollToModule = (moduleId: string) => {
    document.getElementById(moduleId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <CircleParking size={14} className="mr-2" />
              Parking Management System (PMS) · ParkFlow
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Multi-floor parking from entry ticket to exit
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Digital tickets, QR codes, live occupancy by floor and vehicle category, supervisor
              oversight, revenue reporting, and hardware monitoring — for admin, supervisor, and
              operator roles in one Security Systems platform.
            </p>
          </div>
          <div
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">How it fits in your flow</h2>
            <ol className="space-y-2 text-sm text-slate-700">
              {facilityDashboard.flow?.map((step, idx) => (
                <li key={idx}>
                  {idx + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('nav', el);
              el.setAttribute('data-section-id', 'nav');
            }
          }}
          className={revealedSections.has('nav') ? 'animate-fade-in-up' : 'opacity-0'}
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Parking modules</h2>
          <div className="flex flex-wrap gap-2">
            {PARKING_MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => scrollToModule(mod.id)}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-colors"
              >
                {mod.badge}
              </button>
            ))}
          </div>
        </section>

        {PARKING_MODULES.map((mod, modIdx) => {
          const Icon = MODULE_ICONS[mod.id] ?? CircleParking;
          return (
            <section
              key={mod.id}
              id={mod.id}
              ref={(el) => {
                if (el) {
                  sectionRefs.current.set(mod.id, el);
                  el.setAttribute('data-section-id', mod.id);
                }
              }}
              className={`scroll-mt-24 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-500 ${
                revealedSections.has(mod.id) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${modIdx * 40}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-sky-600 mb-1">
                    {mod.badge}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">{mod.heading}</h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 max-w-3xl">{mod.description}</p>

              <div className={`grid gap-6 ${mod.flow ? 'md:grid-cols-2' : ''}`}>
                {mod.flow && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">
                      {mod.id === 'facility-dashboard' ? 'How it fits in your flow' : 'Flow'}
                    </h3>
                    <ol className="space-y-2">
                      {mod.flow.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Key capabilities</h3>
                  <ul className="space-y-2">
                    {mod.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sky-500 flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {mod.sampleData && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-900">Sample data</h3>
                    <span className="text-[11px] uppercase tracking-wide text-slate-500">
                      Demo only · no live DB
                    </span>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                          <th className="px-4 py-2">Ticket / Bucket</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Floor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mod.sampleData.map((row) => (
                          <tr key={row.ticket} className="border-t border-slate-100 hover:bg-sky-50/50">
                            <td className="px-4 py-2 font-mono text-xs text-slate-900">{row.ticket}</td>
                            <td className="px-4 py-2 text-xs text-slate-700">{row.status}</td>
                            <td className="px-4 py-2 text-xs text-slate-700">{row.floor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          );
        })}

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('cta', el);
              el.setAttribute('data-section-id', 'cta');
            }
          }}
          className={`bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">Ready to modernize your parking facility?</p>
            <p className="text-xs text-sky-100 max-w-md">
              See how ShipGen ParkFlow connects ticketing, occupancy, payments, and supervisor
              monitoring in one platform — embedded in Shipgen or deployed standalone.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white text-sky-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-sky-50 transition-all duration-300 hover:scale-105"
            >
              Request Demo
            </Link>
            <button
              onClick={handleCTA}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 text-white text-sm font-semibold px-5 py-2.5 hover:border-white/70 transition-all duration-300 hover:scale-105"
            >
              Explore Platform
              <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ParkingManagementDemo;
