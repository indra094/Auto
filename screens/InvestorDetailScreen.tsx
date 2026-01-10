import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InvestorDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500" onClick={() => onNavigate(ScreenId.INVESTORS_LIST)}>
      <ChevronRight className="rotate-180 w-4 h-4"/> Back
    </div>
    <Card>
      <div className="flex justify-between items-start mb-6">
         <div>
           <h1 className="text-3xl font-bold">Sequoia Capital</h1>
           <div className="flex gap-2 mt-2">
             <Badge>VC Firm</Badge>
             <Badge>Tier 1</Badge>
           </div>
         </div>
         <Button>Log Interaction</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="col-span-1 lg:col-span-2 space-y-6">
           <div>
             <h3 className="font-bold border-b pb-2 mb-2">Notes</h3>
             <textarea className="w-full border rounded p-2 h-32" placeholder="Add private notes..."></textarea>
           </div>
           <div>
             <h3 className="font-bold border-b pb-2 mb-2">History</h3>
             <div className="text-sm text-slate-500">No interactions yet.</div>
           </div>
         </div>
         <div className="col-span-1 bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-indigo-800 mb-3">
              <Zap className="w-4 h-4" /> AI Prep
            </div>
            <p className="text-sm text-indigo-900 mb-3">
              They recently published a thesis on "Vertical AI". Emphasize your proprietary data moat.
            </p>
            <div className="space-y-2">
               <div className="bg-white p-2 text-xs rounded shadow-sm">
                 ❓ Likely Q: "Why doesn't ChatGPT kill this?"
               </div>
               <div className="bg-white p-2 text-xs rounded shadow-sm">
                 ❓ Likely Q: "What's your distribution advantage?"
               </div>
            </div>
         </div>
      </div>
    </Card>
  </div>
);