import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Send, ShieldCheck, MapPin,
  Clock, Star, Sparkles, Filter, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const MultiRFQScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { converters, activeProjectId, sendMultiRFQ, t } = useApp();
  const projId = id || activeProjectId;

  // Selected converter IDs (default first 4 selected)
  const [selectedConverterIds, setSelectedConverterIds] = useState<string[]>([
    'conv-greenpack',
    'conv-nova',
    'conv-pactech',
    'conv-apex',
  ]);

  const [budgetCeiling, setBudgetCeiling] = useState<number>(2.50);
  const [deliveryDate, setDeliveryDate] = useState<string>('2026-10-12');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleConverter = (cId: string) => {
    setSelectedConverterIds((prev) =>
      prev.includes(cId) ? prev.filter((id) => id !== cId) : [...prev, cId]
    );
  };

  const handleSendRFQ = () => {
    if (selectedConverterIds.length === 0) return;
    sendMultiRFQ(selectedConverterIds, budgetCeiling, deliveryDate);
    setIsSubmitted(true);
  };

  return (
    <div className="screen pb-24">
      <TopBar title="Multi-Party RFQ" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Header Summary */}
        <div className="card p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="chip chip-green mb-1.5 text-[10px] inline-flex">
                RFQ Specification Blueprint
              </span>
              <h3 className="text-base font-extrabold text-white">
                12µm PET + 40µm LDPE Micro-perforated
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Cavendish Banana · 500 bags (MOQ check ✓)
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
              📋
            </div>
          </div>

          <div className="pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Calculated OTR</span>
              <strong className="text-emerald-400 font-mono">800–2,000 cc/m²/day</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Calculated WVTR</span>
              <strong className="text-emerald-400 font-mono">10–25 g/m²/day</strong>
            </div>
          </div>
        </div>

        {/* Success Modal / State */}
        {isSubmitted ? (
          <div className="card p-6 bg-emerald-50 border-2 border-emerald-500 text-center space-y-3 animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Check size={24} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black text-emerald-950">
              {t('RFQ Broadcast Sent Successfully!', 'RFQ सफलतापूर्वक प्रसारित!')}
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Your packaging requirements were dispatched to <strong>{selectedConverterIds.length} verified converters</strong> within 28 km radius. Formal price quotations will arrive within 2–24 hours.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate(`/app/projects/${projId}/quotes`)}
                className="btn-brand py-3 text-xs font-bold"
              >
                {t('View Quotation Room', 'कोटेशन रूम देखें')} <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate('/app/home')}
                className="btn-outline py-2.5 text-xs font-bold"
              >
                {t('Return to Dashboard', 'डैशबोर्ड पर लौटें')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Converters Match List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    {converters.length} {t('Verified Converters Match Spec', 'सत्यापित कन्वर्टर्स')}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {t('Sorted by distance to your packhouse', 'आपके पैकहाउस से दूरी अनुसार')}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700">
                  {selectedConverterIds.length} Selected
                </span>
              </div>

              <div className="space-y-2.5">
                {converters.map((conv) => {
                  const isChecked = selectedConverterIds.includes(conv.id);
                  return (
                    <div
                      key={conv.id}
                      onClick={() => toggleConverter(conv.id)}
                      className={`card p-3.5 border-2 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check size={13} strokeWidth={3} />}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h5 className="text-xs font-black text-gray-900">{conv.name}</h5>
                              <span className="chip chip-green text-[9px] font-bold">
                                {conv.id === 'conv-greenpack' ? '96% Match' : conv.id === 'conv-nova' ? '98% Match' : '91% Match'}
                              </span>
                            </div>

                            <p className="text-[11px] text-gray-500 flex items-center gap-1">
                              <MapPin size={11} className="text-gray-400" />
                              {conv.location} · <strong className="text-gray-700">{conv.distance} km</strong>
                            </p>

                            <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1.5">
                              <span className="flex items-center gap-0.5 font-bold text-amber-600">
                                <Star size={11} className="fill-amber-400 text-amber-400" />
                                {conv.rating}★ ({conv.totalOrders})
                              </span>
                              <span className="flex items-center gap-0.5 text-gray-600">
                                <Clock size={11} /> Lead: {conv.leadTime} days
                              </span>
                              <span className="text-slate-600 font-medium">
                                {conv.certifications.slice(0, 2).join(' · ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget & Target Delivery Controls */}
            <div className="card p-4 space-y-3 bg-white border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    {t('Budget Ceiling (Max Price)', 'अधिकतम बजट')}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-500">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      value={budgetCeiling}
                      onChange={(e) => setBudgetCeiling(Number(e.target.value))}
                      className="form-input py-2 text-xs font-mono font-bold"
                    />
                    <span className="text-[10px] text-gray-400">/ bag</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    {t('Required Delivery By', 'डिलीवरी तारीख')}
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="form-input py-2 text-xs font-mono"
                  />
                </div>
              </div>
              <p className="text-[10px] text-gray-400">
                Converters quoting above ₹{budgetCeiling.toFixed(2)}/bag will be filtered automatically.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Sticky Bottom Broadcast CTA */}
      {!isSubmitted && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3.5 z-40 max-w-[430px] mx-auto">
          <button
            onClick={handleSendRFQ}
            disabled={selectedConverterIds.length === 0}
            className="btn-brand w-full py-3.5 text-xs font-bold disabled:opacity-50 cursor-pointer shadow-lg"
          >
            <Send size={15} />
            <span>
              {t(`Send RFQ to ${selectedConverterIds.length} Selected Converters`, `${selectedConverterIds.length} कन्वर्टर्स को RFQ भेजें`)}
            </span>
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-1.5">
            Will receive quotes in 2–24 hours · FSSAI certified suppliers only
          </p>
        </div>
      )}
    </div>
  );
};
