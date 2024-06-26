/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      textColor: {
        skin: {
          base: 'var(--color-base)',
          light: 'var(--color-light)',
          muted: 'var(--color-muted)',
          inverted: 'var(--color-inverted)',
          assets: 'var(--color-assets)',
          liabilities: 'var(--color-liabilities)',
          brand: 'var(--color-brand)',
          'brand-hover': 'var(--color-brand-hover)',
          'brand-light': 'var(--color-brand-light)',
          'brand-light-hover': 'var(--color-brand-light-hover)',
          'brand-button-border': 'var(--color-brand-button-border)',
          'secondary': 'var(--color-secondary)',
          'secondary-hover': 'var(--color-secondary-hover)',
        }
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-base)',
          light: 'var(--color-light)',
          muted: 'var(--color-muted)',
          inverted: 'var(--color-inverted)',
          assets: 'var(--color-assets)',
          'assets-light': 'var(--color-assets-light)',
          liabilities: 'var(--color-liabilities)',
          'liabilities-light': 'var(--color-liabilities-light)',
          brand: 'var(--color-brand)',
          'brand-hover': 'var(--color-brand-hover)',
          'brand-light': 'var(--color-brand-light)',
          'brand-light-hover': 'var(--color-brand-light-hover)',
          'brand-button-border': 'var(--color-brand-button-border)',
          'secondary': 'var(--color-secondary)',
          'secondary-hover': 'var(--color-secondary-hover)',
        }
      },
      borderColor: {
        skin: {
          base: 'var(--color-base)',
          light: 'var(--color-light)',
          muted: 'var(--color-muted)',
          inverted: 'var(--color-inverted)',
          assets: 'var(--color-assets)',
          'assets-light': 'var(--color-assets-light)',
          'assets-muted': 'var(--color-assets-muted)',
          liabilities: 'var(--color-liabilities)',
          'liabilities-light': 'var(--color-liabilities-light)',
          'liabilities-muted': 'var(--color-liabilities-muted)',
          brand: 'var(--color-brand)',
          'brand-hover': 'var(--color-brand-hover)',
          'brand-light': 'var(--color-brand-light)',
          'brand-light-hover': 'var(--color-brand-light-hover)',
          'brand-button-border': 'var(--color-brand-button-border)',
          'secondary': 'var(--color-secondary)',
          'secondary-hover': 'var(--color-secondary-hover)',
          'secondary-button-border': 'var(--color-secondary-button-border)',
        }
      },
      ringColor: {
        skin: {
          brand: 'var(--color-brand)',
          light: 'var(--color-light)',
        }
      },
      colors: {
        skin: {
          base: 'var(--color-base)',
          light: 'var(--color-light)',
          muted: 'var(--color-muted)',
          inverted: 'var(--color-inverted)',
          secondary: 'var(--color-secondary)',
          assets: 'var(--color-assets)',
          'assets-light': 'var(--color-assets-light)',
          'assets-muted': 'var(--color-assets-muted)',
          liabilities: 'var(--color-liabilities)',
          'liabilities-light': 'var(--color-liabilities-light)',
          'liabilities-muted': 'var(--color-liabilities-muted)',
        }
      },
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
