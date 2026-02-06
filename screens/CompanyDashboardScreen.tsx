import React, { useState, useEffect, useMemo, useRef } from 'react';
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
import { Info } from "lucide-react";

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

// src/types/dashboard.ts

export type KillerInsightRisk =
  | "Founder Risk"
  | "Capital Risk"
  | "Market Risk"
  | "Execution Risk"
  | string;

export interface DashboardAction {
  title: string;
  why: string;
  risk: string;
  screenId:
  | "ALIGNMENT_OVERVIEW"
  | "FINANCIAL_DASHBOARD"
  | "VALIDATION_CHECKLIST"
  | string;
}

export interface Dashboard {
  id: number;

  // --- Executive Summary ---
  verdict: string;
  thesis: string;

  // --- Killer Insight ---
  killer_insight: string;
  killer_insight_risk?: KillerInsightRisk;
  killer_insight_confidence?: number; // 0.0 – 1.0

  // --- Capital & Runway ---
  runway_months?: number;
  burn_rate?: number;

  capital_recommendation?: string;

  // --- Action Items ---
  top_actions: DashboardAction[];

  // --- Metadata ---
  data_sources?: string[];

  last_computed_at?: string; // ISO date string
  model_version?: string;
}

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 text-slate-400 hover:text-slate-600 focus:outline-none"
      >
        <Info className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute z-50 top-6 left-1/2 -translate-x-1/2 w-64 rounded-lg border border-slate-200 bg-white shadow-xl p-3 text-xs text-slate-600">
          {content}
        </div>
      )}
    </div>
  );
};

