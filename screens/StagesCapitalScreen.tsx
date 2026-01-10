import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const StagesCapitalScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-4xl mx-auto">
     {/* Header */}
     <div className="mb-8">
       <div className="flex justify-between items-start">
         <div>
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Startup Stages & Capital</h2>
           <div className="flex items-center gap-3 mb-2">
             <span className="text-slate-600 font-medium">Your current stage:</span>
             <Badge color="amber">Pre-incorporation</Badge>
             <span className="text-slate-400 text-sm">Confidence: Medium</span>
           </div>
           <p className="text-slate-500 italic">“Stages are defined by decisions and evidence — not labels.”</p>
         </div>
       </div>
     </div>

     <div className="relative pl-8 border-l-2 border-slate-200 space-y-12 my-8">
       
       {/* Stage 1: Idea */}
       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white ring-4 ring-slate-50">✔</div>
         <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 opacity-70 hover:opacity-100 transition-opacity">
           <div className="flex justify-between items-start mb-2">
             <h3 className="font-bold text-lg text-slate-700">Stage 1: Idea / Exploration</h3>
             <Badge color="green">Completed</Badge>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm mb-4">
             <div><span className="font-semibold text-slate-600 block">Purpose</span>Clarify problem worth solving</div>
             <div><span className="font-semibold text-slate-600 block">Capital Needed</span>$0 – $10k</div>
           </div>
         </div>
       </div>
       
       {/* Stage 2: Pre-incorporation (Active) */}
       <div className="relative">
         <div className="absolute -left-[43px] top-0 w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-4 ring-indigo-100 shadow-lg">2</div>
         <Card className="border-indigo-500 shadow-lg ring-1 ring-indigo-500/20 bg-white">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-bold text-xl text-indigo-700">Stage 2: Pre-incorporation</h3>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">You Are Here</span>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">$5k – $25k</div>
                <div className="text-xs text-slate-500">Typical Capital Need</div>
             </div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6 mb-6">
             <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
               <h4 className="font-bold text-indigo-900 text-sm mb-3 flex items-center gap-2">
                 <span className="text-lg">💰</span> Capital Breakdown
               </h4>
               <ul className="space-y-2 text-sm text-slate-700">
                 <li className="flex justify-between"><span>Legal setup prep:</span> <span className="font-mono">$1k – $3k</span></li>
                 <li className="flex justify-between"><span>Tools & infra:</span> <span className="font-mono">$1k – $5k</span></li>
                 <li className="flex justify-between"><span>Living runway buffer:</span> <span className="font-mono">$3k – $15k</span></li>
               </ul>
               <p className="text-xs text-indigo-700 mt-3 italic border-t border-indigo-200 pt-2">
                 “This stage is about reducing irreversible risk, not scaling.”
               </p>
             </div>

             <div>
               <h4 className="font-bold text-slate-800 text-sm mb-3">Readiness Indicators</h4>
               <ul className="space-y-3 text-sm">
                 <li className="flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-amber-500" />
                   <span>Founder alignment locked</span>
                   <span className="text-xs text-amber-600 bg-amber-50 px-1 rounded ml-auto">Warning</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <Clock className="w-4 h-4 text-slate-400" />
                   <span>5–10 customer conversations</span>
                   <span className="text-xs text-slate-500 bg-slate-100 px-1 rounded ml-auto">Pending</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-green-500" />
                   <span>Equity & vesting discussed</span>
                   <span className="text-xs text-green-600 bg-green-50 px-1 rounded ml-auto">Done</span>
                 </li>
               </ul>
               <Button variant="secondary" className="mt-4 w-full text-xs" onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}>
                 See what's missing <ArrowRight className="w-3 h-3 ml-1"/>
               </Button>
             </div>
           </div>
         </Card>
       </div>

       {/* Stage 3: Incorporated */}
       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-bold">3</div>
         <div className="bg-white p-6 rounded-lg border border-slate-200 border-dashed">
           <div className="flex justify-between items-start mb-2">
             <h3 className="font-bold text-lg text-slate-700">Stage 3: Incorporated / Early Build</h3>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm mb-4">
             <div><span className="font-semibold text-slate-600 block">Purpose</span>Build MVP and test usage</div>
             <div><span className="font-semibold text-slate-600 block">Capital Needed</span>$25k – $150k</div>
           </div>
           <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
             <span className="font-bold">Risk Warning:</span> Raising here without usage data often leads to down rounds.
           </div>
         </div>
       </div>

       {/* Stage 4: Early Traction */}
       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-bold">4</div>
         <div className="bg-white p-6 rounded-lg border border-slate-200 border-dashed">
           <div className="flex justify-between items-start mb-2">
             <h3 className="font-bold text-lg text-slate-700">Stage 4: Early Traction</h3>
           </div>
           <div className="grid grid-cols-2 gap-4 text-sm mb-4">
             <div><span className="font-semibold text-slate-600 block">Purpose</span>Prove someone cares</div>
             <div><span className="font-semibold text-slate-600 block">Capital Needed</span>$150k – $500k</div>
           </div>
           <div className="flex gap-2 mt-2">
             <Badge color="slate">Usage Signal</Badge>
             <Badge color="slate">Retention</Badge>
           </div>
         </div>
       </div>

       {/* Stage 5: Seed */}
       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-bold">5</div>
         <div className="bg-white p-6 rounded-lg border border-slate-200 border-dashed opacity-75">
            <h3 className="font-bold text-lg text-slate-700">Stage 5: Seed / Scale Prep</h3>
            <p className="text-sm text-slate-500 mt-1">Capital Needed: $500k – $2M+</p>
         </div>
       </div>

     </div>
     
     <div className="text-center text-sm text-slate-400 mt-12 pb-6 border-t border-slate-200 pt-6">
       “Stages describe decision readiness, not success. Many great companies revisit stages.”
     </div>
  </div>
);