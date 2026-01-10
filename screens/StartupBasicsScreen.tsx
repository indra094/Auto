import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const StartupBasicsScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-xl mx-auto mt-12 text-center">
    <h2 className="text-2xl font-bold text-slate-900 mb-6">What are you building?</h2>
    <div className="grid grid-cols-2 gap-4 mb-8">
      {['SaaS', 'Marketplace', 'Consumer App', 'Hard Tech', 'Service', 'Other'].map((type) => (
        <button key={type} className="p-6 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700 bg-white shadow-sm">
          {type}
        </button>
      ))}
    </div>
    <div className="flex justify-end">
      <Button onClick={() => onNavigate(ScreenId.INITIAL_READINESS)}>Next Step</Button>
    </div>
  </div>
);