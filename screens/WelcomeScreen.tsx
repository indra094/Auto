import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const WelcomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="h-full overflow-y-auto bg-slate-900 text-white">
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 mb-8 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-500">
          <path d="M12 2L3 22h18L12 2z" />
          <path d="M8 12h8" />
          <path d="M12 12v4" />
          <circle cx="12" cy="18" r="2" fill="currentColor" className="text-yellow-400" stroke="none" />
        </svg>
      </div>

      <h1 className="text-5xl font-black mb-2 tracking-tight">Welcome to Auto</h1>
      <p className="text-xl text-slate-400 mb-12 font-medium">Build companies the right way</p>

      <div className="space-y-4 w-full max-w-xs">
        <Button
          fullWidth
          className="h-14 text-lg bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-500/20"
          onClick={() => onNavigate(ScreenId.ACCOUNT_CREATION)}
        >
          Create Your First Company
        </Button>

        <div className="py-2 flex items-center gap-4 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
          <div className="h-px flex-1 bg-slate-800"></div>
          <span>Or</span>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <Button
          fullWidth
          variant="secondary"
          className="h-14 text-lg bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
          onClick={() => alert("Join flow not implemented")}
        >
          Join Existing Company
        </Button>
      </div>
    </div>
  </div>
);