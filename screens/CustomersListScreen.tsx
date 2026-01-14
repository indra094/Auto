import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { Building2, Plus, ArrowRight, Star, Loader2 } from 'lucide-react';
import { ExternalService, Customer } from '../services/ExternalService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CustomersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const data = await ExternalService.getCustomers(user.email);
        setCustomers(data || []);
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
          <h2 className="text-4xl font-black text-slate-900 mb-2">Customers</h2>
          <p className="text-slate-500 font-medium">Tracking product-market pull through discovery.</p>
        </div>
        <Button onClick={() => alert("Add Interview flow")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Interview
        </Button>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
        <div className="space-y-4">
          {customers.map((c, i) => (
            <Card key={c.id || i} className="p-6 flex justify-between items-center bg-white border-2 border-slate-50 hover:border-indigo-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <Building2 className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{c.company}</h3>
                  <p className="text-sm text-slate-400 font-medium">{c.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={c.status === 'Verified' ? 'green' : 'amber'}>{c.status}</Badge>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </Card>
          ))}
          {customers.length === 0 && (
            <div className="text-center py-20 text-slate-400 font-medium">No customer interviews recorded yet.</div>
          )}
        </div>
      )}

      <Card className="mt-12 p-8 bg-indigo-600 text-white border-none shadow-2xl relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Star className="w-32 h-32 fill-current" />
        </div>
        <h3 className="text-xl font-bold mb-4">Discovery Metric</h3>
        <div className="text-5xl font-black mb-2">4.2/5.0</div>
        <p className="text-indigo-100 text-sm font-medium">Average "Pain Score" across 12 interviews.</p>
        <Button className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50 font-bold" fullWidth onClick={() => onNavigate(ScreenId.VALIDATION_CHECKLIST)}>
          View Validation Checklist
        </Button>
      </Card>
    </div>
  );
};