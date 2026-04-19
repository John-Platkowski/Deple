"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "../components/StarField";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Alien {
  id: string;
  name: string;
  traits: string[];
  image: string;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AliensPage() {
  const router = useRouter();
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`${BACKEND}/aliens`)
      .then((res) => res.json())
      .then((data) => {
        const parsed: Alien[] = Object.entries(data).map(
          ([id, alien]: [string, any]) => ({
            id,
            name: alien.name,
            traits: Array.isArray(alien.traits)
              ? alien.traits
              : [alien.traits],
            image: alien.image,
          })
        );
        setAliens(parsed);
      })
      .catch((err) => console.error("Failed to fetch aliens:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "#000308",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <StarField count={60} />

      {/* Header */}
      <div className="relative h-2"></div>
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
          The Deples
        </h1>
      </header>

      {/* Content */}
      <section className="relative z-10 flex flex-col gap-4 px-4 pb-10">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <p
              className="text-violet-400 text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Fredoka One', sans-serif" }}
            >
              Loading crew...
            </p>
          </div>
        ) : (
        aliens.map((alien, i) => (
          <motion.div
            key={alien.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center gap-3 rounded-2xl px-4 py-4 w-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(167,139,250,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Alien image */}
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                width: 80,
                height: 80,
                background: "rgba(167,139,250,0.1)",
                border: "2px solid rgba(167,139,250,0.25)",
              }}
            >
              {alien.image ? (
                <Image src={`${alien.image}.svg`} alt={alien.name} fill className="object-contain p-1" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🛸</div>
              )}
            </div>

            {/* Alien info */}
            <div className="flex flex-col gap-1.5 w-full text-center">
              <p
                className="text-violet-200 text-base uppercase tracking-wider"
                style={{ fontFamily: "'Fredoka One', sans-serif" }}
              >
                {alien.name}
              </p>

              <div className="w-full h-px" style={{ background: "rgba(167,139,250,0.15)" }} />

              <div className="flex flex-col gap-1">
                <span className="text-violet-400 text-[10px] uppercase tracking-widest">Traits</span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {alien.traits.map((trait, j) => (
                    <span
                      key={j}
                      className="text-[14px] px-2 py-0.5 rounded-full"
                      style={{
                        color: "#c4b5fd",
                        fontWeight: 700,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
