import {
  SocialAccountThreat,
  RogueMobileAppThreat,
  PhishingDomainThreat,
  LogoSimilarityCase,
  ThreatGraphNode,
  ThreatGraphEdge,
  BrandProtectionProfile
} from '../types/drp';

export const DEFAULT_BRAND_PROFILE: BrandProtectionProfile = {
  brandName: 'ApexPay Global',
  officialDomain: 'apexpay.com',
  officialHandles: {
    twitter: '@ApexPayHQ',
    instagram: '@apexpay_official',
    linkedin: 'apexpay-technologies',
    facebook: 'ApexPayOfficial'
  },
  executivesToProtect: [
    { name: 'Elena Vance', title: 'Chief Executive Officer', officialHandle: '@elena_vance_ceo' },
    { name: 'Marcus Chen', title: 'Chief Technology Officer', officialHandle: '@marcus_chen_tech' },
    { name: 'David Ross', title: 'VP of Customer Security', officialHandle: '@dross_apexpay' }
  ],
  monitoredKeywords: ['ApexPay', 'Apex Wallet', 'ApexPay Helpdesk', 'Apex Token', 'Apex Support']
};

export const MOCK_SOCIAL_THREATS: SocialAccountThreat[] = [
  {
    id: 'soc-01',
    brandTarget: 'ApexPay Global',
    executiveTarget: 'Elena Vance (CEO)',
    platform: 'twitter',
    handle: '@elena_vance_ce0',
    profileName: 'Elena Vance [Official ApexPay]',
    followerCount: 3410,
    followingCount: 18,
    accountAgeDays: 4,
    impersonationScore: 98,
    detectionEngine: 'CISPA-Brand-Impersonator',
    indicators: {
      avatarCloned: true,
      homoglyphHandle: true,
      bioKeywordsMatched: ['CEO', 'ApexPay Global', 'Direct Message for Private Equity Allocation'],
      dmSolicitationDetected: true,
      cryptoWalletAdvertised: true
    },
    samplePost: 'We are granting 25 VIP beta allocations for ApexPay Institutional Treasury. Send DM to verify your corporate wallet address.',
    detectedAt: '22 minutes ago',
    status: 'active',
    severity: 'critical',
    profileUrl: 'https://twitter.com/elena_vance_ce0'
  },
  {
    id: 'soc-02',
    brandTarget: 'ApexPay Global',
    platform: 'telegram',
    handle: '@ApexPay_Support_Desk_Official',
    profileName: 'ApexPay Customer Care Portal',
    followerCount: 14200,
    followingCount: 0,
    accountAgeDays: 12,
    impersonationScore: 94,
    detectionEngine: 'CISPA-Brand-Impersonator',
    indicators: {
      avatarCloned: true,
      homoglyphHandle: false,
      bioKeywordsMatched: ['Official Support', '24/7 Live Desk', 'Refund Dispute Resolution'],
      dmSolicitationDetected: true,
      cryptoWalletAdvertised: false
    },
    samplePost: 'Welcome to ApexPay 24/7 Fast Helpdesk. If your transaction is paused, submit your seed phrase or session recovery key here.',
    detectedAt: '1 hour ago',
    status: 'investigating',
    severity: 'critical',
    profileUrl: 'https://t.me/ApexPay_Support_Desk_Official'
  },
  {
    id: 'soc-03',
    brandTarget: 'ApexPay Global',
    platform: 'instagram',
    handle: '@apexpay.giveaways',
    profileName: 'ApexPay Anniversary Rewards',
    followerCount: 8900,
    followingCount: 120,
    accountAgeDays: 9,
    impersonationScore: 89,
    detectionEngine: 'Heuristic-NLP',
    indicators: {
      avatarCloned: true,
      homoglyphHandle: false,
      bioKeywordsMatched: ['Free Rewards', 'Claim $500 Bonus', 'Apex Anniversary'],
      dmSolicitationDetected: false,
      cryptoWalletAdvertised: true
    },
    samplePost: 'Tap link in bio to claim your $500 ApexPay Community Grant before midnight! First 1,000 users only.',
    detectedAt: '4 hours ago',
    status: 'takedown_requested',
    severity: 'high',
    profileUrl: 'https://instagram.com/apexpay.giveaways'
  },
  {
    id: 'soc-04',
    brandTarget: 'ApexPay Global',
    executiveTarget: 'Marcus Chen (CTO)',
    platform: 'linkedin',
    handle: 'in/marcus-chen-apexpay-recruitment',
    profileName: 'Marcus Chen (Hiring Director)',
    followerCount: 420,
    followingCount: 890,
    accountAgeDays: 18,
    impersonationScore: 82,
    detectionEngine: 'CISPA-Brand-Impersonator',
    indicators: {
      avatarCloned: true,
      homoglyphHandle: false,
      bioKeywordsMatched: ['ApexPay CTO', 'Engineering Recruitment', 'Contract Interviews'],
      dmSolicitationDetected: true,
      cryptoWalletAdvertised: false
    },
    samplePost: 'Now hiring Senior Go & Rust engineers for ApexPay US & EU. Please download the technical assessment repo zip from our secure server.',
    detectedAt: '7 hours ago',
    status: 'active',
    severity: 'high',
    profileUrl: 'https://linkedin.com/in/marcus-chen-apexpay-recruitment'
  },
  {
    id: 'soc-05',
    brandTarget: 'ApexPay Global',
    platform: 'tiktok',
    handle: '@apexpay_glitch_method',
    profileName: 'ApexPay Cashout Hack',
    followerCount: 28500,
    followingCount: 34,
    accountAgeDays: 5,
    impersonationScore: 88,
    detectionEngine: 'Heuristic-NLP',
    indicators: {
      avatarCloned: false,
      homoglyphHandle: false,
      bioKeywordsMatched: ['Cashout Glitch', 'Infinite Balance', 'Telegram in Bio'],
      dmSolicitationDetected: false,
      cryptoWalletAdvertised: true
    },
    samplePost: 'Working 2026 ApexPay balance duplicate glitch before patch! Link in bio.',
    detectedAt: '14 hours ago',
    status: 'resolved',
    severity: 'medium',
    profileUrl: 'https://tiktok.com/@apexpay_glitch_method'
  }
];

