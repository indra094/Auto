import React, { useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Loader2 } from 'lucide-react';
import { TeamService, Employee } from '../services/TeamService';
import { FounderService, Founder } from '../services/FounderService';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const TeamEmployeesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [founders, setFounders] = useState<Founder[]>([]);
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
        setFounders(fData);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team & Employees</h2>
        <Button onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Cancel' : '+ Add Employee'}</Button>
      </div>

      {showAdd && (
        <Card className="mb-6 p-4 bg-slate-50 border-indigo-100">
          <h3 className="text-sm font-bold mb-2">Add New Team Member</h3>
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="border p-2 rounded flex-1"
            />
            <Button onClick={handleAdd} disabled={!newName}>Save</Button>
          </div>
        </Card>
      )}

      {loading ? <Loader2 className="animate-spin" /> : (
        <>
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Founders</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {founders.map(f => (
                <div key={f.id} className="bg-white border p-4 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    {f.name.charAt(0)}
                  </div>
                  <div><div className="font-bold">{f.name}</div><div className="text-xs text-slate-500">{f.role}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Employees & AI Agents</h3>
            <div className="space-y-3">
              {employees.map(emp => (
                <Card
                  key={emp.id}
                  className={`flex justify-between items-center ${emp.status === 'Paused' ? 'opacity-75' : 'hover:bg-slate-50 cursor-pointer'}`}
                  onClick={() => emp.type === 'AI' ? onNavigate(ScreenId.AI_EMPLOYEE_DETAIL) : null}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl
                        ${emp.type === 'AI' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-500'}
                     `}>
                      {emp.type === 'AI' ? '🤖' : '👤'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{emp.name} <span className="text-xs font-normal text-slate-500">({emp.role})</span></h4>
                      <p className="text-xs text-slate-500">{emp.status}</p>
                    </div>
                  </div>
                  {emp.type === 'AI' && <ChevronRight className="text-slate-300" />}
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
