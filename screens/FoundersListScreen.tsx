import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { User, Plus, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { FounderService } from '../services/FounderService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [founders, setFounders] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const data = await FounderService.getFounders(user.email);
        setFounders(data || []);
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
          <h2 className="text-4xl font-black text-slate-900 mb-2">Founders</h2>
          <p className="text-slate-500 font-medium">Manage the core team and ownership.</p>
        </div>
        <Button onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Co-founder
        </Button>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
        <>
          <div className="space-y-4 mb-12">
            {founders.map((f) => (
              <Card key={f.id} className="p-6 flex justify-between items-center bg-white border-2 border-slate-50 hover:border-indigo-100 transition-all cursor-pointer" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {f.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{f.name} — {f.role}</h3>
                    <p className="text-sm text-slate-400 font-medium">{f.equity} Ownership</p>
                  </div>
                </div>
                <Badge color="green">Verified</Badge>
              </Card>
            ))}

            <button
              className="w-full p-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
              onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}
            >
              <Plus className="w-5 h-5" /> Add Co-founder
            </button>
          </div>

          <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold">Alignment Status</h3>
              </div>
              <span className="text-2xl">❌</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your founder alignment is currently <span className="text-white font-bold text-red-400">Broken</span>.
              Issues detected in Vision Match and Equity Agreement.
            </p>
            <Button fullWidth onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)} className="h-14 bg-white text-slate-900 hover:bg-slate-100 font-bold flex items-center justify-center gap-2">
              Fix Alignment Issues <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </>
      )}
    </div>
  );
};
