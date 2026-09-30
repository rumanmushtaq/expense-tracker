---
name: type-extraction
description: Remove all interfaces and types from .tsx files and move them into dedicated files in the src/types/ folder, then import them back.
---

# Type Extraction

## Rule
No `interface` or `type` declaration may live inside a `.tsx` file. All types must be defined in `src/types/` and imported wherever needed.

## Where to put them

| What | File |
|------|------|
| Component prop interfaces | `src/types/<ComponentName>.ts` |
| Domain / data model types | `src/types/index.ts` (already exists) |
| Screen-level prop or local interfaces | `src/types/<ScreenName>.ts` |

Naming the file after the component or screen that owns the types keeps the folder easy to scan.

## Step-by-step

1. Find every `interface` and `type` in the `.tsx` file.
2. Create `src/types/<ComponentName>.ts` (create it if it doesn't exist).
3. Move the declarations into that file, prefixing each with `export`.
4. Delete them from the `.tsx` file.
5. Add the import at the top of the `.tsx` file:
   ```ts
   import type { MyProps, MyOtherType } from '@/types/MyComponent';
   ```
6. Repeat for every other file that references those types — add the same import there too.

## Example

**Before — `src/components/LoginFormCard.tsx`:**
```tsx
interface LoginFormCardProps {
  email: string;
  handleLogin: () => void;
  loading: boolean;
}

export function LoginFormCard({ email, handleLogin, loading }: LoginFormCardProps) { ... }
```

**After — `src/types/LoginFormCard.ts`:**
```ts
export interface LoginFormCardProps {
  email: string;
  handleLogin: () => void;
  loading: boolean;
}
```

**After — `src/components/LoginFormCard.tsx`:**
```tsx
import type { LoginFormCardProps } from '@/types/LoginFormCard';

export function LoginFormCard({ email, handleLogin, loading }: LoginFormCardProps) { ... }
```

## Conventions

- Use `import type { ... }` (not `import { ... }`) for type-only imports — zero runtime cost.
- One file per component. Do not pile unrelated types into the same file.
- The existing `src/types/index.ts` holds domain/data-model types (Expense, Profile, etc.) — keep component prop interfaces separate from it.
- If a type is used by more than one component, put it in `src/types/index.ts` (or a dedicated shared file) so it has a single source of truth.
- Re-export from `src/types/index.ts` only if other teams need a single barrel import; otherwise direct imports are preferred.
