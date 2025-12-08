import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; // api.js faylidan import
import orderSlice from "./actions/orderSlice";



export const store = configureStore({
    reducer: {
        // RTK Query reducer
        [api.reducerPath]: api.reducer,
        // Boshqa slice'lar
        order: orderSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
