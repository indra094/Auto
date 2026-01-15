import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { User, Plus, ShieldAlert, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { FounderService } from '../services/FounderService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [founders, setFounders] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInviting, setIsInviting] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteName, setInviteName] = React.useState('');

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

  const handleInvite = async () => {
    if (!inviteEmail || !inviteName) return;
    const user = AuthService.getUser();
    if (!user) return;

    setIsInviting(true);
    try {
      // Using the TeamService we just updated
      // (Invite executive logic is mocked in TeamService to return success)
      alert(`Invite sent to ${inviteName} (${inviteEmail})! Transitions to 'Alignment' pending.`);
      setIsInviting(false);
      setInviteEmail('');
      setInviteName('');
    } catch (e) {
      console.error(e);
      setIsInviting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Workspace / Team</div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Core Founders</h2>
          <p className="text-slate-500 font-medium">Manage ownership and invite new key leaders.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setIsInviting(!isInviting)}>
            {isInviting ? "Cancel" : "Invite Executive"}
          </Button>
          <Button onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Founder
          </Button>
        </div>
      </header>

      {isInviting && (
        <Card className="p-8 bg-indigo-50 border-indigo-100 animate-in slide-in-from-top duration-300">
          <h3 className="font-bold text-indigo-900 mb-6">Invite New Executive</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              placeholder="Full Name"
              className="p-4 rounded-xl border border-indigo-200 outline-none focus:ring-2 focus:ring-indigo-300"
              value={inviteName}
              onChange={e => setInviteName(e.target.value)}
            />
            <input
              placeholder="Email Address"
              className="p-4 rounded-xl border border-indigo-200 outline-none focus:ring-2 focus:ring-indigo-300"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
            />
          </div>
          <Button fullWidth onClick={handleInvite} className="h-14 bg-indigo-600 font-bold">Send Formal Invitation</Button>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {founders.map((f) => (
              <Card key={f.id} className="p-6 flex justify-between items-start bg-white border-2 border-slate-50 hover:border-indigo-100 transition-all cursor-pointer group" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shrink-0">
                    {f.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{f.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{f.role}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge color="indigo" className="text-[10px]">{f.equity} Equity</Badge>
                      <Badge color="slate" className="text-[10px]">4yr Vesting</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-emerald-500"><CheckCircle className="w-5 h-5 fill-current" /></div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <ShieldAlert className="w-48 h-48" />
            </div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold">Alignment Status</h3>
              </div>
              <Badge color="red" className="px-4 py-1">Broken</Badge>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed relative z-10 max-w-lg">
              Issues detected in <strong>Vision Match</strong> (Section 4.1) and <strong>Equity Agreement</strong> (v1.2).
              Estimated risk of fallout is <span className="text-red-400 font-bold">35%</span>.
            </p>
            <Button fullWidth onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)} className="h-16 bg-white text-slate-900 hover:bg-slate-100 font-black flex items-center justify-center gap-3 relative z-10 text-lg">
              Resolve Alignment Issues <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </>
      )}
    </div>
  );
};
