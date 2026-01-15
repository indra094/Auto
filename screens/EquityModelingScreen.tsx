import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Info } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const EquityModelingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [timeHorizon, setTimeHorizon] = useState(4); // years
  const [capitalRaised, setCapitalRaised] = useState(2000000); // $

  const founders = [
    { name: "Indrajeet", role: "CEO", weighting: 40, equity: 35 },
    { name: "John Doe", role: "CTO", weighting: 40, equity: 35 },
    { name: "Jane Smith", role: "COO", weighting: 20, equity: 10 },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Equity Modeling</h2>
          <p className="text-slate-500 mt-2 font-medium">Dynamic simulation of ownership based on contribution and capital.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => onNavigate(ScreenId.ALIGNMENT_HISTORY)}>View History</Button>
          <Button onClick={() => onNavigate(ScreenId.SCENARIO_SIMULATOR)}>Run Simulator</Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" /> Time Horizon
            </h3>
            <input
              type="range"
              min="1" max="10"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
              <span>1 Year</span>
              <span className="text-indigo-600 font-black">{timeHorizon} Years</span>
              <span>10 Years</span>
            </div>
          </Card>

          <Card className="p-6 border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Capital Attraction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Raise Target</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">$</span>
                  <input
                    type="number"
                    value={capitalRaised}
                    onChange={(e) => setCapitalRaised(parseInt(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-indigo-50 border-none">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                The <strong>Weighting Factor</strong> accounts for technical vs. non-technical leadership and market rate risk taken.
              </p>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-slate-100 min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> Ownership Distribution
            </h3>
            <div className="space-y-8">
              {founders.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-bold text-slate-900">{f.name}</div>
                      <div className="text-xs text-slate-400">{f.role} • {f.weighting}% Weighing</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900">{f.equity}%</div>
                      <div className="text-[10px] font-bold text-emerald-500">+$1.2M Value</div>
                    </div>
                  </div>
                  <div className="h-4 bg-slate-50 rounded-full overflow-hidden flex">
                    <div className="h-full bg-indigo-600" style={{ width: `${f.equity}%` }}></div>
                    <div className="h-full bg-indigo-100" style={{ width: `${f.weighting - f.equity}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Unallocated Pool</div>
                <div className="text-2xl font-black text-slate-900">20%</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Dilution Forecast</div>
                <div className="text-2xl font-black text-amber-500">-12.5%</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button
          className="h-14 px-12 text-lg rounded-2xl bg-indigo-600 font-black shadow-xl shadow-indigo-200"
          onClick={() => onNavigate(ScreenId.LOCK_ALIGNMENT)}
        >
          Finalize Model & Lock Alignment
        </Button>
      </div>
    </div>
  );
};
