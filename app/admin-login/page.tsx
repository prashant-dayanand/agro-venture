"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid password");
        return;
      }

      router.push("/admin-dashboard");
      router.refresh();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0d1520] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171129] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-violet-400 text-xs font-semibold tracking-[0.25em] uppercase">
            Admin Access
          </p>
          <h1 className="text-white text-3xl font-extrabold mt-3">
            Login to Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Enter password to access partner submissions
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-white/10 bg-[#221b35] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-violet-500"
            />
            {error && <p className="text-red-400 text-xs mt-2 ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-70 text-white font-semibold py-3 transition"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}