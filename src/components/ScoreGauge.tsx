import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  beforeScore: number;
  afterScore: number;
}

export default function ScoreGauge({ beforeScore, afterScore }: ScoreGaugeProps) {
  const [displayBefore, setDisplayBefore] = useState(0);
  const [displayAfter, setDisplayAfter] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    // Animate "before" score
    let frame: number;
    const startTime = Date.now();
    const duration = 1200;

    const animateBefore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayBefore(Math.round(eased * beforeScore));

      if (progress < 1) {
        frame = requestAnimationFrame(animateBefore);
      } else {
        // After before animation, start after animation
        setTimeout(() => {
          setShowAfter(true);
          const afterStart = Date.now();
          const animateAfter = () => {
            const elapsed2 = Date.now() - afterStart;
            const progress2 = Math.min(elapsed2 / 1500, 1);
            const eased2 = 1 - Math.pow(1 - progress2, 3);
            setDisplayAfter(Math.round(eased2 * afterScore));
            if (progress2 < 1) {
              requestAnimationFrame(animateAfter);
            }
          };
          requestAnimationFrame(animateAfter);
        }, 600);
      }
    };

    frame = requestAnimationFrame(animateBefore);
    return () => cancelAnimationFrame(frame);
  }, [beforeScore, afterScore]);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const beforeDash = (displayBefore / 100) * circumference;
  const afterDash = (displayAfter / 100) * circumference;

  const getColor = (score: number) => {
    if (score < 40) return { stroke: '#ef4444', text: 'text-red-400', bg: 'from-red-500/10' };
    if (score < 70) return { stroke: '#f59e0b', text: 'text-amber-400', bg: 'from-amber-500/10' };
    return { stroke: '#22c55e', text: 'text-emerald-400', bg: 'from-emerald-500/10' };
  };

  const beforeColor = getColor(displayBefore);
  const afterColor = getColor(displayAfter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/40 border border-slate-700/30 rounded-2xl p-6 sm:p-8"
    >
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6 text-center">
        Compliance Score
      </h3>
      <div className="flex items-center justify-center gap-6 sm:gap-12">
        {/* Before */}
        <div className="text-center">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke={beforeColor.stroke}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - beforeDash}
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl sm:text-4xl font-bold ${beforeColor.text}`}>
                {displayBefore}
              </span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">Current</p>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showAfter ? 1 : 0.3, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <svg width="40" height="20" viewBox="0 0 40 20" className="text-cyan-400">
            <path
              d="M0 10 H32 M26 4 L34 10 L26 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] text-cyan-400 font-medium">AFTER FIX</span>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: showAfter ? 1 : 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
              {showAfter && (
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke={afterColor.stroke}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - afterDash}
                  className="transition-all duration-100"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl sm:text-4xl font-bold ${showAfter ? afterColor.text : 'text-slate-600'}`}>
                {showAfter ? displayAfter : '—'}
              </span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">After Fix</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
