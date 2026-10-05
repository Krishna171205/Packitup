import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Send,
  Phone,
  Paperclip,
  CheckCheck,
  ChevronLeft,
  Package,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { PrimaryButton } from '../components/ui/Button';

export const ChatDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const chatId = id || 'chat-greenpack';

  const {
    chatThreads,
    messages,
    sendMessage,
    suppliers,
    role,
    activeProjectId,
  } = useApp();

  const thread = chatThreads.find((t) => t.id === chatId) || chatThreads[0];
  const chatMessages = messages[chatId] || [];

  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(chatId, inputVal, role === 'supplier' ? 'supplier' : 'producer');
    setInputVal('');
  };

  const sendQuickReply = (text: string) => {
    sendMessage(chatId, text, role === 'supplier' ? 'supplier' : 'producer');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAF8] text-[#0F172A] h-full overflow-hidden">
      {/* WhatsApp-style Header */}
      <div className="bg-white border-b border-slate-200/90 px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/app/messages')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white font-extrabold text-xs flex items-center justify-center">
            {thread?.supplierLogo || 'GP'}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {thread?.supplierName || 'GreenPack Industries'}
            </h3>
            <span className="text-[10px] text-[#059669] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Technical Desk Online</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="tel:+919811245890"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
            title="Call Supplier"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>

      {/* Chat Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-50 to-[#F8FAF8]">
        {/* Requirement Pin Banner */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-[#10B981]" />
            <div>
              <span className="font-bold text-slate-900">Project Reference:</span>
              <p className="text-[11px] text-slate-500">Banana 500 kg • 12µ PET / 40µ LDPE</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/app/projects/${activeProjectId}/blueprint`)}
            className="text-[11px] font-bold text-[#059669] hover:underline"
          >
            View Specs
          </button>
        </div>

        {chatMessages.map((msg) => {
          const isMe = msg.senderRole === (role === 'supplier' ? 'supplier' : 'producer');

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                isMe ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Requirement Card Embedded (Section 22) */}
              {msg.hasRequirementCard && msg.requirementData && (
                <div className="bg-white rounded-2xl p-3 border-2 border-[#10B981]/40 shadow-xs mb-1.5 text-xs w-64 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#059669]">
                    <Sparkles size={12} />
                    <span>Packaging Blueprint Attached</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{msg.requirementData.food}</h4>
                  <div className="text-[11px] text-slate-600">
                    <p>Quantity: <strong>{msg.requirementData.qty}</strong></p>
                    <p>Spec: <strong>{msg.requirementData.structure}</strong></p>
                  </div>
                </div>
              )}

              {/* Quote Card Embedded (Section 22) */}
              {msg.hasQuoteCard && msg.quoteData && (
                <div className="bg-white rounded-2xl p-3 border-2 border-[#10B981] shadow-md mb-1.5 text-xs w-64 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      Formal Quotation
                    </span>
                    <strong className="text-sm font-black text-slate-900">
                      ₹{msg.quoteData.price.toFixed(2)} / pack
                    </strong>
                  </div>
                  <div className="text-[11px] text-slate-600 flex justify-between pt-1 border-t border-slate-100">
                    <span>MOQ: {msg.quoteData.moq} kg</span>
                    <span>Lead time: {msg.quoteData.leadTime}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/app/projects/${activeProjectId}/quotes`)}
                    className="w-full bg-[#10B981] text-white py-1.5 rounded-xl font-bold text-center block hover:bg-[#059669] transition-colors"
                  >
                    View & Accept Quote
                  </button>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-[#10B981] text-white rounded-br-xs'
                    : 'bg-white text-slate-900 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 ${
                    isMe ? 'text-white/80' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck size={11} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Reply Chips */}
      <div className="bg-white px-3 py-1.5 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {[
          'Can you dispatch earlier?',
          'Please send a sample test roll',
          'We accept your quotation!',
          'Is FSSAI food cert included?',
        ].map((qText) => (
          <button
            key={qText}
            onClick={() => sendQuickReply(qText)}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer"
          >
            {qText}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <form
        onSubmit={handleSend}
        className="bg-white border-t border-slate-200/90 p-3 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type message to supplier..."
          className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#10B981]/20"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-10 h-10 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
