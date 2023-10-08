import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopSales = createAsyncThunk('topSales/fetchTopSales', async () => {
    const response = await fetch('http://localhost:7070/api/top-sales');

    const data = await response.json();

    return data;
})

const topSalesSlice = createSlice({
    name: 'topSales',
    initialState: {
        topSales: [],
        status: null,
        error: null,
    }, 
    reducers: {
        
    }, 
    extraReducers: {
        [fetchTopSales.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        },
        [fetchTopSales.fulfilled]: (state, action) => {
            state.status = 'success';
            state.topSales = action.payload;
        },
        [fetchTopSales.rejected]: (state, action) => {
            state.error = action.error.message
        },
    }
})

export const { } = topSalesSlice.actions;

export default topSalesSlice.reducer;