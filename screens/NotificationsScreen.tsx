import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { Bell } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const NotificationsScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-lg mx-auto">
     <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Bell className="w-5 h-5"/> Notifications / Signals</h2>
     <div className="space-y-4">
       <Card className="border-l-4 border-l-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-slate-900">Alignment Score Dropped</h4>
              <p className="text-sm text-slate-600 mt-1">Founders disagreed on 2 key exit questions.</p>
            </div>
            <span className="text-xs text-slate-400">2m ago</span>
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="secondary" className="text-xs h-8 px-2">View Details</Button>
            <Button variant="ghost" className="text-xs h-8 px-2">Dismiss</Button>
          </div>
       </Card>
     </div>
  </div>
);