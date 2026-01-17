import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, ProgressBar } from '../components/UI';
import { Heart, CheckCircle, Smartphone, DollarSign, Users, Zap, Loader2, ArrowRight, AlertTriangle, Lock, TrendingUp, Target, Lightbulb } from 'lucide-react';
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

  const isActivationMode = (workspace?.onboardingStep || 0) < 6;

  // Calculate readiness score for activation mode
  const calculateReadiness = () => {
    const step = workspace?.onboardingStep || 1;
    const baseScore = Math.min(step * 15, 90);
    return baseScore;
  };

  const onboardingSteps = [
    {
      id: ScreenId.ACCOUNT_CREATION,
      label: "Your Info",
      completed: (workspace?.onboardingStep || 0) >= 2,
      current: (workspace?.onboardingStep || 0) === 1,
      why: "This affects founder equity."
    },
    {
      id: ScreenId.COMPANY_CREATION,
      label: "Create Company",
      completed: (workspace?.onboardingStep || 0) >= 3,
      current: (workspace?.onboardingStep || 0) === 2,
      why: "This affects how much money you need."
    },
    {
      id: ScreenId.AI_IDEA_VALIDATION,
      label: "AI Idea Validation",
      completed: (workspace?.onboardingStep || 0) >= 4,
      current: (workspace?.onboardingStep || 0) === 3,
      why: "This validates your market opportunity."
    },
    {
      id: ScreenId.INITIAL_READINESS,
      label: "Initial Readiness",
      completed: (workspace?.onboardingStep || 0) >= 5,
      current: (workspace?.onboardingStep || 0) === 4,
      why: "This unlocks AI-powered insights."
    },
  ];

  // ACTIVATION MODE - Before Onboarding Complete
  if (isActivationMode) {
    const readiness = calculateReadiness();
    const nextStep = onboardingSteps.find(s => s.current);

    return (
      <div className="p-8 max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-3">Welcome to Foundry</h2>
          <p className="text-slate-500 text-lg font-medium">Complete setup to unlock AI-powered insights</p>
        </header>

        {/* Hero Readiness Card */}
        <Card className="mb-10 p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-black mb-2">Foundry Readiness</h3>
                <p className="text-indigo-100 text-sm">Your startup is taking shape</p>
              </div>
              <div className="text-6xl font-black">{readiness}%</div>
            </div>
            <ProgressBar value={readiness} height="h-3" className="bg-white/20" color="bg-white" />
            <p className="text-indigo-100 text-sm mt-4">Complete onboarding to unlock full intelligence dashboard</p>
          </div>
        </Card>

        {/* Linear Onboarding Checklist */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Target className="w-4 h-4" /> Setup Progress
          </h3>
          <div className="space-y-3">
            {onboardingSteps.map((step, i) => (
              <Card
                key={i}
                className={`p-5 transition-all ${step.current
                  ? 'border-2 border-indigo-500 shadow-lg bg-indigo-50'
                  : step.completed
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                      ? 'bg-emerald-500 text-white'
                      : step.current
                        ? 'bg-indigo-500 text-white animate-pulse'
                        : 'bg-slate-300 text-slate-500'
                      }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold text-sm">{i + 1}</span>}
                    </div>
                    <div>
                      <h4 className={`font-bold ${step.current ? 'text-indigo-900' : step.completed ? 'text-emerald-900' : 'text-slate-600'}`}>
                        {step.label}
                      </h4>
                      <p className={`text-xs mt-0.5 ${step.current ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {step.why}
                      </p>
                    </div>
                  </div>
                  {step.current && (
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 font-bold"
                      onClick={() => onNavigate(step.id)}
                    >
                      Continue →
                    </Button>
                  )}
                  {step.completed && (
                    <Badge color="emerald" className="px-3 py-1">Complete</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Teaser / Locked AI Insights */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Coming Soon
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: AlertTriangle, title: "Founder Imbalance", preview: "⚠️ Risk detected" },
              { icon: DollarSign, title: "Capital Estimate", preview: "💰 $XXX,XXX needed" },
              { icon: TrendingUp, title: "Market Timing", preview: "📊 Analysis ready" }
            ].map((insight, i) => (
              <Card
                key={i}
                className="p-6 bg-slate-900/5 backdrop-blur-sm border-2 border-dashed border-slate-300 relative overflow-hidden cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-600">Complete onboarding to unlock</p>
                  </div>
                </div>
                <insight.icon className="w-6 h-6 text-slate-400 mb-3" />
                <h4 className="font-bold text-slate-700 mb-1">{insight.title}</h4>
                <p className="text-sm text-slate-500">{insight.preview}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // OPERATING MODE - After Onboarding Complete
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Company Dashboard</h2>
          <p className="text-slate-500 mt-2 font-medium">AI-powered operating system for {workspace?.name || "your startup"}</p>
        </div>
        <Badge color="indigo" className="px-4 py-2 text-sm font-bold">{workspace?.stage || "Pre-Seed"}</Badge>
      </header>

      {/* This Week's Priorities */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" /> This Week's Priorities
        </h3>
        <div className="space-y-3">
          {[
            { priority: "Talk to 5 design partners in healthcare IT", verb: "Research", screenId: ScreenId.CUSTOMERS_LIST },
            { priority: "Revisit founder equity — commitment mismatch detected", verb: "Align", screenId: ScreenId.EQUITY_MODELING },
            { priority: "Do NOT raise yet — runway insufficient signal quality", verb: "Wait", screenId: null }
          ].map((item, i) => (
            <Card
              key={i}
              className={`p-5 border-l-4 ${i === 0 ? 'border-l-red-500 bg-red-50/50' : i === 1 ? 'border-l-amber-500 bg-amber-50/50' : 'border-l-indigo-500 bg-indigo-50/50'} hover:shadow-lg transition-all ${item.screenId ? 'cursor-pointer' : ''}`}
              onClick={() => item.screenId && onNavigate(item.screenId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-white ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}>
                    {i + 1}
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wide ${i === 0 ? 'text-red-600' : i === 1 ? 'text-amber-600' : 'text-indigo-600'
                      }`}>
                      {item.verb}
                    </span>
                    <p className="text-slate-800 font-medium mt-0.5">{item.priority}</p>
                  </div>
                </div>
                {item.screenId && <ArrowRight className="w-5 h-5 text-slate-400" />}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        {/* Startup Health Summary */}
        <section className="lg:col-span-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" /> Startup Health Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                area: "Founder Alignment",
                status: "⚠️ At risk",
                color: "border-amber-200 bg-amber-50",
                textColor: "text-amber-900",
                reason: "Time commitment diverges after 6 months",
                screenId: ScreenId.ALIGNMENT_OVERVIEW
              },
              {
                area: "Market Clarity",
                status: "🟡 Early",
                color: "border-slate-200 bg-slate-50",
                textColor: "text-slate-800",
                reason: "Need more customer validation signals",
                screenId: ScreenId.VALIDATION_CHECKLIST
              },
              {
                area: "Capital Timing",
                status: "🔴 Too early",
                color: "border-red-200 bg-red-50",
                textColor: "text-red-900",
                reason: "Lack validated demand signals investors expect",
                screenId: ScreenId.STAGES_CAPITAL
              },
              {
                area: "Execution Focus",
                status: "🟢 Strong",
                color: "border-emerald-200 bg-emerald-50",
                textColor: "text-emerald-900",
                reason: "Clear roadmap with weekly milestones",
                screenId: ScreenId.BUILD_STATUS
              }
            ].map((health, i) => (
              <Card
                key={i}
                className={`p-5 ${health.color} border-2 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() => onNavigate(health.screenId)}
              >
                <h4 className="font-bold text-slate-700 mb-1">{health.area}</h4>
                <p className={`text-lg font-black mb-2 ${health.textColor}`}>{health.status}</p>
                <p className="text-xs text-slate-600">{health.reason}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Risks You Can't Ignore */}
        <aside className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Risks You Can't Ignore
            </h3>
            <div className="space-y-3">
              <Card className="p-4 bg-red-50 border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900 mb-1">Founder time commitment diverges after 6 months</p>
                    <p className="text-xs text-red-700">One founder plans to keep day job longer than discussed</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-amber-50 border-2 border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900 mb-1">Target customers buy via committees, not individuals</p>
                    <p className="text-xs text-amber-700">Sales cycle will be 6-12 months, not 1-3 as modeled</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Suggested Next Systems */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" /> Suggested Next Systems
            </h3>
            <div className="space-y-2">
              {[
                { label: "Customer Discovery", id: ScreenId.VALIDATION_CHECKLIST },
                { label: "Investor Targeting", id: ScreenId.INVESTORS_LIST },
                { label: "Financial Modeling", id: ScreenId.FINANCIAL_DASHBOARD }
              ].map((sys, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(sys.id)}
                  className="w-full text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium text-slate-700 flex items-center justify-between group"
                >
                  {sys.label}
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Fundraising Readiness (Contextual) */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" /> Fundraising Readiness
        </h3>
        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h4 className="text-2xl font-black mb-2">Not ready to raise yet</h4>
              <p className="text-slate-300 mb-4">You lack validated demand signals investors expect at this stage.</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Get 10+ customer validation interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-slate-500" />
                  <span>Build functional MVP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-slate-500" />
                  <span>Show repeatable customer acquisition</span>
                </li>
              </ul>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold shrink-0"
              onClick={() => onNavigate(ScreenId.STAGES_CAPITAL)}
            >
              View Timeline
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
