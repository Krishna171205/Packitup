import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame, Clock, ChevronRight, Zap, CheckCircle2,
  Calendar, Award, TrendingUp, Sliders, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const ConverterHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, converterRFQs, liveAuction, t } = useApp();

  // Simulated live countdown timer
  const [secondsLeft, setSecondsLeft] = useState(liveAuction.timeRemainingSec || 15796);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="screen">
      <TopBar />

      <div className="px-4 space-y-4 pt-2 pb-6">
        {/* Header & Plant Badge */}
        <div className="card p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
                <span>🏭</span> {user.organization || 'My Plant: GreenPack Films Okhla'}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                {t(`Namaste, ${user.name.split(' ')[0]}!`, `नमस्ते, ${user.name.split(' ')[0]}!`)}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {t('Ready to quote on high-margin food packaging RFQs today.', 'आज के हाई-मार्जिन पैकेजिंग RFQs के लिए तैयार।')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🏭
            </div>
          </div>

          {/* Machine Badges */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('Active Machine Lines (Automated Matching)', 'सक्रिय मशीन लाइनें')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'LDPE Blown', active: true },
                { name: 'PET Lamination', active: true },
                { name: 'MAP Micro-perf', active: true },
                { name: 'EVOH Co-ex', active: true },
              ].map((badge) => (
                <span
                  key={badge.name}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                >
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live RFQ Alert Banner (Pulsing Green) */}
        <div
          onClick={() => navigate('/app/converter/rfqs')}
          className="relative overflow-hidden rounded-2xl p-4 bg-emerald-950 border border-emerald-500/40 text-white cursor-pointer transition-all hover:border-emerald-400 shadow-md group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <Zap size={15} className="text-amber-400 fill-amber-400" />
                  {t('3 New RFQs match your machines', '3 नए RFQ आपकी मशीनों से मेल खाते हैं')}
                </p>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {t('High win-rate banana & mango export batches — respond now', 'केला और आम निर्यात बैच — अभी कोट भेजें')}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Converter Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3.5 border-l-4 border-l-blue-500">
            <span className="text-[11px] font-bold text-gray-500">{t('Active Bids', 'सक्रिय बोलियां')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">4</span>
              <span className="chip chip-blue text-[10px]">2 Winning</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">₹84,200 pending quote pool</p>
          </div>

          <div className="card p-3.5 border-l-4 border-l-amber-500">
            <span className="text-[11px] font-bold text-gray-500">{t('In Production', 'उत्पादन में')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">2</span>
              <span className="chip chip-amber text-[10px]">On Track</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Delivery in 3–5 days</p>
          </div>

          <div className="card p-3.5 border-l-4 border-l-emerald-500">
            <span className="text-[11px] font-bold text-gray-500">{t('This Month Revenue', 'इस माह का राजस्व')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">₹2.4L</span>
              <span className="chip chip-green text-[10px]">+22%</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Target: ₹3.0L monthly</p>
          </div>

          <div className="card p-3.5 border-l-4 border-l-purple-500">
            <span className="text-[11px] font-bold text-gray-500">{t('Quote Win Rate', 'जीत दर')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">68%</span>
              <span className="chip chip-slate text-[10px] text-purple-700 bg-purple-100">Top 5%</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Due to fast turnaround</p>
          </div>
        </div>

        {/* Active Smart Plan Auctions */}
        <div>
          <div className="section-header">
            <div className="flex items-center gap-1.5">
              <Flame size={16} className="text-red-500 fill-red-500" />
              <span className="section-title">{t('Active Live Auctions', 'सक्रिय लाइव नीलामी')}</span>
            </div>
            <button onClick={() => navigate('/app/converter/auctions')} className="section-link">
              {t('View all', 'सभी देखें')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {/* Tile 1: Banana Smart Plan Auction */}
            <div
              onClick={() => navigate('/app/projects/proj-banana-1/bidding')}
              className="card card-hover p-4 border border-amber-200 bg-gradient-to-r from-amber-50/70 to-white"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">🍌</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-gray-900">Banana (Cavendish) — 500 Bags</h4>
                      <span className="chip chip-amber text-[10px] font-bold">Smart Plan</span>
                    </div>
                    <p className="text-xs text-gray-500">Sonipat Packhouse · 12µm PET + 40µm LDPE</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold font-mono">
                    <Clock size={11} />
                    {formatTimer(secondsLeft)}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Closes today</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-100 text-xs">
                <div>
                  <span className="text-gray-500">Lowest Bid: </span>
                  <span className="font-black text-emerald-600">₹{liveAuction.currentLowestBid.toFixed(2)}/bag</span>
                  <span className="text-gray-400 text-[10px]"> (6 bids)</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/app/projects/proj-banana-1/bidding');
                  }}
                  className="btn-brand py-1.5 px-3 text-xs rounded-lg"
                >
                  {t('Bid Now', 'बोली लगाएं')}
                </button>
              </div>
            </div>

            {/* Tile 2: Grapes Auction */}
            <div
              onClick={() => navigate('/app/converter/rfqs')}
              className="card card-hover p-4 border border-blue-200 bg-gradient-to-r from-blue-50/60 to-white"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl shrink-0">🍇</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-gray-900">Grapes Export — 3,000 Pouches</h4>
                      <span className="chip chip-blue text-[10px] font-bold">Shelf-Life</span>
                    </div>
                    <p className="text-xs text-gray-500">Nashik FPO Depot · BOPP Micro-perf + SO2 Pocket</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                    <Clock size={11} />
                    08:14:02
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Tomorrow</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-100 text-xs">
                <div>
                  <span className="text-gray-500">Current Best: </span>
                  <span className="font-black text-blue-700">₹2.45/pouch</span>
                  <span className="text-emerald-600 font-semibold text-[10px]"> (You lead)</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/app/converter/rfqs');
                  }}
                  className="btn-outline py-1.5 px-3 text-xs rounded-lg"
                >
                  {t('View Quote', 'कोट देखें')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New RFQs List */}
        <div>
          <div className="section-header">
            <span className="section-title">{t('New RFQs for You', 'आपके लिए नए RFQ')}</span>
            <button onClick={() => navigate('/app/converter/rfqs')} className="section-link">
              {t('See All RFQs', 'सभी RFQ देखें')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            {converterRFQs.slice(0, 3).map((rfq) => (
              <div
                key={rfq.id}
                onClick={() => navigate('/app/converter/rfqs')}
                className="card card-hover p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                    {rfq.commodityEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-gray-900">{rfq.commodityName}</p>
                      <span className="chip chip-green text-[10px]">{rfq.matchScore}% Match</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate max-w-[210px]">
                      {rfq.quantityUnits} units · {rfq.specRequirement}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      OTR: {rfq.otrRequired} · {rfq.distanceKm} km away
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Today's Production Calendar */}
        <div className="card p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {t("Today's Production Schedule", 'आज का उत्पादन शेड्यूल')}
              </h4>
            </div>
            <span className="text-[11px] text-gray-400">Okhla Plant Line A & B</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="font-bold text-gray-800">Batch #PKU-9921: Banana MAP Film</p>
                  <p className="text-[10px] text-gray-400">500 units · Slitting & Micro-perforation</p>
                </div>
              </div>
              <span className="font-mono text-gray-600 font-bold">11:00 AM – 02:00 PM</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <div>
                  <p className="font-bold text-gray-800">Batch #PKU-8814: Tomato Anti-fog Pouches</p>
                  <p className="text-[10px] text-gray-400">1,200 units · Extrusion & Gusseting</p>
                </div>
              </div>
              <span className="font-mono text-gray-600 font-bold">03:30 PM – 06:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
