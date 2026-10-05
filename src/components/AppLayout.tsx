import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

const BOTTOM_NAV_ROUTES = [
  '/app',
  '/app/home',
  '/app/projects',
  '/app/suppliers',
  '/app/packhouse/analytics',
  '/app/analytics',
  '/app/projects/proj-banana-1/qr',
  '/app/projects/proj-tomato-1/qr',
  '/app/messages',
  '/app/profile',
  '/app/settings',
  '/app/converter/home',
  '/app/material/home',
  '/app/packhouse/home',
  '/app/transporter/home',
];

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const showBottomNav = BOTTOM_NAV_ROUTES.some(route => 
    location.pathname === route || (route === '/app/packhouse/analytics' && location.pathname.includes('analytics'))
  );

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col w-full relative">
      {/* Main app body */}
      <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col pb-20">
        <Outlet />
      </main>

      {/* Completely Wide Edge-to-Edge Bottom Navigation */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-50">
          <BottomNav />
        </div>
      )}
    </div>
  );
};
