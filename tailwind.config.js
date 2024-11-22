/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        timeLine: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      backdropBlur: {
        timeLine: '57px'
      }
    }
  },
  plugins: [
    forms,
    aspectRatio,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.backdrop-blur-timeLine': {
          backdropFilter: 'blur(57px)'
        }
      })
    })
  ]
}
