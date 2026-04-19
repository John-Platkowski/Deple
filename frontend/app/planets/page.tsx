"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "../components/StarField";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

const PLANET_STYLES = [
  { color: "#a3e635", imageSrc: "/green_planet.svg",  size: 180 },
  { color: "#22d3ee", imageSrc: "/ring_planet.svg",   size: 200 },
  { color: "#fb923c", imageSrc: "/purple_planet.svg", size: 200 },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Planet {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  color: string;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PlanetsPage() {
  const router = useRouter();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`${BACKEND}/planets`)
      .then((res) => res.json())
      .then((data: { _id: string | number; name: string; description: string }[]) => {
        const parsed: Planet[] = data.map((planet, i) => ({
          id: String(planet._id),
          name: planet.name,
          description: planet.description,
          imageSrc: PLANET_STYLES[i]?.imageSrc ?? "/green_planet.svg",
          color: PLANET_STYLES[i]?.color ?? "#ffffff",
        }));
        setPlanets(parsed);
      })
      .catch((err) => console.error("Failed to fetch planets:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "#000308",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <StarField count={60} />

      {/* Header */}
      <header className="relative z-10 flex items-center px-5 pt-8 pb-4 gap-3">
        <button
          onClick={() => router.back()}
          className="text-violet-400 text-sm px-3 py-1 rounded-full border border-violet-500/30 hover:bg-violet-500/10 transition-colors"
        >
          ← Back
        </button>
        <h1
          className="text-violet-300 text-lg uppercase tracking-widest"
          style={{ fontFamily: "'Fredoka One', sans-serif" }}
        >
          The Planets
        </h1>
      </header>

      {/* Content */}
      <section className="relative z-10 flex flex-col gap-4 px-4 pb-24">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <p
              className="text-violet-400 text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Fredoka One', sans-serif" }}
            >
              Scanning planets...
            </p>
          </div>
        ) : (
          planets.map((planet, i) => (
            <motion.div
              key={planet.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center gap-3 rounded-2xl px-4 py-4 w-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${planet.color}28`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Planet image */}
              <div
                className="relative rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 80,
                  height: 80,
                  background: `${planet.color}18`,
                  border: `2px solid ${planet.color}44`,
                }}
              >
                <Image
                  src={planet.imageSrc}
                  alt={planet.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Planet info */}
              <div className="flex flex-col gap-1.5 w-full text-center">
                <p
                  className="text-base uppercase tracking-wider"
                  style={{
                    fontFamily: "'Fredoka One', sans-serif",
                    color: planet.color,
                  }}
                >
                  {planet.name}
                </p>

                <div
                  className="w-full h-px"
                  style={{ background: `${planet.color}28` }}
                />

                <div className="flex flex-col gap-1">
                  <span
                    className="text-[10px] uppercase tracking-widest"
                    style={{ color: `${planet.color}99` }}
                  >
                    Approach
                  </span>
                  <p
                    className="text-[14px] px-2 py-0.5"
                    style={{ color: "#c4b5fd", fontWeight: 600, lineHeight: 1.5 }}
                  >
                    {planet.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}