"use client";

import { useState, useEffect, useCallback } from "react";
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

import CharacterCard, { Character } from "./components/CharacterCard";
import PlanetZone, { Planet } from "./components/PlanetZone";
import StarField from "./components/StarField";

// ---------------------------------------------------------------------------
// Placeholder data — replace with API fetch from Flask /api/scenarios/daily
// ---------------------------------------------------------------------------
const BACKEND = "https://localhost:5000";


const PLACEHOLDER_CHARACTERS: Character[] = [
];

const PLACEHOLDER_PLANETS: Planet[] = [
  {
    id: "proxima",
    choice: "Proxima",
    color: "#a3e635",
    size: 180,
    imageSrc: "/green_planet.svg",
  },
  {
    id: "kepler",
    choice: "Kepler-22b",
    color: "#22d3ee",
    size: 200,
    imageSrc: "/ring_planet.svg",
  },
  {
    id: "mars",
    choice: "Mars",
    color: "#fb923c",
    size: 200,
    imageSrc: "/purple_planet.svg",
  },
];

const SCENARIO_PROMPT =
  "Which world would our Deples choose. How can Deples help an overly aggressive Deple?";

const TIMER_SECONDS = 2000;

// ---------------------------------------------------------------------------
// Assignment map: characterId → planetId
// ---------------------------------------------------------------------------
type Assignments = Record<string, string>;

