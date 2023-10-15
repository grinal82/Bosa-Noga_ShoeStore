import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIndividualProduct = createAsyncThunk('products/fetchIndividualProduct', async (id) => {
    const response = await fetch(`http://localhost:7070/api/items/${id}`);

    const data = await response.json();

    return data;
})



const buySlice = createSlice({
    name: "buy",
    initialState: {
        item: null,
        status:null,
        quantity: 1,
        sizeToBuy:null,
        cart: null,
    },

    reducers: {
        addQuantity: (state) => {
            if(state.quantity < 10){
            state.quantity += 1
            }
        }, 
        reduceQuantity: (state) => {
            if(state.quantity > 0){
            state.quantity -= 1
        }
      },
        addSelectedSize: (state, action) => {
            state.sizeToBuy = action.payload
      }, 
        removeSelectedInfo: (state) => {
            state.sizeToBuy = null;
            state.quantity = 1
        },
        addToCart: (state, action) => {
            state.cart = null
            state.cart = action.payload
        },
        clearCart: (state, action) => {
            state.cart=null
        }
    },
    extraReducers: {
        [fetchIndividualProduct.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        },
        [fetchIndividualProduct.fulfilled]: (state, action) => {
            state.status = 'success';
            state.item = action.payload;
            state.error = null
        },
        [fetchIndividualProduct.rejected]: (state, action) => {
            state.error = action.error.message
        },
    }
})

export const { addQuantity, reduceQuantity, addSelectedSize, removeSelectedInfo, addToCart, clearCart } = buySlice.actions;

export default buySlice.reducer;