import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function Chapter3() {
    const [activeSection, setActiveSection] = useState('basics');
    const [height, setHeight] = useState(200);
    const [base, setBase] = useState(200);

    // Isosceles triangle points
    // Base is centered at x=200, y=300
    // Top vertex is at x=200, y=300-height

    const p1 = { x: 200, y: 300 - height };
    const p2 = { x: 200 - base / 2, y: 300 };
    const p3 = { x: 200 + base / 2, y: 300 };

    // Calculate side length
    const side = Math.sqrt(Math.pow(base / 2, 2) + Math.pow(height, 2));
    const angleBase = (Math.atan(height / (base / 2)) * 180 / Math.PI).toFixed(1);
    const angleTop = (180 - 2 * angleBase).toFixed(1);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-4">Isosceles & Equilateral Triangles</h1>
                <p className="text-gray-400 text-lg">
                    An isosceles triangle has at least two equal sides. An equilateral triangle has all three sides equal.
                </p>
            </header>

            {/* Section Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { id: 'basics', label: 'Definitions' },
                    { id: 'theorems', label: 'Base Angle Theorems' },
                    { id: 'special', label: 'Special Lines' },
                    { id: 'centers', label: 'Triangle Centers' },
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

            {activeSection === 'basics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl relative min-h-[400px]">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        {/* Triangle */}
                        <polygon
                            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                            fill="none"
                            stroke="#EC4899"
                            strokeWidth="3"
                        />

                        {/* Altitude / Median / Bisector */}
                        <line x1="200" y1={p1.y} x2="200" y2="300" stroke="white" strokeDasharray="4" strokeOpacity="0.5" />

                        {/* Angle Markers */}
                        <text x="200" y={p1.y - 10} fill="white" textAnchor="middle">{angleTop}°</text>
                        <text x={p2.x - 10} y={p2.y + 20} fill="white" textAnchor="middle">{angleBase}°</text>
                        <text x={p3.x + 10} y={p3.y + 20} fill="white" textAnchor="middle">{angleBase}°</text>

                        {/* Side Labels */}
                        <text x={200 - base / 4 - 20} y={300 - height / 2} fill="#EC4899" textAnchor="middle">{Math.round(side)}</text>
                        <text x={200 + base / 4 + 20} y={300 - height / 2} fill="#EC4899" textAnchor="middle">{Math.round(side)}</text>
                        <text x="200" y="320" fill="#EC4899" textAnchor="middle">{base}</text>
                    </svg>

                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded-xl p-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Height</label>
                            <input
                                type="range"
                                min="50"
                                max="280"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Base</label>
                            <input
                                type="range"
                                min="50"
                                max="300"
                                value={base}
                                onChange={(e) => setBase(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`p-6 rounded-2xl border transition-colors ${Math.abs(side - base) < 5 ? 'bg-green-500/20 border-green-500' : 'bg-white/5 border-white/10'}`}>
                        <h3 className="text-xl font-bold mb-2">
                            {Math.abs(side - base) < 5 ? 'Equilateral Triangle!' : 'Isosceles Triangle'}
                        </h3>
                        <p className="text-gray-400">
                            {Math.abs(side - base) < 5
                                ? "All three sides are equal. All angles are 60°."
                                : "Two sides are equal. The base angles are equal."}
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4 text-indigo-400">Key Definitions</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-400 font-bold">Legs:</span>
                                <span>The two equal sides of an isosceles triangle</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-400 font-bold">Base:</span>
                                <span>The third (potentially different) side</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-400 font-bold">Vertex Angle:</span>
                                <span>The angle between the two equal sides</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-400 font-bold">Base Angles:</span>
                                <span>The two angles at the endpoints of the base</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            )}

            {activeSection === 'theorems' && (
                <BaseAngleTheorems />
            )}

            {activeSection === 'special' && (
                <SpecialLinesSection />
            )}

            {activeSection === 'centers' && (
                <TriangleCenters />
            )}
        </div>
    );
}

