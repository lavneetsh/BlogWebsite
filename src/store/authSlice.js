import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { status: false, userData: null },
    reducers: {
        login: (state, action) => {
            console.log("--- Redux auth/login action dispatched ---");
            const user = action.payload;
            
            if (user) {
                console.log("Firebase user object received in slice:", user);
                console.log("Attempting to read user.displayName:", user.displayName);

                state.status = true;
                state.userData = {
                    $id: user.uid,
                    name: user.displayName, // This is the critical line
                    email: user.email,
                };
                
                console.log("New Redux state.userData:", state.userData);
            } else {
                console.log("Payload was empty. Logging out.");
                state.status = false;
                state.userData = null;
            }
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;