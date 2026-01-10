import React, { useState, useEffect } from 'react';
import { NavGroup, ScreenId } from '../types';
import { 
  Menu, Bell, Search, Lock, AlertTriangle, CheckCircle, 
  Circle, PlayCircle
} from 'lucide-react';
import { ScreenContent } from '../screens/ScreenContent';
import { AuthService } from '../services/AuthService';
import { ProgressBar } from './UI';

// Strict ordered structure as requested
const orderedNavStructure: NavGroup[] = [
  {
    label: "Global",
    screens: [
      { id: ScreenId.APP_SHELL, label: "Home / App Shell" },
      { id: ScreenId.NOTIFICATIONS, label: "Notifications" },
    ]
  },
  {
    label: "Onboarding",
    screens: [
      { id: ScreenId.WELCOME, label: "Welcome" },
      { id: ScreenId.ACCOUNT_CREATION, label: "Account Creation" },
      { id: ScreenId.STARTUP_BASICS, label: "Startup Basics" },
      { id: ScreenId.INITIAL_READINESS, label: "Initial Readiness" },
    ]
  },
  {
    label: "Founders & Equity",
    screens: [
      { id: ScreenId.FOUNDERS_LIST, label: "Founders List" },
      { id: ScreenId.FOUNDER_PROFILE, label: "Founder Profile" },
      { id: ScreenId.ALIGNMENT_OVERVIEW, label: "Alignment Overview" },
      { id: ScreenId.EQUITY_MODELING, label: "Equity Modeling" },
      { id: ScreenId.SCENARIO_SIMULATOR, label: "Scenario Simulator" },
      { id: ScreenId.LOCK_ALIGNMENT, label: "Lock Alignment" },
      { id: ScreenId.ALIGNMENT_HISTORY, label: "Alignment History" },
    ]
  },
  {
    label: "AI & Work",
    screens: [
      { id: ScreenId.AI_ADVISORS_HOME, label: "AI Advisors Home" },
      { id: ScreenId.AI_ADVISOR_PANEL, label: "AI Advisor Panel" },
      { id: ScreenId.TEAM_EMPLOYEES, label: "Team & Employees" },
      { id: ScreenId.AI_EMPLOYEE_DETAIL, label: "AI Employee Detail" },
    ]
  },
  {
    label: "Company Intelligence",
    screens: [
      { id: ScreenId.COMPANY_DASHBOARD, label: "Dashboard" },
      { id: ScreenId.RELEVANT_CONNECTIONS, label: "Relevant Connections" },
      { id: ScreenId.STAGES_CAPITAL, label: "Stages & Capital" },
    ]
  },
  {
    label: "External Relationships",
    screens: [
      { id: ScreenId.INVESTORS_LIST, label: "Investors List" },
      { id: ScreenId.INVESTOR_DETAIL, label: "Investor Detail" },
      { id: ScreenId.CUSTOMERS_LIST, label: "Customers List" },
      { id: ScreenId.CUSTOMER_DETAIL, label: "Customer Detail" },
    ]
  },
  {
    label: "Gates",
    screens: [
      { id: ScreenId.INCORPORATION_READINESS, label: "Incorporation Readiness" },
      { id: ScreenId.PROCEED_ANYWAY, label: "Proceed Anyway" },
    ]
  }
];

type ScreenStatus = 'locked' | 'partial' | 'accessible';

