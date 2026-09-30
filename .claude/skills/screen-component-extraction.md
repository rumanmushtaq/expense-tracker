---
name: screen-component-extraction
description: Extract hero sections and form cards from screen files into reusable components. Apply to any screen that has inline hero or form UI.
---

# Screen Component Extraction

## Rule
Every screen file must contain ONLY: hook calls, layout wrapper, and component composition.
No form fields, no StyleSheet entries for form UI, no inline hero/header JSX in the screen file.

## Pattern

### Auth screens
Each auth screen must use two components:
- `AuthHero` — the animated icon/title header (from `src/components/AuthHero.tsx`)
- A `*FormCard` component — the card containing all form fields and buttons

### Tab screens (add, settings)
Each screen must extract all form UI into a `*FormCard` component in `src/components/`.

## AuthHero props
```tsx
interface AuthHeroProps {
  icon: string;                          // Ionicons name
  gradientColors: readonly [string, string];
  glowColor: string;                     // used for the glow blob behind the icon
  title: string;
  subtitle: string;
}
```
Usage:
```tsx
<AuthHero
  icon="wallet"
  gradientColors={[Colors.primaryLight, Colors.primaryDark]}
  glowColor={Colors.primary}
  title="Welcome Back"
  subtitle="Sign in to your account"
/>
```

## FormCard convention
- All `StyleSheet` for shadow/border/bg lives inside the component file
- Screen passes only: `control`, `errors`, handler functions, and primitive state (booleans, strings)
- No business logic inside the component — hooks stay in the screen or in `useXxxForm` hooks
- Use NativeWind `className` for all spacing, typography, color; keep `style` only for:
  - `...Shadow.lg` or `Shadow.glow()` spreads
  - `LinearGradient` `style` prop
  - Dynamic color opacities (`Colors.primary + '22'`)
  - Absolute/transform positioning

## File locations
- `src/components/AuthHero.tsx` — shared auth hero
- `src/components/LoginFormCard.tsx` — login form
- `src/components/RegisterFormCard.tsx` — register form
- `src/components/AddExpenseFormCard.tsx` — add expense form
- `src/components/ForgotPasswordFormCard.tsx` — forgot password form
- `src/components/ResetPasswordFormCard.tsx` — reset password form

## Screen file template after extraction
```tsx
export default function LoginScreen() {
  const router = useRouter();
  const { biometricEnabled } = useAuth();
  const { form, handleLogin, ... } = useLoginForm();
  const { control, formState: { errors } } = form;

  return (
    <View className="flex-1 bg-background">
      <LinearGradient colors={Colors.gradientAuth} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlob} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll} ...>
        <AuthHero icon="wallet" gradientColors={[...]} glowColor={Colors.primary} title="..." subtitle="..." />
        <LoginFormCard control={control} errors={errors} ... />
        {/* footer */}
      </KeyboardAwareScrollView>
    </View>
  );
}

// StyleSheet: only glowBlob + scroll contentContainerStyle
```
