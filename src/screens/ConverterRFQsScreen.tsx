import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Clock, CheckCircle2, ChevronRight,
  Filter, Search, MapPin, Send, AlertCircle, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { ConverterRFQItem } from '../data/mockData';

export const ConverterRFQsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { converterRFQs, submitConverterQuote, t } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'bidding_now' | 'won' | 'lost'>('all');
  const [selectedRFQForQuote, setSelectedRFQForQuote] = useState<ConverterRFQItem | null>(null);

  // Quote form state
  const [priceInput, setPriceInput] = useState<number>(1.85);
  const [leadTimeInput, setLeadTimeInput] = useState<number>(6);
  const [sampleAvailable, setSampleAvailable] = useState<boolean>(true);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState<string>('');

  const filteredRFQs = converterRFQs.filter((rfq) => {
    if (activeTab === 'all') return true;
    return rfq.status === activeTab;
  });

  const handleOpenQuoteModal = (rfq: ConverterRFQItem) => {
    setSelectedRFQForQuote(rfq);
    setPriceInput(rfq.lowestCurrentBid ? rfq.lowestCurrentBid - 0.05 : 2.10);
    setLeadTimeInput(6);
    setQuoteSuccessMsg('');
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRFQForQuote) return;
    submitConverterQuote(selectedRFQForQuote.id, priceInput, leadTimeInput);
    setQuoteSuccessMsg('Quotation submitted successfully to farmer!');
    setTimeout(() => {
      setSelectedRFQForQuote(null);
      setQuoteSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="screen pb-24">
      <TopBar title="Converter RFQs & Quotes" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Tabs: All | Bidding Now | Won | Lost */}
        <div className="flex bg-gray-200/80 p-1 rounded-2xl text-xs font-bold">
          {(
            [
              { id: 'all', label: t('All RFQs', 'सभी RFQ') },
              { id: 'bidding_now', label: t('Bidding Now', 'बोली जारी') },
              { id: 'won', label: t('Won (1)', 'जीते (1)') },
              { id: 'lost', label: t('Lost', 'हारे') },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of RFQs */}
        <div className="space-y-3">
          {filteredRFQs.map((rfq) => {
            const isWinning = rfq.status === 'won';
            const isBidding = rfq.status === 'bidding_now';

            return (
              <div
                key={rfq.id}
                className="card p-4 border border-gray-200 bg-white space-y-3 shadow-xs"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{rfq.commodityEmoji}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-extrabold text-gray-900">{rfq.commodityName}</h4>
                        <span
                          className={`chip text-[10px] font-bold ${
                            rfq.tier === 'smart'
                              ? 'chip-amber'
                              : rfq.tier === 'shelf_life'
                              ? 'chip-blue'
                              : 'chip-green'
                          }`}
                        >
                          {rfq.tier === 'smart' ? 'Smart Plan' : rfq.tier === 'shelf_life' ? 'Shelf-Life' : 'Cost Plan'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-mono">
                        {rfq.rfqNumber} · {rfq.farmerName}
                      </p>
                    </div>
                  </div>

                  <span className="chip chip-green text-[10px] font-bold">
                    {rfq.matchScore}% Match
                  </span>
                </div>

                {/* Specs Box */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1">
                  <p className="font-semibold text-gray-800">{rfq.specRequirement}</p>
                  <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                    <span>OTR: {rfq.otrRequired}</span>
                    <span>WVTR: {rfq.wvtrRequired}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {rfq.farmerLocation} ({rfq.distanceKm} km)
                    </span>
                    <span className="font-bold text-gray-700">{rfq.quantityUnits} Units</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-1 text-gray-500 font-mono">
                    <Clock size={12} className="text-amber-500" />
                    <span>Due in {rfq.dueInHours > 0 ? `${rfq.dueInHours}h` : 'Closed'}</span>
                    {rfq.myQuotePrice && (
                      <span className="ml-2 font-bold text-gray-900">Your Quote: ₹{rfq.myQuotePrice.toFixed(2)}</span>
                    )}
                  </div>

                  {isWinning ? (
                    <span className="chip chip-green font-bold text-xs py-1 px-3">
                      ✓ Order Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenQuoteModal(rfq)}
                      className="btn-brand py-1.5 px-3.5 text-xs font-bold rounded-xl"
                    >
                      {rfq.status === 'bidding_now' ? t('Revise Quote', 'कोट बदलें') : t('Quick Quote', 'कोट भेजें')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Quote Modal */}
        {selectedRFQForQuote && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4">
            <div className="card p-5 bg-white w-full max-w-sm rounded-3xl space-y-3.5 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">
                    {t('Submit Formal Quote', 'कोटेशन दर्ज करें')}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {selectedRFQForQuote.commodityName} · {selectedRFQForQuote.quantityUnits} units
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRFQForQuote(null)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500"
                >
                  ✕
                </button>
              </div>

              {quoteSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-center font-bold text-xs">
                  ✓ {quoteSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      {t('Unit Price per Bag / Pack (₹):', 'प्रति यूनिट मूल्य (₹):')}
                    </label>
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                      <span className="font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={priceInput}
                        onChange={(e) => setPriceInput(Number(e.target.value))}
                        className="w-full text-sm font-mono font-bold text-gray-900 bg-transparent outline-none"
                      />
                      <span className="text-[10px] text-gray-400">/ bag</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      {t('Production Lead Time (Days):', 'उत्पादन समय (दिन):')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={leadTimeInput}
                      onChange={(e) => setLeadTimeInput(Number(e.target.value))}
                      className="form-input text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-medium text-gray-700">Free Physical Sample Available?</span>
                    <button
                      type="button"
                      onClick={() => setSampleAvailable(!sampleAvailable)}
                      className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                        sampleAvailable ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                          sampleAvailable ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-brand w-full py-3 text-xs font-bold rounded-xl mt-2"
                  >
                    <Send size={14} />
                    {t('Send Quote to Farmer', 'किसान को कोट भेजें')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
