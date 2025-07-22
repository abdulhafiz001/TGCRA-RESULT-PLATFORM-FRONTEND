// TGCRA Result Platform Color Constants
export const COLORS = {
  // Primary Brand Colors
  primary: {
    red: '#f30401',      // Main brand red
    yellow: '#e8bf41',   // Brand yellow/gold
    blue: '#2335c2',     // Brand blue
  },
  
  // Extended Color Palette
  secondary: {
    lightRed: '#ff4444',
    darkRed: '#cc0300',
    lightYellow: '#f5d76e',
    darkYellow: '#d4a017',
    lightBlue: '#4a5bc7',
    darkBlue: '#1a2899',
  },
  
  // Neutral Colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  
  // Status Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    dark: '#0f172a',
    overlay: 'rgba(0, 0, 0, 0.5)',
  }
};

// CSS Custom Properties for Tailwind
export const CSS_VARIABLES = {
  '--color-primary-red': COLORS.primary.red,
  '--color-primary-yellow': COLORS.primary.yellow,
  '--color-primary-blue': COLORS.primary.blue,
  '--color-secondary-light-red': COLORS.secondary.lightRed,
  '--color-secondary-dark-red': COLORS.secondary.darkRed,
  '--color-secondary-light-yellow': COLORS.secondary.lightYellow,
  '--color-secondary-dark-yellow': COLORS.secondary.darkYellow,
  '--color-secondary-light-blue': COLORS.secondary.lightBlue,
  '--color-secondary-dark-blue': COLORS.secondary.darkBlue,
};

// Gradient Combinations
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.primary.yellow} 0%, ${COLORS.primary.red} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.primary.blue} 0%, ${COLORS.primary.yellow} 100%)`,
  hero: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 50%, ${COLORS.primary.yellow} 100%)`,
};

export default COLORS;
