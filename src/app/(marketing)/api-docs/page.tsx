import React from "react";
import Link from "next/link";
import { ArrowLeft, Code2, Terminal, KeyRound, Webhook, Cpu } from "lucide-react";

export const metadata = {
  title: "API Developer Docs | ThinkNEXT Video AI",
  description: "Developer API specifications, webhook configuration, and programmatic video rendering schemas.",
};

export default function ApiDocsPage() {
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
            <Code2 size={12} className="text-emerald-700" />
            Developers Console
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            API Documentation
          </h1>
          <p className="text-base font-semibold text-zinc-450 leading-relaxed">
            Integrate ThinkNEXT's AI video generation engine directly into your CMS, CRM, or content pipelines.
          </p>
        </div>

        {/* Columns: Reference (Left) & Code block (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Reference Column */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <KeyRound size={20} className="text-brand-green" />
                Authentication
              </h2>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                All API requests require Bearer token authorization. Workspace owners can generate API keys (`thinknext_live_...` or `thinknext_test_...`) in the workspace API settings dashboard. Include your token in the HTTP headers:
              </p>
              <pre className="bg-zinc-900 text-zinc-300 p-4 rounded-xl text-xs overflow-x-auto font-mono">
                Authorization: Bearer YOUR_API_KEY
              </pre>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Cpu size={20} className="text-brand-green" />
                Endpoints Overview
              </h2>
              <ul className="space-y-4">
                <li className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold">POST</span>
                    <code className="text-xs font-bold text-zinc-800">/api/v1/projects</code>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">Create a new video project in your active workspace.</p>
                </li>
                <li className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold">POST</span>
                    <code className="text-xs font-bold text-zinc-800">/api/v1/projects/:id/generate</code>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">Trigger voiceover synthesis and HeyGen avatar rendering.</p>
                </li>
                <li className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-[10px] font-bold">GET</span>
                    <code className="text-xs font-bold text-zinc-800">/api/v1/projects/:id/status</code>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">Fetch generation milestones and get the final MP4 download links.</p>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Webhook size={20} className="text-brand-green" />
                Webhooks
              </h2>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                Because avatar rendering can take several minutes, we recommend subscribing to Webhooks. Configure your endpoint in settings to receive payload notifications when rendering finishes or fails.
              </p>
            </section>
          </div>

          {/* Code Example Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden text-left flex flex-col h-full">
              {/* Title bar */}
              <div className="h-10 bg-zinc-950 px-4 border-b border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} />
                  <span>Interactive Request Example</span>
                </div>
                <span>Bash / cURL</span>
              </div>
              {/* Code */}
              <div className="p-5 flex-1 overflow-x-auto font-mono text-xs text-emerald-400 leading-relaxed space-y-4">
                <div>
                  <span className="text-zinc-500"># Trigger video compilation programmatically</span>
                  <br />
                  <span className="text-zinc-300">curl -X POST \</span>
                  <br />
                  <span className="text-zinc-300">  https://api.thinknext.com/v1/projects \</span>
                  <br />
                  <span className="text-zinc-300">  -H </span>
                  <span className="text-amber-300">"Authorization: Bearer thinknext_live_8f3d..."</span>
                  <span className="text-zinc-300"> \</span>
                  <br />
                  <span className="text-zinc-300">  -H </span>
                  <span className="text-amber-300">"Content-Type: application/json"</span>
                  <span className="text-zinc-300"> \</span>
                  <br />
                  <span className="text-zinc-300">  -d '{"{"}</span>
                  <br />
                  <span className="text-zinc-300">    "title": "Welcome Onboarding Demo",</span>
                  <br />
                  <span className="text-zinc-300">    "script": "Hello team, welcome to ThinkNEXT Video AI!",</span>
                  <br />
                  <span className="text-zinc-300">    "voice_id": "eleven_cloned_adam",</span>
                  <br />
                  <span className="text-zinc-300">    "aspect_ratio": "16:9"</span>
                  <br />
                  <span className="text-zinc-300">  {"}"}'</span>
                </div>

                <div className="border-t border-zinc-800/80 pt-4">
                  <span className="text-zinc-500"># Successful Response (201 Created)</span>
                  <pre className="text-zinc-300 font-mono text-[11px] mt-2 overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "project_id": "ws_proj_092e10a",
    "rendering_status": "queued",
    "estimated_seconds": 120
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
