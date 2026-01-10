import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { AlertTriangle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const IncorporationReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-xl mx-auto mt-12">
    <Card className="text-center p-8 border-t-4 border-t-amber-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Incorporation Gate</h2>
      <div className="text-4xl font-bold text-amber-500 my-4">63% Ready</div>
      
      <div className="text-left bg-slate-50 p-4 rounded mb-6 space-y-3">
        <h4 className="font-bold text-slate-700 text-sm uppercase">Why wait?</h4>
        <div className="flex gap-3 items-start">
           <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0"/>
           <span className="text-sm">Founders agreement not signed.</span>
        </div>
        <div className="flex gap-3 items-start">
           <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0"/>
           <span className="text-sm">Insufficient customer validation (0/10 interviews).</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button fullWidth variant="primary">Help Me Get Ready</Button>
        <Button fullWidth variant="ghost" className="text-slate-500 hover:text-red-600" onClick={() => onNavigate(ScreenId.PROCEED_ANYWAY)}>
          Proceed Anyway (Not Recommended)
        </Button>
      </div>
    </Card>
  </div>
);

export const ProceedAnywayScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-xl mx-auto mt-12">
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-red-900 mb-2">You are proceeding early</h2>
      <p className="text-red-800 mb-6">
        Moving to incorporation without alignment or validation significantly increases the risk of "dead equity" and expensive legal restructuring later.
      </p>
      <div className="bg-white p-4 rounded text-left shadow-sm mb-6 border border-red-100">
        <h4 className="font-bold text-red-900 text-sm mb-2">Consequences:</h4>
        <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
          <li>Potential investor pushback on cap table.</li>
          <li>Legal costs to amend vesting schedules later ($5k+).</li>
          <li>Higher risk of founder conflict.</li>
        </ul>
      </div>
      <Button fullWidth variant="danger">I Understand, Lock & Proceed</Button>
      <Button fullWidth variant="ghost" className="mt-2" onClick={() => onNavigate(ScreenId.INCORPORATION_READINESS)}>Go Back</Button>
    </div>
  </div>
);
