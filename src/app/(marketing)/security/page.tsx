import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Users, KeyRound, ServerCrash } from "lucide-react";

export const metadata = {
  title: "Security & Trust | ThinkNEXT Video AI",
  description: "Learn about the technical security controls, data encryption, and sandbox compliance frameworks at ThinkNEXT.",
};

export default function SecurityPage() {
  const securityPillars = [
    {
      icon: <Lock size={20} className="text-emerald-700" />,
      title: "Data Encryption",
      desc: "All data is encrypted in transit using Transport Layer Security (TLS 1.3) and at rest using AES-256 standards. Our database connections are secured, and critical assets (including integration API keys) are hashed and encrypted prior to persistence.",
    },
    {
      icon: <Users size={20} className="text-emerald-700" />,
      title: "Row-Level Security (RLS)",
      desc: "We enforce strict PostgreSQL Row-Level Security (RLS) policies. Every query made to profiles, workspaces, project tracking pipelines, and connected publishing networks validates the user's active session, preventing cross-organization leakage.",
    },
    {
      icon: <KeyRound size={20} className="text-emerald-700" />,
      title: "Secure Authentication & Roles",
      desc: "Session handling is brokered securely using Supabase Auth. Granular Role-Based Access Control (RBAC) restricts sensitive actions (like credit purchase, workspace settings, editor assignments) strictly to authorized roles (owners and admins).",
    },
    {
      icon: <ServerCrash size={20} className="text-emerald-700" />,
      title: "Sandbox & Compliance",
      desc: "Our platform code runs inside isolated sandboxes. Integration connections to HeyGen, ElevenLabs, and Submagic APIs execute programmatically via trusted servers, ensuring that individual user credentials never leak to external frontends.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background spotlights */}
      <div className="glow-spotlight right-[-100px] top-[100px] pointer-events-none" />
      <div className="glow-spotlight-yellow left-[-150px] bottom-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-left">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-zinc-450 hover:text-zinc-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back to Homepage
        </Link>

        {/* Heading Section */}
        <div className="space-y-4 max-w-2xl pb-8 border-b border-zinc-200 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Shield size={12} className="text-emerald-700" />
            Trust & Compliance
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Security & Data Protection
          </h1>
          <p className="text-base font-semibold text-zinc-455 leading-relaxed">
            We prioritize the confidentiality, integrity, and availability of your scripts, voice samples, and organizational workflows.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200 hover:border-brand-green p-6 rounded-2xl transition-all space-y-4 shadow-3xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                {p.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900">{p.title}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Footer Box */}
        <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-left">
            <h4 className="text-sm font-bold text-zinc-800">Found a Security Vulnerability?</h4>
            <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
              We welcome reports from security researchers and developers. If you believe you have discovered a vulnerability, please email us directly at <span className="font-bold text-zinc-700">security@thinknext.com</span>. We will review and respond promptly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
