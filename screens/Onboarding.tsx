import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const WelcomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center max-w-2xl mx-auto">
    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-8">
      <Zap className="w-12 h-12 text-indigo-600" />
    </div>
    <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to Foundry</h1>
    <p className="text-lg text-slate-600 mb-8">
      Align founders, automate diligence, and navigate your startup journey with intelligence.
    </p>
    <Button onClick={() => onNavigate(ScreenId.ACCOUNT_CREATION)} className="w-48 h-12 text-lg">Get Started</Button>
    <p className="mt-8 text-sm text-slate-400">Progress: Step 1 of 6</p>
  </div>
);

export const AccountCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-md mx-auto mt-12">
    <Card title="Create Account">
      <div className="space-y-4">
        <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Jane Founder" />
        <input type="email" className="w-full p-2 border border-slate-300 rounded-md" placeholder="jane@startup.com" />
        <Button fullWidth onClick={() => onNavigate(ScreenId.COMPANY_CREATION)}>Create Workspace</Button>
      </div>
    </Card>
  </div>
);

export const InitialReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-2xl mx-auto mt-8">
    <Card className="p-8 text-center">
      <div className="mb-6 flex justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-8 border-amber-400 border-t-transparent animate-spin-slow" style={{ transform: 'rotate(45deg)' }}></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">50%</span>
          </div>
        </div>
      </div>
      <Button fullWidth className="h-12 text-lg" onClick={() => onNavigate(ScreenId.FOUNDERS_LIST)}>
        Proceed to Founder Alignment
      </Button>
    </Card>
  </div>
);
