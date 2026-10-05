import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Search, ChevronRight, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/ui/Card';

export const MessagesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { chatThreads, t } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAF8] text-[#0F172A] pb-20">
      <TopBar title="Supplier Messages" />

      <div className="p-4 space-y-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Conversations
          </h2>
          <p className="text-xs text-slate-500">
            Direct chat with verified packaging converters and technical desks.
          </p>
        </div>

        <div className="space-y-2.5">
          {chatThreads.map((thread) => (
            <Card
              key={thread.id}
              hoverable
              onClick={() => navigate(`/app/messages/${thread.id}`)}
              className="p-3.5 flex items-center justify-between border border-slate-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {thread.supplierLogo}
                  </div>
                  {thread.onlineStatus && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {thread.supplierName}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-[#059669] block mb-0.5">
                    {thread.projectTitle}
                  </span>
                  <p className="text-xs text-slate-500 truncate">
                    {thread.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-slate-400 font-medium">
                  {thread.lastMessageTime}
                </span>
                {thread.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {thread.unreadCount}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
