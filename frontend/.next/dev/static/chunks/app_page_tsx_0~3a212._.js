(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/CharacterCard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/PlanetZone'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/StarField'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
const PLACEHOLDER_CHARACTERS = [
    {
        id: "pilot",
        name: "Pilot",
        emoji: "🧑‍🚀"
    },
    {
        id: "scientist",
        name: "Scientist",
        emoji: "👩‍🔬"
    },
    {
        id: "elder",
        name: "Elder",
        emoji: "👴"
    },
    {
        id: "child",
        name: "Child",
        emoji: "🧒"
    }
];
const PLACEHOLDER_PLANETS = [
    {
        id: "mars",
        name: "Mars",
        color: "#fb923c",
        glowColor: "rgba(249,115,22,0.45)",
        size: 86
    },
    {
        id: "kepler",
        name: "Kepler-22b",
        color: "#22d3ee",
        glowColor: "rgba(103,232,249,0.38)",
        size: 108
    },
    {
        id: "proxima",
        name: "Proxima",
        color: "#a3e635",
        glowColor: "rgba(163,230,53,0.32)",
        size: 74
    }
];
const SCENARIO_PROMPT = "A solar flare is coming. Your crew must board escape pods to three destinations — but only one is truly safe. Choose wisely.";
const TIMER_SECONDS = 60;
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
    const allPlaced = PLACEHOLDER_CHARACTERS.every((c)=>assignments[c.id]);
    const handleConfirm = async ()=>{
        try {
            // TODO: replace with your real scenario ID from the fetched scenario
            const scenarioId = "placeholder-scenario-id";
            await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL}/api/answers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    scenarioId,
                    choices: assignments
                })
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
    const landedOn = (planetId)=>PLACEHOLDER_CHARACTERS.filter((c)=>assignments[c.id] === planetId);
    // Planet colour for the dot indicator under each character card
    const dotColorFor = (charId)=>PLACEHOLDER_PLANETS.find((p)=>p.id === assignments[charId])?.color;
    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
        sensors: sensors,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex flex-col relative overflow-hidden",
            style: {
                background: "radial-gradient(ellipse at 30% 20%, #1a1040 0%, #0a0618 60%, #000308 100%)",
                fontFamily: "'Nunito', sans-serif"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StarField, {
                    count: 70
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "relative z-10 flex justify-between items-center px-5 pt-6 pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-violet-300 text-xs uppercase tracking-widest",
                            style: {
                                fontFamily: "'Fredoka One', sans-serif"
                            },
                            children: "Scenario #1"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                color: timeLeft <= 10 ? "#f87171" : "#7c3aed"
                            },
                            className: "text-sm px-3 py-1 rounded-full border",
                            style: {
                                background: timeLeft <= 10 ? "rgba(248,113,113,0.12)" : "rgba(124,58,237,0.15)",
                                borderColor: timeLeft <= 10 ? "rgba(248,113,113,0.35)" : "rgba(124,58,237,0.3)"
                            },
                            children: formattedTime
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "relative z-10 px-6 pt-1 pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-indigo-100 text-sm leading-relaxed font-semibold",
                        children: SCENARIO_PROMPT
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 246,
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
                                    left: "2%",
                                    top: "8%"
                                },
                                onClick: ()=>handlePlanetTap(PLACEHOLDER_PLANETS[0].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetZone, {
                                    planet: PLACEHOLDER_PLANETS[0],
                                    landedCharacters: landedOn(PLACEHOLDER_PLANETS[0].id),
                                    isActive: activeDragOverPlanet === PLACEHOLDER_PLANETS[0].id,
                                    floatDelay: 0
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    top: "28%"
                                },
                                onClick: ()=>handlePlanetTap(PLACEHOLDER_PLANETS[1].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetZone, {
                                    planet: PLACEHOLDER_PLANETS[1],
                                    landedCharacters: landedOn(PLACEHOLDER_PLANETS[1].id),
                                    isActive: activeDragOverPlanet === PLACEHOLDER_PLANETS[1].id,
                                    floatDelay: 1.3
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    right: "2%",
                                    top: "4%"
                                },
                                onClick: ()=>handlePlanetTap(PLACEHOLDER_PLANETS[2].id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanetZone, {
                                    planet: PLACEHOLDER_PLANETS[2],
                                    landedCharacters: landedOn(PLACEHOLDER_PLANETS[2].id),
                                    isActive: activeDragOverPlanet === PLACEHOLDER_PLANETS[2].id,
                                    floatDelay: 2.1
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 255,
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
                            children: selectedCharId ? "Now tap a planet to assign" : "Tap or drag crew to a destination"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-around items-end",
                            children: PLACEHOLDER_CHARACTERS.map((char)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CharacterCard, {
                                    character: char,
                                    isPlaced: Boolean(assignments[char.id]),
                                    isSelected: selectedCharId === char.id,
                                    assignedPlanetColor: dotColorFor(char.id),
                                    onTap: handleCharTap
                                }, char.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 328,
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
                                children: "Confirm Crew"
                            }, "confirm", false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-1.5 mt-3",
                            children: [
                                0,
                                1,
                                2
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                                    style: {
                                        background: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.15)"
                                    }
                                }, i, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(GamePage, "YqLd5FpG1EKoIq8JiNNNEeWRL8g=", false, function() {
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

//# sourceMappingURL=app_page_tsx_0~3a212._.js.map