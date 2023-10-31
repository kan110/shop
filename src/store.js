import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        shop: shopReducer,
        wishlist: wishlistReducer
    }
});

