import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Chapter2() {
    const [activeTab, setActiveTab] = useState('SSS');
    const [activeSection, setActiveSection] = useState('rules');

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-4">Congruent Triangles</h1>
                <p className="text-gray-400 text-lg">
                    Two triangles are congruent if they have the same size and shape.
                    Explore the different criteria that guarantee congruence.
                </p>
            </header>

            {/* Section Tabs */}
            <div className="flex gap-2 flex-wrap mb-4">
                {[
                    { id: 'rules', label: 'Congruence Rules' },
                    { id: 'cpctc', label: 'CPCTC' },
                    { id: 'invalid', label: 'Invalid Cases' },
                ].map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            activeSection === section.id
                                ? 'bg-secondary text-white shadow-lg'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {activeSection === 'rules' && (
            <>
            <div className="flex gap-4 mb-8 flex-wrap">
                {['SSS', 'SAS', 'ASA', 'AAS', 'HL'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 min-h-[400px] flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            <CongruenceDemo type={activeTab} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">
                        {activeTab === 'SSS' && 'Side-Side-Side'}
                        {activeTab === 'SAS' && 'Side-Angle-Side'}
                        {activeTab === 'ASA' && 'Angle-Side-Angle'}
                        {activeTab === 'AAS' && 'Angle-Angle-Side'}
                        {activeTab === 'HL' && 'Hypotenuse-Leg'}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        {activeTab === 'SSS' && "If three sides of one triangle are equal to three sides of another triangle, then the triangles are congruent."}
                        {activeTab === 'SAS' && "If two sides and the included angle of one triangle are equal to two sides and the included angle of another triangle, then the triangles are congruent."}
                        {activeTab === 'ASA' && "If two angles and the included side of one triangle are equal to two angles and the included side of another triangle, then the triangles are congruent."}
                        {activeTab === 'AAS' && "If two angles and a non-included side of one triangle are equal to two angles and the corresponding non-included side of another triangle, then the triangles are congruent."}
                        {activeTab === 'HL' && "If the hypotenuse and one leg of a right triangle are equal to the hypotenuse and one leg of another right triangle, then the triangles are congruent."}
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                        <h4 className="font-bold text-blue-400 mb-2">Key Insight</h4>
                        <p className="text-sm text-blue-200">
                            {activeTab === 'SSS' && "SSS is rigid. You cannot deform a triangle made of 3 rigid sticks."}
                            {activeTab === 'SAS' && "The angle 'locks' the two sides in place, fixing the third side."}
                            {activeTab === 'ASA' && "The two angles fix the direction of the sides, determining where they meet."}
                            {activeTab === 'AAS' && "Knowing two angles automatically gives you the third (180° rule), turning it into ASA."}
                            {activeTab === 'HL' && "Specific to right triangles. It's a special case of SSA which works only for right angles."}
                        </p>
                    </div>
                </div>
            </div>
            </>
            )}

            {activeSection === 'cpctc' && (
                <CPCTCSection />
            )}

            {activeSection === 'invalid' && (
                <InvalidCasesSection />
            )}
        </div>
    );
}

function CongruenceDemo({ type }) {
    // Simple SVG visualization
    // We draw two triangles separated
    // Then we highlight the matching parts

    const t1 = { p1: [50, 150], p2: [150, 150], p3: [100, 50] };
    const t2 = { p1: [250, 150], p2: [350, 150], p3: [300, 50] };

    const highlightColor = "#EC4899";
    const baseColor = "white";

    return (
        <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Base triangles - hide for HL since it uses different triangle shape */}
            {type !== 'HL' && (
                <>
                    {/* Triangle 1 */}
                    <polygon points="50,150 150,150 100,50" fill="none" stroke={baseColor} strokeWidth="2" />
                    {/* Triangle 2 */}
                    <polygon points="250,150 350,150 300,50" fill="none" stroke={baseColor} strokeWidth="2" />
                </>
            )}

            {/* Highlights based on type */}
            {type === 'SSS' && (
                <>
                    <line x1="50" y1="150" x2="150" y2="150" stroke={highlightColor} strokeWidth="4" />
                    <line x1="250" y1="150" x2="350" y2="150" stroke={highlightColor} strokeWidth="4" />

                    <line x1="50" y1="150" x2="100" y2="50" stroke={highlightColor} strokeWidth="4" strokeDasharray="4" />
                    <line x1="250" y1="150" x2="300" y2="50" stroke={highlightColor} strokeWidth="4" strokeDasharray="4" />

                    <line x1="150" y1="150" x2="100" y2="50" stroke={highlightColor} strokeWidth="4" strokeDasharray="2" />
                    <line x1="350" y1="150" x2="300" y2="50" stroke={highlightColor} strokeWidth="4" strokeDasharray="2" />
                </>
            )}

            {type === 'SAS' && (
                <>
                    <line x1="50" y1="150" x2="150" y2="150" stroke={highlightColor} strokeWidth="4" />
                    <line x1="250" y1="150" x2="350" y2="150" stroke={highlightColor} strokeWidth="4" />

                    <line x1="50" y1="150" x2="100" y2="50" stroke={highlightColor} strokeWidth="4" />
                    <line x1="250" y1="150" x2="300" y2="50" stroke={highlightColor} strokeWidth="4" />

                    <circle cx="50" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                    <circle cx="250" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                </>
            )}

            {/* ASA: Two angles and the included side */}
            {type === 'ASA' && (
                <>
                    {/* Highlight included side (bottom) */}
                    <line x1="50" y1="150" x2="150" y2="150" stroke={highlightColor} strokeWidth="4" />
                    <line x1="250" y1="150" x2="350" y2="150" stroke={highlightColor} strokeWidth="4" />

                    {/* Highlight angles at both ends of the included side */}
                    <circle cx="50" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                    <circle cx="250" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />

                    <circle cx="150" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                    <circle cx="350" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                </>
            )}

            {/* AAS: Two angles and a non-included side */}
            {type === 'AAS' && (
                <>
                    {/* Highlight non-included side (left slanted side) */}
                    <line x1="50" y1="150" x2="100" y2="50" stroke={highlightColor} strokeWidth="4" />
                    <line x1="250" y1="150" x2="300" y2="50" stroke={highlightColor} strokeWidth="4" />

                    {/* Highlight angle at top (not adjacent to highlighted side's other end) */}
                    <circle cx="100" cy="50" r="15" fill={highlightColor} fillOpacity="0.3" />
                    <circle cx="300" cy="50" r="15" fill={highlightColor} fillOpacity="0.3" />

                    {/* Highlight angle at bottom right (not adjacent to highlighted side) */}
                    <circle cx="150" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                    <circle cx="350" cy="150" r="15" fill={highlightColor} fillOpacity="0.3" />
                </>
            )}

            {/* HL: Right triangles with hypotenuse and leg highlighted */}
            {type === 'HL' && (
                <>
                    {/* Draw right triangles over the base triangles */}
                    {/* Triangle 1: right angle at bottom left */}
                    <polygon points="50,150 150,150 50,50" fill="none" stroke={baseColor} strokeWidth="2" />
                    {/* Triangle 2: right angle at bottom left */}
                    <polygon points="250,150 350,150 250,50" fill="none" stroke={baseColor} strokeWidth="2" />

                    {/* Right angle markers */}
                    <path d="M 50 130 L 70 130 L 70 150" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M 250 130 L 270 130 L 270 150" fill="none" stroke="white" strokeWidth="2" />

                    {/* Highlight hypotenuse (slanted side from bottom right to top left) */}
                    <line x1="150" y1="150" x2="50" y2="50" stroke={highlightColor} strokeWidth="4" />
                    <line x1="350" y1="150" x2="250" y2="50" stroke={highlightColor} strokeWidth="4" />

                    {/* Highlight one leg (bottom side) */}
                    <line x1="50" y1="150" x2="150" y2="150" stroke="#10B981" strokeWidth="4" />
                    <line x1="250" y1="150" x2="350" y2="150" stroke="#10B981" strokeWidth="4" />
                </>
            )}
        </svg>
    );
}

function CPCTCSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                <svg viewBox="0 0 400 250" className="w-full h-auto">
                    {/* Two congruent triangles */}
                    <g>
                        {/* Triangle ABC */}
                        <polygon points="50,200 150,200 100,80" fill="none" stroke="#4F46E5" strokeWidth="3" />
                        <text x="40" y="215" fill="#4F46E5" fontSize="14" fontWeight="bold">A</text>
                        <text x="155" y="215" fill="#4F46E5" fontSize="14" fontWeight="bold">B</text>
                        <text x="95" y="70" fill="#4F46E5" fontSize="14" fontWeight="bold">C</text>

                        {/* Side markers for ABC */}
                        <line x1="45" y1="140" x2="55" y2="140" stroke="#4F46E5" strokeWidth="2" transform="rotate(-56, 50, 140)" />
                        <line x1="145" y1="140" x2="155" y2="140" stroke="#4F46E5" strokeWidth="2" transform="rotate(56, 150, 140)" />
                        <line x1="95" y1="203" x2="105" y2="203" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="95" y1="197" x2="105" y2="197" stroke="#4F46E5" strokeWidth="2" />
                    </g>

                    <g>
                        {/* Triangle DEF (congruent) */}
                        <polygon points="250,200 350,200 300,80" fill="none" stroke="#EC4899" strokeWidth="3" />
                        <text x="240" y="215" fill="#EC4899" fontSize="14" fontWeight="bold">D</text>
                        <text x="355" y="215" fill="#EC4899" fontSize="14" fontWeight="bold">E</text>
                        <text x="295" y="70" fill="#EC4899" fontSize="14" fontWeight="bold">F</text>

                        {/* Side markers for DEF */}
                        <line x1="245" y1="140" x2="255" y2="140" stroke="#EC4899" strokeWidth="2" transform="rotate(-56, 250, 140)" />
                        <line x1="345" y1="140" x2="355" y2="140" stroke="#EC4899" strokeWidth="2" transform="rotate(56, 350, 140)" />
                        <line x1="295" y1="203" x2="305" y2="203" stroke="#EC4899" strokeWidth="2" />
                        <line x1="295" y1="197" x2="305" y2="197" stroke="#EC4899" strokeWidth="2" />
                    </g>

                    {/* Congruence symbol */}
                    <text x="200" y="140" fill="white" fontSize="20" textAnchor="middle">≅</text>

                    {/* Angle arcs */}
                    <path d="M 65 200 A 15 15 0 0 0 58 185" fill="none" stroke="#10B981" strokeWidth="2" />
                    <path d="M 265 200 A 15 15 0 0 0 258 185" fill="none" stroke="#10B981" strokeWidth="2" />
                </svg>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-white/20 p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-3 text-white">CPCTC</h3>
                    <p className="text-xl text-gray-200 mb-2">
                        <span className="text-indigo-400">C</span>orresponding{' '}
                        <span className="text-indigo-400">P</span>arts of{' '}
                        <span className="text-indigo-400">C</span>ongruent{' '}
                        <span className="text-indigo-400">T</span>riangles are{' '}
                        <span className="text-indigo-400">C</span>ongruent
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold mb-3 text-emerald-400">What It Means</h4>
                    <p className="text-gray-300 mb-4">
                        Once you prove two triangles are congruent using any rule (SSS, SAS, ASA, AAS, HL),
                        you can conclude that ALL corresponding parts are congruent.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-indigo-500/10 p-3 rounded-lg">
                            <div className="font-bold text-indigo-400 mb-2">Corresponding Sides</div>
                            <div className="space-y-1 font-mono text-gray-300">
                                <div>AB ≅ DE</div>
                                <div>BC ≅ EF</div>
                                <div>AC ≅ DF</div>
                            </div>
                        </div>
                        <div className="bg-pink-500/10 p-3 rounded-lg">
                            <div className="font-bold text-pink-400 mb-2">Corresponding Angles</div>
                            <div className="space-y-1 font-mono text-gray-300">
                                <div>∠A ≅ ∠D</div>
                                <div>∠B ≅ ∠E</div>
                                <div>∠C ≅ ∠F</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-400 mb-2">Important Note</h4>
                    <p className="text-sm text-amber-200">
                        Matching corresponding parts correctly is essential! The order of vertices in the
                        congruence statement (△ABC ≅ △DEF) tells you which parts correspond.
                    </p>
                </div>
            </div>
        </div>
    );
}

