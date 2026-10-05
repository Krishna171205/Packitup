import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles, Leaf, ShieldCheck, Factory, QrCode, Clock } from 'lucide-react';

interface SlideData {
  id: number;
  tag: string;
  badgeIcon: typeof Leaf;
  badgeText: string;
  statText: string;
  title: string;
  subtitle: string;
  image: string;
  benefits: string[];
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: 'AI Formulation',
    badgeIcon: Leaf,
    badgeText: '100% Compostable',
    statText: '98% Freshness Retained',
    title: 'Intelligent Packaging for a Healthier Food Chain',
    subtitle: 'Get the optimal barrier material, structural design, and verified Indian converters — powered by AI.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Reduces post-harvest produce spoilage by up to 40%',
      'Tailored for Indian mandi transit & climate variations',
      'Zero non-recyclable plastic waste',
    ],
  },
  {
    id: 2,
    tag: 'Barrier Science',
    badgeIcon: Clock,
    badgeText: 'Extended Shelf Life',
    statText: '+14 Days Guaranteed',
    title: 'Precision Barrier & Shelf-Life Engineering',
    subtitle: 'Scientific modeling of crop respiration rates, oxygen transmission (OTR), and moisture vapor barriers (WVTR).',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Equilibrium Modified Atmosphere Packaging (EMAP)',
      'Anti-fog & natural antimicrobial bio-coatings',
      'Calibrated for non-reefer ambient transit',
    ],
  },
  {
    id: 3,
    tag: 'Converter Network',
    badgeIcon: Factory,
    badgeText: 'Audited Converters',
    statText: 'Low ₹15,000 MOQs',
    title: 'Direct Access to Certified Eco-Converters',
    subtitle: 'Skip middlemen. Request quotes, negotiate real-time auctions, and order direct from verified converters.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Direct factory rates without middleman markup',
      'CIPET & ISO 17025 accredited compliance certificates',
      'Instant RFQ comparison & multi-supplier bidding',
    ],
  },
  {
    id: 4,
    tag: 'Digital Passport',
    badgeIcon: QrCode,
    badgeText: 'Dynamic Batch QR',
    statText: 'Tamper-Evident Trace',
    title: 'Farm-to-Fork Digital QR Traceability',
    subtitle: 'Empower retail buyers and consumers with farm-origin verification, harvest timestamps, and temperature logs.',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Instant origin, harvest date & packing batch scan',
      'Cold-chain temperature excursion alerts',
      'Consumer trust ratings & quality feedback loop',
    ],
  },
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/role-selection');
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="min-h-screen bg-white text-gray-900 select-none flex flex-col justify-between p-6 sm:p-10 max-w-xl mx-auto w-full relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#f1f7f4] rounded-full blur-3xl pointer-events-none opacity-80" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pt-2 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0f4028] flex items-center justify-center text-white shadow-sm shadow-[#0f4028]/20">
            <span className="font-extrabold text-sm">P</span>
          </div>
          <div>
            <span className="text-xs font-black tracking-wider uppercase text-[#0f4028] block">Packit Up</span>
            <span className="text-[10px] font-semibold text-gray-400">AI Agri-Packaging</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/role-selection')}
          className="text-xs font-bold text-gray-400 hover:text-[#0f4028] transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Body */}
      <div className="relative z-10 my-auto flex flex-col items-center py-4">
        {/* Visual Showcase Card */}
        <div className="relative w-full max-w-sm h-64 sm:h-72 mb-8 flex items-center justify-center">
          {/* Card Container */}
          <div className="relative z-10 w-full h-full rounded-[36px] bg-white border border-gray-100 shadow-[0_16px_45px_-12px_rgba(15,64,40,0.12)] overflow-hidden p-3.5 group">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-[28px] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle dark gradient overlay on bottom of image for readability */}
            <div className="absolute inset-x-3.5 bottom-3.5 h-24 bg-gradient-to-t from-black/60 to-transparent rounded-b-[28px] pointer-events-none" />

            {/* Bottom floating stat inside image */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <span className="text-xs font-bold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {slide.statText}
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                {slide.tag}
              </span>
            </div>
          </div>

          {/* Floating Top-Right Badge */}
          <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1.5 bg-[#0f4028] text-white px-3.5 py-1.5 rounded-full shadow-lg shadow-[#0f4028]/30 animate-pulse">
            <BadgeIcon size={14} className="text-emerald-300" />
            <span className="text-xs font-extrabold tracking-tight">{slide.badgeText}</span>
          </div>

          {/* Floating Botanical Leaf Accents */}
          <div className="absolute -top-3 left-4 text-2xl select-none animate-bounce" style={{ animationDuration: '3.2s' }}>
            🍃
          </div>
          <div className="absolute -bottom-3 -left-2 text-xl select-none animate-bounce" style={{ animationDuration: '2.8s' }}>
            🌱
          </div>
        </div>

        {/* Text Area */}
        <div className="w-full text-center px-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#f1f7f4] text-[#165c3a] text-[11px] font-extrabold uppercase tracking-wider mb-3">
            {slide.tag}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto mb-6">
            {slide.subtitle}
          </p>

          {/* Benefit Pills */}
          <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
            {slide.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50/80 border border-gray-100"
              >
                <div className="w-4 h-4 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
                  <Check size={11} strokeWidth={3} />
                </div>
                <span className="text-xs font-semibold text-gray-700 leading-none">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 pt-4 space-y-6">
        {/* Pagination Dots with Smooth Indicator */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-8 bg-[#0f4028]'
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-3">
          {current > 0 && (
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
              aria-label="Previous Slide"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-base transition-all shadow-lg shadow-[#0f4028]/25 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{current === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
