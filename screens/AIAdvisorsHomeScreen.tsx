import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const AIAdvisorsHomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">AI Advisors & Agents</h2>
    <div className="grid md:grid-cols-3 gap-6">
      <Card title="Customer Research" action={<Badge color="green">Active</Badge>}>
        <div className="h-20 bg-indigo-50 rounded-md mb-4 flex items-center justify-center text-4xl">🕵️‍♂️</div>
        <p className="text-sm text-slate-600 mb-4">Conducts interviews, analyzes transcripts, and finds patterns in feedback.</p>
        <Button fullWidth onClick={() => onNavigate(ScreenId.AI_ADVISOR_PANEL)}>Open Workbench</Button>
      </Card>
      <Card title="Investor Prep" action={<Badge color="amber">Learning</Badge>}>
        <div className="h-20 bg-emerald-50 rounded-md mb-4 flex items-center justify-center text-4xl">🦈</div>
        <p className="text-sm text-slate-600 mb-4">Simulates VC questions and helps refine your pitch deck narrative.</p>
        <Button fullWidth variant="secondary">Train Model</Button>
      </Card>
      <Card title="Legal Compliance" action={<Badge color="slate">Idle</Badge>}>
        <div className="h-20 bg-slate-100 rounded-md mb-4 flex items-center justify-center text-4xl">⚖️</div>
        <p className="text-sm text-slate-600 mb-4">Monitors IP assignment and prepares basic incorporation docs.</p>
        <Button fullWidth variant="secondary">Activate</Button>
      </Card>
    </div>
  </div>
);