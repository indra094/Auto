import React from 'react';
import { ScreenId } from '../types';
import { Button, Card, Badge, AIInsightBox } from '../components/UI';
import {
  ChevronRight, AlertTriangle, Briefcase, DollarSign, Scale, Zap,
  Clock, AlertOctagon, ArrowRight, FileCheck
} from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
}

export const FoundersListScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-slate-900">Founders & Accountability</h2>
      <Button onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>+ Add Founder</Button>
    </div>

    <AIInsightBox type="critical" title="System Warning">
      Two founders have marked themselves as "CEO". This role overlap creates immediate accountability risk.
    </AIInsightBox>

    <div className="grid grid-cols-1 gap-4">
      {/* Founder A */}
      <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">A</div>
            <div>
              <h3 className="text-lg font-bold">Alex (You)</h3>
              <p className="text-sm text-slate-500">CEO • 60h/week</p>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
              <Badge color="green">Aligned</Badge>
            </div>
            <ChevronRight className="text-slate-300" />
          </div>
        </div>
      </Card>

      {/* Founder B */}
      <Card className="hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate(ScreenId.FOUNDER_PROFILE)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">J</div>
            <div>
              <h3 className="text-lg font-bold">Jamie</h3>
              <p className="text-sm text-slate-500">CTO • 25h/week</p>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
              <Badge color="amber">Risk</Badge>
            </div>
            <ChevronRight className="text-slate-300" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 items-center text-sm text-slate-600">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Low time commitment (25h) conflicts with high equity demand (48%).</span>
        </div>
      </Card>
    </div>
  </div>
);

