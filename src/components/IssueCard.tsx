import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { Issue } from '../data/mockIssues';
import CodeBlock from './CodeBlock';

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    label: 'Critical',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    badge: 'bg-red-500/20 text-red-400',
    iconColor: 'text-red-400',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-400',
    iconColor: 'text-amber-400',
  },
  info: {
    icon: Info,
    label: 'Info',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-400',
    iconColor: 'text-blue-400',
  },
};

export default function IssueCard({ issue, index }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = severityConfig[issue.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-2xl border ${config.border} ${config.bg} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
      >
        <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-base leading-snug">
            {issue.title}
          </h4>
          <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
            {issue.description}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-700/50" />
            <span className="text-xs text-slate-500 font-medium">{issue.fixLabel}</span>
            <div className="h-px flex-1 bg-slate-700/50" />
          </div>
          <CodeBlock code={issue.fixCode} language={issue.language} />
        </div>
      </motion.div>
    </motion.div>
  );
}
