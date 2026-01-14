import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Users, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const CoFounderFindingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const suggestions = [
        { name: "Sarah Chen", role: "CTO / Fullstack", match: 95, reason: "Deep experience in Fintech, previously at Stripe." },
        { name: "Marcus Thorne", role: "GTM / Sales", match: 88, reason: "Built enterprise sales teams for 3 SaaS unicorns." },
        { name: "Elena Rossi", role: "Product Design", match: 82, reason: "Expert in complex dashboard UX and consumer behavior." }
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Find Co-founders</h2>
                <p className="text-slate-500">AI-matched profiles based on your company mission and skill gaps.</p>
            </header>

            <div className="grid gap-6">
                {suggestions.map((p, i) => (
                    <Card key={i} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    {p.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                                    <p className="text-indigo-600 font-medium">{p.role}</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm text-slate-600"><span className="font-bold text-slate-800">Match Rationale:</span> {p.reason}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-emerald-500">{p.match}%</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score</div>
                                <Button className="mt-4 flex items-center gap-2" variant="secondary">
                                    <MessageSquare className="w-4 h-4" /> Contact
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
