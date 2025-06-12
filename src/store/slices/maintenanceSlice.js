import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    maintenanceRequests: [],
    loading: false,
    error: null,
    stats: {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0
    }
};

const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        setMaintenanceRequests: (state, action) => {
            state.maintenanceRequests = action.payload;
            // Update stats based on the new data
            state.stats = {
                total: action.payload.length,
                pending: action.payload.filter(req => req.status === 'pending').length,
                inProgress: action.payload.filter(req => req.status === 'in_progress').length,
                completed: action.payload.filter(req => req.status === 'completed').length,
                cancelled: action.payload.filter(req => req.status === 'cancelled').length
            };
        },
        addMaintenanceRequest: (state, action) => {
            state.maintenanceRequests.push(action.payload);
            // Update stats
            state.stats.total += 1;
            if (action.payload.status === 'pending') state.stats.pending += 1;
            else if (action.payload.status === 'in_progress') state.stats.inProgress += 1;
            else if (action.payload.status === 'completed') state.stats.completed += 1;
            else if (action.payload.status === 'cancelled') state.stats.cancelled += 1;
        },
        updateMaintenanceRequest: (state, action) => {
            const index = state.maintenanceRequests.findIndex(req => req.id === action.payload.id);
            if (index !== -1) {
                // Update stats by removing old status count
                const oldStatus = state.maintenanceRequests[index].status;
                if (oldStatus === 'pending') state.stats.pending -= 1;
                else if (oldStatus === 'in_progress') state.stats.inProgress -= 1;
                else if (oldStatus === 'completed') state.stats.completed -= 1;
                else if (oldStatus === 'cancelled') state.stats.cancelled -= 1;

                // Update the request
                state.maintenanceRequests[index] = action.payload;

                // Update stats by adding new status count
                if (action.payload.status === 'pending') state.stats.pending += 1;
                else if (action.payload.status === 'in_progress') state.stats.inProgress += 1;
                else if (action.payload.status === 'completed') state.stats.completed += 1;
                else if (action.payload.status === 'cancelled') state.stats.cancelled += 1;
            }
        },
        deleteMaintenanceRequest: (state, action) => {
            const index = state.maintenanceRequests.findIndex(req => req.id === action.payload);
            if (index !== -1) {
                // Update stats
                const status = state.maintenanceRequests[index].status;
                if (status === 'pending') state.stats.pending -= 1;
                else if (status === 'in_progress') state.stats.inProgress -= 1;
                else if (status === 'completed') state.stats.completed -= 1;
                else if (status === 'cancelled') state.stats.cancelled -= 1;
                state.stats.total -= 1;

                // Remove the request
                state.maintenanceRequests.splice(index, 1);
            }
        },
        updateMaintenanceStatus: (state, action) => {
            const { id, status } = action.payload;
            const index = state.maintenanceRequests.findIndex(req => req.id === id);
            if (index !== -1) {
                // Update stats by removing old status count
                const oldStatus = state.maintenanceRequests[index].status;
                if (oldStatus === 'pending') state.stats.pending -= 1;
                else if (oldStatus === 'in_progress') state.stats.inProgress -= 1;
                else if (oldStatus === 'completed') state.stats.completed -= 1;
                else if (oldStatus === 'cancelled') state.stats.cancelled -= 1;

                // Update the status
                state.maintenanceRequests[index].status = status;

                // Update stats by adding new status count
                if (status === 'pending') state.stats.pending += 1;
                else if (status === 'in_progress') state.stats.inProgress += 1;
                else if (status === 'completed') state.stats.completed += 1;
                else if (status === 'cancelled') state.stats.cancelled += 1;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setMaintenanceRequests,
    addMaintenanceRequest,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
    updateMaintenanceStatus,
    setLoading,
    setError
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer; 