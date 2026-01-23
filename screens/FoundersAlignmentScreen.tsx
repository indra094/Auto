import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Card, Button, Badge } from "../components/UI";

export const FoundersAlignmentScreen: React.FC = () => {
  const alignmentScore = 68;

  const factors = [
    { label: "Time Commitment", score: 52, warn: true },
    { label: "Equity Balance", score: 81, warn: false },
    { label: "Role Clarity", score: 61, warn: true },
    { label: "Decision Authority", score: 78, warn: false },
  ];

  const founders = [
    {
      name: "Alice",
      role: "CEO",
      time: "40h",
      equity: "55%",
      authority: "Final",
      warn: false,
    },
    {
      name: "Bob",
      role: "CTO",
      time: "15h",
      equity: "45%",
      authority: "Shared",
      warn: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Founders & Alignment
          </h1>
          <p className="text-slate-500 mt-2">
            Measures execution risk caused by founder structure
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Last updated: Today • Powered by Foundry AI
        </div>
      </header>

      {/* Alignment Score */}
      <Card className="p-10 text-center">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
          Alignment Score
        </div>
        <div className="text-7xl font-black text-slate-900 mb-2">
          {alignmentScore}
        </div>
        <div className="text-amber-600 font-semibold mb-4">
          Moderate Alignment Risk
        </div>
        <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed">
          Teams show uneven commitment and unclear authority, which may slow
          execution and reduce investor confidence.
        </p>
        <div className="mt-6 h-1 w-24 mx-auto bg-amber-400 rounded-full" />
      </Card>

      {/* Factor Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {factors.map((f) => (
          <Card key={f.label} className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700">
                {f.label}
              </span>
              {f.warn && (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-2xl font-black text-slate-900 mb-2">
              {f.score}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${f.warn ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                style={{ width: `${f.score}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Visual Model + Founder Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Alignment Model */}
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
            Execution Risk Model
          </div>

          <div className="relative w-48 h-48 rounded-full border-8 border-slate-200 flex items-center justify-center">
            <div className="text-center">
              <div className="font-black text-lg text-slate-800">
                Medium
              </div>
              <div className="text-xs text-slate-500">
                Execution Risk
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-6 max-w-xs">
            Time imbalance contributes most to execution risk.
          </p>
        </Card>

        {/* Founder Table */}
        <Card className="p-8">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
            Founders
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b">
                <th className="pb-2">Name</th>
                <th>Role</th>
                <th>Time</th>
                <th>Equity</th>
                <th>Authority</th>
              </tr>
            </thead>
            <tbody>
              {founders.map((f) => (
                <tr
                  key={f.name}
                  className="border-b last:border-b-0"
                >
                  <td className="py-3 font-medium text-slate-800">
                    {f.name}
                    {f.warn && (
                      <AlertTriangle className="inline w-4 h-4 text-amber-500 ml-1" />
                    )}
                  </td>
                  <td>{f.role}</td>
                  <td>{f.time}</td>
                  <td>{f.equity}</td>
                  <td>
                    {f.authority}
                    {f.warn && (
                      <span className="text-amber-500 ml-1">⚠️</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Risks */}
      <Card className="p-6 border-l-4 border-red-500 bg-transparent">
        <h3 className="font-bold text-slate-800 mb-2">
          Alignment Risks Identified
        </h3>
        <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
          <li>CTO holds near-equal equity but is part-time</li>
          <li>No single owner for product decisions</li>
          <li>Commitment does not match ownership structure</li>
        </ul>
      </Card>

      {/* AI Insight */}
      <Card className="p-6 bg-slate-50">
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-slate-500 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800 mb-1">
              Foundry AI Insight
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Teams with part-time technical founders and unclear authority
              frequently face execution delays and fundraising pushback.
              Investors often request restructuring before proceeding.
            </p>
          </div>
        </div>
      </Card>

      {/* Recommended Actions */}
      <Card className="p-8">
        <h3 className="font-bold text-slate-900 mb-4">
          Recommended Actions
        </h3>
        <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
          <li>
            Increase CTO commitment to ≥30 hrs/week{" "}
            <Badge>High Impact</Badge>
          </li>
          <li>
            Adjust equity to reflect time contribution{" "}
            <Badge>High Impact</Badge>
          </li>
          <li>
            Assign final product decision authority{" "}
            <Badge>Medium Impact</Badge>
          </li>
        </ol>

        <div className="mt-6">
          <Button className="flex items-center gap-2">
            Simulate Changes <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
