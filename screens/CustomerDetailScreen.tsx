import React from 'react';
import { ScreenId } from '../types';
import { Card, Badge } from '../components/UI';
import { Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CustomerDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-4xl mx-auto">
     <div className="flex justify-between mb-6">
       <div>
         <h2 className="text-2xl font-bold">Acme Corp (Jane Doe)</h2>
         <p className="text-slate-500">VP Engineering • SaaS B2B</p>
       </div>
       <Badge color="green">Interview Complete</Badge>
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="col-span-1 lg:col-span-2 space-y-4">
          <Card title="Interview Notes">
            <div className="p-3 bg-slate-50 rounded text-sm text-slate-700 min-h-[100px]">
              They are struggling with managing equity across 3 geographies. Current excel sheets are breaking.
            </div>
          </Card>
          <Card title="Key Signals">
             <div className="flex gap-2">
               <Badge color="green">Pain Point Verified</Badge>
               <Badge color="green">Budget Available</Badge>
             </div>
          </Card>
       </div>
       <div className="col-span-1 bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="font-bold text-purple-900 mb-2 flex gap-2 items-center"><Zap className="w-4 h-4"/> AI Insight</div>
          <p className="text-sm text-purple-800 mb-2">
            Contradiction detected: They mentioned "no budget" initially but later said they pay $50k for legal.
          </p>
       </div>
     </div>
  </div>
);