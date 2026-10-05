import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LucideIcon, Home, Package, ScanLine, BarChart3, User, FileText, Flame, Truck, ShieldCheck, Layers, Search, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Tab { id: string; label: string; path: string; icon: LucideIcon; badge?: string | number; }

const farmerTabs: Tab[] = [
  { id: 'home', label: 'Home', path: '/app/home', icon: Home },
  { id: 'orders', label: 'Orders', path: '/app/projects', icon: Package },
  { id: 'scan', label: 'Scan', path: '/app/projects/proj-banana-1/qr', icon: ScanLine },
  { id: 'insights', label: 'Insights', path: '/app/packhouse/analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
];
const converterTabs: Tab[] = [
  { id: 'home', label: 'Home', path: '/app/converter/home', icon: Home },
  { id: 'rfqs', label: 'RFQs', path: '/app/converter/rfqs', icon: FileText, badge: 3 },
  { id: 'auctions', label: 'Live', path: '/app/projects/proj-banana-1/bidding', icon: Flame },
  { id: 'orders', label: 'Orders', path: '/app/projects', icon: Package },
  { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
];
const packhouseTabs: Tab[] = [
  { id: 'home', label: 'Home', path: '/app/packhouse/home', icon: Home },
  { id: 'analytics', label: 'Insights', path: '/app/packhouse/analytics', icon: BarChart3 },
  { id: 'projects', label: 'Projects', path: '/app/projects', icon: Package },
  { id: 'compliance', label: 'Compliance', path: '/app/packhouse/compliance', icon: ShieldCheck, badge: '!' },
  { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
];
const materialTabs: Tab[] = [
  { id: 'home', label: 'Home', path: '/app/material/home', icon: Home },
  { id: 'catalog', label: 'Catalog', path: '/app/material/catalog', icon: Layers },
  { id: 'inquiries', label: 'RFQs', path: '/app/material/catalog', icon: FileText, badge: 5 },
  { id: 'demand', label: 'Demand', path: '/app/material/home', icon: BarChart3 },
  { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
];
const transporterTabs: Tab[] = [
  { id: 'home', label: 'Home', path: '/app/transporter/home', icon: Home },
  { id: 'shipments', label: 'Shipments', path: '/app/transporter/shipments', icon: Truck, badge: 2 },
  { id: 'check', label: 'Check', path: '/app/transporter/check', icon: Search },
  { id: 'scan', label: 'Scan QR', path: '/app/projects/proj-banana-1/qr', icon: QrCode },
  { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
];

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useApp();

  let tabs = farmerTabs;
  if (role === 'converter' || role === 'supplier') tabs = converterTabs;
  else if (role === 'packhouse' || role === 'brand') tabs = packhouseTabs;
  else if (role === 'material_producer') tabs = materialTabs;
  else if (role === 'transporter') tabs = transporterTabs;

  const isActive = (path: string) => {
    if (path === '/app/home') return location.pathname === '/app/home' || location.pathname === '/app';
    if (path.includes('projects') && location.pathname.includes('projects')) return true;
    if (path.includes('analytics') && location.pathname.includes('analytics')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav w-full">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 4px', border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', borderRadius: 12, transition: 'background 0.15s' }}
            >
              <div style={{ position: 'relative' }}>
                {/* Active indicator dot */}
                {active && (
                  <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#0f4028' }} />
                )}
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.6}
                  color={active ? '#0f4028' : '#94aaa0'}
                  style={{ transition: 'all 0.18s' }}
                />
                {tab.badge && (
                  <span style={{ position: 'absolute', top: -6, right: -8, background: '#dc2626', color: 'white', fontSize: '9px', fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: active ? 700 : 500, color: active ? '#0f4028' : '#94aaa0', letterSpacing: '0.01em', transition: 'all 0.18s' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
