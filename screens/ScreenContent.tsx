import React, { useEffect, useRef } from 'react';
import { ScreenId } from '../types';

// Global
import { AppShellScreen } from './AppShellScreen';
import { NotificationsScreen } from './NotificationsScreen';

// Onboarding
import { AccountCreationScreen } from './AccountCreationScreen';
import { CompanyCreationScreen } from './CompanyCreationScreen';
import { FoundersAlignmentScreen } from './FoundersAlignmentScreen';
import { InvestorReadinessScreen } from './InvestorReadinessScreen';

// Founders
import { FoundersListScreen } from './FoundersListScreen';
import { FounderProfileScreen } from './FounderProfileScreen';
import { AlignmentOverviewScreen } from './AlignmentOverviewScreen';
import { EquityModelingScreen } from './EquityModelingScreen';
import { ScenarioSimulatorScreen } from './ScenarioSimulatorScreen';
import { LockAlignmentScreen } from './LockAlignmentScreen';
import { AlignmentHistoryScreen } from './AlignmentHistoryScreen';
import { CoFounderFindingScreen } from './CoFounderFindingScreen';
import { UserOrgInfoScreen } from './MyRoleScreen';

// AI
import { AIAdvisorsHomeScreen } from './AIAdvisorsHomeScreen';
import { AIAdvisorPanelScreen } from './AIAdvisorPanelScreen';
import { TeamEmployeesScreen } from './TeamEmployeesScreen';
import { AIEmployeeDetailScreen } from './AIEmployeeDetailScreen';

// Intelligence
import { CompanyDashboardScreen } from './CompanyDashboardScreen';
import { SubOrgDetailScreen } from './SubOrgDetailScreen';
import { RelevantConnectionsScreen } from './RelevantConnectionsScreen';
import { StagesCapitalScreen } from './StagesCapitalScreen';
import { ValidationChecklistScreen } from './ValidationChecklistScreen';
import { BuildStatusScreen } from './BuildStatusScreen';
import { FinancialDashboardScreen } from './FinancialDashboardScreen';
import { FinancialsScreen } from './FinancialsScreen';

// External
import { InvestorsListScreen } from './InvestorsListScreen';
import { InvestorDetailScreen } from './InvestorDetailScreen';
import { CustomersListScreen } from './CustomersListScreen';
import { CustomerDetailScreen } from './CustomerDetailScreen';

// AI & Idea
import { AIIdeaValidationScreen } from './AIIdeaValidationScreen';

// Groups & Systems
import { IncorporationReadinessScreen } from './IncorporationReadinessScreen';
import { ProceedAnywayScreen } from './ProceedAnywayScreen';
import { DocumentsScreen } from './DocumentsScreen';

interface ScreenContentProps {
  screenId: ScreenId;
  onNavigate: (id: ScreenId) => void;
  active?: boolean;
}

// Set of screens that are "pages" and need their own scrolling container because they don't handle it internally
// Screens NOT in this list (e.g. FounderProfile, EquityModeling, Chat) handle their own layout/scrolling to support complex UIs.
const scrollableScreens = new Set([
  ScreenId.NOTIFICATIONS,
  ScreenId.ACCOUNT_CREATION,
  ScreenId.COMPANY_INFORMATION,
  ScreenId.FOUNDERS_ALIGNMENT,
  ScreenId.FOUNDERS_LIST,
  ScreenId.COFOUNDER_FINDING,
  ScreenId.ALIGNMENT_OVERVIEW,
  ScreenId.SCENARIO_SIMULATOR,
  ScreenId.LOCK_ALIGNMENT,
  ScreenId.ALIGNMENT_HISTORY,
  ScreenId.MY_ROLE,
  ScreenId.AI_ADVISORS_HOME,
  ScreenId.TEAM_EMPLOYEES,
  ScreenId.AI_EMPLOYEE_DETAIL,
  ScreenId.COMPANY_DASHBOARD,
  ScreenId.SUB_ORG_DETAIL,
  ScreenId.RELEVANT_CONNECTIONS,
  ScreenId.STAGES_CAPITAL,
  ScreenId.VALIDATION_CHECKLIST,
  ScreenId.BUILD_STATUS,
  ScreenId.FINANCIAL_DASHBOARD,
  ScreenId.INVESTORS_LIST,
  ScreenId.INVESTOR_DETAIL,
  ScreenId.CUSTOMERS_LIST,
  ScreenId.CUSTOMER_DETAIL,
  ScreenId.AI_IDEA_VALIDATION,
  ScreenId.INCORPORATION_READINESS,
  ScreenId.PROCEED_ANYWAY,
  ScreenId.DOCUMENTS,
  ScreenId.INVESTOR_READINESS,
  ScreenId.FINANCIALS_ONBOARDING
]);

