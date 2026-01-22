import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { User, Plus, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
//import { FounderService } from '../services/FounderService';
import { AuthService } from '../services/AuthService';
import ReactDOM from "react-dom";

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {

  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInviting, setIsInviting] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteName, setInviteName] = React.useState('');
  const [showAddFounder, setShowAddFounder] = useState(false);
  const currentUser = AuthService.getUser();
  const [isAdmin, setIsAdmin] = useState(false);


  const loadPermission = async () => {
    if (!currentUser?.id || !currentUser?.current_org_id) return;

    try {
      const info = await AuthService.getUserOrgInfo(
        currentUser.id,
        currentUser.current_org_id
      );
      setIsAdmin(info?.permissionLevel === "ADMIN");
    } catch (err) {
      console.error("Failed to load user permission", err);
    }
  };


  const loadUsers = async () => {
    const user = AuthService.getUser();
    if (!user) return;

    try {
      console.log("founders list screen user" + user);
      // NEW: load all users in this org
      const orgUsers = await AuthService.getUsersForOrg(user.current_org_id);
      setUsers(orgUsers || []);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadPermission();
    loadUsers();
  }, []);


  const handleRemoveUser = async (userId: string) => {
    if (!currentUser) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove this user from the organization?"
    );
    if (!confirmed) return;

    try {
      // await AuthService.removeUserFromOrg(userId, currentUser.current_org_id);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove user");
    }
  };


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
          {isAdmin && (
            <Button onClick={() => setShowAddFounder(true)}>
              <Plus className="w-4 h-4" /> Add Founder
            </Button>
          )}
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

        {/* READ-ONLY EXPLANATION */}
        <p className="text-xs text-slate-400 mb-4">
          Equity and commitments reflect the current active agreement.
        </p>

        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading users...
          </div>
        ) : (
          <div className="space-y-3">
            {
              users.length === 0 ? (
                <div className="text-slate-500">
                  No users found. {isAdmin ? "Use Add Founder to invite new users." : "Contact your admin to add users."}
                </div>
              ) : (
                users.map((u) => {
                  const isSelf = u.id === currentUser?.id;

                  return (
                    <div
                      key={u.id}
                      className="border border-slate-100 rounded-xl p-6 space-y-4 bg-white"
                    >
                      {/* Row 1: Identity */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{u.fullName}</span>

                            <span className="text-slate-400 font-normal">· {u.role}</span>

                            <Badge
                              color={u.permission_level === "ADMIN" ? "purple" : "slate"}
                              title={
                                u.permission_level === "ADMIN"
                                  ? "ADMIN: Can update equity, remove founders, and edit permissions."
                                  : "MEMBER: Can only view details."
                              }
                            >
                              {u.permissionLevel}
                            </Badge>
                          </div>

                          <div className="text-xs text-slate-500">
                            Joined on {u.startDate || "—"}
                          </div>
                        </div>

                        <Badge
                          color={
                            u.status === "Active"
                              ? "green"
                              : u.status === "Pending Activation"
                                ? "yellow"
                                : "slate"
                          }
                        >
                          {u.status}
                        </Badge>
                      </div>

                      {/* Row 2: Commitment */}
                      {/* Row 2: Time Commitment */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-xs text-slate-500">
                          Time Commitment
                        </div>

                        <div className="font-semibold text-slate-900">
                          {u.commitment} hrs / week
                        </div>
                      </div>


                      {/* Row 3: Equity + Vesting */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">
                              Equity
                            </div>
                            <div className="font-medium text-slate-900">
                              {u.equity}%
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500 mb-1">Vesting</div>
                          <div className="font-medium text-slate-900">
                            {u.vesting && u.vesting.trim() !== "" ? u.vesting : (
                              <span className="italic text-slate-500">Not set</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Row 4:  Audit */}

                      <div className="flex justify-between items-center text-xs text-slate-500">


                        <div className="flex items-center gap-6">
                          <span>Last updated: {u.lastUpdated}</span>

                          {isAdmin && !isSelf && (
                            <button
                              title="Remove user from organization (Admin only)"
                              onClick={() => handleRemoveUser(u.id)}
                              className="text-red-500 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                  );
                })
              )}
          </div >
        )
        }
      </Card >

      {isAdmin && showAddFounder && (
        <AddFounderPanel
          open={showAddFounder}
          isAdmin={isAdmin}
          onClose={async () => {
            setShowAddFounder(false);
            await loadUsers();
          }}
          onSave={() => {
            setShowAddFounder(false);
          }}
        />
      )}

    </div >
  );
};

export const AddFounderPanel = ({
  open,
  onClose,
  onSave,
  isAdmin
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isAdmin: boolean;
}) => {
  if (!open) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Founder");
  const [commitment, setCommitment] = useState(40);
  const [equity, setEquity] = useState(0);
  const [vesting, setVesting] = useState("4y / 1y cliff");
  const [permissionLevel, setPermissionLevel] = useState("MEMBER");
  const [isSending, setIsSending] = useState(false);

  const user = AuthService.getUser();

  const isValid = name.trim().length > 0 && email.trim().length > 0;

  const summary = [
    role,
    `${commitment} hrs/wk`,
    `${equity}% equity`,
  ].join(" • ");

  const handleSendInvite = async () => {
    if (!isValid) return;

    setIsSending(true);
    try {
      const orgID =
        (await AuthService.fetchWorkspaceFromServer(user.current_org_id))?.id ?? "";

      const created = await AuthService.createUserForOrg(
        name,
        email,
        orgID,
        "Pending Activation",
        role,
        permissionLevel,
        equity,
        vesting,
        commitment,
      );

      onSave({
        id: created.id,
        fullName: name,
        email,
        role,
        commitment,
        equity,
        vesting,
        permissionLevel: permissionLevel,
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
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">

          {/* Left: Form */}
          <div className="col-span-7 space-y-4">

            {/* Full Name */}
            <div>
              <input
                className="w-full p-3 rounded-xl border border-slate-200"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="text-[10px] text-slate-400 mt-1">
                The full name of the person you’re inviting.
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                className="w-full p-3 rounded-xl border border-slate-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-[10px] text-slate-400 mt-1">
                The email address of the user you’re inviting.
              </div>
            </div>

            {/* Role */}
            <div>
              <select
                className="w-full p-3 rounded-xl border border-slate-200"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Founder</option>
                <option>CEO</option>
                <option>CTO</option>
                <option>CPO</option>
                <option>Advisor</option>
              </select>
              <div className="text-[10px] text-slate-400 mt-1">
                Select the role they will hold in the organization.
              </div>
            </div>

            {/* Permission Level */}
            <div>
              <select
                className="w-full p-3 rounded-xl border border-slate-200"
                value={permissionLevel}
                onChange={(e) => setPermissionLevel(e.target.value)}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="VIEWER">VIEWER</option>
              </select>
              <div className="text-[10px] text-slate-400 mt-1">
                Permission level determines access and control in the org.
              </div>
            </div>

            {/* Commitment slider (ADMIN only movable) */}
            <div>
              <label className="text-xs text-slate-500 mb-1 block">
                Weekly Commitment ({commitment} hrs)
              </label>
              <input
                type="range"
                min={0}
                max={80}
                step={1}
                value={commitment}
                disabled={!isAdmin}
                onChange={(e) =>
                  isAdmin && setCommitment(Number(e.target.value))
                }
                className="w-full disabled:opacity-50"
              />
              {!isAdmin && (
                <div className="text-[10px] text-slate-400 mt-1">
                  Only ADMIN can set commitment during invite
                </div>
              )}
            </div>

            {/* Equity (ADMIN only) */}
            <div>
              <input
                className="w-full p-3 rounded-xl border border-slate-200 disabled:bg-slate-100"
                type="number"
                min={0}
                max={100}
                step={0.01}
                placeholder="Equity %"
                value={equity}
                disabled={!isAdmin}
                onChange={(e) => setEquity(Number(e.target.value))}
              />
              {!isAdmin && (
                <div className="text-[10px] text-slate-400 mt-1">
                  Equity can only be assigned by ADMIN
                </div>
              )}
              {/* Add this helper text */}
              <div className="text-[10px] text-slate-400 mt-1">
                Percentage of company ownership granted.
              </div>
            </div>

            {/* Vesting */}
            <div>
              <input
                className="w-full p-3 rounded-xl border border-slate-200"
                placeholder="Vesting (e.g. 4y / 1y cliff)"
                value={vesting}
                onChange={(e) => setVesting(e.target.value)}
              />
              <div className="text-[10px] text-slate-400 mt-1">
                Vesting schedule for the equity granted.
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="col-span-5">
            <Card className="p-6 bg-white border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">Invite Preview</h4>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  Pending Activation
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Invitee</span>
                  <span>{name || "—"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Email</span>
                  <span>{email || "—"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">Authority</span>
                  <span>{permissionLevel}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-medium text-slate-800 mb-2">Summary</div>
                <div className="text-slate-500 text-sm">{summary}</div>
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

