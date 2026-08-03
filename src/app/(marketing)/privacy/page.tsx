import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ThinkNEXT Video AI",
  description: "Privacy policy governing data handling on the ThinkNEXT Video AI platform.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck size={12} className="text-emerald-700" />
            Data Protection
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-semibold text-zinc-400">
            Last Updated: August 3, 2026
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8 text-zinc-650 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">1. Information We Collect</h2>
            <p className="text-sm font-medium">
              We collect information you provide directly to us when registering for an account, configuring your Workspace, or communicating with us. This includes your email, name, organization workspace metadata, billing choices, and any inputs (scripts, audio recordings) you supply for video generation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">2. How We Use Your Information</h2>
            <p className="text-sm font-medium">
              We use your information to operate and maintain our Services, personalize your experience, process credit transactions, and deliver marketing or administrative updates. Inputs like video scripts are passed through specialized API integrations (like HeyGen and Submagic) for avatar generation and automated subtitles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">3. Information Sharing and Disclosure</h2>
            <p className="text-sm font-medium">
              We do not sell your personal data. We share your information with trusted third-party service providers (such as hosting, analytics, database, and generative AI APIs) solely as needed to run the Platform's core video pipeline features. We may also disclose information if required by legal obligations or to protect user safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">4. Data Security</h2>
            <p className="text-sm font-medium">
              We implement industry-standard technical and organizational measures (including database RLS policies and encryption of API integration keys) to protect your workspace records and credentials from unauthorized access, loss, or alteration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">5. Your Choices and Rights</h2>
            <p className="text-sm font-medium">
              You can access, modify, or request deletion of your account profiles and workspace files at any time via your Settings page. Workspace members can manage their notification preferences directly in the user console.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">6. Contact Us</h2>
            <p className="text-sm font-medium">
              If you have any questions regarding this Privacy Policy, please contact us at <span className="font-bold text-zinc-800">privacy@thinknext.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