function BaseAngleTheorems() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                <svg viewBox="0 0 400 350" className="w-full h-auto">
                    {/* Isosceles Triangle */}
                    <polygon points="200,50 80,280 320,280" fill="none" stroke="#EC4899" strokeWidth="3" />

                    {/* Equal side markers */}
                    <line x1="130" y1="155" x2="145" y2="175" stroke="#EC4899" strokeWidth="2" />
                    <line x1="135" y1="150" x2="150" y2="170" stroke="#EC4899" strokeWidth="2" />
                    <line x1="255" y1="175" x2="270" y2="155" stroke="#EC4899" strokeWidth="2" />
                    <line x1="250" y1="170" x2="265" y2="150" stroke="#EC4899" strokeWidth="2" />

                    {/* Angle bisector / altitude / median */}
                    <line x1="200" y1="50" x2="200" y2="280" stroke="#4F46E5" strokeWidth="2" strokeDasharray="5,5" />

                    {/* Right angle marker */}
                    <path d="M 200 265 L 215 265 L 215 280" fill="none" stroke="white" strokeWidth="2" />

                    {/* Base angles (equal) */}
                    <path d="M 100 280 A 20 20 0 0 0 88 265" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                    <path d="M 300 280 A 20 20 0 0 1 312 265" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />

                    {/* Labels */}
                    <text x="200" y="35" fill="white" fontSize="14" textAnchor="middle">A</text>
                    <text x="65" y="295" fill="white" fontSize="14" textAnchor="middle">B</text>
                    <text x="335" y="295" fill="white" fontSize="14" textAnchor="middle">C</text>
                    <text x="200" y="300" fill="#4F46E5" fontSize="12" textAnchor="middle">D</text>

                    <text x="95" y="255" fill="#10B981" fontSize="12">β</text>
                    <text x="305" y="255" fill="#10B981" fontSize="12">β</text>
                </svg>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-500/20 to-indigo-500/20 border border-white/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-pink-400">Base Angles Theorem</h3>
                    <p className="text-gray-200 text-lg">
                        If two sides of a triangle are congruent, then the angles opposite those sides are congruent.
                    </p>
                    <div className="mt-3 font-mono text-sm text-gray-400">
                        If AB ≅ AC, then ∠B ≅ ∠C
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-emerald-400">Converse Theorem</h3>
                    <p className="text-gray-300">
                        If two angles of a triangle are congruent, then the sides opposite those angles are congruent
                        (the triangle is isosceles).
                    </p>
                    <div className="mt-3 font-mono text-sm text-gray-400">
                        If ∠B ≅ ∠C, then AB ≅ AC
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-amber-400">Equilateral Triangle Corollary</h3>
                    <p className="text-gray-300 mb-2">
                        All angles in an equilateral triangle measure exactly 60°.
                    </p>
                    <div className="bg-amber-500/10 p-3 rounded-lg font-mono text-center">
                        ∠A = ∠B = ∠C = 60°
                    </div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                    <h4 className="font-bold text-indigo-400 mb-2">Special Case: 45-45-90 Triangle</h4>
                    <p className="text-sm text-indigo-200">
                        A right isosceles triangle has angles 45°, 45°, and 90°.
                        The legs are equal, and the hypotenuse = leg × √2.
                    </p>
                </div>
            </div>
        </div>
    );
}

