import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Shield className="w-7 h-7 text-cyan-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Consent</span>
            <span className="text-cyan-400">Fixer</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-slate-400">AI-Powered Consent Auditing</span>
          <div className="h-5 w-px bg-slate-700 hidden sm:block" />
          <span className="text-xs bg-cyan-400/10 text-cyan-400 px-2.5 py-1 rounded-full font-medium">
            Beta
          </span>
        </div>
      </div>
    </motion.header>
  );
}