export const Layout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(ScreenId.WELCOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(AuthService.getUser());
  const [workspace, setWorkspace] = useState(AuthService.getWorkspace());
  const [onboardingProgress, setOnboardingProgress] = useState(0);

  useEffect(() => {
    const refreshData = () => {
      const u = AuthService.getUser();
      const w = AuthService.getWorkspace();
      setUser(u);
      setWorkspace(w);
      
      // Calculate fake progress based on step for the sidebar visual
      if (w) {
        // Simple mapping: Step 1 = 10%, Step 2 = 25%, Step 3 = 50%, Step 4 = 75%, Step 5+ = 100%
        const progressMap = [0, 10, 25, 50, 75, 90, 100];
        setOnboardingProgress(progressMap[Math.min(w.onboardingStep, 6)]);
      }
    };
    
    refreshData();
    const interval = setInterval(refreshData, 1000); 
    return () => clearInterval(interval);
  }, []);

  // Determine status of each screen based on onboarding step
  const getScreenStatus = (screenId: ScreenId): ScreenStatus => {
    const step = workspace?.onboardingStep || 1;

    // A. Global - Always Accessible
    if (screenId === ScreenId.APP_SHELL || screenId === ScreenId.NOTIFICATIONS) return 'accessible';

    // B. Onboarding
    if (screenId === ScreenId.WELCOME) return 'accessible';
    if (screenId === ScreenId.ACCOUNT_CREATION) return step >= 1 ? 'accessible' : 'locked';
    if (screenId === ScreenId.STARTUP_BASICS) return step >= 2 ? 'accessible' : 'locked';
    if (screenId === ScreenId.INITIAL_READINESS) return step >= 3 ? 'accessible' : 'locked';

    // C. Founders
    // Partial access during early setup
    if ([ScreenId.FOUNDERS_LIST, ScreenId.FOUNDER_PROFILE].includes(screenId)) {
        return step >= 3 ? 'partial' : 'locked';
    }
    // Full access only after readiness check
    if ([
        ScreenId.ALIGNMENT_OVERVIEW, ScreenId.EQUITY_MODELING, ScreenId.SCENARIO_SIMULATOR, 
        ScreenId.LOCK_ALIGNMENT, ScreenId.ALIGNMENT_HISTORY
    ].includes(screenId)) {
        return step >= 4 ? 'accessible' : 'locked';
    }

    // D. AI & Work - Locked until Founders are solid
    if ([
        ScreenId.AI_ADVISORS_HOME, ScreenId.AI_ADVISOR_PANEL, 
        ScreenId.TEAM_EMPLOYEES, ScreenId.AI_EMPLOYEE_DETAIL
    ].includes(screenId)) {
        return step >= 4 ? 'accessible' : 'locked';
    }

    // E. Intelligence
    if (screenId === ScreenId.COMPANY_DASHBOARD) return step >= 3 ? 'partial' : 'locked';
    if ([ScreenId.RELEVANT_CONNECTIONS, ScreenId.STAGES_CAPITAL].includes(screenId)) {
        return step >= 4 ? 'accessible' : 'locked';
    }

    // F. External & G. Gates - Locked until late stage
    if ([
        ScreenId.INVESTORS_LIST, ScreenId.INVESTOR_DETAIL, 
        ScreenId.CUSTOMERS_LIST, ScreenId.CUSTOMER_DETAIL,
        ScreenId.INCORPORATION_READINESS, ScreenId.PROCEED_ANYWAY
    ].includes(screenId)) {
        return step >= 4 ? 'accessible' : 'locked';
    }

    return 'locked';
  };

  const getInitials = () => {
    if (user?.fullName) return user.fullName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const handleNavClick = (screenId: ScreenId, status: ScreenStatus) => {
    if (status === 'locked') return; // Do nothing if locked
    setCurrentScreen(screenId);
    setMobileMenuOpen(false);
  };

  const companyName = workspace?.name || "New Startup";
  const stage = workspace?.stage || "Onboarding";
  
  // Hide search/notifications during early onboarding to minimize distraction
  const isSetupMode = (workspace?.onboardingStep || 0) < 3;

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
        <div 
          className="p-4 border-b border-slate-700 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors shrink-0"
          onClick={() => setCurrentScreen(ScreenId.WELCOME)}
        >
          <div className="w-10 h-10 flex items-center justify-center text-indigo-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M12 2L3 22h18L12 2z" />
              <path d="M8 12h8" />
              <path d="M12 12v4" />
              <circle cx="12" cy="18" r="2" fill="currentColor" className="text-yellow-400" stroke="none" />
              <path d="M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            </svg>
          </div>
          <span className="font-bold text-white tracking-wide text-xl">Auto</span>
        </div>

        {/* Progress Bar Area */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/50">
           <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
             <span>Setup Progress</span>
             <span>{onboardingProgress}%</span>
           </div>
           <ProgressBar value={onboardingProgress} height="h-1.5" className="bg-slate-700" color="bg-indigo-500" />
        </div>
        
        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {orderedNavStructure.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">{group.label}</h3>
              <ul className="space-y-0.5">
                {group.screens.map((screen) => {
                   const status = getScreenStatus(screen.id);
                   const isActive = currentScreen === screen.id;
                   
                   let Icon = Circle;
                   let statusColor = "text-slate-500";
                   let containerClass = "hover:bg-slate-800 text-slate-400";
                   
                   if (isActive) {
                     Icon = PlayCircle;
                     statusColor = "text-indigo-400";
                     containerClass = "bg-indigo-600 text-white shadow-md";
                   } else if (status === 'locked') {
                     Icon = Lock;
                     statusColor = "text-slate-600";
                     containerClass = "text-slate-600 cursor-not-allowed opacity-60";
                   } else if (status === 'partial') {
                     Icon = AlertTriangle;
                     statusColor = "text-amber-500";
                     containerClass = "hover:bg-slate-800 text-slate-300";
                   } else {
                     // Accessible
                     Icon = CheckCircle;
                     statusColor = "text-emerald-500";
                     containerClass = "hover:bg-slate-800 text-slate-300";
                   }

                   return (
                    <li key={screen.id} className="relative group/tooltip">
                      <button
                        onClick={() => handleNavClick(screen.id, status)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all ${containerClass}`}
                        title={status === 'locked' ? "Unlock after completing required onboarding steps." : ""}
                      >
                        <Icon className={`w-3.5 h-3.5 ${statusColor}`} />
                        <span className="truncate">{screen.label}</span>
                        
                        {/* Status Indicators */}
                        {status === 'partial' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                        {status === 'locked' && <Lock className="ml-auto w-3 h-3 opacity-50" />}
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
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <span className="font-bold text-slate-900 text-lg">{companyName}</span>
               {stage && (
                 <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-100 font-medium">
                   {stage}
                 </span>
               )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Only show tools after setup is complete */}
             {!isSetupMode && (
               <>
                 <div className="relative hidden md:block">
                   <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/>
                   <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none w-64 transition-all" />
                 </div>
                 <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full" onClick={() => setCurrentScreen(ScreenId.NOTIFICATIONS)}>
                   <Bell className="w-5 h-5"/>
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                 </button>
                 <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
               </>
             )}

             {/* User Profile - Always visible on Top Right */}
             <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-full pr-3 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs overflow-hidden border border-slate-200 shadow-sm">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div className="hidden md:block text-left">
                   <div className="text-sm font-bold text-slate-800 leading-none">{user?.fullName || "Guest"}</div>
                   <div className="text-[10px] text-slate-500 leading-none mt-1">{user?.email || "guest@auto.com"}</div>
                </div>
             </div>
          </div>
        </header>

        {/* Screen Content Wrapper */}
        <main className="flex-1 overflow-hidden relative bg-slate-50/50">
           <ScreenContent screenId={currentScreen} onNavigate={setCurrentScreen} />
        </main>
      </div>
    </div>
  );
};