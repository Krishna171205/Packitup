import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, User, Building2, Phone, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimaryButton } from '../components/ui/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, t } = useApp();
  const [phone, setPhone] = useState('9871234567');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app/home');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8FAF8] text-[#0F172A]">
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-black">
            P
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900">PACKITUP</span>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
          {t('Welcome back', 'वापसी पर स्वागत है')}
        </h1>
        <p className="text-xs text-slate-500 mb-8">
          {t('Sign in with your mobile number to access your packaging intelligence projects.', 'अपने प्रोजेक्ट्स तक पहुँचने के लिए मोबाइल नंबर से साइन इन करें।')}
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t('Mobile Number', 'मोबाइल नंबर')}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98712 34567"
                className="w-full bg-white border border-slate-300 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold outline-none transition-all shadow-sm"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {t('Pre-filled for Seeded Demo Scenario (Rajesh Kumar)', 'सीडेड डेमो के लिए प्री-फिल्ड (राजेश कुमार)')}
            </p>
          </div>

          <PrimaryButton fullWidth size="lg" type="submit" className="mt-4">
            {t('Send OTP & Sign In', 'ओटीपी भेजें और साइन इन करें')}
          </PrimaryButton>
        </form>
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-slate-500">
        <span>{t('New to PACKITUP?', 'क्या आप नए हैं?')} </span>
        <Link to="/register" className="font-bold text-[#059669] hover:underline">
          {t('Register here', 'यहाँ रजिस्टर करें')}
        </Link>
      </div>
    </div>
  );
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8FAF8] text-[#0F172A]">
      <div className="pt-4">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
          {t('Create Account', 'खाता बनाएं')}
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          {t('Join thousands of Indian food producers & packaging converters.', 'हजारों खाद्य उत्पादकों और पैकेजिंग कन्वर्टर्स से जुड़ें।')}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Rajesh Kumar"
              className="w-full bg-white border border-slate-300 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-medium outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mobile Number
            </label>
            <input
              type="tel"
              defaultValue="+91 98712 34567"
              className="w-full bg-white border border-slate-300 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-medium outline-none shadow-sm"
            />
          </div>

          <PrimaryButton
            fullWidth
            size="lg"
            onClick={() => navigate('/role-selection')}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Continue to Role Selection
          </PrimaryButton>
        </div>
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-slate-500">
        <span>Already have an account? </span>
        <Link to="/login" className="font-bold text-[#059669] hover:underline">
          Log In
        </Link>
      </div>
    </div>
  );
};

export const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, role, t } = useApp();
  const [name, setName] = useState(user.name);
  const [org, setOrg] = useState(user.organization);
  const [location, setLocation] = useState(user.location);

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name,
      organization: org,
      location,
    }));
    navigate('/app/home');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8FAF8] text-[#0F172A] select-none">
      <div className="pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold mb-3">
          <Sparkles size={12} />
          <span>Profile Personalization</span>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
          {t('Setup Your Profile', 'अपनी प्रोफ़ाइल सेट करें')}
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          {role === 'producer'
            ? 'Tell us about your farm/FPO to tune shelf life & barrier models.'
            : 'Enter your manufacturing location and capabilities.'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {role === 'producer' ? 'Contact Person / Farmer Name' : 'Manager Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-semibold outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {role === 'producer' ? 'Farm / FPO Name' : 'Packaging Company Name'}
            </label>
            <input
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-semibold outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Location & Hub
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-semibold outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <PrimaryButton
          fullWidth
          size="lg"
          onClick={handleSave}
          icon={<ArrowRight size={18} />}
          iconPosition="right"
        >
          Enter PACKITUP Dashboard
        </PrimaryButton>
      </div>
    </div>
  );
};
