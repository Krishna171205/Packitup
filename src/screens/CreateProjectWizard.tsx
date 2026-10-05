import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Sparkles, Leaf, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreateProjectWizard: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveProjectId } = useApp();

  // Step 1: Input, Step 2: Recommendation Card
  const [step, setStep] = useState<1 | 2>(1);

  // Form states
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
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Navigation & Progress */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => {
              if (step === 2) setStep(1);
              else navigate('/app/home');
            }}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-bold text-gray-400">
            {step}/4
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-[#0f4028] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 ? (
          /* STEP 1: Inputs */
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Get Packaging<br />Recommendation
            </h1>

            {/* Commodity Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">
                What are you packaging?
              </label>
              <div className="relative">
                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full appearance-none bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
                >
                  <option value="Tomatoes">Tomatoes</option>
                  <option value="Mangoes">Mangoes</option>
                  <option value="Bananas">Bananas</option>
                  <option value="Apples">Apples</option>
                  <option value="Spinach">Spinach</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Quantity with unit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">
                Quantity
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1 bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
                  placeholder="500"
                />
                <div className="relative w-28">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full appearance-none bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="crates">crates</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Target Shelf Life */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">
                Target Shelf Life
              </label>
              <div className="relative">
                <select
                  value={shelfLife}
                  onChange={(e) => setShelfLife(e.target.value)}
                  className="w-full appearance-none bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
                >
                  <option value="7 days">7 days</option>
                  <option value="15 days">15 days</option>
                  <option value="21 days">21 days</option>
                  <option value="30 days">30 days</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Transit Conditions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">
                Transit Conditions
              </label>
              <div className="relative">
                <select
                  value={transit}
                  onChange={(e) => setTransit(e.target.value)}
                  className="w-full appearance-none bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
                >
                  <option value="Ambient">Ambient</option>
                  <option value="Reefer Cold Chain (4-8°C)">Reefer Cold Chain (4-8°C)</option>
                  <option value="Express Inter-State">Express Inter-State</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: Recommended Packaging Card */
          <div className="space-y-5 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Recommended Packaging
            </h1>

            {/* Product Card matching design */}
            <div className="border border-gray-100 rounded-[28px] p-4 bg-white shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] space-y-4">
              <div className="w-full h-44 rounded-2xl bg-gray-50 overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400"
                  alt="Packaged Tomatoes"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  PLA + PBAT Film
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                  Biodegradable, good barrier, suitable for fresh produce.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 py-2 border-y border-gray-50">
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 block">Shelf Life</span>
                  <span className="text-sm font-bold text-gray-900">15-18 days</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 block">Est. Cost</span>
                  <span className="text-sm font-bold text-gray-900">₹12/kg</span>
                </div>
              </div>

              {/* Sustainability Badge */}
              <div className="bg-[#f1f7f4] rounded-2xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#165c3a] text-white flex items-center justify-center">
                  <Leaf size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0f4028] block">Sustainability Score</span>
                  <span className="text-sm font-extrabold text-[#0f4028]">92/100</span>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 pt-1">
                <div className="w-2 h-2 rounded-full bg-[#0f4028]" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pb-4 pt-6">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-base transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
        >
          <span>{step === 1 ? 'Next' : 'View Details'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
