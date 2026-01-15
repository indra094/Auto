import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Building, Globe, Mail, Linkedin, TrendingUp, DollarSign, Target, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InvestorDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <header className="flex justify-between items-start">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black">S</div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sequoia Capital</h2>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400"><Globe className="w-4 h-4" /> sequoiacap.com</div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400"><Mail className="w-4 h-4" /> partner@sequoia.com</div>
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => onNavigate(ScreenId.INVESTORS_LIST)}>Back to CRM</Button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" /> Investment Strategy
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Focus on early-stage founders who are building the foundations of tomorrow. Sequoia typically leads rounds and takes a board seat to provide deep operational support.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Preferred Check</div>
                <div className="text-lg font-bold text-slate-900">$500k - $2M (Seed)</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Follow-on Capacity</div>
                <Badge color="emerald">Very High</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Expected Returns & Thesis
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-700 italic">"We look for outlier founders in the AI space who can demonstrate a structural data moat from Day 1."</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Target Exit Multiple</span>
                <span className="font-black text-slate-900 text-xl">100x+</span>
              </div>
            </div>
          </Card>
        </main>

        <aside className="space-y-8">
          <Card className="p-8 bg-indigo-900 text-white border-none shadow-2xl">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-6">Foundry Alignment</h4>
            <div className="text-5xl font-black mb-2 text-indigo-100">92%</div>
            <p className="text-sm font-medium text-indigo-200 leading-relaxed mb-6">
              High alignment based on your 'Governance Risk' score and their preference for structured cap tables.
            </p>
            <Button fullWidth className="bg-white text-indigo-900 hover:bg-indigo-50 font-black">Request Warm Intro</Button>
          </Card>

          <Card className="p-6 border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Past Portfolio Fit</h4>
            <div className="space-y-4">
              {["Stripe", "Airbnb", "DoorDash"].map(c => (
                <div key={c} className="flex justify-between text-sm">
                  <span className="font-bold text-slate-700">{c}</span>
                  <Badge color="slate" className="text-[10px]">Comparable</Badge>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};