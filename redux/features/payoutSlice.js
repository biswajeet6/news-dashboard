// store/payoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [], // Articles fetched from the API
  payouts: {},   // Store payout value for each article/blog
};

const payoutSlice = createSlice({
  name: 'payout',
  initialState,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
    setPayout(state, action) {
      const { title, amount } = action.payload;
      state.payouts[title] = amount; // Store the payout for each article
    },
    setPayoutsFromLocalStorage(state, action) {
      state.payouts = action.payload; // Load payouts from localStorage on page load
    },
  },
});

export const { setArticles, setPayout, setPayoutsFromLocalStorage } = payoutSlice.actions;
export default payoutSlice.reducer;
