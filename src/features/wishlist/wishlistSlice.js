import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [],
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        removeWishlistItem: (state, {payload}) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== payload.id);
        },
        addToWishlist: (state, {payload}) => {
            if (!(state.wishlist.find(item => item.id === payload.id))) {
                state.wishlist.push(payload);
            }
        }
    },
})

export default wishlistSlice.reducer;
export const {removeWishlistItem, addToWishlist} = wishlistSlice.actions;