import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ArrowLeft, TrendingUp, DollarSign, Users, Target, Activity } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const SubOrgDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => onNavigate(ScreenId.FINANCIAL_DASHBOARD)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Product & Engineering</h2>
                        <Badge color="emerald">Healthy</Badge>
                    </div>
                    <p className="text-slate-500 font-medium">Lead: Sarah Chen | Mission: Build the core platform</p>
                </div>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Trend</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">$12,400</div>
                    <div className="text-xs text-emerald-500 font-bold mt-1">+12% vs last month</div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost Structure</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">$45,000</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">Salaries & Infrastructure</div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guidance vs Actual</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">98.2%</div>
                    <div className="text-xs text-emerald-500 font-bold mt-1">On track</div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800">Active Projects</h3>
                    {[
                        { name: "Mobile App Refactor", cost: "$12k", timeline: "4 weeks", owner: "Alex K.", score: 92 },
                        { name: "Auth Service V2", cost: "$5k", timeline: "2 weeks", owner: "Sarah C.", score: 85 },
                        { name: "AI Insight Engine", cost: "$20k", timeline: "8 weeks", owner: "Jordan T.", score: 98 },
                    ].map((project, i) => (
                        <Card key={i} className="p-4 flex items-center justify-between border-slate-100 hover:border-indigo-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{project.name}</div>
                                    <div className="text-xs text-slate-500">{project.owner} • {project.timeline}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-slate-900">{project.cost}</div>
                                <Badge color={project.score > 90 ? 'emerald' : 'amber'} className="text-[10px] py-0">
                                    {project.score}% Relevance
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800">AI Org Insights</h3>
                    <Card className="p-6 bg-indigo-50 border-indigo-100">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                                    <Zap className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-indigo-900 uppercase tracking-tight">Keep Signal</div>
                                    <p className="text-sm text-indigo-800 mt-1 leading-relaxed">
                                        AI Insight Engine project has 98% relevance to core mission. Suggesting increased resources.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                                    <Target className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-amber-900 uppercase tracking-tight">Pause Signal</div>
                                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                        Mobile App Refactor shows high cost but medium impact on immediate revenue goals.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-indigo-100">
                                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Opportunity Cost</div>
                                <p className="text-sm text-indigo-700 font-medium">
                                    Redeploying 2 devs from Mobile App to AI Engine could accelerate Series A readiness by 3 weeks.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const Zap = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
