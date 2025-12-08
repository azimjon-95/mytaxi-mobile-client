import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeOrder: null,
    isOrderLoading: false,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setActiveOrder: (state, action) => {
            state.activeOrder = action.payload;
        },
        setOrderLoading: (state, action) => {
            state.isOrderLoading = action.payload;
        },
    },
});

export const { setActiveOrder, setOrderLoading } = orderSlice.actions;
export default orderSlice.reducer;
