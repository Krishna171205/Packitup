import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Eye, MessageSquare, ChevronRight,
  Sparkles, Layers, DollarSign, ArrowUpRight, BarChart3, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const MaterialProducerHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, materialProducers, t } = useApp();
  const producer = materialProducers[0];

  return (
    <div className="screen">
      <TopBar />

      <div className="px-4 space-y-4 pt-2 pb-6">
        {/* Header Hero */}
        <div className="card p-5 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-2">
                <span>🧪</span> {user.organization || 'Reliance Polymers Division'}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                {t(`Polymer Desk: ${user.name.split(' ')[0]}`, `पॉलिमर डेस्क: ${user.name.split(' ')[0]}`)}
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                {t('Supplying food-grade resins to 48 certified converters across NCR & Gujarat.', 'एनसीआर और गुजरात में 48 प्रमाणित कन्वर्टर्स को खाद्य-ग्रेड रेजिन आपूर्ति।')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🧪
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-purple-300">Hub Delivery Status</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={13} /> Pan-India Next-Day Hub Active
            </span>
          </div>
        </div>

        {/* Demand Intelligence Card */}
        <div className="card p-4 border border-purple-200 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
              <TrendingUp size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="chip chip-purple text-[10px] bg-purple-100 text-purple-800 font-bold uppercase tracking-wider">
                  {t('AI Demand Intelligence', 'AI मांग विश्लेषण')}
                </span>
                <span className="text-[11px] font-bold text-purple-700">+34% this week</span>
              </div>
              <h4 className="text-sm font-extrabold text-gray-900 leading-snug">
                {t('EVOH & High-Barrier demand up 34% — Mango & Grape export surge', 'EVOH और हाई-बैरियर मांग में 34% उछाल — आम और अंगूर निर्यात सीजन')}
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Converters in Okhla, Kundli & Noida are securing APEDA-compliant barrier resins for cold-chain season.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3.5 border-l-4 border-l-purple-500">
            <span className="text-[11px] font-bold text-gray-500">{t('Active Inquiries', 'सक्रिय पूछताछ')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">{producer.activeInquiriesCount}</span>
              <span className="chip chip-blue text-[10px]">New</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">5 converters in last 7 days</p>
          </div>

          <div className="card p-3.5 border-l-4 border-l-emerald-500">
            <span className="text-[11px] font-bold text-gray-500">{t('Catalog Views', 'कैटलॉग व्यूज')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">1,222</span>
              <span className="chip chip-green text-[10px]">+48%</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">From PACKITUP converters</p>
          </div>
        </div>

        {/* My Catalog Top Products */}
        <div>
          <div className="section-header">
            <span className="section-title">{t('My Resin & Film Catalog', 'मेरा कैटलॉग')}</span>
            <button onClick={() => navigate('/app/material/catalog')} className="section-link">
              {t('Full Catalog', 'पूरा देखें')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            {producer.materials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => navigate('/app/material/catalog')}
                className="card card-hover p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{mat.name}</h4>
                    <p className="text-xs text-gray-500">{mat.grade} · MOQ: {mat.moqTonnes} MT</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-purple-700">₹{mat.pricePerKg}</span>
                    <span className="text-xs text-gray-400"> / kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye size={12} className="text-gray-400" /> {mat.viewsThisWeek} views
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-purple-700">
                    <MessageSquare size={12} /> {mat.inquiriesThisWeek} inquiries
                  </span>
                  <span className="chip chip-green text-[10px] font-bold">{mat.demandTrend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Benchmark vs Market Average */}
        <div className="card p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-emerald-600" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {t('Market Price Benchmark', 'बाजार मूल्य तुलना')}
              </h4>
            </div>
            <span className="text-[11px] text-gray-400">NCR Hub Avg</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="font-semibold text-gray-700">LDPE Film Grade MFI 2.0</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Market: ₹95/kg</span>
                <span className="font-black text-emerald-600">You: ₹92/kg (★ Competitive)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="font-semibold text-gray-700">HDPE Tenacity MFI 0.3</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Market: ₹89/kg</span>
                <span className="font-black text-emerald-600">You: ₹88/kg</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="font-semibold text-gray-700">EVOH Ultra-Barrier Masterbatch</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Market: ₹295/kg</span>
                <span className="font-black text-emerald-600">You: ₹285/kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Season Forecast Alert */}
        <div className="card p-4 bg-amber-50/80 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              📅
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-0.5">
                {t('Upcoming Demand Spike Forecast', 'आगामी मांग का पूर्वानुमान')}
              </p>
              <h5 className="text-sm font-extrabold text-amber-950">
                {producer.demandForecast.expectedPeak}: {producer.demandForecast.material} ({producer.demandForecast.trend})
              </h5>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                {producer.demandForecast.reason}. Recommend locking inventory with regional converters now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
