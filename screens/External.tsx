import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Zap } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const InvestorsListScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Investor CRM</h2>
    <div className="flex gap-4 mb-4 flex-wrap">
      <input placeholder="Search investors..." className="border p-2 rounded w-full sm:w-64" />
      <select className="border p-2 rounded w-full sm:w-auto"><option>All Stages</option></select>
    </div>
    <div className="bg-white border rounded-lg overflow-hidden overflow-x-auto">
      <table className="w-full text-sm text-left min-w-[600px]">
        <thead className="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Stage</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => onNavigate(ScreenId.INVESTOR_DETAIL)}>
            <td className="p-3 font-medium">Sequoia Capital</td>
            <td className="p-3">VC</td>
            <td className="p-3">Seed - IPO</td>
            <td className="p-3"><Badge color="slate">To Contact</Badge></td>
            <td className="p-3 text-right"><ChevronRight className="w-4 h-4 inline"/></td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer">
            <td className="p-3 font-medium">Y Combinator</td>
            <td className="p-3">Accelerator</td>
            <td className="p-3">Pre-seed</td>
            <td className="p-3"><Badge color="blue">Applied</Badge></td>
            <td className="p-3 text-right"><ChevronRight className="w-4 h-4 inline"/></td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer">
            <td className="p-3 font-medium">Jason Calacanis</td>
            <td className="p-3">Angel</td>
            <td className="p-3">Seed</td>
            <td className="p-3"><Badge color="green">Meeting Set</Badge></td>
            <td className="p-3 text-right"><ChevronRight className="w-4 h-4 inline"/></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const InvestorDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500" onClick={() => onNavigate(ScreenId.INVESTORS_LIST)}>
      <ChevronRight className="rotate-180 w-4 h-4"/> Back
    </div>
    <Card>
      <div className="flex justify-between items-start mb-6">
         <div>
           <h1 className="text-3xl font-bold">Sequoia Capital</h1>
           <div className="flex gap-2 mt-2">
             <Badge>VC Firm</Badge>
             <Badge>Tier 1</Badge>
           </div>
         </div>
         <Button>Log Interaction</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="col-span-1 lg:col-span-2 space-y-6">
           <div>
             <h3 className="font-bold border-b pb-2 mb-2">Notes</h3>
             <textarea className="w-full border rounded p-2 h-32" placeholder="Add private notes..."></textarea>
           </div>
           <div>
             <h3 className="font-bold border-b pb-2 mb-2">History</h3>
             <div className="text-sm text-slate-500">No interactions yet.</div>
           </div>
         </div>
         <div className="col-span-1 bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-indigo-800 mb-3">
              <Zap className="w-4 h-4" /> AI Prep
            </div>
            <p className="text-sm text-indigo-900 mb-3">
              They recently published a thesis on "Vertical AI". Emphasize your proprietary data moat.
            </p>
            <div className="space-y-2">
               <div className="bg-white p-2 text-xs rounded shadow-sm">
                 ❓ Likely Q: "Why doesn't ChatGPT kill this?"
               </div>
               <div className="bg-white p-2 text-xs rounded shadow-sm">
                 ❓ Likely Q: "What's your distribution advantage?"
               </div>
            </div>
         </div>
      </div>
    </Card>
  </div>
);

export const CustomersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Customer Discovery</h2>
    <div className="flex gap-4 mb-4">
      <Button onClick={() => onNavigate(ScreenId.CUSTOMER_DETAIL)}>+ Add Prospect</Button>
    </div>
    <div className="bg-white border rounded-lg overflow-hidden overflow-x-auto">
      <table className="w-full text-sm text-left min-w-[600px]">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-3">Company / Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Signal</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t cursor-pointer hover:bg-slate-50" onClick={() => onNavigate(ScreenId.CUSTOMER_DETAIL)}>
            <td className="p-3 font-medium">Acme Corp</td>
            <td className="p-3">VP Engineering</td>
            <td className="p-3"><Badge color="green">Interviewed</Badge></td>
            <td className="p-3">⭐⭐⭐⭐</td>
            <td className="p-3"><ChevronRight className="w-4 h-4"/></td>
          </tr>
          <tr className="border-t cursor-pointer hover:bg-slate-50">
            <td className="p-3 font-medium">Beta Inc</td>
            <td className="p-3">CTO</td>
            <td className="p-3"><Badge color="slate">Outreach</Badge></td>
            <td className="p-3">⭐⭐</td>
            <td className="p-3"><ChevronRight className="w-4 h-4"/></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const CustomerDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-4xl mx-auto">
     <div className="flex justify-between mb-6">
       <div>
         <h2 className="text-2xl font-bold">Acme Corp (Jane Doe)</h2>
         <p className="text-slate-500">VP Engineering • SaaS B2B</p>
       </div>
       <Badge color="green">Interview Complete</Badge>
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="col-span-1 lg:col-span-2 space-y-4">
          <Card title="Interview Notes">
            <div className="p-3 bg-slate-50 rounded text-sm text-slate-700 min-h-[100px]">
              They are struggling with managing equity across 3 geographies. Current excel sheets are breaking.
            </div>
          </Card>
          <Card title="Key Signals">
             <div className="flex gap-2">
               <Badge color="green">Pain Point Verified</Badge>
               <Badge color="green">Budget Available</Badge>
             </div>
          </Card>
       </div>
       <div className="col-span-1 bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="font-bold text-purple-900 mb-2 flex gap-2 items-center"><Zap className="w-4 h-4"/> AI Insight</div>
          <p className="text-sm text-purple-800 mb-2">
            Contradiction detected: They mentioned "no budget" initially but later said they pay $50k for legal.
          </p>
       </div>
     </div>
  </div>
);
