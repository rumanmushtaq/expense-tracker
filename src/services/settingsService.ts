import { UserSettings } from '../types';
import {
  getSettings as getSettingsFromStorage,
  saveSettings as saveSettingsToStorage,
} from '../utils/storage';
// import { axiosInstance } from './axiosInstance'; // uncomment when backend is ready

export const settingsService = {
  async get(): Promise<UserSettings> {
    // return (await axiosInstance.get<UserSettings>('/settings')).data;
    return getSettingsFromStorage();
  },

  async save(settings: UserSettings): Promise<UserSettings> {
    // return (await axiosInstance.put<UserSettings>('/settings', settings)).data;
    await saveSettingsToStorage(settings);
    return settings;
  },
};
