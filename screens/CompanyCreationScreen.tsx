import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Building, Globe, Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const CompanyCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (!name || !type) return;
        setIsLoading(true);
        await AuthService.updateWorkspace({ name, type, onboardingStep: 3 });
        setIsLoading(false);
        onNavigate(ScreenId.STARTUP_BASICS);
    };

    const types = ['SaaS', 'Marketplace', 'HardTech', 'FinTech', 'Consumer', 'Other'];

    return (
        <div className="max-w-md mx-auto py-12 px-6">
            <header className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Company</h1>
                <p className="text-slate-500">Now, tell us about your venture.</p>
            </header>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                    <div className="relative">
                        <Building className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Acme Corp"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {types.map(t => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${type === t
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Role</label>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium">
                        Founder
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        fullWidth
                        className="h-14 rounded-xl text-lg flex items-center justify-center gap-2"
                        onClick={handleCreate}
                        disabled={!name || !type || isLoading}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>Create Company <ArrowRight className="w-5 h-5" /></>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
