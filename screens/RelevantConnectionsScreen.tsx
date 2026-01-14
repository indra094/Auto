import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ArrowRight, Loader2 } from 'lucide-react';
import { IntelligenceService } from '../services/IntelligenceService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const RelevantConnectionsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [connections, setConnections] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const data = await IntelligenceService.getRelevantConnections(user.email);
        setConnections(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Relevant Connections</h2>
        <div className="bg-slate-100 p-1 rounded-lg flex text-sm">
          <button className="px-3 py-1 bg-white shadow-sm rounded-md font-medium text-slate-800">Investors</button>
          <button className="px-3 py-1 text-slate-500">Customers</button>
          <button className="px-3 py-1 text-slate-500">Talent</button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
        <div className="space-y-4">
          {connections.map((conn) => (
            <Card key={conn.id}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full shrink-0 flex items-center justify-center text-indigo-700 font-bold">
                  {conn.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{conn.name} <span className="text-sm font-normal text-slate-500">@ {conn.company}</span></h3>
                    <Badge color="green">Warm Intro Available</Badge>
                  </div>

                  <div className="mt-1 mb-2">
                    <span
                      className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={() => onNavigate(ScreenId.STAGES_CAPITAL)}
                    >
                      Relevant at: Stage 2 (Pre-seed)
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mt-1">{conn.role} specializing in your sector.</p>
                  <div className="mt-3 bg-indigo-50 p-2 rounded text-xs text-indigo-800 inline-block font-medium">
                    ✨ Relevance: {conn.relevance}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button className="h-8 text-xs">Prep Intro Note</Button>
                    <Button variant="secondary" className="h-8 text-xs">View Profile</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {connections.length === 0 && (
            <div className="text-center py-20 text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed">
              No relevant connections found yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
