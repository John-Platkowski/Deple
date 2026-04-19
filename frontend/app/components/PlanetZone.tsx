"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import Image from "next/image";
import { Character } from "./CharacterCard";


export interface Planet {
  id: string;
  choice: string;
  color: string; // glow / label colour e.g. "#fb923c"
  // Use imageSrc for real planet art from /Assets; falls back to CSS sphere
  imageSrc?: string;
  size: number; // diameter in px
}

interface PlanetZoneProps {
  planet: Planet;
  landedCharacters: Character[];
  isActive: boolean; // dnd hover state — lights up drop zone
  floatDelay?: number; // stagger the float animation per planet
}

export default function PlanetZone({
  planet,
  landedCharacters,
  isActive,
  floatDelay = 0,
}: PlanetZoneProps) {
  // useDroppable marks this element as a valid drop target
  const { setNodeRef } = useDroppable({ id: planet.id });
  return (
  <div className="relative"> {/* Remove motion wrapper's flex centering */}
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      {/* Drop zone wrapper */}
      <div
        ref={setNodeRef}
        className="relative flex items-end justify-center"
        style={{
          width: planet.size + 32,
          height: planet.size + 32,
        }}
      >
        {/* Active drag-over ring */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/40"
          />
        )}

        {/* Planet sphere */}
        {planet.imageSrc ? (
          <Image
            src={planet.imageSrc}
            alt={planet.choice}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full" style={{ background: buildGradient(planet.color) }} />
        )}

        {/* Characters sitting on the planet surface */}
        {landedCharacters.length > 0 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-0.5">
            {landedCharacters.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ y: 20, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: i * 0.08,
                }}
                className="text-sm drop-shadow-md"
                title={char.name}
              >
                <Image
                  src={char.imageSrc}
                  alt={char.name}
                  width={40}
                  height={40}
                  className="object-contain p-1"
                  priority
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Planet label below */}
      <div 
        className="text-center mt-2"
        style={{ width: planet.size + 32 }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-wider font-['Fredoka_One'] block truncate px-2 py-1 rounded-md"
          style={{
            color: planet.color,
            background: `${planet.color}30`, // <-- opacity ONLY on background
          }}
        >
          {planet.choice}
        </span>
      </div>
    </motion.div>
  </div>
);
}

/**
 * Builds a radial CSS gradient from a hex colour string.
 * Used as a fallback when no imageSrc is supplied.
 */
function buildGradient(hex: string): string {
  return `radial-gradient(circle at 35% 35%, ${lighten(hex)}, ${hex}, ${darken(hex)})`;
}

function lighten(hex: string): string {
  return hex + "cc"; // simple alpha trick for mock — replace with real colour math if needed
}

function darken(hex: string): string {
  // Darken by mixing toward black — rough but fine for fallback
  return hex.replace(
    /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    (_, r, g, b) => {
      const d = (v: string) =>
        Math.floor(parseInt(v, 16) * 0.45)
          .toString(16)
          .padStart(2, "0");
      return `#${d(r)}${d(g)}${d(b)}`;
    }
  );
}
