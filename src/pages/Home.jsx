import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-purple-500">
                    Master Geometry
                    <br />
                    Visually
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Explore interactive lessons on parallel lines, triangles, and more.
                    Drag, play, and understand concepts intuitively.
                </p>

                <Link
                    to="/chapter1"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    Start Learning <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>

            <div className="mt-20 grid grid-cols-3 gap-8 w-full max-w-4xl">
                {[
                    { title: 'Interactive', desc: 'Manipulate shapes in real-time' },
                    { title: 'Visual', desc: 'See concepts come to life' },
                    { title: 'Comprehensive', desc: 'Covering key geometry topics' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
