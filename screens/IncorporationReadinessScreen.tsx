import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { AlertTriangle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const IncorporationReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-xl mx-auto mt-12">
    <Card className="text-center p-8 border-t-4 border-t-amber-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Incorporation Gate</h2>
      <div className="text-4xl font-bold text-amber-500 my-4">63% Ready</div>
      
      <div className="text-left bg-slate-50 p-4 rounded mb-6 space-y-3">
        <h4 className="font-bold text-slate-700 text-sm uppercase">Why wait?</h4>
        <div className="flex gap-3 items-start">
           <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0"/>
           <span className="text-sm">Founders agreement not signed.</span>
        </div>
        <div className="flex gap-3 items-start">
           <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0"/>
           <span className="text-sm">Insufficient customer validation (0/10 interviews).</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button fullWidth variant="primary">Help Me Get Ready</Button>
        <Button fullWidth variant="ghost" className="text-slate-500 hover:text-red-600" onClick={() => onNavigate(ScreenId.PROCEED_ANYWAY)}>
          Proceed Anyway (Not Recommended)
        </Button>
      </div>
    </Card>
  </div>
);