import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payments: [],
  loading: false,
  error: null,
  paymentStats: {
    totalCollected: 0,
    pendingAmount: 0,
    overdueAmount: 0,
    monthlyCollection: 0,
  },
  paymentHistory: [],
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment: (state, action) => {
      const newPayment = {
        ...action.payload,
        id: `PAY-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      state.payments.push(newPayment);
      state.paymentStats.totalCollected += action.payload.amount;
      state.paymentHistory.push({
        type: 'payment_added',
        paymentId: newPayment.id,
        amount: action.payload.amount,
        timestamp: new Date().toISOString(),
      });
    },
    updatePayment: (state, action) => {
      const { id, ...updateData } = action.payload;
      const index = state.payments.findIndex(payment => payment.id === id);
      if (index !== -1) {
        const oldAmount = state.payments[index].amount;
        state.payments[index] = { ...state.payments[index], ...updateData };
        
        // Update stats if amount changed
        if (updateData.amount) {
          state.paymentStats.totalCollected = state.paymentStats.totalCollected - oldAmount + updateData.amount;
        }
        
        state.paymentHistory.push({
          type: 'payment_updated',
          paymentId: id,
          changes: updateData,
          timestamp: new Date().toISOString(),
        });
      }
    },
    deletePayment: (state, action) => {
      const paymentId = action.payload;
      const payment = state.payments.find(p => p.id === paymentId);
      if (payment) {
        state.paymentStats.totalCollected -= payment.amount;
        state.payments = state.payments.filter(p => p.id !== paymentId);
        state.paymentHistory.push({
          type: 'payment_deleted',
          paymentId,
          amount: payment.amount,
          timestamp: new Date().toISOString(),
        });
      }
    },
    updatePaymentStatus: (state, action) => {
      const { paymentId, status } = action.payload;
      const index = state.payments.findIndex(payment => payment.id === paymentId);
      if (index !== -1) {
        state.payments[index].status = status;
        state.paymentHistory.push({
          type: 'status_updated',
          paymentId,
          status,
          timestamp: new Date().toISOString(),
        });
      }
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
      // Recalculate stats
      state.paymentStats = action.payload.reduce((stats, payment) => {
        if (payment.status === 'completed') {
          stats.totalCollected += payment.amount;
        } else if (payment.status === 'pending') {
          stats.pendingAmount += payment.amount;
        } else if (payment.status === 'overdue') {
          stats.overdueAmount += payment.amount;
        }
        return stats;
      }, {
        totalCollected: 0,
        pendingAmount: 0,
        overdueAmount: 0,
        monthlyCollection: 0,
      });
    },
    updatePaymentStats: (state, action) => {
      state.paymentStats = { ...state.paymentStats, ...action.payload };
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
  addPayment,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
  setPayments,
  updatePaymentStats,
  setLoading,
  setError,
} = paymentsSlice.actions;

export default paymentsSlice.reducer; 