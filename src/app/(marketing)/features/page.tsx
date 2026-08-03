import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Sliders, Mic, Smile, Wand2, Share2, Layers } from "lucide-react";

export const metadata = {
  title: "Product Features | ThinkNEXT Video AI",
  description: "Explore the core artificial intelligence video generation features of the ThinkNEXT platform.",
};

export default function ProductFeaturesPage() {
  const featureList = [
    {
      icon: <Sparkles size={20} className="text-emerald-700" />,
      title: "AI Script Generator",
      desc: "Turn raw ideas into engaging, platform-tailored scripts in seconds. Customize duration, target audience, tone, and language (English, Hindi, Hinglish) for maximum viewer retention.",
    },
    {
      icon: <Mic size={20} className="text-emerald-700" />,
      title: "ElevenLabs Voice Integration",
      desc: "Generate professional narration with lifelike AI voices. Finetune stability, style, speed, and similarity configurations to construct the perfect voice brand for your videos.",
    },
    {
      icon: <Smile size={20} className="text-emerald-700" />,
      title: "HeyGen AI Avatars",
      desc: "Animate realistic photo-avatars with synchronized mouth movements. Support multi-aspect ratios including Landscape (16:9), Portrait (9:16), and Square (1:1) to serve all platforms.",
    },
    {
      icon: <Wand2 size={20} className="text-emerald-700" />,
      title: "Submagic Caption Suite",
      desc: "Leverage AI post-production to add animated captions, subtitles, emojis, and sound design. Enhance visual engagement automatically without manual keyframing.",
    },
    {
      icon: <Share2 size={20} className="text-emerald-700" />,
      title: "Connected Publishing Hub",
      desc: "Directly link YouTube, TikTok, and LinkedIn accounts. Admins can schedule uploads, coordinate calendars, and oversee active queues to maintain consistency.",
    },
    {
      icon: <Layers size={20} className="text-emerald-700" />,
      title: "Collaborative Workspace Editor",
      desc: "Organize teams cleanly. Workspace owners can allocate credits, delegate script drafts to professional video editors, request revisions, and approve edits inline.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background spotlights */}
      <div className="glow-spotlight right-[-100px] top-[100px] pointer-events-none" />
      <div className="glow-spotlight-yellow left-[-150px] bottom-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
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
            <Sliders size={12} className="text-emerald-700" />
            Capabilities & Pipeline
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Product Features
          </h1>
          <p className="text-base font-semibold text-zinc-450 leading-relaxed">
            Discover the unified workspace tools and AI integrations that make ThinkNEXT the state-of-the-art solution for modern video teams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200 hover:border-brand-green hover:shadow-xs p-6 rounded-2xl transition-all space-y-4 shadow-3xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                {f.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-zinc-900">{f.title}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
