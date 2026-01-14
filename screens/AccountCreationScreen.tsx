import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button } from '../components/UI';
import { User, Mail, Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AccountCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState(AuthService.getUser()?.fullName || '');
  const [email, setEmail] = useState(AuthService.getUser()?.email || '');
  const [role, setRole] = useState(AuthService.getUser()?.role || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!fullName || !email || !role) return;
    setIsLoading(true);
    await AuthService.updateUser({ fullName, email, role });

    // Set onboarding step to 2
    const ws = AuthService.getWorkspace();
    if (ws) {
      await AuthService.updateWorkspace({ onboardingStep: 2 });
    }

    setIsLoading(false);
    onNavigate(ScreenId.COMPANY_CREATION);
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
            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => {
                const val = e.target.value;
                setFullName(val);
                AuthService.updateUser({ fullName: val });
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
                AuthService.updateUser({ email: val });
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Role</label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map(r => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  AuthService.updateUser({ role: r });
                }}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === r
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button
            fullWidth
            className="h-14 rounded-xl text-lg flex items-center justify-center gap-2"
            onClick={handleContinue}
            disabled={!fullName || !email || !role || isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>Continue <ArrowRight className="w-5 h-5" /></>
            )}
          </Button>
        </div>
      </div>
    </div >
  );
};
