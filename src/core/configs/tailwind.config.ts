import path from 'node:path'
import fs from 'node:fs'
import plugin from 'tailwindcss/plugin.js'

export const COLORS: Record<string, Record<number, string>> = {
  green: {
    50: '#F2F7F3',
    100: '#DDECDE',
    200: '#B8D6BE',
    300: '#7BB589',
    400: '#469A5D',
    500: '#2A9749',
    600: '#32834A',
    700: '#2A713F',
    800: '#245333',
    900: '#1F402A',
  },

  blue: {
    50: '#F2FDFF',
    100: '#DBF9FF',
    200: '#B6EDFA',
    300: '#85D4EE',
    400: '#51b9da',
    500: '#079BCA',
    600: '#0E81A7',
    700: '#146C8B',
    800: '#1B5268',
    900: '#1E4557',
  },

  purple: {
    50: '#F9F6FD',
    100: '#F4EDFA',
    200: '#E8DAF4',
    300: '#D7BDEA',
    400: '#C196DC',
    500: '#A56CC9',
    600: '#9156B4',
    700: '#723D8E',
    800: '#5F3375',
    900: '#512E61',
  },

  red: {
    50: '#FFF1EF',
    100: '#FFE0DC',
    200: '#FFC7BF',
    300: '#FF9F92',
    400: '#FF6854',
    500: '#FF3A1F',
    600: '#FF1E00',
    700: '#DB1A00',
    800: '#B81600',
    900: '#941908',
  },

  gray: {
    20: '#F8F8F8',
    50: '#F2F2F2',
    100: '#EBEBEB',
    200: '#E3E3E3',
    300: '#BABABA',
    400: '#A5A5A5',
    500: '#949494',
    600: '#777777',
    700: '#535353',
    800: '#403F3F',
    900: '#333333',
  },
}

const fontSize = {
  '9xl': ['128px', '128px'],
  '8xl': ['96px', '96px'],
  '7xl': ['72px', '72px'],
  '6xl': ['60px', '60px'],
  '5xl': ['48px', '48px'],
  '4xl': ['36px', '40px'],
  '3xl': ['30px', '34px'],
  '2xl': ['24px', '32px'],
  'xl': ['20px', '28px'],
  'lg': ['18px', '24px'],
  'base': ['16px', '22px'],
  'sm': ['14px', '20px'],
  'xs': ['12px', '18px'],
}

const colors = Object.keys(COLORS).reduce<Record<string, string>>(
  (acc, color) => {
    const shades = COLORS[color]
    Object.entries(shades).forEach(([shade, hex]) => {
      acc[`${color}-${shade}`] = hex
    })
    return acc
  },
  {},
)

const projectRoot = path.resolve('.')

function getContentDependencies(path: string) {
  const fileEndings = [
    'html',
    'js',
    'ts',
    'jsx',
    'tsx',
    'vue',
    'astro',
  ].join(',')

  const dirCandidates = [
    'components',
    'pages',
    'layouts',
    'helpers',
    'stories',
    'dist',
    'src',
  ]

  const fileCandidates = [
    // We also need to check the Formkit config to not
    // purge classes away that are only used there.
    // This _would_ offer Formkit support, if any project
    // decides to use it. We won't support any other form
    // framework for the time being, as this is meant to
    // be otherwise framework-agnostic.
    '/formkit.config.ts',
  ]

  // We need to explicitly filter for existing directories/files,
  // because otherwise esbuild-plugin-postcss2 will try to scan
  // directories that don't exist and will fall flat on its face.
  return [
    `./*.{${fileEndings}`,
    ...dirCandidates.map(d => `${path}/${d}`)
      .filter(d => fs.existsSync(d))
      .map(d => `${d}/**/*.{${fileEndings}}`),
    ...fileCandidates.map(f => `${path}/${f}`)
      .filter(f => fs.existsSync(f)),
  ]
}

export default {
  content: getContentDependencies(projectRoot),
  safelist: ['h-0', 'sbdocs'],
  plugins: [
    /**
     * Various additional variants
     */
    plugin(({ addVariant }) => {
      addVariant(
        'mobile-only',
        '@media screen and (max-width: theme(\'screens.md\'))',
      )
      addVariant('not-last', '&:not(:last-child)')
      addVariant('not-first', '&:not(:first-child)')
    }),
  ],
  corePlugins: {
    textOpacity: false,
    container: false,
  },
  theme: {
    screens: {
      mobile_s: '320px',
      mobile_m: '375px',
      mobile_l: '425px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1210px',
    },
    spacing: {
      220: '220px',
      140: '140px',
      120: '120px',
      100: '100px',
      90: '90px',
      80: '80px',
      70: '70px',
      60: '60px',
      50: '50px',
      40: '40px',
      30: '30px',
      25: '25px',
      20: '20px',
      15: '15px',
      10: '10px',
      8: '8px',
      5: '5px',
      3: '3px',
      2: '2px',
      1: '1px',
      0: '0px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
    },
    maxWidth: {
      reduced: '970px',
      // @todo: Consolidate sizing with container, max-width and other layout classes.
      prose: '836px',
      hero: '560px',
      fit: 'fit-content',
    },
    lineHeight: {
      none: 1,
      tight: 1.2,
      snug: 1.3,
      normal: 1.4,
    },
    fontSize,
    fontFamily: {
      sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    borderRadius: {
      none: '0px',
      full: '9999px',
      large: '10px',
      DEFAULT: '4px',
    },
    colors: {
      // Monochrome colors.
      white: '#ffffff',
      current: 'currentColor',
      transparent: 'transparent',
      body: 'black',
      ...colors,

      // The dynamic CSS variable based primary color which is overriden by the Bettingen site at runtime.
      primary: {
        50: 'rgb(var(--color-primary-50) / <alpha-value>)',
        100: 'rgb(var(--color-primary-100) / <alpha-value>)',
        200: 'rgb(var(--color-primary-200) / <alpha-value>)',
        300: 'rgb(var(--color-primary-300) / <alpha-value>)',
        400: 'rgb(var(--color-primary-400) / <alpha-value>)',
        500: 'rgb(var(--color-primary-500) / <alpha-value>)',
        600: 'rgb(var(--color-primary-600) / <alpha-value>)',
        700: 'rgb(var(--color-primary-700) / <alpha-value>)',
        800: 'rgb(var(--color-primary-800) / <alpha-value>)',
        900: 'rgb(var(--color-primary-900) / <alpha-value>)',
      },
    },
    extend: {
      gap: {
        DEFAULT: '20px',
      },
      transitionDuration: {
        250: '250ms',
      },
      boxShadow: {
        'purple-600': '0 0 10px 0 #9156B4',
        'none': '0 0 0 0 #000',
      },
    },
  },
}
