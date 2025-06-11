import { configureStore } from '@reduxjs/toolkit';
import floorsReducer from './slices/floorsSlice';
import roomsReducer from './slices/roomsSlice';
import bedsReducer from './slices/bedsSlice';
import tenantsReducer from './slices/tenantsSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    floors: floorsReducer,
    rooms: roomsReducer,
    beds: bedsReducer,
    tenants: tenantsReducer,
    settings: settingsReducer,
  },
}); 