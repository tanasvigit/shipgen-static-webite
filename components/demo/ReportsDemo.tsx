import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const mockKpis = [
  { label: 'Monthly Revenue', value: '₹ 24,35,000' },
  { label: 'Outstanding Invoices', value: '₹ 3,10,000' },
  { label: 'On-Time Deliveries', value: '96.2%' }
];

const ReportsDemo: React.FC = () => {
  const handleCTA = useDemoCTA('/app/analytics/revenue');
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-4 transition-all duration-500 hover:scale-105">
              <BarChart3 size={14} className="mr-2" />
              Reports &amp; Analytics
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-500">
              Turn operations data into actionable insights
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl transition-all duration-500">
              Track revenue, utilization, exceptions, and receivables to keep a tight control on
              your logistics P&amp;L.
            </p>
          </div>
          <div 
            className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift transition-all duration-500 ${
              revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Example analytics flow</h2>
            <ol className="space-y-2 text-sm text-slate-700">
              <li>1. Orders, shipments, invoices, and payments generate event logs.</li>
              <li>2. Data is aggregated into revenue and performance metrics.</li>
              <li>3. Dashboards highlight trends and exceptions.</li>
              <li>4. Finance and ops teams act on the same numbers.</li>
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
            Types of reports available
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Revenue reports',
                desc: 'Analyze revenue by time period, customer, and lane.'
              },
              {
                title: 'Outstanding invoices',
                desc: 'See who owes you how much, and for how long.'
              },
              {
                title: 'Operational KPIs',
                desc: 'On-time delivery, average transit times, and exception rates.'
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
                <p className="text-sm font-semibold text-slate-900 mb-1 transition-colors duration-300 hover:text-sky-700">
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
            <h2 className="text-sm font-semibold text-slate-900">Sample KPIs (mock)</h2>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              Static numbers
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mockKpis.map((kpi, idx) => (
              <div
                key={kpi.label}
                className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col space-y-1 hover-lift transition-all duration-500 ${
                  revealedSections.has('sample')
                    ? 'scroll-reveal-scale revealed'
                    : 'scroll-reveal-scale'
                }`}
                style={{ 
                  transitionDelay: `${idx * 120}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                <p className="text-xs text-slate-500 uppercase">{kpi.label}</p>
                <p className="text-lg font-semibold text-slate-900">{kpi.value}</p>
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
          className={`bg-sky-700 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-all duration-500 ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold mb-1">See real analytics from your tenant</p>
            <p className="text-xs text-sky-100 max-w-md">
              In the live app, all charts and tables are powered by your actual orders, shipments,
              invoices, and payments.
            </p>
          </div>
          <button
            onClick={handleCTA}
            className="inline-flex items-center justify-center rounded-xl bg-white text-sky-800 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-sky-50 transition-all duration-300 hover:scale-105 btn-ripple group"
          >
            View Live / Try Demo
            <Activity size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsDemo;
