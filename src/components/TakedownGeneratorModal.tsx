import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  FileText,
  ShieldAlert,
  Send,
  AlertCircle
} from 'lucide-react';

interface TakedownGeneratorModalProps {
  threat: any;
  threatType: string;
  onClose: () => void;
  onMarkTakedownSent: (threatId: string) => void;
}

export const TakedownGeneratorModal: React.FC<TakedownGeneratorModalProps> = ({
  threat,
  threatType,
  onClose,
  onMarkTakedownSent
}) => {
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  if (!threat) return null;

  const targetIdentifier =
    threat.handle ||
    threat.appName ||
    threat.domainName ||
    threat.candidateSource ||
    'Target Asset';

  const recipientEntity =
    threatType === 'social_profile'
      ? `${threat.platform?.toUpperCase() || 'Social Network'} Legal & Trust Safety Team`
      : threatType === 'mobile_app'
      ? `${threat.sourceStore || 'App Store'} Developer Abuse & Security Review Desk`
      : threatType === 'phishing_domain'
      ? `${threat.registrar || 'Domain Registrar'} Abuse Contact & Upstream Hosting ISP`
      : 'Infringing Entity & Host Legal Department';

  const generatedNoticeText = `URGENT NOTICE OF INTELLECTUAL PROPERTY INFRINGEMENT & DIGITAL RISK TAKEDOWN
Reference ID: BSHIELD-TKD-${Date.now().toString().slice(-6)}
Date: ${new Date().toUTCString()}

TO: ${recipientEntity}

RE: Immediate Cease and Desist / Removal of Infringing Asset: ${targetIdentifier}

Dear Trust & Safety / Abuse Department,

We represent ApexPay Global Corp, the owner of registered trademarks, executive identities, and proprietary digital assets worldwide. 

We have detected unauthorized, fraudulent, and malicious activities originating from the following digital asset under your infrastructure / platform:

TARGET INFRINGING IDENTIFIER:
${targetIdentifier}

VECTOR & NATURE OF ABUSE:
- Threat Category: ${threatType.toUpperCase().replace('_', ' ')}
- Detection Confidence: ${threat.impersonationScore || threat.suspicionScore || threat.heuristicScore || '95'}% via Automated Digital Risk Telemetry
- Specific Infringements: ${
    threatType === 'social_profile'
      ? `Unauthorized impersonation of corporate identity and/or executive (${threat.executiveTarget || 'ApexPay'}). Active solicitations to mislead users into disclosing financial credentials.`
      : threatType === 'mobile_app'
      ? `Distribution of trojanized counterfeit application mimicking proprietary software. Contains malicious overlay droppers and unauthorized brand trademarks.`
      : threatType === 'phishing_domain'
      ? `Domain typosquatting / homoglyph credential harvesting portal deployed to facilitate financial fraud and credential theft.`
      : `Blatant reproduction of copyrighted corporate crest and trademark logos without license.`
  }

EVIDENCE & METADATA:
- Timestamp of Discovery: ${threat.detectedAt || 'Recent'}
- Telemetry Digest / Hash: ${threat.sha256 || threat.targetedUrl || threat.profileUrl || 'Active on platform'}
- Source Reference: BrandShield AI Digital Risk Engine

DEMAND FOR RELIEF:
Pursuant to the Digital Millennium Copyright Act (17 U.S.C. § 512), ICANN Registrar Transfer & Abuse Policies, and your Platform Terms of Service against fraud and brand impersonation, we demand that you:

1. Immediately suspend, disable public access to, or terminate the offending account/domain/APK.
2. Preserve all server logs, registrant details, and IP connection records for law enforcement coordination.
3. Confirm in writing once the infringing asset has been permanently disabled.

STATEMENT OF TRUTH:
I have a good faith belief that the use of the material in the manner complained of is not authorized by the intellectual property owner, its agent, or the law. The information in this notification is accurate under penalty of perjury.

Sincerely,

ApexPay Digital Brand Protection & Cyber Legal Counsel
BrandShield AI Automated Enforcement Dispatch
Email: legal-abuse@apexpay-security.com
Escalation Ticket: #DRP-SEC-99120
`;

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(generatedNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendNotice = () => {
    setSentNotice(true);
    onMarkTakedownSent(threat.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Automated Legal Takedown Generator
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Recipient: {recipientEntity}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notice Content Preview */}
        <div className="my-4 flex-1 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
          {generatedNoticeText}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>Pre-formatted to ICANN, DMCA & App Store trust guidelines</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyNotice}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Notice'}</span>
            </button>

            <button
              onClick={handleSendNotice}
              disabled={sentNotice}
              className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-colors whitespace-nowrap ${
                sentNotice
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {sentNotice ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Takedown Logged</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit to Registrar / Abuse Desk</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
