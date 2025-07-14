import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floors: [
    {
      id: 'floor-1',
      floorNumber: 1,
      floorName: 'Ground Floor',
      description: 'Main entrance floor with reception area'
    },
    {
      id: 'floor-2',
      floorNumber: 2,
      floorName: 'First Floor',
      description: 'Residential floor with standard rooms'
    },
    {
      id: 'floor-3',
      floorNumber: 3,
      floorName: 'Second Floor',
      description: 'Premium rooms with better amenities'
    },
    {
      id: 'floor-4',
      floorNumber: 4,
      floorName: 'Third Floor',
      description: 'Deluxe rooms with balcony access'
    },
    {
      id: 'floor-5',
      floorNumber: 5,
      floorName: 'Top Floor',
      description: 'Penthouse style rooms with rooftop access'
    }
  ],
  loading: false,
  error: null,
};

const floorsSlice = createSlice({
  name: 'floors',
  initialState,
  reducers: {
    addFloor: (state, action) => {
      const newFloor = {
        ...action.payload,
        id: `floor-${state.floors.length + 1}`,
      };
      state.floors.push(newFloor);
    },
    updateFloor: (state, action) => {
      const { id, ...updateData } = action.payload;
      const index = state.floors.findIndex(floor => floor.id === id);
      if (index !== -1) {
        state.floors[index] = { ...state.floors[index], ...updateData };
      }
    },
    deleteFloor: (state, action) => {
      const floorId = action.payload;
      state.floors = state.floors.filter(floor => floor.id !== floorId);
    },
    setFloors: (state, action) => {
      state.floors = action.payload;
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
  addFloor, 
  updateFloor, 
  deleteFloor, 
  setFloors, 
  setLoading, 
  setError 
} = floorsSlice.actions;

export default floorsSlice.reducer; 