import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
