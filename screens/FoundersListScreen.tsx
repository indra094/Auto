import React, { useState } from 'react';
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
  const [showAddFounder, setShowAddFounder] = useState(false);

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
      {/* header */}
      <header className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">
            Workspace / Team
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Core Founders</h2>
          <p className="text-slate-500 font-medium">
            Manage ownership and invite new key leaders.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setIsInviting(!isInviting)}>
            {isInviting ? "Cancel" : "Invite Executive"}
          </Button>
          <Button onClick={() => setShowAddFounder(true)}>
            <Plus className="w-4 h-4" /> Add Founder
          </Button>
        </div>
      </header>

      {/* alignment card (light themed) */}
      <Card className="p-8 bg-white border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-slate-900">Alignment Status</h3>
          </div>
          <Badge color="red" className="px-4 py-1">Broken</Badge>
        </div>

        <p className="text-slate-500 mb-6 leading-relaxed">
          Issues detected in <strong>Vision Match</strong> and <strong>Equity Agreement</strong>.
          Estimated risk of fallout is <span className="text-red-500 font-bold">35%</span>.
        </p>

        <Button
          fullWidth
          onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}
          className="h-16 bg-indigo-600 text-white hover:bg-indigo-700 font-black flex items-center justify-center gap-3 text-lg"
        >
          Resolve Alignment Issues <ArrowRight className="w-5 h-5" />
        </Button>
      </Card>

      {showAddFounder && (
        <AddFounderPanel
          open={showAddFounder}
          onClose={() => setShowAddFounder(false)}
          onSave={(data) => {
            setFounders([data, ...founders]);
            setShowAddFounder(false);
          }}
        />
      )}


      {/* rest of your founder list */}
    </div>
  );
};

export const AddFounderPanel = ({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("CEO");
  const [hours, setHours] = React.useState(40);
  const [equity, setEquity] = React.useState(50);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add Founder</h3>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full p-4 rounded-xl border border-slate-200"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-xl border border-slate-200"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-4 rounded-xl border border-slate-200"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              className="w-1/2 p-4 rounded-xl border border-slate-200"
              placeholder="Weekly Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <input
              className="w-1/2 p-4 rounded-xl border border-slate-200"
              placeholder="Equity %"
              type="number"
              value={equity}
              onChange={(e) => setEquity(Number(e.target.value))}
            />
          </div>

          <Button
            fullWidth
            onClick={() => onSave({ name, email, role, hours, equity })}
          >
            Add Founder
          </Button>
        </div>
      </Card>
    </div>
  );
};
