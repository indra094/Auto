import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AIEmployeeDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">🤖</div>
      <div>
        <h2 className="text-2xl font-bold">Sarah</h2>
        <p className="text-slate-500">Role: Customer Research Analyst</p>
      </div>
    </div>

    <div className="flex border-b border-slate-200 mb-6">
      <button className="px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium">Work Feed</button>
      <button className="px-4 py-2 text-slate-500 hover:text-slate-800">Goals</button>
      <button className="px-4 py-2 text-slate-500 hover:text-slate-800">Permissions</button>
    </div>

    <div className="space-y-4 max-w-3xl">
      <Card title="Today's Output">
         <div className="p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded-r mb-3">
           <h4 className="font-bold text-indigo-900 text-sm">Summary of Interview #45</h4>
           <p className="text-sm text-indigo-800 mt-1">Found 3 contradictions in the user's pricing feedback vs their usage data.</p>
         </div>
         <div className="p-3 bg-white border border-slate-200 rounded mb-3">
           <h4 className="font-bold text-slate-800 text-sm">Drafted Follow-up Email</h4>
           <p className="text-sm text-slate-500 mt-1">Ready for review. Targeted at churning users.</p>
           <div className="mt-2 flex gap-2">
             <Button variant="secondary" className="h-7 text-xs px-2">Review</Button>
           </div>
         </div>
      </Card>
      <Button fullWidth variant="ghost" className="text-slate-400">View older activities</Button>
    </div>
  </div>
);