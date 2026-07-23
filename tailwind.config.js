/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#090909',
        charcoal: '#151412',
        espresso: '#2A201A',
        ivory: '#F5F0E8',
        brass: '#B8843D',
        champagne: '#EFD9B1',
        burgundy: '#661F2B',
        navy: '#182330',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'subheadline': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.15' }],
      },
      backgroundImage: {
        'brass-gradient': 'linear-gradient(135deg, #B8843D 0%, #EFD9B1 50%, #B8843D 100%)',
        'dark-gradient': 'linear-gradient(180deg, #090909 0%, #2A201A 100%)',
        'radial-brass': 'radial-gradient(ellipse at center, rgba(184,132,61,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-brass': 'pulseBrass 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseBrass: {
          '0%, 100%': { opacity: 0.6, boxShadow: '0 0 20px rgba(184,132,61,0.3)' },
          '50%': { opacity: 1, boxShadow: '0 0 60px rgba(184,132,61,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
