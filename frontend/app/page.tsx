"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CharacterCard, { Character } from "./components/CharacterCard";
import PlanetZone, { Planet } from "./components/PlanetZone";
import StarField from "./components/StarField";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

const PLANET_STYLES = [
  { color: "#a3e635", imageSrc: "/green_planet.svg", size: 140 },
  { color: "#800080", imageSrc: "/purple_planet.svg", size: 140 },
  { color: "#fb923c", imageSrc: "/red_planet.svg", size: 140 },
];

const res = await fetch(`${BACKEND}/scenario`);
const data = await res.json();

const SCENARIO_PROMPT = data["description"];

const TIMER_SECONDS = 30;
const MAX_LIVES = 3;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Assignments = Record<string, string>;

// ---------------------------------------------------------------------------
// Heart icon
// ---------------------------------------------------------------------------
function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#f87171" : "none"}
      stroke={filled ? "#f87171" : "rgba(248,113,113,0.35)"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
// ---------------------------------------------------------------------------
// Main game page
// ---------------------------------------------------------------------------
export default function GamePage() {
  const router = useRouter();

  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [activeDragOverPlanet, setActiveDragOverPlanet] = useState<string | null>(null);
  const [characterHints, setCharacterHints] = useState<Record<string, string>>({});
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [mounted, setMounted] = useState(false);
  // Lives
  const [lives, setLives] = useState(MAX_LIVES);
  // We use a ref so the timer callback always reads the latest value without
  // needing to be in the dependency array (avoids restarting the interval).
  const livesRef = useRef(lives);
  useEffect(() => { livesRef.current = lives; }, [lives]);

  // Timer
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  // // Modals (do NOT affect timer or lives)
  // const [showPlanets, setShowPlanets] = useState(false);
  // const [showDebles, setShowDebles] = useState(false);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 8 } })
  );

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
          size:     Math.min(window.innerWidth * 0.25, 150),
        }));
        setPlanets(mapped);
      });
  }, []);

  // ---------------------------------------------------------------------------
  // Timer — expiry costs a life and resets the clock.
  // Opening a modal does NOT pause the timer (per spec: don't reset, but keep
  // counting). The timer is only reset when a life is spent.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (timeLeft <= 0) {
      const nextLives = livesRef.current - 1;
      if (nextLives <= 0) {
        setLives(0);
        router.push("/results");
        return;
      }
      // Lose a life, reset timer, clear board
      setLives(nextLives);
      setAssignments({});
      setCharacterHints({});
      setSelectedCharId(null);
      setTimeLeft(TIMER_SECONDS);
      return;
    }

    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, router]);

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;

  // ---------------------------------------------------------------------------
  // API helpers
  // ---------------------------------------------------------------------------
  const checkAnswer = async (alienId: string, planetId: string): Promise<boolean> => {
    const res = await fetch(`${BACKEND}/correct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alien_id: alienId, planet_id: planetId }),
    });
    const data = await res.json();
    return data.isCorrect;
  };

  const getHint = async (alienId: string, planetId: string): Promise<string | null> => {
    const res = await fetch(`${BACKEND}/hint?id=${alienId}&planet_id=${planetId}`, {
      method: "POST",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.hint;
  };

  // ---------------------------------------------------------------------------
  // Assignment helpers
  // ---------------------------------------------------------------------------
  const assign = useCallback((characterId: string, planetId: string) => {
    setAssignments((prev) => ({ ...prev, [characterId]: planetId }));
    setSelectedCharId(null);
  }, []);

  const unassign = useCallback((characterId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[characterId];
      return next;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Tap-to-select
  // ---------------------------------------------------------------------------
  const handleCharTap = useCallback(
    (charId: string) => {
      if (assignments[charId]) { unassign(charId); return; }
      setSelectedCharId((prev) => (prev === charId ? null : charId));
    },
    [assignments, unassign]
  );

  const handlePlanetTap = useCallback(
    (planetId: string) => {
      if (selectedCharId) assign(selectedCharId, planetId);
    },
    [selectedCharId, assign]
  );

  // ---------------------------------------------------------------------------
  // Drag-and-drop handlers
  // ---------------------------------------------------------------------------
  const handleDragStart = (_event: DragStartEvent) => setSelectedCharId(null);
  const handleDragOver  = (event: DragOverEvent) =>
    setActiveDragOverPlanet(event.over ? String(event.over.id) : null);
  const handleDragEnd   = (event: DragEndEvent) => {
    setActiveDragOverPlanet(null);
    if (event.over) assign(String(event.active.id), String(event.over.id));
  };

  // ---------------------------------------------------------------------------
  // Submission — wrong answer costs a life + resets timer.
  // Running out of lives sends to results. Correct answer also sends to results.
  // ---------------------------------------------------------------------------
  const allPlaced = characters.every((c) => assignments[c.id]);

  const handleConfirm = async () => {
    try {
      const results = await Promise.all(
        Object.entries(assignments).map(async ([charId, planetId]) => {
          const isCorrect = await checkAnswer(charId, planetId);
          const hint      = await getHint(charId, planetId);
          return { charId, planetId, isCorrect, hint };
        })
      );

      const allCorrect = results.every((r) => r.isCorrect);

      if (allCorrect) {
        router.push("/results?outcome=win");
        return;
      }

      // Wrong — lose a life
      const nextLives = livesRef.current - 1;
      if (nextLives <= 0) {
        setLives(0);
        router.push("/results");
        return;
      }

      // Still alive — show hints, reset timer, clear board
      const hints: Record<string, string> = {};
      results.filter((r) => !r.isCorrect).forEach(({ charId, hint }) => {
        if (hint) {hints[charId] = hint; unassign(charId)};
      });

      setLives(nextLives);
      setCharacterHints(hints);
      setSelectedCharId(null);
      setTimeLeft(TIMER_SECONDS);
    } catch (err) {
      console.error("Failed to submit answers:", err);
    }
  };

  

  // ---------------------------------------------------------------------------
  // Derived helpers
  // ---------------------------------------------------------------------------
  const landedOn = (planetId: string): Character[] =>
    characters.filter((c) => assignments[c.id] === planetId);

  const dotColorFor = (charId: string): string | undefined =>
    planets.find((p) => p.id === assignments[charId])?.color;

  // ---------------------------------------------------------------------------
  // Guards
  // ---------------------------------------------------------------------------
  if (!mounted || planets.length === 0) return null;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main
        className="min-h-screen flex flex-col relative overflow-y-auto"
        style={{ background: "#000308", fontFamily: "'Nunito', sans-serif" }}
      >
        <StarField count={70} />

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}
        <header className="relative z-10 flex justify-center items-center px-5 pt-6 pb-2" style={{
            background: "rgba(30,30,30,0.45)",
            backdropFilter: "blur(14px)",
          }}>
          <span
            className="text-violet-300 text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Fredoka One', sans-serif" }}
          >
            The Scenario
          </span>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Scenario prompt                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative z-10 px-6 pt-1 pb-2" style={{
            background: "rgba(30,30,30,0.45)",
            backdropFilter: "blur(14px)",
          }}>
          <p className="text-indigo-100 text-sm leading-relaxed font-semibold text-center">
            {SCENARIO_PROMPT}
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Timer bar — lives + timer + nav buttons                          */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative z-20 flex justify-center items-center gap-2 py-2" style={{
            background: "rgba(30,30,30,0.45)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}>

          {/* Planets button */}
          <button
            onClick={() => router.push("/planets")}
            className="text-violet-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors hover:bg-violet-500/10"
            style={{ fontFamily: "'Fredoka One', sans-serif", border: "1px solid rgba(167,139,250,0.35)" }}
          >
            Planets
          </button>

          {/* Lives + timer pill group */}
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
            style={{
              background: timeLeft <= 10 ? "rgba(248,113,113,0.12)" : "rgba(124,58,237,0.15)",
              border: `1px solid ${timeLeft <= 10 ? "rgba(248,113,113,0.35)" : "rgba(124,58,237,0.3)"}`,
            }}
          >
            {/* Hearts */}
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <Heart key={i} filled={i < lives} />
            ))}

            {/* Divider */}
            <span style={{ color: "rgba(124,58,237,0.4)", margin: "0 2px" }}>|</span>

            {/* Timer */}
            <motion.span
              animate={{ color: timeLeft <= 10 ? "#f87171" : "#7c3aed" }}
              className="text-sm"
              style={{ fontFamily: "'Fredoka One', sans-serif", letterSpacing: "0.1em" }}
            >
              {formattedTime}
            </motion.span>
          </div>

          {/* Deples button */}
          <button
            onClick={() => router.push("/info")}
            className="text-violet-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors hover:bg-violet"
            style={{ fontFamily: "'Fredoka One', sans-serif", border: "1px solid rgba(167,139,250,0.35)" }}
          >
            Deples
          </button>

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Planet drop zones                                                */}
        {/* ---------------------------------------------------------------- */}
        {/* Planet drop zones */}
        <section
          className="relative z-10 flex-1 w-full"
          aria-label="Planet destinations"
        >
          <div className="relative w-full h-full " style={{ height: "60vh" }}>

            {/* Planet 1 — top-left */}
            <div
              className="absolute"
              style={{ left: "2%", top: "10%" }}
              onClick={() => handlePlanetTap(planets[0].id)}
            >
              <PlanetZone
                planet={planets[0]}
                landedCharacters={landedOn(planets[0].id)}
                isActive={activeDragOverPlanet === planets[0].id}
                floatDelay={0}
              />
            </div>

            {/* Planet 2 — centre */}
            <div
              className="absolute"
              style={{ left: "50%", transform: "translateX(-50%)", top: "50%" }}
              onClick={() => handlePlanetTap(planets[1].id)}
            >
              <PlanetZone
                planet={planets[1]}
                landedCharacters={landedOn(planets[1].id)}
                isActive={activeDragOverPlanet === planets[1].id}
                floatDelay={1.3}
              />
            </div>

            {/* Planet 3 — top-right */}
            <div
              className="absolute"
              style={{ right: "2%", top: "5%" }}
              onClick={() => handlePlanetTap(planets[2].id)}
            >
              <PlanetZone
                planet={planets[2]}
                landedCharacters={landedOn(planets[2].id)}
                isActive={activeDragOverPlanet === planets[2].id}
                floatDelay={2.1}
              />
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Taskbar                                                          */}
        {/* ---------------------------------------------------------------- */}
        <footer
          className="relative z-10 px-4 pt-3 pb-6 mt-auto"
          style={{
            background: "rgba(30,30,30,0.45)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            {selectedCharId ? "Now tap a planet to assign" : "Tap or drag Alien to a destination"}
          </p>

          <div className="flex justify-around items-end">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isPlaced={Boolean(assignments[char.id])}
                isSelected={selectedCharId === char.id}
                assignedPlanetColor={dotColorFor(char.id)}
                onTap={handleCharTap}
                hint={characterHints[char.id]}
              />
            ))}
          </div>

          <AnimatePresence>
            {allPlaced && (
              <motion.button
                key="confirm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={handleConfirm}
                className="w-full mt-4 py-3.5 rounded-full text-white text-sm uppercase tracking-widest"
                style={{ background: "#4338ca", fontFamily: "'Fredoka One', sans-serif" }}
              >
                Guess
              </motion.button>
            )}
          </AnimatePresence>
        </footer>
      </main>
    </DndContext>
  );
}