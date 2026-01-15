import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { CheckCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InitialReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const ws = AuthService.getWorkspace();

  // Compute score based on actual data presence
  const hasBasics = ws?.industry && ws?.geography && ws?.stage;
  const baseScore = hasBasics ? 40 : 10;
  const readinessScore = baseScore + (ws?.onboardingStep ? ws.onboardingStep * 10 : 0);

  const checklist = [
    { label: "Company Mission & Vision", status: "complete" },
    { label: "Market, Geography, Stage", status: hasBasics ? "complete" : "missing" },
    { label: "Founder Alignment & Equity Split", status: ws && ws.onboardingStep > 3 ? "complete" : "warning" },
    { label: "Product Roadmap (Build Path)", status: "missing" },
    { label: "Financial Projections (Seed Ready)", status: "missing" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Initial Readiness</h1>
        <p className="text-slate-500 font-medium">Foundry's audit of your venture's current state.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="md:col-span-1 p-8 flex flex-col items-center justify-center text-center bg-indigo-600 text-white border-none shadow-xl shadow-indigo-200">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Readiness Score</div>
          <div className="text-7xl font-black mb-4">{readinessScore}</div>
          <Badge color="white" className="bg-white/20 text-white border-transparent">Moderate Signal</Badge>
        </Card>

        <Card className="md:col-span-2 p-8 border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Missing Information Checklist</h3>
          <div className="space-y-4">
            {checklist.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                {item.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : item.status === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          className="h-16 px-8 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black shadow-lg shadow-indigo-200 flex items-center gap-3"
          onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}
        >
          Finalize Setup <ArrowRight className="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          className="h-16 px-8 text-lg rounded-2xl border-2 border-slate-100 font-bold text-slate-500 hover:bg-slate-50"
          onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}
        >
          Skip for Now
        </Button>
      </div>

      <div className="mt-16 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-indigo-500 shrink-0" />
        <div>
          <h4 className="font-bold text-slate-800">Foundry's Recommendation</h4>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Your venture is technically viable, but the lack of a locked equity split between founders presents a significant <strong>governance risk</strong>. We recommend completing "Founder Alignment" before proceeding to seed stage modeling.
          </p>
        </div>
      </div>
    </div>
  );
};