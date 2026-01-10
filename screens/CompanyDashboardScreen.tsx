import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, ProgressBar } from '../components/UI';
import { CheckCircle, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import { AuthService, Workspace } from '../services/AuthService';
import { IntelligenceService } from '../services/IntelligenceService';
import { FounderService } from '../services/FounderService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [alignmentScore, setAlignmentScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setWorkspace(AuthService.getWorkspace());
      const dashboardStats = await IntelligenceService.getDashboardStats();
      const score = await FounderService.getAlignmentScore();
      setStats(dashboardStats);
      setAlignmentScore(score);
      setLoading(false);
    };
    load();
  }, []);

  const stageLabel = workspace?.stage || "Onboarding";
  
  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Badge color="slate">{stageLabel}</Badge>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className={`md:col-span-1 border-t-4 ${stats?.risk === 'High' ? 'border-t-red-500' : 'border-t-amber-500'}`}>
          <div className="text-xs uppercase text-slate-500 font-bold mb-1">Overall Risk</div>
          <div className={`text-2xl font-bold ${stats?.risk === 'High' ? 'text-red-600' : 'text-amber-600'}`}>
            {stats?.risk}
          </div>
        </Card>
        <Card className="md:col-span-1">
          <div className="text-xs uppercase text-slate-500 font-bold mb-1">Burn Rate</div>
          <div className="text-2xl font-bold text-slate-800">${stats?.burnRate?.toLocaleString()}/mo</div>
        </Card>
        <Card className="md:col-span-1">
          <div className="text-xs uppercase text-slate-500 font-bold mb-1">Runway</div>
          <div className="text-2xl font-bold text-slate-800">{stats?.runway}</div>
        </Card>
        <Card className="md:col-span-1">
          <div className="text-xs uppercase text-slate-500 font-bold mb-1">Team</div>
          <div className="text-2xl font-bold text-slate-800">{stats?.teamSize}</div>
        </Card>
      </div>

      <h3 className="text-lg font-bold mb-4">This Week's Focus</h3>
      <div className="grid md:grid-cols-3 gap-6">
         <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-slate-800">Founder Alignment</span>
              <CheckCircle className={`w-5 h-5 ${alignmentScore > 80 ? 'text-green-500' : 'text-amber-500'}`} />
            </div>
            <ProgressBar value={alignmentScore} color={alignmentScore > 80 ? "bg-green-500" : "bg-amber-500"} />
            <p className="text-xs text-slate-500 mt-2">{alignmentScore}% Aligned - {alignmentScore > 80 ? 'Good' : 'Needs attention'}</p>
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
            <ProgressBar value={Math.min(100, (stats?.customerCount || 0) * 10)} color="bg-slate-300" />
            <p className="text-xs text-slate-500 mt-2">{stats?.customerCount || 0}/10 Interviews conducted</p>
         </Card>
      </div>
    </div>
  );
};
