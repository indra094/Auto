import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AccountCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-md mx-auto mt-12">
    <Card title="Create Account">
      <div className="space-y-4">
        <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Jane Founder" />
        <input type="email" className="w-full p-2 border border-slate-300 rounded-md" placeholder="jane@startup.com" />
        <Button fullWidth onClick={() => onNavigate(ScreenId.STARTUP_BASICS)}>Create Workspace</Button>
      </div>
    </Card>
  </div>
);