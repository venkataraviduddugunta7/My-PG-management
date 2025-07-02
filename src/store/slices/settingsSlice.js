import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    // General Settings
    pgName: 'My PG',
    address: '',
    contactNumber: '',
    email: '',
    
    // Room Settings
    defaultRoomCapacity: 2,
    allowMixedGenderRooms: false,
    maintenanceNotificationThreshold: 7, // days
    
    // Payment Settings
    currency: 'INR',
    paymentDueDay: 5, // day of month
    latePaymentGracePeriod: 5, // days
    latePaymentFee: 100, // amount
    securityDepositMonths: 2,
    
    // Notification Settings
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    notificationPreferences: {
      paymentReminders: true,
      maintenanceAlerts: true,
      newTenantAlerts: true,
      exitNotices: true,
      complianceAlerts: true
    },
    
    // Theme Settings
    theme: 'light',
    primaryColor: '#586FCC',
    
    // System Settings
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetentionPeriod: 365, // days
  },
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    updateNotificationPreferences: (state, action) => {
      state.settings.notificationPreferences = {
        ...state.settings.notificationPreferences,
        ...action.payload
      };
    },
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateSettings,
  updateNotificationPreferences,
  resetSettings,
  setLoading,
  setError,
} = settingsSlice.actions;

export default settingsSlice.reducer; 