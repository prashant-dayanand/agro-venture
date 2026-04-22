"use client";

import { useState, useEffect } from "react";

const roles = [
  { value: "founder",   label: "Founding Partner", min: 1,    max: 3,    default: 1.5 },
  { value: "core",      label: "Core Operator",     min: 0.2,  max: 0.8,  default: 0.4 },
  { value: "ecosystem", label: "Ecosystem",         min: 0.1,  max: 0.4,  default: 0.2 },
  { value: "general",   label: "General",           min: 0.05, max: 0.15, default: 0.08 },
];

function formatMoney(n: number) {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9)  return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6)  return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3)  return "$" + (n / 1e3).toFixed(1) + "K";
  return "$" + Math.round(n).toLocaleString();
}

export default function OwnershipSimulator() {
  const [role,      setRole]      = useState(roles[0]);
  const [equity,    setEquity]    = useState(roles[0].default);
  const [valuation, setValuation] = useState(1e12);
  const [year,      setYear]      = useState(2033);
  const [profit,    setProfit]    = useState(50_000_000);

  const [equityVal, setEquityVal] = useState(0);
  const [revVal,    setRevVal]    = useState(0);

  useEffect(() => {
    const growth = Math.min(Math.max((year - 2026) / 7, 0), 1);
    const adjVal = valuation * growth;
    setEquityVal((equity / 100) * adjVal);
    setRevVal((equity / 100) * 0.2 * profit * growth);
  }, [equity, valuation, year, profit]);

  const handleRoleChange = (val: string) => {
    const r = roles.find((r) => r.value === val)!;
    setRole(r);
    setEquity(r.default);
  };

  return (
    <>
      <style>{`
      
       

        /* Slider reset */
        .sim-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 9999px;
          background: #e5e7eb;
          outline: none;
          cursor: pointer;
        }
        .sim-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7c3aed;
          border: 3px solid #fff;
          box-shadow: 0 0 0 2px #7c3aed33;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .sim-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px #7c3aed22;
        }
        .sim-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7c3aed;
          border: 3px solid #fff;
          cursor: pointer;
        }
      `}</style>

      <section className="sim sim-bg py-14">
        <div className="max-w-7xl mx-auto">

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Left — Controls */}
              <div className="flex flex-col gap-7">

                {/* Role */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => handleRoleChange(r.value)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          role.value === r.value
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Equity %
                    </label>
                    <span className="sim-title text-sm font-bold text-violet-600">
                      {equity.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    className="sim-slider"
                    min={role.min}
                    max={role.max}
                    step={0.01}
                    value={equity}
                    onChange={(e) => setEquity(parseFloat(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>{role.min}%</span>
                    <span>{role.max}%</span>
                  </div>
                </div>

                {/* Valuation Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Platform Valuation
                    </label>
                    <span className="sim-title text-sm font-bold text-violet-600">
                      {formatMoney(valuation)}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="sim-slider"
                    min={1e8}
                    max={1e12}
                    step={1e8}
                    value={valuation}
                    onChange={(e) => setValuation(parseFloat(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>$100M</span>
                    <span>$1T</span>
                  </div>
                </div>

                {/* Year Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Timeline
                    </label>
                    <span className="sim-title text-sm font-bold text-violet-600">{year}</span>
                  </div>
                  <input
                    type="range"
                    className="sim-slider"
                    min={2026}
                    max={2035}
                    step={1}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>2026</span>
                    <span>2035</span>
                  </div>
                </div>

                {/* Profit Input */}
                {/* <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Annual Platform Profit ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm bg-gray-50 focus:outline-none focus:border-violet-400 transition-colors"
                    value={profit}
                    onChange={(e) => setProfit(parseFloat(e.target.value) || 0)}
                  />
                </div> */}
              </div>

              {/* Right — Results */}
              <div className="flex flex-col justify-center gap-6">
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Estimated Equity Value
                  </p>
                  <p className="sim-title text-4xl font-extrabold text-violet-600 mb-1">
                    {formatMoney(equityVal)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Based on {equity.toFixed(2)}% of {formatMoney(valuation)} at {year}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Est. Annual Revenue Share
                  </p>
                  <p className="sim-title text-4xl font-extrabold text-gray-800 mb-1">
                    {formatMoney(revVal)}
                  </p>
                  <p className="text-xs text-gray-400">
                    20% profit distribution on ${(profit / 1e6).toFixed(1)}M annual profit
                  </p>
                </div>

                <p className="text-xs text-gray-400 italic leading-relaxed">
                  These projections are illustrative, not guarantees. Outcomes depend on execution,
                  ownership, and platform success.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}