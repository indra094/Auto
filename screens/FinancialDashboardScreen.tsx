import React from 'react';
import { ScreenId } from '../types';
import { Card, Badge, Button } from '../components/UI';
import { DollarSign, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const FinancialDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const stats = [
        { label: "Revenue", value: "$12,400", change: "+12%" },
        { label: "Salaries", value: "$45,000", change: "0%" },
        { label: "Investments", value: "$250,000", change: "New" },
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Financial Overview</h2>
                    <p className="text-slate-500 font-medium">Real-time burn, runway, and capital management.</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-red-500 mb-1">9 months</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Runway 🔴</div>
                </div>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((s, i) => (
                    <Card key={i} className="p-6 border-none shadow-sm bg-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <Badge color={s.change.startsWith('+') ? 'green' : 'slate'}>{s.change}</Badge>
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                        <div className="text-3xl font-black text-slate-800">{s.value}</div>
                    </Card>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 border-none shadow-sm bg-white overflow-hidden">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 underline decoration-indigo-500 decoration-4 underline-offset-8">Equity & RSUs</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                            <span className="font-bold text-slate-600">Reserved for Talent</span>
                            <span className="text-xl font-black text-indigo-600">12%</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                            <span className="font-bold text-slate-600">Founder Pool</span>
                            <span className="text-xl font-black text-slate-800">80%</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-8 border-none shadow-xl bg-indigo-600 text-white relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <h3 className="text-xl font-bold mb-6">Recommended Actions</h3>
                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-indigo-300 shrink-0"></div>
                            <p className="text-sm text-indigo-100 italic">"Based on current burn, initiate Seed round planning in 60 days."</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-indigo-300 shrink-0"></div>
                            <p className="text-sm text-indigo-100 italic">"Reduce SaaS sprawl: 4 duplicate tools detected saving $450/mo."</p>
                        </li>
                    </ul>
                    <Button className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50 w-full font-bold">
                        Execute Optimization
                    </Button>
                </Card>
            </div>
        </div>
    );
};
