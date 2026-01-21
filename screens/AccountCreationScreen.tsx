import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import { UserIcon, Mail, Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '../services/AuthService';
import type { User, Workspace } from '../services/AuthService';


interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AccountCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState(AuthService.getUser()?.fullName || '');
  const [email, setEmail] = useState(AuthService.getUser()?.email || '');
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryLocked, setRetryLocked] = useState(false);
  const [retryTimer, setRetryTimer] = useState(0);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  let currentUser: User | null = null;
  let currentWorkspace: Workspace | null = null;

  const hasLoaded = useRef(false);

  useEffect(() => {
    const loadWorkspace = async () => {
      const user = AuthService.getUser();
      if (!user?.current_org_id) return;

      const ws = await AuthService.getWorkspace(user.current_org_id);
      setWorkspace(ws);
      setIsOnboardingComplete((ws?.onboardingStep ?? 0) >= 3);
    };

    loadWorkspace();
  }, []);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    const hydrateRoleFromOrg = async () => {
      const user = AuthService.getUser();
      const ws = await AuthService.getWorkspace(user?.current_org_id);

      if (!user || !ws) {
        setRoleLoading(false);
        return;
      }

      try {
        const res = await AuthService.getUserOrgInfo(user.id, ws.id);
        setRole(res?.role || null);
      } catch (err) {
        console.error('Failed to load user org info', err);
      } finally {
        setRoleLoading(false);
      }
    };

    hydrateRoleFromOrg();
  }, []);



  const handleContinue = async () => {
    if (!fullName || !email || !role) return;

    setIsLoading(true);
    setError(null);

    try {
      // Only now do we call RPCs
      await AuthService.updateUser({ fullName, email });


      const user = AuthService.getUser();
      const ws = await AuthService.getWorkspace(user?.current_org_id);
      if (ws && user) {
        await AuthService.setUserOrgInfo(user.id, ws.id, { role });
      }

      if (ws && !isOnboardingComplete) {
        await AuthService.setOnboarding(ws.id, 2);
        onNavigate(ScreenId.COMPANY_INFORMATION);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");

      setRetryLocked(true);
      setRetryTimer(5);

      const timer = setInterval(() => {
        setRetryTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setRetryLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };


  const roles = ['Founder', 'Executive', 'Investor', 'Advisor'];

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Info</h1>
        <p className="text-slate-500">Let's get to know you first.</p>
      </header>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                const val = e.target.value;
                setFullName(val);

              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="email"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);

              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {roles.map(r => (
            <button
              key={r}
              disabled={roleLoading}
              onClick={() => {
                setRole(r);

              }}
              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
        ${role === r
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}
        ${roleLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
            >
              {r}
            </button>
          ))}
        </div>


        <div className="pt-4">
          <Button
            fullWidth
            className="h-14 rounded-xl text-lg flex items-center justify-center gap-2"
            onClick={handleContinue}
            disabled={!fullName || !email || !role || isLoading || retryLocked || roleLoading}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : retryLocked ? (
              <>Retry in {retryTimer}s</>
            ) : isOnboardingComplete ? (
              <>Save</>
            ) : (
              <>Save & Continue <ArrowRight className="w-6 h-6" /></>
            )}
          </Button>
          {error && (
            <p className="mt-3 text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </div >
  );
};
