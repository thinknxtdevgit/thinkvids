import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ThinkNEXT Video AI",
  description: "Terms and conditions governing the use of the ThinkNEXT Video AI platform.",
};

export default function TermsOfServicePage() {
  return (
    <main className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background spotlights */}
      <div className="glow-spotlight right-[-100px] top-[100px] pointer-events-none" />
      <div className="glow-spotlight-yellow left-[-150px] bottom-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-zinc-450 hover:text-zinc-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back to Homepage
        </Link>

        {/* Heading Section */}
        <div className="space-y-4 border-b border-zinc-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Shield size={12} className="text-emerald-700" />
            Legal Agreement
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm font-semibold text-zinc-400">
            Last Updated: August 3, 2026
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-zinc-650 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">1. Acceptance of Terms</h2>
            <p className="text-sm font-medium">
              Welcome to ThinkNEXT Video AI ("the Platform", "we", "us", or "our"). By accessing or using our website, services, integrations, or applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">2. Accounts and Workspaces</h2>
            <p className="text-sm font-medium">
              To access certain features of the Services, you must register for an account and choose or create a Workspace. You are solely responsible for maintaining the confidentiality and security of your account credentials and for all activities that occur under your account or within your workspace. 
            </p>
            <p className="text-sm font-medium">
              The Platform defines multiple roles (including Platform Owner, Workspace Owner, Admin, User, and Editor). Each role is granted specific permissions and operational controls. Workspace Owners and Admins are responsible for managing member invitations, permissions, and credit allocations within their respective Workspaces.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">3. AI Services and Third-Party Integrations</h2>
            <p className="text-sm font-medium">
              ThinkNEXT integrates with third-party generative AI networks (including HeyGen for avatar rendering and Submagic for AI post-production editing). By utilizing these features, you acknowledge and agree that your inputs (scripts, audio recordings, avatar choices) will be processed by these external services in accordance with their respective operational parameters.
            </p>
            <p className="text-sm font-medium">
              Video generation requires workspace credits. You agree that credit consumption rates depend on video duration and selected processing pipelines. All rendered drafts, voiceovers, and videos are subject to limits set by your subscription tier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">4. Intellectual Property Rights</h2>
            <p className="text-sm font-medium">
              Between you and ThinkNEXT, you retain all rights, title, and interest in and to the content you input (e.g. video scripts, custom voice samples). You grant us a worldwide, non-exclusive, royalty-free license to use, copy, store, and process your inputs solely to provide and improve the Services.
            </p>
            <p className="text-sm font-medium">
              Videos successfully generated, exported, and published through the Platform belong to the generating user or their workspace organization, subject to third-party providers' underlying terms (e.g., HeyGen avatar licensing).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">5. User Conduct and Publishing</h2>
            <p className="text-sm font-medium">
              You agree not to use the Services to generate or distribute video content that is unlawful, harmful, defamatory, harassing, or otherwise objectionable. 
            </p>
            <p className="text-sm font-medium">
              When linking social networks (including YouTube, TikTok, and LinkedIn) to the Publishing Hub, you authorize the Platform to publish content on your behalf. Depending on workspace settings, publishing may require admin approval before being pushed to active social streams.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">6. Limitation of Liability</h2>
            <p className="text-sm font-medium">
              To the maximum extent permitted by law, ThinkNEXT and its affiliates, officers, or service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, or data, arising out of or related to your use of or inability to use the Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">7. Changes to Terms</h2>
            <p className="text-sm font-medium">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">8. Contact Information</h2>
            <p className="text-sm font-medium">
              If you have any questions about these Terms of Service, please contact us at <span className="font-bold text-zinc-800">legal@thinknext.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
