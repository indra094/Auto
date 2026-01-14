import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { CheckCircle, Circle, PlayCircle, ArrowRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const BuildStatusScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const metrics = [
        { label: "MVP Defined", status: "DONE", color: "text-emerald-500" },
        { label: "Core Loop Built", status: "IN_PROGRESS", color: "text-amber-500" },
        { label: "Users Onboarded", status: "TODO", color: "text-slate-400" },
    ];

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Build Progress</h2>
                <p className="text-slate-500 font-medium italic">Shipping beats perfecting — every single time.</p>
            </header>

            <div className="space-y-6">
                {metrics.map((m, i) => (
                    <Card key={i} className="p-8 flex justify-between items-center bg-white border-2 border-slate-100">
                        <div className="flex items-center gap-4">
                            {m.status === 'DONE' && <CheckCircle className="w-8 h-8 text-emerald-500" />}
                            {m.status === 'IN_PROGRESS' && <PlayCircle className="w-8 h-8 text-amber-500" />}
                            {m.status === 'TODO' && <Circle className="w-8 h-8 text-slate-200" />}
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{m.label}</h3>
                                <p className={`text-xs font-black uppercase tracking-widest ${m.color} mt-1`}>{m.status.replace('_', ' ')}</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="px-6">Update Status</Button>
                    </Card>
                ))}
            </div>

            <div className="mt-12 bg-indigo-900 text-white rounded-3xl p-8 shadow-2xl shadow-indigo-200">
                <h3 className="text-xl font-bold mb-4">Engineering Velocity</h3>
                <div className="flex items-end gap-2 h-24 mb-6">
                    {[40, 60, 45, 90, 75, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-500/50 rounded-t-lg transition-all hover:bg-indigo-400" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <p className="text-indigo-200 text-sm">
                    Velocity increased by <span className="text-white font-bold">12%</span> this week. Recommend focus on "Core Loop" stabilization.
                </p>
            </div>
        </div>
    );
};
