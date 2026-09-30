import * as v from 'valibot';

export const CURRENCIES = ['PKR', 'USD', 'EUR', 'GBP', 'INR', 'AED'] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const SettingsSchema = v.object({
  emailAddress: v.pipe(
    v.string(),
    v.check(
      (val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Enter a valid email address',
    ),
  ),
  monthlyBudget: v.pipe(
    v.string(),
    v.check((val) => {
      const n = parseFloat(val);
      return !isNaN(n) && n > 0;
    }, 'Enter a valid budget amount'),
  ),
  currency: v.picklist(CURRENCIES, 'Select a valid currency'),
  emailNotifications: v.boolean(),
});

export type SettingsFormValues = v.InferInput<typeof SettingsSchema>;
