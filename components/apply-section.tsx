"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const partnerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  portfolio: z.string().trim().min(1, "LinkedIn / Portfolio is required"),
  whyJoin: z.string().trim().min(30, "Please write at least 30 characters"),
  valueBring: z.string().trim().min(30, "Please write at least 30 characters"),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

export default function ApplyPartner() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      portfolio: "",
      whyJoin: "",
      valueBring: "",
    },
  });

  const firstName = watch("fullName")?.split(" ")[0] || "";

  const onSubmit = async (data: PartnerFormValues) => {
    setServerError("");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.message || "Failed to submit application");
        return;
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const Field = ({
    placeholder,
    error,
    multiline = false,
    registration,
    type = "text",
  }: {
    placeholder: string;
    error?: string;
    multiline?: boolean;
    registration: any;
    type?: string;
  }) => {
    const base = `w-full bg-[#221b35] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/50
      outline-none transition-colors duration-200 resize-none
      ${
        error
          ? "border-red-500/60 focus:border-red-400"
          : "border-white/15 focus:border-violet-500 hover:border-white/30"
      }`;

    return (
      <div>
        {multiline ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            className={base}
            {...registration}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className={base}
            {...registration}
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

      <section
        className="ap w-full ap-bg py-24 px-6 min-h-screen flex items-center"
        id="apply"
      >
        <div className="max-w-7xl mx-auto w-full">
          {submitted ? (
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

              <h3 className="text-3xl font-extrabold text-white mb-3">
                Application Received!
              </h3>

              <p className="text-white/50 text-sm max-w-sm mx-auto mb-8">
                Thanks{" "}
                <span className="text-violet-400 font-semibold">
                  {firstName}
                </span>
                ! We&apos;ve received your application and will get back to you
                within 5–7 business days.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  reset();
                }}
                className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                  Partnership
                </span>

                <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-3">
                  Apply to Become a Partner
                </h2>

                <p className="text-white/40 text-sm">
                  Join as an owner-operator and help build the next generation
                  of deep-tech companies.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <Field
                  placeholder="Full Name"
                  error={errors.fullName?.message}
                  registration={register("fullName")}
                />

                <Field
                  type="email"
                  placeholder="Email"
                  error={errors.email?.message}
                  registration={register("email")}
                />

                <Field
                  placeholder="LinkedIn / Portfolio"
                  error={errors.portfolio?.message}
                  registration={register("portfolio")}
                />

                <Field
                  placeholder="Why do you want to join AgriBioVentures?"
                  error={errors.whyJoin?.message}
                  multiline
                  registration={register("whyJoin")}
                />

                <Field
                  placeholder="What value would you bring as a partner?"
                  error={errors.valueBring?.message}
                  multiline
                  registration={register("valueBring")}
                />

                {serverError && (
                  <p className="text-red-400 text-sm">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500
                    text-white text-sm font-semibold w-fit transition-all duration-200 disabled:opacity-70"
                >
                  {isSubmitting ? (
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

                <div className="flex items-start gap-10">
                 
                  <p className="text-white text-xl mt-20">
                    This is a long-term effort to build meaningful companies in
                    sectors that matter. <br />
                    If you are interested in building — not just participating —
                    we should talk.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
