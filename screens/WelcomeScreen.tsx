import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import { Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const WelcomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="h-full overflow-y-auto bg-white">
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center max-w-2xl mx-auto">
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-8 shrink-0">
        <Zap className="w-12 h-12 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to Auto</h1>
      <p className="text-lg text-slate-600 mb-8">
        Align founders, automate diligence, and navigate your startup journey with intelligence.
      </p>
      <Button onClick={() => onNavigate(ScreenId.ACCOUNT_CREATION)} className="w-48 h-12 text-lg shrink-0">Get Started</Button>
      <p className="mt-8 text-sm text-slate-400">Progress: Step 1 of 6</p>
    </div>
  </div>
);