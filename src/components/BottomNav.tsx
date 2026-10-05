import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LucideIcon, Home, Package, Users, Sparkles, User, FileText,
  Truck, BarChart3, ShieldCheck, Flame, Layers, Search, QrCode,
  ScanLine
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavTab {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string | number;
}

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useApp();

  // Farmer Tabs matching the reference design
  const farmerTabs: NavTab[] = [
    { id: 'home', label: 'Home', path: '/app/home', icon: Home },
    { id: 'orders', label: 'Orders', path: '/app/projects', icon: Package },
    { id: 'scan', label: 'Scan', path: '/app/projects/proj-banana-1/qr', icon: ScanLine },
    { id: 'insights', label: 'Insights', path: '/app/packhouse/analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
  ];

  const converterTabs: NavTab[] = [
    { id: 'home', label: 'Home', path: '/app/converter/home', icon: Home },
    { id: 'rfqs', label: 'RFQs', path: '/app/converter/rfqs', icon: FileText, badge: 3 },
    { id: 'auctions', label: 'Auctions', path: '/app/projects/proj-banana-1/bidding', icon: Flame },
    { id: 'orders', label: 'Orders', path: '/app/projects', icon: Package },
    { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
  ];

  const packhouseTabs: NavTab[] = [
    { id: 'home', label: 'Home', path: '/app/packhouse/home', icon: Home },
    { id: 'analytics', label: 'Insights', path: '/app/packhouse/analytics', icon: BarChart3 },
    { id: 'projects', label: 'Projects', path: '/app/projects', icon: Package },
    { id: 'compliance', label: 'Compliance', path: '/app/packhouse/compliance', icon: ShieldCheck, badge: '!' },
    { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
  ];

  const materialProducerTabs: NavTab[] = [
    { id: 'home', label: 'Home', path: '/app/material/home', icon: Home },
    { id: 'catalog', label: 'Catalog', path: '/app/material/catalog', icon: Layers },
    { id: 'inquiries', label: 'Inquiries', path: '/app/material/catalog', icon: FileText, badge: 5 },
    { id: 'demand', label: 'Demand', path: '/app/material/home', icon: BarChart3 },
    { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
  ];

  const transporterTabs: NavTab[] = [
    { id: 'home', label: 'Home', path: '/app/transporter/home', icon: Home },
    { id: 'shipments', label: 'Shipments', path: '/app/transporter/shipments', icon: Truck, badge: 2 },
    { id: 'check', label: 'Check', path: '/app/transporter/check', icon: Search },
    { id: 'scan', label: 'Scan QR', path: '/app/projects/proj-banana-1/qr', icon: QrCode },
    { id: 'profile', label: 'Profile', path: '/app/profile', icon: User },
  ];

  let tabs: NavTab[] = farmerTabs;
  if (role === 'converter' || role === 'supplier') tabs = converterTabs;
  else if (role === 'packhouse' || role === 'brand') tabs = packhouseTabs;
  else if (role === 'material_producer') tabs = materialProducerTabs;
  else if (role === 'transporter') tabs = transporterTabs;

  const isActive = (path: string) => {
    if (path === '/app/home') return location.pathname === '/app/home' || location.pathname === '/app';
    if (path.includes('projects') && location.pathname.includes('projects')) return true;
    if (path.includes('analytics') && location.pathname.includes('analytics')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-t border-gray-150 shadow-[0_-4px_25px_rgba(0,0,0,0.03)] select-none">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:bg-[#f8fafc]"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={24}
                  strokeWidth={active ? 2.5 : 1.6}
                  className={`transition-all duration-200 ${
                    active
                      ? 'text-[#0f4028] scale-105'
                      : 'text-[#94a3b8] group-hover:text-gray-700'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1.5 transition-all duration-200 tracking-tight ${
                  active
                    ? 'font-bold text-[#0f4028]'
                    : 'font-medium text-[#94a3b8] group-hover:text-gray-700'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
