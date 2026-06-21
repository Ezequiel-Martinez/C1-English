/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#25162d',
        canvas: '#f7f1fa',
        paper: '#fffaff',
        sage: {
          50: '#fbf3ff',
          100: '#f2ddff',
          400: '#d278ee',
          600: '#a43ac4',
          700: '#7c239b',
          900: '#351343',
        },
        sand: '#ead9ef',
        rust: '#dc3f7b',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Newsreader', 'serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgba(88, 25, 110, 0.11)',
      },
    },
  },
  plugins: [],
}
