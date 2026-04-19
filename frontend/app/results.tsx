"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Planet {
  id: string;
  choice: string;
  color: string;
  imageSrc: string;
}

interface Character {
  id: string;
  name: string;
  imageSrc: string;
  imageSrc2: string;
}

interface ResultRow {
  character: Character;
  playerPlanet: Planet | null;
  correctPlanet: Planet | null;
  isCorrect: boolean;
}

// ---------------------------------------------------------------------------
// Mock data — swap with real API response from Flask /api/results/:scenarioId
// ---------------------------------------------------------------------------
const MOCK_PLANETS: Planet[] = [
  { id: "proxima",  choice: "Proxima Centauri", color: "#a3e635", imageSrc: "/green_planet.svg"  },
  { id: "kepler",   choice: "Kepler-22b",        color: "#22d3ee", imageSrc: "/ring_planet.svg"   },
  { id: "mars",     choice: "Mars",               color: "#fb923c", imageSrc: "/purple_planet.svg" },
];

const MOCK_CHARACTERS: Character[] = [
  { id: "zorp",  name: "Zorp",  imageSrc: "/zorp.svg",  imageSrc2: "/zorp_face.svg"  },
  { id: "blip",  name: "Blip",  imageSrc: "/blip.svg",  imageSrc2: "/blip_face.svg"  },
  { id: "gloom", name: "Gloom", imageSrc: "/gloom.svg", imageSrc2: "/gloom_face.svg" },
];

// Correct answers (what the AI / scenario says the right mapping is)
const MOCK_CORRECT_ANSWERS: Record<string, string> = {
  zorp:  "kepler",
  blip:  "proxima",
  gloom: "mars",
};

