"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

// ─── Animated Canvas Background ──────────────────────────────────────────────
export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const PARTICLE_COUNT = 80;
    const MAX_DIST = 160;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient — dark navy → teal (matches screenshot)
      const bg = ctx.createLinearGradient(
        0,
        canvas.height * 0.5,
        canvas.width,
        canvas.height,
      );
      bg.addColorStop(0, "#0d1b3e");
      bg.addColorStop(0.5, "#0e2545");
      bg.addColorStop(1, "#0a3d3a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,140,255,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,180,255,0.8)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1b3e]/70 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-5">
        <Link href="/">
          <span className="text-white font-semibold tracking-wide text-lg">
            AgriBioVentures
          </span></Link>
        </div>

        {/* Desktop links */}
        <div className="flex gap-5">
          <Link
            href="/about-us"
            className="hidden md:inline-flex items-center bg-white gap-2 px-5 py-2 rounded-full border border-white/50 text-black text-sm font-medium hover:bg-[#7aef6a]/10 transition-all duration-200"
          >
            About Us
          </Link>

          {/* CTA */}
          <a
            href="#apply"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#7aef6a]/50 text-[#7aef6a] text-sm font-medium hover:bg-[#7aef6a]/10 transition-all duration-200"
          >
            Get In Touch
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1b3e]/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {/* {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-blue-100/70 hover:text-[#7aef6a] transition-colors text-sm py-1"
            >
              {l}
            </a>
          ))} */}
          <a
            href="#"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#7aef6a]/50 text-[#7aef6a] text-sm font-medium w-fit hover:bg-[#7aef6a]/10 transition-all"
          >
            Get In Touch
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      {/* Google Font */}

      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated canvas */}
        <ConstellationCanvas />

        {/* Dark top overlay so top half looks almost black like screenshot */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="IPO roadmap"
            className="object-contain w-32"
          />
          <h1 className="hero-title text-white text-4xl md:text-6xl mb-6 fade-in-u font-bold">
            Building Enduring Science&#8209;Driven Companies At Global Scale
          </h1>
          <p className="hero-sub text-[#7aef6a] text-lg md:text-2xl leading-relaxed fade-in-up-delay">
            Partner with exceptional operators to build and scale companies
            across agriculture, biology, and applied science.
          </p>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #0a1628)",
          }}
        />
      </section>
    </>
  );
}
