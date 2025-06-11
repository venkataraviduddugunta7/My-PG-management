# Redux Toolkit Setup - PG Management System

## Overview

The PG Management System now uses Redux Toolkit for state management. The store manages four main entities:
- **Floors** - Building floor management
- **Rooms** - Room management per floor
- **Beds** - Bed management per room
- **Tenants** - Tenant management with bed assignments

## Store Structure

```
src/store/
├── index.js           # Main store configuration
├── hooks.js           # Redux hooks
└── slices/
    ├── floorsSlice.js  # Floor management
    ├── roomsSlice.js   # Room management
    ├── bedsSlice.js    # Bed management
    └── tenantsSlice.js # Tenant management
```

## Usage

### 1. Using Redux in Components

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addFloor, updateFloor, deleteFloor } from '../store/slices/floorsSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { floors } = useSelector(state => state.floors);
  
  const handleAddFloor = (floorData) => {
    dispatch(addFloor(floorData));
  };
  
  return (
    // Your component JSX
  );
};
```

### 2. Available Actions

#### Floor Actions
- `addFloor(floorData)` - Add a new floor
- `updateFloor({ id, ...updateData })` - Update existing floor
- `deleteFloor(floorId)` - Delete a floor
- `setFloors(floorsArray)` - Set all floors

#### Room Actions
- `addRoom(roomData)` - Add a new room
- `updateRoom({ id, ...updateData })` - Update existing room
- `deleteRoom(roomId)` - Delete a room
- `setRooms(roomsArray)` - Set all rooms

#### Bed Actions
- `addBed(bedData)` - Add a new bed
- `updateBed({ id, ...updateData })` - Update existing bed
- `deleteBed(bedId)` - Delete a bed
- `setBedStatus({ bedId, status })` - Update bed status
- `setBeds(bedsArray)` - Set all beds

#### Tenant Actions
- `addTenant(tenantData)` - Add a new tenant
- `updateTenant({ id, ...updateData })` - Update existing tenant
- `deleteTenant(tenantId)` - Delete a tenant
- `toggleTenantStatus(tenantId)` - Toggle tenant active status
- `assignTenantToBed({ tenantId, bedId })` - Assign tenant to bed
- `setTenants(tenantsArray)` - Set all tenants

### 3. State Structure

Each slice follows this structure:
```javascript
{
  [entity]: [],      // Array of entities (floors, rooms, beds, tenants)
  loading: false,    // Loading state
  error: null        // Error state
}
```

### 4. Tenant Form Integration

The tenant form now includes:
- **Floor Selection** - Dropdown with available floors
- **Room Selection** - Dropdown with available rooms
- **Bed Selection** - Dropdown with available beds (only shows available beds)

## Features Implemented

1. **Complete CRUD Operations** for all entities
2. **Data Relationships** - Floors → Rooms → Beds → Tenants
3. **Validation** - Cannot delete floors with rooms, rooms with beds, etc.
4. **Available Bed Filtering** - Only available beds shown in tenant form
5. **Mock Data Integration** - Existing mock data preserved

## Benefits

- **Centralized State Management** - All data in one place
- **Predictable State Updates** - Actions clearly define what changes
- **Developer Tools Integration** - Redux DevTools support
- **Type Safety Ready** - Easy to add TypeScript later
- **Performance** - Optimized re-renders with useSelector

## Next Steps

1. Add async actions for API integration
2. Add loading states for better UX
3. Add error handling for failed operations
4. Consider adding RTK Query for API management 