function InvalidCasesSection() {
    const [showSSA, setShowSSA] = useState(true);

    return (
        <div className="space-y-8">
            <div className="flex gap-4">
                <button
                    onClick={() => setShowSSA(true)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                        showSSA ? 'bg-red-500 text-white' : 'bg-surface text-gray-400 hover:bg-white/10'
                    }`}
                >
                    SSA (Ambiguous)
                </button>
                <button
                    onClick={() => setShowSSA(false)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                        !showSSA ? 'bg-red-500 text-white' : 'bg-surface text-gray-400 hover:bg-white/10'
                    }`}
                >
                    AAA (Similar, Not Congruent)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-red-500/30 shadow-2xl">
                    <svg viewBox="0 0 400 250" className="w-full h-auto">
                        {showSSA ? (
                            <>
                                {/* SSA Ambiguous Case - Two possible triangles */}
                                <text x="200" y="25" fill="white" fontSize="14" textAnchor="middle">
                                    Two different triangles with the same SSA!
                                </text>

                                {/* First triangle */}
                                <g transform="translate(0, 30)">
                                    <polygon points="30,170 150,170 100,70" fill="none" stroke="#4F46E5" strokeWidth="2" />
                                    {/* Highlight two sides */}
                                    <line x1="30" y1="170" x2="150" y2="170" stroke="#EC4899" strokeWidth="4" />
                                    <line x1="30" y1="170" x2="100" y2="70" stroke="#EC4899" strokeWidth="4" />
                                    {/* Angle marker at non-included angle */}
                                    <circle cx="150" cy="170" r="12" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                </g>

                                {/* Second triangle (different shape, same SSA) */}
                                <g transform="translate(200, 30)">
                                    <polygon points="30,170 150,170 60,70" fill="none" stroke="#4F46E5" strokeWidth="2" />
                                    {/* Same two sides highlighted */}
                                    <line x1="30" y1="170" x2="150" y2="170" stroke="#EC4899" strokeWidth="4" />
                                    <line x1="30" y1="170" x2="60" y2="70" stroke="#EC4899" strokeWidth="4" />
                                    {/* Same angle at non-included position */}
                                    <circle cx="150" cy="170" r="12" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                </g>

                                {/* Not equal sign */}
                                <text x="200" y="140" fill="#EF4444" fontSize="24" textAnchor="middle">≢</text>
                            </>
                        ) : (
                            <>
                                {/* AAA Case - Similar but not congruent */}
                                <text x="200" y="25" fill="white" fontSize="14" textAnchor="middle">
                                    Same angles, different sizes!
                                </text>

                                {/* Large triangle */}
                                <polygon points="50,200 200,200 125,60" fill="none" stroke="#4F46E5" strokeWidth="2" />
                                {/* Angle markers */}
                                <circle cx="50" cy="200" r="15" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                <circle cx="200" cy="200" r="15" fill="#EC4899" fillOpacity="0.3" stroke="#EC4899" strokeWidth="2" />
                                <circle cx="125" cy="60" r="15" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />

                                {/* Small triangle (same angles) */}
                                <polygon points="270,200 345,200 307,130" fill="none" stroke="#4F46E5" strokeWidth="2" />
                                {/* Same angle markers */}
                                <circle cx="270" cy="200" r="10" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                <circle cx="345" cy="200" r="10" fill="#EC4899" fillOpacity="0.3" stroke="#EC4899" strokeWidth="2" />
                                <circle cx="307" cy="130" r="10" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />

                                {/* Similar symbol */}
                                <text x="235" y="160" fill="#F59E0B" fontSize="20" textAnchor="middle">~</text>
                                <text x="235" y="180" fill="gray" fontSize="12" textAnchor="middle">(similar)</text>
                            </>
                        )}
                    </svg>
                </div>

                <div className="space-y-4">
                    {showSSA ? (
                        <>
                            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-red-400">SSA: Cannot Be Determined (CNBD)</h3>
                                <p className="text-gray-300 mb-4">
                                    When you know two sides and an angle NOT between them (Side-Side-Angle),
                                    you cannot determine a unique triangle. This is called the <span className="text-red-400 font-bold">Ambiguous Case</span>.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-amber-400">Why It Fails</h4>
                                <p className="text-gray-300">
                                    Given two sides and a non-included angle, the third side can "swing" to
                                    different positions, creating two possible triangles (or sometimes none or one).
                                </p>
                            </div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                                <h4 className="font-bold text-emerald-400 mb-2">Exception: Right Triangles</h4>
                                <p className="text-sm text-emerald-200">
                                    SSA works for right triangles when the right angle is opposite the longest
                                    side (hypotenuse). This is why HL (Hypotenuse-Leg) is valid!
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-red-400">AAA: Cannot Be Determined (CNBD)</h3>
                                <p className="text-gray-300 mb-4">
                                    When you only know three angles (Angle-Angle-Angle), you can have infinitely
                                    many triangles with those angles but different sizes.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-amber-400">Similar vs Congruent</h4>
                                <p className="text-gray-300 mb-3">
                                    AAA guarantees <span className="text-amber-400 font-bold">similarity</span> (same shape),
                                    but NOT <span className="text-indigo-400 font-bold">congruence</span> (same shape AND size).
                                </p>
                                <div className="flex gap-4 text-sm">
                                    <div className="flex-1 bg-amber-500/10 p-3 rounded-lg">
                                        <div className="font-bold text-amber-400">Similar (~)</div>
                                        <div className="text-gray-400">Same shape</div>
                                    </div>
                                    <div className="flex-1 bg-indigo-500/10 p-3 rounded-lg">
                                        <div className="font-bold text-indigo-400">Congruent (≅)</div>
                                        <div className="text-gray-400">Same shape & size</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                <h4 className="font-bold text-gray-300 mb-2">Remember</h4>
                                <p className="text-sm text-gray-400">
                                    You need at least one side measurement to prove congruence.
                                    Angles alone only tell you the shape, not the size.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
