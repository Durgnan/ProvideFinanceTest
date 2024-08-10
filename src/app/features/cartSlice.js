import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addItem: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.cart.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        clearCart: (state) => {
            state.cart = [];
        }

    },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;