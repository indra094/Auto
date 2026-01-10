import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InitialReadinessScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-4xl mx-auto mt-8 px-6">
     <div className="text-center mb-8">
       <h2 className="text-3xl font-bold text-slate-900">Onboarding Summary</h2>
       <p className="text-slate-500">Review your profile before generating your first alignment score.</p>
     </div>

     <div className="grid md:grid-cols-3 gap-6">
        
        {/* Main Score Card */}
        <Card className="md:col-span-2 p-8 text-center flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <AlertTriangle className="w-32 h-32" />
          </div>
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="none" />
              <circle cx="80" cy="80" r="70" stroke="#f59e0b" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="220" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">50%</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Readiness</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Almost Ready</h3>
          <p className="text-slate-600 mb-6 max-w-sm mx-auto">
            You have provided the basics, but critical details are missing to form a legal-grade alignment.
          </p>
          <Button fullWidth className="h-12 text-lg max-w-sm" onClick={() => onNavigate(ScreenId.COMPANY_DASHBOARD)}>
            Go to Dashboard
          </Button>
        </Card>

        {/* Missing Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
             <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4 border-b pb-2">Action Items</h4>
             <ul className="space-y-3">
               <li className="flex items-start gap-2 text-sm text-slate-600">
                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                 <span className="line-through decoration-slate-400 text-slate-400">Company Basics</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-slate-600">
                 <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                 <span className="line-through decoration-slate-400 text-slate-400">Founder A Profile</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-amber-700 font-medium">
                 <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                 <span>Complete Founder B (Jamie) details</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-red-700 font-medium">
                 <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                 <span>Finish New Founder setup</span>
               </li>
             </ul>
             <div className="mt-4 pt-3 border-t">
               <button onClick={() => onNavigate(ScreenId.FOUNDERS_LIST)} className="text-indigo-600 text-sm font-medium flex items-center hover:underline">
                 Fix Issues <ArrowRight className="w-3 h-3 ml-1" />
               </button>
             </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5">
            <h4 className="font-bold text-indigo-900 text-sm mb-2">🤖 AI Assistant</h4>
            <p className="text-xs text-indigo-800 leading-relaxed">
              "Based on your 'Fintech' industry selection, I recommend ensuring all founders have specific 'Regulatory Risk' clauses in their profiles."
            </p>
          </div>
        </div>
     </div>
  </div>
);