export const MOCK_MOBILE_APP_THREATS: RogueMobileAppThreat[] = [
  {
    id: 'apk-01',
    appName: 'ApexPay Pro: Quick Transfer',
    brandTarget: 'ApexPay Global',
    packageName: 'com.apexpay.security.transfer.pro',
    platform: 'android',
    sourceStore: 'APKPure',
    version: '2.14.0',
    sha256: '9f83a48e89cf21e90b8fbc0451a9a888c3e8a4bb2909403a451fa1202ce20419',
    downloadsEstimated: 42000,
    suspicionScore: 97,
    detectionEngine: 'YARA-Signature-Engine',
    permissionsRisk: [
      'android.permission.BIND_ACCESSIBILITY_SERVICE',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.RECEIVE_SMS',
      'android.permission.READ_PHONE_STATE'
    ],
    yaraRuleMatched: 'Suspicious_Bank_Overlay_APK (v2.4)',
    indicators: {
      signatureMismatch: true,
      accessibilityOverlayAbuse: true,
      smsInterceptor: true,
      contactsHarvesting: true,
      counterfeitIcon: true
    },
    detectedAt: '35 minutes ago',
    status: 'active',
    severity: 'critical',
    downloadUrl: 'https://apkpure.example/apk/com.apexpay.security.transfer.pro'
  },
  {
    id: 'apk-02',
    appName: 'Apex Wallet - Crypto & Fiat',
    brandTarget: 'ApexPay Global',
    packageName: 'io.apexwallet.mobile.fiat',
    platform: 'android',
    sourceStore: 'Aptoide',
    version: '1.0.8',
    sha256: 'a12bc9038411d9e238fa0993bcda90192849182390abc45901239857182903fe',
    downloadsEstimated: 12500,
    suspicionScore: 91,
    detectionEngine: 'APK-Manifest-Parser',
    permissionsRisk: [
      'android.permission.RECORD_AUDIO',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.REQUEST_INSTALL_PACKAGES'
    ],
    yaraRuleMatched: 'Fake_Crypto_Keylogger_Droid',
    indicators: {
      signatureMismatch: true,
      accessibilityOverlayAbuse: false,
      smsInterceptor: false,
      contactsHarvesting: true,
      counterfeitIcon: true
    },
    detectedAt: '3 hours ago',
    status: 'investigating',
    severity: 'high',
    downloadUrl: 'https://aptoide.example/app/io.apexwallet.mobile.fiat'
  },
  {
    id: 'apk-03',
    appName: 'ApexPay Merchant Gateway',
    brandTarget: 'ApexPay Global',
    packageName: 'com.apexpay.merchant.pos.terminal',
    platform: 'android',
    sourceStore: 'Telegram Channel',
    version: '3.0.1-mod',
    sha256: 'c891029381029384910293849102938491029384910293849102938491029384',
    downloadsEstimated: 3100,
    suspicionScore: 99,
    detectionEngine: 'OWASP-ZAP-Static-AST',
    permissionsRisk: [
      'android.permission.BIND_ACCESSIBILITY_SERVICE',
      'android.permission.READ_PRIVILEGED_PHONE_STATE',
      'android.permission.SEND_SMS'
    ],
    yaraRuleMatched: 'Banking_Anubis_Fork_2026',
    indicators: {
      signatureMismatch: true,
      accessibilityOverlayAbuse: true,
      smsInterceptor: true,
      contactsHarvesting: true,
      counterfeitIcon: true
    },
    detectedAt: '5 hours ago',
    status: 'takedown_requested',
    severity: 'critical',
    downloadUrl: 'https://t.me/modded_apks/9182'
  },
  {
    id: 'apk-04',
    appName: 'Apex Authenticator 2FA',
    brandTarget: 'ApexPay Global',
    packageName: 'org.apexauth.twofactor.vault',
    platform: 'android',
    sourceStore: 'Unknown APK',
    version: '1.2.0',
    sha256: '550e8400e29b41d4a716446655440000a2938471928374918273918273918273',
    downloadsEstimated: 1800,
    suspicionScore: 78,
    detectionEngine: 'YARA-Signature-Engine',
    permissionsRisk: [
      'android.permission.CAMERA',
      'android.permission.INTERNET'
    ],
    indicators: {
      signatureMismatch: true,
      accessibilityOverlayAbuse: false,
      smsInterceptor: false,
      contactsHarvesting: false,
      counterfeitIcon: true
    },
    detectedAt: '1 day ago',
    status: 'resolved',
    severity: 'medium',
    downloadUrl: 'https://apk-mirrors-untrusted.com/apex-auth.apk'
  }
];

