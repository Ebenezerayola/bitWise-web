import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceState {
  price: number;
  lastUpdated: string;
  usd: number;
  btc: number;
}

const initialState: PriceState = {
  price: 0,
  lastUpdated: '',
  usd: 0,
  btc: 0,
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    updateTimestamp: (state, action: PayloadAction<string>) => {
      state.lastUpdated = action.payload;
    },
    updateUSD: (state, action: PayloadAction<number>) => {
      state.usd = action.payload;
    },
    updateBTC: (state, action: PayloadAction<number>) => {
      state.btc = action.payload;
    },
  },
});

export const { updatePrice, updateTimestamp, updateUSD, updateBTC } = priceSlice.actions;
export default priceSlice.reducer;
