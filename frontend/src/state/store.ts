import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice.ts";
import machineSlice from "./machine/machineSlice.ts";
import authSlice from "./auth/authSlice.ts";
import messageSlice from "./llm/messageSlice.ts";

const persistConfig = {
    key: "root",
    storage,
    // blacklist: []
};

const appReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    machine: machineSlice,
    message: messageSlice,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET") {
        state = undefined
    }
    return appReducer(state, action);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(apiSlice.middleware),
    devTools: true,
});