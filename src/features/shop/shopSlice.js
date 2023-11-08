import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getShopItems = createAsyncThunk('shop/getShopItems', async (category) => {
    if (!category) {
        return fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
    return fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const initialState = {
    shopItems: [],
    isLoading: true,
    searchTerm: '',
    recentlyViewed: []
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setSearch: (state, {payload}) => {
            state.searchTerm = payload;
        },
        clearRecent: (state) => {
            state.recentlyViewed = [];
        },
        addToRecent: (state, {payload}) => {
            if (!(state.recentlyViewed.find(item => item.id === payload.id))) {
                state.recentlyViewed.push(payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShopItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getShopItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shopItems = action.payload;
            })
            .addCase(getShopItems.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export default shopSlice.reducer;

export const {setSearch, clearRecent, addToRecent} = shopSlice.actions;

