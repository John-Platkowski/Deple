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
}

interface CharacterCardProps {
  character: Character;
  isPlaced: boolean;
  isSelected: boolean;
  assignedPlanetColor?: string; // dot colour matching the planet they landed on
  onTap: (id: string) => void;
}

export default function CharacterCard({
  character,
  isPlaced,
  isSelected,
  assignedPlanetColor,
  onTap,
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
