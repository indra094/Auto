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
    label: "Onboarding",
    screens: [
      { id: ScreenId.WELCOME, label: "Welcome" },
      { id: ScreenId.ACCOUNT_CREATION, label: "Your Info" },
      { id: ScreenId.COMPANY_CREATION, label: "Create Company" },
      { id: ScreenId.STARTUP_BASICS, label: "Startup Basics" },
    ]
  },
  {
    label: "Company Intelligence",
    screens: [
      { id: ScreenId.COMPANY_DASHBOARD, label: "Dashboard" },
      { id: ScreenId.BUILD_STATUS, label: "Build Status" },
      { id: ScreenId.FINANCIAL_DASHBOARD, label: "Financials" },
      { id: ScreenId.STAGES_CAPITAL, label: "Stages & Capital" },
    ]
  },
  {
    label: "Founders & Equity",
    screens: [
      { id: ScreenId.FOUNDERS_LIST, label: "Founders" },
      { id: ScreenId.COFOUNDER_FINDING, label: "Find Co-founders" },
      { id: ScreenId.ALIGNMENT_OVERVIEW, label: "Founder Alignment" },
      { id: ScreenId.EQUITY_MODELING, label: "Equity Modeling" },
      { id: ScreenId.LOCK_ALIGNMENT, label: "Lock Alignment" },
    ]
  },
  {
    label: "External & Validation",
    screens: [
      { id: ScreenId.CUSTOMERS_LIST, label: "Prospective Customers" },
      { id: ScreenId.VALIDATION_CHECKLIST, label: "Validation Checklist" },
      { id: ScreenId.INVESTORS_LIST, label: "Investor Signals" },
      { id: ScreenId.RELEVANT_CONNECTIONS, label: "Connections" },
    ]
  },
  {
    label: "Execution & Gates",
    screens: [
      { id: ScreenId.AI_ADVISORS_HOME, label: "AI Advisors" },
      { id: ScreenId.TEAM_EMPLOYEES, label: "People & Talent" },
      { id: ScreenId.INCORPORATION_READINESS, label: "Incorporation Gate" },
    ]
  },
  {
    label: "System",
    screens: [
      { id: ScreenId.NOTIFICATIONS, label: "Notifications" },
      { id: ScreenId.APP_SHELL, label: "App Settings" },
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

    // A. Always Accessible
    if ([ScreenId.APP_SHELL, ScreenId.NOTIFICATIONS, ScreenId.WELCOME].includes(screenId)) return 'accessible';

    // B. Onboarding
    if (screenId === ScreenId.ACCOUNT_CREATION) return step >= 1 ? 'accessible' : 'locked';
    if (screenId === ScreenId.COMPANY_CREATION) return step >= 2 ? 'accessible' : 'locked';
    if (screenId === ScreenId.STARTUP_BASICS) return step >= 3 ? 'accessible' : 'locked';

    // C. Core Dashboard & Intelligence
    if (screenId === ScreenId.COMPANY_DASHBOARD) return step >= 4 ? 'accessible' : 'locked';
    if ([ScreenId.BUILD_STATUS, ScreenId.FINANCIAL_DASHBOARD, ScreenId.STAGES_CAPITAL].includes(screenId)) {
      return step >= 4 ? 'accessible' : 'locked';
    }

    // D. Founders & Equity
    if ([ScreenId.FOUNDERS_LIST, ScreenId.COFOUNDER_FINDING].includes(screenId)) {
      return step >= 4 ? 'accessible' : 'locked';
    }
    if ([ScreenId.ALIGNMENT_OVERVIEW, ScreenId.EQUITY_MODELING, ScreenId.LOCK_ALIGNMENT].includes(screenId)) {
      return step >= 5 ? 'accessible' : 'locked';
    }

    // E. External & Validation
    if ([ScreenId.CUSTOMERS_LIST, ScreenId.VALIDATION_CHECKLIST, ScreenId.INVESTORS_LIST, ScreenId.RELEVANT_CONNECTIONS].includes(screenId)) {
      return step >= 5 ? 'accessible' : 'locked';
    }

    // F. Execution & Gates
    if ([ScreenId.AI_ADVISORS_HOME, ScreenId.TEAM_EMPLOYEES, ScreenId.INCORPORATION_READINESS].includes(screenId)) {
      return step >= 6 ? 'accessible' : 'locked';
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
    <div className="flex h-screen w-full bg-white text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 text-slate-600 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Brand Header */}
        <div
          className="p-4 border-b border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors shrink-0"
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
          <span className="font-bold text-slate-900 tracking-wide text-xl">Auto</span>
        </div>

        {/* Progress Bar Area */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
            <span>Setup Progress</span>
            <span>{onboardingProgress}%</span>
          </div>
          <ProgressBar value={onboardingProgress} height="h-1.5" className="bg-slate-200" color="bg-indigo-500" />
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {orderedNavStructure.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2">{group.label}</h3>
              <ul className="space-y-0.5">
                {group.screens.map((screen) => {
                  const status = getScreenStatus(screen.id);
                  const isActive = currentScreen === screen.id;

                  let Icon = Circle;
                  let statusColor = "text-slate-400";
                  let containerClass = "hover:bg-slate-50 text-slate-600";

                  if (isActive) {
                    Icon = PlayCircle;
                    statusColor = "text-indigo-600";
                    containerClass = "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100";
                  } else if (status === 'locked') {
                    Icon = Lock;
                    statusColor = "text-slate-300";
                    containerClass = "text-slate-400 cursor-not-allowed opacity-60";
                  } else if (status === 'partial') {
                    Icon = AlertTriangle;
                    statusColor = "text-amber-500";
                    containerClass = "hover:bg-slate-50 text-slate-600";
                  } else {
                    // Accessible
                    Icon = CheckCircle;
                    statusColor = "text-emerald-500";
                    containerClass = "hover:bg-slate-50 text-slate-600";
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

            {/* Company Switcher */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
              onClick={() => window.location.reload()}
            >
              <span className="font-bold text-slate-900 text-lg">{companyName}</span>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600">
                <span className="text-[10px] font-bold uppercase tracking-tight">Switch</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>

            {stage && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs border border-indigo-100 font-medium ml-2">
                {stage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Only show search after setup is well underway */}
            {!isSetupMode && (
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input type="text" placeholder="Search anything..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none w-64 transition-all" />
              </div>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full" onClick={() => setCurrentScreen(ScreenId.NOTIFICATIONS)}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

            {/* User Profile */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-full pr-3 transition-colors"
              onClick={() => setCurrentScreen(ScreenId.APP_SHELL)}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs overflow-hidden border border-slate-200 shadow-sm">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                ) : (
                  getInitials()
                )}
              </div>
              <div className="hidden md:block text-left">
                {user?.fullName ? (
                  <>
                    <div className="text-sm font-bold text-slate-800 leading-none">{user.fullName}</div>
                    <div className="text-[10px] text-slate-500 leading-none mt-1">{user.email}</div>
                  </>
                ) : (
                  <div className="text-sm font-bold text-slate-800 leading-none">{user?.email || "Guest"}</div>
                )}
              </div>
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
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