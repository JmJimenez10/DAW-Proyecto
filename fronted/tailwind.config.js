/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        "clear-blue": "#0076be",
        "dark-blue": "#014280",
        "clear-gray": "#ccc",
      },

      backgroundImage: {
        "close-menu": "url('./assets/icons/x.svg')",
        "close-white-menu": "url('./assets/icons/x-white.svg')",
        "open-menu": "url('./assets/icons/menu.svg')",
        "check": "url('./assets/icons/check.svg')"
      },

      gridTemplateColumns: {
        // Simple 16 column grid
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

