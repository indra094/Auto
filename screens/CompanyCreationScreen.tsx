
import React, { useState, useEffect } from 'react';
import {
    Building,
    Loader2,
    ArrowRight,
    CheckCircle2,
    Target,
    MapPin,
    Briefcase,
    Users
} from 'lucide-react';
import { AuthService } from '../services/AuthService';
import { ScreenId } from '../types';

// --- CSS Styles (Light Mode) ---

const styles = `
  :root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --primary-light: #eef2ff;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --text-light: #94a3b8;
    --bg-page: #f8fafc;
    --bg-card: #ffffff;
    --border: #e2e8f0;
    --danger: #ef4444;
    --danger-bg: #fef2f2;
    --success: #22c55e;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  /* Typography */
  h1 { font-size: 2rem; font-weight: 800; color: var(--text-main); letter-spacing: -0.025em; margin-bottom: 0.5rem; }
  h2 { font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem; margin-top: 2rem; }
  .subtitle { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2.5rem; }
  
  .label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-light);
    margin-bottom: 0.5rem;
  }
  
  .required { color: var(--danger); margin-left: 2px; }

  /* Forms */
  .form-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  }

  .input-group { margin-bottom: 24px; position: relative; }
  
  .input-wrapper { position: relative; }
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
    pointer-events: none;
  }

  input[type="text"], textarea {
    width: 100%;
    padding: 14px 16px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-size: 1rem;
    color: var(--text-main);
    transition: all 0.2s;
    outline: none;
    font-family: inherit;
  }

  .has-icon { padding-left: 48px !important; }

  input[type="text"]:focus, textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px var(--primary-light);
  }

  input.error, textarea.error {
    border-color: var(--danger);
    background-color: var(--danger-bg);
  }

  .error-msg {
    font-size: 0.8rem;
    color: var(--danger);
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Grid Buttons (Company Type / Stage) */
  .grid-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
  }

  .option-btn {
    padding: 12px;
    border: 1px solid var(--border);
    background: white;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
  }

  .option-btn:hover { border-color: var(--primary); color: var(--primary); }
  
  .option-btn.selected {
    background: var(--primary-light);
    border-color: var(--primary);
    color: var(--primary);
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
  }

  /* Main Button */
  .btn-primary {
    width: 100%;
    height: 56px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.3);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .btn-retry {
    margin-top: 12px;
    background-color: white;
    color: var(--text-main);
    border: 1px solid var(--border);
  }
  .btn-retry:hover { background-color: var(--bg-page); }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in { animation: fadeIn 0.4s ease forwards; }

  /* Two Column Grid */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 640px) {
    .grid-2 { grid-template-columns: 1fr; }
    .container { padding: 20px 16px; }
  }
`;

// --- Component ---

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

type FormData = {
    name: string;
    type: string;
    problem: string;
    solution: string;
    industry: string;
    geography: string;
    stage: string;
    customer: string;
};

type TouchedState = {
    name: boolean;
    type: boolean;
    problem: boolean;
    solution: boolean;
};

