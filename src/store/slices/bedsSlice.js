import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  beds: [
    {
      id: 'bed-1',
      roomId: 'room-1',
      bedNumber: '1',
      bedType: 'Single',
      rent: 8000,
      status: 'Available',
      notes: 'Standard single bed'
    },
    {
      id: 'bed-2',
      roomId: 'room-1',
      bedNumber: '2',
      bedType: 'Single',
      rent: 8000,
      status: 'Occupied',
      notes: 'Standard single bed'
    },
    {
      id: 'bed-3',
      roomId: 'room-2',
      bedNumber: '1',
      bedType: 'Single',
      rent: 8500,
      status: 'Available',
      notes: 'Standard single bed'
    },
    {
      id: 'bed-4',
      roomId: 'room-3',
      bedNumber: '1',
      bedType: 'Double',
      rent: 12000,
      status: 'Available',
      notes: 'Deluxe double bed with premium mattress'
    },
    {
      id: 'bed-5',
      roomId: 'room-4',
      bedNumber: '1',
      bedType: 'Queen',
      rent: 15000,
      status: 'Available',
      notes: 'Queen size bed with premium amenities'
    },
    {
      id: 'bed-6',
      roomId: 'room-5',
      bedNumber: 'A',
      bedType: 'Bunk',
      rent: 7000,
      status: 'Available',
      notes: 'Bunk bed - top bunk'
    },
    {
      id: 'bed-7',
      roomId: 'room-5',
      bedNumber: 'B',
      bedType: 'Bunk',
      rent: 7000,
      status: 'Available',
      notes: 'Bunk bed - bottom bunk'
    },
    {
      id: 'bed-8',
      roomId: 'room-6',
      bedNumber: '1',
      bedType: 'King',
      rent: 18000,
      status: 'Available',
      notes: 'Premium king size bed with luxury amenities'
    },
    {
      id: 'bed-9',
      roomId: 'room-7',
      bedNumber: '1',
      bedType: 'Queen',
      rent: 16000,
      status: 'Maintenance',
      notes: 'Under renovation - available next month'
    },
    {
      id: 'bed-10',
      roomId: 'room-8',
      bedNumber: '1',
      bedType: 'Double',
      rent: 14000,
      status: 'Available',
      notes: 'Deluxe double bed with balcony access'
    },
    {
      id: 'bed-11',
      roomId: 'room-9',
      bedNumber: '1',
      bedType: 'Queen',
      rent: 14500,
      status: 'Available',
      notes: 'Deluxe queen bed with premium view'
    },
    {
      id: 'bed-12',
      roomId: 'room-10',
      bedNumber: '1',
      bedType: 'King',
      rent: 25000,
      status: 'Available',
      notes: 'Penthouse king bed with rooftop access'
    }
  ],
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