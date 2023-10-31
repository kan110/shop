import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const getShopItems = createAsyncThunk('shop/getShopItems', () => {
    return fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const initialState = {
    shopItems: [],
    isLoading: true,
    searchTerm: '',
    searchCategory: '',
    recentlyViewed: []
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setSearch: (state, {payload}) => {
            state.searchTerm = payload;
        },
        setCategory: (state, {payload}) => {
            state.searchCategory = payload;
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

export const selectItemsByCategory = createSelector([(state) => state.shop.shopItems, (state) => state.shop.searchCategory], (items, category) => {
    if (category) {
        return items.filter(item => item.category === category);
    }
    return items;
});

export const {setSearch, setCategory, clearRecent, addToRecent} = shopSlice.actions;

