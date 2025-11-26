import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function Chapter1() {
    const [angle, setAngle] = useState(60);
    const [hoveredConcept, setHoveredConcept] = useState(null);
    const [activeSection, setActiveSection] = useState('parallel');

    // Calculate coordinates based on angle
    // Center is (200, 200)
    // Line 1 y=100, Line 2 y=300
    // Transversal passes through center

    const radians = (angle * Math.PI) / 180;
    const dx = Math.cos(radians) * 300;
    const dy = Math.sin(radians) * 300;

    const x1 = 200 - dx;
    const y1 = 200 + dy; // Note: SVG y grows downwards, but we want visual angle.
    // Let's keep it simple: transversal line segment

    // Actually, let's fix the pivot at (200, 200)
    // Line 1 is at y=150, Line 2 is at y=250

    // Define which angles belong to each concept
    const highlightedAngles = {
        corresponding: ['1', '5', '2', '6', '3', '7', '4', '8'],
        alternateInterior: ['3', '5', '4', '6'],
        alternateExterior: ['1', '7', '2', '8'],
        sameSideInterior: ['3', '6', '4', '5'],
        sameSideExterior: ['1', '8', '2', '7'],
    };

    // Helper to check if an angle should be highlighted
    const isHighlighted = (label) => {
        if (!hoveredConcept) return false;
        return highlightedAngles[hoveredConcept]?.includes(label);
    };

    // Helper to check if an angle should be dimmed
    const isDimmed = (label) => {
        if (!hoveredConcept) return false;
        return !highlightedAngles[hoveredConcept]?.includes(label);
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-4">Parallel Lines & Angles in a Triangle</h1>
                <p className="text-gray-400 text-lg">
                    Explore angle relationships formed by parallel lines and transversals, and fundamental triangle angle properties.
                </p>
            </header>

            {/* Section Tabs */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { id: 'parallel', label: 'Parallel Lines' },
                    { id: 'triangle', label: 'Triangle Angles' },
                    { id: 'exterior', label: 'Exterior Angles' },
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

            {activeSection === 'parallel' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    <svg viewBox="0 0 400 400" className="w-full h-auto">
                        {/* Glow filters for highlighting */}
                        <defs>
                            <filter id="glow-10B981" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <filter id="glow-4F46E5" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <filter id="glow-EC4899" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Parallel Lines */}
                        <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="2" />
                        <line x1="0" y1="250" x2="400" y2="250" stroke="white" strokeWidth="2" />

                        {/* Transversal */}
                        <motion.line
                            x1={200 - Math.cos(radians) * 300}
                            y1={200 - Math.sin(radians) * 300}
                            x2={200 + Math.cos(radians) * 300}
                            y2={200 + Math.sin(radians) * 300}
                            stroke="#EC4899"
                            strokeWidth="3"
                        />

                        {/* Angles Visualization */}
                        {/* We can draw arcs to show angles */}
                        {/* Intersection 1: (200 - dx_offset, 150) */}
                        {/* We need to calculate intersection points properly */}
                        {/* Let's simplify: Pivot is at center (200, 200). But lines are at 150 and 250. */}
                        {/* So intersection 1 is where line crosses y=150. */}
                        {/* dy from center to 150 is -50. dx = -50 / tan(angle) if angle is from x axis? */}
                        {/* Let's just use a fixed pivot for the transversal at the center (200, 200) */}
                        {/* And draw the parallel lines relative to it. */}

                        {/* Angle Arcs - Upper intersection */}
                        {/* Standard convention: 1=upper-left, 2=upper-right, 3=lower-right, 4=lower-left */}
                        {/* In SVG: 0° is right, angles go clockwise. Transversal angle goes down-right. */}
                        {/* The transversal enters from upper-left (angle + 180°) and exits to lower-right (angle) */}
                        <AngleArc cx={200 - 50 / Math.tan(radians)} cy={150} startAngle={180} endAngle={180 + angle} color="#10B981" radius={28} label="1" highlighted={isHighlighted("1")} dimmed={isDimmed("1")} />
                        <AngleArc cx={200 - 50 / Math.tan(radians)} cy={150} startAngle={180 + angle} endAngle={360} color="#4F46E5" label="2" radius={20} highlighted={isHighlighted("2")} dimmed={isDimmed("2")} />
                        <AngleArc cx={200 - 50 / Math.tan(radians)} cy={150} startAngle={0} endAngle={angle} color="#10B981" radius={28} label="3" highlighted={isHighlighted("3")} dimmed={isDimmed("3")} />
                        <AngleArc cx={200 - 50 / Math.tan(radians)} cy={150} startAngle={angle} endAngle={180} color="#4F46E5" label="4" radius={20} highlighted={isHighlighted("4")} dimmed={isDimmed("4")} />

                        {/* Angle Arcs - Lower intersection */}
                        <AngleArc cx={200 + 50 / Math.tan(radians)} cy={250} startAngle={180} endAngle={180 + angle} color="#10B981" radius={28} label="5" highlighted={isHighlighted("5")} dimmed={isDimmed("5")} />
                        <AngleArc cx={200 + 50 / Math.tan(radians)} cy={250} startAngle={180 + angle} endAngle={360} color="#4F46E5" label="6" radius={20} highlighted={isHighlighted("6")} dimmed={isDimmed("6")} />
                        <AngleArc cx={200 + 50 / Math.tan(radians)} cy={250} startAngle={0} endAngle={angle} color="#10B981" radius={28} label="7" highlighted={isHighlighted("7")} dimmed={isDimmed("7")} />
                        <AngleArc cx={200 + 50 / Math.tan(radians)} cy={250} startAngle={angle} endAngle={180} color="#4F46E5" label="8" radius={20} highlighted={isHighlighted("8")} dimmed={isDimmed("8")} />

                    </svg>

                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded-xl p-4">
                        <label className="block text-sm font-medium mb-2">Transversal Angle: {angle}°</label>
                        <input
                            type="range"
                            min="30"
                            max="150"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    <ConceptCard
                        title="Corresponding Angles"
                        color="text-indigo-400"
                        description="Angles in the same relative position at each intersection are equal."
                        pairs={['∠1 = ∠5', '∠2 = ∠6', '∠3 = ∠7', '∠4 = ∠8']}
                        onHover={() => setHoveredConcept('corresponding')}
                        onLeave={() => setHoveredConcept(null)}
                        isHovered={hoveredConcept === 'corresponding'}
                    />
                    <ConceptCard
                        title="Alternate Interior Angles"
                        color="text-pink-400"
                        description="Pairs of angles on opposite sides of the transversal and between the parallel lines are equal."
                        pairs={['∠3 = ∠5', '∠4 = ∠6']}
                        onHover={() => setHoveredConcept('alternateInterior')}
                        onLeave={() => setHoveredConcept(null)}
                        isHovered={hoveredConcept === 'alternateInterior'}
                    />
                    <ConceptCard
                        title="Alternate Exterior Angles"
                        color="text-amber-400"
                        description="Pairs of angles on opposite sides of the transversal and outside the parallel lines are equal."
                        pairs={['∠1 = ∠7', '∠2 = ∠8']}
                        onHover={() => setHoveredConcept('alternateExterior')}
                        onLeave={() => setHoveredConcept(null)}
                        isHovered={hoveredConcept === 'alternateExterior'}
                    />
                    <ConceptCard
                        title="Same-Side Interior Angles"
                        color="text-emerald-400"
                        description="Pairs of angles on the same side of the transversal and between the parallel lines are supplementary (add up to 180°)."
                        pairs={['∠3 + ∠6 = 180°', '∠4 + ∠5 = 180°']}
                        onHover={() => setHoveredConcept('sameSideInterior')}
                        onLeave={() => setHoveredConcept(null)}
                        isHovered={hoveredConcept === 'sameSideInterior'}
                    />
                    <ConceptCard
                        title="Same-Side Exterior Angles"
                        color="text-cyan-400"
                        description="Pairs of angles on the same side of the transversal and outside the parallel lines are supplementary (add up to 180°)."
                        pairs={['∠1 + ∠8 = 180°', '∠2 + ∠7 = 180°']}
                        onHover={() => setHoveredConcept('sameSideExterior')}
                        onLeave={() => setHoveredConcept(null)}
                        isHovered={hoveredConcept === 'sameSideExterior'}
                    />
                </div>
            </div>
            )}

            {activeSection === 'triangle' && (
                <TriangleAngleSum />
            )}

            {activeSection === 'exterior' && (
                <ExteriorAngleSection />
            )}
        </div>
    );
}

