import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, ProgressBar } from '../components/UI';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const CompanyDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Badge color="slate">Pre-incorporation</Badge>
    </div>

    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Card className="md:col-span-1 border-t-4 border-t-amber-500">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Overall Risk</div>
        <div className="text-2xl font-bold text-amber-600">Medium</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Burn Rate</div>
        <div className="text-2xl font-bold text-slate-800">$0/mo</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Runway</div>
        <div className="text-2xl font-bold text-slate-800">∞</div>
      </Card>
      <Card className="md:col-span-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-1">Team</div>
        <div className="text-2xl font-bold text-slate-800">2 + 1 AI</div>
      </Card>
    </div>

    <h3 className="text-lg font-bold mb-4">This Week's Focus</h3>
    <div className="grid md:grid-cols-3 gap-6">
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Founder Alignment</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <ProgressBar value={78} color="bg-amber-500" />
          <p className="text-xs text-slate-500 mt-2">78% Aligned - Needs attention</p>
       </Card>
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.INCORPORATION_READINESS)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Incorporation</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <ProgressBar value={50} color="bg-indigo-500" />
          <p className="text-xs text-slate-500 mt-2">Decision pending validation</p>
       </Card>
       <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.CUSTOMERS_LIST)}>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-800">Market Validation</span>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <ProgressBar value={10} color="bg-slate-300" />
          <p className="text-xs text-slate-500 mt-2">0/10 Interviews conducted</p>
       </Card>
    </div>
  </div>
);

export const RelevantConnectionsScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
     <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Relevant Connections</h2>
        <div className="bg-slate-100 p-1 rounded-lg flex text-sm">
          <button className="px-3 py-1 bg-white shadow-sm rounded-md font-medium text-slate-800">Investors</button>
          <button className="px-3 py-1 text-slate-500">Customers</button>
          <button className="px-3 py-1 text-slate-500">Talent</button>
        </div>
     </div>

     <div className="space-y-4">
       <Card>
         <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0"></div>
           <div className="flex-1">
             <div className="flex justify-between">
               <h3 className="font-bold text-lg">John VC <span className="text-sm font-normal text-slate-500">@ Sequoia</span></h3>
               <Badge color="green">Warm Intro Available</Badge>
             </div>
             <p className="text-sm text-slate-600 mt-1">Matches your stage (Pre-seed) and sector (SaaS).</p>
             <div className="mt-3 bg-indigo-50 p-2 rounded text-xs text-indigo-800 inline-block">
               ✨ Why now: He just invested in a similar API tooling company.
             </div>
             <div className="mt-4 flex gap-3">
               <Button className="h-8 text-xs">Prep Intro Note</Button>
               <Button variant="secondary" className="h-8 text-xs">View Profile</Button>
             </div>
           </div>
         </div>
       </Card>
       <Card>
         <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0"></div>
           <div className="flex-1">
             <div className="flex justify-between">
               <h3 className="font-bold text-lg">Sarah Angel <span className="text-sm font-normal text-slate-500">@ AngelList</span></h3>
             </div>
             <p className="text-sm text-slate-600 mt-1">Former operator in your space.</p>
             <div className="mt-4 flex gap-3">
               <Button className="h-8 text-xs">Prep Intro Note</Button>
               <Button variant="secondary" className="h-8 text-xs">View Profile</Button>
             </div>
           </div>
         </div>
       </Card>
     </div>
  </div>
);

export const StagesCapitalScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
     <h2 className="text-2xl font-bold mb-6">Stages & Capital Map</h2>
     <div className="max-w-3xl mx-auto relative pl-8 border-l-2 border-slate-200 space-y-12 my-8">
       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✔</div>
         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 opacity-60">
           <h3 className="font-bold text-slate-700">Stage 1: Idea</h3>
           <p className="text-sm text-slate-500">$0 - $10k • Self-funded</p>
         </div>
       </div>
       
       <div className="relative">
         <div className="absolute -left-[43px] top-0 w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-4 ring-indigo-100">2</div>
         <Card className="border-indigo-500 shadow-md">
           <h3 className="font-bold text-indigo-700">Stage 2: Pre-incorporation (Current)</h3>
           <p className="text-sm text-slate-500 mb-2">$5k - $25k • Friends & Family / Grants</p>
           <ul className="text-sm space-y-1 text-slate-700">
             <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500"/> Validate Problem</li>
             <li className="flex gap-2"><Clock className="w-4 h-4 text-slate-400"/> Legal Formation</li>
             <li className="flex gap-2"><Clock className="w-4 h-4 text-slate-400"/> First 10 Customer Interviews</li>
           </ul>
         </Card>
       </div>

       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">3</div>
         <div className="bg-white p-4 rounded-lg border border-slate-200 border-dashed">
           <h3 className="font-bold text-slate-700">Stage 3: Early Build</h3>
           <p className="text-sm text-slate-500">$25k - $150k • Angel / Pre-seed</p>
         </div>
       </div>

       <div className="relative">
         <div className="absolute -left-[41px] top-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">4</div>
         <div className="bg-white p-4 rounded-lg border border-slate-200 border-dashed">
           <h3 className="font-bold text-slate-700">Stage 4: Early Traction</h3>
           <p className="text-sm text-slate-500">$150k - $500k</p>
         </div>
       </div>
     </div>
  </div>
);
