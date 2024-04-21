/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-serif': ['Roboto Serif', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif']
      },
      fontSize: {
        'day': '4rem',
      },
      colors: {
        // Primary color: Blue
        'primary-blue': '#E3FDFD',
        // Secondary color: Green
        'secondary-green': '#4ED99C',
        // Accent color: Orange
        'accent-orange': '#F4D19B',
        // Neutral color: Gray
        'neutral-gray': '#757575',
      },
    },
  },
  plugins: [],
};
