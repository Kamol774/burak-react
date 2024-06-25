import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    //reducer orqali initial qiymatlarni o'zgartiramiz
    setPausedOrders: (state, action) => {
      //(state, action ==> parametr)
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  ordersPageSlice.actions;

// quyida reducerni export qilishdan maqsad, biz yaratgan reducerimizni store.ts dagi reducerga bog'lash
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
