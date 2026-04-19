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
const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

const PLANET_STYLES = [
  { color: "#a3e635", imageSrc: "/green_planet.svg", size: 180 },
  { color: "#22d3ee", imageSrc: "/ring_planet.svg", size: 200 },
  { color: "#fb923c", imageSrc: "/purple_planet.svg", size: 200 },
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

  //Character Hints
  const [characterHints, setCharacterHints] = useState<Record<string, string>>({});

  // Configure dnd-kit sensors for both pointer (desktop) and touch (mobile)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 8 } })
  );

  //Characters list, to be updated
  const [characters, setCharacters] = useState<Character[]>([]);

  const checkAnswer = async (alienId: string, planetId: string) => {
  const res = await fetch(`${BACKEND}/correct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      alien_id: alienId,
      planet_id: planetId,
    }),
  });
    const data = await res.json();
    return data.isCorrect; // returns true or false
  };

  const getHint = async (alienId: string, planetId: string): Promise<string | null> => {
  const res = await fetch(
    `${BACKEND}/hint?id=${alienId}&planet_id=${planetId}`,
    { method: "POST" }
  );
    if (!res.ok) return null; // 404 means no hint found

    const data = await res.json();
    return data.hint;
  };

  useEffect(() => {
    fetch(`${BACKEND}/aliens`)
      .then((res) => res.json())
      .then((data) => {
        const chars = Object.entries(data).map(([id, alien]: [string, any]) => ({
          id,
          name: alien.name,
          imageSrc: `${alien.image}.svg`,
          imageSrc2: `${alien.image}_face.svg`,
          cur_planet: 0,
        }));
        setCharacters(chars);
      });
  }, []);

const [planets, setPlanets] = useState<Planet[]>([]);

useEffect(() => {
  fetch(`${BACKEND}/planets`)
    .then((res) => res.json())
    .then((data) => {
      const mapped = data.map((planet: any, i: number) => ({
        id:       String(planet._id),
        choice:   planet.name,
        color:    PLANET_STYLES[i]?.color    ?? "#ffffff",
        imageSrc: PLANET_STYLES[i]?.imageSrc ?? "/green_planet.svg",
        size:     PLANET_STYLES[i]?.size ?? 200
      }));
      setPlanets(mapped);
    });
}, []);

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
  const allPlaced = characters.every((c) => assignments[c.id]);

  const handleConfirm = async () => {
    let finished: boolean = false; 
    let answers: String[][] = [];
    try {
      const results = await Promise.all(
        Object.entries(assignments).map(async ([charId, planetId]) => {
          const isCorrect = await checkAnswer(charId, planetId);
          const hint = await getHint(charId, planetId);
          return { charId, planetId, isCorrect, hint };
        })
      );

      const allCorrect = results.every((r) => r.isCorrect);

      if (allCorrect) {
        router.push("/results");
      } else {
        const hints: Record<string, string> = {};
        results
          .filter((r) => !r.isCorrect)
          .forEach(({ charId, hint }) => {
            if (hint) hints[charId] = hint;
          });
        setCharacterHints(hints);
      }
    } catch (err) {
      console.error("Failed to submit answers:", err);
      // TODO: show a toast/error state — don't silently fail for the user
    }
  };

  // ---------------------------------------------------------------------------
  // Derive which characters have landed on each planet
  // ---------------------------------------------------------------------------
  const landedOn = (planetId: string): Character[] =>
    characters.filter((c) => assignments[c.id] === planetId);

  // Planet colour for the dot indicator under each character card
  const dotColorFor = (charId: string): string | undefined =>
    planets.find((p) => p.id === assignments[charId])?.color;

  //Fix client server bugs - Claude
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (planets.length === 0) return null;

  if (!mounted) return null;

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
              onClick={() => handlePlanetTap(planets[0].id)}
            >
              <PlanetZone
                planet={planets[0]}
                landedCharacters={landedOn(planets[0].id)}
                isActive={activeDragOverPlanet === planets[0].id}
                floatDelay={0}
              />
            </div>

            {/* Planet 2 — centre, slightly lower */}
            <div
              className="absolute"
              style={{ left: "50%", top: "25%" }}
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
              style={{ left: "-5%", top: "90%" }}
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
        {/* Centered timer pill */}
        
        <div className="relative z-10 flex justify-center items-center gap-2 py-2">
          <button
            onClick={() => router.push("/planets")}
            className="text-violet-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors hover:bg-violet-500/10"
            style={{
              fontFamily: "'Fredoka One', sans-serif",
              border: "1px solid rgba(167,139,250,0.35)",
            }}
          >
            Planets
          </button>
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
          <button
            onClick={() => router.push("/info")}
            className="text-violet-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors hover:bg-violet-500/10"
            style={{
              fontFamily: "'Fredoka One', sans-serif",
              border: "1px solid rgba(167,139,250,0.35)",
            }}
          >
            Debles
          </button>
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
                  background: "#4338ca",
                  fontFamily: "'Fredoka One', sans-serif",
                }}
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