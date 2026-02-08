export enum ScreenId {
  // A. Global
  APP_SHELL = 'APP_SHELL',
  NOTIFICATIONS = 'NOTIFICATIONS',

  // B. Onboarding
  WELCOME = 'WELCOME',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  COMPANY_INFORMATION = 'COMPANY_INFORMATION',
  FOUNDERS_ALIGNMENT = 'FOUNDERS_ALIGNMENT',

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
  INVESTOR_READINESS = 'INVESTOR_READINESS',

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
  FINANCIALS_ONBOARDING = 'FINANCIALS_ONBOARDING',
}

export interface NavGroup {
  label: string;
  screens: { id: ScreenId; label: string; icon?: any }[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  current_org_id: string;

  title: string;
  commitment: number;
  equity: number;
  vesting: string;
  status: 'Active' | 'Pending Activation' | 'Inactive';
  plannedChange: 'none' | 'reduce' | 'exit' | 'advisory';
  startDate: string;
  lastUpdated: string;
  permission_level: 'ADMIN' | 'VIEWER';
  industry_experience: number;
}



export interface Workspace {
  id: string;
  name: string;
  industry?: string;
  geography?: string;
  type?: string;
  stage?: string;

  problem?: string;
  solution?: string;
  customer?: string;

  onboarding_step?: number;
};

export interface UserOrgInfo {
  user_id: string;
  title: string;
  role: string;
  commitment: number;
  equity: number;
  vesting: string;
  status: 'Active' | 'Pending Activation' | 'Inactive';
  plannedChange: 'none' | 'reduce' | 'exit' | 'advisory';
  startDate: string;
  lastUpdated: string;
  permission_level: 'ADMIN' | 'VIEWER';
}

export interface Financials {
  org_id: string;
  monthly_revenue?: number;
  revenue_trend?: string;
  revenue_stage?: string;
  cash_in_bank?: number;
  monthly_burn?: number;
  cost_structure?: string;
  pricing_model?: string;
  price_per_customer?: number;
  customers_in_pipeline?: number;
  data_confidence?: string;
  last_updated?: string;
}

export type ScreenStatus = 'accessible' | 'locked' | 'hidden';
