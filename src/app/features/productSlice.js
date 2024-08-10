import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get(`/products?limit=20&skip=20`);
    return response.data.products;
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearProducts: (state) => {
            state.products = [];
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          
      },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;