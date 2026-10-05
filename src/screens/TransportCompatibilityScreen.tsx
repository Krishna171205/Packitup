import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, Thermometer, ShieldCheck, AlertTriangle, CheckCircle2,
  Navigation, Clock, ArrowRight, Sparkles, Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { COMMODITIES } from '../data/mockData';

export const TransportCompatibilityScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  const [commodityId, setCommodityId] = useState<string>('banana');
  const [packagingType, setPackagingType] = useState<string>('12µm PET + 40µm LDPE Micro-perf MAP');
  const [distanceKm, setDistanceKm] = useState<number>(320);
  const [durationHours, setDurationHours] = useState<number>(14);
  const [ambientTemp, setAmbientTemp] = useState<number>(38);
  const [vehicleType, setVehicleType] = useState<'ambient' | 'reefer' | 'reefer_plus'>('reefer');

  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  // Compute compatibility risk
  const isHighRisk = vehicleType === 'ambient' && ambientTemp >= 35;
  const isModerateRisk = vehicleType === 'ambient' && ambientTemp < 35 && durationHours > 8;

  const preservedDays = isHighRisk ? 5.4 : isModerateRisk ? 7.8 : 11.6;
  const totalDays = 14;

  return (
    <div className="screen pb-24">
      <TopBar title="Transit Packaging Checker" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Header */}
        <div>
          <span className="chip chip-blue text-[10px] font-black uppercase tracking-wider mb-1">
            Logistics Safety Verification
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
            {t('Transit Packaging Compatibility', 'पारगमन पैकेजिंग अनुकूलता')}
          </h2>
          <p className="text-xs text-gray-500">
            Check if your truck type and temperature profile preserves the film's barrier barrier integrity.
          </p>
        </div>

        {/* Input Parameters Form */}
        <div className="card p-4 space-y-3 bg-white border border-gray-200">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {t('I am Transporting Commodity:', 'वस्तु:')}
            </label>
            <select
              value={commodityId}
              onChange={(e) => setCommodityId(e.target.value)}
              className="form-input text-xs font-bold"
            >
              {COMMODITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {t('Packaging Structure:', 'पैकेजिंग संरचना:')}
            </label>
            <select
              value={packagingType}
              onChange={(e) => setPackagingType(e.target.value)}
              className="form-input text-xs"
            >
              <option value="12µm PET + 40µm LDPE Micro-perf MAP">12µm PET + 40µm LDPE Micro-perf MAP</option>
              <option value="LDPE 30µm Ventilated Liner">LDPE 30µm Ventilated Liner</option>
              <option value="PET / EVOH / PE High Barrier Pouch">PET / EVOH / PE High Barrier Pouch</option>
              <option value="BOPP 25µm Metallized Film">BOPP 25µm Metallized Film</option>
              <option value="Unlined Jute Sack / Plastic Crate">Unlined Jute Sack / Plastic Crate</option>
            </select>
          </div>

          {/* Route details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Distance (km)</label>
              <input
                type="number"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="form-input text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Duration (Hours)</label>
              <input
                type="number"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="form-input text-xs font-mono font-bold"
              />
            </div>
          </div>

          {/* Temp & Vehicle */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-gray-600">Predicted Ambient Temp (°C)</label>
              <span className="text-xs font-bold text-red-600 font-mono">{ambientTemp}°C</span>
            </div>
            <input
              type="range"
              min="15"
              max="48"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">
              {t('My Vehicle Capability:', 'वाहन प्रकार:')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ambient', label: 'Ambient Truck', desc: 'No Cooling' },
                { id: 'reefer', label: 'Reefer Van', desc: '2°C–8°C / 13°C' },
                { id: 'reefer_plus', label: 'Deep Reefer', desc: '-18°C Frozen' },
              ].map((veh) => (
                <button
                  key={veh.id}
                  type="button"
                  onClick={() => setVehicleType(veh.id as any)}
                  className={`p-2 rounded-xl text-center border cursor-pointer ${
                    vehicleType === veh.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <p className="text-xs leading-tight">{veh.label}</p>
                  <span className="text-[9px] text-gray-400 block mt-0.5">{veh.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setHasEvaluated(true)}
            className="btn-brand w-full py-3 text-xs font-bold rounded-xl mt-2"
          >
            {t('Check Transit Compatibility', 'अनुकूलता जांचें')}
          </button>
        </div>

        {/* Compatibility Results */}
        {hasEvaluated && (
          <div className="space-y-3 animate-fade-in">
            {/* Verdict Card */}
            <div
              className={`card p-4 border-2 ${
                isHighRisk
                  ? 'border-red-400 bg-red-50/70'
                  : isModerateRisk
                  ? 'border-amber-400 bg-amber-50/70'
                  : 'border-emerald-400 bg-emerald-50/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`chip font-bold text-xs ${
                    isHighRisk
                      ? 'chip-red'
                      : isModerateRisk
                      ? 'chip-amber'
                      : 'chip-green'
                  }`}
                >
                  {isHighRisk
                    ? '⚠️ High Risk of Barrier Failure'
                    : isModerateRisk
                    ? '⚠️ Moderate Risk — Adjust Temperature'
                    : '✅ Compatible — Low Risk'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-600">
                  {preservedDays} of {totalDays} Days Preserved
                </span>
              </div>

              <div className="space-y-1">
                <div className="progress-track h-2">
                  <div
                    className={`progress-fill ${
                      isHighRisk
                        ? 'bg-red-500'
                        : isModerateRisk
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(preservedDays / totalDays) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="card p-4 space-y-2 bg-white border border-gray-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
                {t('AI Transit Prescriptions:', 'AI पारगमन सुझाव:')}
              </h4>

              <div className="space-y-1.5 text-xs text-gray-700">
                <p className="flex items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Pre-cool cargo to <strong>8°C</strong> before loading into transport bay.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Avoid direct solar radiation onto secondary outer stretch wrap.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Log Bluetooth core temperature telemetry every 4 hours for APEDA audit.</span>
                </p>
              </div>
            </div>

            {/* Risk Factors Breakdown */}
            {(isHighRisk || isModerateRisk) && (
              <div className="card p-4 space-y-2 bg-amber-50/70 border border-amber-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-700" />
                  {t('Detected Risk Factors [2]', 'जोखिम कारक [2]')}
                </h4>

                <div className="space-y-1 text-xs text-amber-900">
                  <p>
                    ⚠️ <strong>Ambient temp {ambientTemp}°C predicted:</strong> Without reefer chilling, respiration rate surges 4x, causing rapid O₂ starvation inside film.
                  </p>
                  <p>
                    ⚠️ <strong>{durationHours}h journey duration:</strong> Exceeds safe threshold for ventilated films at &gt;32°C. Upgrade to active Reefer van recommended.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
