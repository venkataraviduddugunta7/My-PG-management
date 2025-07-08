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
    
    // Terms and Conditions
    termsAndConditions: [
      "Tenant must provide valid government ID proof for verification and registration purposes.",
      "Rent must be paid by the 5th of every month. Late payments will incur additional charges.",
      "Smoking, consumption of alcohol, and drug use are strictly prohibited inside the premises.",
      "Visitors are allowed only between 8:00 AM to 10:00 PM. Prior notification to management is required for overnight guests.",
      "Security deposit is non-refundable if lease is broken early or in case of property damage.",
      "Tenants are responsible for maintaining cleanliness in their rooms and common areas.",
      "Any damage to property will be charged to the tenant at market rates.",
      "Noise levels must be kept to a minimum, especially during night hours (10:00 PM to 6:00 AM).",
      "Tenants must inform management 30 days in advance before vacating the premises.",
      "Management reserves the right to inspect rooms with prior notice for maintenance and safety purposes."
    ],
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
    updateTermsAndConditions: (state, action) => {
      state.settings.termsAndConditions = action.payload;
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
  updateTermsAndConditions,
  resetSettings,
  setLoading,
  setError,
} = settingsSlice.actions;

export default settingsSlice.reducer; 