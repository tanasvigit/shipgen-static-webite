import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, ArrowRight, Navigation, BarChart3, Activity, Route,
  ShieldCheck, Lock, Database, MapPin, DollarSign, Warehouse
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Sticky navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setActiveDropdown(null);
      dropdownTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      dropdownTimeoutRef.current.clear();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      dropdownTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      dropdownTimeoutRef.current.clear();
    };
  }, []);

  const handleDropdownEnter = (dropdownId: string) => {
    const existingTimeout = dropdownTimeoutRef.current.get(dropdownId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      dropdownTimeoutRef.current.delete(dropdownId);
    }
    setActiveDropdown(dropdownId);
  };

  const handleDropdownLeave = (dropdownId: string) => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      dropdownTimeoutRef.current.delete(dropdownId);
    }, 300);
    dropdownTimeoutRef.current.set(dropdownId, timeout);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'navbar-scrolled shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center animate-fade-in">
            <img src="/logo_logistic.png" alt="ShipGen" className="h-14 w-auto" />
          </Link>

          {/* Navigation Links with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('features')}
              onMouseLeave={() => handleDropdownLeave('features')}
            >
              <button
                type="button"
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center cursor-pointer bg-transparent border-none"
                onClick={() => {
                  setActiveDropdown(null);
                  if (location.pathname === '/features') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/features');
                  }
                }}
              >
                Features
                <ArrowRight size={14} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-90' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              {activeDropdown === 'features' && (
                <>
                  <div className="absolute top-full left-0 w-72 h-2 z-50" onMouseEnter={() => handleDropdownEnter('features')}></div>
                  <div
                    className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up mt-2"
                    onMouseEnter={() => handleDropdownEnter('features')}
                    onMouseLeave={() => handleDropdownLeave('features')}
                  >
                    <Link to="/demo/orders-shipments" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Order & Shipment Management</div>
                      <div className="text-xs text-gray-500">Create, assign, and track shipments</div>
                    </Link>
                    <Link to="/demo/warehouse" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Warehouse Management (WMS)</div>
                      <div className="text-xs text-gray-500">Bin-level inventory tracking</div>
                    </Link>
                    <Link to="/demo/fleet-drivers" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Fleet & Driver Management</div>
                      <div className="text-xs text-gray-500">Manage vehicles and drivers</div>
                    </Link>
                    <Link to="/demo/gps-tracking" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Live GPS Tracking</div>
                      <div className="text-xs text-gray-500">Real-time vehicle location</div>
                    </Link>
                    <Link to="/demo/billing" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Billing & Invoicing</div>
                      <div className="text-xs text-gray-500">GST-ready billing system</div>
                    </Link>
                    <Link to="/demo/reports" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <div className="font-semibold mb-1">Reports & Analytics</div>
                      <div className="text-xs text-gray-500">Operational KPIs and insights</div>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* How It Works Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('how-it-works')}
              onMouseLeave={() => handleDropdownLeave('how-it-works')}
            >
              <button
                type="button"
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center cursor-pointer bg-transparent border-none"
                onClick={() => {
                  setActiveDropdown(null);
                  if (location.pathname === '/how-it-works') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/how-it-works');
                  }
                }}
              >
                How It Works
                <ArrowRight size={14} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === 'how-it-works' ? 'rotate-90' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              {activeDropdown === 'how-it-works' && (
                <>
                  <div className="absolute top-full left-0 w-72 h-2 z-50" onMouseEnter={() => handleDropdownEnter('how-it-works')}></div>
                  <div
                    className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up mt-2"
                    onMouseEnter={() => handleDropdownEnter('how-it-works')}
                    onMouseLeave={() => handleDropdownLeave('how-it-works')}
                  >
                    {[
                      { id: 'step-01', num: '01', title: 'Create Orders & Shipments', desc: 'Define pickup and delivery addresses', badgeClass: 'bg-blue-100', textClass: 'text-blue-600' },
                      { id: 'step-02', num: '02', title: 'Manage Inventory & Warehouses', desc: 'Track bin-level inventory, process GRN', badgeClass: 'bg-purple-100', textClass: 'text-purple-600' },
                      { id: 'step-03', num: '03', title: 'Track Vehicles & Shipments Live', desc: 'Monitor real-time GPS locations', badgeClass: 'bg-emerald-100', textClass: 'text-emerald-600' },
                      { id: 'step-04', num: '04', title: 'Generate Invoices & Reports', desc: 'Auto-generate invoices and access reports', badgeClass: 'bg-amber-100', textClass: 'text-amber-600' },
                    ].map((item) => (
                      <Link
                        key={item.id}
                        to="/how-it-works"
                        state={{ scrollTo: item.id }}
                        onClick={(e) => {
                          setActiveDropdown(null);
                          if (location.pathname === '/how-it-works') {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-4 border-transparent hover:border-blue-600"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${item.badgeClass} flex items-center justify-center flex-shrink-0`}>
                            <span className={`${item.textClass} font-bold text-xs`}>{item.num}</span>
                          </div>
                          <div>
                            <div className="font-semibold mb-1">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Live Operations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('live-ops')}
              onMouseLeave={() => handleDropdownLeave('live-ops')}
            >
              <button
                type="button"
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center cursor-pointer bg-transparent border-none"
                onClick={() => {
                  setActiveDropdown(null);
                  if (location.pathname === '/live-ops') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/live-ops');
                  }
                }}
              >
                Live Operations
                <ArrowRight size={14} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === 'live-ops' ? 'rotate-90' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              {activeDropdown === 'live-ops' && (
                <>
                  <div className="absolute top-full left-0 w-64 h-2 z-50" onMouseEnter={() => handleDropdownEnter('live-ops')}></div>
                  <div
                    className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up mt-2"
                    onMouseEnter={() => handleDropdownEnter('live-ops')}
                    onMouseLeave={() => handleDropdownLeave('live-ops')}
                  >
                    <Link to="/live-operations/vehicle-tracking" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Navigation size={16} className="text-emerald-600" />
                        <div>
                          <div className="font-semibold">Real-Time Vehicle Tracking</div>
                          <div className="text-xs text-gray-500">GPS-enabled location updates</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="/live-operations/shipment-status" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Activity size={16} className="text-emerald-600" />
                        <div>
                          <div className="font-semibold">Live Shipment Status</div>
                          <div className="text-xs text-gray-500">Timeline with GPS coordinates</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="/live-operations/websocket-updates" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Route size={16} className="text-emerald-600" />
                        <div>
                          <div className="font-semibold">WebSocket Updates</div>
                          <div className="text-xs text-gray-500">Instant real-time notifications</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="/live-operations/dashboard" onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <div className="flex items-center space-x-2">
                        <BarChart3 size={16} className="text-emerald-600" />
                        <div>
                          <div className="font-semibold">Operational Dashboard</div>
                          <div className="text-xs text-gray-500">Live metrics and KPIs</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Why Choose Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('why-choose')}
              onMouseLeave={() => handleDropdownLeave('why-choose')}
            >
              <button
                type="button"
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center cursor-pointer bg-transparent border-none"
                onClick={() => {
                  setActiveDropdown(null);
                  if (location.pathname === '/why-choose') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/why-choose');
                  }
                }}
              >
                Why Choose Us
                <ArrowRight size={14} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === 'why-choose' ? 'rotate-90' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              {activeDropdown === 'why-choose' && (
                <>
                  <div className="absolute top-full left-0 w-72 h-2 z-50" onMouseEnter={() => handleDropdownEnter('why-choose')}></div>
                  <div
                    className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up mt-2"
                    onMouseEnter={() => handleDropdownEnter('why-choose')}
                    onMouseLeave={() => handleDropdownLeave('why-choose')}
                  >
                    {[
                      { to: '/demo/multi-tenant', icon: ShieldCheck, title: 'Multi-Tenant SaaS Architecture', iconClass: 'text-indigo-600', bgClass: 'hover:bg-indigo-50 hover:text-indigo-600' },
                      { to: '/demo/warehouse', icon: Warehouse, title: 'Bin-Level Warehouse Inventory', iconClass: 'text-purple-600', bgClass: 'hover:bg-purple-50 hover:text-purple-600' },
                      { to: '/demo/gps-tracking', icon: MapPin, title: 'Real-Time GPS Tracking', iconClass: 'text-emerald-600', bgClass: 'hover:bg-emerald-50 hover:text-emerald-600' },
                      { to: '/demo/billing', icon: DollarSign, title: 'GST-Ready Billing', iconClass: 'text-amber-600', bgClass: 'hover:bg-amber-50 hover:text-amber-600' },
                      { to: '/demo/role-based-access', icon: Lock, title: 'Role-Based Access Control', iconClass: 'text-blue-600', bgClass: 'hover:bg-blue-50 hover:text-blue-600' },
                      { to: '/demo/audit-ready', icon: Database, title: 'Audit-Ready System', iconClass: 'text-teal-600', bgClass: 'hover:bg-teal-50 hover:text-teal-600' },
                    ].map((item) => {
                      const IconComponent = item.icon;
                      return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setActiveDropdown(null)}
                        className={`block px-4 py-2.5 text-sm text-gray-700 transition-colors ${item.bgClass}`}
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent size={16} className={item.iconClass} />
                          <div className="font-semibold">{item.title}</div>
                        </div>
                      </Link>
                    );})}
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4 animate-fade-in animation-delay-200">
            <Link
              to="/contact"
              className="px-6 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 btn-ripple animate-gradient"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
              title="Contact"
            >
              <img src="/customer-service.png" alt="Contact" className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
