"use client";

import { ConstellationCanvas, Navbar } from "@/components/hero-section";
import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const layers = [
  {
    title: "Intelligence Layer",
    desc: "AI supports opportunity identification, evaluation, and decision-making across the lifecycle.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "group-hover:border-violet-200",
  },
  {
    title: "Execution Layer",
    desc: "Operators, scientists, and builders work together to translate validated ideas into real companies.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    title: "Capital Layer",
    desc: "Investment is structured to align long-term incentives rather than short-term outcomes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200",
  },
];

const systemSteps = [
  {
    label: "Discovery",
    content:
      "AI identifies emerging opportunity areas by analyzing market signals, research trends, and unmet needs across science-driven domains.",
  },
  {
    label: "Validation",
    content:
      "Opportunities are stress-tested through scientific analysis, market feasibility studies, and early operator conversations before capital is committed.",
  },
  {
    label: "Build",
    content:
      "Companies are built with focused execution — aligned teams, clear milestones, and platform support from day one.",
  },
  {
    label: "GTM",
    content:
      "Go-to-market strategies are developed to ensure early traction, customer validation, and scalable distribution.",
  },
  {
    label: "Scale",
    content:
      "Businesses scale through structured growth levers — hiring, partnerships, and strategic capital deployment.",
  },
];

const thesis = [
  {
    title: "Agriculture",
    desc: "Improving productivity, sustainability, and resilience in global food systems.",
    icon: "🌾",
  },
  {
    title: "Biology",
    desc: "Translating scientific breakthroughs into commercially viable solutions.",
    icon: "🧬",
  },
  {
    title: "Human Health",
    desc: "Expanding access to effective and scalable health solutions worldwide.",
    icon: "🩺",
  },
];

const investors = [
  {
    title: "Structured Exposure",
    desc: "Participation across multiple companies within a unified system.",
  },
  {
    title: "Aligned Incentives",
    desc: "Capital is deployed in alignment with execution and long-term outcomes.",
  },
  {
    title: "Disciplined Approach",
    desc: "Focus on a limited number of high-conviction opportunities.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <style>{`
      
        .card-hover {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.25s ease;
        }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }

        .step-btn {
          transition: all 0.2s ease;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease both; }

        @keyframes pulse-green {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.35); }
          70%  { box-shadow: 0 0 0 40px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .pulse-green { animation: pulse-green 3s infinite; }
      `}</style>
      <Navbar />
      <main className="about bg-white">
        {/* ── Hero ── */}
        <section className="bg-black py-28 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="about-title text-3xl md:text-6xl font-extrabold text-white mt-4 mb-6 leading-tight">
              AgriBioventures
            </h1>

            {/* Pulse orb */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center mx-auto mb-8 pulse-green">
              <span className="text-white text-xs font-semibold tracking-wider">
                AI Core
              </span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              A venture platform built to systematically create and scale
              companies across agriculture, biology, and human health.
            </p>
            <p className="text-green-500 text-lg leading-relaxed">
              Instead of relying on fragmented processes, AgriBioventures
              integrates intelligence, execution, and capital into a unified
              system designed to improve the probability of building durable,
              high-value companies.
            </p>
          </div>
        </section>

        {/* ── About Platform ── */}
        <section
          className="py-24 px-6"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f3ff 40%,#ede9fe 70%,#e0f2fe 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
                Platform
              </span>
              <h2 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
                About the Platform
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
                Most ventures fail not due to lack of ideas, but due to
                inconsistent execution, weak validation, and misaligned
                incentives. AgriBioventures treats company building as a
                structured process.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {layers.map((l) => (
                <div
                  key={l.title}
                  className={`group card-hover bg-white rounded-2xl border border-gray-100 p-7 ${l.border}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${l.bg} ${l.color}`}
                  >
                    {l.icon}
                  </div>
                  <h3 className="about-title text-lg font-bold text-gray-900 mb-2">
                    {l.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {l.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── System ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
                Process
              </span>
              <h2 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
                How the System Works
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                Every company progresses through a defined lifecycle, with AI
                supporting decisions and the platform supporting execution at
                each stage.
              </p>
            </div>

            {/* Step selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {systemSteps.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveStep(i)}
                  className={`step-btn px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    activeStep === i
                      ? "bg-violet-600 text-white border-violet-600"
                      : "bg-white text-gray-500 border-gray-200 hover:border-violet-300"
                  }`}
                >
                  <span
                    className={`mr-2 text-xs font-bold ${activeStep === i ? "text-violet-300" : "text-gray-300"}`}
                  >
                    0{i}
                  </span>
                  {s.label}
                </button>
              ))}
            </div>

            {/* Content display */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 px-8 py-7">
              <p
                key={activeStep}
                className="fade-up text-gray-600 text-base leading-relaxed text-center"
              >
                {systemSteps[activeStep].content}
              </p>
            </div>
          </div>
        </section>

        {/* ── Thesis ── */}
        <section
          className="py-24 px-6"
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#f5f3ff 40%,#ede9fe 70%,#e0f2fe 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
                Thesis
              </span>
              <h2 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
                Investment Thesis
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
                We focus on areas where scientific advancement and market demand
                intersect, creating opportunities for long-term, scalable
                businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {thesis.map((t) => (
                <div
                  key={t.title}
                  className="group card-hover bg-white rounded-2xl border border-gray-100 p-7 text-center"
                >
                  <div className="text-4xl mb-5">{t.icon}</div>
                  <h3 className="about-title text-xl font-bold text-gray-900 mb-3">
                    {t.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Investors ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
                Investors
              </span>
              <h2 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
                For Investors
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                The platform is designed for investors seeking long-term
                exposure to company creation rather than isolated deals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {investors.map((inv, i) => (
                <div
                  key={inv.title}
                  className="group card-hover bg-white rounded-2xl border border-gray-100 p-7"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-5">
                    <span className="about-title text-lg font-extrabold text-violet-600">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="about-title text-lg font-bold text-gray-900 mb-2">
                    {inv.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {inv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer className="text-center pb-20">© 2026 AgriBioventures</footer>
      </main>
    </>
  );
}
