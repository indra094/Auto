import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Play, ShieldAlert, Zap, ArrowRight, BarChart3 } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const ScenarioSimulatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const scenarios = [
    { title: "Early Exit ($10M Acquisition)", desc: "Founder A exits after 18 months.", risk: "High", impact: "-30% Pool" },
    { title: "Series A Dilution", desc: "Raising $5M at $25M Post-Money.", risk: "Low", impact: "-20% Equity" },
    { title: "Founder Inactivity", desc: "Founder C reduces to 10hrs/week.", risk: "Severe", impact: "Clawback Trigger" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Scenario Simulator</h2>
        <p className="text-slate-500 font-medium">Stress-test your equity and alignment against real-world events.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Active Scenarios</h3>
          {scenarios.map((s, i) => (
            <Card key={i} className="p-6 border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
                </div>
                <Badge color={s.risk === 'Severe' ? 'red' : s.risk === 'High' ? 'amber' : 'emerald'}>{s.risk} Risk</Badge>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400">Equity Impact: <span className="text-slate-900">{s.impact}</span></span>
                <Button size="sm" variant="secondary" className="text-[10px] uppercase font-black tracking-widest px-3">Simulate <Play className="w-3 h-3 ml-1 fill-current" /></Button>
              </div>
            </Card>
          ))}
          <Button fullWidth variant="secondary" className="h-14 border-dashed border-2 border-slate-200 text-slate-400 hover:text-indigo-500 hover:border-indigo-100 bg-transparent">
            + Create Custom Scenario
          </Button>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Simulation Visualizer</h3>
          <Card className="p-8 bg-slate-900 text-white min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            <BarChart3 className="w-16 h-16 text-indigo-400 mb-6 opacity-30" />
            <h4 className="text-xl font-bold mb-2">Waiting for Input</h4>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Select a scenario on the left to see the projected equity outcomes and vesting cliff impacts.</p>

            <div className="mt-12 w-full space-y-4">
              <div className="h-2 bg-white/5 rounded-full w-full"></div>
              <div className="h-2 bg-white/5 rounded-full w-3/4"></div>
              <div className="h-2 bg-white/5 rounded-full w-1/2"></div>
            </div>
          </Card>

          <Card className="p-6 bg-amber-50 border-amber-100 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h5 className="font-bold text-amber-900 text-sm">Vesting Warning</h5>
              <p className="text-xs text-amber-700 mt-1">Under "Early Exit", 40% of Founder B's equity remains unvested and will return to the treasury pool.</p>
            </div>
          </Card>
        </section>
      </div>

      <footer className="pt-10 flex justify-between items-center border-t border-slate-100">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-bold text-slate-400">AI Recommendation: Implement multi-year triggers.</span>
        </div>
        <Button className="h-14 px-10 rounded-2xl bg-slate-900 font-bold" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>
          Back to Model <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </footer>
    </div>
  );
};