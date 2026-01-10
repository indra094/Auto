import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, AIInsightBox } from '../components/UI';
import { AlertTriangle, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AlignmentOverviewScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const alignmentData = [
    { name: 'Alex', equity: 52, contribution: 75 },
    { name: 'Jamie', equity: 48, contribution: 25 },
  ];
  return (
    <div className="p-6 max-w-6xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
         <div>
           <h2 className="text-3xl font-bold text-slate-900 mb-1">Alignment Overview</h2>
           <p className="text-slate-500 text-lg">Exposing the gap between expectation and reality.</p>
         </div>
         <div className="text-left md:text-right">
           <div className="text-5xl font-black text-amber-500 flex items-center gap-3 md:justify-end">
              62<span className="text-2xl text-slate-400 font-normal">%</span>
           </div>
           <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Alignment Score</span>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section */}
          <Card className="col-span-1 lg:col-span-8" title="Equity vs. Calculated Contribution">
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alignmentData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} tick={{fontWeight: 'bold'}} />
                  <Tooltip />
                  <Bar dataKey="equity" fill="#4f46e5" name="Equity %" radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="contribution" fill="#10b981" name="Contribution % (AI Model)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-8">
               <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded"></div><span className="text-sm font-medium">Equity Owned</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded"></div><span className="text-sm font-medium">Actual Contribution</span></div>
            </div>
          </Card>

          {/* AI Analysis Section */}
          <div className="col-span-1 lg:col-span-4 space-y-4">
             <AIInsightBox type="critical" title="Predicted Failure Mode">
               <span className="font-bold">Resentment by Year 2.</span>
               <p className="mt-2">Alex is contributing 75% of the value (Time + Cash + Risk) but only holding 52% of equity.</p>
               <p className="mt-2">System predicts a <strong>High Probability</strong> of equity renegotiation or breakup before Series A fundraising.</p>
             </AIInsightBox>
             
             <Card title="Key Friction Points">
               <ul className="space-y-3">
                 <li className="flex gap-3 text-sm text-slate-700">
                   <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0"/>
                   <span>Jamie's "Low Risk" tolerance contradicts startup equity norms.</span>
                 </li>
                 <li className="flex gap-3 text-sm text-slate-700">
                   <Clock className="w-5 h-5 text-slate-400 shrink-0"/>
                   <span>Time disparity (60h vs 25h) is not reflected in the 52/48 split.</span>
                 </li>
               </ul>
               <Button variant="black" fullWidth className="mt-4" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Model Solutions</Button>
             </Card>
          </div>
       </div>
    </div>
  );
};