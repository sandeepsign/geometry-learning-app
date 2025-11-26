import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Triangle, Ruler, Box } from 'lucide-react';
import clsx from 'clsx';

const chapters = [
    { path: '/chapter1', title: '1. Parallel Lines & Angles', icon: Ruler },
    { path: '/chapter2', title: '2. Congruent Triangles', icon: Triangle },
    { path: '/chapter3', title: '3. Isosceles & Equilateral', icon: Box }, // Using Box as a placeholder for complex shape
    { path: '/chapter4', title: '4. Right Triangles', icon: Triangle },
];

export function Sidebar() {
    return (
        <div className="w-64 h-screen bg-surface border-r border-white/10 flex flex-col p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    GeoLearn
                </h1>
            </div>

            <nav className="flex flex-col gap-2">
                {chapters.map((chapter) => (
                    <NavLink
                        key={chapter.path}
                        to={chapter.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            )
                        }
                    >
                        <chapter.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{chapter.title}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto p-4 bg-black/20 rounded-xl">
                <p className="text-xs text-gray-500 text-center">
                    Interactive Geometry Learning
                    <br />
                    v1.0.0
                </p>
            </div>
        </div>
    );
}
