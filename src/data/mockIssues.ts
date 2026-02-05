export type Severity = 'critical' | 'warning' | 'info';

export interface Issue {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  fixLabel: string;
  fixCode: string;
  language: string;
}

export const mockIssues: Issue[] = [
  {
    id: 'consent-mode-init',
    severity: 'critical',
    title: 'Google Consent Mode v2 not initialized before tags fire',
    description:
      'The default consent state is not set before the GTM container loads. This means tags fire with full tracking before any consent is collected, violating GDPR and the Digital Markets Act (DMA) requirements.',
    fixLabel: 'Add before GTM container in <head>',
    language: 'javascript',
    fixCode: `// Add this BEFORE the GTM container snippet in <head>
<script>
  // Set default consent state - MUST load before GTM
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  // Enable URL passthrough for conversion modeling
  gtag('set', 'url_passthrough', true);

  // Enable ads data redaction when consent is denied
  gtag('set', 'ads_data_redaction', true);
</script>
<!-- GTM container loads AFTER this -->`,
  },
  {
    id: 'ga4-consent-params',
    severity: 'critical',
    title: 'GA4 configuration tag missing consent_mode parameters',
    description:
      'The GA4 configuration tag (G-XXXXXXX) does not include consent mode parameters. Google requires these for proper consent signal handling and conversion modeling in the EEA.',
    fixLabel: 'Update GA4 config in GTM',
    language: 'javascript',
    fixCode: `// GA4 Config Tag - Update in GTM
// Tag Type: Google Analytics: GA4 Configuration
// Add these fields under 'Fields to Set':

// Field: consent_mode → value: true
// Field: send_page_view → value: true

// OR use Custom HTML tag:
<script>
  gtag('config', 'G-XXXXXXX', {
    'send_page_view': true,
    'cookie_flags': 'SameSite=None;Secure',
    'cookie_domain': 'auto',
    'cookie_expires': 63072000,
    // Consent-aware configuration
    'restricted_data_processing': true
  });
</script>`,
  },
  {
    id: 'cmp-loading-order',
    severity: 'critical',
    title: 'Cookie banner loads after GTM container',
    description:
      'The Consent Management Platform (CMP) script loads asynchronously and initializes 800–1200ms after the GTM container. During this window, tags fire without consent, creating a compliance gap.',
    fixLabel: 'Correct loading order in <head>',
    language: 'html',
    fixCode: `<!-- CORRECT loading order in <head> -->

<!-- 1. First: Default consent state (deny all) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>

<!-- 2. Then: CMP script (synchronous or high-priority) -->
<script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
  data-domain-script="your-domain-id"
  data-dlayer-name="dataLayer"></script>

<!-- 3. Last: GTM container -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>`,
  },
  {
    id: 'missing-v2-params',
    severity: 'warning',
    title: 'Missing default consent state for ad_user_data and ad_personalization',
    description:
      'Consent Mode v2 requires two additional consent types: ad_user_data and ad_personalization. These are missing from your default consent state, which may cause Google Ads conversion tracking to stop working after March 2024.',
    fixLabel: 'Update consent default',
    language: 'javascript',
    fixCode: `// Update your existing consent default to include v2 parameters:
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',        // NEW in v2
  'ad_personalization': 'denied',  // NEW in v2
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted'
});

// When user grants consent, update ALL relevant types:
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',        // Must be explicitly updated
  'ad_personalization': 'granted',  // Must be explicitly updated
  'analytics_storage': 'granted'
});`,
  },
  {
    id: 'tags-no-consent-trigger',
    severity: 'warning',
    title: 'Tags firing on page load without consent check trigger',
    description:
      '4 tags are configured with the "All Pages" trigger instead of a consent-aware trigger. These tags fire immediately on page load regardless of the user\'s consent state.',
    fixLabel: 'GTM trigger configuration',
    language: 'javascript',
    fixCode: `// GTM Trigger Configuration:
// 1. Create a Custom Event Trigger:
//    Trigger Name: "Consent Granted - Analytics"
//    Trigger Type: Custom Event
//    Event Name: consent_update
//    Condition: analytics_storage equals "granted"

// 2. Or use the built-in Consent Initialization trigger:
//    Go to Triggers → New → Consent Initialization
//    This fires before All Pages but after consent defaults

// 3. DataLayer push from your CMP callback:
window.addEventListener('CookiebotOnAccept', function() {
  if (Cookiebot.consent.statistics) {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  if (Cookiebot.consent.marketing) {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }
});`,
  },
  {
    id: 'no-debug-mode',
    severity: 'info',
    title: 'No consent mode debugging enabled',
    description:
      'Google Tag Assistant and consent mode debug mode are not enabled, making it difficult to verify that consent signals are being sent correctly.',
    fixLabel: 'Add debug mode (staging only)',
    language: 'javascript',
    fixCode: `// Add to your development/staging environment:
gtag('consent', 'default', {
  // ... your consent defaults ...
});

// Enable debug mode (remove in production)
if (location.hostname === 'staging.example.com' ||
    location.search.includes('debug=true')) {
  window.dataLayer.push({
    'event': 'gtm.debug',
    'gtm.uniqueEventId': 0
  });
}

// Console logging for consent state changes
if (window.google_tag_data) {
  console.log('Current consent state:',
    window.google_tag_data.ics.entries);
}

// Tag Assistant URL parameter for debugging:
// Add ?gtm_debug=x to your URL to activate`,
  },
];

export const scanSteps = [
  { label: 'Connecting to website...', duration: 800 },
  { label: 'Analyzing GTM container...', duration: 1200 },
  { label: 'Checking Consent Mode initialization...', duration: 1000 },
  { label: 'Evaluating tag firing sequence...', duration: 1400 },
  { label: 'Reviewing cookie banner timing...', duration: 900 },
  { label: 'Auditing consent parameters...', duration: 1100 },
  { label: 'Generating fix recommendations...', duration: 1500 },
];
