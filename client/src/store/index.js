import { configureStore } from "@reduxjs/toolkit";
import betsSlice from "./bets-slice";
const store = configureStore({
    reducer: { betsFilter: betsSlice.reducer }
});

export default store;