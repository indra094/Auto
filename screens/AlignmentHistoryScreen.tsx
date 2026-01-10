import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { AlertTriangle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AlignmentHistoryScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Version History</h2>
    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
      {[
        { date: 'Today, 10:30 AM', score: 78, warning: 'Time commitment mismatch', current: true },
        { date: 'Jan 8, 2026', score: 65, warning: 'Exit timing misalignment', current: false },
        { date: 'Jan 1, 2026', score: 40, warning: 'Initial Draft', current: false }
      ].map((item, i) => (
        <div key={i} className="pl-8 relative">
          <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${item.current ? 'bg-indigo-600 ring-2 ring-indigo-100' : 'bg-slate-300'}`}></div>
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800">{item.date}</span>
              <Badge color={item.score > 70 ? 'green' : 'amber'}>Score: {item.score}%</Badge>
            </div>
            {item.warning && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <AlertTriangle className="w-4 h-4" /> {item.warning}
              </div>
            )}
            <div className="mt-3">
              <Button variant="ghost" className="px-0 text-indigo-600 text-xs">Compare Version</Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </div>
);