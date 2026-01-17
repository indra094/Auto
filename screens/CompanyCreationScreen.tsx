import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import {
    Building,
    Loader2,
    ArrowRight,
    RefreshCw
} from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const CompanyCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const currentWorkspace = AuthService.getWorkspace();

    // Company fields
    const [name, setName] = useState(currentWorkspace?.name || '');
    const [type, setType] = useState(currentWorkspace?.type || '');

    // Startup basics fields
    const [problem, setProblem] = useState('');
    const [customer, setCustomer] = useState('');
    const [industry, setIndustry] = useState('');
    const [geography, setGeography] = useState('');
    const [stage, setStage] = useState('Idea');
    const [solution, setSolution] = useState('');

    // UI states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState({ name: false, type: false });

    // Retry timer state
    const [retryCooldown, setRetryCooldown] = useState(0);

    useEffect(() => {
        if (retryCooldown <= 0) return;

        const timer = setInterval(() => {
            setRetryCooldown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [retryCooldown]);

    const handleSave = async () => {
        if (!name || !type || !problem || !solution) {
            setTouched({ name: true, type: true });
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await AuthService.updateWorkspace({
                name,
                type,
                onboardingStep: 4,
                industry,
                geography,
                stage
            });

            setIsLoading(false);
            onNavigate(ScreenId.COMPANY_DASHBOARD);
        } catch (err: any) {
            setIsLoading(false);
            setError(err?.message || "Something went wrong.");
            setRetryCooldown(5);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <header className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Company</h1>
                <p className="text-slate-500">Now, tell us about your venture.</p>
            </header>

            <div className="space-y-6">
                {/* Company Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all ${touched.name && !name ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                                }`}
                            placeholder="e.g. Acme Corp"
                            value={name}
                            onChange={(e) => {
                                const val = e.target.value;
                                setName(val);
                                AuthService.updateWorkspace({ name: val });
                            }}
                            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                        />
                    </div>
                    {touched.name && !name && (
                        <p className="text-xs text-red-600 mt-1">Company name is required</p>
                    )}
                </div>

                {/* Company Type */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Company Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {['SaaS', 'Marketplace', 'HardTech', 'FinTech', 'Consumer', 'Other'].map(t => (
                            <button
                                key={t}
                                onClick={() => {
                                    setType(t);
                                    setTouched(prev => ({ ...prev, type: true }));
                                    AuthService.updateWorkspace({ type: t });
                                }}
                                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${type === t
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    {touched.type && !type && (
                        <p className="text-xs text-red-600 mt-1">Company type is required</p>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Save Button */}
                <div className="pt-4">
                    <Button
                        fullWidth
                        className="h-16 text-xl rounded-2xl flex items-center justify-center gap-3 font-black"
                        onClick={handleSave}
                        disabled={!name || !type || !problem || !solution || isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>Save & Continue <ArrowRight className="w-6 h-6" /></>
                        )}
                    </Button>
                </div>

                {/* Retry Button */}
                {error && (
                    <div className="pt-2">
                        <Button
                            fullWidth
                            className="h-12 rounded-xl text-lg flex items-center justify-center gap-2"
                            onClick={handleSave}
                            disabled={retryCooldown > 0}
                        >
                            {retryCooldown > 0 ? `Retry in ${retryCooldown}s` : (
                                <>
                                    Retry <RefreshCw className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
