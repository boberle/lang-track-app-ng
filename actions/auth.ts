import {signInWithEmailAndPassword} from "@firebase/auth";

import getFirebaseAuth from "@/actions/firebaseauth";

export const login = async (username: string, password: string) => {
    const auth = getFirebaseAuth();

    try {
        console.log(`Attempting login for ${username}`);
        await signInWithEmailAndPassword(auth, username, password);
        console.log(`Login successful for ${username}`);
    } catch (error) {
        console.error("Login failed with error:", error);
        throw new Error("Login failed");
    }
}
export const logout = async () => {
    const auth = getFirebaseAuth()
    await auth.signOut();
}