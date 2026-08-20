'use client';

import React from 'react';
import {
  FileCode2,
  HardDrive,
  Sparkles,
  Layers,
  FileSpreadsheet,
  BrainCircuit,
  Lock,
  Zap,
  Video,
  BookOpen,
  Globe,
  SearchCode,
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
      title: 'Gemini Advanced (4x Higher Limits)',
      description:
        "Access Google's next-gen 1.5 Pro & 2.0 AI models with 4x higher usage limits than standard tiers, Deep Research, and ultra-fast multimodal reasoning.",
      tag: 'Google AI Pro',
    },
    {
      icon: <HardDrive className="w-6 h-6 text-purple-400" />,
      title: '5TB Google One Cloud Storage',
      description:
        'Massive 5,000 GB high-speed cloud storage for your Google Drive, Gmail, and Google Photos. Includes full phone backup and Family Sharing support.',
      tag: '5TB Included',
    },
    {
      icon: <SearchCode className="w-6 h-6 text-pink-400" />,
      title: 'Deep Research & Agentic AI',
      description:
        'Conduct autonomous multi-step web research, deep document analysis, synthesis across hundreds of sources, and automated comprehensive reports.',
      tag: 'Autonomous AI',
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-400" />,
      title: 'Google Workspace & Google Vids',
      description:
        'Gemini integrated directly into Gmail (drafting & summaries), Google Docs, Sheets, Slides, and Google Vids for automated AI video creation.',
      tag: 'Productivity Suite',
    },
    {
      icon: <Video className="w-6 h-6 text-yellow-400" />,
      title: 'AI Creative Studio & Google Flow',
      description:
        'Access Google AI creative tools with 1,000 Google Flow creative credits for cinematic AI video generation, image creation, and studio editing.',
      tag: 'Creative Studio',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
      title: 'Enhanced NotebookLM (5x Audio Overviews)',
      description:
        'Supercharge your research notes with 5x more Audio Overviews (interactive podcast-style AI summaries), citations, and grounded syntheses.',
      tag: 'Research & Study',
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: 'Gemini in Chrome & Deep Search',
      description:
        'Early browser access to Gemini in Google Chrome to analyze any web page instantly, compare products, summarize tabs, and use Deep Search.',
      tag: 'Browser Assistant',
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-amber-400" />,
      title: 'Python Sandbox & 2M Token Context',
      description:
        'Run and visualize Python code right in the chat with a massive 2 Million token context window (analyze 1 hour of video or 50,000 lines of code).',
      tag: 'Developers & Data',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything Included in Your 18-Month Google AI Pro Plan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            The ultimate Google One AI subscription: 4x higher Gemini usage limits, Deep Research, 5TB storage, Google Workspace AI, Google Vids, and Creative Studio credits.
          </p>
        </div>

        {/* 8 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-[11px] font-semibold text-blue-400 group-hover:text-pink-400 transition-colors">
                <Zap className="w-3.5 h-3.5 mr-1" /> Official 18-Month Google AI Pro
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

