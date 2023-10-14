import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (categoryID) => {
    const apiUrl = categoryID 
    ? `http://localhost:7070/api/items?categoryId=${categoryID}` : `http://localhost:7070/api/items`;
    const response = await fetch(apiUrl);

    const data = await response.json();

    return data;
})

export const fetchMoreProducts = createAsyncThunk('products/fetchMoreProducts', async ({category,offset}) => {
    console.log(category)
    const apiUrl = category
    ?  `http://localhost:7070/api/items?categoryId=${category}&offset=${offset}` 
    : `http://localhost:7070/api/items?offset=${offset}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    return data;
})

export const fetchFilteredProducts = createAsyncThunk('products/fetchFilteredProducts', async (filter) => {
    const response = await fetch(`http://localhost:7070/api/items?q=${filter}`);

    const data = await response.json();

    return data;
})

const itemsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: null,
        error: null,
        offset: 0, // for loading more items
        selectedCategory: null,
        filter:'',
    },
    reducers: {
        clearItems: (state) => {
            state.items = [];
        }, 
        clearOffset: (state) => {
            state.offset = 0;
        }, 
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        }, 
        clearStatus: (state) => {
            state.status = null;
        },
        filterItems: (state, action) => ({
            // добавляем в фильтр строковые данные прилетевшие из поля ввода услуги
            ...state,
            filter: action.payload
        })
    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
            state.offset = state.offset + 6;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [fetchMoreProducts.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        },
        [fetchMoreProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = state.items.concat(action.payload);
            state.offset = state.offset + 6;
        },
        [fetchMoreProducts.rejected]: (state, action) => {
            state.error = action.error.message
        }, 
        [fetchFilteredProducts.pending]: (state, action) => {
            // state.status = 'loading';
            state.error = null;
        }, 
        [fetchFilteredProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [fetchFilteredProducts.rejected]: (state, action) => {
            state.error = action.error.message
        }
        
    }
})

export const { clearItems, clearOffset, clearStatus, setCategory, filterItems } = itemsSlice.actions

export default itemsSlice.reducer;