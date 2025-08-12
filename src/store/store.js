import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        //TODO: add more slices here for posts
    },
    // --- THIS IS THE NEW CONFIGURATION ---
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // We are configuring the serializable-check middleware
            serializableCheck: {
                // We will ignore all actions of this type.
                // This means Redux Toolkit will not show a warning when we dispatch
                // the raw Firebase user object in our 'auth/login' action.
                ignoredActions: ['auth/login'],
            },
        }),
});

export default store;