export const MOCK_PHISHING_DOMAINS: PhishingDomainThreat[] = [
  {
    id: 'dom-01',
    domainName: 'apexpay-verify-auth.com',
    brandTarget: 'ApexPay Global',
    technique: 'combosquatting',
    detectionEngine: 'OpenBPL',
    registrar: 'NameCheap, Inc.',
    hostingProvider: 'Cloudflare / Bulletproof Offshore Hosting',
    ipAddress: '185.220.101.44',
    nameservers: ['ns1.offshore-dns.net', 'ns2.offshore-dns.net'],
    dnsMxRecord: true,
    sslIssuer: "Let's Encrypt Authority X3",
    heuristicScore: 96,
    targetedUrl: 'https://apexpay-verify-auth.com/login/auth-session.php',
    detectedAt: '15 minutes ago',
    status: 'active',
    severity: 'critical'
  },
  {
    id: 'dom-02',
    domainName: 'xn--apepay-p1a.com (apеxpay.com with Cyrillic e)',
    brandTarget: 'ApexPay Global',
    technique: 'homoglyph_punycode',
    detectionEngine: 'OpenBPL',
    registrar: 'Tucows Domains Inc.',
    hostingProvider: 'Fastly Edge CDN',
    ipAddress: '198.51.100.12',
    nameservers: ['dns1.p04.nsone.net', 'dns2.p04.nsone.net'],
    dnsMxRecord: false,
    sslIssuer: 'ZeroSSL CA',
    heuristicScore: 98,
    targetedUrl: 'https://xn--apepay-p1a.com/portal/2fa-confirm',
    detectedAt: '45 minutes ago',
    status: 'investigating',
    severity: 'critical'
  },
  {
    id: 'dom-03',
    domainName: 'apex-pay-support-ticket.net',
    brandTarget: 'ApexPay Global',
    technique: 'typosquatting',
    detectionEngine: 'ML-URL-RandomForest',
    registrar: 'Dynadot LLC',
    hostingProvider: 'DigitalOcean LLC',
    ipAddress: '167.99.142.19',
    nameservers: ['ns1.dynadot.com', 'ns2.dynadot.com'],
    dnsMxRecord: true,
    sslIssuer: 'cPanel Inc Certification Authority',
    heuristicScore: 88,
    targetedUrl: 'https://apex-pay-support-ticket.net/submit-complaint',
    detectedAt: '2 hours ago',
    status: 'takedown_requested',
    severity: 'high'
  },
  {
    id: 'dom-04',
    domainName: 'stage-auth.apexpay.com.security-gateway.icu',
    brandTarget: 'ApexPay Global',
    technique: 'subdomain_takeover',
    detectionEngine: 'Findomain',
    registrar: 'Hostinger, UAB',
    hostingProvider: 'Hetzner Online GmbH',
    ipAddress: '94.130.82.11',
    nameservers: ['ns1.dns-parking.com', 'ns2.dns-parking.com'],
    dnsMxRecord: false,
    sslIssuer: 'Sectigo RSA Domain Validation',
    heuristicScore: 92,
    targetedUrl: 'https://stage-auth.apexpay.com.security-gateway.icu/sso/login',
    detectedAt: '5 hours ago',
    status: 'investigating',
    severity: 'high'
  },
  {
    id: 'dom-05',
    domainName: 'apexxpay.com',
    brandTarget: 'ApexPay Global',
    technique: 'bitsquatting',
    detectionEngine: 'OpenBPL',
    registrar: 'GoDaddy.com, LLC',
    hostingProvider: 'Amazon Web Services (Route53)',
    ipAddress: '54.239.28.85',
    nameservers: ['ns-104.awsdns-13.com', 'ns-712.awsdns-25.net'],
    dnsMxRecord: false,
    sslIssuer: 'Amazon Trust Services',
    heuristicScore: 65,
    targetedUrl: 'http://apexxpay.com',
    detectedAt: '1 day ago',
    status: 'resolved',
    severity: 'medium'
  }
];

