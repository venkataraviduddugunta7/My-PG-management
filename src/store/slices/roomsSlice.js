import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      const newRoom = {
        ...action.payload,
        id: `room-${state.rooms.length + 1}`,
      };
      state.rooms.push(newRoom);
    },
    updateRoom: (state, action) => {
      const { id, ...updateData } = action.payload;
      const index = state.rooms.findIndex(room => room.id === id);
      if (index !== -1) {
        state.rooms[index] = { ...state.rooms[index], ...updateData };
      }
    },
    deleteRoom: (state, action) => {
      const roomId = action.payload;
      state.rooms = state.rooms.filter(room => room.id !== roomId);
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
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
  addRoom, 
  updateRoom, 
  deleteRoom, 
  setRooms, 
  setLoading, 
  setError 
} = roomsSlice.actions;

export default roomsSlice.reducer; 