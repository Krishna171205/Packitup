import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, AlertTriangle, CheckCircle2, ChevronRight,
  Thermometer, Navigation, ShieldCheck, QrCode, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const TransporterHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, transporterShipments, t } = useApp();

  return (
    <div className="screen">
      <TopBar />

      <div className="px-4 space-y-4 pt-2 pb-6">
        {/* Header Hero */}
        <div className="card p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-700 text-slate-200 border border-slate-600 mb-2">
                <span>🚛</span> {user.organization || 'ColdSpeed Reefer Fleet'}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                {t(`Fleet Hub: ${user.name.split(' ')[0]}`, `लॉजिस्टिक्स हब: ${user.name.split(' ')[0]}`)}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {t('Monitoring Reefer temperature telemetry & transit compatibility.', 'रीफर तापमान टेलीमेट्री और पारगमन अनुकूलता की निगरानी।')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🚛
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">Fleet Operations</span>
            <span className="font-bold text-emerald-400">35 Active Reefers · 2 in Transit</span>
          </div>
        </div>

        {/* Temperature Alert Card (Breach Detected) */}
        <div className="card p-4 border border-red-300 bg-red-50/90 shadow-sm animate-pulse-gentle">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Thermometer size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-800 bg-red-200 px-2 py-0.5 rounded-md">
                  {t('Cold Chain Breach Alert', 'कोल्ड चेन अलर्ट')}
                </span>
                <span className="text-xs font-mono font-black text-red-700">16.8°C (+1.8°C)</span>
              </div>
              <h4 className="text-sm font-extrabold text-red-950">
                Shipment PKU-2026-084 · Banana MAP Batch
              </h4>
              <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
                Sensor log at Kundli Toll Plaza (NH-44): Ambient solar heat breach. MAP film pressure rising. Adjust reefer thermostat to 13°C immediately.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => navigate('/app/transporter/shipments')}
                  className="btn-brand py-1.5 px-3 text-xs bg-red-600 hover:bg-red-700"
                >
                  {t('Notify Driver', 'ड्राइवर को सूचित करें')}
                </button>
                <button
                  onClick={() => navigate('/app/transporter/check')}
                  className="btn-outline py-1.5 px-3 text-xs bg-white text-red-800 border-red-200"
                >
                  {t('Check Barrier Risk', 'जोखिम जांचें')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Compatibility Checker Card */}
        <div
          onClick={() => navigate('/app/transporter/check')}
          className="card card-hover p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white border-0 cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-xl shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  {t('Packaging Transit Compatibility Tool', 'पारगमन अनुकूलता उपकरण')}
                </h4>
                <p className="text-xs text-blue-200 mt-0.5">
                  {t('Check if your truck temperature & distance suits this film', 'जांचें कि क्या आपका ट्रक तापमान और दूरी इस पैकेजिंग के अनुकूल है')}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-blue-300" />
          </div>
        </div>

        {/* Active Shipments Row */}
        <div>
          <div className="section-header">
            <span className="section-title">{t('Active Shipments (2)', 'सक्रिय शिपमेंट (2)')}</span>
            <button onClick={() => navigate('/app/transporter/shipments')} className="section-link">
              {t('Live Map', 'लाइव मैप')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            {transporterShipments.map((ship) => (
              <div
                key={ship.id}
                onClick={() => navigate('/app/transporter/shipments')}
                className="card card-hover p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{ship.commodityEmoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{ship.commodityName}</h4>
                      <p className="text-xs text-gray-500 font-mono">{ship.shipmentCode} · {ship.packagingType}</p>
                    </div>
                  </div>
                  <span
                    className={`chip text-[10px] font-bold ${
                      ship.status === 'Breach Alert' ? 'chip-red' : 'chip-green'
                    }`}
                  >
                    {ship.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-2.5 text-xs text-gray-600 space-y-1 my-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Route:</span>
                    <span className="font-bold text-gray-800">{ship.source.split(',')[0]} → {ship.destination.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPS Position:</span>
                    <span className="font-medium text-blue-700 flex items-center gap-1">
                      <Navigation size={10} /> {ship.gpsLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Core Temp:</span>
                    <span className={`font-mono font-bold ${ship.status === 'Breach Alert' ? 'text-red-600' : 'text-emerald-600'}`}>
                      {ship.currentTemp}°C (Optimal: {ship.targetTempRange})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck size={13} /> APEDA Compliant
                  </span>
                  <span className="text-blue-600 font-bold">Track GPS Telemetry →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="card p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {t('Upcoming Packhouse Pickups (3)', 'आगामी पिकअप (3)')}
            </h4>
            <span className="text-[11px] text-gray-400">PACKITUP Network</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">FreshRoots Packhouse, Gurugram</p>
                <p className="text-[10px] text-gray-400">3,000 kg Alphonso Mangoes · 05:00 PM Today</p>
              </div>
              <span className="chip chip-blue text-[10px]">Confirmed</span>
            </div>

            <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">GreenField FPO Hub, Sonipat</p>
                <p className="text-[10px] text-gray-400">500 kg Cavendish Bananas · 07:30 PM Today</p>
              </div>
              <span className="chip chip-green text-[10px]">Ready</span>
            </div>
          </div>
        </div>

        {/* Cold Chain Compliance Certificates */}
        <div className="card p-4 bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h5 className="text-xs font-bold text-emerald-950">
                {t('18 Cold Chain Certificates Generated This Month', 'इस माह 18 कोल्ड चेन प्रमाणपत्र जारी किए गए')}
              </h5>
              <p className="text-[11px] text-emerald-700">Digital sensor logs verified for APEDA & FSSAI exports</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-emerald-700" />
        </div>
      </div>
    </div>
  );
};
