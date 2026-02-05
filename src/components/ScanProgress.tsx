import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { scanSteps } from '../data/mockIssues';

interface ScanProgressProps {
  url: string;
  onComplete: () => void;
}

export default function ScanProgress({ url, onComplete }: ScanProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    const totalDuration = scanSteps.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    progressInterval = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
    }, 50);

    const advanceStep = (step: number) => {
      if (step >= scanSteps.length) {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(onComplete, 500);
        return;
      }
      setCurrentStep(step);
      timeout = setTimeout(() => advanceStep(step + 1), scanSteps[step].duration);
    };

    advanceStep(0);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto text-center"
      >
        {/* Scanning animation */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-pulse-ring" />
          <div
            className="absolute inset-2 rounded-full border-2 border-cyan-500/30 animate-pulse-ring"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="absolute inset-4 rounded-full border-2 border-cyan-500/40 animate-pulse-ring"
            style={{ animationDelay: '1s' }}
          />
          {/* Center circle */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          </div>
          {/* Radar sweep */}
          <div className="absolute inset-0 animate-radar">
            <div className="w-1/2 h-px bg-gradient-to-r from-cyan-400 to-transparent absolute top-1/2 left-1/2" />
          </div>
        </div>

        {/* URL */}
        <p className="text-slate-400 text-sm mb-2">Scanning</p>
        <p className="text-white font-mono text-lg mb-8 truncate px-4">{url}</p>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3 text-left">
          <AnimatePresence mode="popLayout">
            {scanSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: i <= currentStep ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                {i < currentStep ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : i === currentStep ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    i < currentStep
                      ? 'text-emerald-400'
                      : i === currentStep
                      ? 'text-white'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
