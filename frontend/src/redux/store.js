import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from './features/userSlice';

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// Instead of defining the reducer separately, directly use the generated reducer from userSlice
const rootReducer = combineReducers({
  auth: userSlice.reducer, // Access the reducer property of the slice
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   // reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: rootReducer,
});