export const MOCK_LOGO_CASES: LogoSimilarityCase[] = [
  {
    id: 'logo-01',
    targetBrand: 'ApexPay Global',
    candidateSource: 'https://apexpay-verify-auth.com',
    candidateType: 'phishing_site',
    authenticLogoUrl: 'official_crest',
    candidateLogoUrl: 'harvested_crest_clone',
    ssimScore: 0.96,
    phashHammingDistance: 2,
    featureMatchPercentage: 97.4,
    colorPaletteDeviation: 1.2,
    verdict: 'infringing_clone',
    detectedAt: '25 minutes ago'
  },
  {
    id: 'logo-02',
    targetBrand: 'ApexPay Global',
    candidateSource: 'Rogue APK: com.apexpay.security.transfer.pro',
    candidateType: 'rogue_app_icon',
    authenticLogoUrl: 'official_app_icon',
    candidateLogoUrl: 'counterfeit_app_icon_gradient',
    ssimScore: 0.88,
    phashHammingDistance: 5,
    featureMatchPercentage: 86.1,
    colorPaletteDeviation: 6.8,
    verdict: 'color_shifted_derivative',
    detectedAt: '40 minutes ago'
  },
  {
    id: 'logo-03',
    targetBrand: 'ApexPay Global',
    candidateSource: '@elena_vance_ce0 Twitter Profile',
    candidateType: 'fake_profile_avatar',
    authenticLogoUrl: 'elena_vance_executive_headshot',
    candidateLogoUrl: 'scraped_lowres_avatar',
    ssimScore: 0.94,
    phashHammingDistance: 3,
    featureMatchPercentage: 92.5,
    colorPaletteDeviation: 3.1,
    verdict: 'infringing_clone',
    detectedAt: '1 hour ago'
  }
];

