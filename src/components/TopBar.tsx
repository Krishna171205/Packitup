import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  customAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack = false, onBack, customAction }) => {
  const navigate = useNavigate();
  const { user, notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  // Safe initial letters for user avatar (no emojis)
  const userInitials = (user?.name || 'User')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2ebe6] px-4 py-2.5 shrink-0 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              onClick={handleBack}
              className="w-8 h-8 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#1a2620] transition-colors cursor-pointer shrink-0 border border-[#e2ebe6]"
              aria-label="Back"
            >
              <ChevronLeft size={18} />
            </button>
          ) : (
            <div onClick={() => navigate('/app/home')} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-[#0f4028] flex items-center justify-center shadow-xs group-hover:bg-[#165c3a] transition-colors">
                <span className="font-extrabold text-white text-sm tracking-tight">P</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#0a0f0d] tracking-tight text-[15px]">PACKITUP</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f4028]" />
                </div>
                <span className="block text-[8.5px] uppercase tracking-widest text-[#0f4028] font-bold">
                  Food Packaging Intelligence
                </span>
              </div>
            </div>
          )}

          {title && (
            <h1 className="font-bold text-[#0a0f0d] text-[14px] truncate pl-1 border-l border-[#e2ebe6] ml-1 pl-2">
              {title}
            </h1>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {customAction}

          <button
            onClick={() => navigate('/app/notifications')}
            className="relative w-8 h-8 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] border border-[#e2ebe6] flex items-center justify-center text-[#3d5347] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={16} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0f4028] text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/app/profile')}
            className="w-8 h-8 rounded-xl bg-[#edf9f3] border border-[#c5d8ce] flex items-center justify-center text-xs font-bold text-[#0f4028] cursor-pointer hover:bg-[#d4f4e4] transition-all"
            title={user?.name || 'Account'}
          >
            {userInitials}
          </button>
        </div>
      </div>
    </header>
  );
};
