import React, { useState } from 'react';
import { NavGroup, ScreenId } from '../types';
import { 
  Home, Users, Cpu, PieChart, Briefcase, FileText, 
  Settings, Menu, Bell, Search, ChevronDown, Rocket, LayoutDashboard
} from 'lucide-react';
import { ScreenContent } from '../screens/ScreenContent';

const navStructure: NavGroup[] = [
  {
    label: "Onboarding",
    screens: [
      { id: ScreenId.WELCOME, label: "Welcome" },
      { id: ScreenId.ACCOUNT_CREATION, label: "Account Setup" },
      { id: ScreenId.STARTUP_BASICS, label: "Basics" },
      { id: ScreenId.INITIAL_READINESS, label: "Readiness Check" },
    ]
  },
  {
    label: "Founders",
    screens: [
      { id: ScreenId.FOUNDERS_LIST, label: "Founders List", icon: Users },
      { id: ScreenId.FOUNDER_PROFILE, label: "Profile Edit" },
      { id: ScreenId.ALIGNMENT_OVERVIEW, label: "Alignment", icon: PieChart },
      { id: ScreenId.EQUITY_MODELING, label: "Equity Model" },
      { id: ScreenId.SCENARIO_SIMULATOR, label: "Simulator" },
      { id: ScreenId.LOCK_ALIGNMENT, label: "Lock Agreement" },
      { id: ScreenId.ALIGNMENT_HISTORY, label: "History" },
    ]
  },
  {
    label: "Intelligence",
    screens: [
      { id: ScreenId.COMPANY_DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
      { id: ScreenId.RELEVANT_CONNECTIONS, label: "Connections" },
      { id: ScreenId.STAGES_CAPITAL, label: "Stages Map", icon: Rocket },
    ]
  },
  {
    label: "AI & Team",
    screens: [
      { id: ScreenId.AI_ADVISORS_HOME, label: "AI Advisors", icon: Cpu },
      { id: ScreenId.AI_ADVISOR_PANEL, label: "Advisor Chat" },
      { id: ScreenId.TEAM_EMPLOYEES, label: "Team" },
      { id: ScreenId.AI_EMPLOYEE_DETAIL, label: "AI Detail" },
    ]
  },
  {
    label: "External",
    screens: [
      { id: ScreenId.INVESTORS_LIST, label: "Investors", icon: Briefcase },
      { id: ScreenId.INVESTOR_DETAIL, label: "Investor Detail" },
      { id: ScreenId.CUSTOMERS_LIST, label: "Customers" },
      { id: ScreenId.CUSTOMER_DETAIL, label: "Customer Detail" },
    ]
  },
  {
    label: "Gates",
    screens: [
      { id: ScreenId.INCORPORATION_READINESS, label: "Incorp. Gate", icon: FileText },
      { id: ScreenId.PROCEED_ANYWAY, label: "Override Gate" },
      { id: ScreenId.NOTIFICATIONS, label: "Notifications" },
      { id: ScreenId.APP_SHELL, label: "App Shell" },
    ]
  }
];

export const Layout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(ScreenId.WELCOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-700 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <span className="font-bold text-white tracking-wide">FOUNDRY</span>
        </div>
        
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
          {navStructure.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{group.label}</h3>
              <ul className="space-y-1">
                {group.screens.map((screen) => {
                   const Icon = screen.icon;
                   return (
                    <li key={screen.id}>
                      <button
                        onClick={() => {
                          setCurrentScreen(screen.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentScreen === screen.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                      >
                        {Icon && <Icon className="w-4 h-4 opacity-70" />}
                        {!Icon && <span className="w-4 h-4 block"></span>}
                        {screen.label}
                      </button>
                    </li>
                   );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
               <span className="font-medium text-slate-900">Acme Corp</span>
               <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-100">Pre-seed</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative hidden md:block">
               <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/>
               <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none w-64" />
             </div>
             <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full" onClick={() => setCurrentScreen(ScreenId.NOTIFICATIONS)}>
               <Bell className="w-5 h-5"/>
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200 cursor-pointer">
               AF
             </div>
          </div>
        </header>

        {/* Screen Content Wrapper */}
        <main className="flex-1 overflow-hidden relative">
           <ScreenContent screenId={currentScreen} onNavigate={setCurrentScreen} />
        </main>
      </div>
    </div>
  );
};
