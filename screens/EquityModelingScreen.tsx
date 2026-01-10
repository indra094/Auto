import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Scale, AlertOctagon, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const EquityModelingScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
      <h2 className="text-2xl font-bold">Equity & Commitment Modeling</h2>
      <div className="text-sm text-slate-500">Changes here update the agreement draft automatically.</div>
    </div>

    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <Card title="Jamie's Parameters">
           <div className="space-y-6">
             <div>
               <label className="flex justify-between text-sm font-medium mb-2">
                 <span>Weekly Hours</span>
                 <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">25h</span>
               </label>
               <input type="range" className="w-full accent-purple-600" min="0" max="80" defaultValue="25" />
               <p className="text-xs text-slate-400 mt-1">Dragging this to 40h improves alignment score by 15pts.</p>
             </div>
             <div>
               <label className="flex justify-between text-sm font-medium mb-2">
                 <span>Equity Allocation</span>
                 <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">48%</span>
               </label>
               <input type="range" className="w-full accent-purple-600" min="0" max="100" defaultValue="48" />
             </div>
             <div className="pt-4 border-t">
               <label className="flex justify-between text-sm font-medium mb-2">
                 <span>Vesting Cliff</span>
                 <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">1 Year</span>
               </label>
               <input type="range" className="w-full accent-slate-600" min="0" max="4" defaultValue="1" />
             </div>
           </div>
        </Card>
        <Card title="Alex's Parameters">
           <div className="opacity-50 pointer-events-none">
             <div className="flex justify-between text-sm mb-2"><span>Equity</span><span>52%</span></div>
             <div className="w-full bg-slate-200 h-2 rounded"><div className="bg-indigo-600 w-[52%] h-2 rounded"></div></div>
           </div>
           <div className="text-xs text-center mt-4 text-slate-400">Locked for this simulation</div>
        </Card>
      </div>

      {/* Live Consequences */}
      <div className="flex flex-col gap-4">
         <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Scale size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-indigo-400 uppercase tracking-widest text-xs font-bold mb-2">AI Real-Time Analysis</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
                "Giving Founder C 48% with only 25 hours/week creates a <span className="text-red-400 font-medium">dead equity risk</span>."
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded border border-white/10">
                  <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5"/>
                  <div>
                    <span className="font-bold text-sm block">Vesting Danger</span>
                    <span className="text-xs text-slate-300">If Jamie leaves after the cliff (1 year), they walk away with 12% of the company for part-time work. This makes you uninvestable.</span>
                  </div>
                </div>
              </div>
            </div>
         </div>
         
         <Button variant="primary" fullWidth className="h-14 text-lg" onClick={() => onNavigate(ScreenId.SCENARIO_SIMULATOR)}>
            Test This Split in Simulator <ArrowRight className="ml-2 w-5 h-5"/>
         </Button>
      </div>
    </div>
  </div>
);