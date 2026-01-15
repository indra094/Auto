import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Search, UserPlus, Zap, Mail, Linkedin, ArrowRight } from 'lucide-react';

interface ScreenProps {
    onNavigate: (id: ScreenId) => void;
}

export const CoFounderFindingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const candidates = [
        { name: "Alex Rivers", role: "Growth Lead", fit: 98, equity: "5-15%", commitment: "Full-time", tags: ["Marketing", "Ex-Uber"] },
        { name: "Sam Chen", role: "CTO / AI Engineer", fit: 92, equity: "20-30%", commitment: "Full-time", tags: ["Python", "PhD"] },
        { name: "Morgan Lee", role: "Legal/Compliance", fit: 85, equity: "2-5%", commitment: "Advisory", tags: ["Policy", "Fintech"] },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Co-founder Discovery</h2>
                    <p className="text-slate-500 mt-2 font-medium">Find the perfect partner to fill your organization's gaps.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by role, skill, or background..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
            </header>

            <div className="grid lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 space-y-8">
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Filter Needs</h3>
                        <div className="space-y-3">
                            {["Equity Range", "Commitment", "Experience Level"].map(filter => (
                                <div key={filter} className="p-3 bg-white border border-slate-100 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50">
                                    <span className="text-sm font-medium text-slate-600">{filter}</span>
                                    <div className="w-4 h-4 border border-slate-300 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl shadow-indigo-200">
                        <Zap className="w-8 h-8 mb-4 text-yellow-300" />
                        <h4 className="font-bold mb-2">AI Gap Analysis</h4>
                        <p className="text-xs text-indigo-100 leading-relaxed">
                            Your team currently lacks <strong>Deep Sales</strong> and <strong>Operational</strong> expertise. Prioritize candidates with Growth or GTM backgrounds.
                        </p>
                    </Card>
                </aside>

                <main className="lg:col-span-3 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Top AI Matches</h3>
                        <span className="text-xs font-bold text-indigo-500">Based on your venture profile</span>
                    </div>

                    <div className="space-y-4">
                        {candidates.map((c, i) => (
                            <Card key={i} className="p-6 border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 uppercase font-black text-xl">
                                    {c.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xl group-hover:text-indigo-600 transition-colors">{c.name}</h4>
                                            <div className="text-sm text-slate-500 font-medium">{c.role}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">AI Fit Score</div>
                                            <div className="text-2xl font-black text-indigo-600">{c.fit}%</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {c.tags.map(t => <Badge key={t} color="slate" className="bg-slate-50">{t}</Badge>)}
                                        <Badge color="emerald">{c.equity} Equity</Badge>
                                        <Badge color="indigo">{c.commitment}</Badge>
                                    </div>
                                </div>
                                <div className="flex md:flex-col gap-2 justify-center md:items-end">
                                    <Button className="font-bold bg-slate-900 group-hover:bg-indigo-600">Connect <UserPlus className="w-4 h-4 ml-2" /></Button>
                                    <div className="flex gap-2">
                                        <div className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"><Mail className="w-4 h-4" /></div>
                                        {/* Using External SVG for LinkedIn since it's common */}
                                        <div className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};
