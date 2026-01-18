import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Lightbulb, Target, TrendingUp, AlertCircle, Users, DollarSign, Calendar, ArrowRight } from 'lucide-react';

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { AuthService } from '../services/AuthService';

interface TooltipProps {
    content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    // close when clicking outside
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);



    return (
        <div className="relative inline-flex items-center" ref={ref}>
            <Info
                className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            />

            {open && (
                <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2
                        rounded-lg bg-slate-900 text-white text-xs
                        px-3 py-2 z-50 shadow-xl">
                    {content}
                </div>
            )}
        </div>
    );
};
type FormData = {
    org_id: string;

    seed_funding_probability: number | null;

    market: {
        tam_value?: number | null;
        growth_rate_percent?: number | null;
        growth_index?: number | null;
        insight?: string | null;
    };

    investor_verdict?: string | null;

    strengths: string[];
    weaknesses: string[];

    personas: {
        name: string;
        pain: string;
        solution: string;
    }[];

    roadmap: {
        recommended_stage?: string | null;
        min_capital?: number | null;
        max_capital?: number | null;
        milestones: {
            label: string;
            duration_days: number;
            is_active: boolean;
        }[];
    };
};


interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
    active: boolean;
}

export const AIIdeaValidationScreen: React.FC<ScreenProps> = ({ onNavigate, active }) => {
    // --- State ---
    const [formData, setFormData] = useState<FormData>({
        org_id: '',

        seed_funding_probability: null,

        market: {
            tam_value: null,
            growth_rate_percent: null,
            growth_index: null,
            insight: '',
        },

        investor_verdict: '',

        strengths: [],
        weaknesses: [],

        personas: [],

        roadmap: {
            recommended_stage: '',
            min_capital: null,
            max_capital: null,
            milestones: [],
        },
    });

    const showOrFallback = (value: any, fallback = "Analysis not yet generated. Try reloading the page.") => {
        if (value === null || value === undefined) return fallback;
        if (typeof value === "string" && value.trim() === "") return fallback;
        if (Array.isArray(value) && value.length === 0) return fallback;
        return value;
    };
    const isAnalysisIncomplete = (data: FormData) => {
        // Check all required fields
        if (!data.seed_funding_probability && data.seed_funding_probability !== 0) return true;
        if (!data.market || data.market.tam_value === null || data.market.growth_rate_percent === null || !data.market.insight) return true;
        if (!data.investor_verdict) return true;
        if (!data.strengths.length || !data.weaknesses.length) return true;
        if (!data.personas.length) return true;
        if (!data.roadmap || !data.roadmap.milestones.length) return true;

        return false;
    };

    const [canProceedToReadiness, setCanProceedToReadiness] = useState(false);

    const [isIncomplete, setIsIncomplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fetchAnalysis = async () => {
        setIsLoading(true);

        const ws = await AuthService.getWorkspace();
        if (!ws) return;

        const analysis = await AuthService.fetchIdeaAnalysisFromServer(ws.id);
        if (!analysis) {
            setIsLoading(false);
            setIsIncomplete(true);
            return;
        }

        setFormData({
            org_id: ws.id,
            seed_funding_probability: analysis.seed_funding_probability ?? null,
            market: analysis.market ?? { tam_value: null, growth_rate_percent: null, growth_index: null, insight: '' },
            investor_verdict: analysis.investor_verdict ?? '',
            strengths: analysis.strengths ?? [],
            weaknesses: analysis.weaknesses ?? [],
            personas: analysis.personas ?? [],
            roadmap: analysis.roadmap ?? { recommended_stage: '', min_capital: null, max_capital: null, milestones: [] },
        });

        setIsLoading(false);
    };

    useEffect(() => {
        if (!active) return;
        fetchAnalysis();
    }, [active]);

    if (isLoading) {
        return (
            <div className="p-8 max-w-7xl mx-auto">
                <div className="text-center text-lg font-bold text-slate-700">
                    Loading AI analysis..
                </div>
            </div>
        );
    }

    if (isIncomplete || isAnalysisIncomplete(formData)) {
        return (
            <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center gap-4">
                <div className="p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-2xl font-bold text-slate-900 mb-2">
                        AI Analysis Not Generated Yet
                    </div>
                    <div className="text-sm text-slate-500">
                        Try reloading the page or waiting a few seconds.
                    </div>
                    <button
                        className="mt-6 px-6 py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                        onClick={() => fetchAnalysis()}
                    >
                        Reload
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="p-8 max-w-7xl mx-auto flex gap-8">
            <div className="flex-1 space-y-8">
                <header>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Lightbulb className="text-yellow-500 w-10 h-10" /> AI Idea Validation
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">AI-driven analysis of your startup concept before you build.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-500" />
                            Market Size & Clarity
                            <Tooltip content="Evaluates how large and accessible the market is, and whether demand is clearly defined and growing." />
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                        Total Addressable Market Reach
                                        <Tooltip content="Estimated total revenue opportunity this product can realistically access across all target customers." />
                                    </span>
                                    <span className="text-sm font-black text-slate-900">
                                        {showOrFallback(formData.market.tam_value ? `$${formData.market.tam_value}B` : null)}
                                    </span>

                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                        Growth Index
                                        <Tooltip content="Projected annual market growth rate based on industry trends, funding velocity, and adoption signals." />
                                    </span>
                                    <span className="text-sm font-black text-emerald-500">
                                        {showOrFallback(formData.market.growth_rate_percent ? `+${formData.market.growth_rate_percent}%` : null)}
                                    </span>

                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed italic border-t border-slate-50 pt-4">
                                {showOrFallback(formData.market.insight)}
                            </p>

                        </div>

                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Strengths
                            <Tooltip content="Core competitive advantages that improve defensibility, scalability, or execution speed." />
                        </h3>
                        <ul className="space-y-3">
                            {(formData.strengths.length ? formData.strengths : [""]).map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Badge color="emerald" className="mt-0.5 whitespace-nowrap">Strength</Badge>
                                    {showOrFallback(s)}
                                </li>
                            ))}
                        </ul>

                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Weaknesses
                            <Tooltip content="Risks or constraints that may slow adoption, execution, or fundraising if not mitigated." />
                        </h3>

                        <ul className="space-y-3">
                            {(formData.weaknesses.length ? formData.weaknesses : [""]).map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Badge color="amber" className="mt-0.5 whitespace-nowrap">Weakness</Badge>
                                    {showOrFallback(s)}
                                </li>
                            ))}
                        </ul>

                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-indigo-500" />
                            Investor Appeal
                            <Tooltip content="Overall attractiveness of the idea from a venture investor perspective, combining market size, differentiation, and timing." />
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-xl">
                                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Verdict</div>
                                <p className="text-indigo-900 font-bold italic text-lg">
                                    {showOrFallback(formData.investor_verdict)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Likelihood of Seed Funding</span>
                                <Badge color="indigo">
                                    {showOrFallback(formData.seed_funding_probability, "Analysis not yet generated. Try reloading the page.")}%
                                </Badge>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Target Customer Personas
                        <Tooltip content="Primary buyer profiles identified based on pain severity, willingness to pay, and urgency." />
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        {(formData.personas.length ? formData.personas : [{ name: '', pain: '', solution: '' }]).map((p, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="font-bold text-slate-900">{showOrFallback(p.name)}</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">
                                    {showOrFallback(`${p.pain} → ${p.solution}`)}
                                </div>
                            </div>
                        ))}
                    </div>

                </Card>
            </div>

            <div className="w-80 shrink-0">
                <aside className="sticky top-8 space-y-6">
                    <Card className="p-6 bg-white text-slate-900 border-slate-100 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 rounded-full w-48 h-48"></div>

                        <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
                            Roadmap Estimate
                            <Tooltip content="High-level execution plan estimating capital, time, and sequencing to reach initial traction." />
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Recommended Stage</div>
                                        <div className="font-bold text-lg">
                                            {showOrFallback(formData.roadmap.recommended_stage)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Target Capital</div>
                                        <div className="font-bold text-lg">
                                            {showOrFallback(formData.roadmap.min_capital)} - {showOrFallback(formData.roadmap.max_capital)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Milestone Timeline</div>
                                <div className="space-y-4">
                                    {(formData.roadmap.milestones.length ? formData.roadmap.milestones : [{ label: '', duration_days: 0, is_active: false }])
                                        .map((m, i) => (
                                            <div key={i} className={`flex justify-between items-center text-sm ${m.is_active ? 'text-slate-900' : 'text-slate-500'}`}>
                                                <span>{showOrFallback(m.label)}</span>
                                                <span className="font-mono text-xs font-bold">{showOrFallback(m.duration_days, "N/A")} days</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {canProceedToReadiness && (
                                <Button
                                    fullWidth
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-transparent font-bold py-3"
                                    onClick={async () => {
                                        try {
                                            const ws = AuthService.getWorkspace();
                                            if (!ws?.id) throw new Error("Workspace not found");

                                            await AuthService.setOnboarding(ws.id, 4);

                                            onNavigate(ScreenId.INITIAL_READINESS);
                                        } catch (err) {
                                            console.error(err);
                                            alert("Could not advance onboarding. Please try again.");
                                        }
                                    }}
                                >
                                    Proceed to Readiness Check <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}

                        </div>
                    </Card>
                </aside>
            </div>

        </div>
    );
};
