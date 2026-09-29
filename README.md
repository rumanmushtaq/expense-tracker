# Expense Tracker

A React Native + Expo expense tracker app that tracks your monthly expenses and sends a summary email report at midnight on the 1st of each month.

## Features

- **Dashboard** — Monthly spending overview with daily chart, budget progress, and recent transactions
- **Add Expense** — Quick expense entry with categories (Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other)
- **History** — Browse expenses by month with navigation, delete entries, and send email reports
- **Settings** — Configure email address, monthly budget, currency (PKR, USD, EUR, GBP, INR, AED)
- **Monthly Email Report** — Automatic email with category breakdown and top expenses on the 1st of each month
- **Background Notifications** — Push notification reminder when your monthly report is ready
- **Dark Theme** — Beautiful dark UI designed for comfortable daily use

## Tech Stack

- **React Native** + **Expo** (TypeScript)
- **Expo Router** — File-based navigation
- **AsyncStorage** — Local data persistence
- **expo-mail-composer** — Email report composition
- **expo-notifications** — Push notifications
- **expo-background-fetch** — Background task scheduling
- **date-fns** — Date utilities

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on specific platform
npx expo start --android
npx expo start --ios
```

## Project Structure

```
src/
├── app/                  # Expo Router screens
│   ├── _layout.tsx       # Tab navigation layout
│   ├── index.tsx         # Dashboard screen
│   ├── add.tsx           # Add expense screen
│   ├── history.tsx       # Expense history screen
│   └── settings.tsx      # Settings screen
├── components/           # Reusable UI components
│   ├── CategoryBadge.tsx
│   ├── EmptyState.tsx
│   ├── ExpenseCard.tsx
│   ├── MonthlyChart.tsx
│   └── StatCard.tsx
├── constants/            # App constants
│   ├── categories.ts
│   └── theme.ts
├── context/              # React context providers
│   └── ExpenseContext.tsx
├── types/                # TypeScript type definitions
│   └── index.ts
└── utils/                # Utility functions
    ├── helpers.ts
    ├── notifications.ts
    └── storage.ts
```

## How the Monthly Email Works

1. A background task runs daily checking if it's the 1st of the month
2. If it is, it generates a report of last month's expenses
3. A push notification alerts you that the report is ready
4. The email composer opens with the full report pre-filled
5. You can also manually send a report from the History screen

## License

MIT
