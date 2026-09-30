/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#7C5CFC', light: '#9B85FF', dark: '#5A3FD6' },
        accent: '#FF6B9D',
        background: '#0A0A1A',
        surface: { DEFAULT: '#13132B', light: '#1D1D3A', elevated: '#22224A' },
        glass: { DEFAULT: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.08)' },
        secondary: '#B0B0D0',
        muted: '#6B6B90',
        dim: '#454570',
        success: { DEFAULT: '#34D399', dark: '#059669' },
        danger: { DEFAULT: '#F87171', dark: '#DC2626' },
        warning: { DEFAULT: '#FBBF24', dark: '#D97706' },
        info: '#60A5FA',
        'app-border': '#252550',
      },
      fontSize: {
        xxs: ['9px', { lineHeight: '14px' }],
        xs:  ['11px', { lineHeight: '16px' }],
        sm:  ['13px', { lineHeight: '18px' }],
        md:  ['15px', { lineHeight: '22px' }],
        lg:  ['17px', { lineHeight: '24px' }],
        xl:  ['21px', { lineHeight: '28px' }],
        xxl: ['28px', { lineHeight: '36px' }],
        hero:['48px', { lineHeight: '56px' }],
      },
      borderRadius: {
        'theme-sm':  '8px',
        'theme-md':  '12px',
        'theme-lg':  '16px',
        'theme-xl':  '20px',
        'theme-xxl': '24px',
      },
    },
  },
  plugins: [],
};
