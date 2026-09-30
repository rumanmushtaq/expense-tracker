---
name: screen-component-extraction
description: Extract hero sections and form cards from screen files into reusable components, and move all types/interfaces out of tsx files into src/types/. Apply to any screen or component that violates these rules.
---

# Screen Component Extraction & Type Extraction

---

## Rule 1 — Screen Component Extraction

Every screen file must contain ONLY: hook calls, layout wrapper, and component composition.
No form fields, no StyleSheet entries for form UI, no inline hero/header JSX in the screen file.

### Pattern

**Auth screens** — each must use:
- `AuthHero` — the animated icon/title header (`src/components/AuthHero.tsx`)
- A `*FormCard` component — all form fields, buttons, error display
- `AuthFooterLink` — animated footer row with prompt text + navigation link

**Tab screens (add, settings)** — extract all form UI into a `*FormCard` component in `src/components/`.

**StyleSheet** is kept only for: `Shadow` spreads, `LinearGradient` `style` prop, dynamic color opacities (`Colors.primary + '22'`), and absolute/transform positioning. Everything else uses NativeWind `className`.

### AuthHero props
```tsx
interface AuthHeroProps {
  icon: string;                          // Ionicons name
  gradientColors: readonly [string, string];
  glowColor: string;
  title: string;
  subtitle: string;
}
```

### FormCard convention
- All `StyleSheet` for the card's layout lives inside the component file
- Screen passes only: `control`, `errors`, handler functions, and primitive state
- No business logic inside the component — hooks stay in `use*.ts` files
- NativeWind `className` for spacing/typography/color; `style` only for the exceptions above

### File locations
- `src/components/AuthHero.tsx` — shared auth hero
- `src/components/AuthFooterLink.tsx` — shared auth footer link
- `src/components/LoginFormCard.tsx` — login form
- `src/components/RegisterFormCard.tsx` — register form
- `src/components/ForgotPasswordFormCard.tsx` — forgot password form
- `src/components/ResetPasswordFormCard.tsx` — reset password form
- `src/components/AddExpenseFormCard.tsx` — add expense form
- `src/components/SettingsFormContent.tsx` — settings form

### Screen template after extraction
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
        <AuthFooterLink prompt="Don't have an account?" linkText="Create Account" onPress={...} />
      </KeyboardAwareScrollView>
    </View>
  );
}
// StyleSheet: only glowBlob + scroll
```

---

## Rule 2 — Type Extraction

No `interface` or `type` declaration may live inside a `.tsx` file. All types must be defined in `src/types/` and imported wherever needed.

### Where to put them

| What | File |
|------|------|
| Component prop interfaces | `src/types/<ComponentName>.ts` |
| Domain / data model types | `src/types/index.ts` (already exists) |
| Screen-level local interfaces | `src/types/<ScreenName>.ts` |

### Step-by-step
1. Find every `interface` and `type` in the `.tsx` file.
2. Create `src/types/<ComponentName>.ts`.
3. Move the declarations there, prefixing each with `export`.
4. Delete them from the `.tsx` file.
5. Add `import type { ... } from '@/types/<ComponentName>';` at the top of the `.tsx` file.
6. Add the same import to every other file that references those types.

### Example

**`src/types/LoginFormCard.ts`:**
```ts
export interface LoginFormCardProps {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  handleLogin: () => void;
  isSubmitting: boolean;
}
```

**`src/components/LoginFormCard.tsx`:**
```tsx
import type { LoginFormCardProps } from '@/types/LoginFormCard';

export function LoginFormCard({ control, errors, handleLogin, isSubmitting }: LoginFormCardProps) { ... }
```

### Conventions
- Use `import type { ... }` — not plain `import` — for type-only imports.
- One file per component. Do not pile unrelated types into the same file.
- `src/types/index.ts` holds domain types (Expense, CategoryInfo, etc.) — keep prop interfaces separate.
- If a type is shared across multiple components, put it in `src/types/index.ts`.
