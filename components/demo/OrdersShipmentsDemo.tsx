import React, { useEffect, useRef, useState } from 'react';
import { Package, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const mockOrders = [
  { id: 'ORD-1001', customer: 'Acme Corp', status: 'IN TRANSIT' },
  { id: 'ORD-1002', customer: 'Globex Ltd', status: 'DELIVERED' },
  { id: 'ORD-1003', customer: 'Innova Logistics', status: 'CREATED' }
];

const OrdersShipmentsDemo: React.FC = () => {
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
        {/* Overview */}
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <Package size={14} className="mr-2" />
              Orders &amp; Shipments Module
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Centralized control for orders and last-mile shipments
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Capture customer orders, convert them into optimized shipments, assign vehicles and
              drivers, and get full visibility from pickup to proof-of-delivery.
            </p>
          </div>
          <div 
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Where it fits in your flow
            </h2>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Sales team or customer creates an order.</li>
              <li>2. Planner groups orders into one or more shipments.</li>
              <li>3. Vehicle &amp; driver are assigned with capacity checks.</li>
              <li>4. Shipment is tracked through to delivery and POD.</li>
            </ol>
          </div>
        </section>

        {/* Key features */}
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
            Key capabilities inside Orders &amp; Shipments
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Unified order registry',
                desc: 'Single list of all open, in-progress, and completed orders with SLA and customer visibility.'
              },
              {
                title: 'Shipment planning',
                desc: 'Group orders by route, geography, and vehicle capacity to reduce empty miles.'
              },
              {
                title: 'Live status &amp; alerts',
                desc: 'Real-time status from CREATED → ASSIGNED → IN_TRANSIT → DELIVERED with exception alerts.'
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
                <p className="text-sm font-semibold text-slate-900 mb-1 transition-colors duration-300 hover:text-blue-600">
                  {feature.title}
                </p>
                <p className="text-xs text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample / mock data */}
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
            <h2 className="text-sm font-semibold text-slate-900">
              Sample orders &amp; shipments (mock data)
            </h2>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Frontend-only demo · No live APIs
            </span>
          </div>
          <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-500 ${
            revealedSections.has('sample') ? 'animate-scale-in-fade' : 'opacity-0'
          }`}>
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((o, idx) => (
                  <tr 
                    key={o.id} 
                    className={`border-t border-slate-100 transition-all duration-300 hover:bg-blue-50 ${
                      revealedSections.has('sample') ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-slate-900">{o.id}</td>
                    <td className="px-4 py-2 text-xs text-slate-700">{o.customer}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 transition-all duration-300 hover:scale-105">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('cta', el);
              el.setAttribute('data-section-id', 'cta');
            }
          }}
          className={`bg-blue-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">See this module with real data</p>
            <p className="text-xs text-blue-100 max-w-md">
              Connect to your tenant to work with real orders, shipments, vehicles, and drivers.
              You’ll be redirected to the live Orders &amp; Shipments workspace.
            </p>
          </div>
          <button
            onClick={handleCTA}
            className="inline-flex items-center justify-center rounded-xl bg-white text-blue-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-blue-50 transition-all duration-300 hover:scale-105 btn-ripple group"
          >
            View Live / Try Demo
            <Truck size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersShipmentsDemo;

