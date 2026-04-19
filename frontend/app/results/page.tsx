"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

import { Character } from "../components/CharacterCard";
import { Planet } from "../components/PlanetZone";
import Image from "next/image";

interface ResultRow {
  character: Character;
  correctPlanet: Planet | null;
  steelman: string | null;
}


const PLANET_STYLES = [
  { color: "#a3e635", imageSrc: "/green_planet.svg", size: 50 },
  { color: "#800080", imageSrc: "/purple_planet.svg", size: 50 },
  { color: "#fb923c", imageSrc: "/red_planet.svg", size: 50 },
];

function StarField({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.1; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}

function OrbitRing({ color, size, delay = 0 }: { color: string; size: number; delay?: number }) {
  return (
    <div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        borderColor: `${color}30`,
        borderWidth: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: `spin ${12 + delay * 4}s linear infinite`,
      }}
    />
  );
}


function PlanetBadge({ planet }: { planet: Planet | null }) {
  if (!planet) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-700 bg-gray-900/50">
        Unknown
      </span>
    );
  }
  return (
    <span
      className="inline-flex justify-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: `${planet.color}20`,
        border: `1px solid ${planet.color}70`,
        color: planet.color,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        className="relative flex items-end justify-center"
        style={{
          width: planet.size + 2,
          height: planet.size + 2,
        }}
      >
        <Image
          src={planet.imageSrc ?? "unknown"}
          alt={planet.choice}
          fill
          className="object-cover"
          priority
        />
      </div>
      {planet.choice}
    </span>
  );
}


function ResultCard({ row, index }: { row: ResultRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden px-4 py-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(124,58,237,0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex justify-center items-center mb-2">
        <img
          src={row.character.imageSrc2}
          alt={row.character.name}
          className="w-5 h-5 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <p
          className="text-white text-center text-sm font-bold"
          style={{ fontFamily: "'Fredoka One', sans-serif", letterSpacing: "0.04em" }}
        >
          {row.character.name}
        </p>
        <div className="flex items-center gap-2">
          <PlanetBadge planet={row.correctPlanet} />
        </div>
      </div>

      {row.steelman && (
        <p
          className="text-indigo-200 text-xs italic leading-relaxed px-3 py-2 rounded-xl"
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          "{row.steelman}"
        </p>
      )}
    </motion.div>
  );
}


const OUTCOMES = {
  win: {
    headline: "You got it!",
    sub: "The Deples are exactly where they belong.",
    color: "#a3e635",
    bg: "rgba(163,230,53,0.08)",
    border: "rgba(163,230,53,0.3)",
  },
  lose: {
    headline: "Out of lives",
    sub: "Better luck next time?",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.3)",
  },
};

function OutcomeBanner({ outcome }: { outcome: "win" | "lose" }) {
  const o = OUTCOMES[outcome];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
      className="mx-4 mb-2 rounded-2xl px-4 py-3 text-center"
      style={{ background: o.bg, border: `1px solid ${o.border}` }}
    >
      <p
        className="text-base font-bold"
        style={{ fontFamily: "'Fredoka One', sans-serif", color: o.color, letterSpacing: "0.05em" }}
      >
        {o.headline}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
        {o.sub}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Inner page — needs useSearchParams so must sit inside a Suspense boundary
// ---------------------------------------------------------------------------
function ResultsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const outcome = (searchParams.get("outcome") ?? "lose") as "win" | "lose";

  const [mounted, setMounted] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [rows, setRows] = useState<ResultRow[]>([]);

  useEffect(() => { setMounted(true); }, []);

  // Fetch characters
  useEffect(() => {
    fetch(`${BACKEND}/aliens`)
      .then((res) => res.json())
      .then((data) => {
        const chars = Object.entries(data).map(([id, alien]: [string, any]) => ({
          id,
          name: alien.name,
          imageSrc:  `${alien.image}.svg`,
          imageSrc2: `${alien.image}_face.svg`,
          cur_planet: 0,
        }));
        setCharacters(chars);
      });
  }, []);

  // Fetch planets
  useEffect(() => {
    fetch(`${BACKEND}/planets`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((planet: any, i: number) => ({
          id:       String(planet._id),
          choice:   planet.name,
          color:    PLANET_STYLES[i]?.color    ?? "#ffffff",
          imageSrc: PLANET_STYLES[i]?.imageSrc ?? "/green_planet.svg",
          size:     PLANET_STYLES[i]?.size      ?? 200,
        }));
        setPlanets(mapped);
      });
  }, []);

  // Build rows once everything is ready
  useEffect(() => {
    if (!mounted || characters.length === 0 || planets.length === 0) return;

    Promise.all(
      characters.map(async (char) => {
        const correctPlanet = await (async () => {
          for (const planet of planets) {
            const res = await fetch(`${BACKEND}/correct`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ alien_id: char.id, planet_id: planet.id }),
            });
            const { isCorrect } = await res.json();
            if (isCorrect) return planet;
          }
          return null;
        })();

        const steelmanRes = await fetch(`${BACKEND}/steelman?id=${char.id}`);
        const steelmanData = await steelmanRes.json();

        return {
          character:    char,
          correctPlanet,
          steelman:     steelmanData.steelman ?? null,
        };
      })
    ).then(setRows);
  }, [mounted, characters, planets]);

  if (!mounted) return null;
  if (planets.length === 0) return null;

  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#000308", fontFamily: "'Nunito', sans-serif" }}
    >
      <StarField count={60} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing color="#7c3aed" size={500} delay={0} />
        <OrbitRing color="#22d3ee" size={340} delay={1} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center pt-10 pb-6 px-5"
      >
        <span
          className="text-violet-400 text-[20px] uppercase tracking-widest mb-1"
          style={{ fontFamily: "'Fredoka One', sans-serif" }}
        >
          Deple Thoughts
        </span>
        <h1
          className="text-white text-xl"
          style={{ fontFamily: "'Fredoka One', sans-serif", letterSpacing: "0.06em" }}
        >
          Results
        </h1>
      </motion.header>

      {/* Outcome banner */}
      <div className="relative z-10">
        <OutcomeBanner outcome={outcome} />
      </div>

      {/* Result cards */}
      <section className="relative z-10 flex-1 px-4 pb-4 flex flex-col gap-3">
        <AnimatePresence>
          {rows.map((row, i) => (
            <ResultCard key={row.character.id} row={row} index={i} />
          ))}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 px-4 pt-3 pb-8 flex flex-col gap-3"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <button
          onClick={() => router.push("/")}
          className="w-full py-3.5 rounded-full text-white text-sm uppercase tracking-widest"
          style={{
            background: "#4338ca",
            fontFamily: "'Fredoka One', sans-serif",
            boxShadow: "0 4px 24px rgba(124,58,237,0.45)",
          }}
        >
          Play Again
        </button>
      </motion.footer>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Default export — Suspense boundary required by Next.js for useSearchParams
// ---------------------------------------------------------------------------
export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsInner />
    </Suspense>
  );
}