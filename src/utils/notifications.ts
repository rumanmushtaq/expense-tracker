import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as MailComposer from 'expo-mail-composer';
import { getExpenses, getSettings } from './storage';
import { generateMonthlyReport, generateEmailBody } from './helpers';

const BACKGROUND_TASK_NAME = 'MONTHLY_EMAIL_REPORT';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Register background task for monthly email
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  const now = new Date();

  // Only send on the 1st of the month
  if (now.getDate() !== 1) {
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }

  try {
    const settings = await getSettings();
    if (!settings.emailNotifications || !settings.emailAddress) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Get last month's expenses
    const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    const expenses = await getExpenses();
    const report = generateMonthlyReport(expenses, lastYear, lastMonth);
    const { subject, body } = generateEmailBody(report, settings.currency);

    // Send a notification reminder
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📊 Monthly Expense Report Ready',
        body: `Your expense report is ready. Total spent: ${settings.currency} ${report.totalExpense.toLocaleString()}`,
      },
      trigger: null,
    });

    // Try to compose email
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: [settings.emailAddress],
        subject,
        body,
      });
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundTask = async (): Promise<void> => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60 * 60 * 24, // 24 hours
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (err) {
    console.log('Background task registration failed:', err);
  }
};

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

export const sendMonthlyReportEmail = async (): Promise<void> => {
  const settings = await getSettings();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const expenses = await getExpenses();
  const report = generateMonthlyReport(expenses, currentYear, currentMonth);
  const { subject, body } = generateEmailBody(report, settings.currency);

  const isAvailable = await MailComposer.isAvailableAsync();
  if (isAvailable) {
    await MailComposer.composeAsync({
      recipients: settings.emailAddress ? [settings.emailAddress] : [],
      subject,
      body,
    });
  }
};