export const ScreenContent: React.FC<ScreenContentProps> = ({ screenId, onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }
  }, [screenId]);

  const renderContent = () => {
    switch (screenId) {
      // --- A. GLOBAL ---
      case ScreenId.APP_SHELL:
        return <AppShellScreen onNavigate={onNavigate} />;
      case ScreenId.NOTIFICATIONS:
        return <NotificationsScreen onNavigate={onNavigate} />;

      // --- B. ONBOARDING ---
      case ScreenId.ACCOUNT_CREATION:
        return <AccountCreationScreen onNavigate={onNavigate} />;
      case ScreenId.FOUNDERS_LIST:
        return <FoundersListScreen onNavigate={onNavigate} />;
      case ScreenId.COMPANY_INFORMATION:
        return <CompanyCreationScreen onNavigate={onNavigate} active={true} />;
      case ScreenId.FINANCIALS_ONBOARDING:
        return <FinancialsScreen onNavigate={onNavigate} />;
      case ScreenId.FOUNDERS_ALIGNMENT:
        return <FoundersAlignmentScreen onNavigate={onNavigate} />;

      // --- C. FOUNDERS & EQUITY ---
      case ScreenId.FOUNDERS_LIST:
        return <FoundersListScreen onNavigate={onNavigate} />;
      case ScreenId.FOUNDER_PROFILE:
        return <FounderProfileScreen onNavigate={onNavigate} />;
      case ScreenId.COFOUNDER_FINDING:
        return <CoFounderFindingScreen onNavigate={onNavigate} />;
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
      case ScreenId.MY_ROLE:
        return <UserOrgInfoScreen onNavigate={onNavigate} />;

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
      case ScreenId.INVESTOR_READINESS:
        return <InvestorReadinessScreen onNavigate={onNavigate} />;
      case ScreenId.SUB_ORG_DETAIL:
        return <SubOrgDetailScreen onNavigate={onNavigate} />;
      case ScreenId.VALIDATION_CHECKLIST:
        return <ValidationChecklistScreen onNavigate={onNavigate} />;
      case ScreenId.BUILD_STATUS:
        return <BuildStatusScreen onNavigate={onNavigate} />;
      case ScreenId.FINANCIAL_DASHBOARD:
        return <FinancialDashboardScreen onNavigate={onNavigate} />;
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

      // --- G. AI & IDEA ---
      case ScreenId.AI_IDEA_VALIDATION:
        return <AIIdeaValidationScreen onNavigate={onNavigate} active={true} />;

      // --- H. GATES & SYSTEM ---
      case ScreenId.INCORPORATION_READINESS:
        return <IncorporationReadinessScreen onNavigate={onNavigate} />;
      case ScreenId.PROCEED_ANYWAY:
        return <ProceedAnywayScreen onNavigate={onNavigate} />;
      case ScreenId.DOCUMENTS:
        return <DocumentsScreen onNavigate={onNavigate} />;

      default:
        return <div className="p-10 text-center text-slate-400">Screen content not implemented yet.</div>;
    }
  };

  const content = renderContent();

  if (scrollableScreens.has(screenId)) {
    return (
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto bg-slate-50"
      >
        {content}
      </div>
    );
  }

  return <>{content}</>;
};