export const selectAllFloors = (state) => state.property.floors;
export const selectAllRooms = (state) => state.property.rooms;
export const selectAllBeds = (state) => state.property.beds;
export const selectAllTenants = (state) => state.property.tenants;

export const selectVacantBeds = (state) => 
  state.property.beds.filter(bed => bed.status === 'Vacant');

export const selectRoomsByFloor = (floorId) => (state) =>
  state.property.rooms.filter(room => room.floorId === floorId);

export const selectBedsByRoom = (roomId) => (state) =>
  state.property.beds.filter(bed => bed.roomId === roomId);