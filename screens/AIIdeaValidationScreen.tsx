import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Lightbulb, Target, TrendingUp, AlertCircle, Users, DollarSign, Calendar, ArrowRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const AIIdeaValidationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
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
                            <Target className="w-5 h-5 text-indigo-500" /> Market Size & Clarity
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase">TAM Reach</span>
                                    <span className="text-sm font-black text-slate-900">$14.2B</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Growth Index</span>
                                    <span className="text-sm font-black text-emerald-500">+18.5%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed italic border-t border-slate-50 pt-4">
                                "Market signal indicates high fragmentation. 72% of SMEs lack a dedicated foundry tooling layer."
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" /> Strengths
                        </h3>
                        <ul className="space-y-3">
                            {["High data moat via organizational intelligence", "Scalable decision framework", "Low competition in 'Pre-Incorporation' space"].map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Badge color="emerald" className="mt-0.5 whitespace-nowrap">Strength</Badge>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" /> Weaknesses
                        </h3>
                        <ul className="space-y-3">
                            {["High reliance on manual data input initially", "Long sales cycle for enterprise execs", "Complex compliance across geographies"].map((w, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Badge color="amber" className="mt-0.5 whitespace-nowrap">Risk</Badge>
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-indigo-500" /> Investor Appeal
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-xl">
                                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Verdict</div>
                                <p className="text-indigo-900 font-bold italic text-lg line-clamp-2">"A potential Category King in the emerging Venture Infrastructure space."</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Likelihood of Seed Funding</span>
                                <Badge color="indigo">85%</Badge>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" /> Target Customer Personas
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        {[
                            { name: "First-time Founder", pain: "Uncertainty", solution: "Structure" },
                            { name: "Serial Entrepreneur", pain: "Slow Decison Making", solution: "Efficiency" },
                            { name: "VC Portfolio Manager", pain: "Org Visibility", solution: "Data" }
                        ].map((p, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="font-bold text-slate-900">{p.name}</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{p.pain} → {p.solution}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="w-80 shrink-0">
                <aside className="sticky top-8 space-y-6">
                    <Card className="p-6 bg-slate-900 text-white border-transparent shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 rounded-full w-48 h-48"></div>

                        <h3 className="text-xl font-bold mb-6 relative z-10">Roadmap Estimate</h3>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-indigo-400">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Recommended Stage</div>
                                        <div className="font-bold text-lg">Pre-Seed Validation</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Target Capital</div>
                                        <div className="font-bold text-lg">$250k - $500k</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Milestone Timeline</div>
                                <div className="space-y-4">
                                    {[
                                        { label: "Idea Validation", days: "14 days", active: true },
                                        { label: "MVP Build", days: "60 days", active: false },
                                        { label: "Beta Testing", days: "30 days", active: false },
                                    ].map((m, i) => (
                                        <div key={i} className={`flex justify-between items-center text-sm ${m.active ? 'text-white' : 'text-slate-500'}`}>
                                            <span>{m.label}</span>
                                            <span className="font-mono text-xs font-bold">{m.days}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                fullWidth
                                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-transparent font-bold py-3"
                                onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}
                            >
                                Proceed to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
};
