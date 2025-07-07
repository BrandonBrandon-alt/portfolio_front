/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'text-cyan-400',
    'text-green-500',
    'text-yellow-300',
    'text-green-800',
    'text-sky-400',
    'text-green-600',
    'text-gray-300',
    'text-orange-500',
    'text-red-500',
    'text-yellow-400',
    'text-blue-500',
    'text-blue-600',
    'text-blue-400',
    'text-orange-400',
    'text-red-600',
    'text-gray-400',
    'text-red-700',
    'text-green-700',
    'text-purple-500',
  ],
}