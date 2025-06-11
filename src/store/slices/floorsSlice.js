import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floors: [],
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