import React from "react";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | ThinkNEXT Video AI",
  description: "Learn how we use cookies and tracking technologies on the ThinkNEXT Video AI platform.",
};

export default function CookiePolicyPage() {
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
            <Cookie size={12} className="text-emerald-700" />
            Tracking Consent
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-sm font-semibold text-zinc-400">
            Last Updated: August 3, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-zinc-650 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">1. What are Cookies?</h2>
            <p className="text-sm font-medium">
              Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work, improve navigation efficiency, remember user settings, and provide statistical reporting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">2. How We Use Cookies</h2>
            <p className="text-sm font-medium">
              We use cookies to enhance your experience, maintain account security, and compile analytics on platform performance. The cookies we set fall into these categories:
            </p>
            <ul className="list-disc pl-5 text-sm font-medium space-y-2">
              <li>
                <strong className="text-zinc-850">Essential Cookies:</strong> Required to authenticate users and manage active sessions. For example, we use cookies to track your active workspace (`ACTIVE_WORKSPACE_COOKIE`) and keep you logged in securely.
              </li>
              <li>
                <strong className="text-zinc-850">Preferences:</strong> Used to remember your customized choices (e.g. language preferences, sidebar collapse states).
              </li>
              <li>
                <strong className="text-zinc-850">Performance & Analytics:</strong> Help us measure how visitors interact with the Platform, diagnosing slow-loading assets and page errors.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">3. Third-Party Cookies</h2>
            <p className="text-sm font-medium">
              In addition to our first-party cookies, some third-party integrations may drop cookies on your browser. This includes:
            </p>
            <ul className="list-disc pl-5 text-sm font-medium space-y-2">
              <li>
                <strong className="text-zinc-850">AI Providers (HeyGen & Submagic):</strong> Set session identifiers required to stream dynamic preview videos and run AI editing drawers.
              </li>
              <li>
                <strong className="text-zinc-850">Stripe Billing:</strong> Drops cookies essential to prevent payment fraud and secure credit card operations.
              </li>
              <li>
                <strong className="text-zinc-850">Social Media API Platforms:</strong> Used by publishing channels (YouTube, TikTok, LinkedIn) to authorize account linking and track connected sessions.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">4. Controlling Cookies</h2>
            <p className="text-sm font-medium">
              You have the right to accept or refuse cookies. Most browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, please note that blocking essential cookies will prevent you from signing in and fully utilizing the video generation platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">5. Policy Updates</h2>
            <p className="text-sm font-medium">
              We may update this Cookie Policy from time to time to reflect changes in our operational tracking practices or legal frameworks. We encourage you to review this page periodically to stay informed about our use of cookies.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
