import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { CheckCircle, Circle, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { ReadinessService, ReadinessGate } from '../services/ReadinessService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const IncorporationReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [gate, setGate] = React.useState<ReadinessGate | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const data = await ReadinessService.getIncorporationReadiness(user.email);
        setGate(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-indigo-500" /></div>;

  const items = [
    { label: "Founder Alignment", status: "✅" },
    { label: "Validation", status: "✅" },
    { label: "Cap Table", status: "❌" },
  ];

  return (
    <div className="p-12 max-w-2xl mx-auto text-center">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Incorporation Readiness</h2>
        <p className="text-slate-500 font-medium">Verify your foundation before legalizing the venture.</p>
      </header>

      <Card className="p-8 text-left bg-white border-2 border-slate-100 shadow-xl overflow-hidden">
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-lg font-bold text-slate-700">{item.label}</span>
              <span className="text-2xl">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            fullWidth
            className="h-16 rounded-2xl font-bold border-2 border-slate-200 text-slate-500 hover:bg-slate-50"
            onClick={() => onNavigate(ScreenId.PROCEED_ANYWAY)}
          >
            Proceed Anyway
          </Button>
          <Button
            fullWidth
            className="h-16 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200"
            onClick={() => alert("Fixing issues...")}
          >
            Fix Issues
          </Button>
        </div>
      </Card>
    </div>
  );
};
