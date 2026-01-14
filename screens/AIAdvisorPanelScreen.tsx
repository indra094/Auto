import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { PlayCircle, PauseCircle, Users, Mail, Settings, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AIAdvisorPanelScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">AI Outreach Agent</h2>
          <p className="text-slate-500 font-medium">Automated customer discovery and lead generation.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Edit Script
          </Button>
          <Button variant="danger" className="flex items-center gap-2">
            <PauseCircle className="w-4 h-4" /> Pause Agent
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 bg-white border-2 border-slate-50 shadow-sm text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target</div>
          <div className="text-lg font-bold text-slate-800">Series A Fintechs</div>
        </Card>
        <Card className="p-6 bg-white border-2 border-slate-50 shadow-sm text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</div>
          <Badge color="green" className="font-black">ACTIVE</Badge>
        </Card>
        <Card className="p-6 bg-white border-2 border-slate-50 shadow-sm text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Leads Found</div>
          <div className="text-3xl font-black text-indigo-600">124</div>
        </Card>
      </div>

      <Card className="p-8 bg-white text-slate-900 border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 p-8 opacity-5 text-indigo-600">
          <Mail className="w-48 h-48" />
        </div>
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4 relative z-10">
          {[
            { label: "Email sent to CTO of Plaid", time: "2m ago" },
            { label: "Meeting booked with VP at Stripe", time: "45m ago", highlight: true },
            { label: "12 new leads scraped from LinkedIn", time: "2h ago" }
          ].map((act, i) => (
            <div key={i} className={`flex justify-between items-center p-3 rounded-xl ${act.highlight ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50'}`}>
              <span className={`text-sm ${act.highlight ? 'font-bold text-indigo-900' : 'text-slate-600'}`}>{act.label}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</span>
            </div>
          ))}
        </div>
        <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full" onClick={() => onNavigate(ScreenId.CUSTOMERS_LIST)}>
          Review All Customer Data <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </div>
  );
};