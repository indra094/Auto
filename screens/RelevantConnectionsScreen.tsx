import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const RelevantConnectionsScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
     <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Relevant Connections</h2>
        <div className="bg-slate-100 p-1 rounded-lg flex text-sm">
          <button className="px-3 py-1 bg-white shadow-sm rounded-md font-medium text-slate-800">Investors</button>
          <button className="px-3 py-1 text-slate-500">Customers</button>
          <button className="px-3 py-1 text-slate-500">Talent</button>
        </div>
     </div>

     <div className="space-y-4">
       <Card>
         <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0"></div>
           <div className="flex-1">
             <div className="flex justify-between">
               <h3 className="font-bold text-lg">John VC <span className="text-sm font-normal text-slate-500">@ Sequoia</span></h3>
               <Badge color="green">Warm Intro Available</Badge>
             </div>
             
             <div className="mt-1 mb-2">
               <span 
                 className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors" 
                 onClick={() => onNavigate(ScreenId.STAGES_CAPITAL)}
               >
                 Relevant at: Stage 2 (Pre-seed)
               </span>
             </div>

             <p className="text-sm text-slate-600 mt-1">Matches your stage (Pre-seed) and sector (SaaS).</p>
             <div className="mt-3 bg-indigo-50 p-2 rounded text-xs text-indigo-800 inline-block">
               ✨ Why now: He just invested in a similar API tooling company.
             </div>
             <div className="mt-4 flex gap-3">
               <Button className="h-8 text-xs">Prep Intro Note</Button>
               <Button variant="secondary" className="h-8 text-xs">View Profile</Button>
             </div>
           </div>
         </div>
       </Card>
       <Card>
         <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0"></div>
           <div className="flex-1">
             <div className="flex justify-between">
               <h3 className="font-bold text-lg">Sarah Angel <span className="text-sm font-normal text-slate-500">@ AngelList</span></h3>
             </div>
             
             <div className="mt-1 mb-2">
                <span 
                  className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors" 
                  onClick={() => onNavigate(ScreenId.STAGES_CAPITAL)}
                >
                 Relevant at: Stage 1 & 2
               </span>
             </div>

             <p className="text-sm text-slate-600 mt-1">Former operator in your space.</p>
             <div className="mt-4 flex gap-3">
               <Button className="h-8 text-xs">Prep Intro Note</Button>
               <Button variant="secondary" className="h-8 text-xs">View Profile</Button>
             </div>
           </div>
         </div>
       </Card>
     </div>
  </div>
);