const CompanyDashboardSkeleton = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* Header Skeleton */}
      <header className="flex justify-between items-center mb-10">
        <div className="space-y-3">
          <span className="block h-10 w-64 bg-slate-200 rounded animate-pulse" />
          <span className="block h-5 w-96 bg-slate-200 rounded animate-pulse" />
        </div>
        <span className="block h-8 w-32 bg-slate-200 rounded animate-pulse" />
      </header>

      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-3 w-3 rounded-full bg-slate-300 animate-pulse" />
        <span>
          Dashboard is being generated. This can take a few seconds.
        </span>
      </div>

      {/* Executive Summary Skeleton */}
      <section className="space-y-3 mb-10">
        <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse mb-3" />
        <span className="block h-16 w-full bg-slate-200 rounded animate-pulse mb-2" />
        <span className="block h-4 w-80 bg-slate-200 rounded animate-pulse" />
      </section>

      {/* Killer Insight Skeleton */}
      <section className="space-y-3 mb-10">
        <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse mb-3" />
        <span className="block h-12 w-full bg-slate-200 rounded animate-pulse mb-2" />
        <span className="block h-4 w-32 bg-slate-200 rounded animate-pulse" />
      </section>

      {/* What Needs Attention Skeleton */}
      <section className="space-y-3 mb-10">
        <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse mb-3" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <span className="block h-5 w-64 bg-slate-200 rounded animate-pulse" />
            <span className="block h-4 w-80 bg-slate-200 rounded animate-pulse" />
            <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </section>

      {/* Readiness Tracker Skeleton */}
      <section className="space-y-3 mb-10">
        <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse mb-3" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="block w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              <div className="space-y-1">
                <span className="block h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <span className="block h-3 w-48 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <span className="block h-8 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
      </section>

      {/* Capital & Runway Skeleton */}
      <section className="space-y-3">
        <span className="block h-4 w-48 bg-slate-200 rounded animate-pulse mb-3" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <span className="block h-3 w-32 bg-slate-200 rounded animate-pulse" />
              <span className="block h-8 w-40 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  const isActivationMode = (workspace?.onboardingStep || 0) < 5;

  // Simple MVP progress score
  const onboardingProgress = useMemo(() => {
    return getOnboardingProgress(workspace?.onboardingStep);
  }, [workspace?.onboardingStep]);

  const [data, setData] = useState<Dashboard | null>(null);

  const [updating, setUpdating] = useState(false);
  const [queueSize, setQueueSize] = useState<number>(0);
  const queueSizeRef = useRef(queueSize);
  let size = 0;
  const orgId = AuthService.getCachedUser()?.current_org_id;


  useEffect(() => {
    if (!orgId) return;

    let interval: NodeJS.Timeout | null = null;

    const fetchDashboard = async () => {
      const data = await AuthService.getDashboard(orgId);

      if (data) {
        console.log("responsesize" + data.size)
        setQueueSize(data.size);       // update state
        queueSizeRef.current = data.size;  // update ref immediately for interval
        if (data.dashboard) {
          setData(data.dashboard);
          data.last_computed_at = new Date(data.dashboard.last_computed_at).toLocaleString();

          setUpdating(false);
          return true;
        }
      }

      return false;
    };

    const init = async () => {
      setLoading(true);
      const ws = await AuthService.fetchWorkspaceFromServer(
        AuthService.getUser()?.current_org_id
      );
      setWorkspace(ws);
      setLoading(false);
      // console.log("orgId", orgId)

      // first call immediately
      const hasDashboard = await fetchDashboard();
      // set updating state based on availability
      if (!hasDashboard) setUpdating(true);
      interval = setInterval(async () => {
        const ready = await fetchDashboard();
        let current = queueSizeRef.current;
        console.log("queue size", current); // always latest value

        if (!ready && current === 0) {
          AuthService.updateDashboard(orgId);

          setUpdating(true);
        } else {
          setUpdating(false);
        }
      }, 5000);


      setLoading(false);
    };
    init();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orgId]);


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
      why: 'This is information about your role.',
    },
    {
      id: ScreenId.FOUNDERS_LIST,
      label: 'Founding Team',
      completed: (workspace?.onboardingStep || 0) >= 3,
      current: (workspace?.onboardingStep || 0) === 2,
      why: 'This is information about your founding team.',
    },
    {
      id: ScreenId.COMPANY_INFORMATION,
      label: 'Company Information',
      completed: (workspace?.onboardingStep || 0) >= 4,
      current: (workspace?.onboardingStep || 0) === 3,
      why: 'This is information about your business idea and strategy.',
    },
    {
      id: ScreenId.FINANCIALS_ONBOARDING,
      label: 'Financials',
      completed: (workspace?.onboardingStep || 0) >= 5,
      current: (workspace?.onboardingStep || 0) === 4,
      why: 'This is information about your company\'s financials.',
    },
  ];

  // ======================
  // ACTIVATION MODE (Onboarding)
  // ======================
  if (isActivationMode) {
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

  if (!data && !isActivationMode) {
    return (
      <CompanyDashboardSkeleton />
    )
  }

  // ======================
  // OPERATING MODE (MVP)
  // ======================

  // MVP: Executive summary (AI verdict)
  const verdict = data?.verdict || 'Insufficient information to generate this.';
  const thesis = data?.thesis || 'Insufficient information to generate this.';

  // MVP: Top 3 actions (AI-driven)
  const actions = data?.top_actions
  // MVP: Capital & runway (simple numbers)
  const runwayMonths = data?.runway_months;
  const burnRate = data?.burn_rate;
  const recommendedAction = data?.capital_recommendation || 'Insufficient information to generate this.';

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
        <Badge
          color={
            data.verdict === 'Execution Stable'
              ? 'emerald'
              : data.verdict === 'Execution Risk'
                ? 'red'
                : 'amber'
          }
          className="px-4 py-2 text-sm font-bold"
        >
          {data.verdict}
        </Badge>
      </header>

      {/* 1) Executive Summary */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500" /> Executive Summary
        </h3>

        <Card className="p-6 border-2 border-slate-200">
          <h3 className="text-xl font-black">{workspace?.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{data.thesis}</p>
        </Card>
      </section>

      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" /> Killer Insight
        </h3>

        <Card className="p-6 border-l-4 border-l-red-500 bg-red-50/50">
          <p className="font-medium text-slate-800">
            {data.killer_insight}
          </p>

          <div className="flex items-center gap-4 mt-3">
            {data.killer_insight_risk && (
              <Badge color="red">{data.killer_insight_risk}</Badge>
            )}
            {data.killer_insight_confidence !== undefined && (
              <span className="text-xs text-slate-500">
                Confidence {(data.killer_insight_confidence * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </Card>
      </section>


      {/* 2) What Needs Attention Now */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" /> What Needs Attention Now
        </h3>

        {data?.top_actions?.length === 0 ? (
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <p className="text-sm text-emerald-800 font-medium">
              No critical risks detected at this time.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {data.top_actions.slice(0, 3).map((action, i) => (
              <Card
                key={i}
                className="p-5 border-l-4 border-l-red-500 bg-red-50/50 cursor-pointer"
                onClick={() => onNavigate(action.screen_id)}
              >
                <p className="font-medium">{action.title}</p>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Why:</strong> {action.why}
                </p>
                <p className="text-xs text-slate-600">
                  <strong>Risk:</strong> {action.risk}
                </p>
              </Card>
            ))}
          </div>
        )}
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

      {(data.runway_months || data.burn_rate) && (
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" /> Capital & Runway
          </h3>

          <Card className="p-6 border-2 border-slate-200">
            <div className="grid md:grid-cols-3 gap-6">
              {data.runway_months && (
                <div>
                  <p className="text-xs text-slate-500">Runway</p>
                  <p className="text-2xl font-black">{data.runway_months} months</p>
                </div>
              )}

              {data.burn_rate && (
                <div>
                  <p className="text-xs text-slate-500">Burn Rate</p>
                  <p className="text-2xl font-black">${data.burn_rate}/mo</p>
                </div>
              )}

              {data.capital_recommendation && (
                <div>
                  <p className="text-xs text-slate-500">Recommendation</p>
                  <Badge color="indigo">{data.capital_recommendation}</Badge>
                </div>
              )}
            </div>
          </Card>
        </section>
      )}

    </div>
  );
};
