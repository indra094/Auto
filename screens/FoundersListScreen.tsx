import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, AIInsightBox } from '../components/UI';
import { ChevronRight, AlertTriangle } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-slate-900">Founders & Accountability</h2>
      <Button onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>+ Add Founder</Button>
    </div>

    <AIInsightBox type="critical" title="System Warning">
      Two founders have marked themselves as "CEO". This role overlap creates immediate accountability risk.
    </AIInsightBox>

    <div className="grid grid-cols-1 gap-4">
      {/* Founder A */}
      <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">A</div>
            <div>
              <h3 className="text-lg font-bold">Alex (You)</h3>
              <p className="text-sm text-slate-500">CEO • 60h/week</p>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
               <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
               <Badge color="green">Aligned</Badge>
            </div>
            <ChevronRight className="text-slate-300" />
          </div>
        </div>
      </Card>

      {/* Founder B */}
      <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">J</div>
            <div>
              <h3 className="text-lg font-bold">Jamie</h3>
              <p className="text-sm text-slate-500">CTO • 25h/week</p>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
               <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
               <Badge color="amber">Risk</Badge>
            </div>
            <ChevronRight className="text-slate-300" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 items-center text-sm text-slate-600">
           <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0"/>
           <span>Low time commitment (25h) conflicts with high equity demand (48%).</span>
        </div>
      </Card>
    </div>
  </div>
);