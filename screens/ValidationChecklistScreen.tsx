import React from 'react';
import { ScreenId } from '../types';
import { Card, Badge } from '../components/UI';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const ValidationChecklistScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const items = [
        { label: "10 customer conversations", done: true },
        { label: "Pain confirmed", done: true },
        { label: "Willingness to pay", done: true },
        { label: "Referenceable pilot customers", done: false },
        { label: "Founder/Market fit documented", done: false }
    ];

    const validated = items.filter(i => i.done).length >= 3;

    return (
        <div className="p-12 max-w-2xl mx-auto text-center">
            <header className="mb-12">
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Validation Checklist</h2>
                <p className="text-slate-500 text-lg">Auto-tracked evidence of product-market pull.</p>
            </header>

            <Card className="p-8 text-left bg-white border-2 border-slate-100 shadow-xl overflow-hidden relative">
                {validated && (
                    <div className="absolute top-0 right-0 p-4">
                        <Badge color="green" className="text-sm px-3 py-1 uppercase tracking-widest font-black">VALIDATED</Badge>
                    </div>
                )}

                <div className="space-y-6">
                    {items.map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${item.done ? 'bg-emerald-50 text-emerald-900' : 'bg-slate-50 text-slate-400 opacity-60'}`}>
                            {item.done ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
                            <span className="text-lg font-bold">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-sm text-slate-400">
                        <span className="font-bold text-slate-800">{items.filter(i => i.done).length}/{items.length}</span> criteria met
                    </div>
                    <button
                        onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}
                        className="text-indigo-600 font-bold flex items-center gap-2 hover:underline"
                    >
                        Return to Dashboard <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </Card>

            <div className="mt-12 p-6 bg-amber-50 border border-amber-100 rounded-2xl text-left">
                <h4 className="font-bold text-amber-900 mb-2">🤖 AI Signal</h4>
                <p className="text-sm text-amber-800 leading-relaxed italic">
                    "Your 'Willingness to Pay' is high. Data from recent customer calls suggests a monthly subscription price point of $49–$99 is defensible."
                </p>
            </div>
        </div>
    );
};
