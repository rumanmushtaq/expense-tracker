export const Colors = {
  // Primary palette
  primary: '#7C5CFC',
  primaryLight: '#9B85FF',
  primaryDark: '#5A3FD6',
  primaryGlow: 'rgba(124, 92, 252, 0.25)',

  // Accent
  accent: '#FF6B9D',
  accentLight: '#FF8FB5',

  // Extended palette (used in categories, charts, badges)
  purple: '#A78BFA',
  pink: '#F472B6',
  teal: '#2DD4BF',
  slate: '#94A3B8',

  // Backgrounds
  background: '#0A0A1A',
  surface: '#13132B',
  surfaceLight: '#1D1D3A',
  surfaceElevated: '#22224A',
  card: '#171736',

  // Glass effect
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',

  // Text
  text: '#FFFFFF',
  textSecondary: '#B0B0D0',
  textMuted: '#6B6B90',
  textDim: '#454570',

  // Semantic
  success: '#34D399',
  successDark: '#059669',
  danger: '#F87171',
  dangerDark: '#DC2626',
  warning: '#FBBF24',
  warningDark: '#D97706',
  info: '#60A5FA',

  // Borders
  border: '#252550',
  borderLight: '#303060',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#7C5CFC', '#9B85FF', '#B8A5FF'] as const,
  gradientHeader:  ['#13132B', '#0A0A1A'] as const,
  gradientCard:    ['rgba(124, 92, 252, 0.08)', 'rgba(124, 92, 252, 0.02)'] as const,
  gradientDanger:  ['#F87171', '#EF4444'] as const,
  gradientSuccess: ['#34D399', '#10B981'] as const,
  gradientAuth:    ['#160d35', '#0d0d1f', '#0A0A1A'] as const,
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const FontSize = {
  xxs: 9,
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 21,
  xxl: 28,
  xxxl: 38,
  hero: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  }),
};
