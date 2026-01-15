import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const StartupBasicsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [problem, setProblem] = useState('');
  const [customer, setCustomer] = useState('');
  const [industry, setIndustry] = useState('');
  const [geography, setGeography] = useState('');
  const [stage, setStage] = useState('Idea');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!problem || !solution) return;
    setIsLoading(true);
    await AuthService.updateWorkspace({
      onboardingStep: 4,
      industry,
      geography,
      stage
    });
    setIsLoading(false);
    onNavigate(ScreenId.COMPANY_DASHBOARD);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Startup Basics</h1>
        <p className="text-slate-500 font-medium">Define the core pillars of your venture.</p>
      </header>

      <div className="space-y-8">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Problem Statement</label>
          <textarea
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
            placeholder="What pain are you solving? Be specific."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Industry</label>
            <input
              type="text"
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              placeholder="e.g. Fintech, AI"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Geography</label>
            <input
              type="text"
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              placeholder="e.g. US, Global"
              value={geography}
              onChange={(e) => setGeography(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Current Stage</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Idea", "Pre-Seed", "Seed", "Series A"].map(s => (
              <button
                key={s}
                className={`p-3 rounded-xl border-2 transition-all font-inter text-xs font-bold ${stage === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-600 hover:border-indigo-200'}`}
                onClick={() => setStage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Customer</label>
          <input
            type="text"
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
            placeholder="Who are you building for?"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Proposed Solution</label>
          <textarea
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl h-24 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
            placeholder="How does your product solve the problem?"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div className="pt-6 border-t border-slate-100">
          <Button
            fullWidth
            className="h-16 text-xl rounded-2xl flex items-center justify-center gap-3 font-black"
            onClick={handleSave}
            disabled={!problem || !solution || isLoading}
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>Save & Continue <ArrowRight className="w-6 h-6" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
