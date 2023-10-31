import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 0,
    cost: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            // 
            state.amount = 0;
            state.cost = 0;
        },
        changeQuantity: (state, {payload}) => {
            const {id, newQty} = payload;
            const item = state.cartItems.find((item) => item.id === id);
            // 
            state.amount += (newQty - item.quantity);
            state.cost += (newQty - item.quantity) * item.price;
            // 
            item.quantity = newQty;
        },
        removeItem: (state, {payload}) => {
            const item = state.cartItems.find((item) => item.id === payload);
            state.amount -= item.quantity;
            state.cost -= item.quantity * item.price;
            // 
            state.cartItems = state.cartItems.filter((item) => item.id !== payload);
        },
        addToCart: (state, {payload}) => {
            let itemIndex = state.cartItems.findIndex((item) => item.id === payload.id);
            if (itemIndex === -1) {
                state.cartItems.push({...payload, quantity: 1});
                state.cost += payload.price;
                state.amount++;
            } else {
                state.cartItems[itemIndex].quantity += 1;
                state.cost += payload.price;
                state.amount++;
            }
        }
    },
})

export default cartSlice.reducer;
export const {clearCart, changeQuantity, removeItem, addToCart} = cartSlice.actions;