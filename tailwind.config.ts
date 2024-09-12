import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        roboto: ['--font-roboto'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in-out': {
          '0%': { background: 'white' },
          '50%': { background: '#F8F8F8' },
          '100%': { background: 'white' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '.9',
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateZ(0)',
          },
        },
        'fade-out-down': {
          '100%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
          '0%': {
            opacity: '1',
            transform: 'translateZ(0)',
          },
        },
        'top-bottom': {
          '0%': {
            top: '0%',
          },

          '100%': {
            top: '60%',
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in .1s',
        'fade-out': 'fade-out .3s',
        'fade-in-out': 'fade-in-out .5s',
        'fade-in-up': 'fade-in-up .5s',
        'fade-out-down': 'fade-out-down .3s',
        'fade-in-up-toast': 'fade-in-up .5s',
        'fade-out-down-toast': 'fade-out-down .8s',
        'top-bottom': 'top-bottom 1s linear infinite alternate',
        'bottom-top': 'top-bottom 1s linear infinite alternate-reverse',

        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
