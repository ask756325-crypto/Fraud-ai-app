import { GitHubRepoMeta } from '../types/drp';

export const TOP_10_GITHUB_REPOS: GitHubRepoMeta[] = [
  {
    id: 'openbpl',
    number: 1,
    name: 'OpenBPL',
    fullName: 'openbpl/openbpl',
    url: 'https://github.com/openbpl/openbpl',
    category: 'Brand Protection & Domain Monitoring',
    license: 'GPL-3.0',
    licenseCategory: 'Copyleft',
    techStack: ['Python', 'Docker', 'Celery', 'PostgreSQL'],
    maintenanceStatus: 'Community Maintained',
    hackathonPriority: 'Medium - Add if time permits',
    coreCapability: 'Automated lookalike domain permutation, CT (Certificate Transparency) log streaming, WHOIS tracking, and typosquatting scoring algorithms.',
    howWeIntegrate: 'Use the domain permutation engine (bitsquatting, homoglyph punycode, hyphens) to feed our live domain risk crawler and alert on new TLS cert issuances.',
    sampleCodeSnippet: `from openbpl.permutator import generate_lookalikes

# Generate permutations for target corporate brand
permutations = generate_lookalikes("brandshield.com", algorithms=[
    "omission", "bitsquatting", "homoglyphs", "hyphenation"
])
for candidate in permutations[:5]:
    print(f"Candidate: {candidate.fqdn} | Risk Score: {candidate.score}")`
  },
  {
    id: 'cispa-brand-impersonation',
    number: 2,
    name: 'CISPA Brand Impersonation',
    fullName: 'CISPA-SysSec/brand_impersonation',
    url: 'https://github.com/CISPA-SysSec/brand_impersonation',
    category: 'Fake Social Profile Detection',
    license: 'MIT',
    licenseCategory: 'Permissive',
    techStack: ['Python', 'scikit-learn', 'Tweepy', 'Selenium'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'High - Priority 1',
    coreCapability: 'Academic research-grade model detecting social media accounts impersonating top brands and VIPs via cross-modal feature vectors (bio text, screen name similarity, avatar comparison).',
    howWeIntegrate: 'Core algorithm for Social Impersonation Radar: analyzes account creation anomaly, follower-following ratio distortion, and executive name homoglyphs across Twitter/X, Instagram, and LinkedIn.',
    sampleCodeSnippet: `from cispa_impersonation import ProfileClassifier, extract_features

classifier = ProfileClassifier.load_pretrained("cispa_weights_v2.bin")
features = extract_features(
    account_handle="@brand_shield_support",
    display_name="BrandShield Official VIP Support",
    account_age_days=3,
    follower_ratio=0.012
)
is_impersonator, confidence = classifier.predict(features)
# Confidence: 0.942 -> High confidence imposter account`
  },
  {
    id: 'findomain',
    number: 3,
    name: 'Findomain',
    fullName: 'Findomain/Findomain',
    url: 'https://github.com/Findomain/Findomain',
    category: 'Domain & Subdomain Discovery',
    license: 'GPL-3.0',
    licenseCategory: 'Copyleft',
    techStack: ['Rust', 'Cross-Platform CLI', 'REST API'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'Medium - Add if time permits',
    coreCapability: 'High-speed Rust-based subdomain enumerator querying multiple public APIs, search engines, and web archives within milliseconds without rate limit choking.',
    howWeIntegrate: 'Used in live asset discovery to map exposed subdomains and detect unauthorized shadow web assets or hijacked CNAMEs pointing to expired cloud buckets.',
    sampleCodeSnippet: `findomain -t brandshield.com -u resolved_subdomains.txt --quiet
# Rust binary output provides fast DNS resolution
# Detects rogue subdomains like 'login.brandshield-auth.com'`
  },
  {
    id: 'phishing-url-detection',
    number: 4,
    name: 'Phishing URL Detection',
    fullName: 'musthaqahmead/Phishing-URL-Detection',
    url: 'https://github.com/musthaqahmead/Phishing-URL-Detection',
    category: 'Machine Learning URL Triage',
    license: 'Apache-2.0',
    licenseCategory: 'Permissive',
    techStack: ['Python', 'XGBoost', 'RandomForest', 'Pandas'],
    maintenanceStatus: 'Stable',
    hackathonPriority: 'High - Priority 1',
    coreCapability: 'Extracts 30+ lexical, domain, and web traffic features (URL entropy, IP in hostname, tinyURL redirects, @ symbol presence, HTTPS token spoofing) to classify phishing URLs.',
    howWeIntegrate: 'Drives the real-time ML URL Classifier in our Domain Phishing Inspector to evaluate live suspicious links captured from social bios and SMS scams.',
    sampleCodeSnippet: `from phishing_ml.extractor import extract_url_features
from phishing_ml.model import XGBoostPhishingModel

features = extract_url_features("https://brandshield-secure-login.xyz/verify.php?token=928")
model = XGBoostPhishingModel.load("rf_phish_model.pkl")
prob = model.predict_proba([features])[0][1]
# Probability: 0.978 -> Phishing Kit signature confirmed`
  },
  {
    id: 'logo-similarity',
    number: 5,
    name: 'Logo Similarity',
    fullName: 'rghafadaryan/logo-similarity',
    url: 'https://github.com/rghafadaryan/logo-similarity',
    category: 'Visual Brand Matching',
    license: 'MIT',
    licenseCategory: 'Permissive',
    techStack: ['Python', 'OpenCV', 'PyTorch', 'ResNet50', 'ImageHash'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'High - Priority 1',
    coreCapability: 'Deep perceptual feature comparison comparing enterprise trademarks against cropped screenshots from phishing kits, rogue mobile app icons, and counterfeit stores.',
    howWeIntegrate: 'Powers the Visual Brand Matching Lab: performs SSIM (Structural Similarity) and Hamming Distance on perceptual hashes (pHash) to catch cloned logos with recoloring or slight rotations.',
    sampleCodeSnippet: `import cv2
import imagehash
from PIL import Image

hash_brand = imagehash.phash(Image.open("official_logo.png"))
hash_rogue = imagehash.phash(Image.open("phishing_favicon.png"))
hamming_dist = hash_brand - hash_rogue

# Low Hamming distance (< 8) indicates deliberate visual imitation
is_visual_infringement = hamming_dist <= 8`
  },
  {
    id: 'misp',
    number: 6,
    name: 'MISP',
    fullName: 'MISP/MISP',
    url: 'https://github.com/MISP/MISP',
    category: 'Threat Intelligence Platform',
    license: 'AGPL-3.0',
    licenseCategory: 'Strong-Copyleft',
    techStack: ['PHP', 'Python (PyMISP)', 'MySQL', 'Redis'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'Architecture Reference',
    coreCapability: 'Open-source threat sharing platform for collecting, storing, and distributing Indicators of Compromise (IoCs) and threat indicators across cyber defense teams.',
    howWeIntegrate: 'Architectural blueprint for IoC schema: attributes (SHA256, domain, C2 IP, impersonator handle), correlation clusters, and STIX 2.1 taxonomy exports.',
    sampleCodeSnippet: `from pymisp import PyMISP, MISPEvent

misp = PyMISP(MISP_URL, MISP_KEY, False)
event = MISPEvent()
event.info = "BrandShield Takedown: Phishing Campaign targeting ApexPay"
event.add_attribute("domain", "apexpay-auth-portal.com")
event.add_attribute("sha256", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
misp.add_event(event)`
  },
  {
    id: 'opencti',
    number: 7,
    name: 'OpenCTI',
    fullName: 'OpenCTI-Platform/opencti',
    url: 'https://github.com/OpenCTI-Platform/opencti',
    category: 'Threat Intelligence & Relationship Graph',
    license: 'Apache-2.0',
    licenseCategory: 'Permissive',
    techStack: ['Node.js', 'GraphQL', 'Elasticsearch', 'Python Connectors'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'Architecture Reference',
    coreCapability: 'Unified cybersecurity knowledge graph structuring threats into STIX 2 entities (Threat Actors, Intrusion Sets, Infrastructure, Malware, Campaigns).',
    howWeIntegrate: 'Drives our interactive Visual Threat Graph: allows security analysts to trace links between Rogue Mobile Apps, Command-and-Control hosts, and Scam Telegram networks.',
    sampleCodeSnippet: `query GetThreatRelationships($brandId: String!) {
  stixCoreRelationships(fromId: $brandId) {
    edges {
      node {
        relationship_type
        to {
          ... on ThreatActor { name aliases }
          ... on Infrastructure { value type }
        }
      }
    }
  }
}`
  },
  {
    id: 'yara-rules',
    number: 8,
    name: 'YARA Rules',
    fullName: 'Yara-Rules/rules',
    url: 'https://github.com/Yara-Rules/rules',
    category: 'Security Signature Detection',
    license: 'GPL-2.0',
    licenseCategory: 'Copyleft',
    techStack: ['YARA Engine', 'C', 'Python-Yara'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'Medium - Add if time permits',
    coreCapability: 'Pattern matching swiss army knife for malware researchers, scanning APK bytecodes, unpackaged Android manifests, and phishing HTML templates.',
    howWeIntegrate: 'Decompiled APK scanning in Rogue Mobile App Monitor: triggers on known banking overlay trojans, fake SMS permissions, and cloned corporate certificate strings.',
    sampleCodeSnippet: `rule Suspicious_Bank_Overlay_APK {
    meta:
        description = "Detects trojanized mobile APK requesting Accessibility overlay over banking app"
        threat_level = "CRITICAL"
    strings:
        $acc = "android.permission.BIND_ACCESSIBILITY_SERVICE"
        $ovl = "SYSTEM_ALERT_WINDOW"
        $sms = "android.permission.RECEIVE_SMS"
    condition:
        all of them and filesize < 15MB
}`
  },
  {
    id: 'owasp-zap',
    number: 9,
    name: 'OWASP ZAP',
    fullName: 'zaproxy/zaproxy',
    url: 'https://github.com/zaproxy/zaproxy',
    category: 'Web Application Security Testing',
    license: 'Apache-2.0',
    licenseCategory: 'Permissive',
    techStack: ['Java', 'Python API', 'REST Automation'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'Medium - Add if time permits',
    coreCapability: 'World standard open source web security scanner for passive and active vulnerability testing, credential harvesting detection, and HTTP header verification.',
    howWeIntegrate: 'Passive probe for discovered phishing landing pages: inspects form submission targets, credential harvesting endpoints, and missing Content-Security-Policy rules.',
    sampleCodeSnippet: `from zapv2 import ZAPv2

zap = ZAPv2(proxies={'http': 'http://127.0.0.1:8080'})
zap.spider.scan("https://brandshield-login-trap.com")
alerts = zap.core.alerts(baseurl="https://brandshield-login-trap.com")
# Flags unencrypted password transmission & malicious form actions`
  },
  {
    id: 'fastapi',
    number: 10,
    name: 'FastAPI',
    fullName: 'fastapi/fastapi',
    url: 'https://github.com/fastapi/fastapi',
    category: 'High-Performance Python Backend Framework',
    license: 'MIT',
    licenseCategory: 'Permissive',
    techStack: ['Python 3.10+', 'Pydantic', 'Starlette', 'Uvicorn'],
    maintenanceStatus: 'Active',
    hackathonPriority: 'High - Priority 1',
    coreCapability: 'Modern, high-performance web framework for building asynchronous threat triage APIs with auto-generated OpenAPI documentation and data validation.',
    howWeIntegrate: 'API gateway architecture: routes concurrent scanning requests between CISPA model inference, Logo Similarity PyTorch workers, and WHOIS lookup workers.',
    sampleCodeSnippet: `from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI(title="BrandShield DRP Engine API")

class BrandScanRequest(BaseModel):
    brand_name: str
    target_domain: str
    executives: list[str]

@app.post("/api/v1/scan/dispatch")
async def dispatch_full_scan(req: BrandScanRequest, bg: BackgroundTasks):
    bg.add_task(run_cispa_social_crawler, req.brand_name)
    bg.add_task(run_openbpl_domain_permutator, req.target_domain)
    return {"status": "dispatched", "estimated_time_sec": 12}`
  }
];
