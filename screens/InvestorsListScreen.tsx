import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Building, Plus, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';
import { ExternalService, Investor } from '../services/ExternalService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InvestorsListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [investors, setInvestors] = React.useState<Investor[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const data = await ExternalService.getInvestors(user.email);
        setInvestors(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Investors</h2>
          <p className="text-slate-500 font-medium">Manage your cap table and fundraising CRM.</p>
        </div>
        <Button onClick={() => alert("Add Target flow")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Target
        </Button>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
        <div className="space-y-4">
          {investors.map((v, i) => (
            <Card key={v.id || i} className="p-6 bg-white border-2 border-slate-50 hover:border-indigo-100 transition-all cursor-pointer group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{v.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {i % 2 === 0 && <Badge color="indigo" className="text-[8px] px-1.5 py-0">On Foundry</Badge>}
                      <Badge color="emerald" className="text-[8px] px-1.5 py-0">Warm</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 flex-1 gap-4 border-l border-slate-50 pl-6">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Check Size</div>
                    <div className="text-sm font-bold text-slate-700">$250k - $1M</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stage</div>
                    <div className="text-sm font-bold text-slate-700">{v.stage}</div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end border-l border-slate-50 pl-6 min-w-[120px]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Likelihood</div>
                  <div className="text-2xl font-black text-indigo-600">82%</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between pt-4 border-t border-slate-50 gap-4">
                <div className="flex gap-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact: <span className="text-slate-900 normal-case ml-1">{v.email || 'partner@vc.com'}</span></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Source: <span className="text-indigo-600 normal-case ml-1">{v.notes || "Warm Intro"}</span></div>
                </div>
                <Button variant="secondary" className="px-3 py-1.5 text-xs font-bold border-indigo-100 text-indigo-600 hover:bg-slate-50">
                  Draft Intro
                </Button>
              </div>
            </Card>
          ))}
          {investors.length === 0 && (
            <div className="text-center py-20 text-slate-400 font-medium">No target investors added yet.</div>
          )}
        </div>
      )}

      <div className="mt-12 p-8 bg-slate-900 text-white rounded-3xl flex justify-between items-center shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-1">
            <TrendingUp className="w-4 h-4" /> Signal Strength
          </div>
          <div className="text-4xl font-black">High</div>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm max-w-[200px]">
            Based on market interest and validation score, Sequoia is a 92% match.
          </p>
        </div>
      </div>
    </div>
  );
};