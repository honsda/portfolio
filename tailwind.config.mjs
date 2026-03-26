/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: {
        black: '#080808',
        deep: '#0d0d0d',
        surface: '#111111',
      },
      paper: {
        DEFAULT: '#e8e4dc',
        mid: '#c8c4bc',
        dim: '#999999',
        muted: '#777777',
        ghost: '#666666',
      },
      indigo: {
        DEFAULT: '#7880a8',
        muted: '#5a628f',
        faint: '#1a1e2e',
      },
      white: '#ffffff',
    },
    extend: {
      fontFamily: {
        display: ['"Zen Old Mincho"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
