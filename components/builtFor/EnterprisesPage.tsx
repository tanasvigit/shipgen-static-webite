import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EnterprisesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    'Enterprise-scale multi-tenant SaaS architecture',
    'Role-based access control for teams and departments',
    'Complete audit logging for compliance and governance',
    'GST-ready billing and financial reporting',
    'Secure, scalable infrastructure',
    'Integration-ready APIs for ERP and legacy systems'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/30 to-white text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero with Image */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl mb-12">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Enterprise business operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/90 text-white text-sm font-semibold mb-4">
                <Globe size={16} className="mr-2" />
                Built For
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Enterprises</h1>
              <p className="text-lg md:text-xl text-teal-100 max-w-2xl">
                Enterprise-grade logistics platform with multi-tenant architecture, RBAC, and full audit compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why ShipGen for Enterprises</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ShipGen is built for enterprise requirements: multi-tenant isolation, granular role-based access, 
              complete audit trails, and GST-compliant billing. Scale across business units while maintaining security and compliance.
            </p>
            <ul className="space-y-3">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Capabilities</h3>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: 'Multi-Tenant & RBAC', desc: 'Secure, role-based access' },
                { icon: BarChart3, title: 'Reports & Analytics', desc: 'Financial and operational insights' },
                { icon: Globe, title: 'Audit-Ready', desc: 'Complete compliance logging' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready for Enterprise-Grade Logistics?</h2>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Join enterprises using ShipGen for scalable, secure, and compliant logistics operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/demo/multi-tenant"
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 btn-ripple font-semibold"
            >
              View Multi-Tenant Demo <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnterprisesPage;
