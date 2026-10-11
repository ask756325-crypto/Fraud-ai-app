export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export type ThreatVector = 'social_profile' | 'mobile_app' | 'phishing_domain' | 'visual_infringement' | 'darkweb_credential';
export type IncidentStatus = 'active' | 'investigating' | 'takedown_requested' | 'resolved' | 'whitelisted';

export interface SocialAccountThreat {
  id: string;
  brandTarget: string;
  executiveTarget?: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'telegram' | 'tiktok';
  handle: string;
  profileName: string;
  avatarUrl?: string;
  followerCount: number;
  followingCount: number;
  accountAgeDays: number;
  impersonationScore: number; // 0-100
  detectionEngine: 'CISPA-Brand-Impersonator' | 'Heuristic-NLP';
  indicators: {
    avatarCloned: boolean;
    homoglyphHandle: boolean;
    bioKeywordsMatched: string[];
    dmSolicitationDetected: boolean;
    cryptoWalletAdvertised: boolean;
  };
  samplePost: string;
  detectedAt: string;
  status: IncidentStatus;
  severity: SeverityLevel;
  profileUrl: string;
}

export interface RogueMobileAppThreat {
  id: string;
  appName: string;
  brandTarget: string;
  packageName: string;
  platform: 'android' | 'ios';
  sourceStore: 'APKPure' | 'Aptoide' | 'Unknown APK' | 'Google Play Clone' | 'Apple App Store Clone' | 'Telegram Channel';
  version: string;
  sha256: string;
  downloadsEstimated: number;
  suspicionScore: number; // 0-100
  detectionEngine: 'YARA-Signature-Engine' | 'OWASP-ZAP-Static-AST' | 'APK-Manifest-Parser';
  permissionsRisk: string[];
  yaraRuleMatched?: string;
  indicators: {
    signatureMismatch: boolean;
    accessibilityOverlayAbuse: boolean;
    smsInterceptor: boolean;
    contactsHarvesting: boolean;
    counterfeitIcon: boolean;
  };
  detectedAt: string;
  status: IncidentStatus;
  severity: SeverityLevel;
  downloadUrl: string;
}

export interface PhishingDomainThreat {
  id: string;
  domainName: string;
  brandTarget: string;
  technique: 'typosquatting' | 'homoglyph_punycode' | 'combosquatting' | 'subdomain_takeover' | 'bitsquatting';
  detectionEngine: 'OpenBPL' | 'Findomain' | 'ML-URL-RandomForest';
  registrar: string;
  hostingProvider: string;
  ipAddress: string;
  nameservers: string[];
  dnsMxRecord: boolean;
  sslIssuer: string;
  heuristicScore: number; // 0-100
  targetedUrl: string;
  detectedAt: string;
  status: IncidentStatus;
  severity: SeverityLevel;
}

export interface LogoSimilarityCase {
  id: string;
  targetBrand: string;
  candidateSource: string;
  candidateType: 'phishing_site' | 'rogue_app_icon' | 'fake_profile_avatar' | 'ad_campaign';
  authenticLogoUrl: string;
  candidateLogoUrl: string;
  ssimScore: number; // 0-1
  phashHammingDistance: number; // 0-64 (lower means closer)
  featureMatchPercentage: number; // 0-100
  colorPaletteDeviation: number; // percentage
  verdict: 'infringing_clone' | 'color_shifted_derivative' | 'unrelated';
  detectedAt: string;
}

export interface ThreatGraphNode {
  id: string;
  label: string;
  type: 'actor' | 'domain' | 'social_account' | 'mobile_app' | 'ip' | 'brand' | 'yara_rule';
  risk: SeverityLevel | 'protected';
  details: string;
  x?: number;
  y?: number;
}

export interface ThreatGraphEdge {
  id: string;
  source: string;
  target: string;
  relation: 'impersonates' | 'hosts' | 'distributes' | 'shares_c2' | 'matches_signature' | 'targets';
}

export interface GitHubRepoMeta {
  id: string;
  number: number;
  name: string;
  fullName: string;
  url: string;
  category: string;
  license: string;
  licenseCategory: 'Permissive' | 'Copyleft' | 'Strong-Copyleft';
  techStack: string[];
  maintenanceStatus: 'Active' | 'Stable' | 'Community Maintained' | 'Archived';
  hackathonPriority: 'High - Priority 1' | 'Medium - Add if time permits' | 'Architecture Reference';
  coreCapability: string;
  howWeIntegrate: string;
  sampleCodeSnippet: string;
}

export interface BrandProtectionProfile {
  brandName: string;
  officialDomain: string;
  officialHandles: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  executivesToProtect: {
    name: string;
    title: string;
    officialHandle?: string;
  }[];
  monitoredKeywords: string[];
}
