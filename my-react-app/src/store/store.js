import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

// Конфігурація Redux Store з використанням ред'юсера для продуктів
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});