export const CompanyCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    // --- State ---
    const [formData, setFormData] = useState<FormData>({
        name: '',
        type: '',
        problem: '',
        solution: '',
        industry: '',
        geography: '',
        stage: 'Idea',
        customer: ''
    });

    const [touched, setTouched] = useState<Record<keyof TouchedState, boolean>>({
        name: false,
        type: false,
        problem: false,
        solution: false
    });

    const currentWorkspace = AuthService.getWorkspace();
    const [name, setName] = useState(currentWorkspace?.name || '');
    const [type, setType] = useState(currentWorkspace?.type || '');
    const [isLoading, setIsLoading] = useState(false);
    const [retryCooldown, setRetryCooldown] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // --- Effects ---

    const handleCreate = async () => {
        if (!formData.name || !formData.type || !formData.problem || !formData.solution) return;

        setIsLoading(true);
        setError(null);

        try {
            await AuthService.updateWorkspace({
                ...formData,
                onboardingStep: 3
            });

            onNavigate(ScreenId.AI_IDEA_VALIDATION);
        } catch (err: any) {
            setError(err?.message || "Something went wrong.");
            setRetryCooldown(5);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (retryCooldown <= 0) return;
        const timer = setInterval(() => setRetryCooldown(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [retryCooldown]);

    useEffect(() => {
        const ws = AuthService.getWorkspace();
        if (!ws) return;

        setFormData(prev => ({
            ...prev,
            name: ws.name ?? prev.name,
            type: ws.type ?? prev.type,
            problem: ws.problem ?? prev.problem,
            solution: ws.solution ?? prev.solution,
            industry: ws.industry ?? prev.industry,
            geography: ws.geography ?? prev.geography,
            stage: ws.stage ?? prev.stage,
            customer: ws.customer ?? prev.customer,
        }));
    }, []);

    // --- Handlers ---

    const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError(null);
    };

    const handleBlur = (field: keyof TouchedState) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };
    const requiredFields: (keyof TouchedState)[] = [
        'name',
        'type',
        'problem',
        'solution'
    ];


    const validate = () => {
        let valid = true;
        const newTouched = { ...touched };

        requiredFields.forEach(field => {
            newTouched[field] = true;
            if (!formData[field]) valid = false;
        });

        setTouched(newTouched);
        return valid;
    };

    // --- Render Helpers ---

    const isError = (field: keyof TouchedState) =>
        touched[field] && !formData[field];

    const isFormValid =
        formData.name &&
        formData.type &&
        formData.problem &&
        formData.solution;
    return (
        <>
            <style>{styles}</style>
            <div className="container animate-fade-in">
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1>Create Your Company</h1>
                    <p className="subtitle">Let's define the core identity and strategy of your venture.</p>
                </header>

                {/* --- Section 1: Company Identity --- */}
                <div className="form-section">
                    <h2><Building size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} /> Identity</h2>

                    <div className="input-group">
                        <label className="label">Company Name <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <Building className="input-icon" size={18} />
                            <input
                                type="text"
                                className={`has-icon ${isError('name') ? 'error' : ''}`}
                                placeholder="e.g. Acme Corp"
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                onBlur={() => handleBlur('name')}
                            />
                        </div>
                        {isError('name') && <div className="error-msg">Company name is required</div>}
                    </div>

                    <div className="input-group">
                        <label className="label">Company Type <span className="required">*</span></label>
                        <div className="grid-options">
                            {['SaaS', 'Marketplace', 'HardTech', 'FinTech', 'Consumer', 'Other'].map(t => (
                                <button
                                    type="button"
                                    key={t}
                                    className={`option-btn ${formData.type === t ? 'selected' : ''}`}
                                    onClick={() => handleChange('type', t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        {isError('type') && <div className="error-msg">Please select a type</div>}
                    </div>

                    <div className="input-group">
                        <label className="label">Your Role</label>
                        <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '12px', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={16} color="var(--primary)" /> Founder
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Strategy Basics --- */}
                <div className="form-section">
                    <h2><Target size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} /> Strategy Basics</h2>

                    <div className="input-group">
                        <label className="label">Problem Statement <span className="required">*</span></label>
                        <textarea
                            rows={3}
                            className={isError('problem') ? 'error' : ''}
                            placeholder="What specific pain point are you solving?"
                            value={formData.problem}
                            onChange={e => handleChange('problem', e.target.value)}
                            onBlur={() => handleBlur('problem')}
                        />
                        {isError('problem') && <div className="error-msg">Problem statement is required</div>}
                    </div>

                    <div className="input-group">
                        <label className="label">Proposed Solution <span className="required">*</span></label>
                        <textarea
                            rows={3}
                            className={isError('solution') ? 'error' : ''}
                            placeholder="How does your product solve this problem?"
                            value={formData.solution}
                            onChange={e => handleChange('solution', e.target.value)}
                            onBlur={() => handleBlur('solution')}
                        />
                        {isError('solution') && <div className="error-msg">Solution is required</div>}
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label className="label">Industry</label>
                            <div className="input-wrapper">
                                <Briefcase className="input-icon" size={18} />
                                <input
                                    type="text"
                                    className="has-icon"
                                    placeholder="e.g. AI, Health"
                                    value={formData.industry}
                                    onChange={e => handleChange('industry', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="label">Geography</label>
                            <div className="input-wrapper">
                                <MapPin className="input-icon" size={18} />
                                <input
                                    type="text"
                                    className="has-icon"
                                    placeholder="e.g. Global, US"
                                    value={formData.geography}
                                    onChange={e => handleChange('geography', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Target Customer</label>
                        <div className="input-wrapper">
                            <Users className="input-icon" size={18} />
                            <input
                                type="text"
                                className="has-icon"
                                placeholder="Who are you building for?"
                                value={formData.customer}
                                onChange={e => handleChange('customer', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label">Current Stage</label>
                        <div className="grid-options">
                            {["Idea", "Pre-Seed", "Seed", "Series A"].map(s => (
                                <button
                                    type="button"
                                    key={s}
                                    className={`option-btn ${formData.stage === s ? 'selected' : ''}`}
                                    onClick={() => handleChange('stage', s)}
                                >
                                    {s}
                                </button>
                            ))}

                        </div>
                    </div>
                </div>

                {/* --- Actions --- */}
                <div style={{ paddingBottom: 60 }}>
                    {error && (
                        <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: '#fef2f2', color: '#dc2626', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
                            {error}
                        </div>
                    )}

                    <button
                        className="btn-primary"
                        onClick={handleCreate}
                        disabled={isLoading || !isFormValid}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <>Create Company <ArrowRight size={20} /></>}
                    </button>

                    {error && (
                        <button
                            className="btn-primary btn-retry"
                            disabled={retryCooldown > 0}
                            onClick={handleCreate}
                        >
                            {retryCooldown > 0
                                ? `Retry available in ${retryCooldown}s`
                                : 'Retry'}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