function SpecialLinesSection() {
    const [activeLine, setActiveLine] = useState('altitude');

    return (
        <div className="space-y-6">
            <div className="flex gap-3 flex-wrap">
                {[
                    { id: 'altitude', label: 'Altitude' },
                    { id: 'median', label: 'Median' },
                    { id: 'bisector', label: 'Angle Bisector' },
                ].map((line) => (
                    <button
                        key={line.id}
                        onClick={() => setActiveLine(line.id)}
                        className={`px-5 py-2 rounded-xl font-medium transition-all ${
                            activeLine === line.id
                                ? 'bg-secondary text-white'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {line.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <svg viewBox="0 0 400 350" className="w-full h-auto">
                        {/* Isosceles Triangle */}
                        <polygon points="200,50 80,280 320,280" fill="none" stroke="white" strokeWidth="2" />

                        {/* The special line */}
                        <line x1="200" y1="50" x2="200" y2="280" stroke="#EC4899" strokeWidth="3" />

                        {/* Point labels */}
                        <text x="200" y="35" fill="white" fontSize="14" textAnchor="middle">A</text>
                        <text x="65" y="295" fill="white" fontSize="14" textAnchor="middle">B</text>
                        <text x="335" y="295" fill="white" fontSize="14" textAnchor="middle">C</text>
                        <text x="200" y="300" fill="#EC4899" fontSize="12" textAnchor="middle">D</text>

                        {activeLine === 'altitude' && (
                            <>
                                <path d="M 200 265 L 215 265 L 215 280" fill="none" stroke="#10B981" strokeWidth="2" />
                                <text x="230" y="270" fill="#10B981" fontSize="12">90°</text>
                            </>
                        )}

                        {activeLine === 'median' && (
                            <>
                                {/* Show BD = DC */}
                                <line x1="130" y1="283" x2="140" y2="277" stroke="#10B981" strokeWidth="2" />
                                <line x1="260" y1="277" x2="270" y2="283" stroke="#10B981" strokeWidth="2" />
                                <text x="140" y="300" fill="#10B981" fontSize="10">BD</text>
                                <text x="250" y="300" fill="#10B981" fontSize="10">DC</text>
                            </>
                        )}

                        {activeLine === 'bisector' && (
                            <>
                                {/* Angle bisector arcs */}
                                <path d="M 190 70 A 20 20 0 0 0 180 58" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                                <path d="M 210 70 A 20 20 0 0 1 220 58" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                            </>
                        )}

                        {/* Equal sides markers */}
                        <line x1="130" y1="155" x2="145" y2="175" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="135" y1="150" x2="150" y2="170" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="255" y1="175" x2="270" y2="155" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="250" y1="170" x2="265" y2="150" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-3 text-pink-400">
                            {activeLine === 'altitude' && 'Altitude to Base'}
                            {activeLine === 'median' && 'Median to Base'}
                            {activeLine === 'bisector' && 'Angle Bisector to Base'}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {activeLine === 'altitude' && 'A perpendicular segment from a vertex to the opposite side.'}
                            {activeLine === 'median' && 'A segment from a vertex to the midpoint of the opposite side.'}
                            {activeLine === 'bisector' && 'A segment that divides an angle into two equal angles.'}
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-white/20 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-3 text-emerald-400">Key Theorem</h3>
                        <p className="text-gray-200">
                            In an isosceles triangle, the <span className="text-pink-400 font-bold">{activeLine}</span> to
                            the base is also the <span className="text-cyan-400 font-bold">
                                {activeLine === 'altitude' ? 'median and angle bisector' :
                                 activeLine === 'median' ? 'altitude and angle bisector' :
                                 'altitude and median'}
                            </span>.
                        </p>
                        <div className="mt-3 text-sm text-gray-400">
                            All three special lines from the vertex angle to the base coincide!
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-3 text-amber-400">Converse Theorems</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-400">•</span>
                                If a median is also an altitude, the triangle is isosceles.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-400">•</span>
                                If an angle bisector is also an altitude, the triangle is isosceles.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-400">•</span>
                                If an angle bisector is also a median, the triangle is isosceles.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TriangleCenters() {
    const [activeCenter, setActiveCenter] = useState('incenter');

    const centers = {
        incenter: {
            name: 'Incenter',
            definition: 'The point where all three angle bisectors meet.',
            property: 'Equidistant from all three sides. Center of the inscribed circle.',
            color: '#10B981'
        },
        orthocenter: {
            name: 'Orthocenter',
            definition: 'The point where all three altitudes (or their extensions) meet.',
            property: 'Can be inside (acute), on vertex (right), or outside (obtuse) the triangle.',
            color: '#EC4899'
        },
        centroid: {
            name: 'Centroid',
            definition: 'The point where all three medians meet.',
            property: 'The "center of mass". Divides each median in ratio 2:1 from vertex.',
            color: '#4F46E5'
        }
    };

    const current = centers[activeCenter];

    return (
        <div className="space-y-6">
            <div className="flex gap-3 flex-wrap">
                {Object.entries(centers).map(([id, center]) => (
                    <button
                        key={id}
                        onClick={() => setActiveCenter(id)}
                        className={`px-5 py-2 rounded-xl font-medium transition-all ${
                            activeCenter === id
                                ? 'text-white shadow-lg'
                                : 'bg-surface text-gray-400 hover:bg-white/10'
                        }`}
                        style={activeCenter === id ? { backgroundColor: center.color } : {}}
                    >
                        {center.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <svg viewBox="0 0 400 350" className="w-full h-auto">
                        {/* Triangle */}
                        <polygon points="200,50 60,300 340,300" fill="none" stroke="white" strokeWidth="2" />

                        {activeCenter === 'incenter' && (
                            <>
                                {/* Angle bisectors */}
                                <line x1="200" y1="50" x2="200" y2="300" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="60" y1="300" x2="280" y2="145" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="340" y1="300" x2="120" y2="145" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                {/* Incenter point */}
                                <circle cx="200" cy="220" r="6" fill={current.color} />
                                {/* Inscribed circle hint */}
                                <circle cx="200" cy="220" r="45" fill="none" stroke={current.color} strokeWidth="1" strokeDasharray="4,4" />
                            </>
                        )}

                        {activeCenter === 'orthocenter' && (
                            <>
                                {/* Altitudes */}
                                <line x1="200" y1="50" x2="200" y2="300" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="60" y1="300" x2="250" y2="106" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="340" y1="300" x2="150" y2="106" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                {/* Orthocenter point */}
                                <circle cx="200" cy="170" r="6" fill={current.color} />
                                {/* Right angle markers */}
                                <rect x="195" y="285" width="10" height="10" fill="none" stroke={current.color} strokeWidth="1" />
                            </>
                        )}

                        {activeCenter === 'centroid' && (
                            <>
                                {/* Medians */}
                                <line x1="200" y1="50" x2="200" y2="300" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="60" y1="300" x2="270" y2="175" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                <line x1="340" y1="300" x2="130" y2="175" stroke={current.color} strokeWidth="2" strokeOpacity="0.5" />
                                {/* Centroid point */}
                                <circle cx="200" cy="217" r="6" fill={current.color} />
                                {/* Midpoint markers */}
                                <circle cx="200" cy="300" r="4" fill={current.color} fillOpacity="0.5" />
                                <circle cx="270" cy="175" r="4" fill={current.color} fillOpacity="0.5" />
                                <circle cx="130" cy="175" r="4" fill={current.color} fillOpacity="0.5" />
                            </>
                        )}

                        {/* Labels */}
                        <text x="200" y="35" fill="white" fontSize="14" textAnchor="middle">A</text>
                        <text x="45" y="315" fill="white" fontSize="14" textAnchor="middle">B</text>
                        <text x="355" y="315" fill="white" fontSize="14" textAnchor="middle">C</text>
                    </svg>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl border-2" style={{ borderColor: current.color, backgroundColor: `${current.color}20` }}>
                        <h3 className="text-2xl font-bold mb-3" style={{ color: current.color }}>{current.name}</h3>
                        <p className="text-gray-200 text-lg mb-2">{current.definition}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-lg font-bold mb-3 text-amber-400">Key Property</h4>
                        <p className="text-gray-300">{current.property}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-lg font-bold mb-3 text-gray-300">All Three Centers</h4>
                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#10B98120' }}>
                                <div className="font-bold text-emerald-400">Incenter</div>
                                <div className="text-gray-400">∠ bisectors</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#EC489920' }}>
                                <div className="font-bold text-pink-400">Orthocenter</div>
                                <div className="text-gray-400">Altitudes</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#4F46E520' }}>
                                <div className="font-bold text-indigo-400">Centroid</div>
                                <div className="text-gray-400">Medians</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl">
                        <h4 className="font-bold text-cyan-400 mb-2">In Equilateral Triangles</h4>
                        <p className="text-sm text-cyan-200">
                            All three centers (incenter, orthocenter, and centroid) coincide at the same point!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
