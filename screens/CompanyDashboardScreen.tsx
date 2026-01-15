import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Heart, CheckCircle, Smartphone, DollarSign, Users, Zap, Loader2, ArrowRight, AlertTriangle } from 'lucide-react';
import { AuthService, Workspace } from '../services/AuthService';
import { IntelligenceService } from '../services/IntelligenceService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      setWorkspace(AuthService.getWorkspace());
      try {
        const s = await IntelligenceService.getDashboardStats(user.email);
        setStats(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>;

  const cards = [
    {
      id: ScreenId.INCORPORATION_READINESS,
      title: "Company Health",
      status: stats?.risk === 'High' ? '🔴' : stats?.risk === 'Medium' ? '🟡' : '🟢',
      text: `Risk level is ${stats?.risk || 'Low'}. Runway: ${stats?.runway || 'N/A'}.`,
      icon: <Heart className="text-pink-500" />,
      cta: "Review Health"
    },
    {
      id: ScreenId.VALIDATION_CHECKLIST,
      title: "Validation Status",
      status: (stats?.customerCount || 0) > 0 ? "🟢" : "🟡",
      text: `${stats?.customerCount || 0} customers confirmed pain and price via interviews.`,
      icon: <CheckCircle className="text-emerald-500" />,
      cta: "See Evidence"
    },
    {
      id: ScreenId.BUILD_STATUS,
      title: "Build Status",
      status: "🟡",
      text: "MVP defined. Core loop in progress (65%).",
      icon: <Smartphone className="text-indigo-500" />,
      cta: "Update Progress"
    },
    {
      id: ScreenId.FINANCIAL_DASHBOARD,
      title: "Financial Status",
      status: "🔴",
      text: `Runway: ${stats?.runway || '9 months'}. Burn: $${stats?.burnRate?.toLocaleString() || '15,000'}/mo.`,
      icon: <DollarSign className="text-amber-500" />,
      cta: "Manage Runway"
    },
    {
      id: ScreenId.FOUNDERS_LIST,
      title: "People & Equity",
      status: "🟢",
      text: stats?.teamSize || "2 Founders, 100% equity allocated.",
      icon: <Users className="text-blue-500" />,
      cta: "Manage Team"
    },
    {
      id: ScreenId.APP_SHELL,
      title: "Next Actions",
      status: "⚡",
      text: "3 urgent tasks: Fix cap table, Finish core loop, Prep Seed.",
      icon: <Zap className="text-yellow-500" />,
      cta: "View Tasks"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Company Dashboard</h2>
          <p className="text-slate-500 mt-2 font-medium">Global view of your venture's operating state.</p>
        </div>
        <Badge color="indigo" className="px-4 py-2 text-sm font-bold">{workspace?.stage || "Pre-Seed"}</Badge>
      </header>

      {workspace && workspace.onboardingStep < 6 && (
        <Card className="mb-10 p-6 bg-indigo-900 text-white border-none shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Complete Your Setup</h3>
            <p className="text-indigo-200 text-sm max-w-md">
              Foundry needs more data to provide high-fidelity intelligence. Complete your Startup Basics and Initial Readiness audit.
            </p>
          </div>
          <Button
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-black relative z-10 px-8"
            onClick={() => onNavigate(ScreenId.STARTUP_BASICS)}
          >
            Finish Onboarding
          </Button>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Card key={i} className="p-6 hover:shadow-xl transition-all border-2 border-slate-50 hover:border-indigo-100 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                {React.cloneElement(card.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <span className="text-2xl">{card.status}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{card.text}</p>

            <Button
              fullWidth
              variant="secondary"
              className="group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all font-bold flex items-center justify-center gap-2"
              onClick={() => onNavigate(card.id)}
            >
              {card.cta} <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> This Week's Actions (AI)
          </h3>
          <div className="space-y-4">
            {[
              "Finalize cap table before next board advisory sync.",
              "Reach out to 3 potential lead investors identified by AI.",
              "Review MVP build progress with engineering lead."
            ].map((action, i) => (
              <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">{i + 1}</div>
                <span className="text-sm font-medium text-slate-700">{action}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Alerts
            </h3>
            <Card className="p-4 bg-red-50 border-red-100">
              <p className="text-xs font-bold text-red-700">Runway Warning</p>
              <p className="text-xs text-red-600 mt-1">Based on current burn, you have less than 9 months left.</p>
            </Card>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Recent Decisions
            </h3>
            <div className="space-y-3">
              {[
                { d: "Incorporation Jurisdiction", v: "Delaware C-Corp" },
                { d: "Equity Split", v: "50/50 Locked" }
              ].map((dec, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                  <span className="text-xs font-medium text-slate-500">{dec.d}</span>
                  <span className="text-xs font-black text-slate-800">{dec.v}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