export const MOCK_THREAT_GRAPH_NODES: ThreatGraphNode[] = [
  { id: 'brand-apexpay', label: 'ApexPay Global (Target)', type: 'brand', risk: 'protected', details: 'Core enterprise brand asset' },
  { id: 'actor-fin7', label: 'Threat Group: Storm-0824', type: 'actor', risk: 'critical', details: 'Financially motivated credential harvesting syndicate' },
  { id: 'phish-dom1', label: 'apexpay-verify-auth.com', type: 'domain', risk: 'critical', details: 'Active phishing portal deployed on bulletproof ISP' },
  { id: 'phish-dom2', label: 'apеxpay.com (Punycode)', type: 'domain', risk: 'critical', details: 'Homoglyph domain mimicking SSO landing' },
  { id: 'app-apk1', label: 'ApexPay Pro (Rogue APK)', type: 'mobile_app', risk: 'critical', details: 'Contains banking overlay dropper and SMS interceptor' },
  { id: 'soc-tw1', label: '@elena_vance_ce0', type: 'social_account', risk: 'critical', details: 'Twitter executive impersonation account actively soliciting DMs' },
  { id: 'soc-tg1', label: '@ApexPay_Support_Desk', type: 'social_account', risk: 'high', details: 'Telegram support scam channel collecting recovery phrases' },
  { id: 'ip-c2', label: '185.220.101.44 (C2 Server)', type: 'ip', risk: 'critical', details: 'Shared Command and Control host for mobile overlay payloads' },
  { id: 'yara-overlay', label: 'YARA: Suspicious_Bank_Overlay', type: 'yara_rule', risk: 'high', details: 'Signature pattern matching accessibility service exploits' }
];

export const MOCK_THREAT_GRAPH_EDGES: ThreatGraphEdge[] = [
  { id: 'e1', source: 'actor-fin7', target: 'phish-dom1', relation: 'hosts' },
  { id: 'e2', source: 'actor-fin7', target: 'app-apk1', relation: 'distributes' },
  { id: 'e3', source: 'actor-fin7', target: 'soc-tw1', relation: 'impersonates' },
  { id: 'e4', source: 'actor-fin7', target: 'soc-tg1', relation: 'distributes' },
  { id: 'e5', source: 'phish-dom1', target: 'brand-apexpay', relation: 'targets' },
  { id: 'e6', source: 'phish-dom2', target: 'brand-apexpay', relation: 'targets' },
  { id: 'e7', source: 'soc-tw1', target: 'brand-apexpay', relation: 'impersonates' },
  { id: 'e8', source: 'app-apk1', target: 'ip-c2', relation: 'shares_c2' },
  { id: 'e9', source: 'phish-dom1', target: 'ip-c2', relation: 'shares_c2' },
  { id: 'e10', source: 'app-apk1', target: 'yara-overlay', relation: 'matches_signature' }
];
