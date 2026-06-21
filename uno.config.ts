import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1A3C2E',
        dark: '#0f241c',
        light: '#28503e',
      },
      secondary: {
        DEFAULT: '#C4862A',
        dark: '#9d691e',
        light: '#d89b3f',
      },
      accent: {
        DEFAULT: '#E8D5B0',
        dark: '#d5bd8e',
        light: '#f5e8cd',
      },
      bg: {
        DEFAULT: '#F9F6F0',
        dark: '#e8e2d4',
      },
      dark: {
        DEFAULT: '#1C1C1C',
        light: '#2d2d2d',
      },
      charcoal: '#2D2D2D',
      
      // Theme mapping variables for compatibility with Radix/shadcn components
      background: '#F9F6F0',
      foreground: '#2D2D2D',
      card: {
        DEFAULT: '#FFFFFF',
        foreground: '#2D2D2D'
      },
      popover: {
        DEFAULT: '#FFFFFF',
        foreground: '#2D2D2D'
      },
      muted: {
        DEFAULT: '#E8D5B0',
        foreground: '#6b7280'
      },
      border: '#E2E8F0',
      input: '#E2E8F0',
      ring: '#1A3C2E'
    },
    borderRadius: {
      lg: '1rem',
      md: '0.75rem',
      sm: '0.5rem'
    }
  },
  shortcuts: {
    'btn-primary': 'bg-primary text-[#F9F6F0] hover:bg-primary-light px-6 py-3 rounded-lg font-title font-medium transition duration-200 shadow-sm flex items-center justify-center gap-2',
    'btn-secondary': 'bg-secondary text-white hover:bg-secondary-light px-6 py-3 rounded-lg font-title font-medium transition duration-200 shadow-sm flex items-center justify-center gap-2',
    'btn-outline': 'border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-title font-medium transition duration-200 flex items-center justify-center gap-2',
    'card-premium': 'bg-white rounded-lg p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition duration-300',
  }
})
