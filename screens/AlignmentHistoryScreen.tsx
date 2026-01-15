import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { History, FileLock, CheckCircle, ArrowRight, Eye } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AlignmentHistoryScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const versions = [
    { title: "v1.2 - Post-Ideation", date: "Jan 12, 2026", status: "Active", changed: "Initial allocation" },
    { title: "v1.1 - Pre-Alignment", date: "Jan 05, 2026", status: "Archived", changed: "Drafted split" },
    { title: "v1.0 - Genesis", date: "Dec 20, 2025", status: "Archived", changed: "Workspace creation" },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <header>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
          <History className="text-indigo-500 w-10 h-10" /> Alignment History
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Tracking the evolution of founder relationships and equity agreements.</p>
      </header>

      <div className="space-y-6">
        {versions.map((v, i) => (
          <Card key={i} className={`p-6 border-slate-100 flex items-center justify-between ${v.status === 'Active' ? 'shadow-xl ring-2 ring-indigo-500/20' : 'opacity-70 grayscale'}`}>
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${v.status === 'Active' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <FileLock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-slate-900">{v.title}</h4>
                  <Badge color={v.status === 'Active' ? 'indigo' : 'slate'}>{v.status}</Badge>
                </div>
                <div className="text-sm text-slate-400 mt-1">{v.date} • {v.changed}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" className="px-5 font-bold flex items-center gap-2">
                <Eye className="w-4 h-4" /> View Lock
              </Button>
              {v.status === 'Archive' && (
                <Button variant="secondary" size="sm" className="px-5 font-bold">Compare</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-slate-50 border-slate-100 flex flex-col items-center text-center">
        <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
        <h4 className="text-xl font-bold text-slate-900">Immutable Audit Trail</h4>
        <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
          Every change to the Founder Alignment score or Equity Model is logged and hashed. This ensures <strong>trust and transparency</strong> during future fundraising rounds.
        </p>
        <Button className="mt-8 bg-slate-900 font-bold h-12 px-8" onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>
          Return to Current Alignment <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </div>
  );
};