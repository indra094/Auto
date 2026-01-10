import React from 'react';
import { ScreenId } from '../types';

// Global
import { AppShellScreen } from './AppShellScreen';
import { NotificationsScreen } from './NotificationsScreen';

// Onboarding
import { WelcomeScreen } from './WelcomeScreen';
import { AccountCreationScreen } from './AccountCreationScreen';
import { StartupBasicsScreen } from './StartupBasicsScreen';
import { InitialReadinessScreen } from './InitialReadinessScreen';

// Founders
import { FoundersListScreen } from './FoundersListScreen';
import { FounderProfileScreen } from './FounderProfileScreen';
import { AlignmentOverviewScreen } from './AlignmentOverviewScreen';
import { EquityModelingScreen } from './EquityModelingScreen';
import { ScenarioSimulatorScreen } from './ScenarioSimulatorScreen';
import { LockAlignmentScreen } from './LockAlignmentScreen';
import { AlignmentHistoryScreen } from './AlignmentHistoryScreen';

// AI
import { AIAdvisorsHomeScreen } from './AIAdvisorsHomeScreen';
import { AIAdvisorPanelScreen } from './AIAdvisorPanelScreen';
import { TeamEmployeesScreen } from './TeamEmployeesScreen';
import { AIEmployeeDetailScreen } from './AIEmployeeDetailScreen';

// Intelligence
import { CompanyDashboardScreen } from './CompanyDashboardScreen';
import { RelevantConnectionsScreen } from './RelevantConnectionsScreen';
import { StagesCapitalScreen } from './StagesCapitalScreen';

// External
import { InvestorsListScreen } from './InvestorsListScreen';
import { InvestorDetailScreen } from './InvestorDetailScreen';
import { CustomersListScreen } from './CustomersListScreen';
import { CustomerDetailScreen } from './CustomerDetailScreen';

// Gates
import { IncorporationReadinessScreen } from './IncorporationReadinessScreen';
import { ProceedAnywayScreen } from './ProceedAnywayScreen';

interface ScreenContentProps {
  screenId: ScreenId;
  onNavigate: (id: ScreenId) => void;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ screenId, onNavigate }) => {
  switch (screenId) {
    // --- A. GLOBAL ---
    case ScreenId.APP_SHELL:
      return <AppShellScreen onNavigate={onNavigate} />;
    case ScreenId.NOTIFICATIONS:
      return <NotificationsScreen onNavigate={onNavigate} />;

    // --- B. ONBOARDING ---
    case ScreenId.WELCOME:
      return <WelcomeScreen onNavigate={onNavigate} />;
    case ScreenId.ACCOUNT_CREATION:
      return <AccountCreationScreen onNavigate={onNavigate} />;
    case ScreenId.STARTUP_BASICS:
      return <StartupBasicsScreen onNavigate={onNavigate} />;
    case ScreenId.INITIAL_READINESS:
      return <InitialReadinessScreen onNavigate={onNavigate} />;

    // --- C. FOUNDERS & EQUITY ---
    case ScreenId.FOUNDERS_LIST:
      return <FoundersListScreen onNavigate={onNavigate} />;
    case ScreenId.FOUNDER_PROFILE:
      return <FounderProfileScreen onNavigate={onNavigate} />;
    case ScreenId.ALIGNMENT_OVERVIEW:
      return <AlignmentOverviewScreen onNavigate={onNavigate} />;
    case ScreenId.EQUITY_MODELING:
      return <EquityModelingScreen onNavigate={onNavigate} />;
    case ScreenId.SCENARIO_SIMULATOR:
      return <ScenarioSimulatorScreen onNavigate={onNavigate} />;
    case ScreenId.LOCK_ALIGNMENT:
      return <LockAlignmentScreen onNavigate={onNavigate} />;
    case ScreenId.ALIGNMENT_HISTORY:
      return <AlignmentHistoryScreen onNavigate={onNavigate} />;

    // --- D. AI & TEAM ---
    case ScreenId.AI_ADVISORS_HOME:
      return <AIAdvisorsHomeScreen onNavigate={onNavigate} />;
    case ScreenId.AI_ADVISOR_PANEL:
      return <AIAdvisorPanelScreen onNavigate={onNavigate} />;
    case ScreenId.TEAM_EMPLOYEES:
      return <TeamEmployeesScreen onNavigate={onNavigate} />;
    case ScreenId.AI_EMPLOYEE_DETAIL:
      return <AIEmployeeDetailScreen onNavigate={onNavigate} />;

    // --- E. COMPANY INTELLIGENCE ---
    case ScreenId.COMPANY_DASHBOARD:
      return <CompanyDashboardScreen onNavigate={onNavigate} />;
    case ScreenId.RELEVANT_CONNECTIONS:
      return <RelevantConnectionsScreen onNavigate={onNavigate} />;
    case ScreenId.STAGES_CAPITAL:
      return <StagesCapitalScreen onNavigate={onNavigate} />;

    // --- F. EXTERNAL RELATIONSHIPS ---
    case ScreenId.INVESTORS_LIST:
      return <InvestorsListScreen onNavigate={onNavigate} />;
    case ScreenId.INVESTOR_DETAIL:
      return <InvestorDetailScreen onNavigate={onNavigate} />;
    case ScreenId.CUSTOMERS_LIST:
      return <CustomersListScreen onNavigate={onNavigate} />;
    case ScreenId.CUSTOMER_DETAIL:
      return <CustomerDetailScreen onNavigate={onNavigate} />;

    // --- G. GATES ---
    case ScreenId.INCORPORATION_READINESS:
      return <IncorporationReadinessScreen onNavigate={onNavigate} />;
    case ScreenId.PROCEED_ANYWAY:
      return <ProceedAnywayScreen onNavigate={onNavigate} />;

    default:
      return <div className="p-10 text-center text-slate-400">Screen content not implemented yet.</div>;
  }
};