import { createSlice } from '@reduxjs/toolkit'
import { HomePageState } from '../../../lib/types/screen'

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: []
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    }
  }
});

export const { setPopularDishes, setNewDishes, setTopUsers } = homePageSlice.actions;

// quyida reducerni export qilishdan maqsad, biz yaratgan reducerimizni store.ts dagi reducerga bog'lash 
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;  