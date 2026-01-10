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
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'black'; 
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}> = ({ children, variant = 'primary', className = "", onClick, fullWidth }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    black: "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'amber' | 'green' | 'red' | 'slate' | 'purple' }> = ({ children, color = 'slate' }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[color]}`}>
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

export const WireframePlaceholder: React.FC<{ height?: string; label?: string }> = ({ height = "h-32", label = "Content Placeholder" }) => (
  <div className={`w-full ${height} bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 p-4`}>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export const ProgressBar: React.FC<{ value: number; color?: string }> = ({ value, color = "bg-indigo-600" }) => (
  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
    <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }}></div>
  </div>
);