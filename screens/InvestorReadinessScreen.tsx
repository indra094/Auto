import React from 'react';
import { ScreenId } from '../types';
import {
    TrendingUp, AlertTriangle, CheckCircle, XCircle,
    Target, Users, DollarSign, Brain, ArrowRight,
    Shield, Briefcase, FileText, ChevronRight
} from 'lucide-react';

interface InvestorReadinessScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const InvestorReadinessScreen: React.FC<InvestorReadinessScreenProps> = ({ onNavigate }) => {

    // Mock Data based on User Request
    const readinessScore = 0.48;
    const isReady = readinessScore >= 0.7;

    const pushbacks = [
        { title: "Why this team?", points: ["CEO commitment is only 10 hrs/week", "CTO owns 65% equity"] },
        { title: "Who owns execution?", points: ["No clear ownership of product delivery"] },
        { title: "Why hasn't this been done?", points: ["No customer validation yet"] }
    ];

    const fixes = [
        "Fix founder alignment (equity + commitment)",
        "Validate customer problem with 20 interviews",
        "Build MVP + early revenue proof"
    ];

    const demands = [
        { label: "Equity", value: "25–35% (dilution-heavy)", icon: <DollarSign className="w-4 h-4" /> },
        { label: "Control", value: "Board seat / Observer rights", icon: <Users className="w-4 h-4" /> },
        { label: "Milestones", value: "MVP + 50 paying customers", icon: <Target className="w-4 h-4" /> },
        { label: "Governance", value: "Monthly reporting + vesting cliffs", icon: <FileText className="w-4 h-4" /> }
    ];

    const simulatedReaction = [
        { label: "Reject", value: 60, color: "bg-red-500", icon: <XCircle className="w-4 h-4 text-red-500" /> },
        { label: "Soft Interest", value: 30, color: "bg-amber-400", icon: <Briefcase className="w-4 h-4 text-amber-500" /> },
        { label: "Fund", value: 10, color: "bg-emerald-500", icon: <DollarSign className="w-4 h-4 text-emerald-500" /> }
    ];

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto pb-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                            Core Intelligence
                        </span>
                        <span className="text-slate-400 text-xs">• Last run: 3m ago</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Investor Readiness</h1>
                    <p className="text-slate-500 font-medium mt-1">AI-driven analysis of your fundraising potential</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                        Export Summary
                    </button>
                    <button className="px-5 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Re-run Analysis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN - Score & Recommendation */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Readiness Score Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500"></div>
                        <div className="p-6 md:p-8 text-center relative z-10">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Readiness Score</h3>
                            <div className="flex items-center justify-center mb-2">
                                <span className={`text-6xl font-black tracking-tighter ${isReady ? 'text-emerald-500' : 'text-slate-900'}`}>{readinessScore}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase mb-6">
                                <AlertTriangle className="w-3 h-3" />
                                Not Ready
                            </div>
                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                “If you pitched tomorrow, you’d likely get a soft reject or a request for major changes.”
                            </p>
                        </div>
                    </div>

                    {/* Clear Recommendation */}
                    <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 md:p-8 text-white relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all"></div>

                        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Recommendation</h3>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/50">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Delay Fundraising</span>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            “Fix founder alignment and customer validation first. Then revisit fundraising with a stronger narrative.”
                        </p>

                        <button
                            onClick={() => onNavigate(ScreenId.FOUNDERS_ALIGNMENT)} // Assuming this leads to fixes
                            className="w-full py-3 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                        >
                            Next Action: Fix Alignment
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Top 3 Fixes */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            Top 3 Fixes to Become Pitch-Ready
                        </h3>
                        <ul className="space-y-3">
                            {fixes.map((fix, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 mt-0.5">{i + 1}</span>
                                    <span>{fix}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* CENTER/RIGHT COLUMN - Details */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Top Row: Investor Type & Mindset */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Likely Investor Type */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Likely Investor Type</h3>
                                <Target className="w-5 h-5 text-indigo-500" />
                            </div>

                            <div className="text-lg font-bold text-slate-900 mb-4">
                                🎯 Most likely: Angel / Micro-VC
                            </div>

                            <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Sector Fit</span>
                                    <span className="font-bold text-emerald-600">Fintech (High)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Stage Fit</span>
                                    <span className="font-bold text-amber-500">Pre-Seed (Low)</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Mismatch Flags</span>
                                <ul className="space-y-1">
                                    <li className="text-xs text-red-600 font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Product not proven yet
                                    </li>
                                    <li className="text-xs text-red-600 font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Team execution risk
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Investor Mindset */}
                        <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 flex flex-col justify-center relative">
                            <Brain className="absolute top-6 right-6 w-12 h-12 text-indigo-200 opacity-50" />
                            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Investor Mindset</h3>
                            <div className="space-y-4 relative z-10">
                                <blockquote className="border-l-4 border-indigo-200 pl-4 py-1 italic text-slate-700 text-sm">
                                    “This is a team risk, not a market risk.”
                                </blockquote>
                                <blockquote className="border-l-4 border-indigo-200 pl-4 py-1 italic text-slate-700 text-sm">
                                    “We’d need governance + milestones before committing.”
                                </blockquote>
                            </div>
                        </div>

                    </div>

                    {/* Pitch Reaction Simulated */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Pitch Reaction (Simulated)</h3>
                        <div className="space-y-4">
                            {simulatedReaction.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-28 flex items-center gap-2 text-sm font-bold text-slate-700 shrink-0">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} transition-all duration-1000 ease-out`} style={{ width: `${item.value}%` }}></div>
                                    </div>
                                    <div className="w-10 text-right text-sm font-bold text-slate-500">{item.value}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row: Pushbacks & Demands */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Expected Pushback */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-slate-800">Expected Pushback</h3>
                                <Shield className="w-4 h-4 text-slate-400" />
                            </div>

                            <div className="space-y-6">
                                {pushbacks.map((pb, i) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                            “{pb.title}”
                                        </div>
                                        <ul className="pl-9 space-y-1">
                                            {pb.points.map((pt, j) => (
                                                <li key={j} className="text-xs text-slate-500 list-disc list-outside ml-3">
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                Copy to Pitch Notes
                            </button>
                        </div>

                        {/* Investor Demands */}
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-bold text-slate-800">What Investors Will Demand</h3>
                                <Briefcase className="w-4 h-4 text-slate-400" />
                            </div>

                            <div className="space-y-4">
                                {demands.map((demand, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm">
                                        <div className="mt-0.5 text-slate-400 shrink-0">{demand.icon}</div>
                                        <div>
                                            <span className="font-semibold text-slate-900 block">{demand.label}</span>
                                            <span className="text-slate-600 block text-xs mt-0.5">{demand.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800 font-medium italic">
                                “Expect dilution-heavy terms due to execution risk.”
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};
