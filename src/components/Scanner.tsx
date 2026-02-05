import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Shield, AlertTriangle } from 'lucide-react';

interface ScannerProps {
  onScan: (url: string) => void;
}

export default function Scanner({ onScan }: ScannerProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url.trim());
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        {/* Glowing orb behind title */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full scale-150" />
          <Shield className="relative w-16 h-16 text-cyan-400 mx-auto" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Fix your{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            consent mode
          </span>
          <br />
          in minutes, not weeks
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered auditing that finds Google Consent Mode v2 issues
          and generates production-ready fix code instantly.
        </p>
      </motion.div>

      {/* Search form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto mb-16"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
          <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
            <Search className="w-5 h-5 text-slate-500 ml-5 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL to scan..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-4.5 text-lg outline-none"
            />
            <button
              type="submit"
              disabled={!url.trim()}
              className="mr-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
            >
              Scan
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-slate-500 mt-3">
          Try: example.com, mystore.fi, or any website URL
        </p>
      </motion.form>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
      >
        {[
          { icon: Zap, label: 'Consent Mode v2', desc: 'Full compliance check' },
          { icon: AlertTriangle, label: '6+ Issue Types', desc: 'GTM, CMP, tags & more' },
          { icon: Shield, label: 'Auto-Fix Code', desc: 'Copy-paste ready' },
        ].map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/30 rounded-xl px-4 py-3"
          >
            <Icon className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-sm font-medium text-white">{label}</div>
              <div className="text-xs text-slate-500">{desc}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
