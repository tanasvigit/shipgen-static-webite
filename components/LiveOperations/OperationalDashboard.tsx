import React, { useEffect, useState } from 'react';
import { Activity, Package, Truck, DollarSign, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface Kpi {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  bgClass: string;
  iconClass: string;
}

const INITIAL_KPIS: Kpi[] = [
  {
    label: 'Active Shipments',
    value: '184',
    change: '+12% vs last week',
    icon: Package,
    bgClass: 'bg-blue-100',
    iconClass: 'text-blue-600',
  },
  {
    label: 'Vehicles on Road',
    value: '96',
    change: '+5% fleet utilisation',
    icon: Truck,
    bgClass: 'bg-emerald-100',
    iconClass: 'text-emerald-600',
  },
  {
    label: "Today's Revenue",
    value: '₹82.4L',
    change: '+8% booking growth',
    icon: DollarSign,
    bgClass: 'bg-purple-100',
    iconClass: 'text-purple-600',
  },
  {
    label: 'Pending Invoices',
    value: '32',
    change: '-3% aging > 7 days',
    icon: AlertCircle,
    bgClass: 'bg-orange-100',
    iconClass: 'text-orange-600',
  },
];

const UTILIZATION = [
  { label: 'Line haul', percent: 78, trend: '+6%' },
  { label: 'Last mile', percent: 64, trend: '+3%' },
  { label: 'Warehouse docks', percent: 91, trend: '-2%' },
];

const SLA_ROWS = [
  { lane: 'Mumbai → Bengaluru', sla: '2d 6h', compliance: '97.2%', status: 'On Track' },
  { lane: 'Delhi → Kolkata', sla: '1d 20h', compliance: '93.4%', status: 'Monitor' },
  { lane: 'Hyderabad → Chennai', sla: '1d 4h', compliance: '98.9%', status: 'On Track' },
];

const ALERTS = [
  {
    title: 'Warehouse A nearing capacity',
    detail: 'Outbound slots full after 17:00 hrs',
    tone: 'warning',
  },
  {
    title: 'Cold-chain temperature variance',
    detail: 'Vehicle VH-093 reported 9°C spike',
    tone: 'info',
  },
];

const OperationalDashboard: React.FC = () => {
  const [kpis, setKpis] = useState(INITIAL_KPIS);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis((prev) =>
        prev.map((kpi) => ({
          ...kpi,
          value: adjustValue(kpi.value),
        }))
      );
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <header>
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-600 font-semibold">Live KPIs</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Operational Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Mock data that mirrors the analytics experience inside ShipZen. Every card stays in sync without hitting the API.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className={`${kpi.bgClass} ${kpi.iconClass} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <kpi.icon size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600">{kpi.change}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <article className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Shipment volume (7 days)</h2>
              <p className="text-xs text-gray-500">Mock series for marketing demos</p>
            </div>
            <TrendingUp className="text-blue-500" size={20} />
          </div>
          <div className="grid grid-cols-7 gap-2 mt-6">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={day} className="text-center">
                <div
                  className="mx-auto w-7 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold py-1"
                  style={{ height: `${50 + idx * 10}px` }}
                >
                  {120 + idx * 8}
                </div>
                <p className="text-xs text-gray-500 mt-1">{day}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resource utilisation</h2>
          <div className="space-y-4">
            {UTILIZATION.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.percent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${item.percent}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.trend} this week</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Service level agreements</h2>
          <CheckCircle2 className="text-emerald-500" size={20} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2 font-medium">Lane</th>
                <th className="py-2 font-medium">SLA Promise</th>
                <th className="py-2 font-medium">Compliance</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {SLA_ROWS.map((row) => (
                <tr key={row.lane} className="border-t border-gray-100">
                  <td className="py-3 text-gray-900">{row.lane}</td>
                  <td className="py-3 text-gray-600">{row.sla}</td>
                  <td className="py-3 font-semibold text-gray-900">{row.compliance}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ALERTS.map((alert) => (
          <article
            key={alert.title}
            className={`rounded-xl border p-5 flex items-start space-x-3 ${
              alert.tone === 'warning'
                ? 'border-amber-200 bg-amber-50'
                : 'border-blue-200 bg-blue-50'
            }`}
          >
            <AlertCircle
              size={20}
              className={alert.tone === 'warning' ? 'text-amber-600' : 'text-blue-600'}
            />
            <div>
              <p className="font-semibold text-gray-900">{alert.title}</p>
              <p className="text-sm text-gray-700">{alert.detail}</p>
            </div>
          </article>
        ))}
      </section>
      </main>
      <Footer />
    </div>
  );
};

const adjustValue = (value: string) => {
  if (value.startsWith('₹')) {
    const numeric = parseFloat(value.replace(/[₹L]/g, ''));
    const delta = (Math.random() - 0.5) * 2;
    return `₹${(numeric + delta).toFixed(1)}L`;
  }
  const numeric = parseFloat(value);
  const delta = Math.random() > 0.5 ? 1 : -1;
  return Math.max(0, numeric + delta).toString();
};

export default OperationalDashboard;
