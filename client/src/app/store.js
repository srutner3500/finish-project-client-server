import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSliceReducer from "../featuers/auth/authSlice";
import basketReducer from "../featuers/basket/basketSlice"

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        basket:basketReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
})
export default store