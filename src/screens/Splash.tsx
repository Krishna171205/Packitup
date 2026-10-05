import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 150);
    const t2 = setTimeout(() => navigate('/onboarding'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div
      onClick={() => navigate('/onboarding')}
      className="flex flex-col h-full bg-white select-none cursor-pointer relative overflow-hidden justify-between"
    >
      {/* Top Status Bar Spacer */}
      <div className="pt-6 px-6 flex justify-between items-center text-xs font-semibold text-[#0a0f0d]">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0a0f0d]" />
          <span className="w-4 h-2.5 border border-[#0a0f0d] rounded-xs" />
        </div>
      </div>

      {/* Center Brand Lockup */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="flex flex-col items-center"
        >
          {/* Logo Glyph: Stylized geometric leaf 'P' */}
          <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
              <path
                d="M44 8C24.118 8 8 24.118 8 44c0 14.2 8.24 26.5 20.25 32.35 1.5.75 3.25-.35 3.25-2.05v-23.8c0-2.2 1.8-4 4-4h8.5c13.25 0 24-10.75 24-24S57.25 8 44 8z"
                fill="#0f4028"
              />
              <path
                d="M43.5 22C34.4 22 27 29.4 27 38.5c0 1.9 1.6 3.5 3.5 3.5h13c7.2 0 13-5.8 13-13s-5.8-7-13-7z"
                fill="#2da464"
                opacity="0.9"
              />
              <circle cx="68" cy="24" r="5" fill="#a2e6bf" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-[#0a0f0d] tracking-tight mb-2">
            Packit Up
          </h1>
          <p className="text-sm font-medium text-[#6b8076] max-w-xs leading-relaxed">
            Smart Packaging for a Fresher Tomorrow
          </p>
        </div>
      </div>

      {/* Bottom Wave Graphics & Indicator */}
      <div className="relative w-full overflow-hidden pb-4">
        {/* Soft mint/green wave aura */}
        <div
          className="w-full h-32 opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 120%, rgba(45,164,100,0.22) 0%, rgba(237,249,243,0.8) 50%, transparent 80%)',
          }}
        />

        {/* Bottom iOS Indicator bar */}
        <div className="w-32 h-1 bg-[#0a0f0d]/80 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};
