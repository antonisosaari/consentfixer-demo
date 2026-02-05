import { motion } from 'framer-motion';
import { Download, ArrowLeft, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import IssueCard from './IssueCard';
import { mockIssues } from '../data/mockIssues';

interface ResultsProps {
  url: string;
  onReset: () => void;
}

export default function Results({ url, onReset }: ResultsProps) {
  const criticalCount = mockIssues.filter((i) => i.severity === 'critical').length;
  const warningCount = mockIssues.filter((i) => i.severity === 'warning').length;
  const infoCount = mockIssues.filter((i) => i.severity === 'info').length;

  const handleDownload = () => {
    const allFixes = mockIssues
      .map(
        (issue) =>
          `// ========================================\n// Fix: ${issue.title}\n// Severity: ${issue.severity.toUpperCase()}\n// ${issue.fixLabel}\n// ========================================\n\n${issue.fixCode}\n\n`
      )
      .join('\n');

    const blob = new Blob([allFixes], { type: 'text/plain' });
    const dlUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = dlUrl;
    a.download = 'consentfixer-fixes.txt';
    a.click();
    URL.revokeObjectURL(dlUrl);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <button
            onClick={onReset}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Scan Results</h1>
            <p className="text-slate-500 text-sm truncate max-w-md">{url}</p>
          </div>
        </motion.div>

        {/* Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ScoreGauge beforeScore={23} afterScore={94} />
        </motion.div>

        {/* Severity summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">
              {criticalCount} Critical
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              {warningCount} Warnings
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              {infoCount} Info
            </span>
          </div>
        </motion.div>

        {/* Issues list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Issues Found ({mockIssues.length})
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download All Fixes
            </motion.button>
          </div>

          <div className="space-y-3">
            {mockIssues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-slate-600 text-sm pb-8"
        >
          <p>ConsentFixer • Consent Mode v2 Compliance Audit Tool</p>
        </motion.div>
      </div>
    </div>
  );
}
