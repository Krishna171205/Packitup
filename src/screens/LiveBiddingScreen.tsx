import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Flame, Clock, ArrowRight, CheckCircle2, ShieldCheck,
  TrendingDown, DollarSign, Award, Bell, Sliders, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const LiveBiddingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { liveAuction, submitLiveBid, acceptLowestBid, user, t } = useApp();

  const [secondsRemaining, setSecondsRemaining] = useState<number>(liveAuction.timeRemainingSec || 15796);
  const [showAutoBidModal, setShowAutoBidModal] = useState<boolean>(false);
  const [autoBidLimit, setAutoBidLimit] = useState<number>(1.70);
  const [customBidInput, setCustomBidInput] = useState<string>('1.70');
  const [acceptedWinner, setAcceptedWinner] = useState<boolean>(false);

  // Live auction countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptBid = () => {
    acceptLowestBid();
    setAcceptedWinner(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas not supported
    }
  };

  const handlePlaceBid = () => {
    const val = parseFloat(customBidInput);
    if (!isNaN(val) && val > 0) {
      submitLiveBid(val);
      setCustomBidInput((val - 0.05).toFixed(2));
    }
  };

  return (
    <div className="screen pb-28">
      <TopBar title="Smart Plan Live Auction" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Live Auction Banner */}
        <div className="card p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white border-0 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
              {t('LIVE REVERSE AUCTION', 'लाइव रिवर्स नीलामी')}
            </span>
            <span className="chip chip-amber text-[10px] font-mono">
              Smart Plan #BAN-091
            </span>
          </div>

          <h2 className="text-lg font-black text-white leading-tight">
            {liveAuction.commodityName} — {liveAuction.batchQuantityUnits} Bags
          </h2>
          <p className="text-xs text-amber-200/80 mt-0.5">
            {liveAuction.packagingSpec}
          </p>

          {/* Countdown timer & progress */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock size={13} className="text-amber-400" />
                {t('Time Remaining:', 'शेष समय:')}
              </span>
              <span className="font-mono font-black text-amber-400 text-sm">
                {formatTimer(secondsRemaining)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                style={{ width: '82%' }}
              />
            </div>
          </div>
        </div>

        {/* Financial Savings Highlight Card */}
        <div className="card p-4 border border-emerald-300 bg-emerald-50/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">
              {t('Lowest Compliant Bid', 'न्यूनतम वैध बोली')}
            </span>
            <span className="chip chip-green text-[10px] font-bold">
              All 6 Converters = Technical Compliant ✓
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-950 font-mono">
              ₹{liveAuction.currentLowestBid.toFixed(2)}
              <span className="text-xs font-normal text-emerald-700"> / bag</span>
            </span>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">vs Budget: ₹{liveAuction.budgetCeiling.toFixed(2)}</span>
              <span className="text-sm font-extrabold text-emerald-700">
                Save ₹{liveAuction.savingsAmount.toFixed(2)}/bag ({liveAuction.savingsPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Accepted Winner Banner */}
        {acceptedWinner && (
          <div className="card p-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center space-y-2 animate-fade-up">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto text-xl">
              🎉
            </div>
            <h4 className="text-base font-black">
              {t('Bid Accepted! Production Initiated', 'बोली स्वीकार की गई! उत्पादन शुरू')}
            </h4>
            <p className="text-xs text-emerald-100">
              Order locked at <strong>₹{liveAuction.currentLowestBid.toFixed(2)}/bag</strong> with Nova Laminates & Pouches. Expected dispatch in 5 days.
            </p>
            <button
              onClick={() => navigate('/app/projects/proj-banana-1/order')}
              className="mt-2 py-2 px-4 rounded-xl bg-white text-emerald-800 font-bold text-xs inline-block"
            >
              {t('Track Order Timeline →', 'ऑर्डर ट्रैक करें →')}
            </button>
          </div>
        )}

        {/* Current Live Bids List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              {t('Current Live Bids (6 Converters)', 'वर्तमान बोलियां (6 कन्वर्टर्स)')}
            </h4>
            <span className="text-[10px] text-gray-500 font-mono">Real-time Feed</span>
          </div>

          <div className="space-y-2">
            {liveAuction.bids.map((b) => (
              <div
                key={b.id}
                className={`card p-3 flex items-center justify-between border transition-all ${
                  b.rank === 1
                    ? 'border-2 border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : b.isMyBid
                    ? 'border-blue-400 bg-blue-50/50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                      b.rank === 1
                        ? 'bg-emerald-600 text-white'
                        : b.rank === 2
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    #{b.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-gray-900">{b.converterName}</p>
                      {b.rank === 1 && (
                        <span className="chip chip-green text-[9px] font-bold">★ Lowest</span>
                      )}
                      {b.isMyBid && (
                        <span className="chip chip-blue text-[9px] font-bold">You</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 truncate max-w-[210px]">{b.notes}</p>
                    <p className="text-[9px] text-gray-400 font-mono">
                      Lead: {b.leadTimeDays}d · MOQ: {b.moqUnits} · {b.timestamp}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black font-mono text-gray-900">
                    ₹{b.bidPerBag.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-gray-400 block">/ bag</span>
                  <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end">
                    <CheckCircle2 size={10} /> Spec ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Place a Bid or Counter Box (For Converter / Interactive Demo) */}
        <div className="card p-4 border border-blue-200 bg-blue-50/50 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-900">
              {t('Simulate Competitive Bid Counter', 'बोली काउंटर सिमुलेट करें')}
            </span>
            <span className="text-[10px] text-blue-600 font-bold">Demo Interactive</span>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
              <span className="text-xs font-bold text-gray-500">₹</span>
              <input
                type="number"
                step="0.02"
                value={customBidInput}
                onChange={(e) => setCustomBidInput(e.target.value)}
                className="w-full text-xs font-mono font-bold text-gray-900 outline-none"
              />
              <span className="text-[10px] text-gray-400">/ bag</span>
            </div>
            <button
              onClick={handlePlaceBid}
              className="btn-brand py-2 px-4 text-xs font-bold rounded-xl"
            >
              {t('Submit Bid', 'बोली लगाएं')}
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
          ⚠️ <strong>Auction closes in {formatTimer(secondsRemaining)}</strong>. The winning converter is automatically issued an encrypted smart escrow order once closed.
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      {!acceptedWinner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3.5 z-40 max-w-[430px] mx-auto flex gap-2">
          <button
            onClick={() => setShowAutoBidModal(true)}
            className="btn-outline flex-1 py-3 text-xs font-bold"
          >
            <Sliders size={14} />
            {t('Set Auto-Bid', 'ऑटो-बिड सेट करें')}
          </button>

          <button
            onClick={handleAcceptBid}
            className="btn-brand flex-1 py-3 text-xs font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
          >
            <Check size={16} />
            {t('Accept Lowest Bid Now', 'न्यूनतम बोली स्वीकारें')}
          </button>
        </div>
      )}

      {/* Auto-Bid Modal */}
      {showAutoBidModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4">
          <div className="card p-5 bg-white w-full max-w-sm rounded-3xl space-y-3 animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-gray-900">
                {t('Configure AI Auto-Bidding Rule', 'AI ऑटो-बिडिंग नियम')}
              </h3>
              <button
                onClick={() => setShowAutoBidModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              PACKITUP will automatically outbid competitors by ₹0.05/bag until your floor limit is hit.
            </p>
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Minimum Floor Limit:
              </label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="font-bold text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.05"
                  value={autoBidLimit}
                  onChange={(e) => setAutoBidLimit(Number(e.target.value))}
                  className="w-full text-sm font-mono font-bold text-gray-900 bg-transparent outline-none"
                />
                <span className="text-xs text-gray-400">/ bag</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowAutoBidModal(false);
                submitLiveBid(autoBidLimit);
              }}
              className="btn-brand w-full py-3 text-xs font-bold"
            >
              Activate Auto-Bidding Agent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
