import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payment: null,
  },
  reducers: {
    payment: (state , action) => {
        console.log('State:',state);
        console.log('action:',action);

      state.payment = action.payload;
    },
  },
});

export const { payment } = paymentSlice.actions;
export const paymentTransaction = (state) => state.payment.payment;

export default paymentSlice.reducer;
