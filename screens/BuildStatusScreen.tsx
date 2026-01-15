import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { CheckCircle, Circle, PlayCircle, ArrowRight, Zap, AlertTriangle } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const BuildStatusScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const metrics = [
        { label: "MVP Defined", status: "🟡", detail: "Specs finalized, technical architecture approved." },
        { label: "Core Loop Built", status: "🔴", detail: "Backend services 40% complete. Auth integrated." },
        { label: "Users Onboarded", status: "🔴", detail: "Waiting for MVP stable build." },
    ];

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Build Progress</h2>
                <p className="text-slate-500 font-medium italic">Shipping beats perfecting — every single time.</p>
            </header>

            <div className="space-y-6">
                {metrics.map((m, i) => (
                    <Card key={i} className="p-8 flex justify-between items-center bg-white border-2 border-slate-100 transition-all hover:border-indigo-100">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{m.status}</span>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{m.label}</h3>
                                <p className="text-sm text-slate-500 mt-1">{m.detail}</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="px-6 font-bold">Update Status</Button>
                    </Card>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 bg-slate-900 text-white shadow-2xl shadow-indigo-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                        <Zap className="w-5 h-5" /> Build vs Buy Guidance
                    </h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-[10px] font-black uppercase text-indigo-300">Auth & AuthZ</div>
                            <div className="text-sm font-bold mt-1 text-emerald-400">Buy (PropelAuth/Clerk)</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-[10px] font-black uppercase text-indigo-300">Decision Engine</div>
                            <div className="text-sm font-bold mt-1 text-amber-400">Build (Proprietary Moat)</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-8 bg-red-50 border-red-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" /> Scope Warnings
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-black shrink-0">!</div>
                            <p className="text-xs text-red-700 leading-relaxed">
                                "Mobile App" is listed as a P0 milestone. Foundry data suggests skipping this for MVP and focusing on <strong>Web-First</strong> to reach PMF faster.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-black shrink-0">!</div>
                            <p className="text-xs text-red-700 leading-relaxed">
                                Manual data export feature is bloated. Simplify to CSV download only.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-12 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Engineering Velocity</h3>
                <div className="flex items-end gap-2 h-24 mb-6">
                    {[40, 60, 45, 90, 75, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg transition-all hover:bg-indigo-500" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <p className="text-slate-500 text-sm italic">
                    Velocity increased by <span className="text-indigo-600 font-bold">12%</span> this week. Recommend focus on "Core Loop" stabilization.
                </p>
            </div>
        </div>
    );
};
