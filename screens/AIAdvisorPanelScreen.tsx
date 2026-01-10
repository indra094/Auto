import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

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