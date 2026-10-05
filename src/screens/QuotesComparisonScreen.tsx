import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  Sparkles,
  MapPin,
  Clock,
  Package,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Info,
  CheckCircle2,
  Scale,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const QuotesComparisonScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { quotes, selectQuote, activeProjectId } = useApp();

  const projectQuotes = quotes.filter((q) => q.projectId === (id || activeProjectId));
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(
    projectQuotes[0]?.id || 'quote-gp-1'
  );

  const selectedQuote = projectQuotes.find((q) => q.id === selectedQuoteId) || projectQuotes[0];

  const handleAcceptAndSelect = () => {
    if (selectedQuote) {
      selectQuote(id || activeProjectId, selectedQuote.id);
      navigate(`/app/projects/${id || activeProjectId}/order`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#f9fcfb] text-[#1a2620] min-h-full pb-20">
      <div>
        <TopBar title="Received Quotations" showBack />

        <div className="p-4 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0f4028] bg-[#edf9f3] px-2.5 py-0.5 rounded-full mb-1 border border-[#c5d8ce]">
              <span>Verified Converters</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#0a0f0d] tracking-tight">
              {projectQuotes.length} Supplier Quotes Received
            </h2>
            <p className="text-xs text-[#6b8076] mt-0.5">
              Verified technical compliance with food-grade standard ISO 17025. You hold full order authority.
            </p>
          </div>

          {/* Decision Support Note */}
          <div className="bg-[#edf9f3] border border-[#c5d8ce] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#0f4028]">
            <Sparkles size={16} className="shrink-0 mt-0.5 text-[#0f4028]" />
            <p className="text-[11.5px] leading-relaxed text-[#1a2620]">
              <strong className="text-[#0f4028]">Decision Engine:</strong> Quotes are sorted by optimal barrier parity, certified food safety, and regional dispatch radius.
            </p>
          </div>

          {/* Quotes list */}
          <div className="space-y-3">
            {projectQuotes.map((q) => {
              const isSelected = q.id === selectedQuoteId;
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuoteId(q.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0f4028] ring-2 ring-[#0f4028]/15 shadow-sm'
                      : 'bg-white/80 border-[#e2ebe6] hover:border-[#c5d8ce]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm text-[#0a0f0d]">{q.supplierName}</h3>
                        <div className="w-4 h-4 rounded-full bg-[#0f4028] flex items-center justify-center">
                          <Check size={9} color="white" strokeWidth={3} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#6b8076] mt-0.5">
                        <MapPin size={11} />
                        <span>{q.supplierLocation || 'NCR Industrial Hub'}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-extrabold text-[#0a0f0d]">₹{q.unitPrice.toFixed(2)}</span>
                      <span className="block text-[10px] text-[#94aaa0]">/ unit</span>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#f2f6f4] my-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#6b8076] uppercase font-bold block">Lead Time</span>
                      <span className="font-bold text-[#0a0f0d]">{q.leadTimeDays} Days</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6b8076] uppercase font-bold block">Min MOQ</span>
                      <span className="font-bold text-[#0a0f0d]">{q.moq} Units</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6b8076] uppercase font-bold block">Total Est.</span>
                      <span className="font-bold text-[#0f4028]">₹{(q.unitPrice * (q.moq || 500)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-medium text-[#3d5347]">
                      {q.materialType || 'Bio-based PLA Film'}
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${
                      isSelected ? 'text-[#0f4028]' : 'text-[#94aaa0]'
                    }`}>
                      {isSelected ? 'Selected for Order' : 'Click to Select'}
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-4 border-t border-[#e2ebe6]">
        <button
          onClick={handleAcceptAndSelect}
          className="w-full py-3.5 px-4 rounded-xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <span>Confirm & Issue Purchase Order</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
