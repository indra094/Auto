import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, ProgressBar } from '../components/UI';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Badge color="slate">Pre-incorporation</Badge>
    </div>

    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Card className="md:col-span-1 border-t-4 border-t-amber-500">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Overall Risk</div>
        <div className="text-2xl font-bold text-amber-600">Medium</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Burn Rate</div>
        <div className="text-2xl font-bold text-slate-800">$0/mo</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Runway</div>
        <div className="text-2xl font-bold text-slate-800">∞</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Team</div>
        <div className="text-2xl font-bold text-slate-800">2 + 1 AI</div>
      </Card>
    </div>

    <h3 className="text-lg font-bold mb-4">This Week's Focus</h3>
    <div className="grid md:grid-cols-3 gap-6">
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Founder Alignment</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <ProgressBar value={78} color="bg-amber-500" />
          <p className="text-xs text-slate-500 mt-2">78% Aligned - Needs attention</p>
       </Card>
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.INCORPORATION_READINESS)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Incorporation</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <ProgressBar value={50} color="bg-indigo-500" />
          <p className="text-xs text-slate-500 mt-2">Decision pending validation</p>
       </Card>
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.CUSTOMERS_LIST)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Market Validation</span>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <ProgressBar value={10} color="bg-slate-300" />
          <p className="text-xs text-slate-500 mt-2">0/10 Interviews conducted</p>
       </Card>
    </div>
  </div>
);