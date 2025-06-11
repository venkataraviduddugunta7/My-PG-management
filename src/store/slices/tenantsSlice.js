import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tenants: [],
  loading: false,
  error: null,
};

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    addTenant: (state, action) => {
      const newTenant = {
        ...action.payload,
        id: `T${1000 + state.tenants.length + 1}`,
        isActive: true,
        image: action.payload.image ? action.payload.image : `https://xsgames.co/randomusers/avatar.php?g=male&random=${Date.now()}`,
      };
      state.tenants.push(newTenant);
    },
    updateTenant: (state, action) => {
      const { id, ...updateData } = action.payload;
      const index = state.tenants.findIndex(tenant => tenant.id === id);
      if (index !== -1) {
        state.tenants[index] = { ...state.tenants[index], ...updateData };
      }
    },
    deleteTenant: (state, action) => {
      const tenantId = action.payload;
      state.tenants = state.tenants.filter(tenant => tenant.id !== tenantId);
    },
    toggleTenantStatus: (state, action) => {
      const tenantId = action.payload;
      const index = state.tenants.findIndex(tenant => tenant.id === tenantId);
      if (index !== -1) {
        state.tenants[index].isActive = !state.tenants[index].isActive;
      }
    },
    assignTenantToBed: (state, action) => {
      const { tenantId, bedId } = action.payload;
      const index = state.tenants.findIndex(tenant => tenant.id === tenantId);
      if (index !== -1) {
        state.tenants[index].assignedBedId = bedId;
      }
    },
    setTenants: (state, action) => {
      state.tenants = action.payload;
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
  addTenant, 
  updateTenant, 
  deleteTenant, 
  toggleTenantStatus, 
  assignTenantToBed, 
  setTenants, 
  setLoading, 
  setError 
} = tenantsSlice.actions;

export default tenantsSlice.reducer; 