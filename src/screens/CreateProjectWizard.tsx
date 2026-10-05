import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Leaf, Star, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreateProjectWizard: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveProjectId } = useApp();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [commodity, setCommodity] = useState('Tomatoes');
  const [quantity, setQuantity] = useState('500');
  const [unit, setUnit] = useState('kg');
  const [shelfLife, setShelfLife] = useState('15 days');
  const [transit, setTransit] = useState('Ambient');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setActiveProjectId('proj-tomato-1');
      navigate('/app/projects/proj-tomato-1/blueprint');
    }
  };

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
      {/* Top Header with Progress Line */}
      <div>
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <button
            onClick={() => (step === 2 ? setStep(1) : navigate('/app/home'))}
            className="w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#0a0f0d] cursor-pointer border border-[#e2ebe6]"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-bold text-[#6b8076]">
            {step === 1 ? '1/4' : '2/4'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#f2f6f4] h-1 mb-4">
          <div
            className="bg-[#0f4028] h-1 transition-all duration-300"
            style={{ width: step === 1 ? '25%' : '50%' }}
          />
        </div>

        {/* STEP 1: FORM INPUT */}
        {step === 1 ? (
          <div className="px-6 space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-extrabold text-[#0a0f0d] tracking-tight">
                Get Packaging Recommendation
              </h1>
              <p className="text-xs text-[#6b8076] mt-1">
                Tell us about your produce to calculate the exact barrier specs.
              </p>
            </div>

            <div className="space-y-4">
              {/* Field 1: What are you packaging? */}
              <div>
                <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                  What are you packaging?
                </label>
                <div className="relative">
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] appearance-none focus:outline-none focus:border-[#0f4028]"
                  >
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Bananas">Bananas</option>
                    <option value="Mangoes">Mangoes</option>
                    <option value="Apples">Apples</option>
                    <option value="Grapes">Grapes</option>
                    <option value="Potatoes">Potatoes</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94aaa0] pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Quantity */}
              <div>
                <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                  Quantity
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="flex-1 h-12 px-3.5 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] focus:outline-none focus:border-[#0f4028]"
                  />
                  <div className="relative w-28">
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full h-12 px-3 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] appearance-none focus:outline-none focus:border-[#0f4028]"
                    >
                      <option value="kg">kg</option>
                      <option value="ton">ton</option>
                      <option value="crates">crates</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94aaa0] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 3: Target Shelf Life */}
              <div>
                <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                  Target Shelf Life
                </label>
                <div className="relative">
                  <select
                    value={shelfLife}
                    onChange={(e) => setShelfLife(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] appearance-none focus:outline-none focus:border-[#0f4028]"
                  >
                    <option value="7 days">7 days</option>
                    <option value="15 days">15 days</option>
                    <option value="21 days">21 days</option>
                    <option value="30 days">30 days</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94aaa0] pointer-events-none" />
                </div>
              </div>

              {/* Field 4: Transit Conditions */}
              <div>
                <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                  Transit Conditions
                </label>
                <div className="relative">
                  <select
                    value={transit}
                    onChange={(e) => setTransit(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] appearance-none focus:outline-none focus:border-[#0f4028]"
                  >
                    <option value="Ambient">Ambient</option>
                    <option value="Chilled (8–10°C)">Chilled (8–10°C)</option>
                    <option value="Cold Chain (2–4°C)">Cold Chain (2–4°C)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94aaa0] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: RECOMMENDED PACKAGING */
          <div className="px-6 space-y-4 animate-fade-in">
            <div>
              <h1 className="text-xl font-extrabold text-[#0a0f0d] tracking-tight">
                Recommended Packaging
              </h1>
              <p className="text-xs text-[#6b8076] mt-0.5">
                Optimized for fresh {commodity} ({quantity} {unit})
              </p>
            </div>

            {/* Hero Image Container */}
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#e2ebe6] bg-[#f9fcfb] relative">
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600"
                alt="Tomatoes in bio clamshell"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Title & Bio */}
            <div>
              <h3 className="font-extrabold text-base text-[#0a0f0d]">PLA + PBAT Film</h3>
              <p className="text-xs text-[#6b8076] mt-0.5">
                Biodegradable, good barrier, suitable for fresh produce.
              </p>
            </div>

            {/* 3 Metric Highlights */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                <span className="block text-[10px] font-semibold text-[#6b8076]">Shelf Life</span>
                <span className="block text-xs font-extrabold text-[#0a0f0d] mt-0.5">15–18 days</span>
              </div>

              <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                <span className="block text-[10px] font-semibold text-[#6b8076]">Est. Cost</span>
                <span className="block text-xs font-extrabold text-[#0a0f0d] mt-0.5">₹12/kg</span>
              </div>

              <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                <span className="block text-[10px] font-semibold text-[#6b8076]">Sustainability</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <Leaf size={12} className="text-[#0f4028]" />
                  <span className="text-xs font-extrabold text-[#0f4028]">92/100</span>
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center items-center gap-1.5 pt-1">
              <div className="w-5 h-1.5 bg-[#0f4028] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="px-6 pt-4">
        <button
          onClick={handleNext}
          className="w-full h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <span>{step === 1 ? 'Next' : 'View Details'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
