import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useDemoCTA } from '../../useDemoCTA';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MultiTenantDemo: React.FC = () => {
  const handleCTA = useDemoCTA('/dashboard');
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

  const features = [
    { title: 'Complete data isolation per company', desc: 'Each tenant operates in its own secure environment.' },
    { title: 'Scalable multi-tenant infrastructure', desc: 'Built for growth with proven architecture.' },
    { title: 'Role-based access control (7 role types)', desc: 'Fine-grained permissions per user.' },
    { title: 'Secure API endpoints with tenant validation', desc: 'Every request validated against tenant.' },
    { title: 'Independent billing and subscriptions', desc: 'Per-tenant billing with flexible plans.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section ref={(el) => { if (el) { sectionRefs.current.set('overview', el); el.setAttribute('data-section-id', 'overview'); } }} className="grid gap-8 md:grid-cols-[1.6fr,1fr] items-start">
          <div className={revealedSections.has('overview') ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
              <ShieldCheck size={14} className="mr-2" /> Multi-Tenant SaaS Architecture
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete tenant isolation with enterprise-grade security</h1>
            <p className="text-slate-600 text-sm md:text-base max-w-xl">Each company operates in its own secure environment with no data leakage between tenants.</p>
          </div>
          <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover-lift ${revealedSections.has('overview') ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Key benefits</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-indigo-600">•</span><span>{f.title}</span></li>
              ))}
            </ul>
          </div>
        </section>
        <section ref={(el) => { if (el) { sectionRefs.current.set('features', el); el.setAttribute('data-section-id', 'features'); } }}>
          <h2 className={`text-lg font-semibold text-slate-900 mb-4 ${revealedSections.has('features') ? 'animate-fade-in-up' : 'opacity-0'}`}>Architecture highlights</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, idx) => (
              <div key={idx} className={`bg-white border border-slate-200 rounded-xl p-4 hover-lift ${revealedSections.has('features') ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                <p className="text-sm font-semibold text-slate-900 mb-1">{f.title}</p>
                <p className="text-xs text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section ref={(el) => { if (el) { sectionRefs.current.set('cta', el); el.setAttribute('data-section-id', 'cta'); } }} className={`bg-indigo-600 text-white rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div>
            <p className="text-sm font-semibold mb-1">Experience multi-tenant isolation</p>
            <p className="text-xs text-indigo-100 max-w-md">Sign in to access your own tenant with isolated data.</p>
          </div>
          <button onClick={handleCTA} className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-700 text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-indigo-50 hover:scale-105 btn-ripple group">
            View Live / Try Demo <ArrowRight size={14} className="ml-2" />
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MultiTenantDemo;
