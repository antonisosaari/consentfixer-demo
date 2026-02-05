import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all backdrop-blur-sm"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          borderRadius: '0.75rem',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
          background: '#1a1f2e',
        }}
        showLineNumbers
        lineNumberStyle={{
          color: '#4a5568',
          fontSize: '0.75rem',
          paddingRight: '1rem',
          minWidth: '2rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
