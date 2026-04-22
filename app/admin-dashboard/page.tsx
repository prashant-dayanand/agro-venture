// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PartnerApplication {
  _id: string;
  fullName: string;
  email: string;
  portfolio: string;
  whyJoin: string;
  valueBring: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partner", {
          method: "GET",
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Failed to fetch data");
          return;
        }

        setData(result.data || []);
      } catch (error) {
        setError("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleLogout = async () => {
   sessionStorage.clear()
   router.push("/")
  };

  return (
    <section className="min-h-screen bg-[#0b1020] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
              Partner Applications
            </h1>
            <p className="mt-2 text-sm text-white/50">
              View all submitted partner applications
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-white/50">Total Applications</p>
            <h3 className="mt-2 text-3xl font-bold text-white">{data.length}</h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-white/50">Latest Status</p>
            <h3 className="mt-2 text-xl font-semibold text-violet-400">
              {data.length > 0 ? "Receiving" : "No Data"}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-white/50">Database</p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-400">
              MongoDB Connected
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#131a2e] shadow-2xl">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center text-white">
              Loading applications...
            </div>
          ) : error ? (
            <div className="flex min-h-[300px] items-center justify-center px-6 text-center text-red-400">
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center text-white/60">
              No partner applications found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-left">
                <thead className="bg-white/5">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      Name
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      Email
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      LinkedIn / Portfolio
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      Why Join
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      Value Bring
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                      Submitted At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b border-white/5 transition hover:bg-white/[0.03] ${
                        index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-5 py-5 align-top">
                        <div className="max-w-[180px]">
                          <p className="font-semibold text-white">{item.fullName}</p>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="max-w-[220px] break-words">
                          <p className="text-sm text-white/80">{item.email}</p>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="max-w-[250px] break-words">
                          <a
                            href={item.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-violet-400 underline underline-offset-4"
                          >
                            {item.portfolio}
                          </a>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="max-w-[320px]">
                          <p className="text-sm leading-6 text-white/80">
                            {item.whyJoin}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="max-w-[320px]">
                          <p className="text-sm leading-6 text-white/80">
                            {item.valueBring}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="min-w-[150px]">
                          <p className="text-sm text-white/70">
                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="mt-1 text-xs text-white/40">
                            {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}