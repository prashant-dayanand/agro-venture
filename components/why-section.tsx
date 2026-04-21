"use client";

import { useState } from "react";

export default function WhySections() {
  return (
    <>
      <section className="w-full  py-24 px-6 bg-blue-50">
        <div className=" mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center">
            <h2 className="process-title text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Why This Exists
            </h2>
            <p className="mt-4 text-gray-800 text-black md:text-lg  mx-auto">
              The current venture model is not designed for deep-tech Scientific
              innovation requires long timelines, operational depth, and aligned
              ownership. Traditional venture capital often optimizes for speed
              over substance. We are building a platform combining capital,
              company-building, and domain expertise — purpose-built for
              complex, high-impact sectors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
