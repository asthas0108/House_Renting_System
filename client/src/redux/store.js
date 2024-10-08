import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js"; // Correct import for default export

export const store = configureStore({
    reducer: { user: userReducer },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
