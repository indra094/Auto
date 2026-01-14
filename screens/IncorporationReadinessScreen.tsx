import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { CheckCircle, Circle, ShieldCheck, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const IncorporationReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const checks = [
    { label: "Founders Aligned", done: true },
    { label: "MVP Validated", done: true },
    { label: "$100k+ Interest", done: false },
    { label: "Bylaws Drafted", done: false }
  ];

  const ready = checks.filter(c => c.done).length >= 3;

  return (
    <div className="p-12 max-w-2xl mx-auto text-center">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Incorporation Status</h2>
        <Badge color={ready ? "green" : "amber"} className="px-6 py-2 text-sm uppercase tracking-widest font-black">
          {ready ? "READY TO INCORPORATE" : "NOT READY"}
        </Badge>
      </header>

      <Card className="p-8 text-left bg-white border-2 border-slate-100 shadow-xl">
        <div className="space-y-6">
          {checks.map((c, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${c.done ? 'bg-emerald-50 text-emerald-900 shadow-sm' : 'bg-slate-50 text-slate-400 opacity-60'}`}>
              {c.done ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
              <span className="text-lg font-bold">{c.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <Button
            fullWidth
            className={`h-16 text-xl rounded-2xl flex items-center justify-center gap-3 font-black transition-all ${ready ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-200 text-slate-500 cursor-not-allowed border-none'}`}
            onClick={() => ready && alert("Incorporating...")}
            disabled={!ready}
          >
            Incorporate Now <ShieldCheck className="w-6 h-6" />
          </Button>
          {!ready && (
            <p className="text-center text-xs text-slate-400 mt-4 font-medium italic">
              "We recommend reaching $100k in non-binding interest before spending capital on legal formation." — AI Advisor
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};