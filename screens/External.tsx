import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { ChevronRight, Zap, Loader2, Plus } from 'lucide-react';
import { ExternalService, Investor, Customer } from '../services/ExternalService';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

// --- INVESTORS LIST ---
export const InvestorsListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newInvestorName, setNewInvestorName] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await ExternalService.getInvestors();
      setInvestors(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!newInvestorName) return;
    setLoading(true);
    await ExternalService.addInvestor({
      name: newInvestorName,
      type: 'Angel', // Default for now
      stage: 'Seed',
      status: 'To Contact',
      notes: ''
    });
    const data = await ExternalService.getInvestors();
    setInvestors(data);
    setLoading(false);
    setShowAdd(false);
    setNewInvestorName('');
  };

  const openDetail = (id: string) => {
    ExternalService.setSelectedInvestorId(id);
    onNavigate(ScreenId.INVESTOR_DETAIL);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investor CRM</h2>
        <Button onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Cancel' : '+ Add Investor'}</Button>
      </div>

      {showAdd && (
        <Card className="mb-6 p-4 bg-slate-50 border-indigo-100">
          <h3 className="text-sm font-bold mb-2">Add New Investor</h3>
          <div className="flex gap-2">
            <input 
              value={newInvestorName}
              onChange={(e) => setNewInvestorName(e.target.value)}
              placeholder="Investor Name" 
              className="border p-2 rounded flex-1" 
            />
            <Button onClick={handleAdd} disabled={!newInvestorName}>Save</Button>
          </div>
        </Card>
      )}

      <div className="flex gap-4 mb-4 flex-wrap">
        <input placeholder="Search investors..." className="border p-2 rounded w-full sm:w-64" />
        <select className="border p-2 rounded w-full sm:w-auto"><option>All Stages</option></select>
      </div>

      {loading ? <Loader2 className="animate-spin" /> : (
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
              {investors.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => openDetail(inv.id)}>
                  <td className="p-3 font-medium">{inv.name}</td>
                  <td className="p-3">{inv.type}</td>
                  <td className="p-3">{inv.stage}</td>
                  <td className="p-3">
                    <Badge color={inv.status === 'Applied' ? 'blue' : inv.status === 'Meeting Set' ? 'green' : 'slate'}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right"><ChevronRight className="w-4 h-4 inline"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- INVESTOR DETAIL ---
export const InvestorDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const id = ExternalService.getSelectedInvestorId();
      if (id) {
        const data = await ExternalService.getInvestorById(id);
        if (data) {
          setInvestor(data);
          setNotes(data.notes || '');
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSaveNotes = async () => {
    if (investor) {
      await ExternalService.updateInvestor(investor.id, { notes });
    }
  };

  if (loading) return <div className="p-6"><Loader2 className="animate-spin"/></div>;
  if (!investor) return <div className="p-6">Investor not found.</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500" onClick={() => onNavigate(ScreenId.INVESTORS_LIST)}>
        <ChevronRight className="rotate-180 w-4 h-4"/> Back
      </div>
      <Card>
        <div className="flex justify-between items-start mb-6">
           <div>
             <h1 className="text-3xl font-bold">{investor.name}</h1>
             <div className="flex gap-2 mt-2">
               <Badge>{investor.type}</Badge>
               <Badge>{investor.stage}</Badge>
             </div>
           </div>
           <Button>Log Interaction</Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="col-span-1 lg:col-span-2 space-y-6">
             <div>
               <h3 className="font-bold border-b pb-2 mb-2">Notes</h3>
               <textarea 
                className="w-full border rounded p-2 h-32" 
                placeholder="Add private notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleSaveNotes}
               ></textarea>
               <p className="text-xs text-slate-400 mt-1">Saved automatically on blur.</p>
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
                Based on {investor.name}'s recent activity, emphasize your proprietary data moat.
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
};

// --- CUSTOMERS LIST ---
export const CustomersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCustName, setNewCustName] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await ExternalService.getCustomers();
      setCustomers(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!newCustName) return;
    setLoading(true);
    await ExternalService.addCustomer({
      company: newCustName,
      role: 'Contact',
      status: 'Outreach',
      signal: 1,
      notes: ''
    });
    const data = await ExternalService.getCustomers();
    setCustomers(data);
    setLoading(false);
    setShowAdd(false);
    setNewCustName('');
  };

  const openDetail = (id: string) => {
    ExternalService.setSelectedCustomerId(id);
    onNavigate(ScreenId.CUSTOMER_DETAIL);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Discovery</h2>
        <Button onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Cancel' : '+ Add Prospect'}</Button>
      </div>

      {showAdd && (
        <Card className="mb-6 p-4 bg-slate-50 border-indigo-100">
          <h3 className="text-sm font-bold mb-2">Add New Prospect</h3>
          <div className="flex gap-2">
            <input 
              value={newCustName}
              onChange={(e) => setNewCustName(e.target.value)}
              placeholder="Company Name" 
              className="border p-2 rounded flex-1" 
            />
            <Button onClick={handleAdd} disabled={!newCustName}>Save</Button>
          </div>
        </Card>
      )}

      {loading ? <Loader2 className="animate-spin"/> : (
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
              {customers.map(cust => (
                <tr key={cust.id} className="border-t cursor-pointer hover:bg-slate-50" onClick={() => openDetail(cust.id)}>
                  <td className="p-3 font-medium">{cust.company}</td>
                  <td className="p-3">{cust.role}</td>
                  <td className="p-3">
                    <Badge color={cust.status === 'Interviewed' ? 'green' : 'slate'}>{cust.status}</Badge>
                  </td>
                  <td className="p-3">{'⭐'.repeat(cust.signal)}</td>
                  <td className="p-3"><ChevronRight className="w-4 h-4"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- CUSTOMER DETAIL ---
export const CustomerDetailScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const id = ExternalService.getSelectedCustomerId();
      if (id) {
        const data = await ExternalService.getCustomerById(id);
        if (data) setCustomer(data);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="p-6"><Loader2 className="animate-spin"/></div>;
  if (!customer) return <div className="p-6">Customer not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
       <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500" onClick={() => onNavigate(ScreenId.CUSTOMERS_LIST)}>
        <ChevronRight className="rotate-180 w-4 h-4"/> Back
      </div>
       <div className="flex justify-between mb-6">
         <div>
           <h2 className="text-2xl font-bold">{customer.company}</h2>
           <p className="text-slate-500">{customer.role}</p>
         </div>
         <Badge color={customer.status === 'Interviewed' ? 'green' : 'slate'}>{customer.status}</Badge>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="col-span-1 lg:col-span-2 space-y-4">
            <Card title="Interview Notes">
              <div className="p-3 bg-slate-50 rounded text-sm text-slate-700 min-h-[100px]">
                {customer.notes || "No notes yet."}
              </div>
            </Card>
            <Card title="Key Signals">
               <div className="flex gap-2">
                 <Badge color="green">Signal Lvl {customer.signal}</Badge>
               </div>
            </Card>
         </div>
         <div className="col-span-1 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="font-bold text-purple-900 mb-2 flex gap-2 items-center"><Zap className="w-4 h-4"/> AI Insight</div>
            <p className="text-sm text-purple-800 mb-2">
              AI analysis requires at least 300 words of interview notes.
            </p>
         </div>
       </div>
    </div>
  );
};
