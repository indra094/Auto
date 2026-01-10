import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, AIInsightBox } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const ScenarioSimulatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-5xl mx-auto">
     <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Future Shock Simulator</h2>
          <p className="text-slate-500">See the pain before it happens.</p>
        </div>
        <Button variant="secondary" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Back to Model</Button>
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
       {/* Scenario Selector */}
       <div className="col-span-1 lg:col-span-4 space-y-3">
         <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Choose Scenario</h4>
         <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg cursor-pointer shadow-sm">
           <div className="font-bold text-red-900">Jamie leaves after 14 months</div>
           <div className="text-xs text-red-700 mt-1">Post-cliff departure</div>
         </div>
         <div className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 opacity-60">
           <div className="font-bold text-slate-800">Series A Dilution (20%)</div>
           <div className="text-xs text-slate-500 mt-1">Impact on control</div>
         </div>
         <div className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 opacity-60">
           <div className="font-bold text-slate-800">Early Acquisition ($5M)</div>
           <div className="text-xs text-slate-500 mt-1">Cash out analysis</div>
         </div>
       </div>

       {/* Results */}
       <div className="col-span-1 lg:col-span-8 space-y-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <Card title="Equity Impact">
             <div className="text-4xl font-bold text-slate-800 mb-1">12%</div>
             <p className="text-sm text-slate-500 mb-3">Dead Equity on Cap Table</p>
             <div className="w-full bg-slate-100 h-2 rounded mb-2"><div className="bg-slate-400 w-[12%] h-2 rounded"></div></div>
             <p className="text-xs text-slate-400">Owned by Jamie (outsider)</p>
           </Card>
           <Card title="Emotional Risk">
             <div className="text-4xl font-bold text-red-600 mb-1">Critical</div>
             <p className="text-sm text-slate-500 mb-3">Conflict Probability</p>
             <div className="flex gap-1">
               <div className="h-2 w-full bg-red-500 rounded"></div>
               <div className="h-2 w-full bg-red-500 rounded"></div>
               <div className="h-2 w-full bg-red-500 rounded"></div>
             </div>
           </Card>
         </div>

         <AIInsightBox type="insight" title="AI Narrative">
           <p className="mb-2"><strong>Who gets upset?</strong> You (Alex).</p>
           <p className="mb-2"><strong>Why?</strong> You will be working 60h/week for the next 5 years, while Jamie holds 12% of the company for working part-time for one year.</p>
           <p className="text-slate-600 italic">"This creates a cap table structure that most Series A investors will reject, forcing a painful recapitalization."</p>
         </AIInsightBox>

         <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Fix the Split</Button>
            <Button variant="primary" onClick={() => onNavigate(ScreenId.LOCK_ALIGNMENT)}>I Accept the Risk</Button>
         </div>
       </div>
     </div>
  </div>
);