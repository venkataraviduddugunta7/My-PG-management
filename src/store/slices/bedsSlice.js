import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  beds: [],
  loading: false,
  error: null,
};

const bedsSlice = createSlice({
  name: 'beds',
  initialState,
  reducers: {
    addBed: (state, action) => {
      const newBed = {
        ...action.payload,
        id: `bed-${state.beds.length + 1}`,
        status: action.payload.status ? action.payload.status : 'Available',
      };
      state.beds.push(newBed);
    },
    updateBed: (state, action) => {
      const { id, ...updateData } = action.payload;
      const index = state.beds.findIndex(bed => bed.id === id);
      if (index !== -1) {
        state.beds[index] = { ...state.beds[index], ...updateData };
      }
    },
    deleteBed: (state, action) => {
      const bedId = action.payload;
      state.beds = state.beds.filter(bed => bed.id !== bedId);
    },
    setBedStatus: (state, action) => {
      const { bedId, status } = action.payload;
      const index = state.beds.findIndex(bed => bed.id === bedId);
      if (index !== -1) {
        state.beds[index].status = status;
      }
    },
    setBeds: (state, action) => {
      state.beds = action.payload;
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
  addBed, 
  updateBed, 
  deleteBed, 
  setBedStatus, 
  setBeds, 
  setLoading, 
  setError 
} = bedsSlice.actions;

export default bedsSlice.reducer; 