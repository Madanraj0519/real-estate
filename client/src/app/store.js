import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userAuthSlice from "../features/Auth/userAuthSlice";
import propertySlice from "../features/propertySlice";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    authUser : userAuthSlice,
    property : propertySlice,
});


const persistConfig = {
    key : 'root',
    version : 1,
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
});

export const persistor = persistStore(store);