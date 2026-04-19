(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/CharacterCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CharacterCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CharacterCard({ character, isPlaced, isSelected, assignedPlanetColor, onTap, hint }) {
    _s();
    // useDraggable gives us drag handles & transform state
    const { attributes, listeners, setNodeRef, transform, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"])({
        id: character.id,
        disabled: isPlaced
    });
    const dragStyle = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: setNodeRef,
        style: dragStyle,
        ...listeners,
        ...attributes,
        // Tap handler for tap-to-select fallback (great for mobile)
        onPointerDown: (e)=>{
            // Let dnd-kit handle actual drag; only fire tap if not dragging
            if (!isDragging) onTap(character.id);
        },
        animate: {
            scale: isDragging ? 1.2 : 1
        },
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20
        },
        className: "flex flex-col items-center gap-1 select-none touch-none",
        "aria-label": `${character.name} character card`,
        children: [
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    y: 4
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                className: "relative px-2 py-1 rounded-xl text-center mb-1",
                style: {
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    color: "#f87171",
                    fontSize: "9px",
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    maxWidth: "72px"
                },
                children: [
                    hint,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            bottom: "-5px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: "5px solid rgba(239,68,68,0.35)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/CharacterCard.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CharacterCard.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
        relative w-14 h-14 rounded-full flex items-center justify-center
        overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing
        ${isDragging ? "scale-125 shadow-[0_0_24px_rgba(167,139,250,0.7)]" : ""}
        ${isSelected ? "bg-violet-500/20 border-2 border-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.45)]" : isPlaced ? "bg-white/[0.03] border border-dashed border-white/10 opacity-35" : "bg-white/[0.06] border border-white/15"}
      `,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: character.imageSrc2,
                    alt: character.name,
                    fill: true,
                    className: "object-contain p-1",
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/app/components/CharacterCard.tsx",
                    lineNumber: 105,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/CharacterCard.tsx",
                lineNumber: 91,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[9px] font-bold uppercase tracking-widest font-['Nunito']
          ${isSelected ? "text-violet-400" : isPlaced ? "text-gray-600" : "text-gray-400"}
        `,
                children: character.name
            }, void 0, false, {
                fileName: "[project]/app/components/CharacterCard.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                style: {
                    backgroundColor: assignedPlanetColor ?? "rgba(107,114,128,0.4)"
                }
            }, void 0, false, {
                fileName: "[project]/app/components/CharacterCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CharacterCard.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(CharacterCard, "uZNJ3/8UzXAvFYh/tqZxqBQOH0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"]
    ];
});
_c = CharacterCard;
var _c;
__turbopack_context__.k.register(_c, "CharacterCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/PlanetZone.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanetZone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PlanetZone({ planet, landedCharacters, isActive, floatDelay = 0 }) {
    _s();
    // useDroppable marks this element as a valid drop target
    const { setNodeRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"])({
        id: planet.id
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        // Gentle infinite float animation — each planet slightly offset
        animate: {
            y: [
                0,
                -10,
                0
            ]
        },
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay
        },
        className: "flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: setNodeRef,
                className: "relative flex items-end justify-center",
                style: {
                    width: planet.size + 32,
                    height: planet.size + 32
                },
                children: [
                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.85
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "absolute inset-0 rounded-full border-2 border-dashed border-white/40"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlanetZone.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    planet.imageSrc ? // Real art asset — drop PNGs in /Assets and pass the path as imageSrc
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: planet.imageSrc,
                        alt: planet.choice,
                        fill: true,
                        className: "object-cover",
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlanetZone.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this) : // CSS fallback sphere until art is ready
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full",
                        style: {
                            background: buildGradient(planet.color)
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlanetZone.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    landedCharacters.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-2 left-0 right-0 flex justify-center gap-0.5",
                        children: landedCharacters.map((char, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    y: 20,
                                    opacity: 0,
                                    scale: 0.5
                                },
                                animate: {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 18,
                                    delay: i * 0.08
                                },
                                className: "text-sm drop-shadow-md",
                                title: char.name,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: char.imageSrc,
                                    alt: char.name,
                                    width: 40,
                                    height: 40,
                                    className: "object-contain p-1",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PlanetZone.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this)
                            }, char.id, false, {
                                fileName: "[project]/app/components/PlanetZone.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlanetZone.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PlanetZone.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1 text-[11px] font-bold uppercase tracking-wider font-['Fredoka_One']",
                style: {
                    color: planet.color
                },
                children: planet.choice
            }, void 0, false, {
                fileName: "[project]/app/components/PlanetZone.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/PlanetZone.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(PlanetZone, "cRxoCnej0Qm2GWGzi2a2LoWImLI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"]
    ];
});
_c = PlanetZone;
/**
 * Builds a radial CSS gradient from a hex colour string.
 * Used as a fallback when no imageSrc is supplied.
 */ function buildGradient(hex) {
    return `radial-gradient(circle at 35% 35%, ${lighten(hex)}, ${hex}, ${darken(hex)})`;
}
function lighten(hex) {
    return hex + "cc"; // simple alpha trick for mock — replace with real colour math if needed
}
function darken(hex) {
    // Darken by mixing toward black — rough but fine for fallback
    return hex.replace(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, (_, r, g, b)=>{
        const d = (v)=>Math.floor(parseInt(v, 16) * 0.45).toString(16).padStart(2, "0");
        return `#${d(r)}${d(g)}${d(b)}`;
    });
}
var _c;
__turbopack_context__.k.register(_c, "PlanetZone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/StarField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StarField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function StarField({ count = 60 }) {
    _s();
    const [stars, setStars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarField.useEffect": ()=>{
            setStars(Array.from({
                length: count
            }, {
                "StarField.useEffect": (_, i)=>({
                        id: i,
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        size: Math.random() < 0.15 ? 2.5 : 1.5,
                        opacity: Math.random() * 0.5 + 0.2,
                        duration: Math.random() * 4 + 3,
                        delay: Math.random() * 3
                    })
            }["StarField.useEffect"]));
        }
    }["StarField.useEffect"], [
        count
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none overflow-hidden",
        "aria-hidden": true,
        children: stars.map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute rounded-full bg-white animate-pulse",
                style: {
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    opacity: star.opacity,
                    animationDuration: `${star.duration}s`,
                    animationDelay: `${star.delay}s`
                }
            }, star.id, false, {
                fileName: "[project]/app/components/StarField.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/components/StarField.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(StarField, "MpMl4xT356TDKICdFBbojt4n5zM=");
_c = StarField;
var _c;
__turbopack_context__.k.register(_c, "StarField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CharacterCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/CharacterCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlanetZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PlanetZone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StarField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/StarField.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// ---------------------------------------------------------------------------
// Placeholder data — replace with API fetch from Flask /api/scenarios/daily
// ---------------------------------------------------------------------------
const BACKEND = "http://localhost:5000";
const PLANET_STYLES = [
    {
        color: "#a3e635",
        imageSrc: "/green_planet.svg",
        size: 180
    },
    {
        color: "#22d3ee",
        imageSrc: "/ring_planet.svg",
        size: 200
    },
    {
        color: "#fb923c",
        imageSrc: "/purple_planet.svg",
        size: 200
    }
];
const SCENARIO_PROMPT = "Which world would our Deples choose. How can Deples help an overly aggressive Deple?";
const TIMER_SECONDS = 2000;
function GamePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Which character the player tapped (tap-to-select flow)
    const [selectedCharId, setSelectedCharId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Map of characterId → planetId
    const [assignments, setAssignments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Planet being hovered during a drag
    const [activeDragOverPlanet, setActiveDragOverPlanet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Countdown timer
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(TIMER_SECONDS);
    //Character Hints
    const [characterHints, setCharacterHints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Configure dnd-kit sensors for both pointer (desktop) and touch (mobile)
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 8
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TouchSensor"], {
        activationConstraint: {
            delay: 100,
            tolerance: 8
        }
    }));
    //Characters list, to be updated
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const checkAnswer = async (alienId, planetId)=>{
        const res = await fetch(`${BACKEND}/correct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                alien_id: alienId,
                planet_id: planetId
            })
        });
        const data = await res.json();
        return data.isCorrect; // returns true or false
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            fetch(`${BACKEND}/aliens`).then({
                "GamePage.useEffect": (res)=>res.json()
            }["GamePage.useEffect"]).then({
                "GamePage.useEffect": (data)=>{
                    const chars = Object.entries(data).map({
                        "GamePage.useEffect.chars": ([id, alien])=>({
                                id,
                                name: alien.name,
                                imageSrc: `${alien.image}.svg`,
                                imageSrc2: `${alien.image}_face.svg`,
                                cur_planet: 0
                            })
                    }["GamePage.useEffect.chars"]);
                    setCharacters(chars);
                }
            }["GamePage.useEffect"]);
        }
    }["GamePage.useEffect"], []);
    const [planets, setPlanets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            fetch(`${BACKEND}/planets`).then({
                "GamePage.useEffect": (res)=>res.json()
            }["GamePage.useEffect"]).then({
                "GamePage.useEffect": (data)=>{
                    const mapped = data.map({
                        "GamePage.useEffect.mapped": (planet, i)=>({
                                id: String(planet._id),
                                choice: planet.name,
                                color: PLANET_STYLES[i]?.color ?? "#ffffff",
                                imageSrc: PLANET_STYLES[i]?.imageSrc ?? "/green_planet.svg",
                                size: PLANET_STYLES[i]?.size ?? 200
                            })
                    }["GamePage.useEffect.mapped"]);
                    setPlanets(mapped);
                }
            }["GamePage.useEffect"]);
        }
    }["GamePage.useEffect"], []);
    // ---------------------------------------------------------------------------
    // Timer
    // ---------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            if (timeLeft <= 0) {
                handleConfirm(); // Auto-submit when time runs out
                return;
            }
            const id = setTimeout({
                "GamePage.useEffect.id": ()=>setTimeLeft({
                        "GamePage.useEffect.id": (t)=>t - 1
                    }["GamePage.useEffect.id"])
            }["GamePage.useEffect.id"], 1000);
            return ({
                "GamePage.useEffect": ()=>clearTimeout(id)
            })["GamePage.useEffect"];
        }
    }["GamePage.useEffect"], [
        timeLeft
    ]);
    const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`;
    // ---------------------------------------------------------------------------
    // Assignment helpers
    // ---------------------------------------------------------------------------
    const assign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[assign]": (characterId, planetId)=>{
            setAssignments({
                "GamePage.useCallback[assign]": (prev)=>({
                        ...prev,
                        [characterId]: planetId
                    })
            }["GamePage.useCallback[assign]"]);
            setSelectedCharId(null);
        }
    }["GamePage.useCallback[assign]"], []);
    const unassign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[unassign]": (characterId)=>{
            setAssignments({
                "GamePage.useCallback[unassign]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    delete next[characterId];
                    return next;
                }
            }["GamePage.useCallback[unassign]"]);
        }
    }["GamePage.useCallback[unassign]"], []);
    // ---------------------------------------------------------------------------
    // Tap-to-select flow: tap character → tap planet → assign
    // ---------------------------------------------------------------------------
    const handleCharTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[handleCharTap]": (charId)=>{
            if (assignments[charId]) {
                // Tapping an already-placed character unassigns them
                unassign(charId);
                return;
            }
            setSelectedCharId({
                "GamePage.useCallback[handleCharTap]": (prev)=>prev === charId ? null : charId
            }["GamePage.useCallback[handleCharTap]"]);
        }
    }["GamePage.useCallback[handleCharTap]"], [
        assignments,
        unassign
    ]);
    const handlePlanetTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[handlePlanetTap]": (planetId)=>{
            if (selectedCharId) assign(selectedCharId, planetId);
        }
    }["GamePage.useCallback[handlePlanetTap]"], [
        selectedCharId,
        assign
    ]);
    // ---------------------------------------------------------------------------
    // Drag-and-drop handlers
    // ---------------------------------------------------------------------------
    const handleDragStart = (_event)=>{
        setSelectedCharId(null); // Clear tap selection when drag starts
    };
    const handleDragOver = (event)=>{
        setActiveDragOverPlanet(event.over ? String(event.over.id) : null);
    };
    const handleDragEnd = (event)=>{
        setActiveDragOverPlanet(null);
        if (event.over) {
            assign(String(event.active.id), String(event.over.id));
        }
    };
    // ---------------------------------------------------------------------------
    // Submission
    // ---------------------------------------------------------------------------
    const allPlaced = characters.every((c)=>assignments[c.id]);
    const handleConfirm = async ()=>{
        let finished = false;
        let answers = [];
        try {
            const results = await Promise.all(Object.entries(assignments).map(([charId, planetId])=>{
                console.log(checkAnswer(charId, planetId));
                answers.push([
                    charId,
                    planetId
                ]);
                return checkAnswer(charId, planetId);
            }));
            const finished = results.every((r)=>r === true);
            console.log(answers);
            if (finished) {
                router.push("/results");
            }
        } catch (err) {
            console.error("Failed to submit answers:", err);
        // TODO: show a toast/error state — don't silently fail for the user
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    // ---------------------------------------------------------------------------
    // Derive which characters have landed on each planet
    // ---------------------------------------------------------------------------
    const landedOn = (planetId)=>characters.filter((c)=>assignments[c.id] === planetId);
    // Planet colour for the dot indicator under each character card
    const dotColorFor = (charId)=>planets.find((p)=>p.id === assignments[charId])?.color;
    //Fix client server bugs - Claude
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            setMounted(true);
        }
    }["GamePage.useEffect"], []);
    if (planets.length === 0) return null;
    if (!mounted) return null;
    // ---------------------------------------------------------------------------
    // Render
    // radial-gradient(ellipse at 30% 20%, #1a1040 0%, #0a0618 60%, #000308 100%)
    // ---------------------------------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
        sensors: sensors,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex flex-col relative overflow-hidden",
            style: {
                background: "#000308",
                fontFamily: "'Nunito', sans-serif"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StarField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    count: 70
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "relative z-10 flex justify-center items-center px-5 pt-6 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-violet-300 text-xs uppercase tracking-widest",
                        style: {
                            fontFamily: "'Fredoka One', sans-serif"
                        },
                        children: "The Scenario"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "relative z-10 px-6 pt-1 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-indigo-100 text-sm leading-relaxed font-semibold",
                        children: SCENARIO_PROMPT
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "relative z-10 flex-1 px-4",
                    "aria-label": "Planet destinations",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full min-h-[280px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    left: "-20%",
                                    top: "8%"
                                },
                                onClick: ()=>handlePlanetTap(planets[0].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlanetZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    planet: planets[0],
                                    landedCharacters: landedOn(planets[0].id),
                                    isActive: activeDragOverPlanet === planets[0].id,
                                    floatDelay: 0
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    left: "50%",
                                    top: "25%"
                                },
                                onClick: ()=>handlePlanetTap(planets[1].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlanetZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    planet: planets[1],
                                    landedCharacters: landedOn(planets[1].id),
                                    isActive: activeDragOverPlanet === planets[1].id,
                                    floatDelay: 1.3
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    left: "-5%",
                                    top: "90%"
                                },
                                onClick: ()=>handlePlanetTap(planets[2].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PlanetZone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    planet: planets[2],
                                    landedCharacters: landedOn(planets[2].id),
                                    isActive: activeDragOverPlanet === planets[2].id,
                                    floatDelay: 2.1
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 283,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex justify-center py-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        animate: {
                            color: timeLeft <= 10 ? "#f87171" : "#7c3aed"
                        },
                        className: "text-sm px-5 py-1.5 rounded-full border",
                        style: {
                            background: timeLeft <= 10 ? "rgba(248,113,113,0.12)" : "rgba(124,58,237,0.15)",
                            borderColor: timeLeft <= 10 ? "rgba(248,113,113,0.35)" : "rgba(124,58,237,0.3)",
                            fontFamily: "'Fredoka One', sans-serif",
                            letterSpacing: "0.1em"
                        },
                        children: formattedTime
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 338,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "relative z-10 px-4 pt-3 pb-6",
                    style: {
                        background: "rgba(0,0,0,0.45)",
                        backdropFilter: "blur(14px)",
                        borderTop: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-[10px] text-gray-500 uppercase tracking-widest mb-3",
                            children: selectedCharId ? "Now tap a planet to assign" : "Tap or drag Alien to a destination"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 367,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-around items-end",
                            children: characters.map((char)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CharacterCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    character: char,
                                    isPlaced: Boolean(assignments[char.id]),
                                    isSelected: selectedCharId === char.id,
                                    assignedPlanetColor: dotColorFor(char.id),
                                    onTap: handleCharTap,
                                    //hint={characterHints[char.id]}
                                    hint: "HEllo world"
                                }, char.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: allPlaced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: 16
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                },
                                onClick: handleConfirm,
                                className: "w-full mt-4 py-3.5 rounded-full text-white text-sm uppercase tracking-widest",
                                style: {
                                    background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                                    fontFamily: "'Fredoka One', sans-serif",
                                    boxShadow: "0 4px 24px rgba(124,58,237,0.45)"
                                },
                                children: "Guess"
                            }, "confirm", false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 392,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 247,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 241,
        columnNumber: 5
    }, this);
}
_s(GamePage, "n/MBj66iUmcaUXSswK3UU18jig4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c = GamePage;
var _c;
__turbopack_context__.k.register(_c, "GamePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0u_yvi.._.js.map