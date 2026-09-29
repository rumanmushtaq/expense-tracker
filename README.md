# Expense Tracker

A beautiful, feature-rich monthly expense tracking app built with React Native and Expo. Track your daily spending, view category breakdowns, and receive automated monthly email reports.

## Screenshots

Premium dark theme UI with glassmorphism effects, gradient accents, and smooth animations.

## Features

- **Dashboard** — Hero spending card with animated budget progress, daily spending chart, category breakdown, and recent expenses
- **Add Expense** — Elegant form with dynamic category indicators, gradient accents, and animated category badges
- **History** — Month-by-month navigation with transaction count, daily average, and one-tap email reports
- **Settings** — Email configuration, budget management, multi-currency support (PKR, USD, EUR, GBP, INR, AED)
- **Monthly Email Reports** — Background task sends detailed expense summaries on the 1st of each month
- **Animations** — Smooth enter/exit transitions powered by Reanimated 4
- **Dark Theme** — Deep space-inspired color palette with glassmorphism cards and gradient accents

## Tech Stack

- **React Native** 0.86 + **Expo SDK 57**
- **TypeScript** with strict mode
- **Expo Router** (file-based navigation with tabs)
- **React Native Reanimated** 4 for fluid animations
- **Expo Linear Gradient** for premium gradient effects
- **AsyncStorage** for local data persistence
- **expo-mail-composer** + **expo-background-fetch** for monthly email automation
- **Ionicons** for consistent iconography

## Getting Started

```bash
# Clone the repository
git clone https://github.com/rumanmushtaq/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS) to run on your device.

## Project Structure

```
src/
  app/            # Expo Router screens (tabs)
    _layout.tsx   # Root layout with tab navigator
    index.tsx     # Dashboard screen
    add.tsx       # Add expense screen
    history.tsx   # Expense history screen
    settings.tsx  # App settings screen
  components/     # Reusable UI components
  constants/      # Theme colors, categories
  context/        # React Context for state
  types/          # TypeScript interfaces
  utils/          # Storage, helpers, notifications
```

## Email Report Workflow

1. Configure your email in Settings
2. Enable email notifications
3. On the 1st of each month at midnight, the app generates a detailed report
4. A notification is sent, and the email composer opens with the report
5. You can also manually send a report from the History tab

## License

MIT License — see [LICENSE](LICENSE) for details.

## Author

**Ruman Mushtaq** — [@rumanmushtaq](https://github.com/rumanmushtaq)
