import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { AlertCircle, Target, Layers, Loader2 } from 'lucide-react';
import { AuthService } from '../services/AuthService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const StartupBasicsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [industry, setIndustry] = useState('');
  const [stage, setStage] = useState('');
  const [errors, setErrors] = useState<{type?: boolean, industry?: boolean, stage?: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill
  useEffect(() => {
    const ws = AuthService.getWorkspace();
    if (ws?.type) setSelectedType(ws.type);
    if (ws?.industry) setIndustry(ws.industry);
    if (ws?.stage) setStage(ws.stage);
  }, []);

  const handleNext = async () => {
    const newErrors: {type?: boolean, industry?: boolean, stage?: boolean} = {};
    if (!selectedType) newErrors.type = true;
    if (!industry.trim()) newErrors.industry = true;
    if (!stage) newErrors.stage = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await AuthService.updateWorkspace({ 
        type: selectedType!, 
        industry, 
        stage,
        onboardingStep: 3
      });
      setIsLoading(false);
      onNavigate(ScreenId.FOUNDERS_LIST);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">What are you building?</h2>
        <p className="text-slate-500 mt-2">This helps our AI benchmark your equity and runway.</p>
      </div>
      
      <div className="space-y-8">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Business Model <span className="text-red-500">*</span>
          </label>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 p-1 rounded-xl transition-all ${errors.type ? 'ring-2 ring-red-100 bg-red-50/50' : ''}`}>
            {['SaaS', 'Marketplace', 'Consumer App', 'Hard Tech', 'Service', 'Other'].map((type) => (
              <button 
                key={type} 
                onClick={() => {
                  setSelectedType(type);
                  if(errors.type) setErrors({...errors, type: false});
                }}
                className={`p-4 border rounded-xl transition-all font-medium text-sm shadow-sm flex flex-col items-center justify-center gap-2 h-24
                  ${selectedType === type 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'}`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.type && <p className="text-xs text-red-500 mt-2 flex items-center gap-1 justify-center"><AlertCircle className="w-3 h-3"/> Please select a business model</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Industry Input */}
          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-1">
               Industry / Vertical <span className="text-red-500">*</span>
             </label>
             <div className="relative">
               <div className="absolute left-3 top-3 text-slate-400"><Target className="w-4 h-4"/></div>
               <input 
                 className={`w-full pl-9 pr-4 py-2.5 border rounded-lg outline-none focus:ring-2 ${errors.industry ? 'border-red-300 bg-red-50' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'}`} 
                 placeholder="e.g. Fintech, BioTech" 
                 value={industry}
                 onChange={(e) => {
                   setIndustry(e.target.value);
                   if(errors.industry) setErrors({...errors, industry: false});
                 }}
               />
             </div>
             {errors.industry && <p className="text-xs text-red-500 mt-1">Required</p>}
          </div>

          {/* Stage Dropdown */}
          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-1">
               Current Stage <span className="text-red-500">*</span>
             </label>
             <div className="relative">
               <div className="absolute left-3 top-3 text-slate-400"><Layers className="w-4 h-4"/></div>
               <select 
                 className={`w-full pl-9 pr-4 py-2.5 border rounded-lg outline-none focus:ring-2 bg-white ${errors.stage ? 'border-red-300 bg-red-50' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'}`}
                 value={stage}
                 onChange={(e) => {
                   setStage(e.target.value);
                   if(errors.stage) setErrors({...errors, stage: false});
                 }}
               >
                 <option value="">Select Stage...</option>
                 <option value="Idea">Idea / Exploration</option>
                 <option value="Pre-incorporation">Pre-incorporation</option>
                 <option value="Bootstrapping">Bootstrapping</option>
                 <option value="Pre-seed">Pre-seed</option>
                 <option value="Seed">Seed</option>
               </select>
             </div>
             {errors.stage && <p className="text-xs text-red-500 mt-1">Required</p>}
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-slate-100">
          <Button onClick={handleNext} className="w-full md:w-auto px-8" disabled={isLoading}>
             {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Next: Add Founders'}
          </Button>
        </div>
      </div>
    </div>
  );
};