export default function GamePage() {
  const router = useRouter();

  // Which character the player tapped (tap-to-select flow)
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  // Map of characterId → planetId
  const [assignments, setAssignments] = useState<Assignments>({});

  // Planet being hovered during a drag
  const [activeDragOverPlanet, setActiveDragOverPlanet] = useState<string | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  // Configure dnd-kit sensors for both pointer (desktop) and touch (mobile)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 8 } })
  );

  // ---------------------------------------------------------------------------
  // Timer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (timeLeft <= 0) {
      handleConfirm(); // Auto-submit when time runs out
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft]);

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;

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
  // Tap-to-select flow: tap character → tap planet → assign
  // ---------------------------------------------------------------------------
  const handleCharTap = useCallback(
    (charId: string) => {
      if (assignments[charId]) {
        // Tapping an already-placed character unassigns them
        unassign(charId);
        return;
      }
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
  const handleDragStart = (_event: DragStartEvent) => {
    setSelectedCharId(null); // Clear tap selection when drag starts
  };

  const handleDragOver = (event: DragOverEvent) => {
    setActiveDragOverPlanet(event.over ? String(event.over.id) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragOverPlanet(null);
    if (event.over) {
      assign(String(event.active.id), String(event.over.id));
    }
  };

  // ---------------------------------------------------------------------------
  // Submission
  // ---------------------------------------------------------------------------
  const allPlaced = PLACEHOLDER_CHARACTERS.every((c) => assignments[c.id]);

  const handleConfirm = async () => {
    try {
      // TODO: replace with your real scenario ID from the fetched scenario
      const scenarioId = "placeholder-scenario-id";

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId, choices: assignments }),
      });

      // Pass assignments via query param so the results page can read them
      router.push(`/results?scenarioId=${scenarioId}&choices=${JSON.stringify(assignments)}`);
    } catch (err) {
      console.error("Failed to submit answers:", err);
      // TODO: show a toast/error state — don't silently fail for the user
    }
  };

  // ---------------------------------------------------------------------------
  // Derive which characters have landed on each planet
  // ---------------------------------------------------------------------------
  const landedOn = (planetId: string): Character[] =>
    PLACEHOLDER_CHARACTERS.filter((c) => assignments[c.id] === planetId);

  // Planet colour for the dot indicator under each character card
  const dotColorFor = (charId: string): string | undefined =>
    PLACEHOLDER_PLANETS.find((p) => p.id === assignments[charId])?.color;

  //Fix client server bugs - Claude
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  //Get characters and initialize
  // const characters = fetch(BACKEND+"/alien");
  // console.log(characters);

  // ---------------------------------------------------------------------------
  // Render
  // radial-gradient(ellipse at 30% 20%, #1a1040 0%, #0a0618 60%, #000308 100%)
  // ---------------------------------------------------------------------------
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{
          background:
            "#000308",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {/* Starfield background*/}
        <StarField count={70} />
        

        {/* ------------------------------------------------------------------ */}
        {/* Header                                                              */}
        {/* ------------------------------------------------------------------ */}
        <header className="relative z-10 flex justify-center items-center px-5 pt-6 pb-2">
          <span
            className="text-violet-300 text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Fredoka One', sans-serif" }}
          >
            The Scenario
          </span>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* Scenario prompt                                                     */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative z-10 px-6 pt-1 pb-2">
          <p className="text-indigo-100 text-sm leading-relaxed font-semibold">
            {SCENARIO_PROMPT}
          </p>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Planet drop zones — floated freely in available space              */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="relative z-10 flex-1 px-4"
          aria-label="Planet destinations"
        >
          {/* 
            Planets are absolutely positioned to feel organic rather than grid-locked.
            Adjust top/left values to taste once you have real planet art.
          */}
          <div className="relative w-full h-full min-h-[280px]">

            {/* Planet 1 — top-left */}
            <div
              className="absolute"
              style={{ left: "-20%", top: "8%" }}
              onClick={() => handlePlanetTap(PLACEHOLDER_PLANETS[0].id)}
            >
              <PlanetZone
                planet={PLACEHOLDER_PLANETS[0]}
                landedCharacters={landedOn(PLACEHOLDER_PLANETS[0].id)}
                isActive={activeDragOverPlanet === PLACEHOLDER_PLANETS[0].id}
                floatDelay={0}
              />
            </div>

            {/* Planet 2 — centre, slightly lower */}
            <div
              className="absolute"
              style={{ left: "50%", top: "25%" }}
              onClick={() => handlePlanetTap(PLACEHOLDER_PLANETS[1].id)}
            >
              <PlanetZone
                planet={PLACEHOLDER_PLANETS[1]}
                landedCharacters={landedOn(PLACEHOLDER_PLANETS[1].id)}
                isActive={activeDragOverPlanet === PLACEHOLDER_PLANETS[1].id}
                floatDelay={1.3}
              />
            </div>

            {/* Planet 3 — top-right */}
            <div
              className="absolute"
              style={{ left: "-5%", top: "90%" }}
              onClick={() => handlePlanetTap(PLACEHOLDER_PLANETS[2].id)}
            >
              <PlanetZone
                planet={PLACEHOLDER_PLANETS[2]}
                landedCharacters={landedOn(PLACEHOLDER_PLANETS[2].id)}
                isActive={activeDragOverPlanet === PLACEHOLDER_PLANETS[2].id}
                floatDelay={2.1}
              />
            </div>

          </div>
        </section>
        {/* Centered timer pill */}
        <div className="relative z-10 flex justify-center py-2">
          <motion.span
            animate={{ color: timeLeft <= 10 ? "#f87171" : "#7c3aed" }}
            className="text-sm px-5 py-1.5 rounded-full border"
            style={{
              background: timeLeft <= 10
                ? "rgba(248,113,113,0.12)"
                : "rgba(124,58,237,0.15)",
              borderColor: timeLeft <= 10
                ? "rgba(248,113,113,0.35)"
                : "rgba(124,58,237,0.3)",
              fontFamily: "'Fredoka One', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            {formattedTime}
          </motion.span>
        </div>
        {/* ------------------------------------------------------------------ */}
        {/* Taskbar — character selection + confirm button                      */}
        {/* ------------------------------------------------------------------ */}
        <footer
          className="relative z-10 px-4 pt-3 pb-6"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-3">
            {selectedCharId
              ? "Now tap a planet to assign"
              : "Tap or drag Alien to a destination"}
          </p>

          {/* Character cards */}
          <div className="flex justify-around items-end">
            {PLACEHOLDER_CHARACTERS.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isPlaced={Boolean(assignments[char.id])}
                isSelected={selectedCharId === char.id}
                assignedPlanetColor={dotColorFor(char.id)}
                onTap={handleCharTap}
              />
            ))}
          </div>

          {/* Confirm button — animates in once all characters are placed */}
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
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                  fontFamily: "'Fredoka One', sans-serif",
                  boxShadow: "0 4px 24px rgba(124,58,237,0.45)",
                }}
              >
                Confirm Crew
              </motion.button>
            )}
          </AnimatePresence>

          {/* Progress dots */}
          {/*<div className="flex justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  background: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div> */}
        </footer>
      </main>
    </DndContext>
  );
}