import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { User, Briefcase, Clock, Target, Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FounderProfileScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState('You');
  const [role, setRole] = useState('Founder');
  const [commitment, setCommitment] = useState('Full-time');
  const [expectations, setExpectations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    await new Promise(r => setTimeout(r, 500));
    setIsLoading(false);
    onNavigate(ScreenId.ALIGNMENT_OVERVIEW);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <header className="mb-10 flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
          {name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Founder Profile</h1>
          <p className="text-slate-500 font-medium">Define your role and commitment.</p>
        </div>
      </header>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Name</label>
          <div className="relative">
            <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Role</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Time Commitment</label>
          <div className="grid grid-cols-2 gap-3">
            {['Full-time', 'Part-time', 'Advisor', 'Investor'].map(c => (
              <button
                key={c}
                onClick={() => setCommitment(c)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all ${commitment === c
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-100'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Expectations / Vision</label>
          <textarea
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
            placeholder="What do you expect from this venture? 100x return? Lifestyle business? World change?"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />
        </div>

        <div className="pt-6">
          <Button
            fullWidth
            className="h-16 text-xl rounded-2xl flex items-center justify-center gap-3 font-black"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>Save Profile <ArrowRight className="w-6 h-6" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
