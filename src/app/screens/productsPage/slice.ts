import { createSlice } from '@reduxjs/toolkit';
import { ProductsPageState } from '../../../lib/types/screen';

const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: []
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: { //reducer orqali initial qiymatlarni o'zgartiramiz
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProduct, setProducts } = productsPageSlice.actions;

// quyida reducerni export qilishdan maqsad, biz yaratgan reducerimizni store.ts dagi reducerga bog'lash 
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;