import React, { useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Loader2, Key, ShieldCheck, Share2, Users, Download, Plus } from 'lucide-react';
import { TeamService, Employee } from '../services/TeamService';
import { FounderService, Founder } from '../services/FounderService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const TeamEmployeesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) return;

    const load = async () => {
      try {
        const eData = await TeamService.getEmployees(user.email);
        const fData = await FounderService.getFounders(user.email);
        setEmployees(eData);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async () => {
    const user = AuthService.getUser();
    if (!user || !newName) return;
    setLoading(true);
    try {
      await TeamService.addEmployee(user.email, {
        name: newName,
        role: 'Team Member',
        type: 'Human',
        status: 'Active'
      });
      const eData = await TeamService.getEmployees(user.email);
      setEmployees(eData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShowAdd(false);
      setNewName('');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">People & Talent</h2>
          <p className="text-slate-500 mt-2 font-medium">Your organization's human and synthetic intelligence capital.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2 border-slate-200">
            <Download className="w-4 h-4" /> Bulk Import
          </Button>
          <Button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Member
          </Button>
        </div>
      </header>

      {showAdd && (
        <Card className="p-6 bg-indigo-50 border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4">Add New Team Member</h3>
          <div className="flex gap-4">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full Name"
              className="flex-1 p-3 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Button onClick={handleAdd} disabled={!newName || loading} className="px-8">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-indigo-500" /></div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Org Chart Visualization */}
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5" /> Org Structure (Visual)
              </h3>
              <Card className="p-10 bg-white border-2 border-slate-50 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  {/* Founder Node */}
                  <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-3 shadow-2xl group-hover:scale-105 transition-transform">F</div>
                    <Badge color="slate" className="font-bold text-[10px]">Founders</Badge>
                  </div>

                  {/* Line 1 */}
                  <div className="h-10 w-0.5 bg-slate-200"></div>

                  {/* Cross Bar */}
                  <div className="w-64 h-0.5 bg-slate-200 relative">
                    <div className="absolute left-0 h-4 w-0.5 bg-slate-200 translate-y-[-0.25rem]"></div>
                    <div className="absolute right-0 h-4 w-0.5 bg-slate-200 translate-y-[-0.25rem]"></div>
                    <div className="absolute left-1/2 h-4 w-0.5 bg-slate-200 translate-y-[-0.25rem]"></div>
                  </div>

                  {/* Second Row */}
                  <div className="flex gap-12 mt-4">
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold mb-2 shadow-lg group-hover:scale-105 transition-transform">E</div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Eng</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold mb-2 shadow-lg group-hover:scale-105 transition-transform">G</div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">GTM</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <div className="w-12 h-12 bg-indigo-400 rounded-xl flex items-center justify-center text-white font-bold mb-2 shadow-lg group-hover:scale-105 transition-transform">P</div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Product</span>
                    </div>
                  </div>

                  {/* Synthetic Sub-Row */}
                  <div className="mt-8 pt-8 border-t border-dashed border-slate-200 w-full flex justify-center">
                    <div className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg border border-indigo-100 animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white italic">AI</div>
                      <span className="text-[8px] font-bold text-indigo-700 uppercase tracking-tighter">Synthetic Intelligence Units Active</span>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Employee Table */}
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Team Members
              </h3>
              <div className="space-y-3">
                {[...founders.map(f => ({ ...f, type: 'Founder' })), ...employees].map((emp, i) => (
                  <Card
                    key={emp.id || i}
                    className={`flex justify-between items-center p-4 hover:shadow-md transition-all cursor-pointer border-slate-50 ${emp.status === 'Paused' ? 'opacity-60' : ''}`}
                    onClick={() => emp.type === 'AI' ? onNavigate(ScreenId.AI_EMPLOYEE_DETAIL) : null}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm
                            ${emp.type === 'AI' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                          emp.type === 'Founder' ? 'bg-slate-900' : 'bg-indigo-500'}
                         `}>
                        {emp.type === 'AI' ? '🤖' : (emp.name?.charAt(0) || 'U').toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{emp.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{emp.role} • {emp.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge color={emp.status === 'Active' ? 'green' : 'amber'}>{emp.status}</Badge>
                      {emp.type === 'AI' && <ChevronRight className="w-4 h-4 text-slate-300" />}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <Card className="p-6 bg-slate-900 text-white border-transparent shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold">API Access</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Connect your HRIS or Payroll system (Gusto, Rippling, etc.) to auto-sync employees and burn.
              </p>
              <div className="space-y-3 mb-8">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-300">HRIS_READ_KEY</span>
                  <Badge color="green" className="bg-emerald-500/20 text-emerald-400 border-none">Active</Badge>
                </div>
              </div>
              <Button fullWidth className="bg-indigo-600 hover:bg-indigo-700 text-white border-transparent font-bold">
                Generate Scoped Key
              </Button>
            </Card>

            <Card className="p-6 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-800">Compliance</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 font-medium">
                Foundry is monitoring 12 employment contracts for vesting and cliff compliance.
              </p>
              <Badge color="emerald">All Clear</Badge>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
};
