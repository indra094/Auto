import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Milestone, DollarSign, Target, ArrowRight, Zap, Info } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const StagesCapitalScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const roadmap = [
    { stage: "Idea & Validation", tech: "POC / Mockups", capital: "$50k", time: "3 Months", status: "complete" },
    { stage: "Seed Stage", tech: "Core MVP Build", capital: "$500k", time: "6-9 Months", status: "current" },
    { stage: "Series A", tech: "Scale Infrastructure", capital: "$2.5M", time: "18 Months", status: "future" },
    { stage: "Series B+", tech: "Global Expansion", capital: "$10M+", time: "Ongoing", status: "future" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Stages & Capital Planning</h2>
          <p className="text-slate-500 mt-2 font-medium">Strategic roadmap for growth and funding milestones.</p>
        </div>
        <Badge color="indigo" className="px-5 py-2 text-sm font-bold">Planned Raise: $500k</Badge>
      </header>

      <div className="relative pt-12">
        {/* Timeline Line */}
        <div className="absolute top-[4.5rem] left-0 w-full h-1 bg-slate-100 hidden lg:block"></div>

        <div className="grid lg:grid-cols-4 gap-8 relative z-10">
          {roadmap.map((r, i) => (
            <div key={i} className="space-y-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg mx-auto lg:mx-0 ${r.status === 'complete' ? 'bg-emerald-500 text-white' : r.status === 'current' ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
                {r.status === 'complete' ? '✓' : i + 1}
              </div>
              <Card className={`p-6 border-slate-100 ${r.status === 'current' ? 'ring-2 ring-indigo-500 shadow-xl' : ''}`}>
                <h4 className="font-bold text-slate-900 mb-1">{r.stage}</h4>
                <Badge color={r.status === 'complete' ? 'emerald' : r.status === 'current' ? 'indigo' : 'slate'} className="mb-4">{r.status}</Badge>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <DollarSign className="w-3 h-3" /> {r.capital}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Target className="w-3 h-3" /> {r.tech}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-10">
        <section className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Use of Funds (Seed)</h3>
          <Card className="p-8 border-slate-100">
            <div className="space-y-6">
              {[
                { l: "Product & Engineering", v: 60, c: "bg-indigo-500" },
                { l: "Marketing & Growth", v: 25, c: "bg-emerald-500" },
                { l: "Legal & Ops", v: 15, c: "bg-amber-500" }
              ].map((f, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{f.l}</span>
                    <span className="text-slate-900">{f.v}%</span>
                  </div>
                  <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${f.c}`} style={{ width: `${f.v}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">AI Capital Commentary</h3>
          <Card className="p-8 bg-indigo-900 text-white border-none shadow-2xl relative overflow-hidden">
            <Zap className="w-10 h-10 text-yellow-400 mb-4 opacity-50 absolute top-4 right-4" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-widest mb-4">
                <Info className="w-4 h-4" /> Dynamic Insight
              </div>
              <p className="text-lg font-medium leading-relaxed italic">
                "Your current burn rate is highly efficient. However, your Series A scale-out infrastructure estimate is <strong>20% below market average</strong> for AI-SaaS. Consider adjusting for GPU reservation costs."
              </p>
              <Button className="mt-8 bg-white text-indigo-900 hover:bg-indigo-50 font-black border-none" fullWidth>
                Optimize Projections
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};