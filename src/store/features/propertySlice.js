import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floors: [],
  rooms: [],
  beds: [],
  tenants: [],
  loading: false,
  error: null
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    // Floor actions
    addFloor: (state, action) => {
      state.floors.push(action.payload);
    },
    updateFloor: (state, action) => {
      const index = state.floors.findIndex(f => f.id === action.payload.id);
      if (index !== -1) state.floors[index] = action.payload;
    },
    deleteFloor: (state, action) => {
      state.floors = state.floors.filter(floor => floor.id !== action.payload);
    },
    
    // Room actions
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action) => {
      const index = state.rooms.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state.rooms[index] = action.payload;
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter(room => room.id !== action.payload);
    },
    
    // Bed actions
    addBed: (state, action) => {
      state.beds.push(action.payload);
    },
    updateBed: (state, action) => {
      const index = state.beds.findIndex(b => b.id === action.payload.id);
      if (index !== -1) state.beds[index] = action.payload;
    },
    deleteBed: (state, action) => {
      state.beds = state.beds.filter(bed => bed.id !== action.payload);
    },
    
    // Tenant actions
    addTenant: (state, action) => {
      state.tenants.push(action.payload);
    },
    assignTenantToBed: (state, action) => {
      const { bedId, tenantId } = action.payload;
      const bed = state.beds.find(b => b.id === bedId);
      if (bed) {
        bed.tenantId = tenantId;
        bed.status = 'Occupied';
      }
    },
    // Add more reducers as needed
  }
});

export const {
  addFloor,
  updateFloor,
  deleteFloor,
  addRoom,
  updateRoom,
  deleteRoom,
  addBed,
  updateBed,
  deleteBed,
  addTenant,
  assignTenantToBed
} = propertySlice.actions;

export default propertySlice.reducer;