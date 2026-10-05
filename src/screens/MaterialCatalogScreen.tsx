import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, CheckCircle2, ShieldCheck, MessageSquare,
  Search, Filter, ChevronRight, Layers, ArrowRight, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { MaterialItem } from '../data/mockData';

export const MaterialCatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const { materialProducers, t } = useApp();

  const [inquireMaterial, setInquireMaterial] = useState<MaterialItem | null>(null);
  const [inquiryVolume, setInquiryVolume] = useState<number>(5);
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  const allMaterials: MaterialItem[] = materialProducers.flatMap((p) => p.materials);

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquireMaterial(null);
      setInquirySent(false);
    }, 1500);
  };

  return (
    <div className="screen pb-24">
      <TopBar title="Material Producer Catalog" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Demand Intelligence Panel */}
        <div className="card p-4 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 text-white border-0 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-300">
                {t('Regional Converter Demand Intelligence', 'क्षेत्रीय कनवर्टर मांग')}
              </h3>
            </div>
            <span className="chip chip-purple text-[10px] bg-purple-500/20 text-purple-300 border border-purple-400/30">
              Live AI Signal
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-snug">
            Based on active PACKITUP harvest recommendations this week, converters in your region require:
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[10px] text-purple-300 block">LDPE 30–50µm</span>
              <strong className="text-sm font-black text-white font-mono">12,000 m²</strong>
              <span className="text-[9px] text-emerald-400 block">+28% surge</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[10px] text-purple-300 block">PET 12µm</span>
              <strong className="text-sm font-black text-white font-mono">4,500 m²</strong>
              <span className="text-[9px] text-emerald-400 block">+14% surge</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[10px] text-purple-300 block">Breathable BOPP</span>
              <strong className="text-sm font-black text-white font-mono">2,800 m²</strong>
              <span className="text-[9px] text-emerald-400 block">+34% surge</span>
            </div>
          </div>
        </div>

        {/* Catalog List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              {t('Verified Resin & Polymer Products', 'सत्यापित पॉलिमर उत्पाद')}
            </h4>
            <span className="text-[11px] text-gray-400">FDA 21 CFR Food Safe</span>
          </div>

          <div className="space-y-3">
            {allMaterials.map((mat) => (
              <div
                key={mat.id}
                className="card p-4 border border-gray-200 bg-white space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-black text-gray-900 leading-tight">{mat.name}</h5>
                    <p className="text-xs font-medium text-purple-700">{mat.grade}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{mat.producerName}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-gray-900 font-mono">₹{mat.pricePerKg}</span>
                    <span className="text-[10px] text-gray-400 block">/ kg (negotiable)</span>
                    <span className="chip chip-green text-[9px] font-bold mt-1">In Stock ✓</span>
                  </div>
                </div>

                {/* Specs Box */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-400">OTR Range:</span>
                    <span className="font-bold text-gray-900">{mat.otr}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-400">WVTR Range:</span>
                    <span className="font-bold text-gray-900">{mat.wvtr}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-400">Width / Thickness:</span>
                    <span className="font-bold text-gray-900">{mat.widthRange} ({mat.thicknessRange})</span>
                  </div>
                  <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200">
                    <span className="text-gray-400">MOQ & Lead:</span>
                    <span className="font-bold text-purple-800">{mat.moqTonnes} MT · {mat.leadTimeDays} days dispatch</span>
                  </div>
                </div>

                {/* Certifications & Action */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {mat.certifications.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-semibold">
                        {c} ✓
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setInquireMaterial(mat)}
                    className="btn-brand py-1.5 px-4 text-xs font-bold rounded-xl"
                  >
                    <MessageSquare size={13} />
                    {t('Inquire', 'पूछताछ')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Modal */}
        {inquireMaterial && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4">
            <div className="card p-5 bg-white w-full max-w-sm rounded-3xl space-y-3 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">
                    {t('Direct Raw Material Inquiry', 'कच्चा माल पूछताछ')}
                  </h3>
                  <p className="text-[11px] text-gray-500">{inquireMaterial.name}</p>
                </div>
                <button
                  onClick={() => setInquireMaterial(null)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500"
                >
                  ✕
                </button>
              </div>

              {inquirySent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-center font-bold text-xs">
                  ✓ Inquiry dispatched directly to Reliance Polymers Division desk!
                </div>
              ) : (
                <form onSubmit={handleInquireSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Required Monthly Quantity (Metric Tonnes):
                    </label>
                    <input
                      type="number"
                      min={inquireMaterial.moqTonnes}
                      value={inquiryVolume}
                      onChange={(e) => setInquiryVolume(Number(e.target.value))}
                      className="form-input text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 text-[11px]">
                    Standard list rate: <strong>₹{inquireMaterial.pricePerKg}/kg</strong>. Volume tier pricing applied for orders &gt;10 MT.
                  </div>

                  <button
                    type="submit"
                    className="btn-brand w-full py-3 text-xs font-bold rounded-xl"
                  >
                    Submit Direct Quote Request
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
