import { auth } from '../firebase/config';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";

export class AuthService {
    async createAccount({email, password, name}) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                // This updates the user's profile in Firebase
                await updateProfile(userCredential.user, { displayName: name });
            }
            // We return the created user, but do NOT log them in here.
            return userCredential;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Firebase Login Error:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
});
        });
    }

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log("Firebase :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;