import React from 'react';
import { ScreenId } from '../types';
import { Button, Badge } from '../components/UI';
import { ChevronRight } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

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