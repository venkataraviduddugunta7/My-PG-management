import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [
    {
      id: 'room-1',
      roomNumber: '101',
      name: 'Room 101',
      floorId: 'floor-1',
      roomType: 'Standard'
    },
    {
      id: 'room-2',
      roomNumber: '102',
      name: 'Room 102',
      floorId: 'floor-1',
      roomType: 'Standard'
    },
    {
      id: 'room-3',
      roomNumber: '201',
      name: 'Deluxe Room A',
      floorId: 'floor-2',
      roomType: 'Deluxe'
    },
    {
      id: 'room-4',
      roomNumber: '202',
      name: 'Deluxe Room B',
      floorId: 'floor-2',
      roomType: 'Deluxe'
    },
    {
      id: 'room-5',
      roomNumber: '203',
      name: 'Shared Room 203',
      floorId: 'floor-2',
      roomType: 'Shared'
    },
    {
      id: 'room-6',
      roomNumber: '301',
      name: 'Premium Suite A',
      floorId: 'floor-3',
      roomType: 'Premium'
    },
    {
      id: 'room-7',
      roomNumber: '302',
      name: 'Premium Suite B',
      floorId: 'floor-3',
      roomType: 'Premium'
    },
    {
      id: 'room-8',
      roomNumber: '401',
      name: 'Deluxe Suite 401',
      floorId: 'floor-4',
      roomType: 'Deluxe'
    },
    {
      id: 'room-9',
      roomNumber: '402',
      name: 'Deluxe Suite 402',
      floorId: 'floor-4',
      roomType: 'Deluxe'
    },
    {
      id: 'room-10',
      roomNumber: '501',
      name: 'Penthouse Suite',
      floorId: 'floor-5',
      roomType: 'Premium'
    }
  ],
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