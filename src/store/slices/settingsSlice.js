import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    // General Settings
    pgName: 'My PG',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    },
    contactNumber: '',
    email: '',
    gstNumber: '',
    description: '',
    
    // Room Settings
    roomTypes: [],
    defaultRoomCapacity: 2,
    allowMixedGenderRooms: false,
    maintenanceNotificationThreshold: 7, // days
    
    // Bed Settings
    bedTypes: [],
    
    // Payment Settings
    currency: 'INR',
    paymentDueDay: 5, // day of month
    latePaymentGracePeriod: 5, // days
    latePaymentFee: 100, // amount
    securityDepositMonths: 2,
    advanceRentMonths: 1,
    paymentMethods: ['cash', 'bank_transfer', 'upi'],
    
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
    updateAddress: (state, action) => {
      state.settings.address = { ...state.settings.address, ...action.payload };
    },
    updateRoomTypes: (state, action) => {
      state.settings.roomTypes = action.payload;
    },
    updateBedTypes: (state, action) => {
      state.settings.bedTypes = action.payload;
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
  updateAddress,
  updateRoomTypes,
  updateBedTypes,
  updateNotificationPreferences,
  resetSettings,
  setLoading,
  setError,
} = settingsSlice.actions;

export default settingsSlice.reducer; 