import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          pink: '#E4405F',
          purple: '#833AB4',
          orange: '#F56040',
          yellow: '#FCCC63',
          blue: '#405DE6'
        }
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #F56040, #E4405F, #833AB4, #405DE6)',
        'instagram-story': 'linear-gradient(45deg, #FCCC63, #F56040, #E4405F)',
      }
    },
  },
  plugins: [],
}
export default config