export const FounderProfileScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-5xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-full overflow-y-auto">
    {/* Main Form Area */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-6 cursor-pointer text-slate-500 hover:text-slate-800" onClick={() => onNavigate(ScreenId.FOUNDERS_LIST)}>
        <ChevronRight className="rotate-180 w-4 h-4" /> Back
      </div>
      <h2 className="text-2xl font-bold mb-2">Jamie's Commitment Profile</h2>
      <p className="text-slate-500 mb-8">Establish truth. No vibes, just data.</p>

      <div className="space-y-8">
        <section>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Role & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Primary Role</label>
              <select className="w-full p-2 border border-slate-300 rounded bg-white">
                <option>CTO / Technical Lead</option>
                <option>CEO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weekly Hours (Honest)</label>
              <div className="flex items-center gap-2">
                <input type="range" className="flex-1 accent-indigo-600" min="0" max="80" value="25" readOnly />
                <span className="font-mono bg-slate-100 px-2 py-1 rounded w-12 text-center">25h</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Financials & Risk</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cash Contribution</label>
              <input className="w-full p-2 border border-slate-300 rounded" value="$5,000" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Opportunity Cost / Yr</label>
              <input className="w-full p-2 border border-slate-300 rounded" value="$180,000" readOnly />
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Scale className="w-4 h-4" /> Expectations (Forced Choice)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Exit Expectation</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button className="p-2 border rounded text-sm hover:bg-slate-50">Quick Flip (2-3y)</button>
                <button className="p-2 border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-bold rounded text-sm">Growth (5-7y)</button>
                <button className="p-2 border rounded text-sm hover:bg-slate-50">IPO / Long (10y+)</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tolerance</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button className="p-2 border-2 border-amber-400 bg-amber-50 text-amber-800 font-bold rounded text-sm">Low (Need Salary)</button>
                <button className="p-2 border rounded text-sm hover:bg-slate-50">Medium</button>
                <button className="p-2 border rounded text-sm hover:bg-slate-50">High (All in)</button>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6 border-t pb-8">
          <Button fullWidth onClick={() => onNavigate(ScreenId.ALIGNMENT_OVERVIEW)}>Save & Analyze Alignment</Button>
        </div>
      </div>
    </div>

    {/* AI Feedback Panel */}
    <div className="w-full lg:w-80 shrink-0">
      <div className="lg:sticky lg:top-6">
        <div className="bg-slate-900 text-slate-200 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <Zap className="w-4 h-4" /> AI Detector
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <h4 className="font-bold text-white text-sm mb-1">Contradiction Detected</h4>
              <p className="text-xs leading-relaxed text-slate-400">
                Jamie selected <strong className="text-slate-200">"Low Risk Tolerance"</strong> but expects <strong className="text-slate-200">"High Equity (48%)"</strong>.
                <br /><br />
                In startups, equity is payment for risk. This profile suggests an employee mindset with a founder cap table request.
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <h4 className="font-bold text-white text-sm mb-1">Role Clarity</h4>
              <p className="text-xs leading-relaxed text-slate-400">
                Input rewritten to intent: <em className="text-slate-300">"I want to code part-time but own half the company."</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AlignmentOverviewScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const alignmentData = [
    { name: 'Alex', equity: 52, contribution: 75 },
    { name: 'Jamie', equity: 48, contribution: 25 },
  ];
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1">Alignment Overview</h2>
          <p className="text-slate-500 text-lg">Exposing the gap between expectation and reality.</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-5xl font-black text-amber-500 flex items-center gap-3 md:justify-end">
            62<span className="text-2xl text-slate-400 font-normal">%</span>
          </div>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Alignment Score</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Section */}
        <Card className="col-span-1 lg:col-span-8" title="Equity vs. Calculated Contribution">
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alignmentData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontWeight: 'bold' }} />
                <Tooltip />
                <Bar dataKey="equity" fill="#4f46e5" name="Equity %" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="contribution" fill="#10b981" name="Contribution % (AI Model)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded"></div><span className="text-sm font-medium">Equity Owned</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded"></div><span className="text-sm font-medium">Actual Contribution</span></div>
          </div>
        </Card>

        {/* AI Analysis Section */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          <AIInsightBox type="critical" title="Predicted Failure Mode">
            <span className="font-bold">Resentment by Year 2.</span>
            <p className="mt-2">Alex is contributing 75% of the value (Time + Cash + Risk) but only holding 52% of equity.</p>
            <p className="mt-2">System predicts a <strong>High Probability</strong> of equity renegotiation or breakup before Series A fundraising.</p>
          </AIInsightBox>

          <Card title="Key Friction Points">
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-700">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Jamie's "Low Risk" tolerance contradicts startup equity norms.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                <span>Time disparity (60h vs 25h) is not reflected in the 52/48 split.</span>
              </li>
            </ul>
            <Button variant="black" fullWidth className="mt-4" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Model Solutions</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const EquityModelingScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="h-full flex flex-col p-4 md:p-6 overflow-y-auto">
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
      <h2 className="text-2xl font-bold">Equity & Commitment Modeling</h2>
      <div className="text-sm text-slate-500">Changes here update the agreement draft automatically.</div>
    </div>

    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <Card title="Jamie's Parameters">
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Weekly Hours</span>
                <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">25h</span>
              </label>
              <input type="range" className="w-full accent-purple-600" min="0" max="80" defaultValue="25" />
              <p className="text-xs text-slate-400 mt-1">Dragging this to 40h improves alignment score by 15pts.</p>
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Equity Allocation</span>
                <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">48%</span>
              </label>
              <input type="range" className="w-full accent-purple-600" min="0" max="100" defaultValue="48" />
            </div>
            <div className="pt-4 border-t">
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Vesting Cliff</span>
                <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">1 Year</span>
              </label>
              <input type="range" className="w-full accent-slate-600" min="0" max="4" defaultValue="1" />
            </div>
          </div>
        </Card>
        <Card title="Alex's Parameters">
          <div className="opacity-50 pointer-events-none">
            <div className="flex justify-between text-sm mb-2"><span>Equity</span><span>52%</span></div>
            <div className="w-full bg-slate-200 h-2 rounded"><div className="bg-indigo-600 w-[52%] h-2 rounded"></div></div>
          </div>
          <div className="text-xs text-center mt-4 text-slate-400">Locked for this simulation</div>
        </Card>
      </div>

      {/* Live Consequences */}
      <div className="flex flex-col gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Scale size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-indigo-400 uppercase tracking-widest text-xs font-bold mb-2">AI Real-Time Analysis</h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
              "Giving Founder C 48% with only 25 hours/week creates a <span className="text-red-400 font-medium">dead equity risk</span>."
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white/10 rounded border border-white/10">
                <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm block">Vesting Danger</span>
                  <span className="text-xs text-slate-300">If Jamie leaves after the cliff (1 year), they walk away with 12% of the company for part-time work. This makes you uninvestable.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button variant="primary" fullWidth className="h-14 text-lg" onClick={() => onNavigate(ScreenId.SCENARIO_SIMULATOR)}>
          Test This Split in Simulator <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
);

