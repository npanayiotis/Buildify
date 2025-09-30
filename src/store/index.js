/**
 * Redux Store Configuration
 * Central state management for the Elevare SaaS platform
 */

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers
import authReducer from "./slices/authSlice";
import websiteReducer from "./slices/websiteSlice";
import customizeReducer from "./slices/customizeSlice";
import publishReducer from "./slices/publishSlice";
import domainReducer from "./slices/domainSlice";
import uiReducer from "./slices/uiSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "website", "customize"], // Only persist these reducers
};

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  website: websiteReducer,
  customize: customizeReducer,
  publish: publishReducer,
  domain: domainReducer,
  ui: uiReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
export const persistor = persistStore(store);

// Types (commented out for JavaScript compatibility)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
