export enum ScreenId {
  // A. Global
  APP_SHELL = 'APP_SHELL',
  NOTIFICATIONS = 'NOTIFICATIONS',

  // B. Onboarding
  WELCOME = 'WELCOME',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  COMPANY_INFORMATION = 'COMPANY_INFORMATION',
  INITIAL_READINESS = 'INITIAL_READINESS',

  // C. Founders & Equity
  FOUNDERS_LIST = 'FOUNDERS_LIST',
  FOUNDER_PROFILE = 'FOUNDER_PROFILE',
  ALIGNMENT_OVERVIEW = 'ALIGNMENT_OVERVIEW',
  EQUITY_MODELING = 'EQUITY_MODELING',
  SCENARIO_SIMULATOR = 'SCENARIO_SIMULATOR',
  LOCK_ALIGNMENT = 'LOCK_ALIGNMENT',
  ALIGNMENT_HISTORY = 'ALIGNMENT_HISTORY',
  COFOUNDER_FINDING = 'COFOUNDER_FINDING',
  MY_ROLE = 'MY_ROLE',

  // D. AI & Work
  AI_ADVISORS_HOME = 'AI_ADVISORS_HOME',
  AI_ADVISOR_PANEL = 'AI_ADVISOR_PANEL',
  TEAM_EMPLOYEES = 'TEAM_EMPLOYEES',
  AI_EMPLOYEE_DETAIL = 'AI_EMPLOYEE_DETAIL',

  // E. Company Intelligence
  COMPANY_DASHBOARD = 'COMPANY_DASHBOARD',
  SUB_ORG_DETAIL = 'SUB_ORG_DETAIL',
  RELEVANT_CONNECTIONS = 'RELEVANT_CONNECTIONS',
  STAGES_CAPITAL = 'STAGES_CAPITAL',
  VALIDATION_CHECKLIST = 'VALIDATION_CHECKLIST',
  BUILD_STATUS = 'BUILD_STATUS',
  FINANCIAL_DASHBOARD = 'FINANCIAL_DASHBOARD',

  // F. External Relationships
  INVESTORS_LIST = 'INVESTORS_LIST',
  INVESTOR_DETAIL = 'INVESTOR_DETAIL',
  CUSTOMERS_LIST = 'CUSTOMERS_LIST',
  CUSTOMER_DETAIL = 'CUSTOMER_DETAIL',

  // G. AI & Idea
  AI_IDEA_VALIDATION = 'AI_IDEA_VALIDATION',

  // H. Gates & Systems
  INCORPORATION_READINESS = 'INCORPORATION_READINESS',
  PROCEED_ANYWAY = 'PROCEED_ANYWAY',
  DOCUMENTS = 'DOCUMENTS',
}

export interface NavGroup {
  label: string;
  screens: { id: ScreenId; label: string; icon?: any }[];
}

export interface User {
  fullName: string;
  email: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  industry?: string;
  geography?: string;
  type?: string;
  stage?: string;

  // 🔥 NEW
  problem?: string;
  solution?: string;
  customer?: string;

  onboardingStep?: number;
};

export type ScreenStatus = 'accessible' | 'locked' | 'hidden';
