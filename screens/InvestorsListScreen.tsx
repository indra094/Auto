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
    <div className="p-8 max-w-2xl mx-auto">
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
            <Card key={v.id || i} className="p-6 flex justify-between items-center bg-white border-2 border-slate-50 hover:border-indigo-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{v.name}</h3>
                  <p className="text-sm text-slate-400 font-medium">{v.type} • {v.stage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={v.status === 'Meeting Set' ? 'green' : v.status === 'Contacted' ? 'indigo' : 'slate'}>{v.status}</Badge>
                <ArrowRight className="w-4 h-4 text-slate-300" />
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