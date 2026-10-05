import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  FileText,
  Truck,
  Sparkles,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, clearNotifications, t } = useApp();

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    navigate(notif.link);
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return '📑';
      case 'rfq':
        return '✉️';
      case 'order':
        return '🚚';
      case 'performance':
        return '⭐';
      default:
        return '🔔';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAF8] text-[#0F172A] pb-24">
      <TopBar title="Notification Center" showBack />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Activity Alerts
            </h2>
            <p className="text-xs text-slate-500">
              Real-time updates on quotations, converter dispatches & performance milestones.
            </p>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            title="No new notifications"
            description="You are fully caught up! New quotations and tracking updates will appear here."
          />
        ) : (
          <div className="space-y-2.5">
            {notifications.map((n) => (
              <Card
                key={n.id}
                hoverable
                onClick={() => handleNotificationClick(n)}
                className={`p-3.5 flex items-start gap-3 border transition-all ${
                  !n.read
                    ? 'border-[#10B981]/50 bg-white ring-2 ring-[#10B981]/15 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-xs">
                  {getNotifIcon(n.type)}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3
                      className={`text-xs font-bold truncate ${
                        !n.read ? 'text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {n.message}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#059669]">
                    <span>View details</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
