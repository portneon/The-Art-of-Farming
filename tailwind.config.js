/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Palette: "Deep Earth & Morning Mist"
        alabaster: '#F4F5F0',       // Canvas/Background
        'deep-green': '#1A2F1C',    // Primary Text/Headings
        sage: '#4A6741',            // Secondary UI Elements
        terracotta: '#C77D63',      // Accent/Buttons
      },
      fontFamily: {
        // Typography: "Editorial Precision"
        serif: ['"Playfair Display"', 'serif'], // Headings
        sans: ['"Inter"', 'sans-serif'],        // Body
        mono: ['"Space Mono"', 'monospace'],    
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}