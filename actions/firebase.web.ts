import {FirebaseApp, initializeApp} from "firebase/app";
import {signInWithEmailAndPassword} from "@firebase/auth";
import { getAuth } from 'firebase/auth';
import appConfig from "@/const/lta";

let _app: FirebaseApp | null = null;

const getFirebaseApp = () => {
    if (!_app) {
        _app = initializeApp({apiKey: appConfig.firebaseAPIKey, projectId: appConfig.projectId});
    }
    return _app;
}

export const getFirebaseAuth = () => {
    return getAuth(getFirebaseApp());
}


export const login = async (username: string, password: string) => {
    const auth = getFirebaseAuth();

    try {
        await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        console.error(error);
        throw new Error("Login failed");
    }
}

export const logout = async () => {
    const auth = getFirebaseAuth()
    await auth.signOut();
}


export default getFirebaseApp;