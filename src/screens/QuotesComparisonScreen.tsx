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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Quote } from '../data/mockData';

export const QuotesComparisonScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { quotes, selectQuote, activeProjectId, projects } = useApp();

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
    <div className="flex-1 flex flex-col justify-between bg-[#F8FAF8] text-[#0F172A] min-h-full">
      <div>
        <TopBar title="Received Quotations" showBack />

        <div className="p-4 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full inline-block mb-1">
              Supplier Responses
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              {projectQuotes.length} Suppliers Responded
            </h2>
            <p className="text-xs text-slate-500">
              Compare unit price, technical compliance, and dispatch lead times. You make the final decision.
            </p>
          </div>

          {/* Best Value Concept Note (Section 21 Requirement) */}
          <div className="bg-[#ECFDF5] border border-[#10B981]/30 rounded-2xl p-3 flex items-start gap-2 text-xs text-[#059669]">
            <Sparkles size={16} className="shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Decision Support:</strong> PACKITUP highlights <em>Best Value</em> based on technical barrier match, lowest freight distance, and price-per-unit, without restricting your choice.
            </p>
          </div>

          {/* Clean Quote Cards (Section 21) */}
          <div className="space-y-3.5">
            {projectQuotes.map((quote) => {
              const isSelected = selectedQuoteId === quote.id;

              return (
                <div
                  key={quote.id}
                  onClick={() => setSelectedQuoteId(quote.id)}
                  className={`rounded-3xl p-4 border-2 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#10B981] bg-white ring-4 ring-[#10B981]/15 shadow-md shadow-[#10B981]/15'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Header: Supplier & Best Value Badge */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-extrabold text-slate-900">
                          {quote.supplierName}
                        </h3>
                        {quote.isBestValue && (
                          <span className="text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                            Best Value
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{quote.supplierLocation}</span>
                      </span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#10B981] text-white shadow-xs' : 'border-2 border-slate-300'
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>

                  {/* Big Unit Price & Total */}
                  <div className="flex items-baseline justify-between py-2 border-y border-slate-100 my-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Price per Package
                      </span>
                      <div className="text-2xl font-black text-slate-900">
                        ₹{quote.pricePerPackage.toFixed(2)}
                        <span className="text-xs font-normal text-slate-500"> / unit</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Total Consignment
                      </span>
                      <div className="text-sm font-bold text-slate-700">
                        ₹{quote.totalCost.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Key Spec Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-2.5 text-center text-xs mb-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Lead Time</span>
                      <strong className="text-slate-800">{quote.leadTimeDays} Days</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Min Order</span>
                      <strong className="text-slate-800">{quote.moq} kg</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Technical Match</span>
                      <strong className="text-[#059669]">{quote.technicalMatch}%</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-800">Structure:</strong> {quote.structureOffered}
                    </p>
                    <p className="text-slate-500 italic">
                      "{quote.notes}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Acceptance Action inside container */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-4 shadow-lg shrink-0 mt-auto">
        <div className="w-full">
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleAcceptAndSelect}
            icon={<CheckCircle2 size={18} />}
            iconPosition="right"
          >
            Accept Quote & Select {selectedQuote?.supplierName.split(' ')[0]}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
