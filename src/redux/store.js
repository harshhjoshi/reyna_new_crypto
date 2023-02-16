import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import paymentSlice from "./paymentSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  payment:paymentSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
