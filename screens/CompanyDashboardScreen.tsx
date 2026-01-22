import React, { useState, useEffect, useMemo } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, ProgressBar } from '../components/UI';
import { getOnboardingProgress } from '../utils/onboarding';
import {
  Heart,
  CheckCircle,
  Zap,
  Loader2,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Target,
  Lock,
} from 'lucide-react';
import { AuthService, Workspace } from '../services/AuthService';
import { IntelligenceService } from '../services/IntelligenceService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isActivationMode = (workspace?.onboardingStep || 0) < 3;

  // Simple MVP progress score
  const onboardingProgress = useMemo(() => {
    return getOnboardingProgress(workspace?.onboardingStep);
  }, [workspace?.onboardingStep]);

  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      setLoading(true);
      const w = await AuthService.fetchWorkspaceFromServer(user.current_org_id);
      console.log("🔥 Workspace", w);
      setWorkspace(w);

      try {
        // Here we could pass w.id if getDashboardStats supported it, 
        // but it currently takes email and likely infers org from backend user state.
        // Since we updated backend state in setCurrentWorkspace, this should return correct stats.
        const s = await IntelligenceService.getDashboardStats(user.email);
        setStats(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();

    // Subscribe to workspace changes
    const unsubscribe = AuthService.onWorkspaceChange((w) => {
      // Re-run load when workspace changes
      load();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading)
    return (
      <div className="p-12 flex justify-center">
        <Loader2 className="animate-spin text-indigo-500" />
      </div>
    );

  const onboardingSteps = [
    {
      id: ScreenId.ACCOUNT_CREATION,
      label: 'Your Info',
      completed: (workspace?.onboardingStep || 0) >= 2,
      current: (workspace?.onboardingStep || 0) === 1,
      why: 'This affects founder equity.',
    },
    {
      id: ScreenId.COMPANY_INFORMATION,
      label: 'Company Information',
      completed: (workspace?.onboardingStep || 0) >= 3,
      current: (workspace?.onboardingStep || 0) === 2,
      why: 'This affects how much money you need.',
    },
  ];

  // ======================
  // ACTIVATION MODE (Onboarding)
  // ======================
  if (isActivationMode) {
    console.log("here")
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-3">Welcome to Foundry</h2>
          <p className="text-slate-500 text-lg font-medium">
            Complete setup to unlock AI-powered insights
          </p>
        </header>

        {/* Progress */}
        <Card className="mb-10 p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-black mb-2">Setup Progress</h3>
                <p className="text-indigo-100 text-sm">Your startup is taking shape</p>
              </div>
              <div className="text-6xl font-black">{onboardingProgress}%</div>
            </div>

            <ProgressBar
              value={onboardingProgress}
              height="h-3"
              className="bg-white/20"
              color="bg-white"
            />
            <p className="text-indigo-100 text-sm mt-4">
              Complete onboarding to unlock full intelligence dashboard
            </p>
          </div>
        </Card>

        {/* Onboarding steps */}
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
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                        ? 'bg-emerald-500 text-white'
                        : step.current
                          ? 'bg-indigo-500 text-white animate-pulse'
                          : 'bg-slate-300 text-slate-500'
                        }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-bold text-sm">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-bold ${step.current ? 'text-indigo-900' : step.completed ? 'text-emerald-900' : 'text-slate-600'
                          }`}
                      >
                        {step.label}
                      </h4>
                      <p className={`text-xs mt-0.5 ${step.current ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {step.why}
                      </p>
                    </div>
                  </div>

                  {step.current && (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 font-bold" onClick={() => onNavigate(step.id)}>
                      Continue →
                    </Button>
                  )}

                  {step.completed && <Badge color="emerald" className="px-3 py-1">Complete</Badge>}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Teaser */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Coming Soon
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: AlertTriangle, title: 'Founder Imbalance' },
              { icon: DollarSign, title: 'Capital Estimate' },
              { icon: Heart, title: 'Market Timing' },
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
                <p className="text-sm text-slate-500">AI insights locked</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ======================
  // OPERATING MODE (MVP)
  // ======================

  // MVP: Executive summary (AI verdict)
  const verdict = stats?.verdict || 'On track';
  const thesis = stats?.thesis || 'Your startup thesis goes here.';

  // MVP: Top 3 actions (AI-driven)
  const actions = stats?.topActions || [
    {
      title: 'Founder equity misalignment',
      why: 'Founder time commitment differs after 6 months',
      risk: 'Equity disputes & loss of focus',
      screenId: ScreenId.ALIGNMENT_OVERVIEW,
    },
    {
      title: 'Runway < 6 months',
      why: 'Cash burn exceeds planned revenue',
      risk: 'You must raise or reduce burn',
      screenId: ScreenId.FINANCIAL_DASHBOARD,
    },
    {
      title: 'Customer validation missing',
      why: 'Market risk is unknown',
      risk: 'Building something nobody wants',
      screenId: ScreenId.VALIDATION_CHECKLIST,
    },
  ];

  // MVP: Capital & runway (simple numbers)
  const runwayMonths = stats?.runwayMonths ?? 6;
  const burnRate = stats?.burnRate ?? 12000;
  const recommendedAction = stats?.capitalRecommendation || 'Raise in 3 months';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Company Dashboard</h2>
          <p className="text-slate-500 mt-2 font-medium">
            AI-powered operating system for {workspace?.name || 'your startup'}
          </p>
        </div>
        <Badge color="indigo" className="px-4 py-2 text-sm font-bold">
          {workspace?.stage || 'Pre-Seed'}
        </Badge>
      </header>

      {/* 1) Executive Summary */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500" /> Executive Summary
        </h3>

        <Card className="p-6 border-2 border-slate-200">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h3 className="text-xl font-black">{workspace?.name || 'Your Company'}</h3>
              <p className="text-sm text-slate-500 mt-1">{thesis}</p>
            </div>
            <Badge
              color={
                verdict === 'On track'
                  ? 'emerald'
                  : verdict === 'At risk'
                    ? 'red'
                    : verdict === 'Capital constrained'
                      ? 'amber'
                      : 'indigo'
              }
              className="px-4 py-2 text-sm font-bold"
            >
              {verdict}
            </Badge>
          </div>
        </Card>
      </section>

      {/* 2) What Needs Attention Now */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" /> What Needs Attention Now
        </h3>

        <div className="space-y-3">
          {actions.slice(0, 3).map((action, i) => (
            <Card
              key={i}
              className="p-5 border-l-4 border-l-red-500 bg-red-50/50 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => action.screenId && onNavigate(action.screenId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white bg-red-500">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">{action.title}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Why:</strong> {action.why}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Risk if ignored:</strong> {action.risk}
                    </p>
                  </div>
                </div>
                {action.screenId && <ArrowRight className="w-5 h-5 text-slate-400" />}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3) Readiness Tracker */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" /> Readiness Tracker
        </h3>

        <div className="space-y-3">
          {onboardingSteps.map((step, i) => (
            <Card
              key={i}
              className={`p-5 transition-all ${step.completed
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-slate-200 bg-slate-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-500'}`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold text-sm">{i + 1}</span>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700">{step.label}</h4>
                    <p className="text-xs text-slate-500 mt-1">{step.why}</p>
                  </div>
                </div>
                {step.current && (
                  <Button className="bg-indigo-600 hover:bg-indigo-700 font-bold" onClick={() => onNavigate(step.id)}>
                    Continue →
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4) Capital & Runway */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" /> Capital & Runway
        </h3>

        <Card className="p-6 border-2 border-slate-200">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-slate-500">Runway</p>
              <p className="text-2xl font-black">{runwayMonths} months</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Burn Rate</p>
              <p className="text-2xl font-black">${burnRate}/mo</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Recommendation</p>
              <Badge color="indigo" className="px-4 py-2 text-sm font-bold">
                {recommendedAction}
              </Badge>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="secondary"
              className="bg-indigo-600 hover:bg-indigo-700 font-bold"
              onClick={() => onNavigate(ScreenId.FINANCIAL_DASHBOARD)}
            >
              Open Financial Dashboard →
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
