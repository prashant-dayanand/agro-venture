"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    period: "2026–27",
    title: "Launch platform & first startups",
    desc: "Establish the foundation — core team, initial portfolio companies, and operational infrastructure.",
  },
  {
    period: "2028–29",
    title: "Breakout companies emerge",
    desc: "Portfolio companies gain traction. First revenue milestones and early market validation.",
  },
  {
    period: "2030–32",
    title: "Scale portfolio & generate exits",
    desc: "Capital recycling begins. Strategic exits fuel the next wave of platform investments.",
  },
  {
    period: "2033+",
    title: "IPO-ready global platform",
    desc: "A multi-decade, multi-billion dollar platform positioned for public markets.",
    accent: true,
  },
];

export default function IPOTimeline() {
  const [visible, setVisible] = useState<boolean[]>(new Array(steps.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = steps.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      if (itemRefs.current[i]) obs.observe(itemRefs.current[i]!);
      return obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
      

        .step-item {
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .step-item.show {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section className="ipo bg-white w-full py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">
              Roadmap
            </span>
            <h2 className="ipo-title text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-3">
              A Realistic Path to IPO
            </h2>
            <p className="text-gray-500 text-sm">
              Built step-by-step from 2026 to long-term public market readiness.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

            {steps.map((s, i) => (
              <div
                key={s.period}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`step-item relative flex gap-6 pb-10 last:pb-0 ${visible[i] ? "show" : ""}`}
              >
                {/* Dot */}
                <div className="relative z-10 mt-1 flex-shrink-0">
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 transition-all duration-500
                      ${visible[i]
                        ? s.accent
                          ? "bg-violet-500 border-violet-400 shadow-[0_0_10px_2px_rgba(139,92,246,0.3)]"
                          : "bg-violet-600 border-violet-500"
                        : "bg-white border-gray-300"
                      }`}
                  />
                </div>

                {/* Content */}
                <div className="pt-0">
                  <span className="ipo-title text-violet-600 text-sm font-bold block mb-1">
                    {s.period}
                  </span>
                  <p className="text-gray-900 font-semibold text-base mb-1">{s.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}