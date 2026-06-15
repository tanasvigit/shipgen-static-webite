import React, { useEffect, useRef, useState } from 'react';
import { Warehouse, Boxes, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const mockBins = [
  { code: 'A1-01', zone: 'Zone A - General', sku: 'SKU-MOB-001', qty: 120 },
  { code: 'A1-02', zone: 'Zone A - General', sku: 'SKU-LAP-022', qty: 40 },
  { code: 'B1-01', zone: 'Zone B - Cold', sku: 'SKU-CAB-005', qty: 300 }
];

const WarehouseDemo: React.FC = () => {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <Warehouse size={14} className="mr-2" />
              Warehouse Management (WMS)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Bin-level warehouse visibility and control
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Model your physical warehouse as zones, racks, and bins. Track every SKU and quantity
              movement with full traceability from GRN to dispatch.
            </p>
          </div>
          <div 
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Inbound to outbound flow</h2>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Receive GRN at dock and register inbound.</li>
              <li>2. Put-away into optimal zone / rack / bin.</li>
              <li>3. Pick for orders based on allocation rules.</li>
              <li>4. Dispatch against shipments and update inventory.</li>
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
            Inside the WMS module
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Zone–Rack–Bin hierarchy',
                desc: 'Configure temperature zones, racks, and bins that match your physical layout.'
              },
              {
                title: 'Real-time stock',
                desc: 'Always know how much stock is available per bin and SKU with movement history.'
              },
              {
                title: 'GRN &amp; cycle counts',
                desc: 'Capture GRNs and run cycle counts without stopping operations.'
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
                <p className="text-sm font-semibold text-slate-900 mb-1 transition-colors duration-300 hover:text-purple-600">
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
            <h2 className="text-sm font-semibold text-slate-900">Mock bin snapshot</h2>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Demo only · no live DB
            </span>
          </div>
          <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-500 ${
            revealedSections.has('sample') ? 'animate-scale-in-fade' : 'opacity-0'
          }`}>
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">Bin</th>
                  <th className="px-4 py-2">Zone</th>
                  <th className="px-4 py-2">SKU</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {mockBins.map((b, idx) => (
                  <tr 
                    key={b.code} 
                    className={`border-t border-slate-100 transition-all duration-300 hover:bg-purple-50 ${
                      revealedSections.has('sample') ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-slate-900">{b.code}</td>
                    <td className="px-4 py-2 text-xs text-slate-700">{b.zone}</td>
                    <td className="px-4 py-2 text-xs text-slate-700">{b.sku}</td>
                    <td className="px-4 py-2 text-xs text-slate-900 text-right">{b.qty}</td>
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
          className={`bg-purple-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">Jump into live warehouse inventory</p>
            <p className="text-xs text-purple-100 max-w-md">
              Sign in to navigate real warehouses, zones, racks, and bins from your tenant.
            </p>
          </div>
          <button
            onClick={handleCTA}
            className="inline-flex items-center justify-center rounded-xl bg-white text-purple-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-purple-50 transition-all duration-300 hover:scale-105 btn-ripple group"
          >
            View Live / Try Demo
            <Boxes size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WarehouseDemo;
