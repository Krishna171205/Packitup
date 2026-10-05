import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2, Star, Sparkles, TrendingDown, ArrowRight,
  ShieldCheck, Award, AlertTriangle, Camera, UploadCloud,
  Check, ThumbsUp, RefreshCw, ThumbsDown, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

const FAILURE_MODES = [
  { id: 'moisture', label: 'Moisture ingress / Sogginess' },
  { id: 'seal', label: 'Seal failure / Open seams' },
  { id: 'physical', label: 'Physical damage (tear/puncture)' },
  { id: 'odour', label: 'Off odour from packaging' },
  { id: 'mold', label: 'Mold / fungal growth' },
  { id: 'ripening', label: 'Premature ripening' },
  { id: 'none', label: 'No issues — performed as expected' },
];

export const PerformanceFeedbackScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getActiveProject, activeProjectId, totalFeedbackSubmitted, recordFlywheelFeedback, t } = useApp();
  const project = getActiveProject();

  const [actualShelfLife, setActualShelfLife] = useState<number>(14);
  const predictedShelfLife = project?.targetShelfLifeDays || 12;

  const [selectedFailures, setSelectedFailures] = useState<string[]>(['none']);
  const [uploadedPhoto, setUploadedPhoto] = useState<boolean>(true);
  const [recommendChoice, setRecommendChoice] = useState<'yes' | 'no' | 'modified'>('yes');
  const [satisfactionRating, setSatisfactionRating] = useState<number>(5);
  const [userNotes, setUserNotes] = useState<string>(
    'Bananas reached Azadpur Mandi on day 14 with firm green crowns and zero moisture rot. Micro-perforations performed exceptionally.'
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleFailure = (fId: string) => {
    if (fId === 'none') {
      setSelectedFailures(['none']);
      return;
    }
    setSelectedFailures((prev) => {
      const filtered = prev.filter((x) => x !== 'none');
      return filtered.includes(fId)
        ? filtered.filter((x) => x !== fId)
        : [...filtered, fId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordFlywheelFeedback(satisfactionRating);
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="screen pb-24">
      <TopBar title="Performance Feedback Loop" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Header Hero */}
        <div>
          <span className="chip chip-green text-[10px] font-black uppercase tracking-wider mb-1">
            Data Flywheel Reinforcement
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
            {t('Post-Harvest Feedback Report', 'फसल कटाई बाद प्रदर्शन रिपोर्ट')}
          </h2>
          <p className="text-xs text-gray-500">
            {project?.foodName || 'Banana (Cavendish)'} · Batch #PKU-2026-BAN-00234
          </p>
        </div>

        {/* Post-Submit Success Screen */}
        {isSubmitted ? (
          <div className="card p-6 bg-white border border-emerald-300 text-center space-y-4 shadow-md animate-fade-up">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <div>
              <span className="chip chip-green text-[10px] font-bold uppercase tracking-wider mb-1">
                Flywheel Data Ingested
              </span>
              <h3 className="text-lg font-black text-gray-900">
                {t('Thank You for Closing the Feedback Loop!', 'फीडबैक दर्ज करने के लिए धन्यवाद!')}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Your real-world observations directly refine PACKITUP AI's respiration models for farmers in your district.
              </p>
            </div>

            {/* Flywheel Impact Counter */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-left space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                <Sparkles size={15} />
                <span>Regional AI Flywheel Counter</span>
              </div>
              <p className="text-2xl font-black text-emerald-950 font-mono">
                {(totalFeedbackSubmitted + 1).toLocaleString()}
                <span className="text-xs font-normal text-emerald-700 font-sans"> data points collected this season</span>
              </p>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Your feedback improved local OTR accuracy by <strong>+0.2%</strong> for northern Cavendish banana harvests.
              </p>
            </div>

            <button
              onClick={() => navigate('/app/home')}
              className="btn-brand w-full py-3.5 text-xs font-bold"
            >
              {t('Back to Dashboard', 'डैशबोर्ड पर वापस जाएं')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Shelf life achieved (Actual vs Predicted) */}
            <div className="card p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  {t('1. Shelf Life Achieved', '1. वास्तविक शेल्फ लाइफ')}
                </label>
                <span className="chip chip-green text-[10px] font-bold font-mono">
                  {actualShelfLife} Days Actual
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-400 block">AI Predicted Target:</span>
                  <span className="font-mono font-black text-gray-700 text-sm">{predictedShelfLife} Days</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block font-semibold">Field Outcome:</span>
                  <span className="font-mono font-black text-emerald-800 text-sm">+{actualShelfLife - predictedShelfLife} extra days!</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                  <span>Actual days in marketable condition:</span>
                  <strong className="text-emerald-700 font-mono">{actualShelfLife} Days</strong>
                </div>
                <input
                  type="range"
                  min="4"
                  max="25"
                  value={actualShelfLife}
                  onChange={(e) => setActualShelfLife(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            {/* 2. Failure Mode Checkboxes */}
            <div className="card p-4 space-y-2.5">
              <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider block">
                {t('2. Packaging Failure Modes (Select all that apply)', '2. पैकेजिंग विफलता मोड')}
              </label>

              <div className="space-y-1.5">
                {FAILURE_MODES.map((mode) => {
                  const isChecked = selectedFailures.includes(mode.id);
                  return (
                    <div
                      key={mode.id}
                      onClick={() => toggleFailure(mode.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? mode.id === 'none'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-red-400 bg-red-50 text-red-900 font-bold'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      <span className="text-xs">{mode.label}</span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? mode.id === 'none'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-red-600 border-red-600 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Photo Upload Simulation */}
            <div className="card p-4 space-y-2">
              <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider block">
                {t('3. Field Photo Proof', '3. फील्ड फोटो प्रमाण')}
              </label>

              <div
                onClick={() => setUploadedPhoto(true)}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50/50"
              >
                {uploadedPhoto ? (
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 text-left">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-2xl shrink-0">
                      🍌
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        IMG_20261002_banana_day14_crate.jpg
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={11} /> Verified Geotag: Sonipat Packhouse
                      </span>
                    </div>
                    <span className="chip chip-green text-[9px]">Loaded</span>
                  </div>
                ) : (
                  <div className="py-2 text-gray-500">
                    <Camera size={24} className="mx-auto text-gray-400 mb-1" />
                    <p className="text-xs font-bold text-gray-700">Tap to upload batch photo</p>
                    <p className="text-[10px] text-gray-400">JPG or PNG from harvest crate</p>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Would you recommend this packaging? */}
            <div className="card p-4 space-y-2">
              <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider block">
                {t('4. Would you recommend this packaging structure?', '4. क्या आप इस पैकेजिंग की सिफारिश करेंगे?')}
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yes', label: 'Yes ✓', sub: 'High confidence', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                  { id: 'modified', label: 'Modified ⚠️', sub: 'Tweak microns', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                  { id: 'no', label: 'No ✕', sub: 'Change material', color: 'border-red-500 bg-red-50 text-red-800' },
                ].map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => setRecommendChoice(rec.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      recommendChoice === rec.id
                        ? `${rec.color} font-bold shadow-xs`
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <span className="text-xs block font-bold">{rec.label}</span>
                    <span className="text-[9px] text-gray-500 block">{rec.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Farmer Notes */}
            <div className="card p-4 space-y-1.5">
              <label className="text-xs font-extrabold text-gray-800 uppercase tracking-wider block">
                {t('Field Notes & Observations', 'अवलोकन व टिप्पणियां')}
              </label>
              <textarea
                rows={2}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-brand w-full py-4 text-xs font-bold rounded-xl shadow-lg cursor-pointer"
            >
              <Send size={15} />
              <span>{t('Submit Post-Harvest Performance Log', 'प्रदर्शन लॉग सबमिट करें')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
