/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'circular': ['CircularWeb', 'sans-serif'],
        'general': ['General', 'sans-serif'],
        'robert-medium': ['RobertMedium', 'sans-serif'],
        'robert-regular': ['RobertRegular', 'sans-serif'],
        'zentry': ['Zentry', 'sans-serif'],
      }
    },
  },
  plugins: [],
}