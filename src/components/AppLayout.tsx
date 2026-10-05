import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

const SHOW_NAV = [
  '/app', '/app/home', '/app/projects', '/app/suppliers',
  '/app/packhouse/analytics', '/app/analytics',
  '/app/projects/proj-banana-1/qr', '/app/projects/proj-tomato-1/qr',
  '/app/messages', '/app/profile', '/app/settings',
  '/app/converter/home', '/app/material/home', '/app/packhouse/home', '/app/transporter/home',
];

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const showNav = SHOW_NAV.some(r =>
    location.pathname === r ||
    (r === '/app/packhouse/analytics' && location.pathname.includes('analytics'))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f2f6f4', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, width: '100%', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: showNav ? 72 : 0, background: '#f9fcfb' }}>
        <Outlet />
      </main>
      {showNav && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <BottomNav />
        </div>
      )}
    </div>
  );
};
