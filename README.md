# 🛡️ ConsentFixer — AI Consent Mode Auditing

**ConsentFixer** is an AI-powered tool that audits website consent mode setups and generates production-ready fix code. Enter any website URL and get an instant compliance report with copy-paste fixes.

> ⚠️ **This is a UI demo/prototype** — scanning uses simulated data to demonstrate the product concept.

## What It Does

1. **Scan** — Enter a website URL to audit
2. **Analyze** — AI checks GTM container, consent mode initialization, tag firing sequence, cookie banner timing, and more
3. **Report** — See a compliance score (before → after) with detailed issue breakdowns
4. **Fix** — Get production-ready code snippets for each issue (GTM tags, consent mode init, CMP configuration)

## Issues Detected

| Severity | Issue |
|----------|-------|
| 🔴 Critical | Consent Mode v2 not initialized before tags fire |
| 🔴 Critical | GA4 tag missing consent_mode parameters |
| 🔴 Critical | Cookie banner loads after GTM container |
| 🟡 Warning | Missing `ad_user_data` and `ad_personalization` defaults |
| 🟡 Warning | Tags firing on page load without consent trigger |
| 🔵 Info | No consent mode debugging enabled |

Each issue includes the actual fix code — real GTM snippets, consent mode initialization code, and CMP callback handlers.

## Quick Start

```bash
npm install && npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

## Tech Stack

- **React 19** + TypeScript
- **Vite 7** for build/dev
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **React Syntax Highlighter** for code blocks
- **Lucide React** for icons

## Project Structure

```
src/
├── App.tsx                     # Main app with view state
├── components/
│   ├── Header.tsx              # Logo + nav bar
│   ├── Scanner.tsx             # URL input + hero section
│   ├── ScanProgress.tsx        # Animated scanning progress
│   ├── Results.tsx             # Results container
│   ├── ScoreGauge.tsx          # Animated compliance score circles
│   ├── IssueCard.tsx           # Expandable issue card
│   └── CodeBlock.tsx           # Syntax-highlighted code with copy
├── data/
│   └── mockIssues.ts           # Realistic mock audit data
└── index.css                   # Tailwind + custom animations
```

## License

Private — demo purposes only.
