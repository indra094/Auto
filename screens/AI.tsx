import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, ArrowRight } from 'lucide-react';

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

export const AIAdvisorPanelScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="flex h-full">
    {/* Sidebar Context */}
    <div className="w-80 border-r border-slate-200 bg-white p-4 hidden md:flex flex-col">
      <h3 className="font-bold text-sm uppercase text-slate-500 mb-4">Context & Sources</h3>
      <div className="space-y-3 overflow-y-auto flex-1">
         <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs">
           <div className="font-medium text-slate-800">Transcript #42</div>
           <div className="text-slate-500 truncate">"Pricing is too high for the..."</div>
         </div>
         <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs">
           <div className="font-medium text-slate-800">Competitor Analysis</div>
           <div className="text-slate-500 truncate">Q1 2026 Report PDF</div>
         </div>
      </div>
    </div>
    
    {/* Chat Area */}
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
         <h2 className="font-bold text-slate-800 flex items-center gap-2">🕵️‍♂️ Customer Research Agent</h2>
         <Button variant="secondary" className="text-xs">Export Report</Button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
         <div className="flex gap-4">
           <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">AI</div>
           <div className="bg-white p-4 rounded-r-xl rounded-bl-xl shadow-sm border border-slate-100 max-w-2xl">
             <p className="text-slate-800">I've analyzed the last 5 transcripts. A recurring pattern is that users love the "Scenario Simulator" but find the "Legal" section confusing.</p>
             <div className="mt-3 flex gap-2">
               <Badge color="blue">Product Feedback</Badge>
               <Badge color="red">UX Issue</Badge>
             </div>
           </div>
         </div>
         <div className="flex gap-4 flex-row-reverse">
           <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white text-xs">ME</div>
           <div className="bg-indigo-600 text-white p-4 rounded-l-xl rounded-br-xl shadow-sm max-w-2xl">
             <p>What specific words do they use to describe the confusion?</p>
           </div>
         </div>
         <div className="flex gap-4">
           <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">AI</div>
           <div className="bg-white p-4 rounded-r-xl rounded-bl-xl shadow-sm border border-slate-100 max-w-2xl">
             <div className="flex gap-2 mb-2">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
               <span className="text-xs text-slate-400">Thinking...</span>
             </div>
           </div>
         </div>
      </div>

      <div className="p-4 bg-white border-t">
         <div className="relative">
           <input className="w-full border border-slate-300 rounded-lg pl-4 pr-12 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ask your advisor..." />
           <button className="absolute right-2 top-2 p-1 text-indigo-600 hover:bg-indigo-50 rounded"><ArrowRight/></button>
         </div>
      </div>
    </div>
  </div>
);

export const TeamEmployeesScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
       <h2 className="text-2xl font-bold">Team & Employees</h2>
       <Button onClick={() => onNavigate(ScreenId.AI_EMPLOYEE_DETAIL)}>+ Add Employee</Button>
    </div>
    
    <div className="mb-8">
      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Founders</h3>
      <div className="grid md:grid-cols-2 gap-4">
         <div className="bg-white border p-4 rounded-lg flex items-center gap-3">
           <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">A</div>
           <div><div className="font-bold">Alex</div><div className="text-xs text-slate-500">CEO</div></div>
         </div>
         <div className="bg-white border p-4 rounded-lg flex items-center gap-3">
           <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">J</div>
           <div><div className="font-bold">Jamie</div><div className="text-xs text-slate-500">CTO</div></div>
         </div>
      </div>
    </div>

    <div>
      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">AI Employees</h3>
      <div className="space-y-3">
        <Card className="flex justify-between items-center hover:bg-slate-50 cursor-pointer" onClick={() => onNavigate(ScreenId.AI_EMPLOYEE_DETAIL)}>
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">🤖</div>
             <div>
               <h4 className="font-bold text-slate-800">Sarah (Market Research)</h4>
               <p className="text-xs text-slate-500">Active • Last output 2h ago</p>
             </div>
           </div>
           <ChevronRight className="text-slate-300"/>
        </Card>
        <Card className="flex justify-between items-center opacity-75">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xl">🤖</div>
             <div>
               <h4 className="font-bold text-slate-800">Devin (QA Tester)</h4>
               <p className="text-xs text-slate-500">Paused</p>
             </div>
           </div>
           <Button variant="ghost" className="text-xs">Resume</Button>
        </Card>
      </div>
    </div>
  </div>
);

export const AIEmployeeDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">🤖</div>
      <div>
        <h2 className="text-2xl font-bold">Sarah</h2>
        <p className="text-slate-500">Role: Customer Research Analyst</p>
      </div>
    </div>

    <div className="flex border-b border-slate-200 mb-6">
      <button className="px-4 py-2 border-b-2 border-indigo-600 text-indigo-600 font-medium">Work Feed</button>
      <button className="px-4 py-2 text-slate-500 hover:text-slate-800">Goals</button>
      <button className="px-4 py-2 text-slate-500 hover:text-slate-800">Permissions</button>
    </div>

    <div className="space-y-4 max-w-3xl">
      <Card title="Today's Output">
         <div className="p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded-r mb-3">
           <h4 className="font-bold text-indigo-900 text-sm">Summary of Interview #45</h4>
           <p className="text-sm text-indigo-800 mt-1">Found 3 contradictions in the user's pricing feedback vs their usage data.</p>
         </div>
         <div className="p-3 bg-white border border-slate-200 rounded mb-3">
           <h4 className="font-bold text-slate-800 text-sm">Drafted Follow-up Email</h4>
           <p className="text-sm text-slate-500 mt-1">Ready for review. Targeted at churning users.</p>
           <div className="mt-2 flex gap-2">
             <Button variant="secondary" className="h-7 text-xs px-2">Review</Button>
           </div>
         </div>
      </Card>
      <Button fullWidth variant="ghost" className="text-slate-400">View older activities</Button>
    </div>
  </div>
);
