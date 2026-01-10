import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InitialReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-2xl mx-auto mt-8">
     <Card className="p-8 text-center">
       <div className="mb-6 flex justify-center">
         <div className="relative w-32 h-32">
           <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
           <div className="absolute inset-0 rounded-full border-8 border-amber-400 border-t-transparent animate-spin-slow" style={{ transform: 'rotate(45deg)' }}></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-slate-800">50%</span>
           </div>
         </div>
       </div>
       <Button fullWidth className="h-12 text-lg" onClick={() => onNavigate(ScreenId.FOUNDERS_LIST)}>
         Proceed to Founder Alignment
       </Button>
     </Card>
  </div>
);