import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, AIInsightBox } from '../components/UI';
import {
    Briefcase, Clock, DollarSign, Target, AlertTriangle,
    History, Shield, CheckCircle2, Save, Sparkles, ChevronRight
} from 'lucide-react';
import { AuthService, UserOrgInfo } from '../services/AuthService';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const UserOrgInfoScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const user = AuthService.getUser();
    const [role, setRole] = useState<UserOrgInfo>(AuthService.getUserOrgInfo(user.id, user.current_org_id));
    const [isSaving, setIsSaving] = useState(false);
    const workspace = AuthService.fetchWorkspaceFromServer(user.current_org_id);

    const handleSave = async (updates: Partial<UserOrgInfo>) => {
        setIsSaving(true);
        const updated = await AuthService.setUserOrgInfo(user.id, user.current_org_id, role.role, role.permissionLevel, role.equity, role.vesting, role.commitment);
        setRole(updated);
        setIsSaving(false);
    };

    const toggleAuthority = (item: string) => {
        const newAuth = role.authority.includes(item)
            ? role.authority.filter(a => a !== item)
            : [...role.authority, item];
        handleSave({ authority: newAuth });
    };

    const authorities = [
        { id: 'hiring', label: 'Hiring' },
        { id: 'product', label: 'Product direction' },
        { id: 'fundraising', label: 'Fundraising' },
        { id: 'financial', label: 'Financial approval' }
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* 1. HEADER */}
            <header className="flex justify-between items-start">
                <div>
                    <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-1">My Role</h2>
                    <h1 className="text-4xl font-black text-slate-900">at {workspace?.name || 'the Company'}</h1>
                </div>
                <div className="text-right">
                    <Badge color={role.status === 'Active' ? 'green' : 'amber'} className="mb-2">
                        Role status: {role.status}
                    </Badge>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Last updated: {role.lastUpdated}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                    {/* 2. ROLE DEFINITION */}
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Shield className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Role Definition</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium"
                                    value={role.title}
                                    onChange={(e) => setRole({ ...role, title: e.target.value })}
                                    onBlur={(e) => handleSave({ title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Responsibility</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium"
                                    value={role.responsibility}
                                    onChange={(e) => setRole({ ...role, responsibility: e.target.value })}
                                    onBlur={(e) => handleSave({ responsibility: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Decision Authority</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {authorities.map(auth => (
                                    <button
                                        key={auth.id}
                                        onClick={() => toggleAuthority(auth.id)}
                                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${role.authority.includes(auth.id)
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200'
                                            }`}
                                    >
                                        <div className={`w-3 h-3 rounded-sm border ${role.authority.includes(auth.id) ? 'bg-white border-white' : 'border-slate-300'}`}>
                                            {role.authority.includes(auth.id) && <CheckCircle2 className="w-3 h-3 text-indigo-600 -ml-[1px] -mt-[1px]" />}
                                        </div>
                                        {auth.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* 3. TIME & COMMITMENT */}
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Time & Commitment</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Weekly Commitment</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-lg"
                                        value={role.commitment}
                                        onChange={(e) => setRole({ ...role, commitment: parseInt(e.target.value) })}
                                        onBlur={(e) => handleSave({ commitment: parseInt(e.target.value) })}
                                    />
                                    <span className="absolute right-3 top-3.5 text-slate-400 font-bold text-xs">hrs</span>
                                </div>
                                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase italic">
                                    {role.commitment >= 40 ? 'Full-time' : 'Part-time / Advisory'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                                    value={role.startDate}
                                    onChange={(e) => setRole({ ...role, startDate: e.target.value })}
                                    onBlur={(e) => handleSave({ startDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Planned Change</label>
                                <select
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium appearance-none"
                                    value={role.plannedChange}
                                    onChange={(e) => handleSave({ plannedChange: e.target.value })}
                                >
                                    <option value="none">None</option>
                                    <option value="reduce">Reduce to 20 hrs</option>
                                    <option value="exit">Exit</option>
                                    <option value="advisory">Move to advisory</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* 5. EXPECTATIONS & ACCOUNTABILITY */}
                    <Card className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <Target className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">90-Day Accountability</h3>
                            </div>
                            <Button size="sm" variant="secondary" className="text-[10px] font-bold group">
                                <Sparkles className="w-3 h-3 mr-2 text-indigo-500 group-hover:animate-pulse" /> Ask AI for help
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium text-slate-500 mb-4">What are you accountable for in the next quarter?</p>
                            {role.expectations.map((exp, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl group">
                                    <div className="w-5 h-5 rounded-full border-2 border-indigo-200 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{exp}</span>
                                    <button className="ml-auto opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all">
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all"
                                onClick={() => {
                                    const newExp = [...role.expectations, "New requirement..."];
                                    handleSave({ expectations: newExp });
                                }}
                            >
                                + Add accountability metric
                            </button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* AI HINT PANEL */}
                    <div className="sticky top-8 space-y-8">
                        <AIInsightBox title="Role Calibration">
                            This level of authority typically pairs with 30–45% equity in pre-seed startups.
                        </AIInsightBox>

                        {/* 4. COMPENSATION */}
                        <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold">Compensation</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Salary</label>
                                        <div className="text-2xl font-black">${role.salary.toLocaleString()}</div>
                                    </div>
                                    <Badge color="red" className="text-[10px]">Unpaid</Badge>
                                </div>

                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Equity Stake</label>
                                        <div className="text-2xl font-black text-indigo-400">{role.equity}%</div>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400">{role.vesting}</div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">AI Context</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed italic">
                                    "Because your role is full-time with no salary, equity weighting is increased to balance risk."
                                </p>
                            </div>
                        </Card>

                        {/* 6. RISK FLAGS */}
                        <Card className="p-6 border-amber-100 bg-amber-50/30">
                            <div className="flex items-center gap-3 mb-4 text-amber-600">
                                <AlertTriangle className="w-5 h-5" />
                                <h3 className="text-sm font-black uppercase tracking-widest">Active Risks</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-xs font-bold text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                                    Your authority includes hiring, but equity is below typical range.
                                </li>
                            </ul>
                        </Card>

                        {/* 7. ROLE HISTORY */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="w-5 h-5 text-slate-400" />
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Role History</h3>
                            </div>
                            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm" />
                                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{role.lastUpdated}</div>
                                    <div className="text-xs font-bold text-slate-700">Role created & authority defined</div>
                                </div>
                                <div className="relative pl-8 opacity-40">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-white" />
                                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Jan 1, 2026</div>
                                    <div className="text-xs font-bold text-slate-700">Initial login</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {isSaving && (
                <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-5">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-sm font-bold">Auto-saving changes...</span>
                </div>
            )}
        </div>
    );
};