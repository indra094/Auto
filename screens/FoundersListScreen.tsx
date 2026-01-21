import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { User, Plus, ShieldAlert, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { FounderService } from '../services/FounderService';
import { AuthService } from '../services/AuthService';
import ReactDOM from "react-dom";

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [founders, setFounders] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInviting, setIsInviting] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteName, setInviteName] = React.useState('');
  const [showAddFounder, setShowAddFounder] = useState(false);
  const loadUsers = async () => {
    const user = AuthService.getUser();
    if (!user) return;

    try {
      // NEW: load all users in this org
      const orgUsers = await AuthService.getUsersForOrg(user.current_org_id);
      setUsers(orgUsers || []);
      setFounders(orgUsers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    loadUsers();
  }, []);

  const handleInvite = async () => {
    if (!inviteEmail || !inviteName) return;
    const user = AuthService.getUser();
    if (!user) return;

    setIsInviting(true);
    try {
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

      {/* NEW: Users list */}
      <Card className="p-6 bg-white border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Users in this Organization</h3>

        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading users...
          </div>
        ) : (
          <div className="space-y-3">
            {users.length === 0 ? (
              <div className="text-slate-500">No users found in this organization.</div>
            ) : (
              users.map((u) => (
                <div key={u.id} className="flex justify-between items-center border border-slate-100 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-bold text-slate-900">{u.fullName}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </div>
                  </div>

                  <Badge color="indigo">{u.role || "Member"}</Badge>
                </div>
              ))
            )}
          </div>
        )}
      </Card>

      {showAddFounder && (
        <AddFounderPanel
          open={showAddFounder}
          onClose={async () => {
            setShowAddFounder(false);
            await loadUsers();   // 🔥 refresh users list
          }}
          onSave={(data) => {
            setFounders([data, ...founders]);
            setShowAddFounder(false);
          }}
        />

      )}
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
  if (!open) return null;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("CEO");
  const [team, setTeam] = React.useState("Product");
  const [hours, setHours] = React.useState(40);
  const [equity, setEquity] = React.useState(50);

  const [isSending, setIsSending] = React.useState(false);

  const summary = [
    role,
    team,
    `${hours} hrs/wk`,
    `${equity}% equity`,
  ].filter(Boolean).join(" • ");

  const isValid = name.trim().length > 0 && email.trim().length > 0;

  const handleSendInvite = async () => {
    if (!isValid) return;

    setIsSending(true);
    const user = AuthService.getUser();
    try {
      const orgID = (await AuthService.getWorkspace(user.current_org_id))?.id ?? "";

      const created = await AuthService.createUserForOrg(
        name,
        email,
        orgID,
        role
      );

      // Notify parent component
      onSave({
        id: created.id,
        fullName: name,
        email,
        role,
        team,
        hours,
        equity,
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send invite. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-2xl max-h-[70vh] p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Add User to Organization</h3>
            <p className="text-slate-500 mt-1">
              Invite a member and assign a role.
            </p>
          </div>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left: Form */}
          <div className="col-span-7 space-y-3">
            <input
              className="w-full p-3 rounded-xl border border-slate-200"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl border border-slate-200"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                className="p-3 rounded-xl border border-slate-200"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>CEO</option>
                <option>CTO</option>
                <option>Product</option>
                <option>Designer</option>
                <option>Marketing</option>
              </select>

              <select
                className="p-3 rounded-xl border border-slate-200"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option>Product</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200"
                  type="number"
                  placeholder="Weekly Hours"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
                <div className="text-xs text-slate-500 mt-1">
                  Weekly commitment in hours
                </div>
              </div>

              <div>
                <input
                  className="w-full p-3 rounded-xl border border-slate-200"
                  type="number"
                  placeholder="Equity %"
                  value={equity}
                  onChange={(e) => setEquity(Number(e.target.value))}
                />
                <div className="text-xs text-slate-500 mt-1">
                  Equity share in percentage
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="col-span-5 space-y-3">
            <Card className="p-6 bg-white border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">Invite Preview</h4>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  Pending
                </span>
              </div>

              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Invitee</span>
                  <span>{name || "—"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Email</span>
                  <span>{email || "—"}</span>
                </div>
              </div>

              {/* Summary Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-2">
                  <div className="font-medium text-slate-800">Summary</div>
                  <div className="text-slate-500">
                    <div>{summary}</div>
                    <div className="mt-1">• {hours} hrs/wk</div>
                    <div className="mt-1">• {equity}% equity</div>
                  </div>
                </div>
              </div>

              <Button
                fullWidth
                className="mt-5"
                disabled={!isValid || isSending}
                onClick={handleSendInvite}
              >
                {isSending ? "Sending..." : "Send Invite"}
              </Button>
            </Card>

          </div>
        </div>
      </Card>
    </div>,
    document.body
  );
};

