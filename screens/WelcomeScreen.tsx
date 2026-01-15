import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const WelcomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <div className="w-24 h-24 mb-10 relative">
          <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-2xl animate-pulse"></div>
          <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-12 h-12 text-indigo-600">
              <path d="M12 2L3 22h18L12 2z" />
              <path d="M8 12h8" strokeWidth="4" className="opacity-20" />
              <path d="M12 12v4" strokeWidth="4" className="opacity-20" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" className="text-amber-500" stroke="none" />
            </svg>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
          Build Companies<br />The Right Way.
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl font-medium leading-relaxed">
          Foundry combines organizational intelligence with AI to guide you from idea to incorporation and beyond.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mb-16">
          <Button
            fullWidth
            className="h-16 text-xl rounded-2xl bg-slate-900 hover:bg-black text-white shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 font-black border-none"
            onClick={() => onNavigate(ScreenId.ACCOUNT_CREATION)}
          >
            Launch Venture <ArrowRight className="w-6 h-6" />
          </Button>
          <Button
            fullWidth
            variant="secondary"
            className="h-16 text-xl rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 shadow-sm transition-all hover:scale-[1.02] font-black"
            onClick={() => alert("Join flow not implemented")}
          >
            Join Organization
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-slate-200 pt-12">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-800">Speed to Market</div>
              <div className="text-xs text-slate-400 font-medium">Auto-generated blueprints</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-800">Legal Readiness</div>
              <div className="text-xs text-slate-400 font-medium">Compliance-first formation</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-800">Global Scale</div>
              <div className="text-xs text-slate-400 font-medium">Cross-border org management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
