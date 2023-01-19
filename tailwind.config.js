/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: {
        '15': '.15',
      },
      blur: {
        xs: '2px',
      },
      animation: {
        'shake': 'shake 0.72s cubic-bezier(.36, .07, .19, .97) both',
      },
      keyframes: {
        'shake': {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(2deg)' },
          '20%': { transform: 'rotate(-2deg)' },
          '30%': { transform: 'rotate(2deg)' },
          '40%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '60%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
          }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
