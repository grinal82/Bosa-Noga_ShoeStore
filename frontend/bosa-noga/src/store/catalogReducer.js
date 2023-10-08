import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCatalog = createAsyncThunk('catalog/fetchCatalog', async () => {
    const response = await fetch('http://localhost:7070/api/categories');

    const data = await response.json();

    return data;
})

const catalogSlice = createSlice({
    name: "catalog",
    initialState: {
        catalog: [],
        status: null,
        error: null,
    }, 
    reducers: {
        
    }, 
    extraReducers: {
        [fetchCatalog.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        },
        [fetchCatalog.fulfilled]: (state, action) => {
            state.status = 'success';
            state.catalog = action.payload;
        },
        [fetchCatalog.rejected]: (state, action) => {
            state.error = action.error.message
        },
    }
})

export const { } = catalogSlice.actions;

export default catalogSlice.reducer;