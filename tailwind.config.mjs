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
        dim: '#777777',
        muted: '#555555',
        ghost: '#444444',
      },
      indigo: {
        DEFAULT: '#7880a8',
        muted: '#3a3f5c',
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
