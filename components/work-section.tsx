"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Identify",
    description:
      "Source high-potential opportunities across science-driven domains.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    description: "Partner with operators to form strong technical companies.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scale",
    description:
      "Provide capital, hiring, and strategic platform support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Exit",
    description: "Create long-term value through liquidity events.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

const accentColors = [
  { text: "text-violet-600", bg: "bg-violet-50", border: "group-hover:border-violet-300", glow: "group-hover:shadow-violet-100" },
  { text: "text-blue-600",   bg: "bg-blue-50",   border: "group-hover:border-blue-300",   glow: "group-hover:shadow-blue-100" },
  { text: "text-emerald-600",bg: "bg-emerald-50", border: "group-hover:border-emerald-300",glow: "group-hover:shadow-emerald-100" },
  { text: "text-amber-600",  bg: "bg-amber-50",  border: "group-hover:border-amber-300",  glow: "group-hover:shadow-amber-100" },
];

export default function ProcessSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
    

      <section className="w-full relative bg-white overflow-hidden py-24 px-6">
        {/* Decorative blobs */}
        <div className="blob w-96 h-96 bg-violet-200 -top-20 -left-20" style={{position:"absolute"}} />
        <div className="blob w-80 h-80 bg-blue-200 bottom-0 right-0" style={{position:"absolute"}} />
        {/* <div className="blob w-64 h-64 bg-emerald-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{position:"absolute"}} /> */}

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
           
            <h2 className="process-title text-4xl md:text-5xl font-extrabold text-black leading-tight">
              How We Work
            </h2>
            <p className="mt-4 text-gray-800 text-black md:text-lg max-w-xl mx-auto">
              A deliberate four-step playbook to build and scale enduring science-driven companies.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, i) => {
              const color = accentColors[i];
              return (
                <div
                  key={step.number}
                  className={`group card-item relative bg-white rounded-2xl border border-gray-100 p-8
                    shadow-sm hover:shadow-2xl ${color.glow}
                    ${color.border} cursor-pointer`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div
                      className={`icon-wrap w-12 h-12 rounded-xl flex items-center justify-center
                        ${color.bg} ${color.text}`}
                    >
                      {step.icon}
                    </div>

                    {/* Number */}
                    <span className={`num-label text-5xl ${color.text} opacity-20 select-none`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Title + arrow */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className={`process-title text-xl font-bold text-gray-900`}>
                      {step.title}
                    </h3>
                    <span className={`arrow-wrap ${color.text}`}>
                      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-500
                      ${hovered === i ? "opacity-100" : "opacity-0"}
                      bg-gradient-to-r ${
                        i === 0 ? "from-violet-400 to-purple-300" :
                        i === 1 ? "from-blue-400 to-cyan-300" :
                        i === 2 ? "from-emerald-400 to-teal-300" :
                                  "from-amber-400 to-yellow-300"
                      }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}