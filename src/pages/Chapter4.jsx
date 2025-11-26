import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function Chapter4() {
    const [activeSection, setActiveSection] = useState('pythagorean');
    const [a, setA] = useState(150);
    const [b, setB] = useState(200);

    const c = Math.sqrt(a * a + b * b);
    // Angle at bottom-right vertex (opposite to side a)
    const angleAtBottomRight = (Math.atan(a / b) * 180 / Math.PI).toFixed(1);
    // Angle at top vertex (opposite to side b)
    const angleAtTop = (Math.atan(b / a) * 180 / Math.PI).toFixed(1);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-4">Right Triangles</h1>
                <p className="text-gray-400 text-lg">
                    A right triangle has one 90° angle. The side opposite to the right angle is the hypotenuse.
                </p>
            </header>

            {/* Section Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { id: 'pythagorean', label: 'Pythagorean Theorem' },
                    { id: 'congruence', label: 'Congruence Rules' },
                    { id: 'special', label: 'Special Triangles' },
                    { id: 'theorems', label: 'Key Theorems' },
                ].map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            activeSection === section.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {activeSection === 'pythagorean' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl relative min-h-[400px] flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        {/* Triangle points: (50, 350), (50+b, 350), (50, 350-a) */}
                        {/* Let's center it a bit */}
                        <g transform="translate(50, 50)">
                            <polygon
                                points={`0,${a} ${b},${a} 0,0`}
                                fill="none"
                                stroke="#4F46E5"
                                strokeWidth="3"
                            />

                            {/* Right Angle Marker */}
                            <path d={`M 0 ${a - 20} L 20 ${a - 20} L 20 ${a}`} fill="none" stroke="white" />

                            {/* Angle arc at top vertex */}
                            <path
                                d={`M 0,30 A 30,30 0 0,1 ${30 * Math.sin(Math.atan(b / a))},${30 * Math.cos(Math.atan(b / a))}`}
                                fill="none"
                                stroke="#A78BFA"
                                strokeWidth="2"
                            />

                            {/* Angle arc at bottom-right vertex */}
                            <path
                                d={`M ${b - 30},${a} A 30,30 0 0,0 ${b - 30 * Math.cos(Math.atan(a / b))},${a - 30 * Math.sin(Math.atan(a / b))}`}
                                fill="none"
                                stroke="#A78BFA"
                                strokeWidth="2"
                            />

                            {/* Labels */}
                            <text x={-20} y={a / 2} fill="#EC4899" textAnchor="middle" dominantBaseline="middle">a={a}</text>
                            <text x={b / 2} y={a + 20} fill="#EC4899" textAnchor="middle" dominantBaseline="middle">b={b}</text>
                            <text x={b / 2 + 10} y={a / 2 - 10} fill="#10B981" textAnchor="middle" dominantBaseline="middle">c={Math.round(c)}</text>

                            {/* Angles */}
                            <text x={b - 45} y={a - 10} fill="#A78BFA" fontSize="12" fontWeight="bold">{angleAtBottomRight}°</text>
                            <text x={35} y={35} fill="#A78BFA" fontSize="12" fontWeight="bold">{angleAtTop}°</text>
                        </g>
                    </svg>

                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded-xl p-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Leg a</label>
                            <input
                                type="range"
                                min="50"
                                max="300"
                                value={a}
                                onChange={(e) => setA(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Leg b</label>
                            <input
                                type="range"
                                min="50"
                                max="300"
                                value={b}
                                onChange={(e) => setB(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4 text-emerald-400">Pythagorean Theorem</h3>
                        <div className="text-2xl font-mono mb-4 text-center">
                            {a}² + {b}² = <span className="text-emerald-400">{Math.round(c)}²</span>
                        </div>
                        <div className="text-sm text-gray-400 text-center">
                            {a * a} + {b * b} = {Math.round(c * c)}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4 text-indigo-400">Special Right Triangles</h3>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl border ${Math.abs(angleAtTop - 30) < 1 || Math.abs(angleAtTop - 60) < 1 ? 'border-yellow-500 bg-yellow-500/10' : 'border-transparent'}`}>
                                <h4 className="font-bold">30-60-90 Triangle</h4>
                                <p className="text-sm text-gray-400">Sides are in ratio 1 : √3 : 2</p>
                            </div>
                            <div className={`p-4 rounded-xl border ${Math.abs(a - b) < 1 ? 'border-yellow-500 bg-yellow-500/10' : 'border-transparent'}`}>
                                <h4 className="font-bold">45-45-90 Triangle</h4>
                                <p className="text-sm text-gray-400">Isosceles Right Triangle. Sides are 1 : 1 : √2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {activeSection === 'congruence' && (
                <RightTriangleCongruence />
            )}

            {activeSection === 'special' && (
                <SpecialRightTriangles />
            )}

            {activeSection === 'theorems' && (
                <RightTriangleTheorems />
            )}
        </div>
    );
}

function RightTriangleCongruence() {
    const [activeRule, setActiveRule] = useState('LL');

    const rules = {
        LL: {
            name: 'LL (Leg-Leg)',
            equiv: 'SAS',
            description: 'Two right triangles are congruent if their corresponding legs are congruent.',
            reason: 'The right angle is always the included angle between the legs.'
        },
        LA: {
            name: 'LA (Leg-Angle)',
            equiv: 'ASA',
            description: 'Two right triangles are congruent if a leg and an acute angle are congruent.',
            reason: 'The right angle plus another angle determines the third angle.'
        },
        HA: {
            name: 'HA (Hypotenuse-Angle)',
            equiv: 'AAS',
            description: 'Two right triangles are congruent if the hypotenuse and an acute angle are congruent.',
            reason: 'Similar to AAS with the right angle included.'
        },
        LH: {
            name: 'LH (Leg-Hypotenuse)',
            equiv: 'Special SSA',
            description: 'Two right triangles are congruent if a leg and the hypotenuse are congruent.',
            reason: 'Works because the right angle is opposite the longest side (hypotenuse).'
        }
    };

    const current = rules[activeRule];

    return (
        <div className="space-y-6">
            <div className="flex gap-3 flex-wrap">
                {Object.entries(rules).map(([id, rule]) => (
                    <button
                        key={id}
                        onClick={() => setActiveRule(id)}
                        className={`px-5 py-2 rounded-xl font-bold transition-all ${
                            activeRule === id
                                ? 'bg-indigo-500 text-white shadow-lg'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {id}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <svg viewBox="0 0 400 250" className="w-full h-auto">
                        {/* Two right triangles */}
                        <g>
                            {/* Triangle 1 */}
                            <polygon points="30,200 130,200 30,80" fill="none" stroke="white" strokeWidth="2" />
                            <path d="M 30 185 L 45 185 L 45 200" fill="none" stroke="white" strokeWidth="2" />
                            {/* Angle arc at top vertex */}
                            <path d="M 30,105 A 25,25 0 0,1 50,88" fill="none" stroke="#A78BFA" strokeWidth="2" />
                            {/* Angle arc at bottom-right vertex */}
                            <path d="M 105,200 A 25,25 0 0,0 118,185" fill="none" stroke="#A78BFA" strokeWidth="2" />
                            {/* Angle labels */}
                            <text x="55" y="95" fill="#A78BFA" fontSize="10">α</text>
                            <text x="105" y="190" fill="#A78BFA" fontSize="10">β</text>

                            {/* Triangle 2 */}
                            <polygon points="230,200 330,200 230,80" fill="none" stroke="white" strokeWidth="2" />
                            <path d="M 230 185 L 245 185 L 245 200" fill="none" stroke="white" strokeWidth="2" />
                            {/* Angle arc at top vertex */}
                            <path d="M 230,105 A 25,25 0 0,1 250,88" fill="none" stroke="#A78BFA" strokeWidth="2" />
                            {/* Angle arc at bottom-right vertex */}
                            <path d="M 305,200 A 25,25 0 0,0 318,185" fill="none" stroke="#A78BFA" strokeWidth="2" />
                            {/* Angle labels */}
                            <text x="255" y="95" fill="#A78BFA" fontSize="10">α</text>
                            <text x="305" y="190" fill="#A78BFA" fontSize="10">β</text>
                        </g>

                        {/* Highlights based on rule */}
                        {activeRule === 'LL' && (
                            <>
                                {/* Leg 1 (vertical) */}
                                <line x1="30" y1="200" x2="30" y2="80" stroke="#EC4899" strokeWidth="4" />
                                <line x1="230" y1="200" x2="230" y2="80" stroke="#EC4899" strokeWidth="4" />
                                {/* Leg 2 (horizontal) */}
                                <line x1="30" y1="200" x2="130" y2="200" stroke="#10B981" strokeWidth="4" />
                                <line x1="230" y1="200" x2="330" y2="200" stroke="#10B981" strokeWidth="4" />
                            </>
                        )}

                        {activeRule === 'LA' && (
                            <>
                                {/* One leg */}
                                <line x1="30" y1="200" x2="130" y2="200" stroke="#EC4899" strokeWidth="4" />
                                <line x1="230" y1="200" x2="330" y2="200" stroke="#EC4899" strokeWidth="4" />
                                {/* Acute angle at right end */}
                                <circle cx="130" cy="200" r="15" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                <circle cx="330" cy="200" r="15" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                            </>
                        )}

                        {activeRule === 'HA' && (
                            <>
                                {/* Hypotenuse */}
                                <line x1="130" y1="200" x2="30" y2="80" stroke="#EC4899" strokeWidth="4" />
                                <line x1="330" y1="200" x2="230" y2="80" stroke="#EC4899" strokeWidth="4" />
                                {/* Acute angle */}
                                <circle cx="130" cy="200" r="15" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                <circle cx="330" cy="200" r="15" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                            </>
                        )}

                        {activeRule === 'LH' && (
                            <>
                                {/* One leg */}
                                <line x1="30" y1="200" x2="130" y2="200" stroke="#10B981" strokeWidth="4" />
                                <line x1="230" y1="200" x2="330" y2="200" stroke="#10B981" strokeWidth="4" />
                                {/* Hypotenuse */}
                                <line x1="130" y1="200" x2="30" y2="80" stroke="#EC4899" strokeWidth="4" />
                                <line x1="330" y1="200" x2="230" y2="80" stroke="#EC4899" strokeWidth="4" />
                            </>
                        )}

                        <text x="200" y="140" fill="white" fontSize="20" textAnchor="middle">≅</text>
                    </svg>
                </div>

                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-white/20 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-2 text-indigo-400">{current.name}</h3>
                        <p className="text-gray-200 text-lg">{current.description}</p>
                        <div className="mt-3 text-sm text-gray-400">
                            Equivalent to: <span className="text-pink-400 font-bold">{current.equiv}</span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-lg font-bold mb-3 text-emerald-400">Why It Works</h4>
                        <p className="text-gray-300">{current.reason}</p>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                        <h4 className="font-bold text-amber-400 mb-2">Remember</h4>
                        <p className="text-sm text-amber-200">
                            Right triangle congruence rules are special cases of the general triangle
                            congruence rules, taking advantage of the known 90° angle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpecialRightTriangles() {
    const [activeTriangle, setActiveTriangle] = useState('30-60-90');

    return (
        <div className="space-y-6">
            <div className="flex gap-3">
                <button
                    onClick={() => setActiveTriangle('30-60-90')}
                    className={`px-5 py-2 rounded-xl font-bold transition-all ${
                        activeTriangle === '30-60-90'
                            ? 'bg-amber-500 text-white shadow-lg'
                            : 'bg-surface text-gray-400 hover:bg-white/10'
                    }`}
                >
                    30-60-90
                </button>
                <button
                    onClick={() => setActiveTriangle('45-45-90')}
                    className={`px-5 py-2 rounded-xl font-bold transition-all ${
                        activeTriangle === '45-45-90'
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-surface text-gray-400 hover:bg-white/10'
                    }`}
                >
                    45-45-90
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <svg viewBox="0 0 400 350" className="w-full h-auto">
                        {activeTriangle === '30-60-90' ? (
                            <>
                                {/* 30-60-90 triangle */}
                                <polygon points="50,300 350,300 50,127" fill="none" stroke="#F59E0B" strokeWidth="3" />

                                {/* Right angle marker */}
                                <path d="M 50 280 L 70 280 L 70 300" fill="none" stroke="white" strokeWidth="2" />

                                {/* Angle arc at top vertex (60°) */}
                                <path
                                    d="M 50,157 A 30,30 0 0,1 73,141"
                                    fill="none"
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                />

                                {/* Angle arc at bottom-right vertex (30°) */}
                                <path
                                    d="M 320,300 A 30,30 0 0,0 335,285"
                                    fill="none"
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                />

                                {/* Side labels */}
                                <text x="30" y="220" fill="#EC4899" fontSize="16" fontWeight="bold">a</text>
                                <text x="200" y="320" fill="#EC4899" fontSize="16" fontWeight="bold">a√3</text>
                                <text x="220" y="200" fill="#EC4899" fontSize="16" fontWeight="bold">2a</text>

                                {/* Angle labels */}
                                <text x="70" y="290" fill="white" fontSize="12">90°</text>
                                <text x="80" y="155" fill="#F59E0B" fontSize="14" fontWeight="bold">60°</text>
                                <text x="295" y="290" fill="#F59E0B" fontSize="14" fontWeight="bold">30°</text>
                            </>
                        ) : (
                            <>
                                {/* 45-45-90 triangle */}
                                <polygon points="80,300 320,300 80,60" fill="none" stroke="#06B6D4" strokeWidth="3" />

                                {/* Right angle marker */}
                                <path d="M 80 280 L 100 280 L 100 300" fill="none" stroke="white" strokeWidth="2" />

                                {/* Angle arc at top vertex (45°) */}
                                <path
                                    d="M 80,90 A 30,30 0 0,1 101,73"
                                    fill="none"
                                    stroke="#06B6D4"
                                    strokeWidth="2"
                                />

                                {/* Angle arc at bottom-right vertex (45°) */}
                                <path
                                    d="M 290,300 A 30,30 0 0,0 307,283"
                                    fill="none"
                                    stroke="#06B6D4"
                                    strokeWidth="2"
                                />

                                {/* Equal leg markers */}
                                <line x1="75" y1="175" x2="85" y2="185" stroke="#06B6D4" strokeWidth="2" />
                                <line x1="195" y1="295" x2="205" y2="305" stroke="#06B6D4" strokeWidth="2" />

                                {/* Side labels */}
                                <text x="55" y="180" fill="#EC4899" fontSize="16" fontWeight="bold">a</text>
                                <text x="195" y="325" fill="#EC4899" fontSize="16" fontWeight="bold">a</text>
                                <text x="220" y="170" fill="#EC4899" fontSize="16" fontWeight="bold">a√2</text>

                                {/* Angle labels */}
                                <text x="100" y="290" fill="white" fontSize="12">90°</text>
                                <text x="108" y="85" fill="#06B6D4" fontSize="14" fontWeight="bold">45°</text>
                                <text x="265" y="290" fill="#06B6D4" fontSize="14" fontWeight="bold">45°</text>
                            </>
                        )}
                    </svg>
                </div>

                <div className="space-y-4">
                    {activeTriangle === '30-60-90' ? (
                        <>
                            <div className="bg-amber-500/20 border border-amber-500/30 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-amber-400">30-60-90 Triangle</h3>
                                <p className="text-gray-200 mb-4">
                                    Half of an equilateral triangle! Created by drawing an altitude.
                                </p>
                                <div className="bg-black/30 p-4 rounded-xl font-mono text-center">
                                    <div className="text-lg">Side Ratios: <span className="text-amber-400">1 : √3 : 2</span></div>
                                    <div className="text-sm text-gray-400 mt-2">short leg : long leg : hypotenuse</div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-pink-400">30° Angle Theorem</h4>
                                <p className="text-gray-300 mb-3">
                                    In a right triangle with a 30° angle, the leg opposite the 30° angle
                                    is <span className="text-pink-400 font-bold">half the hypotenuse</span>.
                                </p>
                                <div className="font-mono text-sm bg-pink-500/10 p-3 rounded-lg">
                                    If ∠A = 30°, then BC = ½ · AC
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-emerald-400">Converse</h4>
                                <p className="text-gray-300">
                                    If one leg is half the hypotenuse, then the angle opposite that leg is 30°.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-cyan-500/20 border border-cyan-500/30 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-cyan-400">45-45-90 Triangle</h3>
                                <p className="text-gray-200 mb-4">
                                    A right isosceles triangle! Both legs are equal.
                                </p>
                                <div className="bg-black/30 p-4 rounded-xl font-mono text-center">
                                    <div className="text-lg">Side Ratios: <span className="text-cyan-400">1 : 1 : √2</span></div>
                                    <div className="text-sm text-gray-400 mt-2">leg : leg : hypotenuse</div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-pink-400">Key Relationships</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <span className="text-cyan-400">•</span>
                                        Hypotenuse = Leg × √2
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-cyan-400">•</span>
                                        Leg = Hypotenuse ÷ √2 = Hypotenuse × (√2/2)
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-amber-400">Real World</h4>
                                <p className="text-gray-300">
                                    This triangle appears in diagonal of squares, baseball diamonds,
                                    and many architectural designs!
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function RightTriangleTheorems() {
    const [activeTheorem, setActiveTheorem] = useState('bisector');

    return (
        <div className="space-y-6">
            <div className="flex gap-3 flex-wrap">
                {[
                    { id: 'bisector', label: 'Angle Bisector' },
                    { id: 'perpBisector', label: 'Perpendicular Bisector' },
                    { id: 'median', label: 'Median to Hypotenuse' },
                ].map((thm) => (
                    <button
                        key={thm.id}
                        onClick={() => setActiveTheorem(thm.id)}
                        className={`px-5 py-2 rounded-xl font-medium transition-all ${
                            activeTheorem === thm.id
                                ? 'bg-secondary text-white shadow-lg'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {thm.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <svg viewBox="0 0 400 350" className="w-full h-auto">
                        {activeTheorem === 'bisector' && (
                            <>
                                {/* Angle with bisector */}
                                <line x1="50" y1="200" x2="350" y2="200" stroke="white" strokeWidth="2" />
                                <line x1="200" y1="200" x2="200" y2="50" stroke="white" strokeWidth="2" />
                                <line x1="200" y1="200" x2="320" y2="80" stroke="#EC4899" strokeWidth="3" />

                                {/* Point P on bisector */}
                                <circle cx="280" cy="120" r="6" fill="#10B981" />
                                <text x="290" y="115" fill="#10B981" fontSize="14">P</text>

                                {/* Perpendicular distances */}
                                <line x1="280" y1="120" x2="280" y2="200" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4" />
                                <line x1="280" y1="120" x2="200" y2="120" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4" />

                                {/* Distance labels */}
                                <text x="285" y="165" fill="#4F46E5" fontSize="12">d₁</text>
                                <text x="235" y="115" fill="#4F46E5" fontSize="12">d₂</text>

                                {/* Equal marks */}
                                <text x="320" y="320" fill="white" fontSize="14">d₁ = d₂</text>
                            </>
                        )}

                        {activeTheorem === 'perpBisector' && (
                            <>
                                {/* Segment AB */}
                                <line x1="100" y1="250" x2="300" y2="250" stroke="white" strokeWidth="3" />
                                <circle cx="100" cy="250" r="4" fill="white" />
                                <circle cx="300" cy="250" r="4" fill="white" />
                                <text x="95" y="275" fill="white" fontSize="14">A</text>
                                <text x="295" y="275" fill="white" fontSize="14">B</text>

                                {/* Midpoint */}
                                <circle cx="200" cy="250" r="4" fill="#EC4899" />
                                <text x="195" y="275" fill="#EC4899" fontSize="12">M</text>

                                {/* Perpendicular bisector */}
                                <line x1="200" y1="50" x2="200" y2="300" stroke="#EC4899" strokeWidth="2" />

                                {/* Point P on perp bisector */}
                                <circle cx="200" cy="100" r="6" fill="#10B981" />
                                <text x="210" y="100" fill="#10B981" fontSize="14">P</text>

                                {/* Distances to A and B */}
                                <line x1="200" y1="100" x2="100" y2="250" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4" />
                                <line x1="200" y1="100" x2="300" y2="250" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4" />

                                {/* Right angle at M */}
                                <path d="M 200 235 L 215 235 L 215 250" fill="none" stroke="white" strokeWidth="2" />

                                <text x="125" y="180" fill="#4F46E5" fontSize="12">PA</text>
                                <text x="260" y="180" fill="#4F46E5" fontSize="12">PB</text>
                                <text x="280" y="320" fill="white" fontSize="14">PA = PB</text>
                            </>
                        )}

                        {activeTheorem === 'median' && (
                            <>
                                {/* Right triangle */}
                                <polygon points="80,280 320,280 80,80" fill="none" stroke="white" strokeWidth="2" />

                                {/* Right angle marker */}
                                <path d="M 80 260 L 100 260 L 100 280" fill="none" stroke="white" strokeWidth="2" />

                                {/* Angle arc at top vertex (A) */}
                                <path d="M 80,110 A 30,30 0 0,1 102,93" fill="none" stroke="#A78BFA" strokeWidth="2" />
                                {/* Angle arc at bottom-right vertex (B) */}
                                <path d="M 290,280 A 30,30 0 0,0 305,262" fill="none" stroke="#A78BFA" strokeWidth="2" />

                                {/* Angle labels */}
                                <text x="105" y="103" fill="#A78BFA" fontSize="12">α</text>
                                <text x="285" y="270" fill="#A78BFA" fontSize="12">β</text>

                                {/* Midpoint of hypotenuse */}
                                <circle cx="200" cy="180" r="5" fill="#10B981" />
                                <text x="210" y="175" fill="#10B981" fontSize="14">M</text>

                                {/* Median from C to M */}
                                <line x1="80" y1="280" x2="200" y2="180" stroke="#EC4899" strokeWidth="3" />

                                {/* Labels */}
                                <text x="65" y="295" fill="white" fontSize="14">C</text>
                                <text x="325" y="295" fill="white" fontSize="14">B</text>
                                <text x="65" y="75" fill="white" fontSize="14">A</text>

                                {/* Equal segment marks on hypotenuse */}
                                <line x1="135" y1="125" x2="145" y2="135" stroke="#4F46E5" strokeWidth="2" />
                                <line x1="255" y1="225" x2="265" y2="235" stroke="#4F46E5" strokeWidth="2" />

                                <text x="220" y="320" fill="white" fontSize="14">CM = ½ AB</text>
                            </>
                        )}
                    </svg>
                </div>

                <div className="space-y-4">
                    {activeTheorem === 'bisector' && (
                        <>
                            <div className="bg-gradient-to-r from-pink-500/20 to-emerald-500/20 border border-white/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-pink-400">Angle Bisector Theorem</h3>
                                <p className="text-gray-200">
                                    Any point on the angle bisector is <span className="text-emerald-400 font-bold">equidistant</span> from
                                    the two sides of the angle.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-emerald-400">Converse</h4>
                                <p className="text-gray-300">
                                    If a point is in the interior of an angle and is equidistant from the sides,
                                    then it lies on the angle bisector.
                                </p>
                            </div>
                        </>
                    )}

                    {activeTheorem === 'perpBisector' && (
                        <>
                            <div className="bg-gradient-to-r from-pink-500/20 to-indigo-500/20 border border-white/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-pink-400">Perpendicular Bisector Theorem</h3>
                                <p className="text-gray-200">
                                    Any point on the perpendicular bisector of a segment is <span className="text-indigo-400 font-bold">equidistant</span> from
                                    the endpoints of that segment.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-indigo-400">Converse</h4>
                                <p className="text-gray-300">
                                    If a point is equidistant from the endpoints of a segment,
                                    then it lies on the perpendicular bisector of that segment.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-amber-400">Definition</h4>
                                <p className="text-gray-300">
                                    The <span className="text-pink-400 font-bold">perpendicular bisector</span> is a line that
                                    passes through the midpoint of a segment and is perpendicular to it.
                                </p>
                            </div>
                        </>
                    )}

                    {activeTheorem === 'median' && (
                        <>
                            <div className="bg-gradient-to-r from-pink-500/20 to-emerald-500/20 border border-white/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3 text-pink-400">Median to Hypotenuse Theorem</h3>
                                <p className="text-gray-200">
                                    In a right triangle, the median to the hypotenuse is <span className="text-emerald-400 font-bold">half</span> the
                                    length of the hypotenuse.
                                </p>
                                <div className="mt-3 font-mono text-sm text-gray-400">
                                    CM = ½ AB = AM = MB
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-bold mb-3 text-emerald-400">Converse</h4>
                                <p className="text-gray-300">
                                    If a median of a triangle equals half the side to which it is drawn,
                                    then the triangle is a right triangle with the right angle at that vertex.
                                </p>
                            </div>

                            <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                                <h4 className="font-bold text-indigo-400 mb-2">Key Insight</h4>
                                <p className="text-sm text-indigo-200">
                                    The midpoint of the hypotenuse is equidistant from all three vertices!
                                    This is why it's the center of the circumscribed circle.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
