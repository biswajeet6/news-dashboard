// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import payoutReducer from './features/payoutSlice';

export const store = configureStore({
    reducer: {
      payout: payoutReducer, // Use payoutReducer to handle payout-related actions
    },
  });
