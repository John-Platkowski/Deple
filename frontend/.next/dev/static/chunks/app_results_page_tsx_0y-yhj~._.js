(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/results/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const BACKEND = "http://localhost:5000";
// ---------------------------------------------------------------------------
// Planet styles — assigned by index since backend doesn't have colors
// ---------------------------------------------------------------------------
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
// ---------------------------------------------------------------------------
// Star field
// ---------------------------------------------------------------------------
function StarField({ count = 60 }) {
    const stars = Array.from({
        length: count
    }, (_, i)=>({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            delay: Math.random() * 4
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        children: [
            stars.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute rounded-full bg-white",
                    style: {
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                        animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
                        animationDelay: `${s.delay}s`
                    }
                }, s.id, false, {
                    fileName: "[project]/app/results/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.1; transform: scale(0.6); }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/results/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = StarField;
// ---------------------------------------------------------------------------
// Orbit ring decoration
// ---------------------------------------------------------------------------
function OrbitRing({ color, size, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute rounded-full border pointer-events-none",
        style: {
            width: size,
            height: size,
            borderColor: `${color}30`,
            borderWidth: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `spin ${12 + delay * 4}s linear infinite`
        }
    }, void 0, false, {
        fileName: "[project]/app/results/page.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = OrbitRing;
// ---------------------------------------------------------------------------
// Planet badge
// ---------------------------------------------------------------------------
function PlanetBadge({ planet }) {
    if (!planet) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-700 bg-gray-900/50",
            children: "Unknown"
        }, void 0, false, {
            fileName: "[project]/app/results/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        style: {
            background: `${planet.color}20`,
            border: `1px solid ${planet.color}70`,
            color: planet.color,
            fontFamily: "'Nunito', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full flex-shrink-0",
                style: {
                    background: planet.color
                }
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            planet.choice
        ]
    }, void 0, true, {
        fileName: "[project]/app/results/page.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_c2 = PlanetBadge;
// ---------------------------------------------------------------------------
// Result card — shows character, their correct planet, and steelman
// ---------------------------------------------------------------------------
function ResultCard({ row, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.3 + index * 0.15,
            duration: 0.5,
            ease: "easeOut"
        },
        className: "relative rounded-2xl overflow-hidden px-4 py-4",
        style: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(124,58,237,0.25)",
            backdropFilter: "blur(10px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl",
                style: {
                    background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.6), transparent)"
                }
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: row.character.imageSrc2,
                        alt: row.character.name,
                        className: "w-10 h-10 rounded-full object-contain flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-sm font-bold",
                                style: {
                                    fontFamily: "'Fredoka One', sans-serif",
                                    letterSpacing: "0.04em"
                                },
                                children: row.character.name
                            }, void 0, false, {
                                fileName: "[project]/app/results/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase tracking-widest text-gray-500",
                                        children: "Chose"
                                    }, void 0, false, {
                                        fileName: "[project]/app/results/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetBadge, {
                                        planet: row.correctPlanet
                                    }, void 0, false, {
                                        fileName: "[project]/app/results/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/results/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            row.steelman && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-indigo-200 text-xs italic leading-relaxed px-3 py-2 rounded-xl",
                style: {
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)"
                },
                children: [
                    '"',
                    row.steelman,
                    '"'
                ]
            }, void 0, true, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/results/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c3 = ResultCard;
function ResultsPage() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [planets, setPlanets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResultsPage.useEffect": ()=>{
            setMounted(true);
        }
    }["ResultsPage.useEffect"], []);
    // Fetch characters
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResultsPage.useEffect": ()=>{
            fetch(`${BACKEND}/aliens`).then({
                "ResultsPage.useEffect": (res)=>res.json()
            }["ResultsPage.useEffect"]).then({
                "ResultsPage.useEffect": (data)=>{
                    const chars = Object.entries(data).map({
                        "ResultsPage.useEffect.chars": ([id, alien])=>({
                                id,
                                name: alien.name,
                                imageSrc: `${alien.image}.svg`,
                                imageSrc2: `${alien.image}_face.svg`
                            })
                    }["ResultsPage.useEffect.chars"]);
                    setCharacters(chars);
                }
            }["ResultsPage.useEffect"]);
        }
    }["ResultsPage.useEffect"], []);
    // Fetch planets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResultsPage.useEffect": ()=>{
            fetch(`${BACKEND}/planets`).then({
                "ResultsPage.useEffect": (res)=>res.json()
            }["ResultsPage.useEffect"]).then({
                "ResultsPage.useEffect": (data)=>{
                    const mapped = data.map({
                        "ResultsPage.useEffect.mapped": (planet, i)=>({
                                id: String(planet._id),
                                choice: planet.name,
                                color: PLANET_STYLES[i]?.color ?? "#ffffff",
                                imageSrc: PLANET_STYLES[i]?.imageSrc ?? "/green_planet.svg",
                                size: PLANET_STYLES[i]?.size ?? 200
                            })
                    }["ResultsPage.useEffect.mapped"]);
                    setPlanets(mapped);
                }
            }["ResultsPage.useEffect"]);
        }
    }["ResultsPage.useEffect"], []);
    // Build rows once everything is ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResultsPage.useEffect": ()=>{
            if (!mounted || characters.length === 0 || planets.length === 0) return;
            Promise.all(characters.map({
                "ResultsPage.useEffect": async (char)=>{
                    // Try every planet until we find the correct one
                    const correctPlanet = await ({
                        "ResultsPage.useEffect": async ()=>{
                            for (const planet of planets){
                                const res = await fetch(`${BACKEND}/correct`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        alien_id: char.id,
                                        planet_id: planet.id
                                    })
                                });
                                const { isCorrect } = await res.json();
                                console.log({
                                    alien_id: char.id,
                                    planet_id: planet.id,
                                    result: isCorrect
                                });
                                if (isCorrect) return planet;
                            }
                            return null;
                        }
                    })["ResultsPage.useEffect"]();
                    const steelmanRes = await fetch(`${BACKEND}/steelman?id=${char.id}`);
                    const steelmanData = await steelmanRes.json();
                    return {
                        character: char,
                        correctPlanet,
                        steelman: steelmanData.steelman ?? null
                    };
                }
            }["ResultsPage.useEffect"])).then(setRows);
        }
    }["ResultsPage.useEffect"], [
        mounted,
        characters,
        planets
    ]);
    if (!mounted) return null;
    if (planets.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col relative overflow-hidden",
        style: {
            background: "#000308",
            fontFamily: "'Nunito', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StarField, {
                count: 60
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrbitRing, {
                        color: "#7c3aed",
                        size: 500,
                        delay: 0
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrbitRing, {
                        color: "#22d3ee",
                        size: 340,
                        delay: 1
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].header, {
                initial: {
                    opacity: 0,
                    y: -16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.5
                },
                className: "relative z-10 flex flex-col items-center pt-10 pb-6 px-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-violet-400 text-[10px] uppercase tracking-widest mb-1",
                        style: {
                            fontFamily: "'Fredoka One', sans-serif"
                        },
                        children: "Mission Debrief"
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-white text-2xl",
                        style: {
                            fontFamily: "'Fredoka One', sans-serif",
                            letterSpacing: "0.06em"
                        },
                        children: "Results"
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative z-10 flex-1 px-4 pb-4 flex flex-col gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: rows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultCard, {
                            row: row,
                            index: i
                        }, row.character.id, false, {
                            fileName: "[project]/app/results/page.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/results/page.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].footer, {
                initial: {
                    opacity: 0,
                    y: 16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.8,
                    duration: 0.5
                },
                className: "relative z-10 px-4 pt-3 pb-8 flex flex-col gap-3",
                style: {
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(14px)",
                    borderTop: "1px solid rgba(255,255,255,0.07)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        className: "w-full py-3.5 rounded-full text-white text-sm uppercase tracking-widest",
                        style: {
                            background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                            fontFamily: "'Fredoka One', sans-serif",
                            boxShadow: "0 4px 24px rgba(124,58,237,0.45)"
                        },
                        children: "Play Again"
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full py-3 rounded-full text-violet-300 text-sm uppercase tracking-widest",
                        style: {
                            background: "rgba(124,58,237,0.08)",
                            border: "1px solid rgba(124,58,237,0.3)",
                            fontFamily: "'Fredoka One', sans-serif"
                        },
                        onClick: ()=>navigator.clipboard?.writeText(window.location.href),
                        children: "Share Results"
                    }, void 0, false, {
                        fileName: "[project]/app/results/page.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/results/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/results/page.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
_s(ResultsPage, "+SLKg+dXXrTogeOwRqBqcKxz5SY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c4 = ResultsPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "StarField");
__turbopack_context__.k.register(_c1, "OrbitRing");
__turbopack_context__.k.register(_c2, "PlanetBadge");
__turbopack_context__.k.register(_c3, "ResultCard");
__turbopack_context__.k.register(_c4, "ResultsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_results_page_tsx_0y-yhj~._.js.map