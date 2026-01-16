import React from 'react';
import { LucideIcon } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; action?: React.ReactNode; onClick?: () => void }> = ({ children, className = "", title, action, onClick }) => (
  <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`} onClick={onClick}>
    {(title || action) && (
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-lg">
        {title && <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'black' | 'outline';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'primary', className = "", onClick, fullWidth, disabled, size }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2";
  const variants: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    black: "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50",
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";
  // Map size prop to classes if needed, for now just consuming the prop to avoid errors

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${disabledStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'amber' | 'green' | 'red' | 'slate' | 'purple' | 'emerald' | 'indigo' | 'white'; className?: string }> = ({ children, color = 'slate', className = "" }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    white: "bg-white text-slate-700 border-slate-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[color] || colors.slate} ${className}`}>
      {children}
    </span>
  );
};

export const AIInsightBox: React.FC<{ type?: 'warning' | 'insight' | 'critical', title?: string, children: React.ReactNode }> = ({ type = 'insight', title, children }) => {
  const styles = {
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    insight: "bg-indigo-50 border-indigo-200 text-indigo-900",
    critical: "bg-red-50 border-red-200 text-red-900"
  };
  const icons = {
    warning: "⚠",
    insight: "✨",
    critical: "🛑"
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} mb-4`}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5">{icons[type]}</span>
        <div className="flex-1">
          {title && <h4 className="font-bold text-xs uppercase mb-1 opacity-80 tracking-wider">{title}</h4>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { FileCheck } from 'lucide-react';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const LockAlignmentScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto mt-8 pb-12 p-6">
    <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4">
        <FileCheck className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900">Lock Alignment</h2>
      <p className="text-slate-500">This version will be hashed and stored as your "Founder Truth".</p>
    </div>

    <Card className="mb-8 border-t-4 border-t-indigo-600">
      <div className="bg-slate-50 p-6 border-b border-slate-200">
        <h3 className="font-serif text-xl font-bold text-slate-800 mb-1">Founder Alignment Summary</h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest">Generated by Foundry AI • {new Date().toLocaleDateString()}</p>
      </div>
      <div className="p-8 space-y-6 font-serif text-slate-800 leading-relaxed">
        <p>
          <strong>1. Equity Split:</strong> The founders agree to a split of <strong>52% (Alex)</strong> and <strong>48% (Jamie)</strong>.
        </p>
        <p>
          <strong>2. Commitment Expectations:</strong> This split is predicated on Alex contributing <strong>60 hours/week</strong> and Jamie contributing <strong>25 hours/week</strong>.
          <span className="bg-amber-100 px-1 rounded mx-1">Note: This disparity is flagged as a high-risk factor.</span>
        </p>
        <p>
          <strong>3. Vesting:</strong> Standard 4-year vesting with a 1-year cliff.
        </p>
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-sm">
          <strong>Explicit Acknowledgement:</strong>
          <br />
          "We understand that if Jamie leaves immediately after the cliff (12 months), they will retain 12% of the company. We accept this risk."
        </div>
      </div>
      <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <div className="h-10 w-32 sm:w-40 border-b border-slate-400 relative">
            <span className="absolute -bottom-5 left-0 text-xs text-slate-400">Signed by Alex</span>
          </div>
          <div className="h-10 w-32 sm:w-40 border-b border-slate-400 relative">
            <span className="absolute -bottom-5 left-0 text-xs text-slate-400">Signed by Jamie</span>
          </div>
        </div>
        <Badge color="slate">Draft v1.0</Badge>
      </div>
    </Card>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Button variant="secondary" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Revise Terms</Button>
      <Button variant="black" onClick={() => onNavigate(ScreenId.ALIGNMENT_HISTORY)}>Lock & Generate PDF</Button>
    </div>
  </div>
); WireframePlaceholder: React.FC<{ height?: string; label?: string }> = ({ height = "h-32", label = "Content Placeholder" }) => (
  <div className={`w-full ${height} bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 p-4`}>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export const ProgressBar: React.FC<{ value: number; color?: string; className?: string; height?: string }> = ({ value, color = "bg-indigo-600", className = "", height = "h-2" }) => (
  <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden ${className}`}>
    <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }}></div>
  </div>
);