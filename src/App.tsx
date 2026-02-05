import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ScanProgress from './components/ScanProgress';
import Results from './components/Results';

type View = 'scanner' | 'scanning' | 'results';

function App() {
  const [view, setView] = useState<View>('scanner');
  const [scannedUrl, setScannedUrl] = useState('');

  const handleScan = (url: string) => {
    // Normalize URL display
    let displayUrl = url;
    if (!displayUrl.startsWith('http')) {
      displayUrl = `https://${displayUrl}`;
    }
    setScannedUrl(displayUrl);
    setView('scanning');
  };

  const handleScanComplete = useCallback(() => {
    setView('results');
  }, []);

  const handleReset = () => {
    setView('scanner');
    setScannedUrl('');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <AnimatePresence mode="wait">
        {view === 'scanner' && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Scanner onScan={handleScan} />
          </motion.div>
        )}
        {view === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScanProgress url={scannedUrl} onComplete={handleScanComplete} />
          </motion.div>
        )}
        {view === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Results url={scannedUrl} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
