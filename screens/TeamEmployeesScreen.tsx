import React from 'react';
import { ScreenId } from '../types';
import { Button, Card } from '../components/UI';
import { ChevronRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

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