import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      onClick={() => navigate('/onboarding')}
      className="flex flex-col h-full bg-white select-none relative overflow-hidden cursor-pointer justify-between p-8"
    >
      {/* Top subtle badge */}
      <div className="pt-4 flex justify-center">
        <span className="text-[11px] font-bold text-emerald-800 bg-[#f1f7f4] px-3.5 py-1 rounded-full uppercase tracking-wider">
          AI Packaging Platform
        </span>
      </div>

      {/* Main Center Logo & Brand */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Modern Origami P Logo matching design */}
        <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Dark green folded ribbon shape */}
            <path
              d="M32 20 C32 15 36 12 42 12 L64 12 C78 12 88 22 88 36 C88 50 78 60 64 60 L48 60 L48 84 C48 89 44 92 39 92 L35 92 C30 92 26 88 26 83 L26 32 C26 25 29 20 32 20 Z"
              fill="#0f4028"
            />
            {/* Lighter green folding inner accent */}
            <path
              d="M48 24 L62 24 C71 24 76 29 76 36 C76 43 71 48 62 48 L48 48 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            <path
              d="M32 36 L48 36 L48 54 L38 54 C34 54 32 50 32 46 Z"
              fill="#22c55e"
              opacity="0.8"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-[#0f4028] tracking-tight mb-2">
          Packit Up
        </h1>
        <p className="text-sm font-medium text-gray-500 tracking-wide text-center">
          Smart Packaging<br />for a Fresher Tomorrow
        </p>
      </div>

      {/* Bottom organic green waves */}
      <div className="relative w-full h-32 flex items-end justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 120"
          className="absolute bottom-0 w-full h-full opacity-35"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C120 10 240 100 400 40 L400 120 L0 120 Z"
            fill="#a7f3d0"
          />
          <path
            d="M0 80 C150 40 280 110 400 70 L400 120 L0 120 Z"
            fill="#34d399"
            opacity="0.5"
          />
        </svg>
        <div className="w-10 h-1 bg-gray-300 rounded-full mb-2 z-10 opacity-60"></div>
      </div>
    </div>
  );
};
