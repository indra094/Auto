import React from 'react';
import { ScreenId } from '../types';
import { Card, Badge, Button } from '../components/UI';
import { DollarSign, TrendingUp, AlertCircle, ArrowUpRight, BarChart, Loader2 } from 'lucide-react';
import { AuthService } from '../services/AuthService';
import { IntelligenceService } from '../services/IntelligenceService';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const FinancialDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const [isRecalculating, setIsRecalculating] = React.useState(false);
    const [runway, setRunway] = React.useState(9);

    const stats = [
        { label: "Monthly Burn", value: "$4,200", change: "-5%" },
        { label: "Cash on Hand", value: "$38,400", change: "0%" },
        { label: "Investments", value: "$250,000", change: "Commit" },
    ];

    const handleRecalculate = () => {
        setIsRecalculating(true);
        setTimeout(() => {
            setRunway(runway + 1);
            setIsRecalculating(false);
        }, 1500);
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <header className="mb-10 flex justify-between items-end max-w-6xl mx-auto">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Financial Engine</h2>
                    <p className="text-slate-500 font-medium">Real-time burn, runway, and capital management.</p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-black ${runway < 6 ? 'text-red-500' : 'text-emerald-500'} transition-all`}>{runway}</span>
                        <span className="text-slate-400 font-bold">months</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        {isRecalculating ? <Loader2 className="w-3 h-3 animate-spin" /> : "Est. Runway"}
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleRecalculate} disabled={isRecalculating} className="text-[10px] uppercase font-bold py-1 px-3 border-slate-200">
                        {isRecalculating ? "Engine Working..." : "Recalculate"}
                    </Button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <Card key={i} className="p-6 border-none shadow-sm bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <Badge color={s.change.startsWith('-') ? 'green' : 'slate'}>{s.change}</Badge>
                            </div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                            <div className="text-3xl font-black text-slate-800">{s.value}</div>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 p-8 border-none shadow-sm bg-white overflow-hidden">
                        <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <BarChart className="w-5 h-5 text-indigo-500" /> Burn Breakdown
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: "Cloud & Infra", cost: 1200, percent: 30 },
                                { label: "Talent / Contractors", cost: 2500, percent: 60 },
                                { label: "Admin & Subs", cost: 500, percent: 10 },
                            ].map(item => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="text-slate-900">${item.cost}</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${item.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 border-none shadow-xl bg-slate-900 text-white relative flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-indigo-400">AI CFO Insight</h3>
                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                                    <p className="text-sm text-slate-300 italic">"Your current cloud burn is <span className="text-white font-bold">15% higher</span> than comparable AI startups. We found $400 in unused GPU credits."</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                                    <p className="text-sm text-slate-300 italic">"Seed round plan is viable for May 2026."</p>
                                </li>
                            </ul>
                        </div>
                        <Button
                            className="mt-8 bg-indigo-600 text-white hover:bg-indigo-700 w-full font-bold border-none h-12"
                            onClick={async () => {
                                const user = AuthService.getUser();
                                if (user) {
                                    await IntelligenceService.logDecision(user.email, {
                                        type: 'Financial',
                                        details: 'Cloud Infra Optimization',
                                        impact: '$400/mo savings'
                                    });
                                    alert("Decision Logged: Cloud optimization initiated. The intelligence loop will refresh dashboard priorities.");
                                }
                            }}
                        >
                            Optimize My Burn
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
