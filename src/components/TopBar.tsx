import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, Search } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 bg-white/97 backdrop-blur-md border-b border-gray-100 px-4 py-3 shrink-0">
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div onClick={() => navigate('/app/home')} className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-sm">
                <span className="font-black text-white text-base">P</span>
              </div>
              <div>
                <span className="font-black text-gray-900 tracking-tighter text-base">PACKITUP</span>
                <span className="block text-[9px] uppercase tracking-widest text-green-600 font-bold -mt-0.5">AI PACKAGING</span>
              </div>
            </div>
          )}

          {title && (
            <h1 className="font-bold text-gray-900 text-[15px] truncate pl-1">{title}</h1>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {customAction}

          <button
            onClick={() => navigate('/app/notifications')}
            className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
          >
            <Bell size={17} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/app/profile')}
            className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-base cursor-pointer hover:ring-2 hover:ring-green-200 transition-all"
            title={user.name}
          >
            {user.avatar}
          </button>
        </div>
      </div>
    </header>
  );
};
