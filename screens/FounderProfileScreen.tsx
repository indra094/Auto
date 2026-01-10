import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Briefcase, DollarSign, Scale, Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FounderProfileScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-5xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-full overflow-y-auto">
    {/* Main Form Area */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500 hover:text-slate-800" onClick={() => onNavigate(ScreenId.FOUNDERS_LIST)}>
        <ChevronRight className="rotate-180 w-4 h-4"/> Back
      </div>
      <h2 className="text-2xl font-bold mb-2">Jamie's Commitment Profile</h2>
      <p className="text-slate-500 mb-8">Establish truth. No vibes, just data.</p>
      
      <div className="space-y-8">
        <section>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Role & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Primary Role</label>
               <select className="w-full p-2 border border-slate-300 rounded bg-white">
                 <option>CTO / Technical Lead</option>
                 <option>CEO</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Weekly Hours (Honest)</label>
               <div className="flex items-center gap-2">
                 <input type="range" className="flex-1 accent-indigo-600" min="0" max="80" value="25" readOnly />
                 <span className="font-mono bg-slate-100 px-2 py-1 rounded w-12 text-center">25h</span>
               </div>
             </div>
          </div>
        </section>

        <section>
           <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4"/> Financials & Risk</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Cash Contribution</label>
               <input className="w-full p-2 border border-slate-300 rounded" value="$5,000" readOnly />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Opportunity Cost / Yr</label>
               <input className="w-full p-2 border border-slate-300 rounded" value="$180,000" readOnly />
             </div>
           </div>
        </section>

        <section>
           <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Scale className="w-4 h-4"/> Expectations (Forced Choice)</h3>
           <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Exit Expectation</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button className="p-2 border rounded text-sm hover:bg-slate-50">Quick Flip (2-3y)</button>
                  <button className="p-2 border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-bold rounded text-sm">Growth (5-7y)</button>
                  <button className="p-2 border rounded text-sm hover:bg-slate-50">IPO / Long (10y+)</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tolerance</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button className="p-2 border-2 border-amber-400 bg-amber-50 text-amber-800 font-bold rounded text-sm">Low (Need Salary)</button>
                  <button className="p-2 border rounded text-sm hover:bg-slate-50">Medium</button>
                  <button className="p-2 border rounded text-sm hover:bg-slate-50">High (All in)</button>
                </div>
              </div>
           </div>
        </section>
        
        <div className="pt-6 border-t pb-8">
          <Button fullWidth onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>Save & Analyze Alignment</Button>
        </div>
      </div>
    </div>

    {/* AI Feedback Panel */}
    <div className="w-full lg:w-80 shrink-0">
       <div className="lg:sticky lg:top-6">
         <div className="bg-slate-900 text-slate-200 rounded-xl p-4 shadow-lg">
           <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold text-sm uppercase tracking-wider">
             <Zap className="w-4 h-4" /> AI Detector
           </div>
           <div className="space-y-4">
             <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <h4 className="font-bold text-white text-sm mb-1">Contradiction Detected</h4>
               <p className="text-xs leading-relaxed text-slate-400">
                 Jamie selected <strong className="text-slate-200">"Low Risk Tolerance"</strong> but expects <strong className="text-slate-200">"High Equity (48%)"</strong>.
                 <br/><br/>
                 In startups, equity is payment for risk. This profile suggests an employee mindset with a founder cap table request.
               </p>
             </div>
             <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <h4 className="font-bold text-white text-sm mb-1">Role Clarity</h4>
               <p className="text-xs leading-relaxed text-slate-400">
                 Input rewritten to intent: <em className="text-slate-300">"I want to code part-time but own half the company."</em>
               </p>
             </div>
           </div>
         </div>
       </div>
    </div>
  </div>
);