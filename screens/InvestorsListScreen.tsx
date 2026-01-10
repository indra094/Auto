import React from 'react';
import { ScreenId } from '../types';
import { Button, Badge } from '../components/UI';
import { ChevronRight } from 'lucide-react';

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