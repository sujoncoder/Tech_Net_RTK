import { IProduct } from "@/types/globalTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    products: IProduct[];
    total: number
}


const initialState: ICart = {
    products: [],
    total: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existProduct = state.products.find((product) => product._id === action.payload._id);

            if (existProduct) {
                existProduct.quantity = existProduct.quantity! + 1
            } else {
                state.products.push({ ...action.payload, quantity: 1 })
            }
            state.total += action.payload.price
        },

        removeOne: (state, action: PayloadAction<IProduct>) => {
            const existProduct = state.products.find((product) => product._id === action.payload._id);

            if (existProduct && existProduct.quantity! > 1) {
                existProduct.quantity = existProduct.quantity! - 1
            } else {
                state.products = state.products.filter((product) => product._id !== action.payload._id);
            }
            state.total -= action.payload.price
        },

        removeFromCart: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id);
        }
    }
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;