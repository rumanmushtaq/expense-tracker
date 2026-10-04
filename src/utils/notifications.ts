// expo-notifications/BackgroundFetch/TaskManager throw at require-time in Expo Go (SDK 53+).
// Use lazy require() inside try/catch so the module loads safely in Expo Go.
import { generateMonthlyReport, generateEmailBody } from './helpers';
import { format } from 'date-fns';
import { authApi } from '../api/auth';
import { expensesApi } from '../api/expenses';
import { settingsApi } from '../api/settings';

type NotificationsModule = typeof import('expo-notifications');
type BackgroundFetchModule = typeof import('expo-background-fetch');
type TaskManagerModule = typeof import('expo-task-manager');
type MailComposerModule = typeof import('expo-mail-composer');

let Notifications: NotificationsModule | null = null;
let BackgroundFetch: BackgroundFetchModule | null = null;
let TaskManager: TaskManagerModule | null = null;
let MailComposer: MailComposerModule | null = null;

try { Notifications = require('expo-notifications'); } catch { /* Expo Go */ }
try { BackgroundFetch = require('expo-background-fetch'); } catch { /* Expo Go */ }
try { TaskManager = require('expo-task-manager'); } catch { /* Expo Go */ }
try { MailComposer = require('expo-mail-composer'); } catch { /* Expo Go */ }

const BACKGROUND_TASK_NAME = 'MONTHLY_EMAIL_REPORT';

if (Notifications) {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch { /* Expo Go */ }
}

if (TaskManager && BackgroundFetch) {
  try {
    TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
      const now = new Date();
      if (now.getDate() !== 1) {
        return BackgroundFetch!.BackgroundFetchResult.NoData;
      }
      try {
        const session = await authApi.getSession();
        const userId = session?.user?.id;
        if (!userId) return BackgroundFetch!.BackgroundFetchResult.Failed;

        const settings = await settingsApi.get(userId);
        if (!settings.emailNotifications || !settings.emailAddress) {
          return BackgroundFetch!.BackgroundFetchResult.NoData;
        }

        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        
        // Fetch expenses for the last month to generate the report
        const start = new Date(lastYear, lastMonth, 1);
        const end = new Date(lastYear, lastMonth + 1, 0, 23, 59, 59, 999);
        const expenses = await expensesApi.getByDateRange(
          userId, 
          format(start, 'yyyy-MM-dd'), 
          format(end, 'yyyy-MM-dd')
        );

        const report = generateMonthlyReport(expenses, lastYear, lastMonth);
        const { subject, body } = generateEmailBody(report, settings.currency);

        if (Notifications) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '📊 Monthly Expense Report Ready',
              body: `Your expense report is ready. Total spent: ${settings.currency} ${report.totalExpense.toLocaleString()}`,
            },
            trigger: null,
          });
        }

        if (MailComposer) {
          const isAvailable = await MailComposer.isAvailableAsync();
          if (isAvailable) {
            await MailComposer.composeAsync({
              recipients: [settings.emailAddress],
              subject,
              body,
            });
          }
        }
        return BackgroundFetch!.BackgroundFetchResult.NewData;
      } catch {
        return BackgroundFetch!.BackgroundFetchResult.Failed;
      }
    });
  } catch { /* Expo Go */ }
}

export const registerBackgroundTask = async (): Promise<void> => {
  if (!BackgroundFetch) return;
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60 * 60 * 24,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (err) {
    console.log('Background task registration failed:', err);
  }
};

export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (!Notifications) return false;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  } catch {
    return false;
  }
};

export const sendMonthlyReportEmail = async (selectedMonth:number, selectedYear:number): Promise<void> => {
  if (!MailComposer) return;
  const session = await authApi.getSession();
  const userId = session?.user?.id;
  if (!userId) return;

  const settings = await settingsApi.get(userId);
  
  const start = new Date(selectedYear, selectedMonth, 1);
  const end = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999);
  const expenses = await expensesApi.getByDateRange(
    userId, 
    format(start, 'yyyy-MM-dd'), 
    format(end, 'yyyy-MM-dd')
  );

  const report = generateMonthlyReport(expenses, selectedYear, selectedMonth);
  const { subject, body } = generateEmailBody(report, settings.currency);
  try {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: settings.emailAddress ? [settings.emailAddress] : [],
        subject,
        body,
      });
    }
  } catch { /* unavailable */ }
};