// ---------------------------------------------------------------------------
// Star field (reused from game page style)
// ---------------------------------------------------------------------------
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
          0%, 100% { opacity: var(--op, 0.4); transform: scale(1); }
          50%       { opacity: 0.1;            transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Orbit ring decoration
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Planet badge — small coloured circle with label
// ---------------------------------------------------------------------------
function PlanetBadge({ planet, dim = false }: { planet: Planet | null; dim?: boolean }) {
  if (!planet) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-700 bg-gray-900/50">
        <span className="w-2 h-2 rounded-full bg-gray-700" />
        Not placed
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all"
      style={{
        background: dim ? `${planet.color}10` : `${planet.color}20`,
        border: `1px solid ${planet.color}${dim ? "40" : "70"}`,
        color: dim ? `${planet.color}80` : planet.color,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: dim ? `${planet.color}50` : planet.color }}
      />
      {planet.choice}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Result row card
// ---------------------------------------------------------------------------
function ResultCard({ row, index }: { row: ResultRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: row.isCorrect
          ? "1px solid rgba(163,230,53,0.25)"
          : "1px solid rgba(251,146,60,0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Subtle glow strip on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
        style={{
          background: row.isCorrect
            ? "linear-gradient(180deg, transparent, #a3e63580, transparent)"
            : "linear-gradient(180deg, transparent, #fb923c60, transparent)",
        }}
      />

      <div className="flex items-center gap-4 px-4 py-4">
        {/* Character avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Fallback emoji if SVG not available in preview */}
            👾
          </div>
        </div>

        {/* Name + assignments */}
        <div className="flex-1 min-w-0">
          <p
            className="text-white text-sm font-bold mb-2"
            style={{ fontFamily: "'Fredoka One', sans-serif", letterSpacing: "0.04em" }}
          >
            {row.character.name}
          </p>

          <div className="flex flex-col gap-1.5">
            {/* Player's pick */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 w-14 flex-shrink-0">
                You picked
              </span>
              <PlanetBadge planet={row.playerPlanet} dim={!row.isCorrect} />
            </div>

            {/* Correct answer — only show if wrong */}
            {!row.isCorrect && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 w-14 flex-shrink-0">
                  Correct
                </span>
                <PlanetBadge planet={row.correctPlanet} />
              </div>
            )}
          </div>
        </div>

        {/* Result icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 260, damping: 18 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: row.isCorrect
              ? "rgba(163,230,53,0.15)"
              : "rgba(251,146,60,0.12)",
            border: row.isCorrect
              ? "1px solid rgba(163,230,53,0.4)"
              : "1px solid rgba(251,146,60,0.35)",
          }}
        >
          {row.isCorrect ? "✓" : "✗"}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Score ring (SVG donut)
// ---------------------------------------------------------------------------
function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = total === 0 ? 0 : score / total;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  const color = pct === 1 ? "#a3e635" : pct >= 0.5 ? "#22d3ee" : "#fb923c";
  const label = pct === 1 ? "Perfect!" : pct >= 0.5 ? "Nice!" : "Keep trying!";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          <motion.circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-xl font-bold" style={{ fontFamily: "'Fredoka One', sans-serif" }}>
            {score}/{total}
          </span>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs tracking-widest uppercase"
        style={{ color, fontFamily: "'Fredoka One', sans-serif" }}
      >
        {label}
      </motion.span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main results page
// ---------------------------------------------------------------------------
export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [rows, setRows] = useState<ResultRow[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    // Parse choices from query params: ?choices={"zorp":"kepler","blip":"proxima",...}
    const raw = searchParams.get("choices");
    const playerChoices: Record<string, string> = raw ? JSON.parse(raw) : {};

    // TODO: replace MOCK data with real fetch:
    // const scenarioId = searchParams.get("scenarioId");
    // const data = await fetch(`${BACKEND}/api/results/${scenarioId}`).then(r => r.json());
    // const correctAnswers = data.correctAnswers;  // Record<characterId, planetId>
    // const characters = data.characters;
    // const planets = data.planets;

    const built: ResultRow[] = MOCK_CHARACTERS.map((char) => {
      const playerPlanetId  = playerChoices[char.id] ?? null;
      const correctPlanetId = MOCK_CORRECT_ANSWERS[char.id] ?? null;
      return {
        character:     char,
        playerPlanet:  MOCK_PLANETS.find((p) => p.id === playerPlanetId)  ?? null,
        correctPlanet: MOCK_PLANETS.find((p) => p.id === correctPlanetId) ?? null,
        isCorrect:     playerPlanetId !== null && playerPlanetId === correctPlanetId,
      };
    });

    setRows(built);
  }, [mounted, searchParams]);

  if (!mounted) return null;

  const score = rows.filter((r) => r.isCorrect).length;

  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#000308", fontFamily: "'Nunito', sans-serif" }}
    >
      <StarField count={60} />

      {/* Decorative orbit rings in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing color="#7c3aed" size={500} delay={0} />
        <OrbitRing color="#22d3ee" size={340} delay={1} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center pt-10 pb-4 px-5"
      >
        <span
          className="text-violet-400 text-[10px] uppercase tracking-widest mb-1"
          style={{ fontFamily: "'Fredoka One', sans-serif" }}
        >
          Mission Debrief
        </span>
        <h1
          className="text-white text-2xl"
          style={{ fontFamily: "'Fredoka One', sans-serif", letterSpacing: "0.06em" }}
        >
          Results
        </h1>
      </motion.header>

      {/* ---------------------------------------------------------------- */}
      {/* Score ring                                                       */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-10 flex justify-center pb-6"
      >
        <ScoreRing score={score} total={rows.length} />
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* Result cards                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 flex-1 px-4 pb-4 flex flex-col gap-3">
        <AnimatePresence>
          {rows.map((row, i) => (
            <ResultCard key={row.character.id} row={row} index={i} />
          ))}
        </AnimatePresence>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer actions                                                   */}
      {/* ---------------------------------------------------------------- */}
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
        {/* Play again */}
        <button
          onClick={() => router.push("/")}
          className="w-full py-3.5 rounded-full text-white text-sm uppercase tracking-widest"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
            fontFamily: "'Fredoka One', sans-serif",
            boxShadow: "0 4px 24px rgba(124,58,237,0.45)",
          }}
        >
          Play Again
        </button>

        {/* Share (placeholder) */}
        <button
          className="w-full py-3 rounded-full text-violet-300 text-sm uppercase tracking-widest"
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.3)",
            fontFamily: "'Fredoka One', sans-serif",
          }}
          onClick={() => {
            // TODO: implement share sheet / copy link
            navigator.clipboard?.writeText(window.location.href);
          }}
        >
          Share Results
        </button>
      </motion.footer>

      {/* Orbit spin keyframes */}
      <style>{`
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </main>
  );
}
