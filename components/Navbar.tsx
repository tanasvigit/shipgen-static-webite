import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight, Navigation, BarChart3, Activity, Route,
  ShieldCheck, Lock, Database, MapPin, DollarSign, Warehouse, LandPlot, CircleParking
} from 'lucide-react';

interface NavDropdownProps {
  id: string;
  label: string;
  isOpen: boolean;
  panelClassName?: string;
  onOpen: () => void;
  onScheduleClose: () => void;
  onNavigate: () => void;
  children: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  id,
  label,
  isOpen,
  panelClassName = 'w-72',
  onOpen,
  onScheduleClose,
  onNavigate,
  children,
}) => (
  <div
    className="relative"
    onMouseEnter={onOpen}
    onMouseLeave={onScheduleClose}
  >
    <button
      type="button"
      className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center cursor-pointer bg-transparent border-none"
      onClick={onNavigate}
    >
      {label}
      <ArrowRight size={14} className={`ml-1 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </button>
    {isOpen && (
      <div className={`absolute left-0 top-full z-50 ${panelClassName} pt-1`}>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in-up">
          {children}
        </div>
      </div>
    )}
  </div>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setActiveDropdown(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openDropdown = (dropdownId: string) => {
    clearCloseTimeout();
    setActiveDropdown(dropdownId);
  };

  const scheduleCloseDropdown = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  const closeDropdown = () => {
    clearCloseTimeout();
    setActiveDropdown(null);
  };

  const navigateOrScrollTop = (path: string) => {
    closeDropdown();
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'navbar-scrolled shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center animate-fade-in">
            <img src="/logo_logistic.png" alt="ShipGen" className="h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <NavDropdown
              id="features"
              label="Features"
              isOpen={activeDropdown === 'features'}
              onOpen={() => openDropdown('features')}
              onScheduleClose={scheduleCloseDropdown}
              onNavigate={() => navigateOrScrollTop('/features')}
            >
              <Link to="/demo/orders-shipments" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Order & Shipment Management</div>
                <div className="text-xs text-gray-500">Create, assign, and track shipments</div>
              </Link>
              <Link to="/demo/warehouse" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Warehouse Management (WMS)</div>
                <div className="text-xs text-gray-500">Bin-level inventory tracking</div>
              </Link>
              <Link to="/demo/fleet-drivers" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Fleet & Driver Management</div>
                <div className="text-xs text-gray-500">Manage vehicles and drivers</div>
              </Link>
              <Link to="/demo/gps-tracking" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Live GPS Tracking</div>
                <div className="text-xs text-gray-500">Real-time vehicle location</div>
              </Link>
              <Link to="/demo/billing" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Billing & Invoicing</div>
                <div className="text-xs text-gray-500">GST-ready billing system</div>
              </Link>
              <Link to="/demo/reports" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <div className="font-semibold mb-1">Reports & Analytics</div>
                <div className="text-xs text-gray-500">Operational KPIs and insights</div>
              </Link>
              <Link to="/demo/yard-management" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <div className="font-semibold mb-1">Yard Management System</div>
                <div className="text-xs text-gray-500">Gate, queue, dock & yard control</div>
              </Link>
              <Link to="/demo/parking-management" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                <div className="font-semibold mb-1">Parking Management System</div>
                <div className="text-xs text-gray-500">Tickets, occupancy & payments</div>
              </Link>
            </NavDropdown>

            <NavDropdown
              id="how-it-works"
              label="How It Works"
              isOpen={activeDropdown === 'how-it-works'}
              onOpen={() => openDropdown('how-it-works')}
              onScheduleClose={scheduleCloseDropdown}
              onNavigate={() => navigateOrScrollTop('/how-it-works')}
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
                    closeDropdown();
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
            </NavDropdown>

            <NavDropdown
              id="live-ops"
              label="Live Operations"
              panelClassName="w-64"
              isOpen={activeDropdown === 'live-ops'}
              onOpen={() => openDropdown('live-ops')}
              onScheduleClose={scheduleCloseDropdown}
              onNavigate={() => navigateOrScrollTop('/live-ops')}
            >
              <Link to="/live-operations/vehicle-tracking" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <div className="flex items-center space-x-2">
                  <Navigation size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-semibold">Real-Time Vehicle Tracking</div>
                    <div className="text-xs text-gray-500">GPS-enabled location updates</div>
                  </div>
                </div>
              </Link>
              <Link to="/live-operations/shipment-status" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <div className="flex items-center space-x-2">
                  <Activity size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-semibold">Live Shipment Status</div>
                    <div className="text-xs text-gray-500">Timeline with GPS coordinates</div>
                  </div>
                </div>
              </Link>
              <Link to="/live-operations/websocket-updates" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <div className="flex items-center space-x-2">
                  <Route size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-semibold">WebSocket Updates</div>
                    <div className="text-xs text-gray-500">Instant real-time notifications</div>
                  </div>
                </div>
              </Link>
              <Link to="/live-operations/dashboard" onClick={closeDropdown} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <div className="flex items-center space-x-2">
                  <BarChart3 size={16} className="text-emerald-600" />
                  <div>
                    <div className="font-semibold">Operational Dashboard</div>
                    <div className="text-xs text-gray-500">Live metrics and KPIs</div>
                  </div>
                </div>
              </Link>
            </NavDropdown>

            <NavDropdown
              id="why-choose"
              label="Why Choose Us"
              isOpen={activeDropdown === 'why-choose'}
              onOpen={() => openDropdown('why-choose')}
              onScheduleClose={scheduleCloseDropdown}
              onNavigate={() => navigateOrScrollTop('/why-choose')}
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
                    onClick={closeDropdown}
                    className={`block px-4 py-2.5 text-sm text-gray-700 transition-colors ${item.bgClass}`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent size={16} className={item.iconClass} />
                      <div className="font-semibold">{item.title}</div>
                    </div>
                  </Link>
                );
              })}
            </NavDropdown>
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