function AngleArc({ cx, cy, startAngle, endAngle, color, radius = 20, label, highlighted = false, dimmed = false }) {
    // SVG coordinate system: y increases downward, angles measured clockwise from positive x-axis
    // Convert degrees to radians (clockwise in SVG)
    const startRad = startAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    // Large arc flag: 1 if arc > 180 degrees
    const angleDiff = endAngle - startAngle;
    const largeArc = angleDiff > 180 ? 1 : 0;
    // Sweep flag: 1 for clockwise
    const sweep = 1;

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2} Z`;

    // Position label in the middle of the arc
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = midAngle * Math.PI / 180;
    const labelX = cx + (radius + 12) * Math.cos(midRad);
    const labelY = cy + (radius + 12) * Math.sin(midRad);

    // Determine opacity and filter based on highlight state
    const fillOpacity = highlighted ? 0.7 : dimmed ? 0.1 : 0.3;
    const strokeWidth = highlighted ? 2 : 1;
    const filter = highlighted ? `url(#glow-${color.replace('#', '')})` : undefined;

    return (
        <motion.g
            animate={{
                opacity: dimmed ? 0.3 : 1,
                scale: highlighted ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
            <path
                d={d}
                fill={color}
                fillOpacity={fillOpacity}
                stroke={color}
                strokeWidth={strokeWidth}
                filter={filter}
            />
            <text
                x={labelX}
                y={labelY}
                fill={dimmed ? "#666" : "white"}
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight={highlighted ? "bold" : "normal"}
            >
                {label}
            </text>
        </motion.g>
    );
}

function ConceptCard({ title, description, pairs, color, onHover, onLeave, isHovered }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`bg-white/5 border p-6 rounded-2xl cursor-pointer transition-all duration-200 ${
                isHovered
                    ? 'border-white/30 shadow-lg shadow-white/5'
                    : 'border-white/10'
            }`}
        >
            <h3 className={`text-xl font-bold mb-2 ${color}`}>{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
                {pairs.map((p, i) => (
                    <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm font-mono transition-all duration-200 ${
                            isHovered
                                ? 'bg-white/20 text-white'
                                : 'bg-white/10'
                        }`}
                    >
                        {p}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

function TriangleAngleSum() {
    const [angleA, setAngleA] = useState(60);
    const [angleB, setAngleB] = useState(60);
    const angleC = 180 - angleA - angleB;

    // Calculate triangle vertices based on angles
    const baseLength = 200;
    const ax = 100, ay = 200;
    const bx = ax + baseLength, by = 200;

    // Calculate C position using angles
    const angleARad = (angleA * Math.PI) / 180;
    const angleBRad = (angleB * Math.PI) / 180;

    // Use law of sines to find position
    const height = (baseLength * Math.sin(angleARad) * Math.sin(angleBRad)) / Math.sin((angleA + angleB) * Math.PI / 180);
    const cx = ax + height / Math.tan(angleARad);
    const cy = ay - height;

    const isValid = angleC > 0 && angleC < 180;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col">
                <svg viewBox="0 0 400 250" className="w-full h-auto flex-shrink-0">
                    {isValid && (
                        <>
                            <polygon
                                points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                                fill="none"
                                stroke="#EC4899"
                                strokeWidth="3"
                            />

                            {/* Angle arcs */}
                            <path
                                d={describeArc(ax, ay, 25, -angleARad * 180 / Math.PI, 0)}
                                fill="#4F46E5"
                                fillOpacity="0.3"
                                stroke="#4F46E5"
                                strokeWidth="2"
                            />
                            <path
                                d={describeArc(bx, by, 25, 180, 180 + angleBRad * 180 / Math.PI)}
                                fill="#10B981"
                                fillOpacity="0.3"
                                stroke="#10B981"
                                strokeWidth="2"
                            />

                            {/* Angle labels */}
                            <text x={ax + 35} y={ay - 10} fill="#4F46E5" fontSize="14" fontWeight="bold">α={angleA}°</text>
                            <text x={bx - 55} y={by - 10} fill="#10B981" fontSize="14" fontWeight="bold">β={angleB}°</text>
                            <text x={cx - 5} y={cy - 15} fill="#EC4899" fontSize="14" fontWeight="bold">γ={angleC.toFixed(0)}°</text>
                        </>
                    )}
                    {!isValid && (
                        <text x="200" y="125" fill="red" textAnchor="middle" fontSize="16">
                            Invalid triangle (angles must sum to 180°)
                        </text>
                    )}
                </svg>

                <div className="bg-black/50 backdrop-blur rounded-xl p-4 space-y-2 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Angle α: {angleA}°</label>
                        <input
                            type="range"
                            min="10"
                            max="150"
                            value={angleA}
                            onChange={(e) => setAngleA(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Angle β: {angleB}°</label>
                        <input
                            type="range"
                            min="10"
                            max="150"
                            value={angleB}
                            onChange={(e) => setAngleB(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-indigo-400">Triangle Angle Sum Theorem</h3>
                    <p className="text-gray-300 mb-4">
                        The sum of the measures of the interior angles of a triangle is always 180°.
                    </p>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl text-center">
                        <span className="text-2xl font-mono">
                            <span className="text-indigo-400">α</span> + <span className="text-emerald-400">β</span> + <span className="text-pink-400">γ</span> = 180°
                        </span>
                        <div className="mt-2 text-gray-400">
                            {angleA}° + {angleB}° + {angleC.toFixed(0)}° = {(angleA + angleB + angleC).toFixed(0)}°
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-pink-400">Why It Works</h3>
                    <p className="text-gray-300">
                        Draw a line through one vertex parallel to the opposite side. The three angles
                        at that vertex form a straight line (180°), and by alternate interior angles,
                        two of them equal the base angles of the triangle.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ExteriorAngleSection() {
    const [interiorA, setInteriorA] = useState(50);
    const [interiorB, setInteriorB] = useState(60);
    const interiorC = 180 - interiorA - interiorB;
    const exteriorAngle = interiorA + interiorB;

    // Calculate triangle vertices based on angles
    const baseLength = 240;
    const ax = 80, ay = 200;
    const bx = ax + baseLength, by = 200;

    // Calculate C position using angles A and B
    const angleARad = (interiorA * Math.PI) / 180;
    const angleBRad = (interiorB * Math.PI) / 180;

    // Use law of sines to find the apex position
    const height = (baseLength * Math.sin(angleARad) * Math.sin(angleBRad)) / Math.sin((interiorA + interiorB) * Math.PI / 180);
    const cx = ax + height / Math.tan(angleARad);
    const cy = ay - height;

    const isValid = interiorC > 0 && interiorC < 180;

    // Calculate angles for proper arc positioning
    // Angle from B to C (in degrees, SVG coordinate system where y increases downward)
    const angleBtoC_deg = Math.atan2(cy - by, cx - bx) * 180 / Math.PI;
    // Angle from A to C
    const angleAtoC_deg = Math.atan2(cy - ay, cx - ax) * 180 / Math.PI;
    // Angle from C to A
    const angleCtoA_deg = Math.atan2(ay - cy, ax - cx) * 180 / Math.PI;
    // Angle from C to B
    const angleCtoB_deg = Math.atan2(by - cy, bx - cx) * 180 / Math.PI;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col">
                <svg viewBox="0 0 450 250" className="w-full h-auto flex-shrink-0">
                    {isValid && (
                        <>
                            {/* Triangle */}
                            <polygon
                                points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                            />

                            {/* Extended side for exterior angle */}
                            <line x1={bx} y1={by} x2={bx + 80} y2={by} stroke="#EC4899" strokeWidth="3" />

                            {/* Interior angle at A (alpha) - between base AB (0°) and line AC */}
                            <path
                                d={describeArc(ax, ay, 22, angleAtoC_deg, 0)}
                                fill="#10B981"
                                fillOpacity="0.3"
                                stroke="#10B981"
                                strokeWidth="2"
                            />

                            {/* Interior angle at C (beta) - between lines CA and CB */}
                            <path
                                d={describeArc(cx, cy, 22, angleCtoB_deg, angleCtoA_deg)}
                                fill="#10B981"
                                fillOpacity="0.3"
                                stroke="#10B981"
                                strokeWidth="2"
                            />

                            {/* Interior angle at B (gamma) - between line BC and base BA (180°) */}
                            <path
                                d={describeArc(bx, by, 25, 180, angleBtoC_deg + 360)}
                                fill="#4F46E5"
                                fillOpacity="0.3"
                                stroke="#4F46E5"
                                strokeWidth="2"
                            />

                            {/* Exterior angle arc (theta) - between line BC and extended base (0°) */}
                            <path
                                d={describeArc(bx, by, 35, angleBtoC_deg, 0)}
                                fill="#EC4899"
                                fillOpacity="0.3"
                                stroke="#EC4899"
                                strokeWidth="2"
                            />

                            {/* Labels */}
                            <text x={ax + 30} y={ay - 8} fill="#10B981" fontSize="12">α={interiorA}°</text>
                            <text x={cx + 5} y={cy + 25} fill="#10B981" fontSize="12">β={interiorB}°</text>
                            <text x={bx - 50} y={by - 15} fill="#4F46E5" fontSize="12">γ={interiorC.toFixed(0)}°</text>
                            <text x={bx + 40} y={by - 15} fill="#EC4899" fontSize="12" fontWeight="bold">θ={exteriorAngle}°</text>

                            {/* Arrow for exterior angle */}
                            <polygon points={`${bx + 75},${by - 5} ${bx + 80},${by} ${bx + 75},${by + 5}`} fill="#EC4899" />
                        </>
                    )}
                    {!isValid && (
                        <text x="225" y="125" fill="red" textAnchor="middle" fontSize="16">
                            Invalid triangle (angles must sum to 180°)
                        </text>
                    )}
                </svg>

                <div className="bg-black/50 backdrop-blur rounded-xl p-4 space-y-2 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Remote Interior α: {interiorA}°</label>
                        <input
                            type="range"
                            min="10"
                            max="80"
                            value={interiorA}
                            onChange={(e) => setInteriorA(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Remote Interior β: {interiorB}°</label>
                        <input
                            type="range"
                            min="10"
                            max="80"
                            value={interiorB}
                            onChange={(e) => setInteriorB(Number(e.target.value))}
                            className="w-full accent-emerald-500"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-pink-400">Exterior Angle Theorem</h3>
                    <p className="text-gray-300 mb-4">
                        The measure of an exterior angle of a triangle equals the sum of the measures
                        of the two remote (non-adjacent) interior angles.
                    </p>
                    <div className="bg-pink-500/10 border border-pink-500/20 p-4 rounded-xl text-center">
                        <span className="text-2xl font-mono">
                            <span className="text-pink-400">θ</span> = <span className="text-emerald-400">α</span> + <span className="text-emerald-400">β</span>
                        </span>
                        <div className="mt-2 text-gray-400">
                            {exteriorAngle}° = {interiorA}° + {interiorB}°
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-amber-400">Exterior Angle Inequality</h3>
                    <p className="text-gray-300 mb-3">
                        The measure of any exterior angle is greater than either of the remote interior angles.
                    </p>
                    <div className="space-y-2 font-mono text-sm">
                        <div className={`p-2 rounded ${exteriorAngle > interiorA ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            θ ({exteriorAngle}°) {'>'} α ({interiorA}°) ✓
                        </div>
                        <div className={`p-2 rounded ${exteriorAngle > interiorB ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            θ ({exteriorAngle}°) {'>'} β ({interiorB}°) ✓
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3 text-indigo-400">Definition</h3>
                    <p className="text-gray-300">
                        An <span className="text-pink-400 font-semibold">exterior angle</span> is the supplementary
                        angle adjacent to an interior angle, formed by extending one side of the triangle.
                    </p>
                    <div className="mt-2 font-mono text-sm text-gray-400">
                        γ + θ = 180° → {interiorC.toFixed(0)}° + {exteriorAngle}° = 180°
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to create arc path
function describeArc(cx, cy, radius, startAngle, endAngle) {
    const start = {
        x: cx + radius * Math.cos(startAngle * Math.PI / 180),
        y: cy + radius * Math.sin(startAngle * Math.PI / 180)
    };
    const end = {
        x: cx + radius * Math.cos(endAngle * Math.PI / 180),
        y: cy + radius * Math.sin(endAngle * Math.PI / 180)
    };
    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}
