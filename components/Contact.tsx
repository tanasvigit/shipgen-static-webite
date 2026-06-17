import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, MessageSquare, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

const Contact: React.FC = () => {
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    requestAnimationFrame(scrollToTop);
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
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => sectionRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sales@shipgen.net',
      href: 'mailto:sales@shipgen.net',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 96426 12839',
      href: 'tel:+919642612839',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'Sunrise StartUp Towers, Madhurawada, IT SEZ, Hill No:3, Visakhapatnam-48, Andhra Pradesh, India',
      href: 'https://maps.google.com',
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white text-gray-900">
      <Navbar />

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Header */}
        <div
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('header', el);
              el.setAttribute('data-section-id', 'header');
            }
          }}
          className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 rounded-md border border-blue-100/50 p-3 md:p-4 transition-all duration-500 hover:border-blue-200/80 hover:shadow-xl ${
            revealedSections.has('header') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
             Have questions? Send us a message and our team will respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Contact Info Cards + Form */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current.set('contact', el);
              el.setAttribute('data-section-id', 'contact');
            }
          }}
          className={`grid lg:grid-cols-3 gap-8 ${revealedSections.has('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200/80 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
                  <p className="text-sm text-gray-600">Fill out the form below and we&apos;ll get back to you soon.</p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setError(null); }}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your logistics needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
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
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white ${
            revealedSections.has('cta') ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-2xl font-bold mb-3">Prefer to Get Started Right Away?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Explore our platform with a hands-on demo. No sign-up required to see ShipGen in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/demo/orders-shipments"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 font-semibold"
            >
              View Demo
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border-2 border-white/40 text-white rounded-lg hover:border-white/80 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
