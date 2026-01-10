import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Building, User, AlertCircle, Loader2 } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AccountCreationScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [errors, setErrors] = useState<{workspace?: boolean, role?: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill if data exists
  useEffect(() => {
    const ws = AuthService.getWorkspace();
    const usr = AuthService.getUser();
    if (ws?.name) setWorkspaceName(ws.name);
    if (usr?.role && usr.role !== 'Founder') setUserRole(usr.role);
  }, []);

  const handleNext = async () => {
    const newErrors: {workspace?: boolean, role?: boolean} = {};
    if (!workspaceName.trim()) newErrors.workspace = true;
    if (!userRole.trim()) newErrors.role = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Save data to shared state
      await AuthService.updateWorkspace({ name: workspaceName, onboardingStep: 2 });
      await AuthService.updateUser({ role: userRole });
      setIsLoading(false);
      onNavigate(ScreenId.STARTUP_BASICS);
    }
  };

  const isFormValid = workspaceName.trim().length > 0 && userRole.trim().length > 0;

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Setup Your Workspace</h2>
        <p className="text-slate-500 mt-2">Create a home for your startup's operating system.</p>
      </div>

      <Card title="Workspace Details">
        <div className="space-y-6">
          
          {/* Workspace Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Startup / Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <Building className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={workspaceName}
                onChange={(e) => {
                  setWorkspaceName(e.target.value);
                  if(errors.workspace) setErrors({...errors, workspace: false});
                }}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2 border rounded-md transition-colors outline-none focus:ring-2 ${errors.workspace ? 'border-red-300 ring-2 ring-red-100 bg-red-50' : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-500'}`} 
                placeholder="e.g. Acme Corp" 
              />
            </div>
            {errors.workspace && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Company name is required</p>}
          </div>

          {/* User Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Your Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  if(errors.role) setErrors({...errors, role: false});
                }}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-2 border rounded-md transition-colors outline-none focus:ring-2 ${errors.role ? 'border-red-300 ring-2 ring-red-100 bg-red-50' : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-500'}`} 
                placeholder="e.g. CEO, CTO, Founder" 
              />
            </div>
            {errors.role && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Role is required</p>}
          </div>

          <div className="pt-2">
            <Button fullWidth onClick={handleNext} disabled={!isFormValid || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Create Workspace & Continue'}
            </Button>
          </div>
        </div>
      </Card>
      
      <p className="text-center text-xs text-slate-400 mt-6">
        Step 2 of 6 • Information is private and encrypted.
      </p>
    </div>
  );
};
