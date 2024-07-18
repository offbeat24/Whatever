import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'mobile': '320px',
      'tablet': '744px',
      'tablet-l' : '1024px',
      'laptop' : '1280px'
    },
    extend: {
      fontFamily: {
        Pretendard: ['PretendardVariable', 'sans-serif']
      },
      colors: {
        snow: "#FFFFFF",
        white: "#FAFAFA",
        gray: "#C6C6C6",
        black: "#141414",
        orange: {
          o1: "#F58700",
          o2: "#FF9700",
          o3: "#FFAB40"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-image': "url('/BG_Image.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
