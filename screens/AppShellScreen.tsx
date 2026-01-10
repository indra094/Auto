import React from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AppShellScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="flex items-center justify-center h-full text-center p-8">
    <div className="max-w-md">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">App Shell Preview</h2>
      <p className="text-slate-600 mb-6">
        The sidebar and top navigation you see around this area represents the App Shell (Screen 1).
        Navigate through the wireframes using the menu on the left.
      </p>
      <Button onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}>Go to Dashboard</Button>
    </div>
  </div>
);