# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is a React 19 geometry learning app built with Vite. It provides interactive lessons on geometry topics (parallel lines, triangles) with visual SVG-based diagrams.

### Key Technologies
- **React 19** with React Router v7 for navigation
- **Tailwind CSS** with custom theme colors (primary: indigo, secondary: pink, background: slate-900, surface: slate-800)
- **Framer Motion** for animations
- **Lucide React** for icons

### Project Structure
- `src/App.jsx` - Router configuration with Layout wrapper
- `src/components/Layout.jsx` - Main layout with Sidebar and Outlet
- `src/components/Sidebar.jsx` - Navigation sidebar with chapter links
- `src/pages/` - Chapter pages (Home, Chapter1-4) containing interactive geometry lessons

### Patterns
- Pages export named functions (e.g., `export function Chapter1()`)
- Interactive diagrams use SVG with Framer Motion for animations
- Components use Tailwind's utility classes with `clsx` for conditional styling
- Custom colors defined in `tailwind.config.js` should be used: `primary`, `secondary`, `background`, `surface`