export const ScenarioSimulatorScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-5xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Future Shock Simulator</h2>
        <p className="text-slate-500">See the pain before it happens.</p>
      </div>
      <Button variant="secondary" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Back to Model</Button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Scenario Selector */}
      <div className="col-span-1 lg:col-span-4 space-y-3">
        <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">Choose Scenario</h4>
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg cursor-pointer shadow-sm">
          <div className="font-bold text-red-900">Jamie leaves after 14 months</div>
          <div className="text-xs text-red-700 mt-1">Post-cliff departure</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 opacity-60">
          <div className="font-bold text-slate-800">Series A Dilution (20%)</div>
          <div className="text-xs text-slate-500 mt-1">Impact on control</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 opacity-60">
          <div className="font-bold text-slate-800">Early Acquisition ($5M)</div>
          <div className="text-xs text-slate-500 mt-1">Cash out analysis</div>
        </div>
      </div>

      {/* Results */}
      <div className="col-span-1 lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Equity Impact">
            <div className="text-4xl font-bold text-slate-800 mb-1">12%</div>
            <p className="text-sm text-slate-500 mb-3">Dead Equity on Cap Table</p>
            <div className="w-full bg-slate-100 h-2 rounded mb-2"><div className="bg-slate-400 w-[12%] h-2 rounded"></div></div>
            <p className="text-xs text-slate-400">Owned by Jamie (outsider)</p>
          </Card>
          <Card title="Emotional Risk">
            <div className="text-4xl font-bold text-red-600 mb-1">Critical</div>
            <p className="text-sm text-slate-500 mb-3">Conflict Probability</p>
            <div className="flex gap-1">
              <div className="h-2 w-full bg-red-500 rounded"></div>
              <div className="h-2 w-full bg-red-500 rounded"></div>
              <div className="h-2 w-full bg-red-500 rounded"></div>
            </div>
          </Card>
        </div>

        <AIInsightBox type="insight" title="AI Narrative">
          <p className="mb-2"><strong>Who gets upset?</strong> You (Alex).</p>
          <p className="mb-2"><strong>Why?</strong> You will be working 60h/week for the next 5 years, while Jamie holds 12% of the company for working part-time for one year.</p>
          <p className="text-slate-600 italic">"This creates a cap table structure that most Series A investors will reject, forcing a painful recapitalization."</p>
        </AIInsightBox>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={() => onNavigate(ScreenId.EQUITY_MODELING)}>Fix the Split</Button>
          <Button variant="primary" onClick={() => onNavigate(ScreenId.LOCK_ALIGNMENT)}>I Accept the Risk</Button>
        </div>
      </div>
    </div>
  </div>
);

export const LockAlignmentScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto mt-8 pb-12 p-6">
    <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-4">
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
);

export const AlignmentHistoryScreen: React.FC<ScreenProps> = ({ onNavigate }) => (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Version History</h2>
    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
      {[
        { date: 'Today, 10:30 AM', score: 78, warning: 'Time commitment mismatch', current: true },
        { date: 'Jan 8, 2026', score: 65, warning: 'Exit timing misalignment', current: false },
        { date: 'Jan 1, 2026', score: 40, warning: 'Initial Draft', current: false }
      ].map((item, i) => (
        <div key={i} className="pl-8 relative">
          <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${item.current ? 'bg-indigo-600 ring-2 ring-indigo-100' : 'bg-slate-300'}`}></div>
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800">{item.date}</span>
              <Badge color={item.score > 70 ? 'green' : 'amber'}>Score: {item.score}%</Badge>
            </div>
            {item.warning && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <AlertTriangle className="w-4 h-4" /> {item.warning}
              </div>
            )}
            <div className="mt-3">
              <Button variant="ghost" className="px-0 text-indigo-600 text-xs">Compare Version</Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </div>
);
