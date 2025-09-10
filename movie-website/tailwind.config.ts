import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Next.js 13 app directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // class ile dark mode kontrolü
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
    },
  },
  plugins: [],
}

export default config
