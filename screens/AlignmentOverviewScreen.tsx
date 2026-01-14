import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { ShieldCheck, AlertCircle, ArrowRight, XCircle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AlignmentOverviewScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const pillars = [
    { title: "Vision Match", status: "🟡", detail: "Significant overlap, but exit strategies differ." },
    { title: "Time Commitment", status: "🟢", detail: "Both founders committing 40+ hours/week." },
    { title: "Equity Agreement", status: "🔴", detail: "50/50 split detected. System suggests adjustment." }
  ];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-2">Founder Alignment</h2>
        <p className="text-slate-500 font-medium italic">Alignment is not an agreement; it's a shared reality.</p>
      </header>

      <div className="space-y-6 mb-12">
        {pillars.map((p, i) => (
          <Card key={i} className="p-8 border-2 border-slate-50 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.detail}</p>
              </div>
              <span className="text-3xl">{p.status}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          fullWidth
          className="h-16 rounded-2xl font-bold border-2 border-red-100 text-red-600 hover:bg-red-50"
          onClick={() => alert("Fixing flow...")}
        >
          Fix Issues
        </Button>
        <Button
          fullWidth
          className="h-16 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
          onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}
        >
          Lock Alignment <ShieldCheck className="w-5 h-5" />
        </Button>
      </div>

      <div className="mt-12 p-6 bg-slate-900 text-white rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-indigo-400" />
          <h4 className="font-bold">Next Milestone</h4>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Once alignment is locked, you can move to <span className="text-white font-bold">Incorporation Readiness</span> to legally formalize these commitments.
        </p>
      </div>
    </div>
  );
};