import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Scale, AlertOctagon, ArrowRight, Loader2 } from 'lucide-react';
import { FounderService, Founder } from '../services/FounderService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const EquityModelingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [founders, setFounders] = React.useState<Founder[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      const data = await FounderService.getFounders(user.email);
      setFounders(data || []);
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>;

  return (
    <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Equity & Commitment Modeling</h2>
        <div className="text-sm text-slate-500">Changes here update the agreement draft automatically.</div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {founders.map((f, i) => (
            <Card key={f.id} title={`${f.name}'s Parameters`}>
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm font-medium mb-2">
                    <span>Weekly Hours</span>
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{f.hoursPerWeek}h</span>
                  </label>
                  <input
                    type="range"
                    className="w-full accent-indigo-600"
                    min="0" max="80"
                    value={f.hoursPerWeek}
                    onChange={async (e) => {
                      const val = parseInt(e.target.value);
                      const updated = [...founders];
                      updated[i].hoursPerWeek = val;
                      setFounders(updated);
                      await FounderService.updateFounder(f.id, { hoursPerWeek: val });
                    }}
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm font-medium mb-2">
                    <span>Equity Allocation</span>
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{f.equity}%</span>
                  </label>
                  <input
                    type="range"
                    className="w-full accent-indigo-600"
                    min="0" max="100"
                    value={f.equity}
                    onChange={async (e) => {
                      const val = parseFloat(e.target.value);
                      const updated = [...founders];
                      updated[i].equity = val;
                      setFounders(updated);
                      await FounderService.updateFounder(f.id, { equity: val });
                    }}
                  />
                </div>
                <div className="pt-4 border-t">
                  <label className="flex justify-between text-sm font-medium mb-2">
                    <span>Vesting Cliff</span>
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{f.vestingCliff} Year{f.vestingCliff !== 1 ? 's' : ''}</span>
                  </label>
                  <input
                    type="range"
                    className="w-full accent-slate-600"
                    min="0" max="4"
                    value={f.vestingCliff}
                    onChange={async (e) => {
                      const val = parseInt(e.target.value);
                      const updated = [...founders];
                      updated[i].vestingCliff = val;
                      setFounders(updated);
                      await FounderService.updateFounder(f.id, { vestingCliff: val });
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
          {founders.length === 0 && (
            <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed">
              No founders found. Add them in the Founders screen.
            </div>
          )}
        </div>

        {/* Live Consequences */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-50 text-indigo-900 p-6 rounded-xl border border-indigo-100 shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-400">
              <Scale size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-indigo-600 uppercase tracking-widest text-xs font-bold mb-2">AI Real-Time Analysis</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
                {founders.some(f => f.hoursPerWeek < 40 && f.equity > 30) ? (
                  <>"Giving <span className="text-red-600 font-medium">part-time</span> founders high equity creates a <span className="text-red-600 font-medium">dead equity risk</span>."</>
                ) : (
                  <>"The current split looks <span className="text-emerald-600 font-medium">balanced</span> and reflects real-time contribution."</>
                )}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/60 rounded border border-indigo-100">
                  <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm block">Vesting Analysis</span>
                    <span className="text-xs text-indigo-800/80">
                      Standard 4-year vesting with 1-year cliff is recommended for all members.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="primary" fullWidth className="h-14 text-lg" onClick={() => onNavigate(ScreenId.SCENARIO_SIMULATOR)}>
            Test This Split in Simulator <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
