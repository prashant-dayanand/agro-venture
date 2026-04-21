"use client";

import { useEffect, useRef, useState } from "react";
import OwnershipSimulator from "./ownership-simulator";

const milestones = [
  { year: "2026", value: "$1B" },
  { year: "2030", value: "$20B" },
  { year: "2033", value: "$150B" },
  { year: "2036", value: "$1T+", accent: true },
];

export default function PartnerEconomics() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start: number | null = null;
          const duration = 1600;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const positions = [0, 0.33, 0.66, 1];

  return (
    <>
      <style>{`
       
        .pe-bg {
          background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 40%, #ede9fe 70%, #e0f2fe 100%);
        }
      `}</style>

      <section ref={sectionRef} className="pe w-full pe-bg py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
              Economics
            </span>
            <h2 className="pe-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
              Partner Economics
            </h2>
            <p className="text-violet-600 font-medium mb-3">
              Aligned ownership over long-term outcomes
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We are building toward a long-term vision of a multi-decade,
              global platform — with the potential to reach trillion-dollar
              scale if execution, markets, and time align.
            </p>
            <p className="mt-3 text-gray-400 text-xs italic">
              This is an ambitious vision, not a guarantee.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            {/* Track */}
            <div className="h-1 w-full bg-violet-100 rounded-full relative">
              {/* Animated fill */}
              <div
                className="h-full rounded-full bg-violet-600"
                style={{
                  width: `${progress * 100}%`,
                  transition: "width 0.05s linear",
                }}
              />

              {/* Dots */}
              {milestones.map((m, i) => {
                const pct = positions[i] * 100;
                const reached = progress >= positions[i] - 0.01;
                return (
                  <div
                    key={m.year}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${pct}%` }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                        reached
                          ? "bg-violet-600 border-white shadow-sm shadow-violet-300"
                          : "bg-white border-violet-200"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-6">
              {milestones.map((m, i) => {
                const reached = progress >= positions[i] - 0.01;
                return (
                  <div
                    key={m.year}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className={`pe-title text-sm font-semibold transition-colors duration-300 ${
                        reached ? "text-gray-800" : "text-gray-300"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span
                      className={`pe-title text-base font-bold transition-colors duration-300 ${
                        m.accent
                          ? reached
                            ? "text-violet-600"
                            : "text-violet-200"
                          : reached
                            ? "text-gray-500"
                            : "text-gray-300"
                      }`}
                    >
                      {m.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <OwnershipSimulator />
        </div>
      </section>
    </>
  );
}
