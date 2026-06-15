import React, { useEffect, useRef, useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const RoleBasedAccessDemo: React.FC = () => {
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
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => {
      sectionRefs.current.forEach((el) => { if (el) observer.unobserve(el); });
    };
  }, []);

  const roles = [
    {
      title: 'Company Admin',
      desc: 'Full platform control and configuration',
      info: 'Manage users, tenants, system settings, and company-wide configuration. Create and assign roles, set up warehouses and fleet.'
    },
    {
      title: 'Operations Manager',
      desc: 'Shipment management and dispatching',
      info: 'Create and manage shipments, assign vehicles and drivers, monitor delivery status. Oversee operations dashboards and resolve escalations.'
    },
    {
      title: 'Warehouse Manager',
      desc: 'Inventory operations and GRN',
      info: 'Process goods receipt (GRN), handle put-away, pick, and dispatch. Manage stock levels, bins, and warehouse workflows.'
    },
    {
      title: 'Finance Team',
      desc: 'Billing, payments, and reporting',
      info: 'Generate GST-compliant invoices, record payments, and access financial reports. Export data for accounting and audits.'
    },
    {
      title: 'Driver',
      desc: 'Shipment updates and own tracking',
      info: 'View assigned shipments, update delivery status, and share GPS coordinates. Track vehicle location and mark deliveries complete.'
    },
    {
      title: 'Customer',
      desc: 'Shipment tracking only',
      info: 'Track shipment status, view delivery timeline, and access shipment details. Read-only access to own shipments.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section ref={(el) => { if (el) { sectionRefs.current.set('overview', el); el.setAttribute('data-section-id', 'overview'); } }} className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start">
          <div className={revealedSections.has('overview') ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
              <Lock size={14} className="mr-2" /> Role-Based Access Control
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Seven role types with granular permissions</h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl">Control who can access and modify what data. Seven role types with granular permissions per section.</p>
          </div>
          <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift ${revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Access levels</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Full – create, edit, delete</li>
              <li>• Read-only – view only</li>
              <li>• Limited – restricted by context</li>
            </ul>
          </div>
        </section>
        <section ref={(el) => { if (el) { sectionRefs.current.set('roles', el); el.setAttribute('data-section-id', 'roles'); } }}>
          <h2 className={`text-lg font-semibold text-slate-900 mb-4 ${revealedSections.has('roles') ? 'animate-fade-in-up' : 'opacity-0'}`}>Roles we support</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, idx) => (
              <div key={idx} className={`bg-white border border-slate-200 rounded-xl p-4 hover-lift ${revealedSections.has('roles') ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                <p className="text-sm font-semibold text-slate-900 mb-1">{r.title}</p>
                <p className="text-xs text-slate-500 mb-2">{r.desc}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{r.info}</p>
              </div>
            ))}
          </div>
        </section>
        <section ref={(el) => { if (el) { sectionRefs.current.set('cta', el); el.setAttribute('data-section-id', 'cta'); } }} className={`bg-blue-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div>
            <p className="text-sm font-semibold mb-1">See RBAC in action</p>
            <p className="text-xs text-blue-100 max-w-md">Sign in to experience role-based views and permissions.</p>
          </div>
          <button onClick={handleCTA} className="inline-flex items-center justify-center rounded-xl bg-white text-blue-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-blue-50 hover:scale-105 btn-ripple group">
            View Live / Try Demo <ArrowRight size={14} className="ml-2" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RoleBasedAccessDemo;
