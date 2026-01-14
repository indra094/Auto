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
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!problem || !customer || !solution) return;
    setIsLoading(true);
    await AuthService.updateWorkspace({ onboardingStep: 4 });
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

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Customer</label>
          <input
            type="text"
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
            placeholder="Who is your ideal first user?"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Proposed Solution</label>
          <textarea
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
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
            disabled={!problem || !customer || !solution || isLoading}
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
