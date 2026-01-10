import React, { useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, AIInsightBox } from '../components/UI';
import { ChevronRight, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';
import { FounderService, Founder } from '../services/FounderService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize DB with defaults if needed, then fetch
    FounderService.init();
    const loadData = async () => {
      const data = await FounderService.getFounders();
      setFounders(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600"/></div>;
  }

  const hasIncomplete = founders.some(f => f.status === 'Incomplete');

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Founders & Accountability</h2>
          <p className="text-slate-500 text-sm">Add everyone who will hold equity in the company.</p>
        </div>
        <Button onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>+ Add Founder</Button>
      </div>

      {/* Incomplete Info Warning */}
      {hasIncomplete && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
           <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
           <div>
             <h4 className="font-bold text-amber-800 text-sm">Missing Information</h4>
             <p className="text-sm text-amber-700">You must complete all founder profiles to generate your Equity Agreement.</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {founders.map((founder, index) => (
          <Card 
            key={founder.id}
            className={`hover:border-indigo-300 transition-colors cursor-pointer ${founder.status === 'Incomplete' ? 'border-red-200 bg-red-50/10' : ''}`} 
            onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}
          >
            {founder.status === 'Incomplete' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
            )}
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl relative 
                  ${founder.status === 'Incomplete' ? 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300' : 'bg-indigo-100 text-indigo-700'}`}>
                  {founder.name.charAt(0)}
                  {founder.status === 'Complete' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{founder.name}</h3>
                  <p className="text-sm text-slate-500">
                    {founder.role || 'No Role'} • {founder.hoursPerWeek}h/week
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                   <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
                   {founder.status === 'Complete' && <Badge color="green">Complete</Badge>}
                   {founder.status === 'Risk' && <Badge color="amber">Risk Detected</Badge>}
                   {founder.status === 'Incomplete' && <span className="text-xs font-bold text-red-500 border border-red-200 bg-red-50 px-2 py-1 rounded">Action Required</span>}
                </div>
                <ChevronRight className="text-slate-300" />
              </div>
            </div>

            {founder.status === 'Risk' && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 items-center text-sm text-slate-600">
                 <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0"/>
                 <span>Low time commitment vs high equity demand.</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t flex justify-end">
        <Button onClick={() => onNavigate(ScreenId.INITIAL_READINESS)} className="w-full sm:w-auto">
           Continue to Alignment Check
        </Button>
      </div>
    </div>
  );
};
