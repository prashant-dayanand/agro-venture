"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  why: string;
  value: string;
}

interface Errors {
  name?: string;
  email?: string;
  linkedin?: string;
  why?: string;
  value?: string;
}

export default function ApplyPartner() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    linkedin: "",
    why: "",
    value: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.linkedin.trim()) e.linkedin = "LinkedIn / Portfolio is required.";
    if (!form.why.trim()) e.why = "Please tell us why you want to join.";
    else if (form.why.trim().length < 30)
      e.why = "Please write at least 30 characters.";
    if (!form.value.trim()) e.value = "Please describe the value you'd bring.";
    else if (form.value.trim().length < 30)
      e.value = "Please write at least 30 characters.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  const Field = ({
    id,
    placeholder,
    value,
    error,
    onChange,
    multiline = false,
  }: {
    id: keyof FormData;
    placeholder: string;
    value: string;
    error?: string;
    onChange: (v: string) => void;
    multiline?: boolean;
  }) => {
    const base = `w-full bg-[#221b35] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/50
       outline-none transition-colors duration-200 resize-none
       ${error ? "border-red-500/60 focus:border-red-400" : "border-white/15 focus:border-violet-500 hover:border-white/30"}`;
    return (
      <div>
        {multiline ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={base}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={base}
          />
        )}
        {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
      </div>
    );
  };

  return (
    <>
      <style>{`
       

        .ap-bg {
          background: radial-gradient(ellipse at 20% 50%, #1e1030 0%, #0f0b1a 50%, #0d1520 100%);
        }
        .ap input::placeholder,
        .ap textarea::placeholder {
          color: rgba(255,255,255,0.45);
        }
        .ap input:focus::placeholder,
        .ap textarea:focus::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .ap input, .ap textarea {
          caret-color: #a78bfa;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>

      <section className="ap w-full ap-bg py-24 px-6 min-h-screen flex items-center" id="apply">
        <div className="max-w-7xl mx-auto w-full">
          {submitted ? (
            /* ── Success State ── */
            <div className="fade-up text-center py-16">
              <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-6">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="ap-title text-3xl font-extrabold text-white mb-3">
                Application Received!
              </h3>
              <p className="text-white/50 text-sm max-w-sm mx-auto mb-8">
                Thanks{" "}
                <span className="text-violet-400 font-semibold">
                  {form.name.split(" ")[0]}
                </span>
                ! We've received your application and will get back to you
                within 5–7 business days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    linkedin: "",
                    why: "",
                    value: "",
                  });
                }}
                className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
              >
                Submit another application
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Header */}
              <div className="mb-10">
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                  Partnership
                </span>
                <h2 className="ap-title text-4xl md:text-5xl font-extrabold text-white mt-3 mb-3">
                  Apply to Become a Partner
                </h2>
                <p className="text-white/40 text-sm">
                  Join as an owner-operator and help build the next generation
                  of deep-tech companies.
                </p>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4">
                <Field
                  id="name"
                  placeholder="Full Name"
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => {
                    setForm({ ...form, name: v });
                    setErrors({ ...errors, name: undefined });
                  }}
                />
                <Field
                  id="email"
                  placeholder="Email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => {
                    setForm({ ...form, email: v });
                    setErrors({ ...errors, email: undefined });
                  }}
                />
                <Field
                  id="linkedin"
                  placeholder="LinkedIn / Portfolio"
                  value={form.linkedin}
                  error={errors.linkedin}
                  onChange={(v) => {
                    setForm({ ...form, linkedin: v });
                    setErrors({ ...errors, linkedin: undefined });
                  }}
                />
                <Field
                  id="why"
                  placeholder="Why do you want to join AgriBioventures?"
                  value={form.why}
                  error={errors.why}
                  multiline
                  onChange={(v) => {
                    setForm({ ...form, why: v });
                    setErrors({ ...errors, why: undefined });
                  }}
                />
                <Field
                  id="value"
                  placeholder="What value would you bring as a partner?"
                  value={form.value}
                  error={errors.value}
                  multiline
                  onChange={(v) => {
                    setForm({ ...form, value: v });
                    setErrors({ ...errors, value: undefined });
                  }}
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-2 flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500
                    text-white text-sm font-semibold w-fit transition-all duration-200 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg
                        className="spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          strokeLinecap="round"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>

                <div>
                  <p className="text-white text-xl mt-20">
                    This is a long-term effort to build meaningful companies in
                    sectors that matter. <br />If you are interested in building — not
                    just participating — we should talk.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
