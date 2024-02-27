import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./goodsReducer";

export const store = configureStore({
    reducer: {goodsReducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['goodsReducer/setGoods', 'goodsReducer/getFilteredGoods'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch