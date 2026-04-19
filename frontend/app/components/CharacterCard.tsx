"use client";

import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Character {
  id: string;
  name: string;
  // Swap emoji for image src once art assets are ready:
  imageSrc: string;
  imageSrc2: string;
  cur_planet: number;
}

interface CharacterCardProps {
  character: Character;
  isPlaced: boolean;
  isSelected: boolean;
  assignedPlanetColor?: string;
  onTap: (id: string) => void;
  hint?: string; 
}



export default function CharacterCard({
  character,
  isPlaced,
  isSelected,
  assignedPlanetColor,
  onTap,
  hint,
}: CharacterCardProps) {
  // useDraggable gives us drag handles & transform state
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: character.id, disabled: isPlaced });

  const dragStyle = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={dragStyle}
      {...listeners}
      {...attributes}
      // Tap handler for tap-to-select fallback (great for mobile)
      onPointerDown={(e) => {
        // Let dnd-kit handle actual drag; only fire tap if not dragging
        if (!isDragging) onTap(character.id);
      }}
      animate={{ scale: isDragging ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-1 select-none touch-none"
      aria-label={`${character.name} character card`}
    >
    {hint && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative px-2 py-1 rounded-xl text-center mb-1"
        style={{
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.35)",
          color: "#f87171",
          fontSize: "9px",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          maxWidth: "72px",
        }}
      >
        {hint}
        {/* Thought bubble tail */}
        <div style={{
          position: "absolute",
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: "5px solid rgba(239,68,68,0.35)",
        }} />
      </motion.div>
    )}

    {/* Avatar bubble */}
    <div
      className={`
        relative w-14 h-14 rounded-full flex items-center justify-center
        overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing
        ${isDragging ? "scale-125 shadow-[0_0_24px_rgba(167,139,250,0.7)]" : ""}
        ${
          isSelected
            ? "bg-violet-500/20 border-2 border-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.45)]"
            : isPlaced
            ? "bg-white/[0.03] border border-dashed border-white/10 opacity-35"
            : "bg-white/[0.06] border border-white/15"
        }
      `}
    >
    <Image
      src={character.imageSrc2}
      alt={character.name}
      fill
      className="object-contain p-1"
      priority
    />
    </div>
      {/* Character name */}
      <span
        className={`text-[9px] font-bold uppercase tracking-widest font-['Nunito']
          ${isSelected ? "text-violet-400" : isPlaced ? "text-gray-600" : "text-gray-400"}
        `}
      >
        {character.name}
      </span>

      {/* Placement dot — coloured to match the planet they were assigned to */}
      <div
        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: assignedPlanetColor ?? "rgba(107,114,128,0.4)",
        }}
      />
    </motion.div>
  );
}
