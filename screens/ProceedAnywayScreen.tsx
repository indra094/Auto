import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import { AlertTriangle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

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